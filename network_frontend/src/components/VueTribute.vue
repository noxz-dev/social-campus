/** Original by https://github.com/syropian/vue-tribute license MIT Rewritten in Vue3 with some extras */

<template>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tribute from 'tributejs';

export default defineComponent({
  props: {
    options: {
      type: Object,
      required: true,
    },
    elementId: {
      type: String,
      required: true,
    },
  },
  watch: {
    options: {
      immediate: false,
      deep: true,
      handler() {
        if (this.tribute) {
          console.log('options changed');
          setTimeout(() => {
            let $el = document.querySelector('#' + this.elementId);
            this.tribute.detach($el);

            setTimeout(() => {
              $el = document.querySelector('#' + this.elementId);
              this.tribute = new Tribute(this.options);
              this.tribute.attach($el);
              $el.tributeInstance = this.tribute;
            }, 0);
          }, 0);
        }
      },
    },
  },
  mounted() {
    if (typeof Tribute === 'undefined') {
      throw new Error('[vue-tribute] cannot locate tributejs!');
    }
    const $el = document.querySelector('#' + this.elementId);
    this.tribute = new Tribute(this.options);

    this.tribute.attach($el);

    $el.tributeInstance = this.tribute;

    $el.addEventListener('tribute-replaced', (e) => {
      e.target.dispatchEvent(new Event('input', { bubbles: true }));
    });
  },

  beforeUnmount() {
    const $el = document.querySelector('#' + this.elementId);

    if (this.tribute) {
      this.tribute.detach($el);
    }
  },
});
</script>

<style>
.tribute-container li {
  @apply bg-dark-500;
  @apply text-gray-50;
}

</style>
