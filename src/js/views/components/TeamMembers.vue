<template>
    <div class="default__content-team" v-if="teamGallery">
        <template v-for="(img, index) in teamGallery">
            <div class="team__item" :key="index" data-aos="fade-up" :data-aos-delay="index * 100">
                <div class="team__image">
                    <img  :src="teamUrl(img.url)" :alt="img.title + img.alt">
                    <div class="team__links" v-if="img.link">
                        <a target="_blank" :href="stringToArray(img.link)[0]"><i class="icon-linkedin"></i></a>
                        <a :href="`mailto:${stringToArray(img.link)[1]}`"><i class="icon-email"></i></a>
                    </div>                            
                </div>
                <div class="team__content">
                    <div>
                        <h3>{{img.title ? img.title : `${translations('form.firstName')} ${translations('form.lastName')}`}}</h3>
                        <h4 v-if="img.alt">{{img.alt}}</h4>                        
                    </div>
                    <div>
                        <p v-if="img.caption">{{img.caption}}</p>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    name: 'TeamComponent',
    props: ['teamGallery'],
    methods: {
        stringToArray(string) {
            return string.split(',')
        }
    },    
}
</script>