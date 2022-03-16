<template>
	<transition-group name="fade" mode="out-in" tag="div" appear>
        <!-- Expertise Subsections -->
		<Strategie v-if="subsection.type == 'strategie'" :subsection="subsection" key="1"></Strategie>
		<Consulting v-if="subsection.type == 'consulting'" :subsection="subsection" key="2"></Consulting>
		<Accompagnement v-if="subsection.type == 'accompaniement'" :subsection="subsection" key="3"></Accompagnement>
		<RH v-if="subsection.type == 'rh'" :subsection="subsection" key="3"></RH>

        <!-- Solutions Subsections -->
        <Si v-if="subsection.type == 'si'" :subsection="subsection" key="4"></Si>
        <It v-if="subsection.type == 'it'" :subsection="subsection" key="5"></It>

        <!-- References Subsections -->
        <Spectre v-if="subsection.type == 'spectre'" :subsection="subsection" key="6"></Spectre>
        <StrategieReferences v-if="subsection.type == 'strategie_references'" :subsection="subsection" key="7"></StrategieReferences>
        <Schema v-if="subsection.type == 'schema'" :subsection="subsection" key="8"></Schema>

        <!-- Talents Subsections -->
        <Delegation v-if="subsection.type == 'delegation'" :subsection="subsection" key="9"></Delegation>
        <TryHire v-if="subsection.type == 'try_hire'" :subsection="subsection" key="10"></TryHire>
        <TechnicalProfiles v-if="subsection.type == 'technical_profiles'" :subsection="subsection" key="11"></TechnicalProfiles>
        <OpenPositions v-if="subsection.type == 'open_positions'" :subsection="subsection" key="12"></OpenPositions>
        <UnsolicitedApplications v-if="subsection.type == 'unsolicited_applications'" :subsection="subsection" key="13"></UnsolicitedApplications>

        <!-- About Subsections -->
        <ValuesMissions v-if="subsection.type == 'values_missions'" :subsection="subsection" key="14"></ValuesMissions>        
        <Team v-if="subsection.type == 'team'" :subsection="subsection" key="15"></Team>        
        <SocialResponsibility v-if="subsection.type == 'social_responsibility'" :subsection="subsection" key="16"></SocialResponsibility>        
        <Historie v-if="subsection.type == 'historie'" :subsection="subsection" key="17"></Historie>

        <!-- Privacy policy section -->
        <PrivacyPolicy v-if="subsection.type == 'integration'" :subsection="subsection" key="18"></PrivacyPolicy>
        <PrivacyPolicy v-else-if="subsection.type == 'data_protection'" :subsection="subsection" key="19"></PrivacyPolicy>
        <PrivacyPolicy v-else-if="subsection.type == 'cookies'" :subsection="subsection" key="21"></PrivacyPolicy>
        <PrivacyPolicy v-else-if="subsection.type == 'legals'" :subsection="subsection" key="22"></PrivacyPolicy>
        <PrivacyPolicy v-else-if="subsection.type == 'terms_and_conditions'" :subsection="subsection" key="23"></PrivacyPolicy>
        <PrivacyPolicy v-else-if="subsection.type == 'i_frames'" :subsection="subsection" key="24"></PrivacyPolicy>
        <PrivacyPolicy v-else-if="subsection.type == 'disclaimer'" :subsection="subsection" key="25"></PrivacyPolicy>
        <PrivacyPolicy v-else-if="subsection.type == 'link_removal'" :subsection="subsection" key="26"></PrivacyPolicy>
        <PrivacyPolicy v-else-if="subsection.type == 'rights_reservation'" :subsection="subsection" key="27"></PrivacyPolicy>
        <PrivacyPolicy v-else-if="subsection.type == 'content_responsibility'" :subsection="subsection" key="28"></PrivacyPolicy>
        <PrivacyPolicy v-else-if="subsection.type == 'hyperlinks'" :subsection="subsection" key="29"></PrivacyPolicy>
        <PrivacyPolicy v-else-if="subsection.type == 'license'" :subsection="subsection" key="30"></PrivacyPolicy>
	</transition-group>
</template>

<script>
    import { mapState } from 'vuex';
    import { metaConfig, formatMeta } from '../formatMeta'
    import {find} from '@/helpers'
    export default {
        name: 'SubSectionComponent',
		components: {
			Strategie: () => import('@/views/subsections/Expertise/Strategie.vue' /* webpackChunkName: "strategie" */),
			Consulting: () => import('@/views/subsections/Expertise/Consulting.vue' /* webpackChunkName: "consulting" */),
			Accompagnement: () => import('@/views/subsections/Expertise/Accompagnement.vue' /* webpackChunkName: "accompagnement" */),
			RH: () => import('@/views/subsections/Expertise/RH.vue' /* webpackChunkName: "rh" */),

			Si: () => import('@/views/subsections/Solutions/Si.vue' /* webpackChunkName: "si" */),
			It: () => import('@/views/subsections/Solutions/It.vue' /* webpackChunkName: "it" */),

			Spectre: () => import('@/views/subsections/References/Spectre.vue' /* webpackChunkName: "spectre" */),
			StrategieReferences: () => import('@/views/subsections/References/StrategieReferences.vue' /* webpackChunkName: "strategie-references" */),
			Schema: () => import('@/views/subsections/References/Schema.vue' /* webpackChunkName: "schema" */),

			Delegation: () => import('@/views/subsections/Talents/Delegation.vue' /* webpackChunkName: "delegation" */),
			TryHire: () => import('@/views/subsections/Talents/TryHire.vue' /* webpackChunkName: "try-hire" */),
			TechnicalProfiles: () => import('@/views/subsections/Talents/TechnicalProfiles.vue' /* webpackChunkName: "technical-profiles" */),
			OpenPositions: () => import('@/views/subsections/Talents/OpenPositions.vue' /* webpackChunkName: "open-position" */),
			UnsolicitedApplications: () => import('@/views/subsections/Talents/UnsolicitedApplications.vue' /* webpackChunkName: "unsolicited-applications" */),

			ValuesMissions: () => import('@/views/subsections/About/ValuesMissions.vue' /* webpackChunkName: "values-missions" */),
			Team: () => import('@/views/subsections/About/Team.vue' /* webpackChunkName: "team" */),
			SocialResponsibility: () => import('@/views/subsections/About/SocialResponsibility.vue' /* webpackChunkName: "social-responsibility" */),
			Historie: () => import('@/views/subsections/About/Historie.vue' /* webpackChunkName: "historie" */),
            
            PrivacyPolicy: () => import('@/views/subsections/Privacy/PrivacyPolicy.vue' /* webpackChunkName: "privacy-policy" */),
        },
        mixins: [metaConfig],
        watch: {
            $route: function () {
                this.fetchData()
            }
        },
        created: function () {
            this.fetchData()
        },
        data () {
            return {
                subsection: {},
            }
        },
        methods: {
			fetchData () {
				const section = this.$store.getters.getSectionBySlug(this.$route.params.sectionSlug)
                const subsection = find(section.children, 'slug', this.$route.params.subsectionSlug)
                const newsPage = this.$store.getters.getPageBySlug(this.$route.params.subsectionSlug)

                if(subsection) {
                    this.subsection = subsection

                    this.params = formatMeta(this.subsection)
                    this.$nextTick( () => {
                        this.$emit('updateHead')
                    })                    
                } else if(newsPage) {
                    this.$router.push({
                        name: 'news',
                        params: {
                            sectionSlug: this.$route.params.sectionSlug,
                            newsSlug: this.$route.params.subsectionSlug,
                        }                            
                    })
                } else {
                    this.$router.push({name: 'not-found'})
                    return;                    
                }
			}
        },
		computed: {
			...mapState([
				'sections'
			])
		},
    }
</script>


