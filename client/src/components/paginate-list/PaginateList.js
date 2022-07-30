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

    refreshPageList(event) {
        const {sourceList, pageSize, currentPage, currentPageName} = this.props;
        const pageNumber = Number(event.target.textContent);
        const newPageList = listUtils.getPageList(sourceList, pageNumber, pageSize);
        const newCurrentPage = listUtils.getCurrentPage(currentPage, currentPageName, pageNumber);
        this.props.updatePageList(newPageList, newCurrentPage);
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
                    onClick={e => this.refreshPageList(e)}>{i}
                </button>);
        }
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
