<template>
    <div>
        <ValidationObserver ref="form" tag="form" class="form" @submit.prevent="sendEmail" :class="{'loading': loading}">
            <div class="form__group d-flex">
                <ValidationProvider class="input" tag="div" :name="translations('form.lastName')" rules="required" v-slot="{ errors }">
                    <input v-model="user.last_name" type="text" :placeholder="`${translations('form.lastName')}`">
                    <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider class="input" tag="div" :name="translations('form.firstName')" rules="required" v-slot="{ errors }">
                    <input v-model="user.name" type="text" :placeholder="`${translations('form.firstName')}`">
                    <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
            </div>
            <div class="form__group d-flex">
                <ValidationProvider class="input" tag="div" :name="translations('form.email')" rules="required|email" v-slot="{ errors }">
                    <input v-model="user.email" type="text" :placeholder="`${translations('form.email')} *`">
                    <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider class="input input__select" tag="div" :name="translations('form.topic')" rules="required" v-slot="{ errors }">
                    <select name="dropdown" id="select" v-model="user.topic">
                        <option value="" disabled selected>{{translations('form.topic')}} *</option>
                        <option :value="translations('form.selectOne')">{{translations('form.selectOne')}}</option>
                        <option :value="translations('form.selectTwo')">{{translations('form.selectTwo')}}</option>
                        <option :value="translations('form.selectThree')">{{translations('form.selectThree')}}</option>
                        <option :value="translations('form.selectFour')">{{translations('form.selectFour')}}</option>
                    </select>
                    <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
            </div>
            <ValidationProvider class="input" tag="div" :name="translations('form.message')" rules="required" v-slot="{ errors }">
                <textarea cols="30" rows="10" :placeholder="`${translations('form.message')} *`" v-model="user.message"></textarea>
                <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <div class="submit d-flex">
                <button class="clearForm-btn" type="button" @click="clearForm">{{translations('deleteEverything')}}</button>
                <button type="submit" class="api__button">{{translations('send')}}</button>
            </div>
        </ValidationObserver>
        <transition name="fade">
            <p class="response-message" v-if="responseMessage" v-html="responseMessage"></p>
        </transition>
    </div>
</template>

<script>
    import {
        ValidationProvider,
        ValidationObserver,
        localize,
    } from 'vee-validate/dist/vee-validate.full';
    export default {
        name: 'ContacForm',
        components: {
            ValidationProvider,
            ValidationObserver,
        },
        data() {
            return {
                user: {
                    topic: '',
                    last_name: '',
                    name: '',
                    email: '',
                    message: '',
                },
                responseMessage: '',
                loading: false
            }
        },
        methods: {
            clearForm() {
                this.user = {
                    topic: ''
                }
                this.$refs.form.reset();
            },
            sendEmail: function (e) {
                this.$refs.form.validate().then(success => {
                    if (success) {
                        if (this.loading) return;
                        this.loading = true;
                        axios.post(`${this.$route.params.locale}/apis/v2/mail/send`, this.user)
                            .then(response => {
                                this.user = {topic: ''}
                                this.$refs.form.reset();
                                this.responseMessage = this.translations('form.contactConfirmationMessage');
                                setTimeout(() => {
                                    this.responseMessage = ""
                                }, 5000)
                                this.loading = false
                            })
                            .catch(error => {
                                this.loading = false
                                this.responseMessage = this.translations('form.contactErrorMessage')
                            })
                    } else {
                        // validation failed
                        console.log('invalid form')
                    }
                }).catch(() => {
                    // something went wrong
                });
            },
        },
        mounted() {
            var locale = this.$route.params.locale;
            switch (locale) {
                case 'en':
                    localize('en', require('vee-validate/dist/locale/en.json'));
                    break;
                case 'de':
                    localize('de', require('vee-validate/dist/locale/de.json'));
                    break;
                case 'it':
                    localize('it', require('vee-validate/dist/locale/it.json'));
                    break;
                default:
                    localize('fr', require('vee-validate/dist/locale/fr.json'));
            }
        },
    }

</script>
