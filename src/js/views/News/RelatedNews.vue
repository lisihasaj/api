<template>
    <div class="related__news">
        <h2>{{translations('otherArticles')}}</h2>
        <div class="related__news-list">
            <template v-for="(page, index) in relatedPages">
                <router-link class="related__news-item" :to="{name: 'news', params:{newsSlug: page.slug}}" :key="page.id" data-aos="fade-up" :data-aos-delay="index * 50">
                    <span class="related__news-date" v-if="checkField(page, 'date')">{{page.fields.date.value | newsDisplayDate}}</span>
                    <h3>{{page.title}}</h3>
                </router-link>
            </template>
        </div>
        <div class="view__more__news" @click="limitNumnber += 2" v-if="limitNumnber < newsPages.length - 1">
            <button type="button">{{translations('viewMore')}} <i class="icon-right"></i></button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'RelatedNews',
    props: ['pageId'],
    data() {
        return {
            limitNumnber: 4
        }
    },
    computed: {
        newsPages(){
            return this.$store.getters.getNewsPages
        },
        relatedPages() {
            let pages = this.newsPages.filter(p => p.id != this.pageId)
            return pages.slice(0, this.limitNumnber)
        }
    }

}
</script>