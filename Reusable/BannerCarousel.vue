<template>
  <section class="relative overflow-hidden mt-[100px]">
<div class="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">      <!-- Render Image -->
      <div v-if="slides[currentSlide].type === 'image'" class="w-full h-full">
        <img
          :src="slides[currentSlide].image"
          :alt="slides[currentSlide].title"
          class="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>

      <!-- Render Video -->
      <div v-else-if="slides[currentSlide].type === 'video'" class="w-full h-full">
        <video
          :autoplay="autoplay"
          :muted="muted"
          :loop="loop"
          :playsinline="playsinline"
          class="w-full h-full object-cover"
        >
          <source :src="slides[currentSlide].video" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <!-- Gradient overlay for better text readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

      <!-- Navigation Arrows -->
      <button
        v-if="showNavigation"
        @click="prevSlide"
        class="absolute left-2 sm:left-3 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 md:p-2.5 transition-all duration-300 hover:scale-105"
        :class="navigationButtonClass"
        aria-label="Previous slide"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        v-if="showNavigation"
        @click="nextSlide"
        class="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 md:p-2.5 transition-all duration-300 hover:scale-105"
        :class="navigationButtonClass"
        aria-label="Next slide"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Dots Indicator -->
      <div v-if="showDots" class="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2">
        <button
          v-for="(slide, index) in slides"
          :key="getSlideKey(slide, index)"
          @click="currentSlide = index"
          :class="[
            'w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 hover:scale-110',
            currentSlide === index ? activeDotClass : inactiveDotClass
          ]"
          :aria-label="`Go to slide ${index + 1}`"
        ></button>
      </div>

      <!-- Slide Content -->
      <div v-if="slides[currentSlide].title || slides[currentSlide].description" 
           class="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 text-center text-white w-full px-4 sm:px-6 md:px-8">
        <h2 v-if="slides[currentSlide].title" class="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2 drop-shadow-lg">
          {{ slides[currentSlide].title }}
        </h2>
        <p v-if="slides[currentSlide].description" class="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 drop-shadow-lg leading-tight sm:leading-relaxed">
          {{ slides[currentSlide].description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

// Define props
const props = defineProps({
  slides: {
    type: Array,
    required: true,
    default: () => []
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  muted: {
    type: Boolean,
    default: true
  },
  loop: {
    type: Boolean,
    default: true
  },
  playsinline: {
    type: Boolean,
    default: true
  },
  showNavigation: {
    type: Boolean,
    default: true
  },
  showDots: {
    type: Boolean,
    default: true
  },
  autoPlayInterval: {
    type: Number,
    default: 5000
  },
  navigationButtonClass: {
    type: String,
    default: 'rounded-full'
  },
  activeDotClass: {
    type: String,
    default: 'bg-purple-600'
  },
  inactiveDotClass: {
    type: String,
    default: 'bg-white/50'
  },
  startIndex: {
    type: Number,
    default: 0
  }
})

// Define emits
const emit = defineEmits(['slide-change', 'next', 'prev'])

// Reactive data
const currentSlide = ref(props.startIndex)
let autoPlayTimer = null

// Methods
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.slides.length
  emit('next', currentSlide.value)
  emit('slide-change', currentSlide.value)
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? props.slides.length - 1 : currentSlide.value - 1
  emit('prev', currentSlide.value)
  emit('slide-change', currentSlide.value)
}

const getSlideKey = (slide, index) => {
  return slide.id || `slide-${index}`
}

const startAutoPlay = () => {
  if (props.autoPlayInterval > 0 && props.autoplay) {
    stopAutoPlay()
    autoPlayTimer = setInterval(nextSlide, props.autoPlayInterval)
  }
}

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

// Watchers
watch(() => props.slides, (newSlides) => {
  if (currentSlide.value >= newSlides.length) {
    currentSlide.value = 0
  }
})

watch(() => props.autoPlayInterval, () => {
  startAutoPlay()
})

// Lifecycle hooks
onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
video {
  border-radius: 0.5rem;
}

@media (min-width: 640px) {
  video {
    border-radius: 0.75rem;
  }
}

@media (min-width: 768px) {
  video {
    border-radius: 1rem;
  }
}

@media (min-width: 1024px) {
  video {
    border-radius: 1.5rem;
  }
}

/* Touch device improvements */
@media (hover: none) and (pointer: coarse) {
  .absolute button {
    padding: 12px;
    min-width: 44px;
    min-height: 44px;
  }
  
  .absolute .flex button {
    min-width: 16px;
    min-height: 16px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>