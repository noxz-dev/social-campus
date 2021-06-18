/** Original by https://github.com/syropian/vue-tribute license MIT - Rewritten in Vue3 with some extras */

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
  //create the tribute instance
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

  //destroy the tribute instance
  beforeUnmount() {
    const $el = document.querySelector('#' + this.elementId);

    if (this.tribute) {
      this.tribute.detach($el);
    }
  },
});
</script>

<style>
.tribute-container {
  z-index: 50;
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  max-height: 300px;
  max-width: 500px;
  overflow: auto;
  display: block;
  z-index: 999999;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(#000, 0.13);
}
.tribute-container ul {
  border: 1px solid #111;
  margin: 0;
  margin-top: 2px;
  padding: 0;
  list-style: none;
  border-radius: 4px;
  border: 1px solid rgba(#000, 0.13);
  background-clip: padding-box;
  overflow: hidden;
}
.tribute-container li {
  @apply dark:bg-dark-700 bg-gray-100;
  @apply dark:text-gray-50 text-gray-900 !important;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 14px;
}
.tribute-container li.highlight,
.tribute-container li:hover {
  background: #3f5efb;
  color: #fff !important;
}
.tribute-container li span {
  font-weight: bold;
}
.tribute-container li.no-match {
  cursor: default;
}
.tribute-container .menu-highlighted {
  font-weight: bold;
}
</style>
