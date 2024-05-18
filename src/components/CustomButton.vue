<template>
  <button class="custom-button" :style="buttonStyle" @click="$emit('click')" :disabled="disabled">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    fontSize: {
      type: String,
      default: '16px'
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonStyle() {
      return {
        fontSize: this.fontSize
      }
    }
  }
}
</script>

<style scoped>
.custom-button {
  padding: 13px 20px;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  text-transform: uppercase;
  background: var(--color-background-linear-gradient);
  color: var(--color-text-white);
  
}
.custom-button:disabled {
  background: var(--color-background);
  color: var(--color-text-button);
  border: 2px solid var(--color-border-input);
  cursor: not-allowed;
}
</style>
/* Rectangle 4 */

position: absolute;
left: 14.86%;
right: 14.86%;
top: 90.69%;
bottom: 3.64%;

background: linear-gradient(270deg, #FFA800 0%, #FF6F00 100%);
filter: blur(13.5914px);
border-radius: 24px;




