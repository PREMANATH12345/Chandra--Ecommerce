<template>
  <section class="w-full mx-auto py-8">
    <!-- Section Header -->
    <div class="text-center mb-8 md:mb-12 px-1 md:px-3">
      <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-text-dark-emerald mb-4">
        Featured Collections
      </h2>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Discover our exquisite jewelry collections crafted with precision and passion
      </p>
    </div>

    <!-- Promotional Grid - 40/60 Layout -->
    <div class="flex flex-col lg:flex-row gap-4 px-3 md:px-3 w-full max-w-8xl mx-auto">
      <!-- Left Section - 40% Width -->
      <div class="w-full lg:w-[50%]">
        <div class="group relative h-full min-h-[300px] md:min-h-[600px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 bg-white">
          <img 
            src="/FeatureSection/image1.jpg" 
            alt="The Wedding Edit - Upto 30% Off"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>
      </div>

      <!-- Right Section - 60% Width -->
      <div class="w-full lg:w-[50%] flex flex-col gap-4">
        <!-- Top Right Card -->
        <div class="group relative flex-1 min-h-[188px] md:min-h-[290px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 bg-white">
          <img 
  src="/FeatureSection/image2.jpg" 
  alt="Everyday 22KT - For the modern woman"
  class="w-full h-full object-cover object-bottom translate-y-[0%] group-hover:scale-105 transition-transform duration-500 ease-out"
/>

        </div>

        <!-- Bottom Right Card -->
        <div class="group relative flex-1 min-h-[188px] md:min-h-[290px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 bg-white">
          <img 
  src="/FeatureSection/image3.jpg" 
  alt="Diamonds, delivered the same day"
  class="w-full h-full object-cover object-bottom translate-y-[0%] group-hover:scale-105 transition-transform duration-500 ease-out"
/>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No reactive data needed for this static component
// All content is hardcoded as per the reference image
</script>

<style scoped>
/* 2mm gap equivalent - approximately 8px */
.gap-2 {
  gap: 0.5rem; /* 8px ≈ 2mm */
}

/* 3mm padding equivalent - approximately 12px total (6px each side) */
.px-1 {
  padding-left: 0.25rem; /* 4px ≈ 1.5mm each side */
  padding-right: 0.25rem; /* 4px ≈ 1.5mm each side */
}
/* Total side spacing: 1.5mm + 1.5mm = 3mm visual spacing from edges */
</style>