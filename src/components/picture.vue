<script setup lang="ts">
import { ref, defineProps, watchEffect } from "vue";

const props = defineProps<{
  height?: number;
  width?: number;
  source?: HTMLElement;
}>();

const canvas = ref(null);
const photo = ref(null);

const clearphoto = () => {
  if (canvas.value && photo.value) {
    const context = canvas.value.getContext("2d");
    context.fillRect(0, 0, canvas.value.width, canvas.value.height);

    const data = canvas.value.toDataURL("image/png");
    photo.value.setAttribute("src", data);
  }
};

watchEffect(() => {
  clearphoto();

  if (props.source) {
    const context = canvas.value.getContext("2d");

    if (props.width && props.height) {
      context.drawImage(props.source, 0, 0, props.width, props.height);

      const data = canvas.value.toDataURL("image/png");
      photo.value.setAttribute("src", data);
    }
  }
});
</script>
<template>
  <div class="picture">
    <img ref="photo" :height="height" :width="width" />
  </div>
  <canvas class="canvas" ref="canvas" :height="height" :width="width"></canvas>
</template>
<style lang="scss" scoped>
.picture {
  width: 100%;
  min-height: 400px;

  border-width: 2px;
  border-style: dashed;

  img {
    object-fit: contain;
  }
}

.canvas {
  display: none;
}
</style>
