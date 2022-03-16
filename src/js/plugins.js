var Plugins = {}
import _isUndefined from 'lodash/isUndefined'
import _isEmpty from 'lodash/isEmpty'
import { format, parse } from "fecha";
import _orderBy from 'lodash/orderBy'

Plugins.install = function (Vue, options) {
    Vue.prototype.fullScreenUrl = function (src) {
        return croppa.url(src, 2200, null, ['resize'])
    }

    Vue.prototype.thumbnailUrl = function (src) {
        return croppa.url(src, 500, null, ['resize'])
    }
    Vue.prototype.teamUrl = function (src) {
        return croppa.url(src, 280, 380, ['resize'])
    }
    Vue.prototype.checkField = function (a, fieldName) {
        if (a.fields[fieldName]) {
            let object = a.fields[fieldName]
            let objectValue = object.value
            if (object && objectValue) {
                return true
            } else {
                return false
            }
        }
    }

    // Translations with multiple keys
    Vue.prototype.translations = function (param) {

        let params = param.split(".")

        let obj = this.appConstants.translations[this.$route.params.locale]

        params.forEach(element => {
            obj = obj[element]
        });

        return obj
    };
    // Order By date
    Vue.prototype.orderByDate = function(pages) {
        var ordered = [];

        if (pages) {
            pages.forEach(function(item) {
                if (item.fields.date && item.fields.date.value) {
					item.date = format(parse(item.fields.date.value, 'DD/MM/YYYY'), "YYYY/MM/DD");
                }
            });
            ordered = _orderBy(pages, ["date"], ["desc"]);
        }
        return ordered;
	};
    Vue.prototype.getYearFromDate = function(value) {
        let date = value.replace(/\//g, '')
        let year = date.substr(date.length - 4)
        return parseInt(year)
	};
}

export default Plugins
