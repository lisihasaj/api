import VueRouter from 'vue-router';
const locales = JSON.parse(window_locales)
let homeSection = locales.filter((l) => l.key == currentAppLocale)
const homeSlug = homeSection[0].root_slug

const _routes = [
    {
        path: '/',
        redirect: '/fr'
    },
    {
        path: `/:locale/${homeSlug}`,
        redirect: `/${currentAppLocale}`
    },    
    {
        path: '/:locale',
        component: () => import('@/views/Home'),
        name: 'home'
    },  
    {
        path: '/:locale/:sectionSlug',
        component: () => import('@/components/section'),
        name: 'section',
    },
    {
        path: '/:locale/:sectionSlug/:subsectionSlug',
        component: () => import('@/components/subsection'),
        name: 'subsection'
    },
    {
        path: '/:locale/:sectionSlug/:newsSlug',
        component: () => import('@/components/page'),
        name: 'news',
    },
    {
        path: '/:locale/:sectionSlug/:subsectionSlug/:pageSlug',
        component: () => import('@/components/page'),
        name: 'page'
    },
    {
        path: '/404',
        alias: '*',
        component: () => import('@/components/NotFound'),
        name: 'not-found'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: _routes,
    linkActiveClass: 'active',
    scrollBehavior (to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash,
                behavior: 'smooth',
                offset: {
                    x: 0, y: 100
                }
            }
        } else {
            return { x: 0, y: 0 }
        }
    }     
})

export default router
