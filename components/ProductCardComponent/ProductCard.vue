<template>
  <div 
    class="bg-white rounded-lg overflow-hidden group relative transition-all duration-300 hover:shadow-xl border border-gray-100"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Badge -->
    <div v-if="product.badge" class="absolute top-3 left-3 z-10">
      <span 
        :class="[
          'px-3 py-1 rounded-md text-xs font-bold',
          product.badge === 'BESTSELLER' ? 'bg-yellow-500 text-gray-900' : 'bg-yellow-400 text-gray-900'
        ]"
      >
        {{ product.badge }}
      </span>
    </div>

    <!-- Wishlist Icon -->
    <button 
      class="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-all"
      @click="toggleWishlist"
    >
      <svg 
        :class="['w-5 h-5 transition-colors', isInWishlist ? 'text-red-500 fill-current' : 'text-gray-600']" 
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

    <!-- Image Container -->
    <div class="relative aspect-square bg-gray-50 overflow-hidden">
      <img 
        :src="currentImage" 
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500"
        @error="handleImageError"
      />

      <!-- Navigation Arrows -->
      <button 
        v-if="product.images && product.images.length > 1"
        @click="previousImage"
        class="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100"
      >
        <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        v-if="product.images && product.images.length > 1"
        @click="nextImage"
        class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100"
      >
        <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Try at Home & Video Buttons -->
      <Transition name="fade">
        <div 
          v-if="isHovered" 
          class="absolute bottom-3 left-0 right-0 flex justify-center gap-2 px-3"
        >
          <button 
            v-if="product.tryAtHome"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-green-50 transition-colors shadow-md text-sm font-medium"
            @click="handleTryAtHome"
          >
            <span>TRY AT HOME</span>
          </button>
          <button 
            class="p-2 bg-white rounded-lg hover:bg-green-50 transition-colors shadow-md"
            @click="handleVideoCall"
          >
            <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
          </button>
        </div>
      </Transition>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <!-- Price -->
      <div class="flex items-center gap-2 mb-2">
        <span class="text-xl font-bold text-gray-900">₹{{ formatPrice(product.price) }}</span>
        <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">
          ₹{{ formatPrice(product.originalPrice) }}
        </span>
      </div>

      <!-- Delivery Info -->
      <p class="text-sm text-pink-600 font-medium mb-1">{{ product.deliveryText }}</p>
      
      <!-- Product Name -->
      <p class="text-sm text-gray-600 truncate">{{ product.name }}</p>
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

const emit = defineEmits(['try-at-home', 'video-call', 'toggle-wishlist']);

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

const nextImage = () => {
  if (!props.product.images || props.product.images.length === 0) return;
  
  if (currentImageIndex.value < props.product.images.length - 1) {
    currentImageIndex.value++;
  } else {
    currentImageIndex.value = 0;
  }
  imageError.value = false; // Reset error when changing images
};

const previousImage = () => {
  if (!props.product.images || props.product.images.length === 0) return;
  
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  } else {
    currentImageIndex.value = props.product.images.length - 1;
  }
  imageError.value = false; // Reset error when changing images
};

const handleImageError = (event) => {
  console.error(`Image failed to load: ${event.target.src}`);
  imageError.value = true;
  event.target.src = '/images/products/placeholder.jpg';
};

const formatPrice = (price) => {
  return price?.toLocaleString('en-IN') || '0';
};

const handleTryAtHome = () => {
  emit('try-at-home', props.product);
};

const handleVideoCall = () => {
  emit('video-call', props.product);
};

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value;
  emit('toggle-wishlist', props.product, isInWishlist.value);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>