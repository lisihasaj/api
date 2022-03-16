<template>
    <div class="privacy-policy">
        <DefaultContent class="privacy-policy">
            <h1 slot="title" class="privacy-policy-title">{{translations('privacyPolicy')}}</h1>
            <div slot="content" v-html="subsection.content" class="privacy-policy-content"></div>
        </DefaultContent>
    </div>
</template>

<script>
export default {
    name: 'Legals',
    props: ['subsection'],
    components: {
        DefaultContent: ()=> import('@/views/components/DefaultContent' /*webpackChunkName: "default-content"*/)
    }
}
</script>