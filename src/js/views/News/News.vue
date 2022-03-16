<template>
    <div class="news">
        <div class="nav__sidebar">
            <div class="nav__sidebar__section">
                <router-link class="back" :to="{name: 'home'}"><i class="icon-left"></i></router-link>
                <h3>{{translations('year')}}</h3>
            </div>
            <scrollactive tag="ul" class="nav__sidebar__sublinks" :alwaysTrack="true" :offset="100" :scrollOffset="100" :scrollOnStart="true" :modifyUrl="true">
                <li v-for="(year, index) in allDates" :key="index">
                    <a :href="`#year-${year}`" class="scrollactive-item">{{year}} <i class="icon-right"></i></a>
                </li>
            </scrollactive>                        
        </div>
        <div class="news-sliders">
            <div class="news-sliders__wrapper">
                <h1>{{section.title}}</h1>
                <template v-for="year in allDates">
                    <NewsSlider :key="year" :year="year" :id="`year-${year}`" />
                </template>            
            </div>
        </div>
    </div>
</template>


<script>
    import Vue from 'vue'
    import _orderBy from 'lodash/orderBy'
    import VueScrollactive from 'vue-scrollactive';
    Vue.use(VueScrollactive);
    export default {
        name: 'News',
        props: ['section'],
        components: {
            NewsSlider: () => import('./NewsSlider' /*webpackChunkName: "news-slider"*/)
        },
        mounted() {
            setTimeout(() =>  {
                if(this.$route.hash) {
                    let hash = this.$route.hash.replace('#', '')
                    let el = document.getElementById(`${hash}`)
                    el.scrollIntoView({behavior: "smooth", block: "center"})
                }
            }, 500)
        },
        computed: {
            pages() {
                return this.$store.getters.getNewsPages
            },
            allDates() {
                let dates = []
                // Get Date field from Pages
                this.pages.forEach(element => {
                    if(this.checkField(element, 'date')) {
                        let year = this.getYearFromDate(element.fields.date.value)
                        dates.push(year)
                    }
                });
                // Sort Dates
                dates.sort(function(a, b){return b-a});
                // Return unique values in array
                return [...new Set(dates)]
            }
        }
    }

</script>
