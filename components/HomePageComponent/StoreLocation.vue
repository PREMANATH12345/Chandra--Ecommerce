<template>
  <section class="bg-white rounded-2xl shadow-xl overflow-hidden mx-4 my-8 md:mx-8 lg:mx-16">
    <div class="flex flex-col md:flex-row min-h-[500px]">
      <!-- Video Section -->
      <div class="md:w-1/2 relative overflow-hidden">
        <video 
  class="w-full h-full object-cover"
  autoplay 
  muted 
  loop 
  playsinline
>
  <source src="\Nearby-Store-Video.mp4">
  Your browser does not support the video tag.
</video>

        
        <!-- Overlay gradient for better text readability -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden"></div>
      </div>

      <!-- Content Section -->
      <div class="md:w-1/2 bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 flex items-center justify-center">
        <div class="w-full max-w-md">
          <!-- Heading -->
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 text-center leading-tight mb-8">
            Find your favorite designs<br>
            <span class="text-dark-leaf-green">at a Store Nearby</span>
          </h2>

          <!-- Search Section -->
          <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <!-- Input Container -->
            <div class="relative">
              <div class="flex items-center bg-white border-2 border-gray-200 rounded-xl px-4 py-3 transition-all duration-300 hover:border-dark-leaf-green focus-within:border-dark-leaf-green focus-within:shadow-md">
                <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                
                <input
                  v-model="searchQuery"
                  @focus="showSuggestions = true"
                  @input="handleInput"
                  @blur="handleBlur"
                  type="text"
                  placeholder="Enter Pincode or City"
                  class="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-lg"
                />
                
                <button
                  v-if="selectedLocation"
                  @click="clearSelection"
                  class="text-dark-leaf-green font-semibold text-sm uppercase hover:text-light-leaf-green transition-colors duration-200 px-2 py-1 rounded"
                >
                  CHANGE
                </button>
              </div>

              <!-- Suggestions Dropdown -->
              <transition
                enter-active-class="transition-all duration-200 ease-out"
                leave-active-class="transition-all duration-150 ease-in"
                enter-from-class="opacity-0 scale-95 transform -translate-y-2"
                enter-to-class="opacity-100 scale-100 transform translate-y-0"
                leave-from-class="opacity-100 scale-100 transform translate-y-0"
                leave-to-class="opacity-0 scale-95 transform -translate-y-2"
              >
                <div
                  v-if="showSuggestions && filteredLocations.length > 0"
                  class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto"
                >
                  <ul class="py-2">
                    <li
                      v-for="location in filteredLocations"
                      :key="`${location.city}-${location.pincode}`"
                      @click="selectLocation(location)"
                      class="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                    >
                      <div class="flex justify-between items-center">
                        <span class="text-gray-800 font-medium">{{ location.city }}</span>
                        <span class="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded-full">
                          {{ location.pincode }}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>

            <!-- Selected Location Display -->
            <div v-if="selectedLocation" class="mt-4 p-4 bg-light-leaf-green/10 rounded-xl border border-light-leaf-green/20">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-dark-leaf-green font-semibold">{{ selectedLocation.city }}</p>
                  <p class="text-gray-600 text-sm">Pincode: {{ selectedLocation.pincode }}</p>
                </div>
                <div class="w-2 h-2 bg-light-leaf-green rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <!-- Additional Info -->
          <div class="mt-6 text-center">
            <p class="text-gray-600 text-sm">
              Discover our exclusive collections at stores near you
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Reactive data
const locations = ref([])
const searchQuery = ref('')
const selectedLocation = ref(null)
const showSuggestions = ref(false)

// Fetch location data
onMounted(async () => {
  try {
    const response = await fetch('/data/location.json')
    if (response.ok) {
      locations.value = await response.json()
    } else {
      // Fallback data if fetch fails
      locations.value = [
        { "city": "Chennai", "pincode": "600001" },
        { "city": "Coimbatore", "pincode": "641001" },
        { "city": "Madurai", "pincode": "625001" },
        { "city": "Salem", "pincode": "636001" },
        { "city": "Tiruchirappalli", "pincode": "620001" },
        { "city": "Bangalore", "pincode": "560001" },
        { "city": "Hyderabad", "pincode": "500001" },
        { "city": "Mumbai", "pincode": "400001" },
        { "city": "Delhi", "pincode": "110001" },
        { "city": "Kolkata", "pincode": "700001" }
      ]
    }
  } catch (error) {
    console.error('Error fetching location data:', error)
    // Use fallback data
    locations.value = [
      { "city": "Chennai", "pincode": "600001" },
      { "city": "Coimbatore", "pincode": "641001" },
      { "city": "Madurai", "pincode": "625001" },
      { "city": "Salem", "pincode": "636001" },
      { "city": "Tiruchirappalli", "pincode": "620001" }
    ]
  }
})

// Filter locations based on search query
const filteredLocations = computed(() => {
  if (!searchQuery.value) {
    return locations.value.slice(0, 5) // Show first 5 when no query
  }
  
  const query = searchQuery.value.toLowerCase()
  return locations.value
    .filter(location => 
      location.city.toLowerCase().includes(query) || 
      location.pincode.includes(query)
    )
    .slice(0, 5) // Limit to 5 results
})

// Handle input
const handleInput = () => {
  if (searchQuery.value) {
    showSuggestions.value = true
  }
}

// Handle blur with delay to allow clicking on suggestions
const handleBlur = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 150)
}

// Select a location
const selectLocation = (location) => {
  selectedLocation.value = location
  searchQuery.value = `${location.city} - ${location.pincode}`
  showSuggestions.value = false
}

// Clear selection
const clearSelection = () => {
  selectedLocation.value = null
  searchQuery.value = ''
  showSuggestions.value = false
}
</script>

<style scoped>
/* Custom scrollbar for dropdown */
.suggestions-dropdown::-webkit-scrollbar {
  width: 6px;
}

.suggestions-dropdown::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 0 0 12px 12px;
}

.suggestions-dropdown::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.suggestions-dropdown::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>