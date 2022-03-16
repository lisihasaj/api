<template>
    <div class="open_positions">
        <DefaultContent :largeContainer="true" :navigation="false" :footerContent="checkField(subsection, 'footer_content') ? subsection.fields.footer_content.value : null">
            <h1 slot="title">{{subsection.title}}</h1>
            <div slot="content">
                <div v-html="subsection.content"></div>
                <JobPostsItem :jobsDisclaimer="checkField(subsection, 'jobs_disclaimer') ? subsection.fields.jobs_disclaimer.value : null"/>
            </div>
        </DefaultContent>
    </div>
</template>
<script>
export default {
    name: 'OpenPositions',
    props: ['subsection'],
    components: {
        DefaultContent: ()=> import('@/views/components/DefaultContent' /*webpackChunkName: "default-content"*/),
        JobPostsItem: ()=> import('@/views/components/JobPostsItem' /*webpackChunkName: "job-posts-item"*/),
    },
}
</script>