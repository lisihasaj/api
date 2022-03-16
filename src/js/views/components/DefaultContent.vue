<template>
    <div class="default__content">
        <!-- Sidebar Image slot-->
        <div class="default__content-image" v-if="this.$slots.image" data-aos="fade-in" data-aos-delay="50">
            <shapeLogoLarge />
            <slot name="image"></slot>
        </div>        
        <NextPrev v-if="navigation && !uaFrame" :class="{'default__content-navigation--md': mediumContainer, 'default__content-navigation--lg': largeContainer}"/>
        <div class="default__content-header__text" :class="{'default__content-header__text--md': mediumContainer, 'default__content-header__text--lg': largeContainer, 'no-image': !this.$slots.image}">
            <!-- Header slot-->
            <div class="default__content-header" v-if="this.$slots.title" :class="{'default__content-header-less__margin': goBack}" data-aos="fade-in" data-aos-delay="70">
                <slot name="title"></slot>
            </div>          
            <!-- Go back Button -->
            <div class="default__content-goBack" v-if="goBack" data-aos="fade-in" data-aos-delay="100">
                <router-link :to="{name: `${goBack.backTo}`}"><i class="icon-left"></i>{{translations('return')}} <span>{{goBack.title}}</span> </router-link>
            </div>               
            <!-- Pages slot-->
            <div class="default__content-pages" v-if="pages">
                <template v-for="page in pages">
                    <router-link :key="page.id" :to="{name: 'page', params:{pageSlug: page.slug}}">{{page.title}}</router-link>
                </template>
            </div>          
            <!-- General Content slot -->
            <div class="default__content-text" v-if="this.$slots.content" data-aos="fade-in" data-aos-delay="120">
                <slot name="content"></slot>
            </div>

            <!-- Team Gallery Content slot -->
            <TeamMembers v-if="teamGallery" :teamGallery="teamGallery"/>

            <!-- Unsolicited applications frame -->
            <div class="default__content__ua" v-if="uaFrame">
                <slot name="ua-frame"></slot>
            </div>

            <!-- Contact button -->
            <div class="default__content-contact" v-if="footerContent" data-aos="fade-in" data-aos-delay="150" v-html="footerContent"></div>

            <cardItems v-if="cardItems" :pages="cardItems" />
        </div>
    </div>
</template>
<script>
import {shapeLogoLarge} from '@/elements'
import {find} from '@/helpers'
export default {
    name: 'DefaultContent',
    props: {
        teamGallery: {
            type: Array,
            required: false,
            default: null
        },
        mediumContainer: {
            type: Boolean,
            required: false,
            default: false
        },
        largeContainer: {
            type: Boolean,
            required: false,
            default: false
        },
        footerContent: {
            type: String,
            required: false,
            default: null
        },
        navigation: {
            type: Boolean,
            required: false,
            default: true
        },
        goBack: {
            type: Object,
            required: false,
            default: null
        },
        hideMobilePagesLinks: {
            type: Boolean,
            required: false,
            default: true
        },
        cardItems: {
            type: Array,
            required: false,
            default: null
        },
        uaFrame: {
            type: Boolean,
            required: false,
            default: null
        }
    },
    components: {
        shapeLogoLarge,
        NextPrev: () => import('@/views/components/NextPrev' /*webpackChunkName: "new-prev"*/),
        CardItems: () => import('@/views/components/CardItems' /*webpackChunkName: "card-items"*/),
        TeamMembers: () => import('@/views/components/TeamMembers' /*webpackChunkName: "team-members"*/),
    },
    mounted() {
        // mobile horizontal page links
        if(window.innerWidth <= 1024 && this.$route.params.pageSlug) {
            let scrollableDiv = document.querySelector('.default__content-pages')
            let activeLink = document.querySelector('.default__content-pages a.active')
            if(activeLink) scrollableDiv.scrollLeft = activeLink.offsetLeft - 30
        }
    },

    computed: {
        activeSection() {
            let section = this.$store.getters.getSectionBySlug(this.$route.params.sectionSlug)
            if(section.children.length > 0)  {
                return find(section.children, 'slug', this.$route.params.subsectionSlug)
            } else {
                return section
            }
            
        },
        pages() {
            // mobile horizontal page links
            if(this.activeSection.collections.length && this.hideMobilePagesLinks) {
                return this.activeSection.collections[0].pages
            }
        }
    }
}
</script>