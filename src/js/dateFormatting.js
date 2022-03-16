import Vue from 'vue'
import { setGlobalDateI18n, setGlobalDateMasks, format, parse } from 'fecha';

setGlobalDateI18n({
    dayNamesShort: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
    dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    monthNamesShort: ['janv', 'févr', 'mars', 'avr', 'mai' ,'kuin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'],
    monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
})

setGlobalDateMasks({
    newsDisplayDate: 'DD.MM.YYYY',
});

Vue.filter('newsDisplayDate', function (value) {
    if (!value) return ''

    return format(parse(value, 'DD/MM/YYYY'), 'newsDisplayDate');
})
