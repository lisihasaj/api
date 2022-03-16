<template>
    <div id="navigation" class="navigation" :class="{'active': menuToggle}" v-click-outside="closeMenu">
        <div class="nav__wrapper">
            <router-link @click.native="menuToggle = false;" class="nav__logo" :to="{name: 'home'}"><navLogo /></router-link>
            <div class="nav__links" ref="navLinks">
                <ul class="d-flex" :class="{'active': menuToggle}">
                    <li v-for="(section, index) in sections" :key="index" :class="{'active': activeSectionId === section.id}">
                        <a href="#" @click.prevent="menuToggle = true;activeSectionId = section.id" :class="{'active': section.slug === $route.params.sectionSlug}">{{section.title}}</a>
                    </li>
                </ul>
            </div>
            <div class="nav__locales d-flex">
                <Locales />
                <button @click="menuToggle = !menuToggle;activeSection ? activeSectionId = activeSection.id : activeSectionId = null" class="hamburger hamburger--spin hidden__desktop" type="button"
                    :class="{'is-active': menuToggle}">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
            <transition name="fade">
                <div class="nav__dropdown" v-show="menuToggle">
                    <button type="button" class="close__btn" @click="menuToggle = false;activeSectionId = null"></button>
                    <div class="nav__dropdown__links__wrapper">
                        <ul class="nav__dropdown__links d-flex">
                            <li v-for="section in sections" :key="section.id" :class="{'unocused': activeSectionId !== section.id && activeSectionId != null}">
                                <a href="#" @click.prevent="activeSectionId != section.id ? activeSectionId = section.id : activeSectionId = null;">{{section.title}}</a>
                                <transition name="dropdown">
                                    <ul v-show="activeSectionId === section.id">
                                        <li v-for="subsection in section.children" :key="subsection.id">
                                            <router-link @click.native="menuToggle = false" :to="{name: 'subsection', params:{sectionSlug: section.slug, subsectionSlug:subsection.slug}}">{{subsection.title}}<i class="icon-right"></i></router-link>
                                        </li>
                                    </ul>                            
                                </transition>
                            </li>
                        </ul>                        
                    </div>
                    <div class="nav__section-links">
                        <a href="https://get.teamviewer.com/qs_api" target="_blank" class="api__button--inverse">{{translations('remoteSupport')}}</a>
                        <a href="mailto:info@api.ch" class="api__button--inverse">{{translations('contact')}}</a>
                        <router-link :to="{name: 'subsection', params: {sectionSlug: talentSection.slug, subsectionSlug: jobSubsection.slug}}" class="api__button--inverse"> {{jobSubsection.title}}</router-link>
                    </div>
                    <SearchComponent />
                </div>            
            </transition>
        </div>
        <transition name="fade">
            <div v-if="$route.params.subsectionSlug" class="nav__sidebar">
                <div class="nav__sidebar__section">
                    <router-link class="back" :to="{name: 'home'}"><i class="icon-left"></i></router-link>
                    <h3>{{activeSection.title}}</h3>
                </div>
                <ul class="nav__sidebar__sublinks">
                    <li v-for="subsection in activeSection.children" :key="subsection.id">
                        <router-link :to="{name: 'subsection', params: {subsectionSlug: subsection.slug}}">{{subsection.title}} <i class="icon-right"></i></router-link>
                        <transition name="dropdownSidebar">
                            <ul v-show="subsection.slug === $route.params.subsectionSlug" class="nav__sidebar__sublinks-children">
                                <template v-if="(subsection.collections.length > 0) && (subsection.type != 'technical_profiles' && subsection.type != 'historie')">
                                    <li v-for="page in subsection.collections[0].pages" :key="page.id">
                                        <router-link :to="{name: 'page', params: {pageSlug: page.slug}}">{{page.title}} <i class="icon-right"></i></router-link>
                                    </li>
                                </template>
                            </ul>
                        </transition>
                    </li>
                </ul>
            </div>        
        </transition>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {navLogo} from '@/elements'
    import ClickOutside from '@/directives/click-outside'
    import {find} from '@/helpers'
    export default {
        components: {
            navLogo,
            Locales: () => import('@/partials/Locales' /*webpackChunkName: "locales"*/),
            SearchComponent: () => import('@/views/components/SearchComponent' /*webpackChunkName: "search-component"*/),
        },
        directives: {
            ClickOutside,
        },        
        watch: {
            $route: function() {
                this.menuToggle = false
            }
        },
        data () {
            return {
                menuToggle: false,
                dropdownToggle: false,
                activeSectionId: null,
            }
        },
        methods: {
            closeMenu() {
                this.menuToggle = false
            }
        },
        computed: {
            ...mapGetters({
                sections: 'getNavSections'
            }),
            activeSection() {
                return this.$store.getters.getSectionBySlug(this.$route.params.sectionSlug)
            },
            root() {
                return this.$store.getters.getSectionByType('root')
            },
            talentSection() {
                return find(this.sections, 'type', 'talents')
            },
            jobSubsection() {
                return this.$store.getters.getSubSectionsByType(`${this.talentSection.type}`, 'open_positions')
            }
        }
    }
</script>