<template>
  <section class="hero">
    <BannerCarousel 
      :slides="ProductCarousel"
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

const ProductCarousel = ref(bannerData.ProductCarousel)

const handleSlideChange = (index) => {
  console.log('Hero banner changed to slide:', index)
}
</script>