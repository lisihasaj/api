<template>
    <div class="unsolicited-applications">
        <DefaultContent :uaFrame="true" :footerContent="subsection.fields.footer_content.value">
            <h1 slot="title">{{subsection.title}}</h1>
            <div slot="content" v-html="subsection.content"></div>
            <iframe slot="ua-frame" :src="subsection.fields.iframe.value" frameborder="0"></iframe>
        </DefaultContent>
    </div>
</template>

<script>
export default {
    name: 'UnsolicitedApplications',
    props: ['subsection'],
    components: {
        DefaultContent: ()=> import('@/views/components/DefaultContent' /*webpackChunkName: "default-content"*/),
    }
}
</script>