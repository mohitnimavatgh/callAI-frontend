<template>
  <div>
    <video id="videoRef" class="w-full h-auto max-w-full" controls :poster="posterUrl" @loadedmetadata="setPosterDimensions">
      <source :src="base_Url+videoUrl" type="video/mp4">
      Your browser does not support the video tag.
    </video>    
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import posterImage from '@/assets/image/confra.png';
const base_Url = import.meta.env.VITE_BASE_URL;

const props = defineProps({
  videoUrl: String,
});

const posterUrl = ref(posterImage);

const setPosterDimensions = () => {
  const video = document.getElementById("videoRef");
  const poster = new Image();
  poster.src = posterUrl.value;
  poster.onload = () => {
    video.setAttribute('poster', posterUrl.value);
    video.setAttribute('width', poster.width.toString());
    video.setAttribute('height', poster.height.toString());
  };
};

onMounted(() => {
  if (props.videoUrl) {
    const video = document.getElementById("videoRef");
    video.load();
    setPosterDimensions();
  }
});
</script>
