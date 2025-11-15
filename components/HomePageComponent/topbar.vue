<template>
  <div class="bg-white fixed top-0 left-0 right-0 z-50">
    <!-- Desktop View -->
    <div class="hidden lg:block">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16 gap-4">
          <!-- Left Section: Logo + Search Bar -->
          <div class="flex items-center gap-3 flex-1 max-w-2xl">
            <!-- Logo -->
            <NuxtLink to="/" class="flex-shrink-0">
              <img 
                :src="logoUrl" 
                :alt="siteName" 
                class="h-9 w-auto"
              />
            </NuxtLink>

            <!-- Search Bar -->
            <div class="relative flex-1">
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="searchPlaceholder"
                class="w-full px-3 py-1.5 pr-10 border border-green-400 rounded-lg bg-green-50 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                @keyup.enter="handleSearch"
              />
              <button 
                @click="handleSearch"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-700"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Center Section: Quick Action Cards -->
          <div class="flex items-center gap-2">
            <!-- Treasure Chest Card -->
            <button
              @click="handleQuickAction('treasure')"
              class="px-3 py-1.5 rounded-lg border border-green-500 bg-green-50 hover:bg-green-100 transition-all flex items-center gap-2 text-xs font-medium whitespace-nowrap"
            >
              <img v-if="treasureIcon" :src="treasureIcon" alt="Treasure" class="w-4 h-4" />
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span class="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded font-semibold">NEW</span>
              Treasure Chest
            </button>

            <!-- Stores Card -->
            <button
              @click="handleQuickAction('stores')"
              class="px-3 py-1.5 rounded-lg border border-orange-500 bg-white hover:bg-orange-50 transition-all flex items-center gap-2 text-xs font-medium whitespace-nowrap"
            >
              <img v-if="storeIcon" :src="storeIcon" alt="Store" class="w-4 h-4" />
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Stores
            </button>

            <!-- Gold Card -->
            <button
              @click="handleQuickAction('gold')"
              class="px-3 py-1.5 rounded-lg border border-yellow-500 bg-gradient-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 transition-all flex items-center gap-2 text-xs font-medium whitespace-nowrap"
            >
              <img v-if="goldIcon" :src="goldIcon" alt="Gold" class="w-4 h-4" />
              <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              Gold
            </button>
          </div>

          <!-- Right Section: Icons -->
          <div class="flex items-center gap-3">
            <!-- Enquiry Icon -->
            <div class="relative">
              <NuxtLink
                to="/EnquiryForm"
                class="p-1.5 rounded-full transition-colors"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </NuxtLink>
            </div>

        

            <!-- Account Icon -->
            <div class="relative">
              <button
                @mouseenter="showAccountDropdown = true"
                @mouseleave="showAccountDropdown = false"
                class="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              <!-- Account Dropdown -->
              <Transition name="dropdown">
                <div
                  v-if="showAccountDropdown"
                  @mouseenter="showAccountDropdown = true"
                  @mouseleave="showAccountDropdown = false"
                  class="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-6"
                >
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">Your Account</h3>
                  <p class="text-sm text-gray-600 mb-4">Access account & manage your orders.</p>
                  
                  <div class="flex gap-3">
                    <button
                      @click="handleSignup"
                      class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                    >
                      Sign Up
                    </button>
                    <button
                      @click="handleLogin"
                      class="flex-1 px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium text-sm"
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Wishlist Icon -->
            <NuxtLink to="/" class="p-1.5 hover:bg-gray-100 rounded-full transition-colors relative">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span v-if="wishlistCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                {{ wishlistCount }}
              </span>
            </NuxtLink>

      
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile & Tablet View -->
    <div class="lg:hidden">
      <div class="px-4 py-3">
        <!-- Top Row -->
        <div class="flex items-center justify-between mb-3">
          <!-- Left Side -->
          <div class="flex items-center gap-2">
         <button @click="toggleMobileMenu" class="p-2 hover:bg-gray-100 rounded-lg">
          <svg v-if="mobileMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
         </button>

            <NuxtLink to="/">
              <img :src="logoUrl" :alt="siteName" class="h-7 w-auto" />
            </NuxtLink>

         
          </div>

          <!-- Right Side Icons -->
          <div class="flex items-center gap-2">
            <!-- Enquiry Icon for Mobile -->
            <NuxtLink 
              to="/EnquiryForm"
              class="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </NuxtLink>

            <button 
              @click="openAccountDrawer"
              class="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            <button @click="handleQuickAction('stores')" class="p-2 hover:bg-gray-100 rounded-lg">
              <img v-if="storeIcon" :src="storeIcon" alt="Store" class="w-5 h-5" />
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </button>

            <NuxtLink to="/" class="p-2 hover:bg-gray-100 rounded-lg relative">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span v-if="wishlistCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                {{ wishlistCount }}
              </span>
            </NuxtLink>

         
          </div>
        </div>

        <!-- Search Bar -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="searchPlaceholder"
            class="w-full px-3 py-1.5 pr-10 border border-green-400 rounded-lg bg-green-50 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            @keyup.enter="handleSearch"
          />
          <button 
            @click="handleSearch"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-green-600"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Bottom Drawer for Pincode -->
    <Teleport to="body">
    

      <!-- Mobile Bottom Drawer for Account -->
      <Transition name="drawer">
        <div
          v-if="showAccountDrawer"
          class="fixed inset-0 z-[100] lg:hidden"
          @click.self="closeAccountDrawer"
        >
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeAccountDrawer"></div>
          
          <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6">
            <button
              @click="closeAccountDrawer"
              class="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 class="text-2xl font-bold text-gray-800 mb-3">Your Account</h3>
            <p class="text-sm text-gray-600 mb-6">Access account & manage your orders.</p>
            
            <div class="space-y-3">
              <button
                @click="handleSignup"
                class="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Sign Up
              </button>
              <button
                @click="handleLogin"
                class="w-full px-4 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useMobileMenu } from '~/composables/useMobileMenu';

// Props for customization
const props = defineProps({
  logoUrl: {
    type: String,
    default: '/navbar/logo.png' 
  },
  siteName: {
    type: String,
    default: 'Your Store'
  },
  searchPlaceholder: {
    type: String,
    default: 'Search for products, brands and more'
  },
  wishlistCount: {
    type: Number,
    default: 0
  },
  cartCount: {
    type: Number,
    default: 0
  },
  treasureIcon: {
    type: String,
  },
  storeIcon: {
    type: String,
  },
  goldIcon: {
    type: String,
  }
});


// Mobile menu composable 
const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu();


// Emits for parent component handling
const emit = defineEmits([
  'search',
  'quick-action',
  'check-delivery',
  'login',
  'signup',
  'enquiry-submit',
  'toggle-mobile-menu'
]);

// Reactive state
const searchQuery = ref('');
const pincode = ref('');
const showDeliveryDropdown = ref(false);
const showAccountDropdown = ref(false);
const showPincodeDrawer = ref(false);
const showAccountDrawer = ref(false);
const hasClosedAccountDrawer = ref(false);




// Check if device is mobile/tablet
const checkIfMobileOrTablet = () => {
  return window.innerWidth < 1024; // lg breakpoint
};

// Auto-open account drawer on mobile/tablet on mount
onMounted(() => {
  // Check if user has previously closed the drawer
  const drawerClosed = localStorage.getItem('accountDrawerClosed');
  hasClosedAccountDrawer.value = drawerClosed === 'true';

 if (checkIfMobileOrTablet() && !hasClosedAccountDrawer.value) { 
     setTimeout(() => {
      showAccountDrawer.value = true;
    }, 500);
  }

  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const handleResize = () => {
  if (checkIfMobileOrTablet() && !showAccountDrawer.value && !hasClosedAccountDrawer.value) {
    setTimeout(() => {
      showAccountDrawer.value = true;
    }, 500);
  } else if (!checkIfMobileOrTablet()) {
    showAccountDrawer.value = false;
  }
};

// Methods
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value);
  }
};

const handleQuickAction = (actionId) => {
  emit('quick-action', actionId);
};

const checkDelivery = () => {
  if (pincode.value.length === 6) {
    emit('check-delivery', pincode.value);
    showDeliveryDropdown.value = false;
    showPincodeDrawer.value = false;
  }
};

const handleLogin = () => {
  emit('login');
  showAccountDropdown.value = false;
  showAccountDrawer.value = false;
};

const handleSignup = () => {
  emit('signup');
  showAccountDropdown.value = false;
  showAccountDrawer.value = false;
};

const openPincodeDrawer = () => {
  showPincodeDrawer.value = true;
};

const closePincodeDrawer = () => {
  showPincodeDrawer.value = false;
};

const openAccountDrawer = () => {
  showAccountDrawer.value = true;
};

const closeAccountDrawer = () => {
  showAccountDrawer.value = false;
   hasClosedAccountDrawer.value = true;
   // Save to localStorage so it persists across page refreshes
  localStorage.setItem('accountDrawerClosed', 'true');
};
</script>

<style scoped>
/* Dropdown animations */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Drawer animations */
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

/* Delivery van animation */
.delivery-van-animation {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

/* Custom scrollbar for dropdowns */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
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
</style>