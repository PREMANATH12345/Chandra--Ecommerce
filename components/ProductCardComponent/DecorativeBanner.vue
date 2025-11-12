<template>
  <div class="relative rounded-lg overflow-hidden w-full h-full">
    <!-- Desktop/Tablet View -->
    <div class="hidden md:block h-full">
      <div class="relative h-80 lg:h-96 w-full">
        <img 
          :src="currentBannerImage" 
          :alt="bannerData.title"
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8">
          <p class="text-white/90 text-xs md:text-sm mb-1 md:mb-2">{{ bannerData.subtitle }}</p>
          <h3 class="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">{{ bannerData.title }}</h3>
          <p class="text-white/90 text-xs md:text-sm mb-1 md:mb-2">{{ bannerData.description }}</p>
          <p class="text-white/70 text-[10px] md:text-xs">{{ bannerData.footer }}</p>
        </div>
      </div>
    </div>

    <!-- Mobile View - Filter by Category -->
    <div class="md:hidden bg-gradient-to-b from-green-50 to-green-100 rounded-lg p-4 h-full">
      <h3 class="text-sm font-bold text-gray-800 mb-3">Filter by Category</h3>
      
      <div class="relative">
        <!-- Category Scroll Container -->
        <div 
          ref="scrollContainer"
          class="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          @scroll="updateScrollButtons"
        >
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="flex-shrink-0"
          >
            <button 
              @click="selectCategory(category)"
              :class="[
                'flex flex-col items-center justify-center w-20 h-20 rounded-lg border-2 transition-all',
                selectedCategory?.id === category.id 
                  ? 'border-green-600 bg-white shadow-md' 
                  : 'border-gray-200 bg-white hover:border-green-300'
              ]"
            >
              <img 
                :src="getCategoryImage(category)" 
                :alt="category.name"
                class="w-10 h-10 object-contain mb-1.5"
                @error="(e) => handleCategoryImageError(e, category)"
              />
              <span class="text-[10px] font-medium text-gray-700 text-center px-1">{{ category.name }}</span>
            </button>
          </div>
        </div>

        <!-- Scroll Buttons -->
        <button 
          v-if="showLeftButton"
          @click="scrollLeft"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50"
        >
          <svg class="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          v-if="showRightButton"
          @click="scrollRight"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50"
        >
          <svg class="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  bannerData: {
    type: Object,
    default: () => ({
      image: '/products/fallbackimage.jpg',
      title: '100% Natural',
      subtitle: 'The CARATLANE Assurance',
      description: 'Every diamond we use is',
      footer: 'Authentic by nature, exquisite by design!'
    })
  },
  categories: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['category-selected']);

const scrollContainer = ref(null);
const selectedCategory = ref(null);
const showLeftButton = ref(false);
const showRightButton = ref(true);
const bannerImageError = ref(false);
const categoryImageErrors = ref(new Set());

const currentBannerImage = computed(() => {
  if (bannerImageError.value || !props.bannerData.image) {
    return '/products/fallbackimage.jpg';
  }
  return props.bannerData.image;
});

const handleImageError = (event) => {
  console.error(`Banner image failed to load: ${event.target.src}`);
  bannerImageError.value = true;
  event.target.src = '/products/fallbackimage.jpg';
};

const getCategoryImage = (category) => {
  if (categoryImageErrors.value.has(category.id) || !category.image) {
    return '/products/fallbackimage.jpg';
  }
  return category.image;
};

const handleCategoryImageError = (event, category) => {
  console.error(`Category image failed to load: ${event.target.src} for category: ${category.name}`);
  categoryImageErrors.value.add(category.id);
  event.target.src = '/products/fallbackimage.jpg';
};

const selectCategory = (category) => {
  selectedCategory.value = category;
  emit('category-selected', category);
};

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -150, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 150, behavior: 'smooth' });
  }
};

const updateScrollButtons = () => {
  if (scrollContainer.value) {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
    showLeftButton.value = scrollLeft > 0;
    showRightButton.value = scrollLeft < scrollWidth - clientWidth - 10;
  }
};

onMounted(() => {
  updateScrollButtons();
});
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