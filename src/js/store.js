import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import {find, orderByDate} from '@/helpers'
import Plugins from './plugins'

Vue.use(Vuex)
Vue.use(Plugins)

const _getters = {
    getSections: state => {
        return state.sections
    },
    getPages: state => {
        return state.pages
    },
    getSectionBySlug: (state) => (slug) => {
        return state.sections.find(section => section.slug === slug)
    },
    getSubSectionsBySlug: (state) => (slug) => {
        return state.sections.find(section => section.slug === slug).children
    },
    getSubSectionsByType: (state) => (sectionType, subsectionType) => {
        let section = state.sections.find(section => section.type === sectionType)
        return section.children.find(subsection => subsection.type === subsectionType)
    },
    getSectionByType: (state) => (type) => {
        return state.sections.find(section => section.type === type)
    },
    getPageBySlug: (state) => (slug) => {
        return state.pages.find(page => page.slug === slug)
    },
    getNavSections: state => {
        let excludedSections = ['footer', 'root', 'news', 'privacy_policy']
        return state.sections.filter((s) => !excludedSections.includes(s.type))
    },
    getJobs: state => {
        return state.jobs
    },
    getNewsPages: state => {
        let newsSection = state.sections.find(section => section.type === 'news')
        let pages = find(newsSection.collections, 'type', 'news').pages
        return orderByDate(pages)
    }
}

const _actions = {
    loadSections() {
        return axios.get(`/${currentAppLocale}/apis/v2/sections`)
    },
    loadPages() {
        return axios.get(`/${currentAppLocale}/apis/v2/pages`)
    },
    async loadJobs(context) {
        const response = await axios.get('/fr/apis/v2/xml/data')
        try{context.commit('jobs', response.data.data)}
        catch(error) {console.log(error)}
    },
    load(context) {
        return new Promise((resolve, reject) => {

            axios.all([context.dispatch('loadSections'), context.dispatch('loadPages')])
            .then(axios.spread(function (sections, pages) {
                context.commit('sections', sections.data)
                context.commit('pages', pages.data)
                resolve()
            })).catch(error => {
                reject(error)
            })
        })
    }
}

const store = new Vuex.Store({
    state: {
        sections: [],
        pages: [],
        jobs: [],
        news: []
    },
    mutations: {
        sections (state, sections) {
            state.sections = sections
        },
        pages (state, pages) {
            state.pages = pages
        },
        jobs (state, jobs) {
            state.jobs = jobs
        },

    },
    getters: _getters,
    actions: _actions
})

export default store
