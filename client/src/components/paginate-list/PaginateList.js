import './PaginateList.css';
import React, {Component} from "react";
import { connect } from "react-redux";
import { updatePageList } from "../../redux/actions";

class PaginateList extends Component {
    componentDidMount() {
        const {sourceList, pageSize} = this.props;
        const newPageList = sourceList.slice(0, pageSize);
        this.props.updatePageList(newPageList);
    }

    updatePageList(event) {
        const {sourceList, pageSize} = this.props;
        const pageNumber = Number(event.target.textContent);
        const indexEnd = pageNumber * pageSize;
        const indexIni = indexEnd - pageSize;
        const newPageList = sourceList.slice(indexIni, indexEnd);
        this.props.updatePageList(newPageList);
    }
    renderButtonList() {
        const listLength = this.props.sourceList.length;
        if(listLength === 0) {
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
        pageSize: state.pageSize
    };
}

export const mapDispatchToProps = {updatePageList};

export default connect(mapStateToProps, mapDispatchToProps)(PaginateList);
