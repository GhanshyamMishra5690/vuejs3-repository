<script setup lang="ts">
import { RouterView } from "vue-router";
import GlobalLoader from "vue-global-loader/GlobalLoader.vue";
import CircleSpinner from "vue-global-loader/CircleSpinner.vue";
</script>

<template>
  <div class="div">
    <GlobalLoader>
      <CircleSpinner />
    </GlobalLoader>
    <router-view />
  </div>
</template>
