<template>
    <div class="news__slider">
        <h3 v-if="year">{{year}}</h3>
        <div class="swiper__wrapper">
            <swiper class="swiper" :options="swiperOptions">
                <template v-for="(page, index) in newsPages">
                    <swiper-slide class="slider__item" :key="index">
                        <div class="slider__item__bg" v-if="checkField(page, 'image')" v-lazy:background-image="fullScreenUrl(page.fields.image.value[0].url)"></div>
                        <calendarIcon/>
                        <span class="slider__item__date">{{page.fields.date.value | newsDisplayDate}}</span>
                        <h3 class="slider__item__title">{{page.title}}</h3>
                        <div class="slider__item__link">
                            <router-link v-if="index <= 0 && homePageSlider" class="api__button-arrow__right--inverse" :to="{name: 'subsection', params: {sectionSlug: talentsSection.slug, subsectionSlug: talentsSubSection.slug}}">
                                {{translations('readMore')}}
                            </router-link>
                            <router-link v-else class="api__button-arrow__right--inverse" :to="{name: 'news', params: {sectionSlug: newsSection.slug, newsSlug: page.slug}}">{{translations('readMore')}}</router-link>
                        </div>
                    </swiper-slide>
                </template>
            </swiper>
            <button class="btn-prev" :class="(year) ? `btn-prev-${year}`: ''"><i class="icon-left"></i></button>
            <div class="swiper-pagination swiper-pagination-progressbar--dark" :class="(year) ? `swiper-pagination-${year}`: ''" slot="pagination"></div>
            <button class="btn-next" :class="(year) ? `btn-next-${year}`: ''"><i class="icon-right"></i></button>
        </div>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { calendarIcon } from '@/elements'
export default {
    name: 'NewsSlider',
    props: {
        year: {
            type: Number,
            required: false
        },
        homePageSlider: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    components: {
        Swiper,
        SwiperSlide,
        calendarIcon,
    },
    data() {
        return {
            swiperOptions: {
                slidesPerView: 'auto',
                spaceBetween: 20,
                // loop:true,
                mousewheel: {
                    forceToAxis: true
                },
                preventClicks: false,
                preventClicksPropagation: false,
                pagination: {
                    el: this.year ? `.swiper__wrapper .swiper-pagination-${this.year}` : `.swiper__wrapper .swiper-pagination`,
                    type: 'progressbar',
                    clickable: true
                },
                navigation: {
                    prevEl: this.year ? `.swiper__wrapper .btn-prev-${this.year}` : `.swiper__wrapper .btn-prev`,
                    nextEl: this.year ? `.swiper__wrapper .btn-next-${this.year}` : `.swiper__wrapper .btn-next`,
                }
            }
        }
    },
    computed: {
        newsSection() {
            return this.$store.getters.getSectionByType('news')
        },
        talentsSection() {
            return this.$store.getters.getSectionByType('talents')
        },
        talentsSubSection() {
            return this.$store.getters.getSubSectionsByType('talents', 'open_positions')
        },
        newsPages() {
            let pages = this.$store.getters.getNewsPages
            if(!this.year) return  pages
            
            // Filter news only for one year specific
            return pages.filter(page => {
                if(this.checkField(page, 'date')) {
                    let year = this.getYearFromDate(page.fields.date.value)
                    if(year === this.year) {
                        return true
                    } else {
                        return false
                    }
                }
            })
        }        
    }    
}
</script>