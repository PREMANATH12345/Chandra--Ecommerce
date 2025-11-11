<template>
  <div class="relative rounded-lg overflow-hidden h-full min-h-[400px] lg:min-h-[500px]">
    <!-- Desktop/Tablet View -->
    <div class="hidden md:block h-full">
      <img 
        :src="currentBannerImage" 
        :alt="bannerData.title"
        class="w-full h-full object-cover"
        @error="handleImageError"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-8">
        <p class="text-white/90 text-sm mb-2">{{ bannerData.subtitle }}</p>
        <h3 class="text-white text-3xl lg:text-4xl font-bold mb-4">{{ bannerData.title }}</h3>
        <p class="text-white/90 text-sm mb-2">{{ bannerData.description }}</p>
        <p class="text-white/70 text-xs">{{ bannerData.footer }}</p>
      </div>
    </div>

    <!-- Mobile View - Filter by Category -->
    <div class="md:hidden bg-gradient-to-b from-green-50 to-green-100 rounded-lg p-6 h-full flex flex-col">
      <h3 class="text-lg font-bold text-gray-800 mb-4">Filter by Category</h3>
      
      <div class="relative flex-1">
        <!-- Category Scroll Container -->
        <div 
          ref="scrollContainer"
          class="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
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
                'flex flex-col items-center justify-center w-24 h-24 rounded-lg border-2 transition-all',
                selectedCategory?.id === category.id 
                  ? 'border-green-600 bg-white shadow-md' 
                  : 'border-gray-200 bg-white hover:border-green-300'
              ]"
            >
              <img 
                :src="getCategoryImage(category)" 
                :alt="category.name"
                class="w-12 h-12 object-contain mb-2"
                @error="(e) => handleCategoryImageError(e, category)"
              />
              <span class="text-xs font-medium text-gray-700 text-center">{{ category.name }}</span>
            </button>
          </div>
        </div>

        <!-- Scroll Buttons (Tablet only) -->
        <button 
          v-if="showLeftButton"
          @click="scrollLeft"
          class="hidden sm:flex md:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-8 h-8 items-center justify-center bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50"
        >
          <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          v-if="showRightButton"
          @click="scrollRight"
          class="hidden sm:flex md:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-8 h-8 items-center justify-center bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50"
        >
          <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    default: () => [
      { id: 1, name: 'Rings', image: '/products/fallbackimage.jpg' },
      { id: 2, name: 'Earrings', image: '/products/fallbackimage.jpg' },
      { id: 3, name: 'Necklaces', image: '/products/fallbackimage.jpg' },
      { id: 4, name: 'Bracelets', image: '/products/fallbackimage.jpg' },
      { id: 5, name: 'Bangles', image: '/products/fallbackimage.jpg' },
      { id: 6, name: 'Pendants', image: '/products/fallbackimage.jpg' }
    ]
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
    scrollContainer.value.scrollBy({ left: -200, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 200, behavior: 'smooth' });
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