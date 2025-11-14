<template>
  <div 
    class="bg-white rounded-lg overflow-hidden group relative transition-all duration-300 hover:shadow-xl border border-gray-100 flex flex-col h-full"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="handleCardClick"
  >
    <!-- Badge -->
    <div v-if="product.badge" class="absolute top-2 md:top-3 left-2 md:left-3 z-10">
      <span 
        :class="[
          'px-2 py-0.5 md:px-3 md:py-1 rounded-md text-[10px] md:text-xs font-bold',
          product.badge === 'BESTSELLER' ? 'bg-yellow-500 text-gray-900' : 'bg-yellow-400 text-gray-900'
        ]"
      >
        {{ product.badge }}
      </span>
    </div>

    <!-- Wishlist Icon -->
    <button 
      class="absolute top-2 md:top-3 right-2 md:right-3 z-10 p-1.5 md:p-2 rounded-full bg-white/80 hover:bg-white transition-all"
      @click="toggleWishlist"
    >
      <svg 
        :class="['w-4 h-4 md:w-5 md:h-5 transition-colors', isInWishlist ? 'text-red-500 fill-current' : 'text-gray-600']" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </button>

    <!-- Image Container - Fixed aspect ratio -->
    <div class="relative w-full pt-[100%] bg-gray-50 overflow-hidden">
      <img 
        :src="currentImage" 
        :alt="product.name"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
        @error="handleImageError"
      />

      <!-- Navigation Arrows -->
      <button 
        v-if="product.images && product.images.length > 1"
        @click="previousImage"
        class="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 p-1 md:p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100"
      >
        <svg class="w-4 h-4 md:w-5 md:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        v-if="product.images && product.images.length > 1"
        @click="nextImage"
        class="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 p-1 md:p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100"
      >
        <svg class="w-4 h-4 md:w-5 md:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Try at Home & Video Buttons - Show below product info on hover -->
      <div 
        :class="[
          'absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 md:p-3 transition-all duration-300',
          'opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0'
        ]"
      >
        <div class="flex gap-2">
          <button 
            v-if="product.tryAtHome"
            class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            @click="handleTryAtHome"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="hidden md:inline">TRY AT HOME</span>
            <span class="md:hidden">TRY HOME</span>
          </button>
          <button 
            class="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            @click="handleVideoCall"
            :title="'Video Call'"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Product Info - Fixed height -->
    <div class="p-2 md:p-4 flex flex-col flex-1">
      <!-- Price -->
      <div class="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
        <span class="text-sm md:text-xl font-bold text-gray-900">₹{{ formatPrice(product.price) }}</span>
        <span v-if="product.originalPrice" class="text-[10px] md:text-sm text-gray-500 line-through">
          ₹{{ formatPrice(product.originalPrice) }}
        </span>
      </div>

      <!-- Delivery Info -->
      <p class="text-[10px] md:text-sm text-green-600 font-medium mb-1">{{ product.deliveryText }}</p>
      
      <!-- Product Name - Truncated to 2 lines -->
      <p class="text-[10px] md:text-sm text-gray-600 line-clamp-2 flex-1">{{ product.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      images: [],
      name: '',
      price: 0,
      deliveryText: '',
      badge: '',
      tryAtHome: false
    })
  }
});

const emit = defineEmits(['try-at-home', 'video-call', 'toggle-wishlist', 'click']);

const currentImageIndex = ref(0);
const isHovered = ref(false);
const isInWishlist = ref(false);
const imageError = ref(false);

// Computed property for current image with fallback
const currentImage = computed(() => {
  if (imageError.value || !props.product.images || props.product.images.length === 0) {
    return '/products/fallbackimage.jpg';
  }
  return props.product.images[currentImageIndex.value];
});

const nextImage = (e) => {
  e.stopPropagation();
  if (!props.product.images || props.product.images.length === 0) return;
  
  if (currentImageIndex.value < props.product.images.length - 1) {
    currentImageIndex.value++;
  } else {
    currentImageIndex.value = 0;
  }
  imageError.value = false;
};

const previousImage = (e) => {
  e.stopPropagation();
  if (!props.product.images || props.product.images.length === 0) return;
  
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  } else {
    currentImageIndex.value = props.product.images.length - 1;
  }
  imageError.value = false;
};

const handleImageError = (event) => {
  console.error(`Image failed to load: ${event.target.src}`);
  imageError.value = true;
  event.target.src = '/products/fallbackimage.jpg';
};

const formatPrice = (price) => {
  return price?.toLocaleString('en-IN') || '0';
};

const handleTryAtHome = (e) => {
  e.stopPropagation();
  emit('try-at-home', props.product);
};

const handleVideoCall = (e) => {
  e.stopPropagation();
  emit('video-call', props.product);
};

const toggleWishlist = (e) => {
  e.stopPropagation();
  isInWishlist.value = !isInWishlist.value;
  emit('toggle-wishlist', props.product, isInWishlist.value);
};

const handleCardClick = () => {
  emit('click', props.product);
};
</script>

<style scoped>
/* Line clamp utility for truncating text */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Ensure card has proper stacking context for buttons */
.group {
  position: relative;
  overflow: visible;
}

/* Smooth button animation */
.group:hover {
  transform: translateY(-4px);
}

</style>