<template>
  <section class="p-4 sm:p-6 md:p-8 bg-purple-50 rounded-2xl">
   

    <div
      class="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-3"
    >
      <div
        v-for="item in categories"
        :key="item.id"
        class="flex flex-col items-center min-w-[120px] sm:min-w-[150px] md:min-w-[180px] bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 cursor-pointer flex-shrink-0"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
          @error="handleImageError"
        />
        <p
          class="mt-2 text-xs sm:text-sm md:text-base font-semibold text-gray-700 text-center uppercase truncate w-full"
        >
          {{ item.title }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
// Import the JSON data
import productsData from '@/data/products.json'

// Extract the category array
const categories = productsData.category

// Handle image loading errors
const handleImageError = (event) => {
  console.error(`Image failed to load: ${event.target.src}`)
  event.target.src = '/fallback-image.jpg' // optional fallback image
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
