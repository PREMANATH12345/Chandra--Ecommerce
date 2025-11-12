<template>
  <section class="relative overflow-hidden">
    
  <div class="relative h-[500px] md:h-[600px] overflow-hidden mt-16">
    
    <!-- Render Image -->
    <div v-if="slides[currentSlide].type === 'image'" class="w-full h-full p-4">
      <img
        :src="slides[currentSlide].image"
        :alt="slides[currentSlide].title"
        class="w-full h-full object-cover object-center"
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

    <!-- Gradient overlay -->
    <div class="absolute inset-0"></div>

    <!-- Navigation Arrows -->
    <button
      v-if="showNavigation"
      @click="prevSlide"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 transition"
      :class="navigationButtonClass"
    >
      <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button
      v-if="showNavigation"
      @click="nextSlide"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 transition"
      :class="navigationButtonClass"
    >
      <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Dots Indicator -->
    <div v-if="showDots" class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
      <button
        v-for="(slide, index) in slides"
        :key="getSlideKey(slide, index)"
        @click="currentSlide = index"
        :class="[
          'w-3 h-3 rounded-full transition',
          currentSlide === index ? activeDotClass : inactiveDotClass
        ]"
      ></button>
    </div>

    <!-- Optional: Slide Content -->
    <div v-if="slides[currentSlide].title || slides[currentSlide].description" 
         class="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-white">
      <h2 v-if="slides[currentSlide].title" class="text-2xl md:text-4xl font-bold mb-2">
        {{ slides[currentSlide].title }}
      </h2>
      <p v-if="slides[currentSlide].description" class="text-lg">
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
  border-radius: 1.5rem;
}
</style>