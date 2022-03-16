<template>
    <div class="historie">
        <DefaultContent :largeContainer="true" :contact="false" :cardItems="pages ? pages : null" :hideMobilePagesLinks="false">
            <div slot="content" v-html="subsection.content" />
        </DefaultContent>
    </div>
</template>
<script>
import {find} from '@/helpers'
export default {
    name: 'Historie',
    props: ['subsection'],
    components: {
        DefaultContent: ()=> import('@/views/components/DefaultContent' /*webpackChunkName: "default-content"*/),
    },
    computed: {
        pages() {
            return find(this.subsection.collections, 'type', 'historie').pages
        }
    }
}
</script>