<template>
  <section class="full-screen">

    <div class="">
      <button
        class="close-button"
        @click="onClickButton()"
      >
        &#10006;
      </button>  
      <h1>
        Over De Bouwende Macht
      </h1>
      <p>
        Deze game is gemaakt door <a class="link-external" href="www.versbeton.nl">Vers Beton</a>, het online tijdschrift
        voor ‘de harddenkende Rotterdammer’. Hij is gebaseerd op het onderzoeksdossier
        <a class="link-external" href="https://versbeton.nl/harde-kern/de-bouwende-macht">De Bouwende Macht</a> waarin
        Margot Smolenaars de macht van beleggers, investeerders, ontwikkelaars en politiek in
        Rotterdam onderzoekt.
      </p>
      <p>
        Eén van de resultaten is dat de Rotterdammer steeds vaker invloed heeft op hoe zijn stad wordt vormgegeven.
        Daarbij vindt de bouwende macht dat de politiek geen lange termijnvisie meer heeft op de ontwikkeling van
        de stad.
      </p>
      <p>
        Vind je het lastig om keuzes te maken zonder overzicht en plan? De bouwende macht vindt
        dat óók. Volgens hen is het hoog tijd dat het stadhuis een langetermijnvisie levert voor stadsontwikkeling:
        <a class="link-external" href="https://versbeton.nl/2018/05/de-bouwende-macht-vindt-het-stadhuis-is-stuk-2-2/">De bouwende macht vindt: het stadhuis is stuk (2/2)</a>
      </p>
      <p>
        En in dit artikel vertellen zij hoe het dan wél moet:
        <a href="#">URL NOT AVAILABLE YET</a>
      </p>
      <p>Bekijk <a class="link-external" href="https://versbeton.nl/harde-kern/de-bouwende-macht/">hier</a> alle artikelen in dit dossier.</p>
      <p>
        Enkele situaties in dit spel zijn gebaseerd op échte anekdotes over recente bouwprojecten. 
        In dit artikel kun je hier meer over lezen en een FAQ over de game:
        <a href="#">URL NOT AVAILABLE YET</a>
      </p>
    </div>
  </section>
</template>

<style scoped>

@import '~/assets/core.css';

.close-button {
  position: absolute;
  right: 0;
  top: 0;
  color: var(--pink);
  font-size: 1.25rem;
}

.close-button:hover,
.close-button:focus {
  color: var(--pink-secondary);
}

</style>

<script>

export default {
  methods: {
    onClickButton () {
      this.$emit('onClick')
    }
  }
}

</script>