<template>
    <footer class="footer">
        <div class="footer__header">
            <footerLogo />
            <div class="footer__header__actions">
                <p>{{translations('supportClient')}}&nbsp;&nbsp;<a href="tel:+41848108108"> +41 848 108 108</a></p>
                <div class="btns">
                    <a href="https://get.teamviewer.com/qs_api" target="_blank" class="api__button">
                        {{translations('remoteSupport')}}
                    </a>
                    <router-link class="api__button" :to="{name: 'subsection', params: {sectionSlug: privacyPolicy.slug, subsectionSlug: privacyPolicy.children[0].slug}}">
                        {{translations('privacyPolicy')}}
                    </router-link>
                </div>
            </div>
        </div>
        <div class="footer__body">
            <div class="footer__col">
                <!-- Locations -->
                <div class="footer__locations" v-html="footer.content"></div>

                <div class="footer__socials__subscribe d-flex">
                    <!-- Socials -->
                    <div class="footer__socials">
                        <h5>{{translations('findUsOn')}}</h5>
                        <a href="https://www.facebook.com/Assistanceprofessionnelleinformatique" target="_blank"><i class="icon-facebook"></i></a>
                        <a href="https://www.linkedin.com/company/api/" target="_blank"><i class="icon-linkedin"></i></a>
                        <a href="https://www.instagram.com/apiswitzerland/?hl=fr" target="_blank"><i class="icon-instagram"></i></a>
                        <a href="https://www.youtube.com/channel/UCoSKxsEsWzSlzhFpy1zM-iQ" target="_blank"><i class="icon-youtube"></i></a>
                    </div>
                    <!-- Subscribe -->
                    <Subscribe />
                </div>
            </div>
            <div class="footer__col">
                <!-- Form -->
                <div class="footer__form">
                    <ContactForm/>
                </div>
            </div>
        </div>
        <!-- Copyright -->
        <div class="footer__copyright">
            <span>Copyright © {{new Date().getFullYear()}} {{translations('copyrights')}}</span>
        </div>
    </footer>
</template>

<script>
    import {footerLogo} from '@/elements'
    export default {
        name: 'Footer',
        components: {
            footerLogo,
            ContactForm: ()=> import('@/views/components/ContactForm' /*webpackChunkName: "contact-form"*/),
            Subscribe: ()=> import('@/views/components/Subscribe' /*webpackChunkName: "subscribe-form"*/),
        },
        computed: {
            footer() {
                return this.$store.getters.getSectionByType('footer');
            },
            privacyPolicy() {
                return this.$store.getters.getSectionByType('privacy_policy');
            },
            legals() {
                return this.privacyPolicy.children.find(ss => ss.type === 'terms_and_conditions');
            }
        }
    }
</script>
