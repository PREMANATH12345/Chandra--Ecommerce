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
              <!-- Treasure Icon - use your icon from public folder -->
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
              <!-- Store Icon - use your icon from public folder -->
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
              <!-- Gold Icon - use your icon from public folder -->
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
              <button
                @mouseenter="showEnquiryDropdown = true"
                @mouseleave="showEnquiryDropdown = false"
                class="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              <!-- Enquiry Dropdown -->
              <Transition name="dropdown">
                <div
                  v-if="showEnquiryDropdown"
                  @mouseenter="showEnquiryDropdown = true"
                  @mouseleave="showEnquiryDropdown = false"
                  class="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 p-6"
                >
                  <h3 class="text-lg font-semibold text-gray-800 mb-4">Product Enquiry</h3>
                  <p class="text-sm text-gray-600 mb-4">
                    Have questions about our products? We'd love to help!
                  </p>

                  <form @submit.prevent="submitEnquiry" class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        v-model="enquiryForm.name"
                        type="text"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        v-model="enquiryForm.email"
                        type="email"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        v-model="enquiryForm.phone"
                        type="tel"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Product Size</label>
                      <select
                        v-model="enquiryForm.productSize"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                      >
                        <option value="">Select product size</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="x-large">X-Large</option>
                        <option value="custom">Custom Size</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Your Question</label>
                      <textarea
                        v-model="enquiryForm.question"
                        required
                        rows="3"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                        placeholder="Tell us about your enquiry..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                    >
                      Submit Enquiry
                    </button>
                  </form>
                </div>
              </Transition>
            </div>

            <!-- Delivery & Stores -->
            <div class="relative">
              <button
                @mouseenter="showDeliveryDropdown = true"
                @mouseleave="showDeliveryDropdown = false"
                class="flex items-center gap-1.5 text-xs hover:text-green-600 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div class="text-left">
                  <div class="text-[10px] text-gray-500">Delivery & Stores</div>
                  <div class="text-xs font-medium text-green-600">Enter Pincode</div>
                </div>
              </button>

              <!-- Delivery Dropdown -->
              <Transition name="dropdown">
                <div
                  v-if="showDeliveryDropdown"
                  @mouseenter="showDeliveryDropdown = true"
                  @mouseleave="showDeliveryDropdown = false"
                  class="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 p-6"
                >
                  <div class="mb-4 h-24 flex items-center justify-center bg-gradient-to-r from-green-100 to-green-50 rounded-lg overflow-hidden relative">
                    <div class="delivery-van-animation">
                      <svg class="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 7h-8v6h10V9c0-1.1-.9-2-2-2zM3 7c-1.1 0-2 .9-2 2v6h4V7H3zm16 8h-2c0 1.66-1.34 3-3 3s-3-1.34-3-3H9c0 1.66-1.34 3-3 3s-3-1.34-3-3H1v3c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-3z"/>
                      </svg>
                    </div>
                  </div>

                  <h3 class="text-lg font-semibold text-green-700 mb-2">Check Delivery Availability</h3>
                  <p class="text-sm text-gray-600 mb-4">
                    Now with Dash Delivery, get your favorite designs in just a few hours!
                  </p>

                  <div class="relative">
                    <input
                      v-model="pincode"
                      type="text"
                      placeholder="Enter Pincode"
                      maxlength="6"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      @keyup.enter="checkDelivery"
                    />
                    <button
                      @click="checkDelivery"
                      class="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                    >
                      Check
                    </button>
                  </div>
                </div>
              </Transition>
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
            <NuxtLink to="/wishlist" class="p-1.5 hover:bg-gray-100 rounded-full transition-colors relative">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span v-if="wishlistCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                {{ wishlistCount }}
              </span>
            </NuxtLink>

            <!-- Cart Icon -->
            <NuxtLink to="/cart" class="p-1.5 hover:bg-gray-100 rounded-full transition-colors relative">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                {{ cartCount }}
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

            <button
              @click="openPincodeDrawer"
              class="flex items-center gap-1 text-[10px] text-green-600 font-medium"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              Enter Pincode
            </button>
          </div>

          <!-- Right Side Icons -->
          <div class="flex items-center gap-2">
            <!-- Enquiry Icon for Mobile -->
            <button 
              @click="openEnquiryDrawer"
              class="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

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

            <NuxtLink to="/wishlist" class="p-2 hover:bg-gray-100 rounded-lg relative">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span v-if="wishlistCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                {{ wishlistCount }}
              </span>
            </NuxtLink>

            <NuxtLink to="/cart" class="p-2 hover:bg-gray-100 rounded-lg relative">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                {{ cartCount }}
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
      <!-- Existing Pincode Drawer (unchanged) -->
      <Transition name="drawer">
        <div
          v-if="showPincodeDrawer"
          class="fixed inset-0 z-[100] lg:hidden"
          @click.self="closePincodeDrawer"
        >
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closePincodeDrawer"></div>
          
          <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <button
              @click="closePincodeDrawer"
              class="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div class="mb-6 h-32 flex items-center justify-center bg-gradient-to-r from-green-100 to-green-50 rounded-lg overflow-hidden relative">
              <div class="delivery-van-animation">
                <svg class="w-20 h-20 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 7h-8v6h10V9c0-1.1-.9-2-2-2zM3 7c-1.1 0-2 .9-2 2v6h4V7H3zm16 8h-2c0 1.66-1.34 3-3 3s-3-1.34-3-3H9c0 1.66-1.34 3-3 3s-3-1.34-3-3H1v3c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-3z"/>
                </svg>
              </div>
            </div>

            <h3 class="text-xl font-bold text-green-700 mb-3">Check Delivery Availability</h3>
            <p class="text-sm text-gray-600 mb-6">
              Now with Dash Delivery, get your favorite designs in just a few hours!
            </p>

            <div class="relative">
              <input
                v-model="pincode"
                type="text"
                placeholder="Enter Pincode"
                maxlength="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-lg"
                @keyup.enter="checkDelivery"
              />
              <button
                @click="checkDelivery"
                class="mt-4 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Mobile Bottom Drawer for Account - Auto-open on mobile/tablet -->
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

      <!-- Enquiry Form Drawer for Mobile -->
      <Transition name="drawer">
        <div
          v-if="showEnquiryDrawer"
          class="fixed inset-0 z-[100] lg:hidden"
          @click.self="closeEnquiryDrawer"
        >
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeEnquiryDrawer"></div>
          
          <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
            <button
              @click="closeEnquiryDrawer"
              class="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 class="text-2xl font-bold text-gray-800 mb-4">Product Enquiry</h3>
            <p class="text-sm text-gray-600 mb-6">
              Have questions about our products? We'd love to help!
            </p>

            <form @submit.prevent="submitEnquiry" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  v-model="enquiryForm.name"
                  type="text"
                  required
                  class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-base"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  v-model="enquiryForm.email"
                  type="email"
                  required
                  class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-base"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  v-model="enquiryForm.phone"
                  type="tel"
                  required
                  class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-base"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Product Size</label>
                <select
                  v-model="enquiryForm.productSize"
                  required
                  class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-base"
                >
                  <option value="">Select product size</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="x-large">X-Large</option>
                  <option value="custom">Custom Size</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Your Question</label>
                <textarea
                  v-model="enquiryForm.question"
                  required
                  rows="4"
                  class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-base"
                  placeholder="Tell us about your enquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                class="w-full px-4 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-base"
              >
                Submit Enquiry
              </button>
            </form>
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
  // Icon paths from public folder
  treasureIcon: {
    type: String,
    // default: '/icons/treasure.png' // Updated to local paths
  },
  storeIcon: {
    type: String,
    // default: '/icons/store.png'
  },
  goldIcon: {
    type: String,
    // default: '/icons/gold.png'
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
  'enquiry-submit'
]);

// Reactive state
const searchQuery = ref('');
const pincode = ref('');
const showDeliveryDropdown = ref(false);
const showAccountDropdown = ref(false);
const showEnquiryDropdown = ref(false);
const showPincodeDrawer = ref(false);
const showAccountDrawer = ref(false);
const showEnquiryDrawer = ref(false);

// Enquiry form data
const enquiryForm = ref({
  name: '',
  email: '',
  phone: '',
  productSize: '',
  question: ''
});

// Check if device is mobile/tablet
const checkIfMobileOrTablet = () => {
  return window.innerWidth < 1024; // lg breakpoint
};

// Auto-open account drawer on mobile/tablet on mount
onMounted(() => {
  if (checkIfMobileOrTablet()) {
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
  if (checkIfMobileOrTablet() && !showAccountDrawer.value) {
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
};

const openEnquiryDrawer = () => {
  showEnquiryDrawer.value = true;
};

const closeEnquiryDrawer = () => {
  showEnquiryDrawer.value = false;
};

const submitEnquiry = () => {
  // Validate form
  if (!enquiryForm.value.name || !enquiryForm.value.email || !enquiryForm.value.phone || !enquiryForm.value.productSize || !enquiryForm.value.question) {
    alert('Please fill in all fields');
    return;
  }

  // Emit the enquiry data to parent component
  emit('enquiry-submit', enquiryForm.value);
  
  // Reset form
  enquiryForm.value = {
    name: '',
    email: '',
    phone: '',
    productSize: '',
    question: ''
  };
  
  // Close dropdown/drawer
  showEnquiryDropdown.value = false;
  showEnquiryDrawer.value = false;
  
  // Show success message (you can replace this with a toast notification)
  alert('Thank you for your enquiry! We will get back to you soon.');
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