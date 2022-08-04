import './PaginateList.css';
import React, {Component} from "react";
import { connect } from "react-redux";
import { updatePageList } from "../../redux/actions";
import listUtils from "../common/list-utils";

class PaginateList extends Component {

    componentDidMount() {
        const {sourceList, pageSize, currentPage, currentPageName} = this.props;
        listUtils.fullRefreshPageList(sourceList,
                                      pageSize,
                                      currentPage,
                                      currentPageName,
                                      this.props)
    }

    refreshPageList(pageNumber) {
        const {sourceList, pageSize, currentPage, currentPageName} = this.props;
        const newPageList = listUtils.getPageList(sourceList, pageNumber, pageSize);
        const newCurrentPage = listUtils.getCurrentPage(currentPage, currentPageName, pageNumber);
        this.props.updatePageList(newPageList, newCurrentPage);
    }

    getPrevPage() {
        const {currentPage, currentPageName} = this.props
        const pageNumber = currentPage[currentPageName];
        const prevPage = pageNumber - 1;
        console.log("next page:", prevPage);
        if (prevPage < 1) {
            return;
        }
        this.refreshPageList(prevPage)
    }

    getNextPage() {
        const {currentPage, currentPageName} = this.props
        const pageNumber = currentPage[currentPageName];
        const nextPage = pageNumber + 1;
        console.log("next page:", nextPage);
        const listLength = this.props.sourceList.length;
        const numButtons = Math.ceil(listLength / this.props.pageSize);
        if (nextPage > numButtons) {
            return;
        }
        this.refreshPageList(nextPage)
    }

    renderButtonList() {
        const listLength = this.props.sourceList.length;
        if(listLength === 0) {
            return;
        }
        const buttonList = [];
        const numButtons = Math.ceil(listLength / this.props.pageSize);
        buttonList.push( // definicion del boton previo
            <button
                className="button"
                key={0}
                onClick={() => this.getPrevPage()}>Prev
            </button>);
        for (let i = 1; i <= numButtons; i++) {
            buttonList.push(
                <button
                    className="button"
                    key={i}
                    onClick={e => this.refreshPageList(Number(e.target.textContent))}>{i}
                </button>);
        }
        buttonList.push( //definicion del boton siguiente.
            <button
                className="button"
                key={numButtons+1}
                onClick={() => this.getNextPage()}>Next
            </button>);
        return buttonList;
    }

    render() {
        const {currentPage, currentPageName} = this.props;
        return (
            <div className="PaginateList">
                <p>Current page: {listUtils.getPageNumber(currentPage, currentPageName)}</p>
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
