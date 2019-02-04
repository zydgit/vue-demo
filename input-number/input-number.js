

function isValueNumber (value) {
  return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '')
}

Vue.component('input-number', {
  
  template: `
    <div>
      <input :value="currentValue" @change="handleInputChange"/>
      <button :disabled="currentValue >= max" @click="handleIncrease">+</button>
      <button :disabled="currentValue <= min" @click="handleReduce">-</button>
    </div>
  `,

  watch: {
    value () {
      this.currentValue = this.value
    },

    currentValue () {

      if(this.currentValue >= this.max) {
        this.currentValue = this.max
      } else if (this.currentValue <= min) {
        this.currentValue = this.min
      }

      this.$emit('input', this.currentValue)
      this.$emit('on-change', this.currentValue)
    }
  },

  props: {
    min: {
      type: Number,
      default: -Infinity
    },

    max: {
      type: Number,
      default: Infinity
    },

    value: {
      type: Number,
      default: 0
    },

    step: {
      type:Number,
      default: 1
    }
  },

  data() {
    return {
      currentValue: this.value,
    }
  },

  methods: {
    handleIncrease() {
        this.currentValue += this.step
    },

    handleReduce() {
      this.currentValue -= this.step

    },

    handleInputChange(event) {
      const tval = event.target.value
      if (isValueNumber(tval)) {
        this.currentValue = Number(tval)
      } else {
        event.target.value = this.currentValue
      }
    }
  }
})