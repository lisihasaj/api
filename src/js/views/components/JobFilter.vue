<template>
    <div class="filter" v-if="options.length">
        <span class="filter__name">{{title}}</span>
        <div class="filter__list">
            <template v-for="(option, index) in options">
                <button :key="index" type="button" @click="getFilter(option)" :class="{'active': selected === option}">{{option}}</button>
            </template>
        </div>
    </div> 
</template>
<script>
export default {
    name: 'JobFilter',
    props: ['filterType', 'title', 'filterJobs'],
    data() {
        return {
            selected: null,
        };
    },
    methods:{
        getFilterOptions(array, key) {
            let arr = array.map(el => {return el[key]})
            return [...new Set(arr.filter(el => el.length > 0))]
        },
        getFilter(option) {
            if(this.selected !== option) {
                this.selected = option;
                this.filterJobs();
            } else {
                this.selected = null;
                this.getFilter()
            }
        },
    },
    computed: {
        jobs() {
            return this.$store.getters.getJobs
        },
        options() {
            return this.getFilterOptions(this.jobs, `${this.filterType}`);
        },        
    }
}
</script>