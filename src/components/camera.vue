<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const emits = defineEmits([
  "closeHandler",
  "setImageSizes",
  "takePictureHandler",
]);

const video = ref(null);
const width = 640;
let isStreaming = false;

const videoPlayHandler = () => {
  if (!isStreaming) {
    let height = video.videoHeight / (video.videoWidth / width);

    if (isNaN(height)) {
      height = width / (4 / 3);
    }

    emits("setImageSizes", width, height);
    isStreaming = true;
  }
};

const takePicture = () => emits("takePictureHandler", video.value);

onMounted(() => {
  navigator.mediaDevices
    .getUserMedia({
      video: { facingMode: "environment" }, //this is for use the back camera
      audio: false,
    })
    .then((stream) => {
      video.value.srcObject = stream;
      video.value.play();
    })
    .catch((err) => {
      // Print out error if we can't get the camera permission
      console.log(err);
    });

  video.value.addEventListener("canplay", videoPlayHandler);
});

onBeforeUnmount(() => {
  if (video.value && video.value.srcObject) {
    video.value.srcObject.getVideoTracks().forEach((track) => {
      track.stop();
      video.value.srcObject.removeTrack(track);
    });

    video.value.removeEventListener("canplay", videoPlayHandler);
    isStreaming = false;
  }
});
</script>

<template>
  <div class="camera">
    <div class="camera__close" @click="$emit('closeHandler')">
      <XMarkIcon />
    </div>
    <div class="camera__video video">
      <div class="video__container">
        <div class="video__content">
          <video ref="video" autoplay playsinline muted></video>
        </div>
      </div>
      <div class="video__controls controls">
        <div class="controls__button" @click="takePicture"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.camera {
  position: fixed;
  inset: 0;
  background-color: black;

  @include md {
    margin: 48px;
  }

  &__close {
    position: absolute;
    width: 24px;
    position: absolute;
    right: 0;
    top: 0;
    margin: 8px;
    cursor: pointer;
    z-index: 10;

    @include md {
      width: 40px;
    }
  }

  &__video {
    width: 100%;
  }
}

.video {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__container {
    position: relative;
    display: flex;
    align-items: center;
    flex-grow: 1;
    overflow: hidden;

    video {
      width: 100%;
    }
  }

  &__content {
    position: absolute;
    width: 100%;
  }

  &__controls {
    flex-shrink: 0;
  }
}

.controls {
  display: flex;
  justify-content: center;
  padding: 16px;

  &__button {
    position: relative;
    width: 40px;
    height: 40px;
    background-color: currentColor;
    border-radius: 50%;
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      inset: -4px;
      display: block;
      border: 2px solid currentColor;
      border-radius: 50%;
    }
  }
}
</style>
