<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

    <div class="flex flex-col lg:flex-row gap-10">
      <!-- Left Side - Image Gallery -->
      <div class="lg:w-1/2 w-14 max-w-xl mx-auto lg:mx-0">
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
        <div class="mb-4">
          <div 
            v-if="!isSelectedSizeAvailable && selectedSize" 
            class="inline-flex items-center px-3 py-1 rounded-full bg-orange-100"
          >
            <span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            <span class="text-orange-700 text-sm font-medium">Latest Design</span>
          </div>
          <div 
            v-else-if="isLowStock" 
            class="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100"
          >
            <span class="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
            <span class="text-yellow-700 text-sm font-medium">Low Stock</span>
          </div>
          <div 
            v-else-if="selectedSize && isSelectedSizeAvailable" 
            class="inline-flex items-center px-3 py-1 rounded-full bg-green-100"
          >
            <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span class="text-green-700 text-sm font-medium">In Stock</span>
          </div>
        </div>

        <!-- Rating -->
        <div v-if="productData.rating" class="flex items-center gap-2 mb-4">
          <div class="flex">
            <span v-for="star in 5" :key="star" class="text-amber-400 text-lg">
              {{ star <= productData.rating ? '★' : '☆' }}
            </span>
          </div>
          <span class="text-gray-500 text-sm">({{ productData.reviews }} Reviews)</span>
        </div>

        <!-- Pricing -->
        <div class="mb-6" v-if="productData.price">
          <div class="flex items-baseline gap-3 mb-1">
            <span class="text-2xl font-bold text-gray-900">${{ productData.price.toLocaleString() }}</span>
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
        <h1 class="text-2xl font-bold text-gray-900 mb-4 leading-tight">{{ productData.title }}</h1>

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
          <!-- Metal -->
          <div v-if="productData.metals">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-semibold text-gray-900">Metal</h3>
              <span class="text-sm text-green-600 font-medium">{{ selectedMetal }}</span>
            </div>
            <div class="grid grid-cols-4 sm:grid-cols-4 gap-3">
              <button 
                v-for="metal in productData.metals" 
                :key="metal.name"
                @click="selectMetal(metal)"
                :class="[ 
                  'py-2 px-2 border-2 rounded-xl text-center transition-all duration-200 font-medium',
                  selectedMetal === metal.name 
                    ? 'border-green-600 bg-green-50 text-green-700 shadow-sm' 
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                ]"
              >
                {{ metal.name }}
              </button>
            </div>
          </div>

          <!-- Size -->
          <div v-if="productData.sizes">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-semibold text-gray-900">Size</h3>
              <span v-if="selectedSize" class="text-sm text-green-600 font-medium">{{ selectedSize }}</span>
            </div>
            <div class="grid grid-cols-4 sm:grid-cols-4 gap-3">
              <button 
                v-for="size in productData.sizes" 
                :key="size.value"
                @click="handleSizeClick(size)"
                :class="[ 
                  'py-2 px-2 border-2 rounded-xl text-center transition-all duration-200 font-medium relative',
                  selectedSize === size.value 
                    ? size.available 
                      ? 'border-green-600 bg-green-50 text-green-700 shadow-sm' 
                      : 'border-red-500 bg-red-50 text-red-700 shadow-sm'
                    : size.available 
                      ? 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50' 
                      : 'border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-200 cursor-pointer'
                ]"
              >
                {{ size.label }}
                <span v-if="!size.available" class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></span>
              </button>
            </div>
            <p v-if="selectedSize && !isSelectedSizeAvailable" class="text-red-500 text-sm mt-2 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
              This size is currently unavailable. Click to submit an enquiry.
            </p>
          </div>

          <!-- Diamond -->
          <div v-if="productData.diamonds">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-semibold text-gray-900">Diamond</h3>
              <span class="text-sm text-green-600 font-medium">{{ selectedDiamond }}</span>
            </div>
            <div class="grid grid-cols-4 sm:grid-cols-4 gap-3">
              <button 
                v-for="diamond in productData.diamonds" 
                :key="diamond.value"
                @click="selectDiamond(diamond)"
                :class="[ 
                  'py-2 px-2 border-2 rounded-xl text-center transition-all duration-200 font-medium',
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
        <div v-if="selectedSize && isSelectedSizeAvailable" class="grid grid-cols-2 gap-4 mb-8">
          <button 
            @click="openProductTypeModal"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            {{ productData.buttons?.addToBag || 'Add to Bag' }}
          </button>
          
          <button 
            @click="tryAtHome"
            class="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-4 px-6 rounded-xl transition-all duration-300"
          >
            {{ productData.buttons?.tryAtHome || 'Try at Home' }}
          </button>
        </div>

        <!-- Enquiry Button for Unavailable Sizes -->
        <div v-else-if="selectedSize && !isSelectedSizeAvailable" class="mb-8">
          <button 
            @click="openEnquiryForm"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            {{ productData.buttons?.enquireNow || 'Enquire About This Size' }}
          </button>
        </div>

        <!-- No Size Selected Message -->
        <div v-else class="mb-8">
          <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
            <div class="flex items-center justify-center mb-3">
              <div class="bg-gray-200 rounded-full p-2 mr-3">
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Select a Size</h3>
            </div>
            <p class="text-gray-600">Please select your preferred size to continue</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Type Selection Modal -->
    <div v-if="showProductTypeModal" class="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl max-w-md w-full mx-auto">
        <div class="p-6">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900">Select Product Type</h3>
            <button 
              @click="showProductTypeModal = false"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Product Summary -->
          <div class="bg-gray-50 rounded-xl p-4 mb-6">
            <div class="flex items-center space-x-4">
              <img 
                :src="productData.images[0]" 
                :alt="productData.title"
                class="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h4 class="font-semibold text-gray-900">{{ productData.title }}</h4>
                <p class="text-sm text-gray-600">Size: <span class="font-semibold">{{ selectedSize }}</span></p>
                <p class="text-lg font-bold text-green-600">${{ productData.price.toLocaleString() }}</p>
              </div>
            </div>
          </div>

          <!-- Product Type Options -->
          <div class="space-y-4 mb-6">
            <div 
              v-for="(option, index) in productTypeOptions" 
              :key="option.id"
              class="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200"
              :class="[
                selectedProductTypes.includes(option.id) 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-gray-300'
              ]"
              @click="toggleProductType(option.id)"
            >
             
              <label 
                :for="`product-type-${option.id}`"
                class="ml-3 flex-1 cursor-pointer"
              >
                <span class="block text-sm font-medium text-gray-900">{{ option.name }}</span>
                <span class="block text-sm text-gray-500 mt-1">{{ option.description }}</span>
              </label>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button 
              @click="showProductTypeModal = false"
              class="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="handleProductTypeSelection"
              :disabled="selectedProductTypes.length === 0"
              class="flex-1 py-3 px-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Buy Now Modal -->
    <div v-if="showBuyModal" class="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl max-w-md w-full mx-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900">Buy Now</h3>
            <button @click="showBuyModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <p class="text-gray-600 mb-6">Proceeding to checkout with your selected products.</p>
          <div class="flex gap-3">
            <button 
              @click="showBuyModal = false"
              class="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              @click="proceedToCheckout"
              class="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
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
const emit = defineEmits(['add-to-bag', 'try-at-home', 'add-to-enquiry'])

// Refs
const selectedImage = ref(0)
const selectedSize = ref('')
const selectedMetal = ref('')
const selectedDiamond = ref('')
const showProductTypeModal = ref(false)
const showBuyModal = ref(false)
const isSubmitting = ref(false)
const enquirySize = ref('')
const selectedProductTypes = ref([])

// Product type options
const productTypeOptions = [
  { id: 'stl', name: 'STL File', description: '3D printable file format' },
  { id: 'cam', name: 'CAM Product', description: 'Computer-aided manufacturing' },
  { id: 'rubber', name: 'Rubber Mold', description: 'Flexible molding solution' },
  { id: 'casting', name: 'Casting Model', description: 'Metal casting pattern' }
]

// Computed properties
const isSelectedSizeAvailable = computed(() => {
  if (!selectedSize.value) return false
  const selectedSizeObj = props.productData.sizes.find(size => size.value === selectedSize.value)
  return selectedSizeObj ? selectedSizeObj.available : false
})

const isLowStock = computed(() => {
  return false
})

// Methods
const handleSizeClick = (size) => {
  selectedSize.value = size.value
  
  if (!size.available) {
    enquirySize.value = size.label
  }
}

const openProductTypeModal = () => {
  if (selectedSize.value && isSelectedSizeAvailable.value) {
    showProductTypeModal.value = true
    selectedProductTypes.value = [] // Reset selections
  }
}

const toggleProductType = (typeId) => {
  const index = selectedProductTypes.value.indexOf(typeId)
  if (index > -1) {
    selectedProductTypes.value.splice(index, 1)
  } else {
    selectedProductTypes.value.push(typeId)
  }
}

const handleProductTypeSelection = () => {
  const directBuyTypes = ['stl', 'cam']
  const enquiryTypes = ['rubber', 'casting']
  
  const hasDirectBuy = selectedProductTypes.value.some(type => directBuyTypes.includes(type))
  const hasEnquiryOnly = selectedProductTypes.value.some(type => enquiryTypes.includes(type))
  
  showProductTypeModal.value = false
  
  if (hasDirectBuy && !hasEnquiryOnly) {
    // Only STL or CAM selected - go to buy flow
    showBuyModal.value = true
  } else if (hasEnquiryOnly) {
    // Rubber mold or casting model selected - go to enquiry
    openEnquiryForm()
  } else {
    // No selection or mixed - use default behavior
    addToBag()
  }
}

const openEnquiryForm = () => {
  // Prepare enquiry data to pass to the enquiry page
  const enquiryData = {
    product: props.productData.title,
    size: selectedSize.value,
    sizeLabel: enquirySize.value || selectedSize.value,
    metal: selectedMetal.value,
    diamond: selectedDiamond.value,
    price: props.productData.price,
    image: props.productData.images[0],
    productTypes: selectedProductTypes.value,
    type: 'product_enquiry'
  }
  
  // Navigate to enquiry page with query parameters
  router.push({
    path: '/enquiry',
    query: {
      product: encodeURIComponent(enquiryData.product),
      size: encodeURIComponent(enquiryData.sizeLabel),
      metal: encodeURIComponent(enquiryData.metal || ''),
      diamond: encodeURIComponent(enquiryData.diamond || ''),
      productTypes: encodeURIComponent(enquiryData.productTypes.join(',')),
      price: enquiryData.price,
      source: 'product_page'
    }
  })
}

const selectMetal = (metal) => {
  selectedMetal.value = metal.name
}

const selectDiamond = (diamond) => {
  selectedDiamond.value = diamond.value
}

const addToBag = () => {
  if (!isSelectedSizeAvailable.value) return
  
  const productToAdd = {
    product: props.productData.title,
    size: selectedSize.value,
    metal: selectedMetal.value,
    diamond: selectedDiamond.value,
    price: props.productData.price,
    image: props.productData.images[0],
    productTypes: selectedProductTypes.value
  }
  emit('add-to-bag', productToAdd)
}

const proceedToCheckout = () => {
  showBuyModal.value = false
  // Add your checkout logic here
  console.log('Proceeding to checkout with:', selectedProductTypes.value)
}

const tryAtHome = () => {
  emit('try-at-home', props.productData.title)
}

// Initialize selections with available options
const initializeSelections = () => {
  if (props.productData.metals) {
    const availableMetal = props.productData.metals.find(metal => metal.available)
    if (availableMetal) {
      selectedMetal.value = availableMetal.name
    }
  }
  
  if (props.productData.diamonds) {
    const availableDiamond = props.productData.diamonds.find(diamond => diamond.available)
    if (availableDiamond) {
      selectedDiamond.value = availableDiamond.value
    }
  }
}

// Initialize when component mounts
initializeSelections()
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