import './PaginateList.css';
import React, {Component} from "react";
import { connect } from "react-redux";
import { updatePageList } from "../../redux/actions";

class PaginateList extends Component {
    updatePageList(event) {
        const {filteredList, pageSize} = this.props;
        const pageNumber = Number(event.target.textContent);
        const indexEnd = pageNumber * pageSize;
        const indexIni = indexEnd - pageSize;
        const newPageList = filteredList.slice(indexIni, indexEnd);
        this.props.updatePageList(newPageList);
    }
    renderButtonList() {
        const listLength = this.props.filteredList.length;
        if(listLength === 0 ) {
            return;
        }
        const buttonList = [];
        const numButtons = Math.ceil(listLength / this.props.pageSize);
        for (let i = 1; i <= numButtons; i++) {
            buttonList.push(
                <button
                    className="button"
                    key={i}
                    onClick={e => this.updatePageList(e)}>{i}
                </button>);
        }
        return buttonList;
    }
    render() {
        return (
            <div className="PaginateList">
                <p>Paginate List</p>
                {this.renderButtonList()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("Page list state : ", state);
    return {
        filteredList: state.filteredList,
        pageList: state.pageList,
        pageSize: state.pageSize
    };
}

export const mapDispatchToProps = {updatePageList};

export default connect(mapStateToProps, mapDispatchToProps)(PaginateList);
