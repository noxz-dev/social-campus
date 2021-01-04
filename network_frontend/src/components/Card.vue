<template>
     <div class="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border max-w-xl">
        <div class="flex justify-between">
            <div class="flex items-center">
                <slot name="header"></slot>
                <slot name="content"></slot>
            </div>
         </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({

});
</script>

<style>

</style>