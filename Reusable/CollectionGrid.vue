<template>
  <section class="py-10 px-4 sm:px-6 md:px-10">
    <div
      class="flex overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 scrollbar-hide scroll-smooth pb-4"
    >
      <div
        v-for="item in collections"
        :key="item.id"

      >
        <img
          :src="item.image"
          :alt="item.title"
          @error="handleImageError"
          class="w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[400px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>

    <div class="flex justify-center mt-10">
      <button
        class="bg-green-600 hover:bg-green-800 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base transition-all duration-300"
      >
        VIEW ALL COLLECTIONS
      </button>
    </div>
  </section>
</template>

<script setup>
// import productsdata from '@/data/products.json'

// // ✅ Access the collections array safely
// const collections = productsdata.Collection



const props = defineProps({
  collections: {
    type: Array,
    required: true
  }
})

// console.log('Collections prop:', props.collections)
const handleImageError = (event) => {
  console.error(`Image failed to load: ${event.target.src}`)
  event.target.src = '/fallback.jpg'
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
