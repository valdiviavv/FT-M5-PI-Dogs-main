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

    getMinWeight: function (dogItem) {
        if (dogItem.apiVersion === 'v1') {
            return this.getFirstValue(dogItem.weight.metric);
        } else {
            return (dogItem.weight_min);
        }
    },

    getMaxWeight: function (dogItem) {
        if (dogItem.apiVersion === 'v1') {
            return this.getSecondValue(dogItem.weight.metric);
        } else {
            return (dogItem.weight_max);
        }
    },

    getFirstValue(value) {
        if (!value || value === '') {
            return 'n/a'
        }
        return Number(value.substring(0, 2).trim());
    },

    getSecondValue(value) {
        if (!value || value === '') {
            return 'n/a'
        }
        const index = value.indexOf('-')
        return Number(value.substring(index + 2));
    },
}

export default dogFields;
