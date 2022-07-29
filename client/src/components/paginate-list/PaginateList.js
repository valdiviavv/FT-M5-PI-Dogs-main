import './PaginateList.css';
import React, {Component} from "react";
import { connect } from "react-redux";
import { updatePageList } from "../../redux/actions";

class PaginateList extends Component {

    getCurrentPage(pageNumber) {
        if(!pageNumber) {
            pageNumber = 1;
        }
        const currentPage = {};
        currentPage[this.props.currentPageName] = pageNumber;
        return currentPage;
    }

    componentDidMount() {
        const {sourceList, pageSize} = this.props;
        let pageNumber = this.props.currentPage[this.props.currentPageName];
        const newPageList = this.getPageList(sourceList, pageNumber, pageSize);
        const currentPage = this.getCurrentPage(pageNumber);
        this.props.updatePageList(newPageList, currentPage);
    }

    getPageList(sourceList, pageNumber, pageSize) {
        const indexEnd = pageNumber * pageSize;
        const indexIni = indexEnd - pageSize;
        return sourceList.slice(indexIni, indexEnd);
    }

    updatePageList(event) {
        const {sourceList, pageSize} = this.props;
        const pageNumber = Number(event.target.textContent);
        const newPageList = this.getPageList(sourceList, pageNumber, pageSize);
        const currentPage = this.getCurrentPage(pageNumber);
        this.props.updatePageList(newPageList, currentPage);
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

PaginateList.defaultProps = {
    currentPageName: "defaultPage"
}

const mapStateToProps = (state) => {
    return {
        pageSize: state.pageSize,
        currentPage: state.currentPage
    };
}

export const mapDispatchToProps = {updatePageList};

export default connect(mapStateToProps, mapDispatchToProps)(PaginateList);
