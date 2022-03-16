<template>
    <div class="home">
        <div class="home__wrapper" :style="[checkField(section, 'background_image') ? {'background-image': `url(${section.fields.background_image.value[0].url})`} : '']">
            <div class="angle" :style="[checkField(section, 'background_image') ? {'background-image': `url(${section.fields.background_image.value[1].url})`} : '']"></div>
            <div class="container">
                <div class="home__content">
                    <div class="home__logo__header" v-if="checkField(section, 'logo_and_title')" data-aos="fade-in" data-aos-delay="50">
                        <div v-html="section.fields.logo_and_title.value"></div>
                        <div class="scroll-down d-flex">
                            <scrollDown /> 
                            <span>scroll down</span>
                        </div>
                    </div>
                    <div class="home__text" v-html="section.content" data-aos="fade-in" data-aos-delay="70"></div>
                </div>
                <div class="home__pages">
                    <div class="slider">
                        <swiper class="swiper" :options="swiperOptions">
                            <template v-for="page in pages">
                                <swiper-slide :key="page.id" class="slider-item">
                                    <h3>{{page.title}}</h3>
                                    <div v-html="page.content"></div>
                                </swiper-slide>
                            </template>
                        </swiper>
                        <div class="swiper-default-navigation">
                            <button class="btn-prev"><i class="icon-left"></i></button>
                            <button class="btn-next"><i class="icon-right"></i></button>
                        </div>                    
                        <div class="swiper-pagination" slot="pagination"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="home__second">
            <NewsHome :pages="newsPages" :homePageSlider="true"/>
            <PartnersSlider :gallery="checkField(section, 'partners') ? section.fields.partners.value : null"/>
        </div>
    </div>
</template>
<script>
import { metaConfig, formatMeta } from '../formatMeta'
import {scrollDown} from '@/elements'
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import {find} from '@/helpers'
export default {
    name: 'Home',
    components: {
        scrollDown,
        Swiper,
        SwiperSlide,
        NewsHome: () => import('@/views/News/NewsHome' /* webpackChunkNamne: "news-home"*/),
        PartnersSlider: () => import('@/views/components/PartnersSlider' /* webpackChunkNamne: "partners-slider"*/),
    },
    data() {
        return {
            swiperOptions: {
                slidesPerView: 1,
                spaceBetween: 15,
                centeredSlides: true,
                preventClicks: false,
                preventClicksPropagation: false,
                loop: true,
                mousewheel: {
                    forceToAxis: true
                },                    
                pagination: {
                    el: `.home__pages .swiper-pagination`,
                    type: 'progressbar',
                    clickable: true
                },
                navigation: {
                    nextEl: `.home__pages .btn-next`,
                    prevEl: `.home__pages .btn-prev`,
                },
            }               
        }
    },
    mixins: [metaConfig],
    watch: {
        $route: function () {
            this.fetchData()
        }
    },    
    beforeMount() {
        this.fetchData()
    },
    methods: {
        fetchData () {
            if (!this.section) {
                this.$router.push({name: 'not-found'})
                return;
            }

            this.params = formatMeta(this.section)
            this.$nextTick( () => {
                this.$emit('updateHead')
            })
        }
    },    
    computed: {
        section() {
            return this.$store.getters.getSectionByType('root')
        },
        pages() {
            return find(this.section.collections, 'type', 'home').pages
        },
        newsPages() {
            return find(this.section.collections, 'type', 'news').pages
        },
    }
}
</script>