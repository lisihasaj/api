<template>
    <div class="team">
        <DefaultContent :teamGallery="checkField(subsection, 'team') ? subsection.fields.team.value : null" :mediumContainer="true" :footerContent="checkField(subsection, 'footer_content') ? subsection.fields.footer_content.value : null">
            <h1 slot="title">{{subsection.title}}</h1>
            <div slot="content" v-html="subsection.content"></div>
        </DefaultContent>
    </div>
</template>
<script>
export default {
    name: 'Team',
    props: ['subsection'],
    components: {
        DefaultContent: ()=> import('@/views/components/DefaultContent' /*webpackChunkName: "default-content"*/),
    },
}
</script>