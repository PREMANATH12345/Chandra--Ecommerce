<template>
  <section class="py-10 px-4 sm:px-6 md:px-10 bg-white">
    <!-- ✅ Horizontal Scroll on Mobile, Grid on Larger Screens -->
    <div
      class="flex overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 scrollbar-hide scroll-smooth pb-4"
    >
      <div
        v-for="item in Collection"
        :key="item.id"
        class="relative min-w-[48%] sm:min-w-0 rounded-2xl overflow-hidden bg-gray-50 hover:shadow-xl transition-all duration-300 cursor-pointer group flex-shrink-0"
      >
        <!-- Image -->
        <img
          :src="item.image"
          :alt="item.title"
          class="w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[400px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>

    <!-- Button -->
    <div class="flex justify-center mt-10">
      <button
        class="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base transition-all duration-300"
      >
        VIEW ALL COLLECTIONS
      </button>
    </div>
  </section>
</template>

<script setup>
import productsData from '@/data/products.json'
const Collection = productsData.Collection
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
