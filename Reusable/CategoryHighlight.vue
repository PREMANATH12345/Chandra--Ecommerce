<template>
  <section
    class="flex flex-col md:flex-row rounded-3xl overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50"
  >
    <!-- Left: Banner -->
    <div
      class="w-full md:w-1/2 relative flex items-center justify-center 
             h-64 sm:h-80 md:h-auto p-0 bg-gradient-to-b from-yellow-50 to-blue-50"
    >
      <img
        :src="categoryData.banner.image"
        alt="Banner"
        class="absolute inset-0 w-full h-full object-cover object-center rounded-3xl md:rounded-none"
      />
    </div>

    <!-- Right: Product Slider -->
    <div
      class="w-full md:w-1/2 p-4 sm:p-6 relative bg-gradient-to-b from-purple-50 to-white"
    >
      <!-- Product Cards -->
      <div
        ref="slider"
        class="flex space-x-3 sm:space-x-4 overflow-x-auto scrollbar-hide pb-6 snap-x snap-mandatory"
      >
        <div
          v-for="product in categoryData.products"
          :key="product.id"
          class="min-w-[140px] sm:min-w-[180px] bg-white rounded-2xl shadow hover:shadow-lg transition p-3 text-center flex-shrink-0 snap-center"
        >
          <img
            :src="product.image"
            :alt="product.title"
            class="w-full h-32 sm:h-40 object-contain mb-3 rounded-lg"
          />
          <p class="font-bold text-gray-800 text-sm sm:text-base">
            {{ product.price }}
          </p>
          <p
            v-if="product.oldPrice"
            class="text-xs sm:text-sm text-gray-400 line-through"
          >
            {{ product.oldPrice }}
          </p>
          <p class="text-xs sm:text-sm text-gray-600 mt-1 truncate">
            {{ product.title }}
          </p>
        </div>
      </div>

      <!-- Bottom Controls -->
      <div
        class="flex justify-between items-center px-2"
      >
        <!-- Navigation buttons - Left side -->
        <div class="flex space-x-3 gap-4">
          <button
            @click="scrollLeft"
            class="bg-purple-700 hover:bg-purple-800 text-white rounded-full p-2"
          >
            <ChevronLeft class="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            @click="scrollRight"
            class="bg-purple-700 hover:bg-purple-800 text-white rounded-full p-2"
          >
            <ChevronRight class="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <!-- View All Button - Right side -->
        <button
          class="bg-purple-700 hover:bg-purple-800 text-white px-4 sm:px-5 py-2 rounded-lg font-semibold text-sm sm:text-base"
        >
          View Full Collection
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

// Define props
const props = defineProps({
  categoryData: {
    type: Object,
    required: true
  }
})

const slider = ref(null)

const scrollLeft = () => {
  slider.value?.scrollBy({ left: -300, behavior: 'smooth' })
}
const scrollRight = () => {
  slider.value?.scrollBy({ left: 300, behavior: 'smooth' })
}
</script>

<style scoped>
/* Hide scrollbars for cleaner look */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>