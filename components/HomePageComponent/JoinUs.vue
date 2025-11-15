<template>
  <section class="min-h-fit bg-emerald-50 flex items-center justify-center py-8 px-4">
    <div class="w-full max-w-8xl mx-auto">
      <div class="bg-gradient-to-b from-emerald-600 via-emerald-200 to-emerald-50 rounded-2xl shadow-lg p-8 border border-emerald-200">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <!-- Left Section -->
          <div class="flex items-center gap-6 flex-1">
            <img src="/purple-gift-icon.png" alt="Gift Icon" class="w-16 h-16 sm:w-20 sm:h-20" />
            
            <div class="text-center lg:text-left">
              <h2 class="text-2xl font-bold text-emerald-900 mb-2">
                Join CaratLane Insider
              </h2>
              <p class="text-lg text-emerald-700/80 leading-relaxed">
                To discover enticing deals, latest arrivals, & more
              </p>
            </div>
          </div>

          <!-- Right Section - Form -->
          <div class="flex-1 w-full max-w-md">
            <form @submit.prevent="handleSubmit" class="space-y-4">
              
              <!-- Email Input -->
              <div>
                <input
                  v-model="email"
                  type="email"
                  placeholder="Enter Email"
                  required
                  :class="[
                    'w-full px-4 py-3 rounded-xl bg-emerald-50 text-emerald-900 placeholder-emerald-500 border text-base focus:outline-none transition-all duration-200 shadow-sm',
                    emailError ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-emerald-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100'
                  ]"
                />
                <p v-if="emailError" class="text-red-500 text-sm mt-2 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  {{ emailError }}
                </p>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="w-full px-4 py-3 bg-emerald-600 text-white text-base font-semibold rounded-xl hover:bg-emerald-500 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50 shadow-md hover:shadow-emerald-200"
              >
                Submit
              </button>

              <!-- Gender Selection -->
              <div class="flex justify-between gap-4 w-full">
                <label class="flex items-center gap-3 cursor-pointer group flex-1">
                  <input
                    v-model="gender"
                    type="radio"
                    value="female"
                    class="w-5 h-5 text-emerald-500 bg-emerald-50 border-2 border-emerald-300 rounded-full focus:ring-2 focus:ring-emerald-200 transition-all duration-200 hover:border-emerald-400"
                  />
                  <span class="text-emerald-800 text-base group-hover:text-emerald-600 transition-colors duration-200">Female</span>
                </label>
                
                <label class="flex items-center gap-3 cursor-pointer group flex-1">
                  <input
                    v-model="gender"
                    type="radio"
                    value="male"
                    class="w-5 h-5 text-emerald-500 bg-emerald-50 border-2 border-emerald-300 rounded-full focus:ring-2 focus:ring-emerald-200 transition-all duration-200 hover:border-emerald-400"
                  />
                  <span class="text-emerald-800 text-base group-hover:text-emerald-600 transition-colors duration-200">Male</span>
                </label>
                
                <label class="flex items-center gap-3 cursor-pointer group flex-1">
                  <input
                    v-model="gender"
                    type="radio"
                    value="other"
                    class="w-5 h-5 text-emerald-500 bg-emerald-50 border-2 border-emerald-300 rounded-full focus:ring-2 focus:ring-emerald-200 transition-all duration-200 hover:border-emerald-400"
                  />
                  <span class="text-emerald-800 text-base group-hover:text-emerald-600 transition-colors duration-200">Other</span>
                </label>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const gender = ref('')

const emailError = computed(() => {
  if (!email.value) return ''
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value) ? '' : 'Please enter a valid email address'
})

const handleSubmit = () => {
  if (emailError.value) return
  

  
  // Reset form
  email.value = ''
  gender.value = ''
}
</script>

<style scoped>
/* Custom radio button styling */
input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  border-radius: 50%;
  position: relative;
}

input[type="radio"]:checked {
  border-color: #70c0c0;
  background: rgba(255, 0, 0, 0.1);
}

input[type="radio"]:checked::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10B981;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Custom placeholder color */
::placeholder {
  color: rgba(0, 0, 0, 0.6);
}
</style>