<template>
  <button class="scoremeter" @click="toggleExpand">
    <div class="scoremeter-icons">
      <div class="icon">
        <press class="press" v-if="press.score >= 5" />
        <press-negative class="press" v-if="press.score < 5" />
      </div>
      
      <div class="icon">
        <citizen class="citizen" v-if="citizens.score >= 5" />
        <citizen-angry class="citizen" v-if="citizens.score < 5" />
      </div>
      
      <div class="icon">
        <money class="money" v-if="money.score >= 5" />
        <money-negative class="money" v-if="money.score < 5" />
      </div>
    </div>

    <transition name="slide-right">
    <div v-if="expand" class="scoremeter-meters">
      <div class="meter">
        <div class="meter-gauge" :class="press.meterClass">
          <span :style="`width:${press.meterPercentage}%`"></span>
        </div>
      </div>
      
      <div class="meter">
        <div class="meter-gauge" :class="citizens.meterClass">
          <span :style="`width: ${citizens.meterPercentage}%`"></span>
        </div>
      </div>
      
      <div class="meter">
        <div class="meter-gauge" :class="money.meterClass">
          <span :style="`width: ${money.meterPercentage}%`"></span>
        </div>
      </div>
    </div>
    </transition>
  </button>
</template>

<script>
import PressNegative from '~/static/images/press-negative.svg'
import Press from '~/static/images/press.svg'
import Citizen from '~/static/images/citizen.svg'
import CitizenAngry from '~/static/images/citizen-angry.svg'
import Money from '~/static/images/money.svg'
import MoneyNegative from '~/static/images/money-negative.svg'

export default {
  components: { PressNegative, Press, Citizen, CitizenAngry, Money, MoneyNegative },
  props: ['scoremeter'],
  data () {
    return {
      expand: false,
      lowScore: 4,
      highScore: 6
    }
  },
  computed: {
    money () {
      return this.calculateMeters(this.scoremeter.money)
    },
    press () {
      return this.calculateMeters(this.scoremeter.press)
    },
    citizens () {
      return this.calculateMeters(this.scoremeter.citizens)
    }
  },
  methods: {
    toggleExpand() {
      this.expand = !this.expand
    },

    calculateMeters(score) {
      let meterClass;
      let meterPercentage = (score / 10) * 100
      
      if (meterPercentage < 5) { meterPercentage = 5 }

      if (score <= this.lowScore) { meterClass = 'negative' }
      if (score > this.lowScore && score < this.highScore) { meterClass = 'neutral'}
      if (score >= this.highScore) { meterClass = 'positive'}
      
      return {
        score,
        meterPercentage,
        meterClass
      }
    }
  }
}
</script>

<style scoped>
@import '~/assets/core.css';

.icon {
  width: 50px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.money,
.citizen {
  width: 45px;
}

.press {
  width: 30px;
  transform: rotate(-20deg);
}

.scoremeter {
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  position: absolute;
  top: 60px;
  left: 0;
  margin-top: var(--spacing-double);
  padding: 0;
  height: 145px;
  background-color: transparent;
  z-index: 1;
}

@media screen and (max-width: 600px) {
  .scoremeter {
    margin-top: 0;
    top: 60px;
  }
}

.scoremeter-icons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--spacing-half);
  background-color: var(--white);
  height: 145px;
}

.scoremeter-meters {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--spacing-half);
  background-color: var(--white);
  height: 145px;
  z-index: -1;
}

.meter {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
}

.meter-gauge { 
  display: block;
  border: 2px solid var(--black);
  border-radius: 30px;
  width: 100px;
  height: 25px;
  background: none;
  overflow: hidden;
}

.meter-gauge > span {
  display: block; 
  height: inherit;  
}

.meter-gauge.neutral > span {
  background-color: var(--orange);
}
.meter-gauge.positive > span {
  background-color: var(--green-secondary);
}
.meter-gauge.negative > span {
  background-color: var(--red-secondary);
}

button,
.button {
  padding: 0 var(--spacing-half);
  transition: none;
}

button:active,
.button:active {
  transform: none;
  box-shadow: none;
}
</style>
