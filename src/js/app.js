import Vue from 'vue'
import router from './routes'
import store from './store'
import VueRouter from 'vue-router'
import Plugins from './plugins'
import VueAnalytics from 'vue-analytics'
import VueLazyload from 'vue-lazyload'
import VueHead from 'vue-head'
import Constants from './constants'
import AOS from 'aos';
Vue.use(VueHead)
Vue.use(VueRouter)
Vue.use(Plugins)
Vue.use(Constants)
Vue.use(VueLazyload)
Vue.use(VueAnalytics, {
    id: 'UA-219359146-1',
    router
})

require('./dateFormatting')

window.axios = require('axios')

new Vue({
    el: '#app',
    router,
    store,
    data: () => ({
        ready: false
    }),
    template: `
    <div v-if="!ready" class="loader d-flex align-items-center justify-content-center">
    </div>    
    <div id="app" v-else>
    	<cms-bar />
		<navigation />
        <cookies-banner />
        <main>
            <transition v-on:enter="enter" v-on:afterEnter="afterEnter" v-on:before-leave="beforeLeave" v-on:leave="leave" v-on:before-enter="beforeEnter" appear mode="out-in">
                <router-view :key="$route.fullPath"></router-view>
            </transition>
        </main>
		<footer-component />
    </div>`,
    components: {
    	cmsBar: () => import('./partials/CmsBar.vue' /* webpackChunkName: "cms-bar" */),
        navigation: () =>  import('./partials/Navigation.vue' /* webpackChunkName: "navigation" */),
        footerComponent: () => import('./partials/Footer.vue' /* webpackChunkName: "footer" */),
        cookiesBanner: () => import('./views/components/CookiesBanner.vue' /* webpackChunkName: "cookies-banner" */)
    },
    created () {
        document.title = 'API'
        this.$store.dispatch('load').then(() => {
          this.ready = true
        })
        
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out-quart',
        });
      },
    mounted () {
        
    },
    methods: {
        beforeEnter: function (el) {
        },
        enter: function (el, done) {
            done()
        },
        afterEnter: function (el) {           
        },
        beforeLeave: function(el) {
            
        },
        leave: function (el, done) {
            done()
        }
    }
})
