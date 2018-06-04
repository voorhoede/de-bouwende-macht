<template>
  <div class="email-form">
    <div id="mc_embed_signup">
      <form action="https://versbeton.us6.list-manage.com/subscribe/post?u=9716cbcb5c33ca798ec305c59&amp;id=90d11b4629" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
        <div id="mc_embed_signup_scroll">
          <h2 class="sub-title">Dit spel is gebaseerd op het onderzoeksdossier De Bouwende Macht van Vers Beton. Wil je op de hoogte blijven? Schrijf je dan in voor onze wekelijkse nieuwsbrief en mis niets.</h2>
          <div class="indicates-required"><small><span class="asterisk">*</span> verplicht veld</small></div>
          <div class="field-group mc-field-group">
            <label class="label" for="mce-EMAIL">Emailadres <span class="asterisk">*</span></label>
            <input type="email" value="" name="EMAIL" class="required email text-input" id="mce-EMAIL">
          </div>
          <div class="name">
            <div class="field-group mc-field-group">
              <label class="label" for="mce-FNAME">Voornaam</label>
              <input type="text" value="" name="FNAME" class="text-input" id="mce-FNAME">
            </div>
            <div class="field-group mc-field-group">
              <label class="label" for="mce-LNAME">Achternaam</label>
              <input type="text" value="" name="LNAME" class="text-input" id="mce-LNAME">
            </div>
          </div>
          <div id="mce-responses" class="clear">
            <div class="response" id="mce-error-response" style="display:none; background-color:red!important;"></div>
            <div class="response" id="mce-success-response" style="display:none"></div>
          </div> <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
          <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_9716cbcb5c33ca798ec305c59_90d11b4629" tabindex="-1" value=""></div>
          <div class="clear"><input type="submit" value="inschrijven" name="subscribe" id="mc-embedded-subscribe" class="button button-primary"></div>
        </div>
      </form>
    </div>
    <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script>
    <script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
  </div>
</template>

<style scoped>
@import '~/assets/core.css';

.email-form {
  max-width: 400px;
  margin: 0 auto 5rem auto;
}

.sub-title {
  margin-bottom: var(--spacing-double);
  font-family: var(--font);
  font-size: var(--font-size-small);
  font-weight: normal;
}

.text-input {
  display: block;
  margin-bottom: var(--spacing-normal);
  padding: var(--spacing-half);
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--grey);
  border-radius: var(--border-radius-smooth);
}

.field-group {
  text-align: left;
}

@media screen and (min-width: 400px) {
  .name {
    display: flex;
    justify-content: space-between;
  }
}

.label {
  display: block;
  margin-bottom: var(--spacing-half);
  font-family: var(--font);
}

.asterisk {
  color: var(--red);  
}

.indicates-required {
  margin-bottom: var(--spacing-normal);  
  color: var(--grey-dark);
  text-align: left;
  font-family: var(--font);
}

.button {
  margin-top: var(--spacing-normal);
}

</style>