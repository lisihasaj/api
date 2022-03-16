<template>
    <div class="social_responsibility">
        <DefaultContent :footerContent="checkField(subsection, 'footer_content') ? subsection.fields.footer_content.value : null">
            <div class="img-1" slot="image" v-lazy:background-image="checkField(subsection, 'image') ? fullScreenUrl(subsection.fields.image.value[0].url) : ''" />
            <div class="img-2" slot="image" v-lazy:background-image="checkField(subsection, 'image') ? fullScreenUrl(subsection.fields.image.value[0].url) : ''" />
            <h1 slot="title">{{subsection.title}}</h1>
            <div slot="content" v-html="subsection.content" />
        </DefaultContent>
    </div>
</template>
<script>
export default {
    name: 'SocialResponsibility',
    props: ['subsection'],
    components: {
        DefaultContent: ()=> import('@/views/components/DefaultContent' /*webpackChunkName: "default-content"*/),
    },
}
</script>