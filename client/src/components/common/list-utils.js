const listUtils = {
    refreshPageList: function (prevProps, props) {
        const {filteredList, pageSize} = props;
        if(prevProps.filteredList !== filteredList && filteredList.length !== 0) {
            const newPageList = filteredList.slice(0, pageSize);
            props.updatePageList(newPageList);
        }
    }
}

export default listUtils;
