<template>
    <div class="news__page">
        <div class="news__page-container">
            <router-link class="news__page-back" :to="{name: 'section', hash: `#year-${getYearFromDate(page.fields.date.value)}`}"> <i class="icon-left"></i>{{getYearFromDate(page.fields.date.value)}}</router-link>
            <h2>{{newsSection.title}}</h2>
            <div v-if="checkField(page, 'image')" class="news__page-image" v-lazy:background-image="fullScreenUrl(page.fields.image.value[0].url)"></div>
            <div class="news__page-header">
                <span>{{page.fields.date.value | newsDisplayDate}}</span>
                <h1>{{page.title}}</h1>
            </div>
            <div class="news__page-body" v-html="page.content"></div>
            <RelatedNews :pageId="page.id"/>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NewsPage',
    props: ['page'],
    components: {
        RelatedNews: ()=> import('./RelatedNews' /*webpackChunkName: "related-news"*/)
    },
    computed: {
        newsSection() {
            return this.$store.getters.getSectionByType('news')
        }
    }
}
</script>