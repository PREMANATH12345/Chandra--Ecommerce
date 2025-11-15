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
      
    <div class="flex flex-wrap gap-4 items-center">

      <!-- GPay -->
      <div class="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-200 
                  w-full sm:w-auto sm:flex-1 md:flex-none justify-center">
        <svg class="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M21.35 11.1H12v2.9h5.3c-.25 1.45-1.52 4.25-5.3 4.25a5.75 5.75 0 1 1 4.06-9.8l2.05-2.04A8.64 8.64 0 0 0 11.99 4a8.99 8.99 0 1 0 0 18c5.18 0 8.65-3.64 8.65-9.25c0-.62-.07-1.1-.29-1.65z"/>
        </svg>
        <span class="font-semibold text-gray-700 text-base sm:text-lg">Pay</span>
      </div>

      <!-- PhonePe -->
      <div class="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-md border border-gray-200 
                  w-full sm:w-auto sm:flex-1 md:flex-none justify-center">
        <svg class="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#5F259F"></circle>
          <text x="8" y="16" font-size="10" fill="white" font-family="sans-serif">पे</text>
        </svg>
        <span class="font-semibold text-purple-700 text-base sm:text-xl">PhonePe</span>
      </div>

      <!-- Apple Pay -->
      <div class="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-200
                  w-full sm:w-auto sm:flex-1 md:flex-none justify-center">
        <svg class="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24">
          <path fill="black" d="M16.68 12.59c.01 2.29 2.04 3.05 2.06 3.06-.02.07-.32 1.12-1.06 2.22-.64.94-1.31 1.88-2.36 1.9-1.03.02-1.36-.62-2.54-.62-1.17 0-1.54.6-2.52.64-1.01.04-1.78-1.02-2.43-1.96-1.32-1.91-2.33-5.41-.97-7.76.67-1.16 1.86-1.9 3.14-1.92 1-.02 1.94.66 2.54.66.59 0 1.74-.82 2.94-.7.5.02 1.91.2 2.81 1.52-.07.04-1.68.98-1.67 2.96z"/>
          <path fill="black" d="M14.52 5.37c.55-.67.92-1.61.82-2.54-.79.03-1.76.53-2.33 1.2-.51.58-.95 1.53-.83 2.43.87.07 1.78-.45 2.34-1.09z"/>
        </svg>
        <span class="font-bold text-black text-base sm:text-lg">Pay</span>
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