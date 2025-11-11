<template>
<nav class="bg-gradient-to-b from-green-800 via-green-700 to-green-800 shadow-sm border-b border-gray-200 relative z-50">
    <!-- Desktop Navigation -->
    <div class="hidden lg:block">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between">
          <!-- Main Navigation Items -->
          <div class="flex items-center space-x-8">
            <div
              v-for="item in navData" 
              :key="item.title"
              class="relative group"
              @mouseenter="handleMouseEnter(item.title)"
              @mouseleave="handleMouseLeave"
            >
              <NuxtLink 
                :to="`/${item.title.toLowerCase().replace(/\s+/g, '-')}`"
                class="block py-4 text-sm font-medium text-white hover:text-green-600 transition-colors duration-200"
              >
                {{ item.title }}
                
                <!-- Dropdown Indicator -->
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Mega Dropdown -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div
            v-if="activeDropdown"
            class="absolute left-0 right-0 bg-white shadow-xl border-t border-gray-100"
            @mouseenter="handleDropdownEnter"
            @mouseleave="handleMouseLeave"
          >
            <div class="container mx-auto px-4 py-8">
              <div class="grid grid-cols-6 gap-8">
                <!-- Navigation Columns - Horizontal Layout -->
                <div class="grid grid-cols-4 gap-8 col-span-4">
                  <div 
                    v-for="(items, sectionName) in getActiveItem()?.subSections" 
                    :key="sectionName"
                    class="space-y-4"
                  >
                    <h3 class="font-semibold text-gray-900 text-base mb-4 uppercase tracking-wide">
                      {{ sectionName }}
                    </h3>
                    <ul class="space-y-3">
                      <li 
                        v-for="subItem in items" 
                        :key="subItem"
                        class="group"
                      >
                        <NuxtLink
                          :to="`/category/${getActiveItem()?.title.toLowerCase()}/${subItem.toLowerCase().replace(/\s+/g, '-')}`"
                          class="text-base text-gray-700 hover:text-green-600 transition-colors duration-200 flex items-center group"
                        >
                          <span class="truncate">{{ subItem }}</span>
                          <svg 
                            class="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- Promotional Images - Horizontal Layout -->
                <div class="col-span-2">
                  <div class="grid grid-cols-2 gap-6">
                    <div 
                      v-for="(image, index) in getActiveItem()?.images" 
                      :key="index"
                      class="relative overflow-hidden rounded-lg group cursor-pointer"
                    >
                      <img 
                        :src="image" 
                        :alt="`${getActiveItem()?.title} promotion ${index + 1}`"
                        class="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                        @error="handleImageError"
                      />
                      
                      <!-- Overlay with text -->
                      <!-- <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg flex items-end">
                        <div class="p-4 text-white">
                          <p class="text-lg font-semibold">Special Offer</p>
                          <p class="text-sm opacity-90 mt-1">Shop Now</p>
                        </div>
                      </div> -->
                      
                      <!-- Hover effect -->
                      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- For Women | For Men | For Kids Section - Below Features -->
              <div class="flex items-center space-x-6 mt-8 pt-6">
                <NuxtLink 
                  to="/women" 
                  class="text-base font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  For Women
                </NuxtLink>
                <span class="text-gray-300">|</span>
                <NuxtLink 
                  to="/men" 
                  class="text-base font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  For Men
                </NuxtLink>
                <span class="text-gray-300">|</span>
                <NuxtLink 
                  to="/kids" 
                  class="text-base font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  For Kids
                </NuxtLink>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Mobile & Tablet Navigation - Completely Hidden -->
    <div class="lg:hidden hidden">
      <!-- No mobile/tablet navigation will be displayed -->
    </div>
  </nav>
</template>

<script setup>
// Import navbar data
const navbarData = await import('~/data/navbar.json').then(m => m.default || m);

const navData = ref(navbarData);
const activeDropdown = ref(null);
let dropdownTimeout = null;

// Get active dropdown item
const getActiveItem = () => {
  return navData.value.find(item => item.title === activeDropdown.value);
};

// Handle mouse enter on navigation items
const handleMouseEnter = (title) => {
  if (dropdownTimeout) {
    clearTimeout(dropdownTimeout);
  }
  activeDropdown.value = title;
};

// Handle mouse enter on dropdown itself
const handleDropdownEnter = () => {
  if (dropdownTimeout) {
    clearTimeout(dropdownTimeout);
  }
};

// Handle mouse leave with delay
const handleMouseLeave = () => {
  dropdownTimeout = setTimeout(() => {
    activeDropdown.value = null;
  }, 200);
};

// Handle image loading errors
const handleImageError = (event) => {
  console.warn('Image failed to load:', event.target.src);
  // Fallback to placeholder
  event.target.src = '/navbar/imgs-promo-1.jpg';
};

// Cleanup on unmount
onUnmounted(() => {
  if (dropdownTimeout) {
    clearTimeout(dropdownTimeout);
  }
});
</script>

<style scoped>
/* Custom scrollbar for mobile */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>