const listUtils = {
    refreshPageList: function (prevProps, props) {
        const {dogList, filteredList, pageSize} = props;
        if((prevProps.dogList !== dogList && dogList.length !== 0) ||
           (prevProps.filteredList !== filteredList && filteredList.length !== 0)
        ) {
            const newPageList = filteredList.slice(0, pageSize);
            props.updatePageList(newPageList);
        }
    }
}

export default listUtils;
