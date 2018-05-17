<template>
  <div class="ready-dialog">
    <p>Goed bezig, je bent al lekker op weg met het bouwen aan jouw Rotterdam!</p>
    <p>Als je wilt, kan je vanaf nu jouw Rotterdam delen!</p>
    <ready-button />
    <p>Je kan natuurlijk ook nog verder bouwen!</p>
  </div>
</template>

<script>
import ReadyButton from '~/components/ReadyButton.vue'

export default {
  components: { ReadyButton },
}
</script>