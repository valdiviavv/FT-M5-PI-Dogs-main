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
            const weight = dogItem.weight.metric;
            return (`${this.getFirstValue(weight)}  -  ${this.getSecondValue(weight)}`);
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
        if (!value || value === '' || value === 'NaN') {
            return 'n/a'
        }
        let index = value.indexOf('-')
        if (index === -1) {
            index = value.length;
        }
        let substring = value.substring(0, index).trim();
        if (substring.includes('NaN')) {
            substring = value.replace('-', '').replace('NaN', '').trim();
        }
        return Number(substring);
    },

    getSecondValue(value) {
        if (!value || value === '' || value === 'NaN') {
            return 'n/a'
        }
        const index = value.indexOf('-')
        if (index === -1) {
            return Number(value);
        }
        let substring = value.substring(index + 2).trim();
        if (substring.includes('NaN')) {
            substring = value.replace('-', '').replace('NaN', '').trim();
        }
        return Number(substring);
    },
}

export default dogFields;
