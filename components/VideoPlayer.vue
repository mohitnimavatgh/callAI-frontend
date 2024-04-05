<template>
    <video ref="videoRef" class="w-full h-auto max-w-full" controls :poster="posterUrl">
      <source :src="videoSource" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </template>
  
  <script>
  export default {
    data() {
      return {
        videoSource: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        posterUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
      };
    },
    mounted() {
      this.setPosterDimensions();
    },
    methods: {
      setPosterDimensions() {
        const video = this.$refs.videoRef;
        video.addEventListener('loadedmetadata', () => {
          const poster = new Image();
          poster.src = this.posterUrl;
          poster.onload = () => {
            this.$refs.videoRef.setAttribute('poster', this.posterUrl);
            this.$refs.videoRef.setAttribute('width', poster.width);
            this.$refs.videoRef.setAttribute('height', poster.height);
          };
        });
      }
    }
  };
  </script>
  