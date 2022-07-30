const listUtils = {
    fullRefreshPageList: function (sourceList, pageSize, currentPage, currentPageName, props) {
        let pageNumber = this.getPageNumber(currentPage, currentPageName)
        let newPageList = this.getPageList(sourceList, pageNumber, pageSize);
        if(newPageList.length === 0) {
            pageNumber = 1;
            newPageList = this.getPageList(sourceList, pageNumber, pageSize);
        }
        const newCurrentPage = this.getCurrentPage(currentPage, currentPageName, pageNumber);
        props.updatePageList(newPageList, newCurrentPage);
    },

    partialRefreshPageList: function (prevList, currentList, props) {
        if(prevList !== currentList) {
            let pageNumber =  this.getPageNumber(props.currentPage, this.currentPageName);
            const newPageList = this.getPageList(currentList, pageNumber, props.pageSize);
            props.updatePageList(newPageList)
        }
    },

    getPageNumber: function (currentPage, currentPageName)     {
        if(!currentPage) {
            return 1;
        }
        let pageNumber = currentPage[currentPageName];
        if (!pageNumber) {
            return 1;
        }
        return pageNumber;
    },

    getCurrentPage: function(currentPage, currentPageName, pageNumber) {
        if(!pageNumber) {
            pageNumber = 1;
        }
        let newCurrentPage = {};
        if(currentPage) {
            newCurrentPage = {...currentPage};
        }
        newCurrentPage[currentPageName] = pageNumber;
        return newCurrentPage;
    },

    getPageList: function(sourceList, pageNumber, pageSize) {
        const indexEnd = pageNumber * pageSize;
        const indexIni = indexEnd - pageSize;
        return sourceList.slice(indexIni, indexEnd);
    }
}

export default listUtils;
