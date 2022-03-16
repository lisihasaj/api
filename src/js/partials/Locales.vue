<template>
    <div class="locales">
        <template v-for="l in locales">
            <a :key="l.key" :href="`/${l.key}/${l.root_slug}`" :class="{'active': $route.params.locale == l.key}" @click.prevent="changeLanguage(l.key)">
                {{l.key}}
            </a>
        </template>
    </div>
</template>
<script>
import {find} from '@/helpers'
export default {
    name: 'Locales',
    data() {
        return {
            locales: []
        }
    },
    mounted() {
        if (window_locales) {
            let locales = JSON.parse(window_locales)
            this.locales = locales
        }
    },
    methods: {
        changeLanguage(l) {
            if (l == this.$route.params.locale) return;
            document.querySelector('body').style.opacity = 0
            let routeName = this.$route.name

            switch (routeName) {
                case 'home': {
                    window.location.href = `${window.location.origin}/${l}`
                    break;
                }
                case 'section': {
                    window.location.href = `${window.location.origin}/${l}/${this.activeSection.slugs[l]}`
                    break;
                }
                case 'subsection': {
                    window.location.href = `${window.location.origin}/${l}/${this.activeSection.slugs[l]}/${this.activeSubSection.slugs[l]}`
                    break;
                }
                case 'news': {
                    window.location.href = `${window.location.origin}/${l}/${this.activeSection.slugs[l]}/${this.activeNews.slugs[l]}`
                    break;
                }
                case 'page': {
                    window.location.href = `${window.location.origin}/${l}/${this.activeSection.slugs[l]}/${this.activeSubSection.slugs[l]}/${this.activePage.slugs[l]}`
                    break;
                }
            }
        },
        getSectionSlug(locale, type) {
            return axios.get(`/${locale}/apis/v2/section/getSlug/${type}`)
        },
    },
    computed: {
        activeSection() {
            return this.$store.getters.getSectionBySlug(this.$route.params.sectionSlug);
        },
        activeSubSection() {
            return find(this.activeSection.children, 'slug', this.$route.params.subsectionSlug);
        },
        activeNews () {
            return this.$store.getters.getPageBySlug(this.$route.params.newsSlug);
        },
        activePage () {
            return this.$store.getters.getPageBySlug(this.$route.params.pageSlug);
        }
    }
}
</script>
