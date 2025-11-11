<template>
  <section class="relative min-h-screen overflow-hidden">
    <!-- Single Background Video with Grid Effect -->
    <div class="absolute inset-0 z-0">
      <!-- Main background video -->
      <div class="relative w-full h-full">
        <video
          class="w-full h-full object-cover"
          autoplay
          muted
          loop
          playsinline
        >
          <source src="/Reviews/Nearby-Store-Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <!-- Light Gradient from top to 30% -->
        <div class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent h-[30%]"></div>
        
        <!-- Grid Overlay on Video -->
        <div class="absolute inset-0 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-0 pointer-events-none">
          <div 
            v-for="n in gridCount" 
            :key="n"
            class="border border-white/20"
          ></div>
        </div>
        
        <!-- Dark Overlay for Better Text Readability -->
        <div class="absolute inset-0 bg-black/40"></div>
      </div>
    </div>

    <!-- Top Content -->
    <div class="relative z-10 min-h-screen flex flex-col items-center px-4 pt-16 md:pt-24">
      <div class="text-center max-w-4xl mx-auto">
        <!-- Main Heading -->
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
          CaratLane 
          <span class="text-green-400 italic font-serif">Expressions</span>
        </h1>
        
        <!-- Subheading -->
        <p class="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 leading-relaxed">
          Share your #MyCaratLaneStory and<br class="hidden sm:block">
          win jewellery worth up to ₹15,000
        </p>
        
        <!-- CTA Button -->
        <button class="bg-green-500 hover:bg-green-600 text-white font-semibold text-lg py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50 shadow-lg">
          SHARE YOUR STORY
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const gridCount = ref(12)

const updateGridCount = () => {
  if (window.innerWidth < 768) {
    gridCount.value = 12 // 3x4
  } else if (window.innerWidth < 1024) {
    gridCount.value = 24 // 4x6
  } else {
    gridCount.value = 48 // 6x8
  }
}

onMounted(() => {
  updateGridCount()
  window.addEventListener('resize', updateGridCount)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateGridCount)
})
</script>

<style scoped>
/* Smooth transitions */
* {
  transition: all 0.3s ease;
}

/* Ensure video covers entire background */
video {
  filter: brightness(0.9);
}
</style>