const dogFields = {
    getImageUrl: function(dogItem) {
        if (dogItem.apiVersion === 'v1') {
            return dogItem.image.url;
        } else {
            return dogItem.image_url;
        }
    },

    getTemperamentList: function(dogItem){
        if (dogItem.apiVersion === 'v1') {
            return dogItem.temperament;
        } else {
            const tempList = [];
            dogItem.temperaments.map(item => tempList.push(item.name + ', '));
            return tempList;
        }
    },

    getWeight: function(dogItem) {
        if (dogItem.apiVersion === 'v1') {
            return dogItem.weight.metric;
        } else {
            return (`${dogItem.weight_min}  -  ${dogItem.weight_max}`);
        }
    },

    getHeight: function(dogItem) {
        if (dogItem.apiVersion === 'v1') {
            return dogItem.height.metric;
        } else {
            return (`${dogItem.height_min}  -  ${dogItem.height_max}`)
        }
    },
}

export default dogFields;
