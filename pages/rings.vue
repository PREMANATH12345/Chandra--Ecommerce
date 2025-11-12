<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Topbar (Import your existing component) -->
    <TopBar 
      @search="handleSearch"
      @quick-action="handleQuickAction"
      @check-delivery="handleCheckDelivery"
      @login="handleLogin"
      @signup="handleSignup"
    />

    <!-- Navbar (Import your existing component) -->
    <NavBar />

    <!-- Breadcrumb & Title Section -->
    <div class="bg-gradient-to-b from-green-50 to-white border-b border-gray-200">
      <div class="container mx-auto px-4 py-6">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <NuxtLink to="/" class="hover:text-green-600">Home</NuxtLink>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span>Jewellery</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-gray-900 font-medium">{{ selectedCategory }}</span>
        </div>

        <!-- Title -->
        <h1 class="text-3xl font-bold text-gray-900">
          {{ selectedCategory }} <span class="text-gray-600 font-normal">{{ totalProducts }} Designs</span>
        </h1>
      </div>
    </div>

    <!-- Filter Pills -->
    <div class="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div class="container mx-auto px-4">
        <div class="flex items-center gap-3 py-4 overflow-x-auto scrollbar-hide">
          <button 
            v-for="pill in filterPills" 
            :key="pill.id"
            @click="selectFilterPill(pill.id)"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0',
              selectedPill === pill.id 
                ? 'bg-green-600 text-white' 
                : 'bg-green-50 text-gray-700 hover:bg-green-100 border border-green-200'
            ]"
          >
            {{ pill.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-6">
      <div class="flex gap-6">
        <!-- Sidebar Filters (Desktop/Tablet) -->
        <div class="hidden lg:block lg:w-64 flex-shrink-0">
          <ProductFilter 
            :showMobileFilters="showMobileFilters"
            @close="showMobileFilters = false"
            @filters-changed="handleFiltersChanged"
          />
        </div>

        <!-- Product Grid -->
        <div class="flex-1">
          <!-- Active Filters & Sort -->
          <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
            <!-- Active Filter Tags -->
            <div class="flex items-center gap-2 flex-wrap">
              <span 
                v-if="activeFilters.length > 0"
                class="text-sm font-medium text-gray-700"
              >
                Filters:
              </span>
              <span 
                v-for="filter in activeFilters" 
                :key="filter"
                class="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center gap-2"
              >
                {{ filter }}
                <button @click="removeFilter(filter)" class="hover:text-red-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            </div>

            <!-- Sort Dropdown -->
            <div class="relative">
              <button 
                @click="showSortMenu = !showSortMenu"
                class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <span class="text-sm font-medium">Sort By: {{ selectedSort }}</span>
                <svg 
                  class="w-4 h-4 transition-transform"
                  :class="{ 'rotate-180': showSortMenu }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Sort Dropdown Menu -->
              <Transition name="dropdown">
                <div 
                  v-if="showSortMenu"
                  class="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                >
                  <button 
                    v-for="option in sortOptions" 
                    :key="option"
                    @click="selectSort(option)"
                    :class="[
                      'w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors',
                      selectedSort === option ? 'text-purple-600 font-medium bg-purple-50' : 'text-gray-700'
                    ]"
                  >
                    {{ option }}
                  </button>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Products Grid with Infinite Scroll -->
          <div 
            ref="productsContainer"
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            <!-- Render products with decorative banner at position 10 -->
            <template v-for="(product, index) in displayedProducts" :key="product.id">
              <!-- Show 3 products before banner on desktop, 2 on mobile -->
              <ProductCard 
                v-if="shouldShowProduct(index)"
                :product="product"
                @try-at-home="handleTryAtHome"
                @video-call="handleVideoCall"
                @toggle-wishlist="handleToggleWishlist"
                :class="getProductCardClass(index)"
              />

              <!-- Decorative Banner after 10th product -->
              <DecorativeBanner 
                v-if="shouldShowBanner(index)"
                :class="getBannerClass()"
                :bannerData="bannerData"
                :categories="categoryFilterData"
                @category-selected="handleCategorySelected"
              />
            </template>
          </div>

          <!-- Loading Indicator -->
          <div v-if="isLoading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>

          <!-- Load More Trigger -->
          <div ref="loadMoreTrigger" class="h-20"></div>
        </div>
      </div>
    </div>

    <!-- Mobile Filter Button -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 flex gap-3">
      <button
        @click="showMobileFilters = true"
        class="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span>FILTER</span>
        <span v-if="activeFilters.length > 0" class="bg-purple-600 text-white px-2 py-0.5 rounded-full text-xs">
          {{ activeFilters.length }}
        </span>
      </button>
      
      <button
        @click="showSortMenu = !showSortMenu"
        class="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        </svg>
        <span>SORT</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import ProductCard from '~/components/ProductCardComponent/ProductCard.vue';
import ProductFilter from '~/components/ProductCardComponent/ProductFilter.vue';
import DecorativeBanner from '~/components/ProductCardComponent/DecorativeBanner.vue';
import TopBar from '~/components/HomePageComponent/topbar.vue';
import NavBar from '~/components/HomePageComponent/navbar.vue';

// Import product data
const productData = await import('~/data/productlisting.json').then(m => m.default || m);

// State
const selectedCategory = ref('Rings');
const products = ref(productData);
const displayedProducts = ref([]);
const currentLoadIndex = ref(15);
const isLoading = ref(false);
const showMobileFilters = ref(false);
const showSortMenu = ref(false);
const selectedPill = ref('all');
const selectedSort = ref('Featured');
const activeFilters = ref([]);
const productsContainer = ref(null);
const loadMoreTrigger = ref(null);

// Filter Pills
const filterPills = ref([
  { id: 'all', label: 'All prod' },
  { id: 'fast-delivery', label: 'Fast Delivery' },
  { id: 'new-arrivals', label: 'New In arrivals' },
  { id: 'store-pickup', label: 'Store Pickup' },
  { id: 'try-home', label: 'Try at Home' }
]);

// Sort Options
const sortOptions = ref([
  'Featured',
  'Latest',
  'Discount',
  'Price: Low to High',
  'Price: High to Low',
  'Customer Rating'
]);

// Banner Data
const bannerData = ref({
  image: '/products/DB.jpg',
  title: '100% Natural',
  subtitle: 'The CARATLANE Assurance',
  description: 'Every diamond we use is',
  footer: 'Authentic by nature, exquisite by design!'
});

// Category Filter Data for Mobile
const categoryFilterData = ref([
  { id: 1, name: 'Rings', image: '/images/categories/rings.jpg' },
  { id: 2, name: 'Earrings', image: '/images/categories/earrings.jpg' },
  { id: 3, name: 'Necklaces', image: '/images/categories/necklaces.jpg' },
  { id: 4, name: 'Bracelets', image: '/images/categories/bracelets.jpg' },
  { id: 5, name: 'Bangles', image: '/images/categories/bangles.jpg' }
]);

// Computed
const totalProducts = computed(() => products.value.length);

// Methods
const loadInitialProducts = () => {
  displayedProducts.value = products.value.slice(0, 15);
};

const loadMoreProducts = () => {
  if (isLoading.value || currentLoadIndex.value >= products.value.length) return;
  
  isLoading.value = true;
  
  setTimeout(() => {
    const nextBatch = products.value.slice(
      currentLoadIndex.value,
      currentLoadIndex.value + 10
    );
    displayedProducts.value = [...displayedProducts.value, ...nextBatch];
    currentLoadIndex.value += 10;
    isLoading.value = false;
  }, 500);
};

const shouldShowProduct = (index) => {
  // Desktop: Show 3 products before banner (indices 0-2, 4-13)
  // Mobile: Show 2 products before banner (indices 0-1, 3-12)
  if (index < 3) return true; // Show first 3 products
  if (index === 3) return false; // Skip index 3 for banner
  return true;
};

const shouldShowBanner = (index) => {
  // Show banner after 3rd product (at index 3)
  return index === 3 && displayedProducts.value.length > 3;
};

const getProductCardClass = (index) => {
  // No special classes needed for grid layout
  return '';
};

const getBannerClass = () => {
  // Banner spans appropriately based on screen size
  return 'col-span-2 md:col-span-1 lg:col-span-2';
};

const selectFilterPill = (pillId) => {
  selectedPill.value = pillId;
  // Apply filter logic here
};

const selectSort = (option) => {
  selectedSort.value = option;
  showSortMenu.value = false;
  // Apply sorting logic here
};

const handleFiltersChanged = (filters) => {
  // Update active filters display
  activeFilters.value = [
    ...filters.priceRanges.map(id => `Price: ${id}`),
    ...filters.discounts.map(id => `Discount: ${id}`),
    ...filters.productTypes.map(id => `Type: ${id}`)
  ];
  // Apply filter logic here
};

const removeFilter = (filter) => {
  activeFilters.value = activeFilters.value.filter(f => f !== filter);
};

const handleCategorySelected = (category) => {
  selectedCategory.value = category.name;
  // Filter products by category
};

// Infinite Scroll Observer
const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !isLoading.value) {
        loadMoreProducts();
      }
    },
    { threshold: 0.1 }
  );

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }

  return observer;
};

// Event Handlers
const handleSearch = (query) => {
  console.log('Search:', query);
};

const handleQuickAction = (action) => {
  console.log('Quick Action:', action);
};

const handleCheckDelivery = (pincode) => {
  console.log('Check Delivery:', pincode);
};

const handleLogin = () => {
  console.log('Login');
};

const handleSignup = () => {
  console.log('Signup');
};

const handleTryAtHome = (product) => {
  console.log('Try at Home:', product);
};

const handleVideoCall = (product) => {
  console.log('Video Call:', product);
};

const handleToggleWishlist = (product, added) => {
  console.log('Wishlist:', product, added);
};

// Lifecycle
onMounted(() => {
  loadInitialProducts();
  const observer = setupIntersectionObserver();

  onUnmounted(() => {
    observer.disconnect();
  });
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

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>