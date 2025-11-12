<template>
  <div>
    <!-- Desktop/Tablet Sidebar -->
    <div class="hidden lg:block sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-4">
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold text-gray-900 flex items-center gap-2">
            FILTERS
            <span v-if="activeFiltersCount > 0" class="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
              {{ activeFiltersCount }}
            </span>
          </h3>
          <button 
            v-if="activeFiltersCount > 0"
            @click="clearAllFilters"
            class="text-sm font-medium text-pink-600 hover:text-pink-700"
          >
            CLEAR ALL
          </button>
        </div>

        <!-- Price Filter -->
        <div class="border-b border-gray-200 pb-6">
          <h4 class="font-semibold text-gray-900 mb-4">Price</h4>
          <div class="space-y-3">
            <label 
              v-for="range in priceRanges" 
              :key="range.id"
              class="flex items-center gap-3 cursor-pointer group"
            >
              <input 
                type="checkbox" 
                :value="range.id"
                v-model="selectedPriceRanges"
                class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span class="text-sm text-gray-700 group-hover:text-gray-900">
                {{ range.label }}
                <span class="text-gray-500">({{ range.count }})</span>
              </span>
            </label>
          </div>
        </div>

        <!-- Discount Filter -->
        <div class="border-b border-gray-200 pb-6">
          <h4 class="font-semibold text-gray-900 mb-4">Discounts</h4>
          <div class="space-y-3">
            <label 
              v-for="discount in discounts" 
              :key="discount.id"
              class="flex items-center gap-3 cursor-pointer group"
            >
              <input 
                type="checkbox" 
                :value="discount.id"
                v-model="selectedDiscounts"
                class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span class="text-sm text-gray-700 group-hover:text-gray-900">
                {{ discount.label }}
                <span class="text-gray-500">({{ discount.count }})</span>
              </span>
            </label>
          </div>
        </div>

        <!-- Product Type Filter -->
        <div class="border-b border-gray-200 pb-6">
          <h4 class="font-semibold text-gray-900 mb-4">Product Type</h4>
          <div class="space-y-3">
            <label 
              v-for="type in productTypes" 
              :key="type.id"
              class="flex items-center gap-3 cursor-pointer group"
            >
              <input 
                type="checkbox" 
                :value="type.id"
                v-model="selectedProductTypes"
                class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span class="text-sm text-gray-700 group-hover:text-gray-900">
                {{ type.label }}
                <span class="text-gray-500">({{ type.count }})</span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Bottom Sheet -->
    <Teleport to="body">
      <Transition name="drawer">
        <div
          v-if="showMobileFilters"
          class="fixed inset-0 z-[100] lg:hidden"
          @click.self="closeMobileFilters"
        >
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeMobileFilters"></div>
          
          <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] flex flex-col">
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-3xl">
              <h3 class="text-xl font-bold text-gray-900">Filters</h3>
              <button
                @click="closeMobileFilters"
                class="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Filter Content -->
            <div class="flex-1 overflow-y-auto p-6 space-y-6">
              <!-- Price Filter -->
              <div>
                <h4 class="font-semibold text-gray-900 mb-4">Price</h4>
                <div class="space-y-3">
                  <label 
                    v-for="range in priceRanges" 
                    :key="range.id"
                    class="flex items-center gap-3 cursor-pointer"
                  >
                    <input 
                      type="checkbox" 
                      :value="range.id"
                      v-model="selectedPriceRanges"
                      class="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span class="text-base text-gray-700">
                      {{ range.label }}
                      <span class="text-gray-500">({{ range.count }})</span>
                    </span>
                  </label>
                </div>
              </div>

              <!-- Discount Filter -->
              <div>
                <h4 class="font-semibold text-gray-900 mb-4">Discounts</h4>
                <div class="space-y-3">
                  <label 
                    v-for="discount in discounts" 
                    :key="discount.id"
                    class="flex items-center gap-3 cursor-pointer"
                  >
                    <input 
                      type="checkbox" 
                      :value="discount.id"
                      v-model="selectedDiscounts"
                      class="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span class="text-base text-gray-700">
                      {{ discount.label }}
                      <span class="text-gray-500">({{ discount.count }})</span>
                    </span>
                  </label>
                </div>
              </div>

              <!-- Product Type Filter -->
              <div>
                <h4 class="font-semibold text-gray-900 mb-4">Product Type</h4>
                <div class="space-y-3">
                  <label 
                    v-for="type in productTypes" 
                    :key="type.id"
                    class="flex items-center gap-3 cursor-pointer"
                  >
                    <input 
                      type="checkbox" 
                      :value="type.id"
                      v-model="selectedProductTypes"
                      class="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span class="text-base text-gray-700">
                      {{ type.label }}
                      <span class="text-gray-500">({{ type.count }})</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="p-6 border-t border-gray-200 flex gap-3 sticky bottom-0 bg-white">
              <button
                @click="clearAllFilters"
                class="flex-1 px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
              >
                Clear All
              </button>
              <button
                @click="applyFilters"
                class="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  showMobileFilters: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'filters-changed']);

// Filter Data
const priceRanges = ref([
  { id: 1, label: '₹10,001 - ₹15,000', count: 236 },
  { id: 2, label: '₹20,001 - ₹30,000', count: 317 },
  { id: 3, label: 'Under ₹5,000', count: 8 },
  { id: 4, label: '₹5,001 - ₹10,000', count: 159 }
]);

const discounts = ref([
  { id: 1, label: 'Flat 15% off on Diamond Prices', count: 615 },
  { id: 2, label: 'Flat 10% off on Diamond Prices', count: 534 },
  { id: 3, label: 'Flat 20% off on Diamond Prices', count: 604 }
]);

const productTypes = ref([
  { id: 1, label: 'Earrings', count: 2859 },
  { id: 2, label: 'Rings', count: 2160 },
  { id: 3, label: 'Necklaces', count: 865 },
  { id: 4, label: 'Pendants', count: 973 }
]);

// Selected Filters
const selectedPriceRanges = ref([]);
const selectedDiscounts = ref([]);
const selectedProductTypes = ref([]);

// Computed
const activeFiltersCount = computed(() => {
  return selectedPriceRanges.value.length + 
         selectedDiscounts.value.length + 
         selectedProductTypes.value.length;
});

// Methods
const clearAllFilters = () => {
  selectedPriceRanges.value = [];
  selectedDiscounts.value = [];
  selectedProductTypes.value = [];
  emitFilters();
};

const applyFilters = () => {
  emitFilters();
  closeMobileFilters();
};

const closeMobileFilters = () => {
  emit('close');
};

const emitFilters = () => {
  emit('filters-changed', {
    priceRanges: selectedPriceRanges.value,
    discounts: selectedDiscounts.value,
    productTypes: selectedProductTypes.value
  });
};

// Watch for filter changes on desktop
watch([selectedPriceRanges, selectedDiscounts, selectedProductTypes], () => {
  emitFilters();
}, { deep: true });
</script>

<style scoped>
/* Scrollbar styling */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
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

/* Drawer animation */
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.3s ease;
}

.drawer-enter-from .absolute.bottom-0,
.drawer-leave-to .absolute.bottom-0 {
  transform: translateY(100%);
}

.drawer-enter-from .absolute.inset-0,
.drawer-leave-to .absolute.inset-0 {
  opacity: 0;
}
</style>