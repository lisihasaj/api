<template>
	<transition-group name="fade" mode="out-in" tag="div" appear>
        <News v-if="section.type === 'news'" :section="section" key="1"/>
	</transition-group>
</template>

<script>
    import { mapState } from 'vuex';
    import { metaConfig, formatMeta } from '../formatMeta'
    export default {
        name: 'SectionComponent',
        components: {
            News: () => import('@/views/News/News' /*webpackChunkName: 'news'*/)
        },
        created: function () {
            this.fetchData()
        },
        mixins: [metaConfig],
        watch: {
            $route: function () {
                this.fetchData()
            }
        },
        data () {
            return {
                section: {},
            }
        },
        methods: {
			fetchData () {
				const section = this.$store.getters.getSectionBySlug(this.$route.params.sectionSlug)

                if (!section) {
                    this.$router.push({name: 'not-found'})
                    return;
                }

				this.section = section

				this.params = formatMeta(this.section)
				this.$nextTick( () => {
					this.$emit('updateHead')
				})
			}
        },
		computed: {
			...mapState([
				'sections'
			])
		},
    }
</script>


