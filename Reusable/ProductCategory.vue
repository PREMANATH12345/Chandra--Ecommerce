<template>
  <section
    class="p-4 sm:p-6 md:p-8 rounded-2xl w-full max-w-[1600px] mx-auto shadow-md"
    style="background: linear-gradient(to bottom, #a7f3d0 0%, #ffffff 100%);"
  >
    <div
      class="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-3"
    >
      <!-- First item -->
    <div
  v-if="categories.length"
  class="flex flex-col items-center justify-start text-center min-w-[120px] sm:min-w-[150px] md:min-w-[180px] cursor-pointer flex-shrink-0"
>
  <!-- Image -->
  <img
    :src="categories[0].image"
    :alt="categories[0].title"
    class="w-16 h-16 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
    @error="handleImageError"
  />

  <!-- Title below image -->
  <p
    class="mt-3 text-xs sm:text-sm md:text-base font-semibold text-gray-700 uppercase truncate w-full text-center"
  >
    {{ categories[0].title }}
  </p>
</div>



      <!-- Visual gap between first item and others -->
      <div class="w-6 sm:w-8 md:w-10 flex-shrink-0"></div>

      <!-- Other items -->
      <div
        v-for="item in categories.slice(1)"
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
const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
})

const handleImageError = (event) => {
  console.error(`Image failed to load: ${event.target.src}`)
  event.target.src = '/fallback-image.jpg'
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
