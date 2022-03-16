<template>
    <div class="news__home slider">
        <h2 class="title">{{newsSection.title}}</h2>
        <router-link class="api__button-arrow__right--simple" :to="{name: 'section', params: {sectionSlug: newsSection.slug}}">{{translations('seeAllNews')}}</router-link>
        <NewsSlider :homePageSlider="true"/>
    </div>
</template>

<script>
export default {
    name: 'NewsHome',
    props: ['pages'],
    components: {
        NewsSlider: () => import('./NewsSlider' /*webpackChunkName: "news-slider"*/)
    },
    computed: {
        newsSection() {
            return this.$store.getters.getSectionByType('news')
        },
    }
}
</script>