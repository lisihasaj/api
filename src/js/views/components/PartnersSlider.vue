<template>
    <div class="partners__slider container">
        <h2 class="title">{{translations('partnersTitle')}}</h2>
        <button class="btn-prev"><i class="icon-left"></i></button>
        <swiper class="swiper" :options="swiperOptions">
            <swiper-slide class="slider__item" :key="index" v-for="(img, index) in gallery">
                <a :href="img.link ? img.link : `javascript:;`" :target="img.link ? '_blank' : null">
                    <img v-if="img.url" :src="`${img.url}`" :alt="[img.alt ? img.alt : '']">
                </a>
            </swiper-slide>
        </swiper>
        <div class="swiper-pagination swiper-pagination-progressbar swiper-pagination-progressbar--dark" slot="pagination"></div>
        <button class="btn-next"><i class="icon-right"></i></button>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
    name: 'PartnerSlider',
    props: ['gallery'],
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            swiperOptions: {
                slidesPerView: 1,
                spaceBetween: 20,
                preventClicks: true,
                preventClicksPropagation: true,
                loop: true,
                mousewheel: {
                    forceToAxis: true
                },
                preventClicks: false,
                preventClicksPropagation: false,
                pagination: {
                    el: '.partners__slider .swiper-pagination',
                    type: 'progressbar',
                    clickable: true
                },
                navigation: {
                    prevEl: '.partners__slider .btn-prev',
                    nextEl: '.partners__slider .btn-next',
                },
                breakpoints: {
                    580: {
                        slidesPerView: 2,
                    },
                    1440: {
                        slidesPerView: 4,
                    },                    
                }                
            }
        }
    }
}
</script>