<template>
  <section class="relative overflow-hidden">
    <div class="relative h-[500px] md:h-[600px] overflow-hidden">
      
      <!-- Render Image -->
      <div v-if="banners[currentSlide].type === 'image'" class="w-full h-full">
        <img
          :src="banners[currentSlide].image"
          :alt="banners[currentSlide].title"
          class="w-full h-full object-cover object-center"
        />
      </div>

      <!-- Render Video -->
      <div v-else-if="banners[currentSlide].type === 'video'" class="w-full h-full">
        <video
          autoplay
          muted
          loop
          playsinline
          class="w-full h-full object-cover"
        >
          <source :src="banners[currentSlide].video" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
      </div>

      <!-- Gradient overlay -->
      <div class="absolute inset-0 "></div>

    

      <!-- Navigation -->
      <button
        @click="prevSlide"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white  p-2 transition"
      >
        <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        @click="nextSlide"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition"
      >
        <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Dots -->
      <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        <button
          v-for="(banner, index) in banners"
          :key="banner.id"
          @click="currentSlide = index"
          :class="[
            'w-3 h-3 rounded-full transition',
            currentSlide === index ? 'bg-purple-600' : 'bg-white/50'
          ]"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import productsData from '@/data/products.json'

const banners = productsData.banners
const currentSlide = ref(0)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % banners.length
}
const prevSlide = () => {
  currentSlide.value =
    currentSlide.value === 0 ? banners.length - 1 : currentSlide.value - 1
}
</script>

<style scoped>
video {
  /* border-radius: 1.5rem; */
}
</style>
