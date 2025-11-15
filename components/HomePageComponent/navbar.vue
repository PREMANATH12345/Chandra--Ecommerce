<template>
<nav class="fixed top-16 left-0 w-full bg-gradient-to-b from-green-800 via-green-700 to-green-800 shadow-sm z-[45]">
    <!-- Desktop Navigation -->
    <div class="hidden lg:block">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between">
          <!-- Main Navigation Items -->
          <div class="flex items-center space-x-8">
            <div
              v-for="item in navData" 
              :key="item.title"
              class="relative group"
              @mouseenter="handleMouseEnter(item.title)"
              @mouseleave="handleMouseLeave"
            >
              <NuxtLink 
                :to="`/products/${item.title.toLowerCase()}`"
                class="block py-4 text-sm font-medium text-white hover:text-green-600 transition-colors duration-200"
              >
                {{ item.title }}
                
                <!-- Dropdown Indicator -->
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Mega Dropdown -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div
            v-if="activeDropdown"
            class="absolute left-0 right-0 bg-white shadow-xl z-50"
            @mouseenter="handleDropdownEnter"
            @mouseleave="handleMouseLeave"
          >
            <div class="container mx-auto px-4 py-8">
              <div class="grid grid-cols-6 gap-8">
                <!-- Navigation Columns - Horizontal Layout -->
                <div class="grid grid-cols-4 gap-8 col-span-4">
                  <div 
                    v-for="(items, sectionName) in getActiveItem()?.subSections" 
                    :key="sectionName"
                    class="space-y-4"
                  >
                    <h3 class="font-semibold text-gray-900 text-base mb-4 uppercase tracking-wide">
                      {{ sectionName }}
                    </h3>
                    <ul class="space-y-3">
                      <li 
                        v-for="subItem in items" 
                        :key="subItem"
                        class="group"
                      >
                        <NuxtLink
                          :to="`/products/${getActiveItem()?.title.toLowerCase()}`"
                          class="text-base text-gray-700 hover:text-green-600 transition-colors duration-200 flex items-center group"
                        >
                          <span class="truncate">{{ subItem }}</span>
                          <svg 
                            class="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- Promotional Images - Horizontal Layout -->
                <div class="col-span-2">
                  <div class="grid grid-cols-2 gap-6">
                    <div 
                      v-for="(image, index) in getActiveItem()?.images" 
                      :key="index"
                      class="relative overflow-hidden rounded-lg group cursor-pointer"
                    >
                      <img 
                        :src="image" 
                        :alt="`${getActiveItem()?.title} promotion ${index + 1}`"
                        class="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                        @error="handleImageError"
                      />
                      
                      <!-- Hover effect -->
                      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- For Women | For Men | For Kids Section -->
              <div class="flex items-center space-x-6 mt-8 pt-6">
                <NuxtLink 
                  to="/women" 
                  class="text-base font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  For Women
                </NuxtLink>
                <span class="text-gray-300">|</span>
                <NuxtLink 
                  to="/men" 
                  class="text-base font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  For Men
                </NuxtLink>
                <span class="text-gray-300">|</span>
                <NuxtLink 
                  to="/kids" 
                  class="text-base font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  For Kids
                </NuxtLink>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Mobile & Tablet Navigation -->
    <div class="lg:hidden block">
      <!-- Mobile Sidebar Menu -->
      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-300 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
      >
        <div
          v-if="mobileMenuOpen"
          class="fixed top-0 left-0 h-full w-full bg-green-50 z-[100] overflow-y-auto"
        >
          <!-- Close Button -->
          <div class="sticky top-0 bg-green-50 z-10 p-4 flex justify-between items-center border-b border-green-200">
            <h2 class="text-xl font-semibold text-green-800">Menu</h2>
            <button 
              @click="closeMobileMenu"
              class="p-2 hover:bg-green-100 rounded-full transition-colors"
            >
              <svg class="w-6 h-6 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-4 space-y-6">
            <!-- Section 1: Category Cards -->
            <div>
              <div class="grid grid-cols-2 gap-3">
                <NuxtLink
                  v-for="item in navData"
                  :key="item.title"
                  :to="`/products/${item.title.toLowerCase()}`"
                  @click="closeMobileMenu"
                  class="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 flex items-center space-x-3"
                >
                  <img 
                    :src="item.icon" 
                    :alt="item.title"
                    class="w-12 h-12 object-cover rounded"
                    @error="handleImageError"
                  />
                  <span class="text-sm font-medium text-gray-800 flex-1">{{ item.title }}</span>
                </NuxtLink>
              </div>
              
              <!-- More Jewellery Button -->
              <button 
                class="w-full mt-3 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between"
                @click="navigateToMoreJewellery"
              >
                <span class="text-sm font-medium text-gray-800">More Jewellery</span>
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <!-- Section 2: Decorative Banners -->
            <div>
              <h3 class="text-sm font-semibold text-green-800 mb-3 px-1">Special Offers</h3>
              <div class="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                <img 
                  v-for="(banner, index) in mobileBanners"
                  :key="index"
                  :src="banner"
                  alt="Special offer banner"
                  class="flex-shrink-0 w-72 h-32 object-cover rounded-lg shadow-sm"
                  @error="handleImageError"
                />
              </div>
            </div>

            <!-- Section 3: Best Seller, Trending, Latest -->
            <div>
              <h3 class="text-sm font-semibold text-green-800 mb-3 px-1">Quick Access</h3>
              <div class="grid grid-cols-2 gap-3">
                <div 
                  v-for="(category, index) in quickAccessCategories"
                  :key="index"
                  class="relative rounded-lg overflow-hidden shadow-sm cursor-pointer h-24"
                  @click="navigateToCategory(category.link)"
                >
                  <img 
                    :src="category.image"
                    :alt="category.title"
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <span class="text-white font-semibold text-sm p-3">{{ category.title }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 4: Products & Services -->
            <div>
              <div class="flex items-center justify-center mb-4">
                <div class="flex-1 h-px bg-green-300"></div>
                <h3 class="text-sm font-semibold text-green-800 px-3">Products & Services</h3>
                <div class="flex-1 h-px bg-green-300"></div>
              </div>
              
              <div class="space-y-3">
                <div 
                  v-for="(service, index) in servicesData"
                  :key="index"
                  class="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 flex items-start space-x-3"
                  @click="navigateToService(service.link)"
                >
                  <div class="flex-shrink-0">
                    <div :class="service.iconBg" class="w-10 h-10 rounded-lg flex items-center justify-center">
                      <component :is="service.iconComponent" class="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-sm font-semibold text-gray-800">{{ service.title }}</h4>
                    <p class="text-xs text-gray-600 mt-1">{{ service.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 5: Blogs -->
            <div>
              <div class="flex items-center justify-between mb-3 px-1">
                <h3 class="text-sm font-semibold text-green-800">CaratLane Blogs</h3>
                <button 
                  @click="navigateToBlogs"
                  class="text-xs text-green-600 font-medium flex items-center"
                >
                  View All
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div class="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                <div 
                  v-for="(blog, index) in blogsData"
                  :key="index"
                  class="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
                  @click="navigateToBlog(blog.link)"
                >
                  <img 
                    :src="blog.image"
                    :alt="blog.title"
                    class="w-full h-36 object-cover"
                    @error="handleImageError"
                  />
                  <div class="p-3">
                    <h4 class="text-sm font-semibold text-gray-800 line-clamp-2">{{ blog.title }}</h4>
                    <p class="text-xs text-gray-600 mt-2 line-clamp-2">{{ blog.excerpt }}</p>
                    <span class="text-xs text-green-600 font-medium mt-2 inline-flex items-center">
                      Read more
                      <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Transition>

      <!-- Overlay -->
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="mobileMenuOpen"
          class="fixed inset-0 bg-black bg-opacity-50 z-[90]"
          @click="closeMobileMenu"
        ></div>
      </Transition>
    </div>
  </nav>
</template>

<script setup>
import { h } from 'vue';
import { useMobileMenu } from '~/composables/useMobileMenu';
// Define props
const props = defineProps({
  mobileMenuOpen: {
    type: Boolean,
    default: false
  },
  toggleMobileMenu: {
    type: Function,
    default: () => {}
  },
  closeMobileMenu: {
    type: Function,
    default: () => {}
  }
});


// Import navbar data
const navbarData = await import('~/data/navbar.json').then(m => m.default || m);

const navData = ref(navbarData);
const activeDropdown = ref(null);
const { mobileMenuOpen, closeMobileMenu: closeMenu } = useMobileMenu();
let dropdownTimeout = null;



// Mobile banners
const mobileBanners = ref([
  '/navbar/banner1.jpg',
  '/navbar/banner2.jpg',
  '/navbar/banner3.jpg'
]);

// Quick access categories
const quickAccessCategories = ref([
  { title: 'Best Sellers', image: '/navbar/bestsellers.jpg', link: '/bestsellers' },
  { title: 'Latest', image: '/navbar/latest.jpg', link: '/latest' },
  { title: 'Trending', image: '/navbar/trending.jpg', link: '/trending' },
  { title: 'Special Deals', image: '/navbar/deals.jpg', link: '/deals' }
]);

// Services data with icon components
const servicesData = ref([
  {
    title: 'Treasure Chest',
    description: 'Pay 9 instalments, and get the 10th FREE as a CaratLane Benefit!',
    iconBg: 'bg-purple-500',
    iconComponent: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M21 6h-2V3a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM7 4h10v2H7V4zm10 15H7v-7h10v7zm3-8h-1V9h1v2z' })
    ]),
    link: '/treasure-chest'
  },
  {
    title: 'Stores',
    description: 'Visit the nearest store today to try your favourite jewellery.',
    iconBg: 'bg-red-500',
    iconComponent: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M21.9 8.89l-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24 1.02-.02 2.06.62 2.88.08.11.19.19.28.29V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.94c.09-.09.2-.18.28-.28.64-.82.87-1.87.62-2.89zM18.91 4.99l1.05 4.37c.1.42.01.84-.25 1.17-.14.18-.44.47-.94.47-.61 0-1.14-.49-1.21-1.14L16.98 5l1.93-.01zM13 5h1.96l.54 4.52c.05.39-.07.78-.33 1.07-.22.26-.54.41-.95.41-.67 0-1.22-.59-1.22-1.31V5zM8.49 9.52L9.04 5H11v4.69c0 .72-.55 1.31-1.29 1.31-.34 0-.65-.15-.89-.41-.25-.29-.37-.68-.33-1.07zm-4.45-.16L5.05 5h1.97l-.58 4.86c-.08.65-.6 1.14-1.21 1.14-.49 0-.8-.29-.93-.47-.27-.32-.36-.75-.26-1.17zM5 19v-6.03c.08.01.15.03.23.03.87 0 1.66-.36 2.24-.95.6.6 1.4.95 2.31.95.87 0 1.65-.36 2.23-.93.59.57 1.39.93 2.29.93.84 0 1.64-.35 2.24-.95.58.59 1.37.95 2.24.95.08 0 .15-.02.23-.03V19H5z' })
    ]),
    link: '/stores'
  },
  {
    title: 'Buy Digital Gold',
    description: 'Invest in 24K gold hassle-free with CaratLane\'s Digital Gold.',
    iconBg: 'bg-yellow-600',
    iconComponent: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { d: 'M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z' })
    ]),
    link: '/digital-gold'
  }
]);

// Blogs data
const blogsData = ref([
  {
    title: 'Trending Self-Gift Ideas: CaratLane Jewellery Designs to Pamper Yourself',
    excerpt: 'In a world that\'s constantly on the go, it\'s easy to forget to pause and...',
    image: '/navbar/blog1.jpg',
    link: '/blog/self-gift-ideas'
  },
  {
    title: 'Best Jewellery Pieces for Everyday Wear',
    excerpt: 'Overview for a comprehensive guide to earrings for eventwear. As...',
    image: '/navbar/blog2.jpg',
    link: '/blog/everyday-jewellery'
  }
]);

watch(mobileMenuOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});


// Get active dropdown item
const getActiveItem = () => {
  return navData.value.find(item => item.title === activeDropdown.value);
};

// Handle mouse enter on navigation items
const handleMouseEnter = (title) => {
  if (dropdownTimeout) {
    clearTimeout(dropdownTimeout);
  }
  activeDropdown.value = title;
};

// Handle mouse enter on dropdown itself
const handleDropdownEnter = () => {
  if (dropdownTimeout) {
    clearTimeout(dropdownTimeout);
  }
};

// Handle mouse leave with delay
const handleMouseLeave = () => {
  dropdownTimeout = setTimeout(() => {
    activeDropdown.value = null;
  }, 200);
};

// Mobile menu functions
const openMobileMenu = () => {
  mobileMenuOpen.value = true;
  document.body.style.overflow = 'hidden';
};


// Mobile menu functions
const closeMobileMenu = () => {
  closeMenu();
  document.body.style.overflow = '';
};

// Navigation functions
const navigateToMoreJewellery = () => {
  navigateTo('/products/more-jewellery');
  closeMobileMenu();
};

const navigateToCategory = (link) => {
  navigateTo(link);
  closeMobileMenu();
};

const navigateToService = (link) => {
  navigateTo(link);
  closeMobileMenu();
};

const navigateToBlogs = () => {
  navigateTo('/blogs');
  closeMobileMenu();
};

const navigateToBlog = (link) => {
  navigateTo(link);
  closeMobileMenu();
};

// Handle image loading errors
const handleImageError = (event) => {
  console.warn('Image failed to load:', event.target.src);
  event.target.src = '/navbar/imgs-promo-1.jpg';
};

// Expose openMobileMenu for parent components
defineExpose({
  openMobileMenu
});

// Cleanup on unmount
onUnmounted(() => {
  if (dropdownTimeout) {
    clearTimeout(dropdownTimeout);
  }
  document.body.style.overflow = '';
});
</script>

<style scoped>
/* Custom scrollbar for mobile */
.overflow-y-auto::-webkit-scrollbar,
.scrollbar-hide::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track,
.scrollbar-hide::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb,
.scrollbar-hide::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover,
.scrollbar-hide::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>