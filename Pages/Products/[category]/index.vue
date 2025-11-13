<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Topbar -->
    <TopBar 
      :class="[
        'transition-transform duration-300',
        showHeader ? 'translate-y-0' : '-translate-y-full'
      ]"
      @search="handleSearch"
      @quick-action="handleQuickAction"
      @check-delivery="handleCheckDelivery"
      @login="handleLogin"
      @signup="handleSignup"
    />

    <!-- Navbar -->
    <NavBar 
      :class="[
        'transition-transform duration-300',
        showHeader ? 'translate-y-0' : '-translate-y-full'
      ]"
    />

    <!-- Breadcrumb & Title Section -->
    <div class="bg-gradient-to-b from-green-50 to-white border-b border-gray-200 pt-32 lg:pt-36 relative z-10">
      <div class="container mx-auto px-4 py-3 md:py-4">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-600 mb-1.5 md:mb-2">
          <NuxtLink to="/" class="hover:text-green-600">Home</NuxtLink>
          <svg class="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span>Jewellery</span>
          <svg class="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <!-- <span class="text-gray-900 font-medium">{{ selectedCategory }}</span> -->
          <span class="text-gray-900 font-medium">{{ displayTitle }}</span>

        </div>

        <!-- Title -->
        <!-- <h1 class="text-base md:text-lg lg:text-xl font-bold text-gray-900">
          {{ selectedCategory }} 
          <span class="text-xs md:text-sm lg:text-base text-gray-600 font-normal">{{ filteredProducts.length }} Designs</span>
        </h1> -->
        <h1 class="text-base md:text-lg lg:text-xl font-bold text-gray-900">
        {{ displayTitle }} 
        <span class="text-xs md:text-sm lg:text-base text-gray-600 font-normal">
          {{ filteredProducts.length }} Designs
        </span>
      </h1>
      </div>
    </div>

    <!-- Filter Pills - Sticky -->
    <div class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex items-center gap-2 md:gap-3 py-3 md:py-4 overflow-x-auto scrollbar-hide">
          <button 
            v-for="pill in filterPills" 
            :key="pill.id"
            @click="selectFilterPill(pill.id)"
            :class="[
              'px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all flex-shrink-0',
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
    <div class="container mx-auto px-4 py-4 md:py-6">
      <div class="flex gap-4 md:gap-6">
        <!-- Sidebar Filters (Desktop/Tablet) - Sticky -->
        <div class="hidden lg:block lg:w-64 flex-shrink-0">
          <div class="sticky top-32">
           <ProductFilter 
            :showMobileFilters="showMobileFilters"
            :products="products"
            @close="showMobileFilters = false"
            @filters-changed="handleFiltersChanged"
          />
          </div>
        </div>

        <!-- Product Grid -->
        <div class="flex-1">
          <!-- Active Filters & Sort -->
          <div class="flex items-center justify-between mb-4 md:mb-6 flex-wrap gap-3 md:gap-4">
            <!-- Active Filter Tags -->
            <div class="flex items-center gap-2 flex-wrap">
              <span 
                v-if="activeFilters.length > 0"
                class="text-xs md:text-sm font-medium text-gray-700"
              >
                Filters:
              </span>
              <span 
                v-for="filter in activeFilters" 
                :key="filter"
                class="px-2 py-1 md:px-3 bg-gray-200 rounded-full text-xs md:text-sm flex items-center gap-2"
              >
                {{ filter }}
                <button @click="removeFilter(filter)" class="hover:text-red-600">
                  <svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            </div>

            <!-- Sort Dropdown -->
            <div class="relative">
              <button 
                @click="showSortMenu = !showSortMenu"
                class="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <span class="text-xs md:text-sm font-medium">Sort: {{ selectedSort }}</span>
                <svg 
                  class="w-3 h-3 md:w-4 md:h-4 transition-transform"
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
                  class="absolute right-0 top-full mt-2 w-48 md:w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                >
                  <button 
                    v-for="option in sortOptions" 
                    :key="option"
                    @click="selectSort(option)"
                    :class="[
                      'w-full px-3 py-2 md:px-4 text-left text-xs md:text-sm hover:bg-gray-50 transition-colors',
                      selectedSort === option ? 'text-purple-600 font-medium bg-purple-50' : 'text-gray-700'
                    ]"
                  >
                    {{ option }}
                  </button>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Products Grid with Banners -->
          <div class="space-y-4 md:space-y-6">
            <!-- Desktop View: 5 columns -->
            <div class="hidden lg:grid lg:grid-cols-5 gap-4">
              <template v-for="(item, index) in desktopLayoutItems" :key="`desktop-${index}`">
                <ProductCard 
                  v-if="item.type === 'product'"
                  :product="item.data"
                  @try-at-home="handleTryAtHome"
                  @video-call="handleVideoCall"
                  @toggle-wishlist="handleToggleWishlist"
                  @click="navigateToProduct(item.data)"
                  class="cursor-pointer"
                />
                
                <DecorativeBanner 
                  v-else-if="item.type === 'banner'"
                  :class="'col-span-2'"
                  :bannerData="bannerData"
                  :categories="categoryFilterData"
                  @category-selected="handleCategorySelected"
                />
              </template>
            </div>

            <!-- Tablet View: 3 columns -->
            <div class="hidden md:grid lg:hidden md:grid-cols-3 gap-4">
              <template v-for="(item, index) in tabletLayoutItems" :key="`tablet-${index}`">
                <ProductCard 
                  v-if="item.type === 'product'"
                  :product="item.data"
                  @try-at-home="handleTryAtHome"
                  @video-call="handleVideoCall"
                  @toggle-wishlist="handleToggleWishlist"
                  @click="navigateToProduct(item.data)"
                  class="cursor-pointer"
                />
                
                <DecorativeBanner 
                  v-else-if="item.type === 'banner'"
                  :class="'col-span-2'"
                  :bannerData="bannerData"
                  :categories="categoryFilterData"
                  @category-selected="handleCategorySelected"
                />
              </template>
            </div>

            <!-- Mobile View: 2 columns -->
            <div class="grid md:hidden grid-cols-2 gap-3">
              <template v-for="(item, index) in mobileLayoutItems" :key="`mobile-${index}`">
                <ProductCard 
                  v-if="item.type === 'product'"
                  :product="item.data"
                  @try-at-home="handleTryAtHome"
                  @video-call="handleVideoCall"
                  @toggle-wishlist="handleToggleWishlist"
                  @click="navigateToProduct(item.data)"
                  class="cursor-pointer"
                />
                
                <DecorativeBanner 
                  v-else-if="item.type === 'banner'"
                  :class="'col-span-2'"
                  :bannerData="bannerData"
                  :categories="categoryFilterData"
                  @category-selected="handleCategorySelected"
                />
              </template>
            </div>
          </div>

          <!-- Loading Indicator -->
          <div v-if="isLoading" class="flex justify-center items-center py-8 md:py-12">
            <div class="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-green-600"></div>
          </div>

          <!-- Load More Trigger -->
          <div ref="loadMoreTrigger" class="h-20"></div>
        </div>
      </div>
    </div>

    <!-- Mobile Filter/Sort Buttons -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 md:p-4 z-50 flex gap-2 md:gap-3">
      <button
        @click="showMobileFilters = true"
        class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium text-xs md:text-sm"
      >
        <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span>FILTER</span>
        <span v-if="activeFilters.length > 0" class="bg-purple-600 text-white px-2 py-0.5 rounded-full text-xs">
          {{ activeFilters.length }}
        </span>
      </button>
      
      <button
        @click="showSortMenu = !showSortMenu"
        class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium text-xs md:text-sm"
      >
        <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        </svg>
        <span>SORT</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '~/components/ProductCardComponent/ProductCard.vue';
import ProductFilter from '~/components/ProductCardComponent/ProductFilter.vue';
import DecorativeBanner from '~/components/ProductCardComponent/DecorativeBanner.vue';
import TopBar from '~/components/HomePageComponent/topbar.vue';
import NavBar from '~/components/HomePageComponent/navbar.vue';

// Import data
const productData = await import('~/data/productlisting.json').then(m => m.default || m);
const navbarData = await import('~/data/navbar.json').then(m => m.default || m);

const route = useRoute();
const router = useRouter();

// IMPORTANT: This function navigates to product detail
const navigateToProduct = (product) => {
  const categorySlug = product.category.toLowerCase().replace(/\s+/g, '-')
  router.push(`/products/${categorySlug}/${product.id}`)
}

// State
const selectedCategory = ref('Rings');
// const products = ref(productData);
const products = ref(
  productData.map(p => {
    const hasImages = p.images && p.images.length > 0;
    const fallback = p.fallbackImages || ['/products/default-fallback.jpg'];

    return {
      ...p,
      images: hasImages ? p.images : fallback,
      thumbnails: hasImages ? p.images : fallback
    };
  })
);

const isLoading = ref(false);
const showMobileFilters = ref(false);
const showSortMenu = ref(false);
const selectedPill = ref('all');
const selectedSort = ref('Featured');
const activeFilters = ref([]);
const loadMoreTrigger = ref(null);
const showHeader = ref(true);
const lastScrollY = ref(0);

// New state for infinite scroll
const displayedProductCount = ref(25);
const itemsPerRow = ref(5);
const rowsPerLoad = ref(5);

// Filter Pills
const filterPills = ref([
  { id: 'all', label: 'All' },
  { id: 'fast-delivery', label: 'Fast Delivery' },
  { id: 'new-arrivals', label: 'New In' },
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
const categoryFilterData = computed(() => {
  return navbarData.map((item, index) => ({
    id: index + 1,
    name: item.title,
    image: item.images[0] || '/products/fallbackimage.jpg'
  }));
});

// Filtered Products based on category and pills
// const filteredProducts = computed(() => {
//   let filtered = products.value.filter(product => 
//     product.category === selectedCategory.value
//   );
  
//   if (selectedPill.value !== 'all') {
//     switch(selectedPill.value) {
//       case 'fast-delivery':
//         filtered = filtered.filter(p => p.fastDelivery === true);
//         break;
//       case 'new-arrivals':
//         filtered = filtered.filter(p => p.isNew === true);
//         break;
//       case 'store-pickup':
//         filtered = filtered.filter(p => p.storePickup === true);
//         break;
//       case 'try-home':
//         filtered = filtered.filter(p => p.tryAtHome === true);
//         break;
//     }
//   }
  
//   return filtered;
// });

const filteredProducts = computed(() => {
  let filtered = products.value;
  
  // Apply product type filters FIRST (from sidebar)
  if (activeFilters.value.some(f => f.startsWith('Type:'))) {
    const typeFilters = activeFilters.value
      .filter(f => f.startsWith('Type:'))
      .map(f => f.split(': ')[1]); // Get category name
    
    filtered = filtered.filter(product => {
      return typeFilters.some(categoryName => {
        // Match exact category or handle special cases
        return product.category === categoryName || 
          (categoryName === 'Necklaces & Pendants' && (product.category === 'Necklaces' || product.category === 'Pendants')) ||
          (categoryName === 'Necklaces' && product.category === 'Necklaces & Pendants') ||
          (categoryName === 'Bracelets & Bangles' && (product.category === 'Bracelets' || product.category === 'Bangles'));
      });
    });
  } 
  // Only apply category filter if no product type filter is active AND category is set
  else if (selectedCategory.value) {
    filtered = filtered.filter(product => 
      product.category === selectedCategory.value
    );
  }
  
  // Filter by pill selection
  if (selectedPill.value !== 'all') {
    switch(selectedPill.value) {
      case 'fast-delivery':
        filtered = filtered.filter(p => p.fastDelivery === true);
        break;
      case 'new-arrivals':
        filtered = filtered.filter(p => p.isNew === true);
        break;
      case 'store-pickup':
        filtered = filtered.filter(p => p.storePickup === true);
        break;
      case 'try-home':
        filtered = filtered.filter(p => p.tryAtHome === true);
        break;
    }
  }
  
  // Apply price range filters
  if (activeFilters.value.some(f => f.startsWith('Price:'))) {
    const priceFilters = activeFilters.value
      .filter(f => f.startsWith('Price:'))
      .map(f => parseInt(f.split(': ')[1]));
    
    filtered = filtered.filter(product => {
      return priceFilters.some(filterId => {
        switch(filterId) {
          case 1: return product.price >= 10001 && product.price <= 15000;
          case 2: return product.price >= 20001 && product.price <= 30000;
          case 3: return product.price < 5000;
          case 4: return product.price >= 5001 && product.price <= 10000;
          default: return true;
        }
      });
    });
  }
  
  // Apply discount filters
  if (activeFilters.value.some(f => f.startsWith('Discount:'))) {
    const discountFilters = activeFilters.value
      .filter(f => f.startsWith('Discount:'))
      .map(f => parseInt(f.split(': ')[1]));
    
    filtered = filtered.filter(product => {
      return discountFilters.some(filterId => {
        switch(filterId) {
          case 1: return product.discount === 15;
          case 2: return product.discount === 10;
          case 3: return product.discount === 20;
          default: return true;
        }
      });
    });
  }
  
  // Apply sorting
  const sorted = [...filtered];
  switch(selectedSort.value) {
    case 'Latest':
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case 'Discount':
      return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    case 'Price: Low to High':
      return sorted.sort((a, b) => a.price - b.price);
    case 'Price: High to Low':
      return sorted.sort((a, b) => b.price - a.price);
    case 'Customer Rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    default: // Featured
      return sorted.sort((a, b) => {
        if (a.badge === 'BESTSELLER' && b.badge !== 'BESTSELLER') return -1;
        if (a.badge !== 'BESTSELLER' && b.badge === 'BESTSELLER') return 1;
        return 0;
      });
  }
});

// Visible filtered products
const visibleFilteredProducts = computed(() => {
  return filteredProducts.value.slice(0, displayedProductCount.value);
});

// Create layout with banners
const createLayout = (itemsPerRow, bannerAtRow, itemsBeforeBanner) => {
  const layout = [];
  const prods = visibleFilteredProducts.value;
  let productIndex = 0;
  
  const firstBannerPosition = (bannerAtRow - 1) * itemsPerRow + itemsBeforeBanner;
  
  for (let i = 0; i < firstBannerPosition && productIndex < prods.length; i++) {
    layout.push({ type: 'product', data: prods[productIndex++] });
  }
  
  if (productIndex < prods.length) {
    layout.push({ type: 'banner', data: null });
  }
  
  const secondBannerRow = itemsPerRow === 5 ? 12 : 11;
  const secondBannerPosition = (secondBannerRow - 1) * itemsPerRow + itemsBeforeBanner;
  const productsUntilSecondBanner = secondBannerPosition - firstBannerPosition - 1;
  
  for (let i = 0; i < productsUntilSecondBanner && productIndex < prods.length; i++) {
    layout.push({ type: 'product', data: prods[productIndex++] });
  }
  
  if (productIndex < prods.length) {
    layout.push({ type: 'banner', data: null });
  }
  
  while (productIndex < prods.length) {
    layout.push({ type: 'product', data: prods[productIndex++] });
  }
  
  return layout;
};

const desktopLayoutItems = computed(() => createLayout(5, 6, 3));
const tabletLayoutItems = computed(() => createLayout(3, 6, 2));
const mobileLayoutItems = computed(() => createLayout(2, 6, 2));

// Methods
const selectFilterPill = (pillId) => {
  selectedPill.value = pillId;
  displayedProductCount.value = rowsPerLoad.value * itemsPerRow.value;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// const selectSort = (option) => {
//   selectedSort.value = option;
//   showSortMenu.value = false;
// };
const selectSort = (option) => {
  selectedSort.value = option;
  showSortMenu.value = false;
  displayedProductCount.value = rowsPerLoad.value * itemsPerRow.value;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// const handleFiltersChanged = (filters) => {
//   activeFilters.value = [
//     ...filters.priceRanges.map(id => `Price: ${id}`),
//     ...filters.discounts.map(id => `Discount: ${id}`),
//     ...filters.productTypes.map(id => `Type: ${id}`)
//   ];
// };

const handleFiltersChanged = (filters) => {
  activeFilters.value = [
    ...filters.priceRanges.map(id => `Price: ${id}`),
    ...filters.discounts.map(id => `Discount: ${id}`),
    ...filters.productTypes.map(item => `Type: ${item.category}`)
  ];
  displayedProductCount.value = rowsPerLoad.value * itemsPerRow.value;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// const removeFilter = (filter) => {
//   activeFilters.value = activeFilters.value.filter(f => f !== filter);
// };
const removeFilter = (filter) => {
  activeFilters.value = activeFilters.value.filter(f => f !== filter);
  displayedProductCount.value = rowsPerLoad.value * itemsPerRow.value;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};  


// Add this new computed property
const displayTitle = computed(() => {
  // If there's a product type filter, show that category name
  const typeFilter = activeFilters.value.find(f => f.startsWith('Type:'));
  if (typeFilter) {
    return typeFilter.split(': ')[1];
  }
  // Otherwise show the selected category
  return selectedCategory.value;
});

const handleCategorySelected = (category) => {
  selectedCategory.value = category.name;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const loadMoreProducts = () => {
  const totalProducts = filteredProducts.value.length;
  if (displayedProductCount.value < totalProducts) {
    displayedProductCount.value += (rowsPerLoad.value * itemsPerRow.value);
    isLoading.value = false;
  }
};

const setupIntersectionObserver = () => {
  if (!loadMoreTrigger.value) return;
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isLoading.value) {
      if (displayedProductCount.value < filteredProducts.value.length) {
        isLoading.value = true;
        setTimeout(() => {
          loadMoreProducts();
        }, 500);
      }
    }
  }, { threshold: 0.1 });
  
  observer.observe(loadMoreTrigger.value);
  
  return observer;
};

// Event Handlers
const handleSearch = (query) => console.log('Search:', query);
const handleQuickAction = (action) => console.log('Quick Action:', action);
const handleCheckDelivery = (pincode) => console.log('Check Delivery:', pincode);
const handleLogin = () => console.log('Login');
const handleSignup = () => console.log('Signup');
const handleTryAtHome = (product) => console.log('Try at Home:', product);
const handleVideoCall = (product) => console.log('Video Call:', product);
const handleToggleWishlist = (product, added) => console.log('Wishlist:', product, added);

// Watch route params for category changes
watch(() => route.params.category, (newCategory) => {
  if (newCategory) {
    selectedCategory.value = newCategory.charAt(0).toUpperCase() + newCategory.slice(1);
  }
}, { immediate: true });

// Watch category changes to reset pagination
watch(selectedCategory, () => {
  displayedProductCount.value = rowsPerLoad.value * itemsPerRow.value;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Lifecycle
onMounted(() => {
  if (route.params.category) {
    selectedCategory.value = route.params.category.charAt(0).toUpperCase() + route.params.category.slice(1);
  }
  
  const updateItemsPerRow = () => {
    if (window.innerWidth >= 1024) {
      itemsPerRow.value = 5;
    } else if (window.innerWidth >= 768) {
      itemsPerRow.value = 3;
    } else {
      itemsPerRow.value = 2;
    }
    displayedProductCount.value = rowsPerLoad.value * itemsPerRow.value;
  };
  
  updateItemsPerRow();
  window.addEventListener('resize', updateItemsPerRow);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
      showHeader.value = false;
    } else {
      showHeader.value = true;
    }
    
    lastScrollY.value = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll);
  
  const observer = setupIntersectionObserver();
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateItemsPerRow);
    window.removeEventListener('scroll', handleScroll);
    if (observer) observer.disconnect();
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