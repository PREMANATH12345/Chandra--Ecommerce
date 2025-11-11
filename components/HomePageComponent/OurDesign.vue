<template>
  <section class="min-h-screen bg-purple-50 py-16 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="item in jewelleryItems"
          :key="item.id"
          class="relative flex justify-center"
        >
          <!-- 3D Stack Container -->
          <div class="relative w-80">
            <!-- Back Layers -->
            <div class="absolute inset-0 transform rotate-[-4deg] scale-95 opacity-40 bg-white rounded-2xl shadow-lg"></div>
            <div class="absolute inset-0 transform rotate-[3deg] scale-90 opacity-30 bg-white rounded-2xl shadow-lg"></div>
            
            <!-- Main Card -->
            <div class="relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl z-10">
              <!-- Designs Badge -->
              <div class="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
                <span class="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {{ item.designs }}
                </span>
              </div>
              
              <!-- Image -->
              <div class="p-6">
                <div class="h-40 flex items-center justify-center">
                  <img
                    :src="item.image"
                    :alt="item.title"
                    class="max-h-32 object-contain"
                  />
                </div>
              </div>
              
              <!-- Title -->
              <div class="bg-purple-600 py-3 px-4 text-center">
                <h3 class="text-white font-semibold text-lg">
                  {{ item.title }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const jewelleryItems = ref([
  {
    id: 1,
    title: "Rings",
    designs: "2184+ Designs",
    image: "/jewellery/rings.jpg"
  },
  {
    id: 2,
    title: "22kt Gold Jewellery", 
    designs: "1560+ Designs",
    image: "/jewellery/gold.jpg"
  }
])
</script>