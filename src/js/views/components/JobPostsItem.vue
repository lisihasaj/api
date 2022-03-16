<template>
    <div class="job__posts">
        <div class="job__posts-filters">
            <button type="button" class="filter__toggle-btn" @click.prevent="toggleFilters = !toggleFilters" :class="{'active': toggleFilters}">{{translations('filters')}} <i class="icon-down"></i></button>
            <transition name="dropdown">
                <div class="dropdown" v-show="toggleFilters">
                    <JobFilter key="Canton" :filterType="'canton'" :filterJobs="filterJobs" :title="translations('jobProperties.canton')"/>
                    <JobFilter key="Categories" :filterType="'categorie'" :filterJobs="filterJobs" :title="translations('jobProperties.categorie')"/>
                    <JobFilter key="LevelOfExperience" :filterType="'level_of_experience'" :filterJobs="filterJobs" :title="translations('jobProperties.levelOfExperience')"/>
                    <JobFilter key="Duration" :filterType="'duration_mission'" :filterJobs="filterJobs" :title="translations('jobProperties.duration')"/>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div key="1" class="job__posts-lists" v-if="jobs">
                <template  v-for="(post, index) in jobs">
                    <div :key="index" class="job__posts-item">
                        <button :id="post.id" type="button" class="job__posts-item__title" @click="toggleAccordion(post.id)" :class="{'open': activeAccordion === post.id}">
                            <h2>{{post.job_title}}</h2>
                        </button>
                        <transition name="dropdown" @enter="startTransition" @after-enter="endTransition" @before-leave="startTransition" @after-leave="endTransition">
                            <div class="dropdown job__posts-item__content" v-if="activeAccordion === post.id">
                                <div v-if="post.canton" class="d-flex"><strong>{{translations('jobProperties.canton')}}: </strong><p>{{post.canton}}</p></div>
                                <div v-if="post.categorie" class="d-flex"><strong>{{translations('jobProperties.categorie')}}: </strong><p>{{post.categorie}}</p></div>
                                <div v-if="post.duration_mission" class="d-flex"><strong>{{translations('jobProperties.duration')}}: </strong><p>{{post.duration_mission}}</p></div>
                                <div v-if="post.client_project_context"><strong>{{translations('jobProperties.clientProjectContext')}}: </strong><p v-html="post.client_project_context"></p></div>
                                <div class="job__posts-item__role" v-if="post.your_role"><strong>{{translations('jobProperties.yourRole')}}: </strong><p v-html="post.your_role"></p></div>
                                <div class="job__posts-item__profile" v-if="post.your_profile"><strong>{{translations('jobProperties.yourProfil')}}: </strong><div v-html="post.your_profile"></div></div>
                                <div v-if="post.manager" class="d-flex"><strong>{{translations('jobProperties.recruter')}}: </strong>{{post.manager}}</div>
                                <div class="job__posts-item__contact" v-if="post.contact_name || post.contact_lastname || post.contact_email || post.contact_mobile || post.contact_telephone">
                                    <h2>{{translations('contact')}}</h2>
                                    <div class="job__posts-item__profile-item">
                                        <div v-if="post.contact_name && post.contact_lastname" class="d-flex"><strong>{{translations('jobProperties.contactName')}} {{translations('jobProperties.contactLastName')}}: </strong><p>                             
                                        <template v-if="post.contact_name">
                                            {{post.contact_name}}
                                        </template>
                                        <template v-if="post.contact_lastname">
                                            {{post.contact_lastname}}
                                        </template></p></div>
                                        <div v-if="post.contact_email" class="d-flex"><strong>{{translations('jobProperties.contactEmail')}}: </strong><p>{{post.contact_email}}</p></div>
                                        <div v-if="post.contact_mobile" class="d-flex"><strong>{{translations('jobProperties.contactMobile')}}: </strong><p>{{post.contact_mobile}}</p></div>
                                        <div v-if="post.contact_telephone" class="d-flex"><strong>{{translations('jobProperties.contactTelephone')}}: </strong><p>{{post.contact_telephone}}</p></div>
                                    </div>
                                </div>                                
                                <br/>
                                <iframe :src="post.url" frameborder="0"></iframe>
                                <div  class="job__posts-item__content-footer" v-if="jobsDisclaimer" v-html="jobsDisclaimer"></div>
                            </div>
                        </transition>
                    </div>
                </template>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'JobPostsItem',
    props:['jobsDisclaimer'],
    components: {
        JobFilter: () => import('@/views/components/JobFilter' /*webpackChunkName: "job-filter"*/)
    },
    data() {
        return {
            toggleFilters: false,
            activeAccordion: null,
            filters: [],
            jobs: []
        }
    },
    created() {
        this.$store.dispatch('loadJobs').then(() => {
            this.jobs = this.items
        })
    },
    methods:{
        filterJobs() {
            let activeFilters = {
                canton: this.$children[0].selected ?? '',
                categorie: this.$children[1].selected ?? '',
                experience: this.$children[2].selected ?? '',
                duration: this.$children[3].selected ?? ''
            };

            const isNullish = Object.values(activeFilters).every(v => {
                if(v == null || v == undefined) { return true }
                return false
            });

            if(!isNullish){
                return this.jobs = this.items.filter(job => {
                    if (
                        job['canton'].includes(activeFilters.canton) &&
                        job['categorie'].includes(activeFilters.categorie) &&
                        job['level_of_experience'].includes(activeFilters.experience) &&
                        job['duration_mission'].includes(activeFilters.duration)
                    ){
                        return true
                    }
                    return false
                });
            } else {
                return this.jobs = this.items;
            }
        },
        toggleAccordion(id) {
            const activePage = document.getElementById(id);
            id !== this.activeAccordion ? this.activeAccordion = id : this.activeAccordion = null;

            setTimeout(() => {
                activePage?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            }, 200)
        },
        startTransition(el) {
            el.style.height = el.scrollHeight + 'px'
        },
        endTransition(el) {
            el.style.height = ''
        }
    },
    computed: {
        items() {
            return this.$store.getters.getJobs
        }
    }
}
</script>