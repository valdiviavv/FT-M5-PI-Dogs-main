const listUtils = {
    refreshPageList: function (prevList, currentList, props) {
        if(prevList !== currentList) {
            const newPageList = currentList.slice(0, props.pageSize);
            props.updatePageList(newPageList);
        }
    }
}

export default listUtils;
