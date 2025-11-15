<template>  
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-4 max-w-7xl">
    <!-- Breadcrumb - Desktop Only -->
    <div class="hidden lg:block text-xs text-gray-500 mb-4">
      <span 
        v-for="(crumb, index) in productData.breadcrumb" 
        :key="index"
        :class="[
          'transition-colors',
          crumb.path
            ? 'hover:text-gray-700 cursor-pointer'
            : 'text-gray-900 font-medium',
        ]"
        @click="crumb.path && $router.push(crumb.path)"
      >
        {{ crumb.label }}
        <span v-if="index < productData.breadcrumb.length - 1" class="mx-1"
          >></span
        >
      </span>
    </div>

    <div class="flex flex-col lg:flex-row gap-6 lg:gap-10">
      <!-- Left Side - Image Gallery -->
      <div class="lg:w-1/2 w-full">
        <!-- Desktop: Grid with 2 images per row, left-aligned -->
        <div class="hidden lg:block">
          <div class="grid grid-cols-2 gap-4">
            <div 
              v-for="(image, index) in productData.images" 
              :key="index"
              class="bg-white rounded-2xl p-4 w-full"
            >
              <img
                :src="image"
                :alt="`${productData.title} view ${index + 1}`"
                class="w-full h-64 object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        <!-- Mobile/Tablet: Horizontal scroll -->
        <div class="lg:hidden overflow-x-auto flex gap-4 snap-x snap-mandatory pb-4">
          <div 
            v-for="(image, index) in productData.images" 
            :key="index"
            class="flex-shrink-0 w-full snap-center"
          >
            <img 
              :src="image" 
              :alt="`${productData.title} view ${index + 1}`"
              class="w-full h-80 object-contain rounded-lg"
            />
          </div>
        </div>
      </div>

      <!-- Right Side - Product Details -->
      <div class="lg:w-1/2 w-full flex flex-col pb-20 lg:pb-0">
        <!-- Rating - First -->
        <div v-if="productData.rating" class="flex items-center gap-2 mb-3 order-1">
          <div class="flex">
            <span v-for="star in 5" :key="star" class="text-amber-400 text-base">
              {{ star <= productData.rating ? '★' : '☆' }}
            </span>
          </div>
          <span class="text-gray-500 text-xs">{{ productData.reviews }} Ratings</span>
        </div>

        <!-- Pricing - Second -->
        <div class="mb-3 order-2" v-if="productData.price">
          <div class="flex items-baseline gap-2 mb-1">
            <span class="text-xl font-bold text-gray-900">₹{{ productData.price.toLocaleString() }}</span>
            <span v-if="productData.originalPrice" class="text-base text-gray-400 line-through">
              ₹{{ productData.originalPrice.toLocaleString() }}
            </span>
          </div>
          <p class="text-gray-500 text-xs">{{ productData.taxInfo }}</p>
        </div>

        <!-- Product Title - Third -->
        <h1 class="text-base font-semibold text-gray-700 mb-3 leading-tight order-3">{{ productData.title }}</h1>

        <!-- Discount Text - Fourth -->
        <div class="mb-4 order-4">
          <p class="text-green-600 font-medium text-sm">{{ productData.discountText }}</p>
        </div>

        <!-- Customization Card - Fifth -->
        <div class="mb-6 order-5">
          <div class="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <div class="grid grid-cols-4 divide-x divide-gray-200">
              <!-- Size Card -->
              <button 
                @click="openCustomizationModal('size')"
                class="text-center hover:bg-gray-50 transition-all p-3"
              >
                <div class="text-xs text-gray-500 mb-1">Size</div>
                <div class="font-semibold text-xs truncate">
                  {{ selectedSize ? productData.sizes.find(s => s.value === selectedSize)?.label : '-' }}
                </div>
              </button>

              <!-- Metal Card -->
              <button 
                @click="openCustomizationModal('metal')"
                class="text-center hover:bg-gray-50 transition-all p-3"
              >
                <div class="text-xs text-gray-500 mb-1">Metal</div>
                <div class="font-semibold text-xs truncate">
                  {{ selectedMetal ? selectedMetal.split(' ')[0] : '-' }}
                </div>
              </button>

              <!-- Diamond Card -->
              <button 
                @click="openCustomizationModal('diamond')"
                class="text-center hover:bg-gray-50 transition-all p-3"
              >
                <div class="text-xs text-gray-500 mb-1">Diamond</div>
                <div class="font-semibold text-xs truncate">
                  {{ selectedDiamond ? selectedDiamond.split(' ')[0] : '-' }}
                </div>
              </button>

              <!-- Customize Button -->
              <button 
                @click="openCustomizationModal('all')"
                class="text-center bg-yellow-400 hover:bg-yellow-500 transition-all p-3"
              >
                <div class="text-xs text-gray-800 font-semibold">CUSTOMISE</div>
              </button>
            </div>
          </div>
        </div>

        <!-- Action Buttons - Desktop -->
        <div v-if="selectedSize && isSelectedSizeAvailable" class="hidden lg:grid grid-cols-1 gap-4 mb-8 order-6">
          <button 
            @click="openProductTypeModal"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            {{ productData.buttons?.addToBag || "Add to Bag" }}
          </button>
        </div>

        <!-- Enquiry Button for Unavailable Sizes - Desktop -->
        <div v-else-if="selectedSize && !isSelectedSizeAvailable" class="hidden lg:block mb-8 order-6">
          <button 
            @click="openEnquiryForm"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            {{ productData.buttons?.enquireNow || "Enquire About This Size" }}
          </button>
        </div>

        <!-- No Size Selected Message - Desktop -->
        <div v-else class="hidden lg:block mb-8 order-6">
          <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
            <div class="flex items-center justify-center mb-3">
              <div class="bg-gray-200 rounded-full p-2 mr-3">
                <svg
                  class="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Select a Size</h3>
            </div>
            <p class="text-gray-600">
              Please select your preferred size to continue
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Fixed Bottom Button - Mobile/Tablet Only -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
      <button 
        v-if="selectedSize && isSelectedSizeAvailable"
        @click="openProductTypeModal"
        class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg"
      >
        {{ productData.buttons?.addToBag || 'Add to Bag' }}
      </button>
      <button 
        v-else-if="selectedSize && !isSelectedSizeAvailable"
        @click="openEnquiryForm"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg"
      >
        {{ productData.buttons?.enquireNow || 'Enquire About This Size' }}
      </button>
      <div v-else class="w-full bg-gray-100 text-gray-500 font-semibold py-3 px-6 rounded-lg text-center">
        Select a Size to Continue
      </div>
    </div>

    <!-- Customization Modal -->
    <div 
      v-if="showCustomizationModal" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end items-end lg:items-stretch"
      @click.self="closeCustomizationModal"
    >
      <!-- Desktop: Right side panel (Half width) -->
      <div class="hidden lg:block lg:w-1/2 bg-white h-full shadow-2xl animate-slide-in-right overflow-y-auto">
        <div class="p-6 relative">
          <!-- Close button -->
          <button 
            @click="closeCustomizationModal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Price Header -->
          <div class="text-center mb-6 pt-8 bg-green-50 -mx-6 px-6 pb-4">
            <p class="text-xs text-gray-600 mb-1">Estimated price</p>
            <div class="flex items-center justify-center gap-2">
              <span class="text-2xl font-bold text-gray-900">₹{{ productData.price.toLocaleString() }}</span>
              <span v-if="productData.originalPrice" class="text-lg text-gray-400 line-through">
                ₹{{ productData.originalPrice.toLocaleString() }}
              </span>
            </div>
          </div>

          <!-- Choice of Metal -->
          <div class="mb-6">
            <h3 class="text-sm font-semibold mb-3">Choice of Metal</h3>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="metal in productData.metals"
                :key="metal.name"
                @click="selectMetal(metal)"
                :class="[
                  'p-3 border-2 rounded-lg text-center transition-all',
                  selectedMetal === metal.name
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="font-medium text-xs">{{ metal.name }}</div>
                <div class="text-xs text-green-600 mt-1">In Stock!</div>
              </button>
            </div>
          </div>

          <!-- Diamond Quality -->
          <div class="mb-6">
            <div class="flex justify-between items-center mb-3">
              <h3 class="text-sm font-semibold">Diamond Quality</h3>
              <a href="#" class="text-xs text-green-600 hover:underline">DIAMOND GUIDE</a>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="diamond in productData.diamonds"
                :key="diamond.value"
                @click="selectDiamond(diamond)"
                :class="[
                  'p-3 border-2 rounded-lg text-center transition-all',
                  selectedDiamond === diamond.value
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="font-medium text-xs">{{ diamond.label }}</div>
                <div class="text-xs text-green-600 mt-1">In Stock!</div>
              </button>
            </div>
          </div>

          <!-- Select Size -->
          <div class="mb-6">
            <div class="flex justify-between items-center mb-3">
              <h3 class="text-sm font-semibold">Select Size</h3>
              <a href="#" class="text-xs text-green-600 hover:underline">SIZE GUIDE</a>
            </div>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="size in productData.sizes"
                :key="size.value"
                @click="handleSizeClick(size)"
                :class="[
                  'p-2 border-2 rounded-lg transition-all text-center',
                  selectedSize === size.value
                    ? size.available
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : size.available
                      ? 'border-gray-200 hover:border-gray-300'
                      : 'border-gray-200 bg-gray-100'
                ]"
              >
                <div class="font-semibold text-xs">{{ size.label }}</div>
                <div class="text-xs text-gray-500 mt-1">{{ size.value.split('(')[1]?.replace(')', '') }}</div>
                <div v-if="size.available" class="text-xs text-green-600 mt-1">Stock</div>
                <div v-else class="text-xs text-gray-500 mt-1">Order</div>
              </button>
            </div>
          </div>

          <!-- Confirm Button -->
          <button
            @click="confirmCustomization"
            class="w-full py-3 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            CONFIRM CUSTOMISATION
          </button>
        </div>
      </div>

      <!-- Mobile: Bottom sheet (60% height with close button visible) -->
      <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl h-[60vh] animate-slide-up overflow-y-auto">
        <div class="p-4 pb-6">
          <!-- Handle bar -->
          <div class="flex justify-center mb-3" @click="closeCustomizationModal">
            <div class="w-12 h-1 bg-gray-300 rounded-full cursor-pointer"></div>
          </div>
          
          <!-- Price Header -->
          <div class="text-center mb-4 bg-green-50 -mx-4 px-4 py-3">
            <p class="text-xs text-gray-600 mb-1">Estimated price</p>
            <div class="flex items-center justify-center gap-2">
              <span class="text-xl font-bold text-gray-900">₹{{ productData.price.toLocaleString() }}</span>
              <span v-if="productData.originalPrice" class="text-base text-gray-400 line-through">
                ₹{{ productData.originalPrice.toLocaleString() }}
              </span>
            </div>
          </div>

          <!-- Choice of Metal -->
          <div class="mb-4">
            <h3 class="text-sm font-semibold mb-2">Choice of Metal</h3>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="metal in productData.metals"
                :key="metal.name"
                @click="selectMetal(metal)"
                :class="[
                  'p-2 border-2 rounded-lg text-center transition-all',
                  selectedMetal === metal.name
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="font-medium text-xs">{{ metal.name }}</div>
                <div class="text-xs text-green-600 mt-1">In Stock!</div>
              </button>
            </div>
          </div>

          <!-- Diamond Quality -->
          <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-sm font-semibold">Diamond Quality</h3>
              <a href="#" class="text-xs text-green-600 hover:underline">GUIDE</a>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="diamond in productData.diamonds"
                :key="diamond.value"
                @click="selectDiamond(diamond)"
                :class="[
                  'p-2 border-2 rounded-lg text-center transition-all',
                  selectedDiamond === diamond.value
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="font-medium text-xs">{{ diamond.label }}</div>
                <div class="text-xs text-green-600 mt-1">In Stock!</div>
              </button>
            </div>
          </div>

          <!-- Select Size -->
          <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-sm font-semibold">Select Size</h3>
              <a href="#" class="text-xs text-green-600 hover:underline">GUIDE</a>
            </div>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="size in productData.sizes"
                :key="size.value"
                @click="handleSizeClick(size)"
                :class="[
                  'p-2 border-2 rounded-lg transition-all text-center',
                  selectedSize === size.value
                    ? size.available
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : size.available
                      ? 'border-gray-200 hover:border-gray-300'
                      : 'border-gray-200 bg-gray-100'
                ]"
              >
                <div class="font-semibold text-xs">{{ size.label }}</div>
                <div class="text-xs text-gray-500 mt-1">{{ size.value.split('(')[1]?.replace(')', '') }}</div>
                <div v-if="size.available" class="text-xs text-green-600">Stock</div>
                <div v-else class="text-xs text-gray-500">Order</div>
              </button>
            </div>
          </div>

          <!-- Confirm Button -->
          <button
            @click="confirmCustomization"
            class="w-full py-3 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            CONFIRM CUSTOMISATION
          </button>
        </div>
      </div>
    </div>

    <!-- Product Type Selection Modal -->
    <div v-if="showProductTypeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl max-w-md w-full mx-auto">
        <div class="p-6">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900">Select Product Type</h3>
            <button
              @click="closeProductTypeModal"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
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
                <p class="text-lg font-bold text-green-600">₹{{ productData.price.toLocaleString() }}</p>
              </div>
            </div>
          </div>

          <!-- Product Type Options -->
          <div class="space-y-4 mb-6">
            <div
              v-for="option in productTypeOptions"
              :key="option.id"
              class="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200"
              :class="[
                selectedProductTypes.includes(option.id)
                  ? getOptionBorderClass(option.id)
                  : 'border-gray-200 hover:border-gray-300',
                isOptionDisabled(option.id) ? 'opacity-50 cursor-not-allowed' : ''
              ]"
              @click="!isOptionDisabled(option.id) && selectProductType(option.id)"
            >
              <label 
                :for="`product-type-${option.id}`"
                class="ml-3 flex-1 cursor-pointer"
              >
                <div
                  v-if="selectedProductTypes.includes(option.id)"
                  class="w-2 h-2 rounded-full"
                  :class="getOptionDotClass(option.id)"
                ></div>
              </label>
              <label class="flex-1 cursor-pointer" :class="isOptionDisabled(option.id) ? 'cursor-not-allowed' : ''">
                <span class="block text-sm font-medium text-gray-900">{{
                  option.name
                }}</span>
                <span class="block text-sm text-gray-500 mt-1">{{
                  option.description
                }}</span>
                <span v-if="isOptionDisabled(option.id)" class="block text-xs text-red-500 mt-1">
                  Cannot be selected with current options
                </span>
              </label>
            </div>
          </div>

          <!-- Selection Info -->
          <div
            v-if="selectedProductTypes.length > 0"
            class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6"
          >
            <div class="flex items-center">
              <svg
                class="w-5 h-5 text-blue-600 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              <p class="text-blue-800 text-sm font-medium">
                <span v-if="hasPhysicalProducts && hasDigitalProducts">
                  Digital and physical products cannot be selected together
                </span>
                <span v-else-if="isStlCamSelected">
                  STL and CAM are selected together
                </span>
                <span v-else-if="hasDigitalProducts">
                  You can select STL and CAM separately or together
                </span>
                <span v-else-if="hasPhysicalProducts">
                  Physical products require custom quotation
                </span>
              </p>
            </div>
          </div>

          <!-- Selected Types Summary -->
          <div
            v-if="selectedProductTypes.length > 0"
            class="bg-gray-50 rounded-xl p-4 mb-6"
          >
            <h4 class="font-semibold text-gray-900 mb-2">Selected Types:</h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="type in selectedProductTypes"
                :key="type"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                :class="getProductTypeBadgeClass(type)"
              >
                {{ getProductTypeName(type) }}
                <button
                  @click.stop="removeProductType(type)"
                  class="ml-2 hover:opacity-70 transition-opacity"
                  :class="getProductTypeBadgeTextClass(type)"
                >
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button
              @click="closeProductTypeModal"
              class="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="handleProductTypeSelection"
              :disabled="selectedProductTypes.length === 0"
              class="flex-1 py-3 px-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ getActionButtonText }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Buy Now Modal -->
    <div v-if="showBuyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl max-w-md w-full mx-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900">Buy Now</h3>
            <button
              @click="showBuyModal = false"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <p class="text-gray-600 mb-6">
            Proceeding to checkout with your selected products.
          </p>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

// Props
const props = defineProps({
  productData: {
    type: Object,
    required: true,
  },
});

// Emits
const emit = defineEmits(["add-to-bag", "try-at-home", "add-to-enquiry"]);

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
const showCustomizationModal = ref(false)
const currentCustomizationTab = ref('all')

// Product type options
const productTypeOptions = [
  { id: "stl", name: "STL File", description: "3D printable file format", category: "digital" },
  { id: "cam", name: "CAM Product", description: "Computer-aided manufacturing", category: "digital" },
  { id: "rubber", name: "Rubber Mold", description: "Flexible molding solution", category: "physical" },
  { id: "casting", name: "Casting Model", description: "Metal casting pattern", category: "physical" },
];

// Computed properties
const isSelectedSizeAvailable = computed(() => {
  if (!selectedSize.value) return false;
  const selectedSizeObj = props.productData.sizes.find(
    (size) => size.value === selectedSize.value
  );
  return selectedSizeObj ? selectedSizeObj.available : false;
});

const isLowStock = computed(() => {
  return false;
});

const isStlCamSelected = computed(() => {
  return (
    selectedProductTypes.value.includes("stl") &&
    selectedProductTypes.value.includes("cam")
  );
});

const hasDigitalProducts = computed(() => {
  return selectedProductTypes.value.some(type => 
    productTypeOptions.find(opt => opt.id === type)?.category === "digital"
  );
});

const hasPhysicalProducts = computed(() => {
  return selectedProductTypes.value.some(type => 
    productTypeOptions.find(opt => opt.id === type)?.category === "physical"
  );
});

const getActionButtonText = computed(() => {
  if (hasPhysicalProducts.value) {
    return "Request Quotation";
  } else if (hasDigitalProducts.value) {
    return "Add to Cart";
  }
  return "Continue";
});

// Helper Methods
const isOptionDisabled = (optionId) => {
  const option = productTypeOptions.find(opt => opt.id === optionId);
  if (!option) return false;
  
  if (selectedProductTypes.value.length === 0) return false;
  
  if (option.category === "digital" && hasPhysicalProducts.value) return true;
  if (option.category === "physical" && hasDigitalProducts.value) return true;
  
  return false;
};

const getOptionBorderClass = (optionId) => {
  const option = productTypeOptions.find(opt => opt.id === optionId);
  return option?.category === "digital" 
    ? 'border-blue-500 bg-blue-50' 
    : 'border-green-500 bg-green-50';
};

const getOptionDotClass = (optionId) => {
  const option = productTypeOptions.find(opt => opt.id === optionId);
  return option?.category === "digital" ? 'bg-blue-500' : 'bg-green-500';
};

const getProductTypeBadgeClass = (typeId) => {
  const option = productTypeOptions.find(opt => opt.id === typeId);
  return option?.category === "digital" 
    ? 'bg-blue-100 text-blue-700' 
    : 'bg-green-100 text-green-700';
};

const getProductTypeBadgeTextClass = (typeId) => {
  const option = productTypeOptions.find(opt => opt.id === typeId);
  return option?.category === "digital" ? 'text-blue-700' : 'text-green-700';
};

const getProductTypeName = (typeId) => {
  return productTypeOptions.find(opt => opt.id === typeId)?.name || '';
};

// Methods
const openCustomizationModal = (tab) => {
  currentCustomizationTab.value = tab
  showCustomizationModal.value = true
}

const closeCustomizationModal = () => {
  showCustomizationModal.value = false
}

const confirmCustomization = () => {
  closeCustomizationModal()
}

const handleSizeClick = (size) => {
  selectedSize.value = size.value;

  if (!size.available) {
    enquirySize.value = size.label;
  }
};

const openProductTypeModal = () => {
  if (selectedSize.value && isSelectedSizeAvailable.value) {
    showProductTypeModal.value = true
    selectedProductTypes.value = []
  }
};

const closeProductTypeModal = () => {
  showProductTypeModal.value = false;
  selectedProductTypes.value = [];
};

const selectProductType = (typeId) => {
  const index = selectedProductTypes.value.indexOf(typeId);
  const option = productTypeOptions.find(opt => opt.id === typeId);

  if (index > -1) {
    selectedProductTypes.value.splice(index, 1);
  } else {
    if (option?.category === "physical") {
      selectedProductTypes.value = selectedProductTypes.value.filter(
        id => productTypeOptions.find(opt => opt.id === id)?.category !== "digital"
      );
    }
    else if (option?.category === "digital") {
      selectedProductTypes.value = selectedProductTypes.value.filter(
        id => productTypeOptions.find(opt => opt.id === id)?.category !== "physical"
      );
    }
    
    selectedProductTypes.value.push(typeId);
  }
};

const removeProductType = (typeId) => {
  const index = selectedProductTypes.value.indexOf(typeId);
  if (index > -1) {
    selectedProductTypes.value.splice(index, 1);
  }
};

const handleProductTypeSelection = () => {
  const directBuyTypes = ['stl', 'cam']
  const enquiryTypes = ['rubber', 'casting']
  
  const hasDirectBuy = selectedProductTypes.value.some(type => directBuyTypes.includes(type))
  const hasEnquiryOnly = selectedProductTypes.value.some(type => enquiryTypes.includes(type))
  
  showProductTypeModal.value = false
  
  if (hasDirectBuy && !hasEnquiryOnly) {
    showBuyModal.value = true
  } else if (hasEnquiryOnly) {
    openEnquiryForm()
  } else {
    addToBag()
  }
};

const openEnquiryForm = () => {
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
  
  router.push({
    path: "/enquiry",
    query: {
      product: encodeURIComponent(enquiryData.product),
      size: encodeURIComponent(enquiryData.sizeLabel),
      metal: encodeURIComponent(enquiryData.metal || ""),
      diamond: encodeURIComponent(enquiryData.diamond || ""),
      productTypes: encodeURIComponent(enquiryData.productTypes.join(",")),
      price: enquiryData.price,
      source: "product_page",
    },
  });
};

const selectMetal = (metal) => {
  selectedMetal.value = metal.name;
};

const selectDiamond = (diamond) => {
  selectedDiamond.value = diamond.value;
};

const addToBag = () => {
  if (!isSelectedSizeAvailable.value) return;

  const productToAdd = {
    product: props.productData.title,
    size: selectedSize.value,
    metal: selectedMetal.value,
    diamond: selectedDiamond.value,
    price: props.productData.price,
    image: props.productData.images[0],
    productTypes: selectedProductTypes.value,
  };
  emit("add-to-bag", productToAdd);
};

const proceedToCheckout = () => {
  showBuyModal.value = false;
  console.log("Proceeding to checkout with product types:", selectedProductTypes.value);
};

const tryAtHome = () => {
  emit("try-at-home", props.productData.title);
};

// Initialize selections with available options
const initializeSelections = () => {
  if (props.productData.metals) {
    const availableMetal = props.productData.metals.find(
      (metal) => metal.available
    );
    if (availableMetal) {
      selectedMetal.value = availableMetal.name;
    }
  }

  if (props.productData.diamonds) {
    const availableDiamond = props.productData.diamonds.find(
      (diamond) => diamond.available
    );
    if (availableDiamond) {
      selectedDiamond.value = availableDiamond.value;
    }
  }
};

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

/* Animations for modals */
@keyframes slide-in-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.animate-slide-in-right {
  animation: slide-in-right 0.3s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}

/* Hide scrollbar for mobile image gallery */
@media (max-width: 1024px) {
  .overflow-x-auto::-webkit-scrollbar {
    display: none;
  }
  .overflow-x-auto {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

/* Snap scroll for mobile images */
.snap-x {
  scroll-snap-type: x mandatory;
}

.snap-center {
  scroll-snap-align: center;
}
</style><template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-4">
    <!-- Breadcrumb - Desktop Only -->
    <div class="hidden lg:block text-xs text-gray-500 mb-4">
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

    <div class="flex flex-col lg:flex-row gap-6 lg:gap-10">
      <!-- Left Side - Image Gallery -->
      <div class="lg:w-1/2 w-full">
        <!-- Desktop: Grid with 2 images per row, left-aligned -->
        <div class="hidden lg:block">
          <div class="grid grid-cols-2 gap-4">
            <div 
              v-for="(image, index) in productData.images" 
              :key="index"
              class="bg-white rounded-2xl p-4 w-full"
            >
              <img 
                :src="image" 
                :alt="`${productData.title} view ${index + 1}`"
                class="w-full h-64 object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        <!-- Mobile/Tablet: Horizontal scroll -->
        <div class="lg:hidden overflow-x-auto flex gap-4 snap-x snap-mandatory pb-4">
          <div 
            v-for="(image, index) in productData.images" 
            :key="index"
            class="flex-shrink-0 w-full snap-center"
          >
            <img 
              :src="image" 
              :alt="`${productData.title} view ${index + 1}`"
              class="w-full h-80 object-contain rounded-lg"
            />
          </div>
        </div>
      </div>

      <!-- Right Side - Product Details -->
      <div class="lg:w-1/2 flex flex-col lg:pr-0 pb-20 lg:pb-0">
        <!-- Rating - First -->
        <div v-if="productData.rating" class="flex items-center gap-2 mb-3 order-1">
          <div class="flex">
            <span v-for="star in 5" :key="star" class="text-amber-400 text-base">
              {{ star <= productData.rating ? '★' : '☆' }}
            </span>
          </div>
          <span class="text-gray-500 text-xs">{{ productData.reviews }} Ratings</span>
        </div>

        <!-- Pricing - Second -->
        <div class="mb-3 order-2" v-if="productData.price">
          <div class="flex items-baseline gap-2 mb-1">
            <span class="text-xl font-bold text-gray-900">₹{{ productData.price.toLocaleString() }}</span>
            <span v-if="productData.originalPrice" class="text-base text-gray-400 line-through">
              ₹{{ productData.originalPrice.toLocaleString() }}
            </span>
          </div>
          <p class="text-gray-500 text-xs">{{ productData.taxInfo }}</p>
        </div>

        <!-- Product Title - Third -->
        <h1 class="text-base font-semibold text-gray-700 mb-3 leading-tight order-3">{{ productData.title }}</h1>

        <!-- Discount Text - Fourth (No background) -->
        <div class="mb-4 order-4">
          <p class="text-green-600 font-medium text-sm">{{ productData.discountText }}</p>
        </div>

        <!-- Customization Card - Fifth -->
        <div class="mb-6 order-5">
          <div class="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <div class="grid grid-cols-4 divide-x divide-gray-200">
              <!-- Size Card -->
              <button 
                @click="openCustomizationModal('size')"
                class="text-center hover:bg-gray-50 transition-all p-3"
              >
                <div class="text-xs text-gray-500 mb-1">Size</div>
                <div class="font-semibold text-xs truncate">{{ selectedSize ? productData.sizes.find(s => s.value === selectedSize)?.label : '-' }}</div>
              </button>

              <!-- Metal Card -->
              <button 
                @click="openCustomizationModal('metal')"
                class="text-center hover:bg-gray-50 transition-all p-3"
              >
                <div class="text-xs text-gray-500 mb-1">Metal</div>
                <div class="font-semibold text-xs truncate">{{ selectedMetal ? selectedMetal.split(' ')[0] : '-' }}</div>
              </button>

              <!-- Diamond Card -->
              <button 
                @click="openCustomizationModal('diamond')"
                class="text-center hover:bg-gray-50 transition-all p-3"
              >
                <div class="text-xs text-gray-500 mb-1">Diamond</div>
                <div class="font-semibold text-xs truncate">{{ selectedDiamond ? selectedDiamond.split(' ')[0] : '-' }}</div>
              </button>

              <!-- Customize Button -->
              <button 
                @click="openCustomizationModal('all')"
                class="text-center bg-yellow-400 hover:bg-yellow-500 transition-all p-3"
              >
                <div class="text-xs text-gray-800 font-semibold">CUSTOMISE</div>
              </button>
            </div>
          </div>
        </div>

        <!-- Action Buttons - Desktop -->
        <div v-if="selectedSize && isSelectedSizeAvailable" class="hidden lg:grid grid-cols-1 gap-4 mb-8 order-6">
          <button 
            @click="openProductTypeModal"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            {{ productData.buttons?.addToBag || 'Add to Bag' }}
          </button>
        </div>

        <!-- Enquiry Button for Unavailable Sizes - Desktop -->
        <div v-else-if="selectedSize && !isSelectedSizeAvailable" class="hidden lg:block mb-8 order-6">
          <button 
            @click="openEnquiryForm"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            {{ productData.buttons?.enquireNow || 'Enquire About This Size' }}
          </button>
        </div>

        <!-- No Size Selected Message - Desktop -->
        <div v-else class="hidden lg:block mb-8 order-6">
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

    <!-- Fixed Bottom Button - Mobile/Tablet Only -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
      <button 
        v-if="selectedSize && isSelectedSizeAvailable"
        @click="openProductTypeModal"
        class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg"
      >
        {{ productData.buttons?.addToBag || 'Add to Bag' }}
      </button>
      <button 
        v-else-if="selectedSize && !isSelectedSizeAvailable"
        @click="openEnquiryForm"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg"
      >
        {{ productData.buttons?.enquireNow || 'Enquire About This Size' }}
      </button>
      <div v-else class="w-full bg-gray-100 text-gray-500 font-semibold py-3 px-6 rounded-lg text-center">
        Select a Size to Continue
      </div>
    </div>

    <!-- Customization Modal -->
    <div 
      v-if="showCustomizationModal" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end items-end lg:items-stretch"
      @click.self="closeCustomizationModal"
    >
      <!-- Desktop: Right side panel (Half width) -->
      <div class="hidden lg:block lg:w-1/2 bg-white h-full shadow-2xl animate-slide-in-right overflow-y-auto">
        <div class="p-6 relative">
          <!-- Close button -->
          <button 
            @click="closeCustomizationModal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Price Header -->
          <div class="text-center mb-6 pt-8 bg-green-50 -mx-6 px-6 pb-4">
            <p class="text-xs text-gray-600 mb-1">Estimated price</p>
            <div class="flex items-center justify-center gap-2">
              <span class="text-2xl font-bold text-gray-900">₹{{ productData.price.toLocaleString() }}</span>
              <span v-if="productData.originalPrice" class="text-lg text-gray-400 line-through">
                ₹{{ productData.originalPrice.toLocaleString() }}
              </span>
            </div>
          </div>

          <!-- Choice of Metal -->
          <div class="mb-6">
            <h3 class="text-sm font-semibold mb-3">Choice of Metal</h3>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="metal in productData.metals"
                :key="metal.name"
                @click="selectMetal(metal)"
                :class="[
                  'p-3 border-2 rounded-lg text-center transition-all',
                  selectedMetal === metal.name
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="font-medium text-xs">{{ metal.name }}</div>
                <div class="text-xs text-green-600 mt-1">In Stock!</div>
              </button>
            </div>
          </div>

          <!-- Diamond Quality -->
          <div class="mb-6">
            <div class="flex justify-between items-center mb-3">
              <h3 class="text-sm font-semibold">Diamond Quality</h3>
              <a href="#" class="text-xs text-green-600 hover:underline">DIAMOND GUIDE</a>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="diamond in productData.diamonds"
                :key="diamond.value"
                @click="selectDiamond(diamond)"
                :class="[
                  'p-3 border-2 rounded-lg text-center transition-all',
                  selectedDiamond === diamond.value
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="font-medium text-xs">{{ diamond.label }}</div>
                <div class="text-xs text-green-600 mt-1">In Stock!</div>
              </button>
            </div>
          </div>

          <!-- Select Size -->
          <div class="mb-6">
            <div class="flex justify-between items-center mb-3">
              <h3 class="text-sm font-semibold">Select Size</h3>
              <a href="#" class="text-xs text-green-600 hover:underline">SIZE GUIDE</a>
            </div>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="size in productData.sizes"
                :key="size.value"
                @click="handleSizeClick(size)"
                :class="[
                  'p-2 border-2 rounded-lg transition-all text-center',
                  selectedSize === size.value
                    ? size.available
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : size.available
                      ? 'border-gray-200 hover:border-gray-300'
                      : 'border-gray-200 bg-gray-100'
                ]"
              >
                <div class="font-semibold text-xs">{{ size.label }}</div>
                <div class="text-xs text-gray-500 mt-1">{{ size.value.split('(')[1]?.replace(')', '') }}</div>
                <div v-if="size.available" class="text-xs text-green-600 mt-1">Stock</div>
                <div v-else class="text-xs text-gray-500 mt-1">Order</div>
              </button>
            </div>
          </div>

          <!-- Confirm Button -->
          <button
            @click="confirmCustomization"
            class="w-full py-3 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            CONFIRM CUSTOMISATION
          </button>
        </div>
      </div>

      <!-- Mobile: Bottom sheet (60% height with close button visible) -->
      <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl h-[60vh] animate-slide-up overflow-y-auto">
        <div class="p-4 pb-6">
          <!-- Handle bar -->
          <div class="flex justify-center mb-3" @click="closeCustomizationModal">
            <div class="w-12 h-1 bg-gray-300 rounded-full cursor-pointer"></div>
          </div>
          
          <!-- Price Header -->
          <div class="text-center mb-4 bg-green-50 -mx-4 px-4 py-3">
            <p class="text-xs text-gray-600 mb-1">Estimated price</p>
            <div class="flex items-center justify-center gap-2">
              <span class="text-xl font-bold text-gray-900">₹{{ productData.price.toLocaleString() }}</span>
              <span v-if="productData.originalPrice" class="text-base text-gray-400 line-through">
                ₹{{ productData.originalPrice.toLocaleString() }}
              </span>
            </div>
          </div>

          <!-- Choice of Metal -->
          <div class="mb-4">
            <h3 class="text-sm font-semibold mb-2">Choice of Metal</h3>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="metal in productData.metals"
                :key="metal.name"
                @click="selectMetal(metal)"
                :class="[
                  'p-2 border-2 rounded-lg text-center transition-all',
                  selectedMetal === metal.name
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="font-medium text-xs">{{ metal.name }}</div>
                <div class="text-xs text-green-600 mt-1">In Stock!</div>
              </button>
            </div>
          </div>

          <!-- Diamond Quality -->
          <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-sm font-semibold">Diamond Quality</h3>
              <a href="#" class="text-xs text-green-600 hover:underline">GUIDE</a>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="diamond in productData.diamonds"
                :key="diamond.value"
                @click="selectDiamond(diamond)"
                :class="[
                  'p-2 border-2 rounded-lg text-center transition-all',
                  selectedDiamond === diamond.value
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="font-medium text-xs">{{ diamond.label }}</div>
                <div class="text-xs text-green-600 mt-1">In Stock!</div>
              </button>
            </div>
          </div>

          <!-- Select Size -->
          <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-sm font-semibold">Select Size</h3>
              <a href="#" class="text-xs text-green-600 hover:underline">GUIDE</a>
            </div>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="size in productData.sizes"
                :key="size.value"
                @click="handleSizeClick(size)"
                :class="[
                  'p-2 border-2 rounded-lg transition-all text-center',
                  selectedSize === size.value
                    ? size.available
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : size.available
                      ? 'border-gray-200 hover:border-gray-300'
                      : 'border-gray-200 bg-gray-100'
                ]"
              >
                <div class="font-semibold text-xs">{{ size.label }}</div>
                <div class="text-xs text-gray-500 mt-1">{{ size.value.split('(')[1]?.replace(')', '') }}</div>
                <div v-if="size.available" class="text-xs text-green-600">Stock</div>
                <div v-else class="text-xs text-gray-500">Order</div>
              </button>
            </div>
          </div>

          <!-- Confirm Button -->
          <button
            @click="confirmCustomization"
            class="w-full py-3 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            CONFIRM CUSTOMISATION
          </button>
        </div>
      </div>
    </div>

    <!-- Product Type Selection Modal -->
    <div v-if="showProductTypeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
                <p class="text-lg font-bold text-green-600">₹{{ productData.price.toLocaleString() }}</p>
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
    <div v-if="showBuyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
import { ref, computed } from 'vue'
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
const showCustomizationModal = ref(false)
const currentCustomizationTab = ref('all')

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
const openCustomizationModal = (tab) => {
  currentCustomizationTab.value = tab
  showCustomizationModal.value = true
}

const closeCustomizationModal = () => {
  showCustomizationModal.value = false
}

const confirmCustomization = () => {
  closeCustomizationModal()
}

const handleSizeClick = (size) => {
  selectedSize.value = size.value
  
  if (!size.available) {
    enquirySize.value = size.label
  }
}

const openProductTypeModal = () => {
  if (selectedSize.value && isSelectedSizeAvailable.value) {
    showProductTypeModal.value = true
    selectedProductTypes.value = []
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
    showBuyModal.value = true
  } else if (hasEnquiryOnly) {
    openEnquiryForm()
  } else {
    addToBag()
  }
}

const openEnquiryForm = () => {
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

/* Animations for modals */
@keyframes slide-in-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.animate-slide-in-right {
  animation: slide-in-right 0.3s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}

/* Hide scrollbar for mobile image gallery */
@media (max-width: 1024px) {
  .overflow-x-auto::-webkit-scrollbar {
    display: none;
  }
  .overflow-x-auto {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

/* Snap scroll for mobile images */
.snap-x {
  scroll-snap-type: x mandatory;
}

.snap-center {
  scroll-snap-align: center;
}
</style>