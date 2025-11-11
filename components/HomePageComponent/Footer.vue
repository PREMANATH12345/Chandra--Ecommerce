<template>
  <footer class="bg-gray-50 text-text-dark-emerald px-6 py-10 lg:px-20">
    <!-- Desktop & Tablet Layout -->
    <div class="hidden md:grid md:grid-cols-5 gap-8">
      <!-- Know Your Jewellery Column -->
      <div>
        <h3 class="font-semibold text-lg mb-4 text-purple-petal border-b border-purple-petal pb-2">Know Your Jewellery</h3>
        <ul class="space-y-2">
          <li 
            v-for="(link, i) in knowYourJewellery" 
            :key="i" 
            class="text-gray-700 hover:text-purple-petal cursor-pointer transition-colors duration-200 text-sm"
          >
            {{ link }}
          </li>
        </ul>
      </div>

      <!-- CaratLane Advantage Column -->
      <div>
        <h3 class="font-semibold text-lg mb-4 text-dark-blue-stem border-b border-dark-blue-stem pb-2">CaratLane Advantage</h3>
        <ul class="space-y-2">
          <li 
            v-for="(link, i) in caratLaneAdvantage" 
            :key="i" 
            class="text-gray-700 hover:text-dark-blue-stem cursor-pointer transition-colors duration-200 text-sm"
          >
            {{ link }}
          </li>
        </ul>
      </div>

      <!-- Customer Service Column -->
      <div>
        <h3 class="font-semibold text-lg mb-4 text-dark-leaf-green border-b border-dark-leaf-green pb-2">Customer Service</h3>
        <ul class="space-y-2">
          <li 
            v-for="(link, i) in customerService" 
            :key="i" 
            class="text-gray-700 hover:text-dark-leaf-green cursor-pointer transition-colors duration-200 text-sm"
          >
            {{ link }}
          </li>
        </ul>
      </div>

      <!-- About Us Column -->
      <div>
        <h3 class="font-semibold text-lg mb-4 text-orange-accent border-b border-orange-accent pb-2">About Us</h3>
        <ul class="space-y-2">
          <li 
            v-for="(link, i) in aboutUs" 
            :key="i" 
            class="text-gray-700 hover:text-orange-accent cursor-pointer transition-colors duration-200 text-sm"
          >
            {{ link }}
          </li>
        </ul>
      </div>

      <!-- Contact Column -->
      <div class="text-sm text-gray-700">
        <h3 class="font-semibold text-lg mb-4 text-light-leaf-green border-b border-light-leaf-green pb-2">Contact Us</h3>
        <div class="mb-4">
          <h4 class="font-semibold text-text-dark-emerald mb-2">CaratLane Trading Pvt Ltd</h4>
          <p class="leading-relaxed text-sm">
            No:722, 1st Floor, TIL Park Anna Salai,<br>
            Pathari Road, Thousand Lights, Chennai,<br>
            Tamil Nadu 600006.
          </p>
        </div>
        
        <div class="mb-4">
          <h4 class="font-semibold text-text-dark-emerald mb-2 text-xs uppercase">24X7 ENQUIRY SUPPORT ( ALL DAYS )</h4>
          <div class="space-y-1 text-sm">
            <p>General : <span class="text-dark-blue-stem">contactus@caratlane.com</span></p>
            <p>Corporate : <span class="text-dark-blue-stem">b2b@caratlane.com</span></p>
            <p>Hr : <span class="text-dark-blue-stem">careers@caratlane.com</span></p>
            <p>Grievance : <span class="text-dark-blue-stem underline cursor-pointer">click here</span></p>
          </div>
        </div>
        
        <div class="mb-4">
          <div class="flex flex-wrap gap-2">
            <button class="bg-purple-petal text-white px-4 py-2 rounded text-sm hover:bg-purple-800 transition-colors font-medium">
              Call Us
            </button>
            <button class="bg-purple-petal text-white px-4 py-2 rounded text-sm hover:bg-purple-800 transition-colors font-medium">
              Chat
            </button>
            <button class="bg-purple-petal text-white px-4 py-2 rounded text-sm hover:bg-purple-800 transition-colors font-medium">
              Whatsapp
            </button>
            <button class="bg-purple-petal text-white px-4 py-2 rounded text-sm hover:bg-purple-800 transition-colors font-medium">
              Email
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Layout (Accordion) -->
    <div class="md:hidden space-y-2">
      <!-- Know Your Jewellery Accordion -->
      <div class="border border-gray-200 rounded-lg">
        <button
          class="w-full flex justify-between items-center text-left p-4"
          @click="toggleAccordion('knowYourJewellery')"
        >
          <span class="font-semibold text-purple-petal">Know Your Jewellery</span>
          <span class="text-purple-petal text-lg font-medium">
            {{ openSections.knowYourJewellery ? '−' : '+' }}
          </span>
        </button>
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-300 ease-in"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-96"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="openSections.knowYourJewellery" class="overflow-hidden">
            <ul class="px-4 pb-4 text-sm text-gray-700 space-y-2">
              <li 
                v-for="(link, i) in knowYourJewellery" 
                :key="i" 
                class="hover:text-purple-petal cursor-pointer py-1 transition-colors duration-200"
              >
                {{ link }}
              </li>
            </ul>
          </div>
        </transition>
      </div>

      <!-- CaratLane Advantage Accordion -->
      <div class="border border-gray-200 rounded-lg">
        <button
          class="w-full flex justify-between items-center text-left p-4"
          @click="toggleAccordion('caratLaneAdvantage')"
        >
          <span class="font-semibold text-dark-blue-stem">CaratLane Advantage</span>
          <span class="text-dark-blue-stem text-lg font-medium">
            {{ openSections.caratLaneAdvantage ? '−' : '+' }}
          </span>
        </button>
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-300 ease-in"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-96"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="openSections.caratLaneAdvantage" class="overflow-hidden">
            <ul class="px-4 pb-4 text-sm text-gray-700 space-y-2">
              <li 
                v-for="(link, i) in caratLaneAdvantage" 
                :key="i" 
                class="hover:text-dark-blue-stem cursor-pointer py-1 transition-colors duration-200"
              >
                {{ link }}
              </li>
            </ul>
          </div>
        </transition>
      </div>

      <!-- Customer Service Accordion -->
      <div class="border border-gray-200 rounded-lg">
        <button
          class="w-full flex justify-between items-center text-left p-4"
          @click="toggleAccordion('customerService')"
        >
          <span class="font-semibold text-dark-leaf-green">Customer Service</span>
          <span class="text-dark-leaf-green text-lg font-medium">
            {{ openSections.customerService ? '−' : '+' }}
          </span>
        </button>
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-300 ease-in"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-96"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="openSections.customerService" class="overflow-hidden">
            <ul class="px-4 pb-4 text-sm text-gray-700 space-y-2">
              <li 
                v-for="(link, i) in customerService" 
                :key="i" 
                class="hover:text-dark-leaf-green cursor-pointer py-1 transition-colors duration-200"
              >
                {{ link }}
              </li>
            </ul>
          </div>
        </transition>
      </div>

      <!-- About Us Accordion -->
      <div class="border border-gray-200 rounded-lg">
        <button
          class="w-full flex justify-between items-center text-left p-4"
          @click="toggleAccordion('aboutUs')"
        >
          <span class="font-semibold text-orange-accent">About Us</span>
          <span class="text-orange-accent text-lg font-medium">
            {{ openSections.aboutUs ? '−' : '+' }}
          </span>
        </button>
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-300 ease-in"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-96"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="openSections.aboutUs" class="overflow-hidden">
            <ul class="px-4 pb-4 text-sm text-gray-700 space-y-2">
              <li 
                v-for="(link, i) in aboutUs" 
                :key="i" 
                class="hover:text-orange-accent cursor-pointer py-1 transition-colors duration-200"
              >
                {{ link }}
              </li>
            </ul>
          </div>
        </transition>
      </div>

      <!-- Contact Us Accordion -->
      <div class="border border-gray-200 rounded-lg">
        <button
          class="w-full flex justify-between items-center text-left p-4"
          @click="toggleAccordion('contactUs')"
        >
          <span class="font-semibold text-light-leaf-green">Contact Us</span>
          <span class="text-light-leaf-green text-lg font-medium">
            {{ openSections.contactUs ? '−' : '+' }}
          </span>
        </button>
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-300 ease-in"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-96"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="openSections.contactUs" class="overflow-hidden">
            <div class="px-4 pb-4 text-sm text-gray-700">
              <div class="mb-4">
                <h4 class="font-semibold text-text-dark-emerald mb-2">CaratLane Trading Pvt Ltd</h4>
                <p class="leading-relaxed">
                  No:722, 1st Floor, TIL Park Anna Salai,<br>
                  Pathari Road, Thousand Lights, Chennai,<br>
                  Tamil Nadu 600006.
                </p>
              </div>
              
              <div class="mb-4">
                <h4 class="font-semibold text-text-dark-emerald mb-2 text-xs uppercase">24X7 ENQUIRY SUPPORT ( ALL DAYS )</h4>
                <div class="space-y-1">
                  <p>General : <span class="text-dark-blue-stem">contactus@caratlane.com</span></p>
                  <p>Corporate : <span class="text-dark-blue-stem">b2b@caratlane.com</span></p>
                  <p>Hr : <span class="text-dark-blue-stem">careers@caratlane.com</span></p>
                  <p>Grievance : <span class="text-dark-blue-stem underline cursor-pointer">click here</span></p>
                </div>
              </div>
              
              <div class="mb-4">
                <div class="flex flex-wrap gap-2">
                  <button class="bg-purple-petal text-white px-4 py-2 rounded text-sm hover:bg-purple-800 transition-colors font-medium">
                    Call Us
                  </button>
                  <button class="bg-purple-petal text-white px-4 py-2 rounded text-sm hover:bg-purple-800 transition-colors font-medium">
                    Chat
                  </button>
                  <button class="bg-purple-petal text-white px-4 py-2 rounded text-sm hover:bg-purple-800 transition-colors font-medium">
                    Whatsapp
                  </button>
                  <button class="bg-purple-petal text-white px-4 py-2 rounded text-sm hover:bg-purple-800 transition-colors font-medium">
                    Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Download App Section -->
    <div class="mt-10 bg-white p-6 rounded-lg border border-gray-200">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="mb-4 md:mb-0">
          <h3 class="font-semibold text-lg text-dark-blue-stem">Download the CaratLane App</h3>
          <p class="text-sm text-gray-600 mt-1">Shop & Save more on app by redeeming xCLusive points</p>
        </div>
        <div class="flex gap-3">
          <button class="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-800 transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.86-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.36 3.51 7.38 9.05 7.09c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.99 1.51.09 2.65.67 3.46 1.64-3.04 1.84-2.32 5.6.48 6.73-.57 1.5-1.31 2.99-2.54 4.03zm-4.91-14.3c.58-.69 1.01-1.65.89-2.58-.86.04-1.88.57-2.49 1.27-.55.62-1.03 1.62-.9 2.57.96.07 1.94-.48 2.5-1.26z"/>
            </svg>
            <div class="text-left">
              <div class="text-xs">Download on the</div>
              <div class="font-semibold">App Store</div>
            </div>
          </button>
          <button class="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-800 transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 6.753l2.385 2.327-2.385 2.326v4.547h4.896l4.395-4.317-4.395-4.317h-4.896v-.066zm0 0V2.5h-1.5v6.067h1.5z"/>
            </svg>
            <div class="text-left">
              <div class="text-xs">GET IT ON</div>
              <div class="font-semibold">Google Play</div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Social Links & Payment Methods -->
    <div class="mt-8 flex flex-col md:flex-row md:items-center md:justify-between">
      <div class="flex flex-col items-center md:items-start gap-3 mb-6 md:mb-0">
        <p class="font-medium text-gray-700">Find Us On</p>
        <div class="flex gap-4 text-dark-blue-stem">
          <i class="fab fa-instagram text-2xl cursor-pointer hover:text-purple-petal transition-colors"></i>
          <i class="fab fa-facebook text-2xl cursor-pointer hover:text-purple-petal transition-colors"></i>
          <i class="fab fa-linkedin text-2xl cursor-pointer hover:text-purple-petal transition-colors"></i>
          <i class="fab fa-pinterest text-2xl cursor-pointer hover:text-purple-petal transition-colors"></i>
          <i class="fab fa-x-twitter text-2xl cursor-pointer hover:text-purple-petal transition-colors"></i>
        </div>
      </div>
      
      <div class="flex flex-col items-center md:items-end gap-3">
        <p class="font-medium text-gray-700">We Accept</p>
        <div class="flex gap-4">
          <div class="bg-white p-3 rounded border border-gray-300">
            <span class="font-bold text-blue-800 text-lg">VISA</span>
          </div>
          <div class="bg-white p-3 rounded border border-gray-300">
            <span class="font-bold text-blue-500 text-lg">PayPal</span>
          </div>
          <div class="bg-white p-3 rounded border border-gray-300">
            <span class="font-bold text-purple-600 text-sm">biznote</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Copyright Notice -->
    <div class="mt-8 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
      <p>© 2023 CaratLane Trading Pvt Ltd. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Data for footer links
const knowYourJewellery = [
  'Diamond guide', 'Jewellery guide', 'Gemstones guide',
  'Gold rate', 'Treasure chest', 'Glossary'
]

const caratLaneAdvantage = [
  '15-day returns', 'Free shipping', 'Postcards',
  'Gold exchange', '#Wearyourwins', 'Gift cards', 'Digital gold'
]

const customerService = ['Return policy', 'Order status']
const aboutUs = ['Our story', 'Press', 'Blog', 'Careers']

// Accordion state management
const openSections = reactive({
  knowYourJewellery: false,
  caratLaneAdvantage: false,
  customerService: false,
  aboutUs: false,
  contactUs: false
})

const toggleAccordion = (section) => {
  openSections[section] = !openSections[section]
}
</script>

<style scoped>
footer {
  background-color: #f8fafc;
}
</style>