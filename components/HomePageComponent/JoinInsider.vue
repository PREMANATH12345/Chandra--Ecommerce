<template>
  <section
    class="bg-gradient-to-b from-dark-leaf-green to-light-leaf-green rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-center gap-10 text-white text-center md:text-left"
  >
    <!-- Left Side (Text + Icon) -->
    <div
      class="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:w-1/2"
    >
      <img src="/purple-gift-icon.png" alt="Gift Icon" class="w-16 h-16 sm:w-20 sm:h-20" />
      <div>
        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug">
          Join CaratLane Insider
        </h2>
        <p class="text-sm sm:text-base text-emerald-50 opacity-90 mt-1">
          To discover enticing deals, latest arrivals, & more
        </p>
      </div>
    </div>

    <!-- Right Side (Form) -->
    <div class="w-full md:w-1/2 flex flex-col items-center md:items-start">
      <form
        @submit.prevent="handleSubmit"
        class="flex flex-col sm:flex-row gap-3 w-full sm:w-3/4 md:w-full max-w-md justify-center"
      >
        <input
          type="email"
          v-model="email"
          placeholder="Enter Email"
          required
          class="w-full px-4 py-2 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-accent outline-none"
        />
        <button
          type="submit"
          class="bg-green-500 hover:bg-dark-blue-stem text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200"
        >
          Submit
        </button>
      </form>

      <!-- Gender Selection -->
      <div
        class="flex flex-wrap justify-center md:justify-start gap-5 mt-4 text-xs sm:text-sm text-text-dark-emerald"
      >
        <label class="flex items-center gap-1 cursor-pointer">
          <input type="radio" name="gender" value="Female" v-model="gender" />
          Female
        </label>
        <label class="flex items-center gap-1 cursor-pointer">
          <input type="radio" name="gender" value="Male" v-model="gender" />
          Male
        </label>
        <label class="flex items-center gap-1 cursor-pointer">
          <input type="radio" name="gender" value="Other" v-model="gender" />
          Other
        </label>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const gender = ref('')

const handleSubmit = () => {
  console.log('Form submitted:', { email: email.value, gender: gender.value })
  alert(`Thank you for joining, ${gender.value || 'Guest'}!`)
  email.value = ''
  gender.value = ''
}
</script>

<style scoped>
input,
button {
  transition: all 0.2s ease-in-out;
}
</style>
