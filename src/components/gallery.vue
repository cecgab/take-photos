<script setup lang="ts">
import { ref } from "vue";

defineEmits(["clickHandler"]);
</script>

<template>
  <div class="gallery">
    <div class="gallery__container">
      <slot name="output"></slot>
    </div>
    <div class="gallery__button">
      <button @click="$emit('clickHandler')">Take a picture</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gallery {
  width: 100%;
  max-width: 640px;

  &__button {
    display: flex;
    padding: 16px 0;

    button {
      padding: 8px 16px;
      margin: auto;
      cursor: pointer;
    }
  }
}
</style>
