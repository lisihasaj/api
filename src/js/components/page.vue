<template>
    <div class="page-wrapper">
        <NewsPage v-if="section.type === 'news'" :page="page"/>

        <DefaultContent v-else-if="subsection.type == 'technical_profiles'" class="technical__fields" :goBack="{title: subsection.title, backTo: 'subsection'}" :navigation="false" :largeContainer="true">
            <h1 slot="title">{{page.title}}</h1>
            <div slot="content" v-html="page.content" />
        </DefaultContent>

        <DefaultContent v-else :footerContent="checkField(page, 'footer_content') ? page.fields.footer_content.value : null">
            <div class="img-1" slot="image" v-lazy:background-image="checkField(page, 'image') ? fullScreenUrl(page.fields.image.value[0].url) : ''" />
            <div class="img-2" slot="image" v-lazy:background-image="checkField(page, 'image') ? fullScreenUrl(page.fields.image.value[0].url) : ''" />
            <h1 slot="title">{{page.title}}</h1>
            <div slot="content" v-html="page.content" />
        </DefaultContent>
    </div>
</template>

<script>
    import { metaConfig, formatMeta } from '../formatMeta'
    import {find} from '@/helpers'
    export default {
        name: 'PageComponent',
        mixins:[metaConfig],
        components: {
            DefaultContent: ()=> import('@/views/components/DefaultContent' /*webpackChunkName: "default-content"*/),
            NewsPage: ()=> import('@/views/News/NewsPage' /*webpackChunkName: "news-page"*/),
        },
        data () {
            return {
                page: {},
                subsection: {},
                section: {},
            }
        },
        created() {
            this.fetchData()
        },
        watch: {
            $route: function() {
                this.fetchData()
            }
        },
        methods: {
            fetchData: function () {
                const section = this.$store.getters.getSectionBySlug(this.$route.params.sectionSlug);
                const subsection = find(section.children, 'slug', this.$route.params.subsectionSlug);
                let page;

                if(this.$route.params.newsSlug) {
                    page = this.$store.getters.getPageBySlug(this.$route.params.newsSlug)
                } else {
                    page = this.$store.getters.getPageBySlug(this.$route.params.pageSlug)
                }

                if (!page) {
                    axios.get(`/fr/apis/v2/pages/${this.$route.params.pageSlug}`).then(response => {
                        this.setData(response.data, section, subsection)
                    }, err => {
                        this.$router.push({name: 'not-found'})
                    })
                } else {
                    this.setData(page, section, subsection)
                }
            },
            setData (page, section, subsection) {
                this.page = page
                this.subsection = subsection
                this.section = section
                this.params = formatMeta(this.page)
                this.$nextTick( () => {
                    this.$emit('updateHead')
                })
            }
        }
    }
</script>
