<template>
    <div>
        <topbar/>
        <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-16">
            <div class="container mx-auto px-4 py-8">
                <!-- Header -->
                <div class="text-center mb-10">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <h1 class="text-4xl font-bold text-gray-800 mb-3">
                        {{ enquiryForm.productInfo?.productName ? `Enquiry for ${enquiryForm.productInfo.productName}` : 'Product Enquiry' }}
                    </h1>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto">Have questions about our gold & silver molds and designs? We'd love to help!</p>
                </div>

                <!-- Product Info Banner -->
                <div v-if="enquiryForm.productInfo?.productName" class="max-w-4xl mx-auto mb-8">
                    <div class="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white">
                        <div class="flex items-center mb-4">
                            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                            </svg>
                            <h3 class="text-xl font-bold">Product Details</h3>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div class="bg-white bg-opacity-20 p-3 rounded-lg">
                                <span class="font-medium">Product:</span>
                                <p class="font-semibold">{{ enquiryForm.productInfo.productName }}</p>
                            </div>
                            <div v-if="enquiryForm.productInfo.size" class="bg-white bg-opacity-20 p-3 rounded-lg">
                                <span class="font-medium">Size:</span>
                                <p class="font-semibold">{{ enquiryForm.productInfo.size }}</p>
                            </div>
                            <div v-if="enquiryForm.productInfo.metal" class="bg-white bg-opacity-20 p-3 rounded-lg">
                                <span class="font-medium">Metal:</span>
                                <p class="font-semibold">{{ enquiryForm.productInfo.metal }}</p>
                            </div>
                            <div v-if="enquiryForm.productInfo.diamond" class="bg-white bg-opacity-20 p-3 rounded-lg">
                                <span class="font-medium">Diamond:</span>
                                <p class="font-semibold">{{ enquiryForm.productInfo.diamond }}</p>
                            </div>
                            <div v-if="enquiryForm.productInfo.price" class="md:col-span-2 lg:col-span-4 bg-white bg-opacity-20 p-3 rounded-lg">
                                <span class="font-medium">Price Reference:</span>
                                <p class="font-bold text-lg">${{ parseInt(enquiryForm.productInfo.price).toLocaleString() }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Enquiry Form -->
                <div class="max-w-4xl mx-auto">
                    <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <!-- Form Header -->
                        <div class="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-4">
                            <h2 class="text-xl font-bold text-white">Enquiry Form</h2>
                            <p class="text-green-100 text-sm">Fill in the details below and we'll get back to you soon</p>
                        </div>
                        
                        <form @submit.prevent="submitEnquiry" class="p-6 md:p-8 space-y-8">
                            <!-- Personal Information -->
                            <div class="space-y-6">
                                <div class="flex items-center">
                                    <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                    </div>
                                    <h3 class="text-lg font-semibold text-gray-800">Personal Information</h3>
                                </div>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-gray-700">Full Name *</label>
                                        <div class="relative">
                                            <input
                                                v-model="enquiryForm.name"
                                                type="text"
                                                required
                                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                                placeholder="Enter your full name"
                                            />
                                            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-gray-700">Company Name/User Name *</label>
                                        <div class="relative">
                                            <input
                                                v-model="enquiryForm.company"
                                                type="text"
                                                required
                                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                                placeholder="Enter your company name"
                                            />
                                            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-gray-700">Email Address *</label>
                                        <div class="relative">
                                            <input
                                                v-model="enquiryForm.email"
                                                type="email"
                                                required
                                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                                placeholder="Enter your email"
                                            />
                                            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-gray-700">Phone Number *</label>
                                        <div class="relative">
                                            <input
                                                v-model="enquiryForm.phone"
                                                type="tel"
                                                required
                                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                                placeholder="Enter your phone number"
                                            />
                                            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Project Details -->
                            <div class="border-t border-gray-200 pt-8">
                                <div class="flex items-center mb-6">
                                    <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                        </svg>
                                    </div>
                                    <h3 class="text-lg font-semibold text-gray-800">Project Details</h3>
                                </div>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div class="space-y-4">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-3">I'm interested in *</label>
                                            <div class="space-y-3 bg-gray-50 p-4 rounded-lg">
                                                <label v-for="interest in interestOptions" :key="interest.value" class="flex items-start group">
                                                    <input 
                                                        v-model="enquiryForm.interests" 
                                                        type="checkbox" 
                                                        :value="interest.value" 
                                                        class="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500 transition-all duration-200"
                                                    >
                                                    <span class="ml-3 text-sm text-gray-700 group-hover:text-green-600 transition-colors">{{ interest.label }}</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Material for Final Jewelry *</label>
                                            <div class="relative">
                                                <select
                                                    v-model="enquiryForm.material"
                                                    required
                                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none transition-all duration-200"
                                                >
                                                    <option value="">Select material</option>
                                                    <option v-for="material in materialOptions" :key="material.value" :value="material.value">
                                                        {{ material.label }}
                                                    </option>
                                                </select>
                                                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="space-y-4">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Design Source *</label>
                                            <div class="relative">
                                                <select
                                                    v-model="enquiryForm.designSource"
                                                    required
                                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none transition-all duration-200"
                                                >
                                                    <option value="">Select design source</option>
                                                    <option v-for="source in designSourceOptions" :key="source.value" :value="source.value">
                                                        {{ source.label }}
                                                    </option>
                                                </select>
                                                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Quantity Required</label>
                                            <div class="relative">
                                                <select
                                                    v-model="enquiryForm.quantity"
                                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none transition-all duration-200"
                                                >
                                                    <option value="">Select quantity</option>
                                                    <option v-for="quantity in quantityOptions" :key="quantity.value" :value="quantity.value">
                                                        {{ quantity.label }}
                                                    </option>
                                                </select>
                                                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- File Upload -->
                                <div class="mt-6">
                                    <label class="block text-sm font-medium text-gray-700 mb-3">Upload Design Files (Optional)</label>
                                    <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition-all duration-200 hover:border-green-400 hover:bg-green-50">
                                        <input
                                            type="file"
                                            ref="fileInput"
                                            @change="handleFileUpload"
                                            multiple
                                            accept=".jpg,.jpeg,.png,.pdf,.stl,.obj,.rhino"
                                            class="hidden"
                                        />
                                        <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div class="space-y-2">
                                            <button
                                                type="button"
                                                @click="$refs.fileInput.click()"
                                                class="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg"
                                            >
                                                Choose Files
                                            </button>
                                            <p class="text-sm text-gray-500">Upload sketches, photos, or 3D files (Max 10MB each)</p>
                                        </div>
                                        <div v-if="uploadedFiles.length > 0" class="mt-6">
                                            <h4 class="text-sm font-medium text-gray-700 mb-3">Selected Files:</h4>
                                            <ul class="text-sm text-gray-600 space-y-2">
                                                <li v-for="(file, index) in uploadedFiles" :key="index" class="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                                                    <div class="flex items-center">
                                                        <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                        </svg>
                                                        <span class="truncate max-w-xs">{{ file.name }}</span>
                                                    </div>
                                                    <button @click="removeFile(index)" class="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50">
                                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <!-- Additional Details -->
                                <div class="mt-6">
                                    <label class="block text-sm font-medium text-gray-700 mb-3">Additional Details</label>
                                    <textarea
                                        v-model="enquiryForm.additionalDetails"
                                        rows="4"
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                        placeholder="Describe your design requirements, dimensions, special features, etc."
                                    ></textarea>
                                </div>

                                <!-- Budget & Timeline -->
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Desired Timeline</label>
                                        <div class="relative">
                                            <select
                                                v-model="enquiryForm.timeline"
                                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none transition-all duration-200"
                                            >
                                                <option value="">Select timeline</option>
                                                <option v-for="timeline in timelineOptions" :key="timeline.value" :value="timeline.value">
                                                    {{ timeline.label }}
                                                </option>
                                            </select>
                                            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <div class="flex justify-center pt-6">
                                <button
                                    type="submit"
                                    :disabled="isSubmitting"
                                    class="px-8 py-3.5 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-semibold rounded-xl 
                                            shadow-lg hover:from-green-700 hover:to-emerald-800 hover:shadow-xl active:scale-[0.98] 
                                            transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                                >              
                                    <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {{ isSubmitting ? 'Submitting...' : 'Submit Enquiry' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Success Message Modal -->
            <div v-if="showSuccessMessage" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div class="bg-white rounded-2xl border border-green-200 shadow-2xl max-w-sm p-6 text-center transform transition-all duration-300 scale-100">
                    <div class="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Enquiry Submitted!</h3>
                    <p class="text-sm text-gray-600 mb-6">Thank you for your interest. We'll contact you within 24 hours.</p>
                    <button 
                        @click="handleSuccessClose"
                        class="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script setup>
import topbar from '../components/HomePageComponent/topbar.vue'
import Footer from '../components/HomePageComponent/Footer.vue'

import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Form data - Initialize with productInfo as an empty object
const enquiryForm = ref({
  name: 'kumar ',
  company: 'KS group',
  email: 'kumar@gmail.com',
  phone: '9876543210',
  interests: [],
  material: '',
  designSource: '',
  quantity: '',
  additionalDetails: '',
  timeline: '',
  productInfo: {} // Initialize as empty object to prevent undefined errors
});
const uploadedFiles = ref([]);
const isSubmitting = ref(false);
const showSuccessMessage = ref(false);

// Options data in JSON format
const interestOptions = [
  { value: 'gold-molds', label: 'Gold Molds' },
  { value: 'gold-designs', label: 'Gold Designs (CAD/3D Model)' },
  { value: 'silver-molds', label: 'Silver Molds' },
  { value: 'silver-designs', label: 'Silver Designs (CAD/3D Model)' }
];

const materialOptions = [
  { value: '10k-gold', label: '10K Gold' },
  { value: '14k-gold', label: '14K Gold' },
  { value: '18k-gold', label: '18K Gold' },
  { value: '22k-gold', label: '22K Gold' },
  { value: 'sterling-silver', label: 'Sterling Silver' },
  { value: 'platinum', label: 'Platinum' },
  { value: 'other', label: 'Other' }
];

const designSourceOptions = [
  { value: 'physical-sample', label: 'I have a physical sample/master model' },
  { value: 'cad-file', label: 'I have a 3D CAD file' },
  { value: 'sketch', label: 'I have a sketch/2D drawing' },
  { value: 'photo', label: 'I have a photo/reference image' },
  { value: 'custom-design', label: 'I need custom design from your team' }
];

const quantityOptions = [
  { value: 'single', label: 'Single Piece' },
  { value: 'small-batch', label: 'Small Batch (2-5 units)' },
  { value: 'medium-batch', label: 'Medium Batch (6-20 units)' },
  { value: 'large-batch', label: 'Large Batch (21-50 units)' },
  { value: 'bulk', label: 'Bulk Order (50+ units)' }
];

const timelineOptions = [
  { value: 'urgent', label: 'Urgent (1-2 weeks)' },
  { value: 'standard', label: 'Standard (3-4 weeks)' },
  { value: 'flexible', label: 'Flexible (1-2 months)' },
  { value: 'no-rush', label: 'No rush, just gathering quotes' }
];

// Check for incoming product data from query parameters
onMounted(() => {
  if (route.query.product) {
    // Populate product info from query parameters
    enquiryForm.value.productInfo = {
      productName: decodeURIComponent(route.query.product),
      size: route.query.size ? decodeURIComponent(route.query.size) : '',
      metal: route.query.metal ? decodeURIComponent(route.query.metal) : '',
      diamond: route.query.diamond ? decodeURIComponent(route.query.diamond) : '',
      productTypes: route.query.productTypes ? decodeURIComponent(route.query.productTypes).split(',') : [],
      price: route.query.price || '',
      source: route.query.source || 'direct'
    }
    
    // Auto-populate interests based on product types
    if (enquiryForm.value.productInfo.productTypes.length > 0) {
      enquiryForm.value.interests = enquiryForm.value.productInfo.productTypes.map(type => {
        if (type === 'rubber') return 'gold-molds'
        if (type === 'casting') return 'gold-designs'
        return type
      }).filter(Boolean)
    }
  }
});

// Methods
const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);
  files.forEach(file => {
    if (file.size <= 10 * 1024 * 1024) { // 10MB limit
      uploadedFiles.value.push(file);
    } else {
      alert(`File ${file.name} is too large. Maximum size is 10MB.`);
    }
  });
};

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1);
};

const submitEnquiry = async () => {
  // Validate required fields
  if (!enquiryForm.value.name || !enquiryForm.value.company || !enquiryForm.value.email || 
      !enquiryForm.value.phone || enquiryForm.value.interests.length === 0 || 
      !enquiryForm.value.material || !enquiryForm.value.designSource) {
    alert('Please fill in all required fields');
    return;
  }

  isSubmitting.value = true;

  try {
    // Prepare form data
    const formData = new FormData();
    
    // Add form fields
    Object.keys(enquiryForm.value).forEach(key => {
      if (key === 'productInfo') {
        // Handle productInfo object separately
        formData.append('productInfo', JSON.stringify(enquiryForm.value[key]));
      } else if (Array.isArray(enquiryForm.value[key])) {
        enquiryForm.value[key].forEach(value => {
          formData.append(`${key}[]`, value);
        });
      } else {
        formData.append(key, enquiryForm.value[key]);
      }
    });

    // Add uploaded files
    uploadedFiles.value.forEach(file => {
      formData.append('files', file);
    });

    // Add timestamp
    formData.append('submittedAt', new Date().toISOString());



    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Show success message
    showSuccessMessage.value = true;

  } catch (error) {
    console.error('Error submitting enquiry:', error);
    alert('There was an error submitting your enquiry. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};

const handleSuccessClose = () => {
  showSuccessMessage.value = false;
  resetForm();
  router.push('/');
};

const resetForm = () => {
  enquiryForm.value = {
    name: '',
    company: '',
    email: '',
    phone: '',
    interests: [],
    material: '',
    designSource: '',
    quantity: '',
    additionalDetails: '',
    timeline: '',
    productInfo: {} // Reset to empty object
  };
  uploadedFiles.value = [];
};
</script>

<style scoped>
/* Custom styles for the enquiry page */
.border-t {
  border-top-width: 1px;
}

/* Smooth transitions */
.transition-colors {
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* Focus styles */
input:focus, select:focus, textarea:focus {
  outline: none;
  ring: 2px;
}

/* Custom scrollbar for file list */
ul::-webkit-scrollbar {
  width: 6px;
}

ul::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

ul::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

ul::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>