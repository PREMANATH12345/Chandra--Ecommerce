<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <div class="text-sm text-gray-500 mb-8">
      <span 
        v-for="(crumb, index) in productData.breadcrumb" 
        :key="index"
        :class="[ 
          'transition-colors',
          crumb.path ? 'hover:text-gray-700 cursor-pointer' : 'text-gray-900 font-medium'
        ]"
        @click="crumb.path && $router.push(crumb.path)"
      >
        {{ crumb.label }}
        <span v-if="index < productData.breadcrumb.length - 1" class="mx-1">></span>
      </span>
    </div>

    <div class="flex flex-col lg:flex-row gap-12">
      <!-- Left Side - Image Gallery -->
      <div class="lg:w-1/2">
        <div class="sticky top-8">
          <!-- Grid with 2 images per row -->
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div 
              v-for="(image, index) in productData.images" 
              :key="index"
              class="bg-white rounded-2xl p-4"
            >
              <img 
                :src="image" 
                :alt="`${productData.title} view ${index + 1}`"
                class="w-full h-64 object-contain rounded-lg"
              />
            </div>
          </div>

          <!-- Thumbnail Images -->
          <div class="flex gap-3 overflow-x-auto">
            <div 
              v-for="(thumb, index) in productData.thumbnails" 
              :key="index"
              class="flex-shrink-0 w-20 h-20 border-2 border-transparent hover:border-purple-500 rounded-lg cursor-pointer transition-all"
              :class="{ 'border-purple-500': selectedImage === index }"
              @click="selectedImage = index"
            >
              <img 
                :src="thumb" 
                :alt="`${productData.title} thumbnail ${index + 1}`"
                class="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Product Details -->
      <div class="lg:w-1/2">
        <!-- Stock Status -->
        <div 
          v-if="productData.stock" 
          class="inline-flex items-center px-3 py-1 rounded-full bg-red-50 border border-red-200 mb-4"
        >
          <span class="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
          <span class="text-red-400 text-sm font-medium">{{ productData.stock }}</span>
        </div>

        <!-- Rating -->
        <div v-if="productData.rating" class="flex items-center gap-2 mb-4">
          <div class="flex">
            <span v-for="star in productData.rating" :key="star" class="text-amber-400 text-lg">★</span>
          </div>
          <span class="text-gray-500 text-sm">({{ productData.reviews }} Reviews)</span>
        </div>

        <!-- Pricing -->
        <div class="mb-6" v-if="productData.price">
          <div class="flex items-baseline gap-3 mb-1">
            <span class="text-3xl font-bold text-gray-900">${{ productData.price.toLocaleString() }}</span>
            <span v-if="productData.originalPrice" class="text-xl text-gray-500 line-through">
              ${{ productData.originalPrice.toLocaleString() }}
            </span>
            <span 
              v-if="productData.originalPrice"
              class="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium"
            >
              Save ${{ (productData.originalPrice - productData.price).toLocaleString() }}
            </span>
          </div>
          <p class="text-gray-500 text-sm">{{ productData.taxInfo }}</p>
        </div>

        <!-- Product Title -->
        <h1 class="text-4xl font-bold text-gray-900 mb-4 leading-tight">{{ productData.title }}</h1>

        <!-- Discount or Promo Slot -->
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <slot name="promo">
            <div class="flex items-center">
              <div class="bg-blue-100 rounded-lg p-2 mr-3">
                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" 
                    d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 5.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 10l1.293-1.293zm4 0a1 1 0 010 1.414L11.586 10l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" 
                    clip-rule="evenodd" />
                </svg>
              </div>
              <p class="text-blue-800 font-semibold">{{ productData.discountText }}</p>
            </div>
          </slot>
        </div>

        <!-- Customization Options -->
        <div class="space-y-8 mb-8">
          <!-- Size -->
          <div v-if="productData.sizes">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Size</h3>
              <span class="text-sm text-green-600 font-medium">{{ selectedSize }}</span>
            </div>
            <div class="grid grid-cols-4 sm:grid-cols-4 gap-3">
              <button 
                v-for="size in productData.sizes" 
                :key="size.value"
                @click="selectedSize = size.value"
                :class="[ 
                  'py-3 px-4 border-2 rounded-xl text-center transition-all duration-200 font-medium',
                  selectedSize === size.value 
                    ? 'border-green-600 bg-green-50 text-green-700 shadow-sm' 
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                ]"
              >
                {{ size.label }}
              </button>
            </div>
          </div>

          <!-- Metal -->
          <div v-if="productData.metals">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Metal</h3>
              <span class="text-sm text-green-600 font-medium">{{ selectedMetal }}</span>
            </div>
            <div class="grid grid-cols-4 sm:grid-cols-4 gap-3">
              <button 
                v-for="metal in productData.metals" 
                :key="metal"
                @click="selectedMetal = metal"
                :class="[ 
                  'py-3 px-4 border-2 rounded-xl text-center transition-all duration-200 font-medium',
                  selectedMetal === metal 
                    ? 'border-green-600 bg-green-50 text-green-700 shadow-sm' 
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                ]"
              >
                {{ metal }}
              </button>
            </div>
          </div>

          <!-- Diamond -->
          <div v-if="productData.diamonds">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Diamond</h3>
              <span class="text-sm text-green-600 font-medium">{{ selectedDiamond }}</span>
            </div>
            <div class="grid grid-cols-4 sm:grid-cols-4 gap-3">
              <button 
                v-for="diamond in productData.diamonds" 
                :key="diamond.value"
                @click="selectedDiamond = diamond.value"
                :class="[ 
                  'py-3 px-4 border-2 rounded-xl text-center transition-all duration-200 font-medium',
                  selectedDiamond === diamond.value 
                    ? 'border-green-600 bg-green-50 text-green-700 shadow-sm' 
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                ]"
              >
                {{ diamond.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Size Helper -->
        <div class="mb-8 p-4 bg-gray-50 rounded-xl" v-if="productData.sizeHelperText">
          <button class="flex items-center justify-between w-full group">
            <span class="text-gray-700 font-medium">{{ productData.sizeHelperText }}</span>
            <span class="text-purple-600 font-semibold group-hover:text-purple-700 transition-colors">
              {{ productData.buttons?.learnMore || 'Learn More' }}
            </span>
          </button>
        </div>

        <!-- Action Buttons -->
        <div class="grid grid-cols-2 gap-4 mb-8 ">
          <button 
            @click="addToBag"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            {{ productData.buttons?.addToBag || 'Add to Bag' }}
          </button>
          
          <button 
            @click="tryAtHome"
            class="w-full border-2 border-green-600 text-green-600 hover:bg-purple-50 font-semibold py-4 px-6 rounded-xl transition-all duration-300"
          >
            {{ productData.buttons?.tryAtHome || 'Try at Home' }}
          </button>
        </div>

        <!-- Delivery Info -->
        <div v-if="productData.deliveryInfo" class="border-t border-gray-200 pt-6">
          <div class="flex items-start space-x-3">
            <div class="bg-gray-100 rounded-lg p-2 mt-1">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 mb-1">Delivery, Stores & Trial</h3>
              <p class="text-gray-600 text-sm">{{ productData.deliveryInfo }}</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Props
const props = defineProps({
  productData: {
    type: Object,
    required: true
  }
})

// Emits
const emit = defineEmits(['add-to-bag', 'try-at-home'])

// Refs
const selectedImage = ref(0)
const selectedSize = ref(props.productData.sizes?.[0]?.value || null)
const selectedMetal = ref(props.productData.metals?.[0] || null)
const selectedDiamond = ref(props.productData.diamonds?.[0]?.value || null)

// Methods
const addToBag = () => {
  const productToAdd = {
    product: props.productData.title,
    size: selectedSize.value,
    metal: selectedMetal.value,
    diamond: selectedDiamond.value,
    price: props.productData.price
  }
  emit('add-to-bag', productToAdd)
}

const tryAtHome = () => {
  emit('try-at-home', props.productData.title)
}
</script>

<style scoped>
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}
.overflow-x-auto::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 3px;
}
.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}
.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>
