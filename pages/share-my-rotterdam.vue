<template>
  <section>
    <h1>
      Deel mijn Rotterdam
    </h1>
    <email-form />
  </section>
</template>

<script>
import EmailForm from '~/components/EmailForm.vue'

export default {
  components: { EmailForm },
  head: {
    script: [
      { src: '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js' }
    ]
  }
}
</script>