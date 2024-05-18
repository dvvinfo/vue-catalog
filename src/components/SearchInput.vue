<template>
    <div class="search">
      <input
        class="input"
        type="text"
        :value="localValue"
        @input="onInput"
        :placeholder="placeholder"
      />
      <button class="clear-button" @click="clearSearch">
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.815 0L8 6.815L1.185 0L0 1.185L6.815 8L0 14.815L1.185 16L8 9.185L14.815 16L16 14.815L9.185 8L16 1.185L14.815 0Z"
            fill="#979797"
          />
        </svg>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchInput',
    props: {
      value: String,
      placeholder: {
        type: String,
        default: 'Например, Санкт-петербург'
      }
    },
    data() {
      return {
        localValue: this.value
      };
    },
    watch: {
      value(newVal) {
        this.localValue = newVal;
      }
    },
    methods: {
      onInput(event) {
        this.localValue = event.target.value;
        this.$emit('input', this.localValue);
      },
      clearSearch() {
        this.localValue = '';
        this.$emit('input', this.localValue);
      }
    }
  };
  </script>
  
  <style scoped>
  .search {
    position: relative;
    max-width: 540px;
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--color-border-input);
    border-radius: 5px;
  }
  .input {
    width: 100%;
    border: none;
    font-size: 18px;
    line-height: 23px;
  }
  .input:focus {
    outline: none;
  }
  .input::placeholder {
    color: var(--color-text-gray);
  }
  .clear-button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  </style>
  