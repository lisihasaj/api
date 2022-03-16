<template>
    <div class="footer__subscribe">
        <h5>{{translations('subscribe')}}</h5>
        <form @submit.prevent="subscribe" class="form" :class="{'loading': loading}">
            <div class="form__group d-flex">
                <div class="input">
                    <input  type="text" name="" id="name" :placeholder="translations('form.firstName')" v-model="name" required>
                </div>
                <div class="input">
                    <input  type="text" name="" id="surname" :placeholder="translations('form.lastName')" v-model="surname" required>
                </div>
            </div>
            <div class="input">
                <input type="email" name="" id="mailadresse" :placeholder="`${translations('form.email')}*`" v-model="email" required>
            </div>
            <button type="submit" class="api__button">{{translations('send')}}</button>
        </form>
        <transition name="fade">
            <p class="response-message" v-if="responseMessage" v-html="responseMessage"></p>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'Subscribe',
        data() {
            return {
                email: '',
                name: '',
                surname: '',
                loading: false,
                responseMessage: ''
            }
        },
        methods: {
            async subscribe() {
                if (this.loading) return;
                this.loading = true;

                let subscriber = {
                    email: this.email,
                    firstname: `${this.name} ${this.surname}`
                }

                try {
                    await axios.post('/apis/v2/hubspot/subscribe', subscriber)
                    this.email = ''
                    this.firstname = ''
                    this.responseMessage = this.translations('subscribeForm.success')
                    this.loading = false;
                    setTimeout(() => {
                        this.responseMessage = ""
                    }, 5000)
                } catch (err) {
                    if (err.response && (err.response.status == 409)) {
                        this.responseMessage = this.translations('subscribeForm.alreadyExist')
                    } else {
                        this.responseMessage = this.translations('subscribeForm.error')
                    }
                    this.loading = false;
                }
            }
        },
    }

</script>
