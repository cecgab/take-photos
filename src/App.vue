<script setup>
import Gallery from "./components/gallery.vue";
import Picture from "./components/picture.vue";
import Camera from "./components/camera.vue";

import { ref, watch } from "vue";

const isCameraOpen = ref(false);

const imageWidth = ref(0);
const imageHeight = ref(0);
const imageVideoSource = ref(null);

const imageSizeHandler = (width, height) => {
  imageWidth.value = width;
  imageHeight.value = height;
};

const takePicture = (video) => {
  imageVideoSource.value = video;

  setTimeout(() => {
    isCameraOpen.value = false;
  }, 0);
};
</script>

<template>
  <div class="app-container">
    <Gallery @click-handler="isCameraOpen = true">
      <template #output
        ><Picture
          :height="imageHeight"
          :width="imageWidth"
          :source="imageVideoSource"
      /></template>
    </Gallery>

    <Camera
      v-if="isCameraOpen"
      @close-handler="isCameraOpen = false"
      @set-image-sizes="imageSizeHandler"
      @take-picture-handler="takePicture"
    />
  </div>
</template>

<style scoped lang="scss">
.app-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 16px;

  @supports (min-height: 100dvh) {
    min-height: 100dvh;
  }
}
</style>
