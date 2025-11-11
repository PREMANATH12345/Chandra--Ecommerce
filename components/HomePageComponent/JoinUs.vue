<template>
  <section class="min-h-fit bg-white from-black to-emerald-900 flex items-center justify-center py-8 px-4">
    <div class="w-full max-w-6xl mx-auto">
      <div class="bg-gradient-to-b from-gray-900 to-emerald-400 rounded-xl shadow-lg p-8 border border-emerald-600/20">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <!-- Left Section - Icon & Text -->
          <div class="flex items-center gap-6 flex-1">
            <!-- Gift Icon -->
            <div class="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <span class="text-2xl">🎁</span>
            </div>
            
            <!-- Text Content -->
            <div class="text-center lg:text-left">
              <h2 class="text-2xl font-bold text-white mb-2">
                Join CaratLane Insider
              </h2>
              <p class="text-lg text-emerald-100 leading-relaxed">
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
                    'w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-emerald-200 border text-base focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm',
                    emailError ? 'border-red-400 focus:ring-red-400' : 'border-emerald-400/30 focus:ring-emerald-400'
                  ]"
                />
                <p v-if="emailError" class="text-red-300 text-sm mt-2 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  {{ emailError }}
                </p>
              </div>

              <!-- Submit Button - Full Width -->
              <button
                type="submit"
                class="w-full px-4 py-3 bg-emerald-500 text-white text-base font-semibold rounded-lg hover:bg-emerald-400 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 shadow-lg"
              >
                Submit
              </button>

              <!-- Gender Selection - Full Width Next Line -->
              <div class="flex justify-between gap-4 w-full">
                <label class="flex items-center gap-3 cursor-pointer group flex-1">
                  <input
                    v-model="gender"
                    type="radio"
                    value="female"
                    class="w-5 h-5 text-emerald-500 bg-white/10 border-2 border-emerald-300 rounded-full focus:ring-2 focus:ring-emerald-400 transition-all duration-200"
                  />
                  <span class="text-white text-base group-hover:text-emerald-300 transition-colors duration-200">Female</span>
                </label>
                
                <label class="flex items-center gap-3 cursor-pointer group flex-1">
                  <input
                    v-model="gender"
                    type="radio"
                    value="male"
                    class="w-5 h-5 text-emerald-500 bg-white/10 border-2 border-emerald-300 rounded-full focus:ring-2 focus:ring-emerald-400 transition-all duration-200"
                  />
                  <span class="text-white text-base group-hover:text-emerald-300 transition-colors duration-200">Male</span>
                </label>
                
                <label class="flex items-center gap-3 cursor-pointer group flex-1">
                  <input
                    v-model="gender"
                    type="radio"
                    value="other"
                    class="w-5 h-5 text-emerald-500 bg-white/10 border-2 border-emerald-300 rounded-full focus:ring-2 focus:ring-emerald-400 transition-all duration-200"
                  />
                  <span class="text-white text-base group-hover:text-emerald-300 transition-colors duration-200">Other</span>
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
  
  console.log('Form submitted:', {
    email: email.value,
    gender: gender.value
  })
  
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
  border-color: #10B981;
  background: rgba(255, 255, 255, 0.1);
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
  color: rgba(167, 243, 208, 0.7);
}
</style>