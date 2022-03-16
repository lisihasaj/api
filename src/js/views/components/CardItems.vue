<template>
    <div class="cards" ref="stats">
        <transition name="fade">
            <div class="cards__list">
                <template v-for="(page, index) in pages">
                    <div :key="page.id" class="cards__item" :class="{'active': page.id === activeAccordion}">
                        <div v-if="checkField(page, 'stats')" class="cards__item__header">
                            <animate-number class="cards__item__number" from="0"  :to="parseInt(page.fields.stats.value)" :duration="3500 + ((index + 1 ) * 750)" easing="easeOutQuad"></animate-number>
                            <span>{{page.title}}</span>
                            <a class="cards__item-btn" href="#" @click.prevent="toggleAccordion(page.id)"><i class="icon-plus" :class="{'active': page.id === activeAccordion}"></i></a>
                        </div>
                        <transition name="fade">
                            <div v-if="page.id === activeAccordion" class="cards__item__content" v-html="page.content"></div>
                        </transition>
                    </div>
                </template>
            </div>                    
        </transition>
    </div> 
</template>
<script>
import Vue from 'vue'
import VueAnimateNumber from 'vue-animate-number'
Vue.use(VueAnimateNumber)
export default {
    name: 'CardItems',
    props: ['pages'],
        data() {
            return {
                activeAccordion: null
            }
        },
        methods: {
            toggleAccordion(id) {
                if (id !== this.activeAccordion) {
                    this.activeAccordion = id;
                } else {
                    this.activeAccordion = null
                };
            },
        }
}
</script>