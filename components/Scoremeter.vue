<template>
  <button class="scoremeter" @click="toggleExpand">
    <div v-if="!expand" class="scoremeter-small">
      <pers-positief class="badge pers" v-if="pers.score >= 5" />
      <pers-negatief class="badge pers" v-if="pers.score < 5" />
      <burgers-happy class="badge burgers" v-if="burgers.score >= 5" />
      <burgers-bozen class="badge burgers" v-if="burgers.score < 5" />
      <geld class="badge geld" v-if="geld.score >= 5" />
      <geen-geld class="badge geld" v-if="geld.score < 5" />
    </div>
  
    <div v-else class="scoremeter-expanded">
      <div class="meter">
          <div class="meter-gauge" :class="pers.persClass">
            <span :style="`width: ${pers.persPercentage}%`"></span>
          </div>
        <pers-positief class="pers" />
      </div>
      <div class="meter">
        <div class="meter-gauge" :class="burgers.burgersClass">
          <span :style="`width: ${burgers.burgersPercentage}%`"></span>
        </div>
        <burgers-happy class="burger" />
      </div>
      <div class="meter">
        <div class="meter-gauge" :class="geld.geldClass">
          <span :style="`width: ${geld.geldPercentage}%`"></span>
        </div>
        <geld class="geld" />
      </div>
    </div>
  </button>
</template>

<script>
import PersNegatief from '~/static/images/pers-negatief.svg'
import PersPositief from '~/static/images/pers-positief.svg'
import BurgersHappy from '~/static/images/smile.svg'
import BurgersBozen from '~/static/images/burgers-bozen.svg'
import Geld from '~/static/images/money.svg'
import GeenGeld from '~/static/images/dollar.svg'

export default {
  components: { PersNegatief, PersPositief, BurgersHappy, BurgersBozen, Geld, GeenGeld },
  props: ['scoremeter'],
  data () {
    return {
      expand: false,
    }
  },
  computed: {
    geld () {
      const score = this.scoremeter.geld
      const geldPercentage = (this.scoremeter.geld / 10) * 100
      let geldClass;

      if (score <= 3) { geldClass = 'red' }
      if (score > 3 && score <= 6) { geldClass = 'orange'}
      if (score > 6) { geldClass = 'green'}
      
      return {
        score,
        geldPercentage,
        geldClass
      }
    },
    pers () {
      const score = this.scoremeter.pers
      const persPercentage = (this.scoremeter.pers / 10) * 100
      let persClass;

      if (score <= 3) { persClass = 'red' }
      if (score > 3 && score <= 6) { persClass = 'orange'}
      if (score > 6) { persClass = 'green'}
      
      return {
        score,
        persPercentage,
        persClass
      }
    },
    burgers () {
      const score = this.scoremeter.burgers
      const burgersPercentage = (this.scoremeter.burgers / 10) * 100
      let burgersClass;

      if (score <= 3) { burgersClass = 'red' }
      if (score > 3 && score <= 6) { burgersClass = 'orange'}
      if (score > 6) { burgersClass = 'green'}
      
      return {
        score,
        burgersPercentage,
        burgersClass
      }
    }
  },
  methods: {
    toggleExpand() {
      this.expand = !this.expand
    },
  }
}
</script>

<style scoped>
@import '~/assets/core.css';

.badge {
  height: 30px;
  width: 30px;
  position: relative;
}

.pers,
.geld,
.burger {
  height: 30px;
  widows: 30px;
}

.meter-gauge { 
  border-radius: 3px;
  display: block;
  margin: 0 1rem;
  width: 100px;
  height: 20px;
  background: none;
  background-color: #eee; 
  box-shadow: 0 1px 3px rgba(0,0,0,0.1) inset;
  overflow: hidden;
}

.meter-gauge.orange > span {
  background-color: orange;
}
.meter-gauge.green > span {
  background-color: green;
}
.meter-gauge.red > span {
  background-color: red;
}
  
.meter-gauge > span {
  height: inherit;  
  display: block;
}

.meter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.badge:not(:last-child),
.meter:not(:last-child) {
  margin-bottom: 10px;
}

.scoremeter {
  height: 135px;
  position: absolute;
  top: 20%;
  right: 0;
  background-color: var(--white);
  box-shadow: var(--box-shadow);
  margin-top: 2rem;
}

button,
.button {
  padding: 0 .5rem;
}

.scoremeter-small,
.scoremeter-expanded {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

</style>
