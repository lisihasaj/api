<template>
    <div class="default__content-navigation">
        <span class="prev" :class="{'disabled': !prev}">
            <i class="icon-up"></i>
            <router-link  v-if="prev" :to="{name: `${routeName}`, params:{[`${slugName}`]: prev.slug}}"></router-link>
        </span>
        <span class="next" :class="{'disabled': !next}">
            <i class="icon-down"></i>
            <router-link class="next" v-if="next" :to="{name: `${routeName}`, params:{[`${slugName}`]: next.slug}}"></router-link>
        </span>
    </div>
</template>
<script>
    import { find } from '@/helpers'
    export default {
        name: 'NextPrevComponent',
        data() {
            return {
                isPage: false,
                routeName: 'subsection',
                slugName: 'subsectionSlug',
            }
        },
        created() {
                if(this.$route.params.pageSlug) {
                    this.isPage = true
                    this.routeName = 'page'
                    this.slugName = 'pageSlug'
                }
        },
        computed: {
            subsections() {
                return this.$store.getters.getSubSectionsBySlug(this.$route.params.sectionSlug)
            },
            activeSubsection() {
                return find(this.subsections, 'slug', this.$route.params.subsectionSlug)
            },
            pages() {
              return this.activeSubsection.collections[0].pages  
            },
            activePage() {
                return this.$store.getters.getPageBySlug(this.$route.params.pageSlug)
            },
            activeContent() {
                if(this.isPage) {
                    return this.activePage
                } else {
                    return this.activeSubsection
                }
            },
            mapArr() {
                if(this.isPage) {
                    return this.pages
                } else {
                    return this.subsections
                }
            },
            index() {
                return this.mapArr.findIndex(item => item.id === this.activeContent.id);
            },
            next() {
                return this.mapArr[this.index + 1]
            },
            prev() {
                return this.mapArr[this.index - 1]
            },
        }
    }

</script>
