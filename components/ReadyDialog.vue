<template>
  <div class="ready-dialog">
    <p>Goed bezig, je bent al lekker op weg met het bouwen aan jouw Rotterdam!</p>
    <p>Als je wilt, kan je vanaf nu jouw Rotterdam delen!</p>
    <nuxt-link to="/share-my-rotterdam" >
      Dit is mijn Rotterdam!
    </nuxt-link>
    <p>Je kan natuurlijk ook nog verder bouwen!</p>
    <button @click="onClickButton()">Ik bouw nog verder</button>
  </div>
</template>

<script>

export default {
  methods: {
    onClickButton () {
      this.$emit('onClick')
    }
  }
}

</script>

<style scoped>

.ready-dialog {
  width: 100%;
  height: 40vh;
  padding: 2rem;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: white;
  box-shadow: 10px 10px 10px 10px #ccc;
}

</style>