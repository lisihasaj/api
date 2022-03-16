<template>
    <div class="search" @click="openSearch = true">
        <form @submit.prevent="search" class="search__input">
            <input type="text" name="" id="" v-model="query" @focus="focused = true" @keyup.esc="closeSearch()">
            <button class="closeSearch" type="button" @click="closeSearch" v-if="focused || query != null">X</button>
            <span class="search__input-icon" v-if="!focused && query == null"><searchIcon /> <i>{{translations('search')}}</i> </span>
        </form>
        <transition name="fade" mode="out-in">
            <div class="search__results" v-if="focused || query != null">
                <ul>
                    <li v-for="(p, i) in results" :key="`${i}`">
                        <a v-if="p.type != 'footer' && p.type != 'contact'" :href="p.url">{{p.title}}</a>
                    </li>
                </ul>
                <span v-if="!results">{{translations('noResult')}}</span>
            </div>
        </transition>
    </div>
</template>

<script>
import {searchIcon} from '@/elements'
import { debounce } from "lodash";
export default {
    name: 'SearchComponent',
    components: {
        searchIcon
    },
    data() {
        return {
            openSearch: false,
            query: null,
            focused: false,
            results: []
        }
    },
    watch: {
        '$route': function () {
            this.focused = false
        },
        query() {
            if(!this.query) return;
            this.debounceSearch();
        }
    },
    created() {
        this.debounceSearch = debounce(this.search, 1000);
    },
    methods: {
        closeSearch () {
            this.focused = false
            this.query = null
            this.results = []
        },
        search() {

            axios.post(`/${this.$route.params.locale}/apis/v2/search`, {query: this.query}).then((response) => {
                this.results = response.data
            }, (err) => {
                alert('an error happened')
            });
        },
    },
    // computed: {
    //     navSections() {
    //         let excludedSections = ['root','footer']
    //         return this.$store.state.sections.filter((s) => !excludedSections.includes(s.type))
    //     },
    //     subSections() {
    //         let subsections = []
    //         this.navSections.filter(item => {
    //             if(item.children.length != 0) {
    //                 item.children.forEach(c => {
    //                     subsections.push(c)
    //                 })
    //             }
    //         })
    //         return _uniqBy(subsections.flat(), 'id')
    //     },
    //     filteredPages() {
    //         let pages = []
    //         this.subSections.filter(item => {
    //             if(item.collections.length != 0) {
    //                 item.collections.forEach(c => {
    //                     pages.push(c.pages)
    //                 })
    //             }
    //         })
    //         return _uniqBy(pages.flat(), 'id')
    //     },
    //     allData() {
    //         return this.subSections.concat(this.filteredPages)
    //     },
    //     filteredItems() {
    //         if(!this.search) return;
    //         let lowSearch = this.search.toLowerCase()
    //         return this.allData.filter(page => {
    //             return Object.values(page).some( val =>
    //                 String(val).toLowerCase().includes(lowSearch)
    //             );
    //         })
    //     }
    // }
}
</script>
