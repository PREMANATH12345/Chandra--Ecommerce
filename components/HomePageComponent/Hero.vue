<template>
  <section class="hero">
    <BannerCarousel 
      :slides="heroBanners"
      :auto-play-interval="4000"
      :show-navigation="true"
      :show-dots="true"
      active-dot-class="bg-blue-600"
      @slide-change="handleSlideChange"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import BannerCarousel from '@/Reusable/BannerCarousel.vue'
import bannerData from '@/data/products.json'

const heroBanners = ref(bannerData.heroBanners)

const handleSlideChange = (index) => {
}
</script>

<style scoped>
video {
  border-radius: 1.5rem;
}
</style>
