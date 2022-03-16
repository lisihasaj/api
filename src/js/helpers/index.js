import { format, parse } from "fecha";
import _orderBy from 'lodash/orderBy'
const find = (collection, key, value) => {
    return collection.find((c) => c[`${key}`] == value)
}

const orderByDate = (pages) => {
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
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

function scrollTo(element, to, duration) {
    var start = element.scrollY,
        change = to - start,
        currentTime = 0,
        increment = 20;

    var animateScroll = function () {
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        // element.scrollTop = val;
        window.scrollTo(0, val);
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

export {
    find,
    scrollTo,
    orderByDate
}