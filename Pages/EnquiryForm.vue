<template>
  <div>
    <topbar/>
  <div class="min-h-screen bg-gray-50 pt-16">
    
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8 mt-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Product Enquiry</h1>
        <p class="text-gray-600">Have questions about our gold & silver molds and designs? We'd love to help!</p>
      </div>

      <!-- Enquiry Form -->
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form @submit.prevent="submitEnquiry" class="space-y-6">
            <!-- Personal Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  v-model="enquiryForm.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Company/User Name *</label>
                <input
                  v-model="enquiryForm.company"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your company/user name"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  v-model="enquiryForm.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  v-model="enquiryForm.phone"
                  type="tel"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <!-- Project Details -->
            <div class="border-t pt-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Project Details</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">I'm interested in *</label>
                  <div class="space-y-2">
                    <label v-for="interest in interestOptions" :key="interest.value" class="flex items-center">
                      <input 
                        v-model="enquiryForm.interests" 
                        type="checkbox" 
                        :value="interest.value" 
                        class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      >
                      <span class="ml-2 text-sm text-gray-700">{{ interest.label }}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Material for Final Jewelry *</label>
                  <select
                    v-model="enquiryForm.material"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select material</option>
                    <option v-for="material in materialOptions" :key="material.value" :value="material.value">
                      {{ material.label }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Design Source *</label>
                  <select
                    v-model="enquiryForm.designSource"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select design source</option>
                    <option v-for="source in designSourceOptions" :key="source.value" :value="source.value">
                      {{ source.label }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Quantity Required</label>
                  <select
                    v-model="enquiryForm.quantity"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select quantity</option>
                    <option v-for="quantity in quantityOptions" :key="quantity.value" :value="quantity.value">
                      {{ quantity.label }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- File Upload -->
              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Upload Design Files (Optional)</label>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    ref="fileInput"
                    @change="handleFileUpload"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf,.stl,.obj,.rhino"
                    class="hidden"
                  />
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="mt-4">
                    <button
                      type="button"
                      @click="$refs.fileInput.click()"
                      class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                    >
                      Choose Files
                    </button>
                    <p class="mt-2 text-sm text-gray-500">Upload sketches, photos, or 3D files (Max 10MB each)</p>
                  </div>
                  <div v-if="uploadedFiles.length > 0" class="mt-4">
                    <h4 class="text-sm font-medium text-gray-700 mb-2">Selected Files:</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                      <li v-for="(file, index) in uploadedFiles" :key="index" class="flex items-center justify-between">
                        <span>{{ file.name }}</span>
                        <button @click="removeFile(index)" class="text-red-500 hover:text-red-700">
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
              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                <textarea
                  v-model="enquiryForm.additionalDetails"
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Describe your design requirements, dimensions, special features, etc."
                ></textarea>
              </div>

              <!-- Budget & Timeline -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <!-- <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Expected Budget</label>
                  <select
                    v-model="enquiryForm.budget"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select budget range</option>
                    <option v-for="budget in budgetOptions" :key="budget.value" :value="budget.value">
                      {{ budget.label }}
                    </option>
                  </select>
                </div> -->

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Desired Timeline</label>
                  <select
                    v-model="enquiryForm.timeline"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select timeline</option>
                    <option v-for="timeline in timelineOptions" :key="timeline.value" :value="timeline.value">
                      {{ timeline.label }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-center pt-6">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-full 
         shadow-md hover:bg-green-700 hover:shadow-lg active:scale-95 
         transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ isSubmitting ? 'Submitting...' : 'Submit Enquiry' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
  </div>
</template>

<script setup>
import topbar from '../components/HomePageComponent/topbar.vue'
import Footer from '../components/HomePageComponent/Footer.vue'
import { ref } from 'vue';

// Form data
const enquiryForm = ref({
  name: 'kumar ',
  company: 'kumar',
  email: 'kumar@gmail.com',
  phone: '9876543210',
  interests: [],
  material: '',
  designSource: '',
  quantity: '',
  additionalDetails: '',
  // budget: '',
  timeline: ''
});

const uploadedFiles = ref([]);
const isSubmitting = ref(false);

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

// const budgetOptions = [
//   { value: 'under-500', label: 'Under $500' },
//   { value: '500-1000', label: '$500 - $1,000' },
//   { value: '1000-2500', label: '$1,000 - $2,500' },
//   { value: '2500-5000', label: '$2,500 - $5,000' },
//   { value: '5000-plus', label: '$5,000+' },
//   { value: 'to-discuss', label: 'To be discussed' }
// ];

const timelineOptions = [
  { value: 'urgent', label: 'Urgent (1-2 weeks)' },
  { value: 'standard', label: 'Standard (3-4 weeks)' },
  { value: 'flexible', label: 'Flexible (1-2 months)' },
  { value: 'no-rush', label: 'No rush, just gathering quotes' }
];

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
      if (Array.isArray(enquiryForm.value[key])) {
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

    // Here you would typically send the data to your backend
    // For now, we'll just log it and show success message
    console.log('Enquiry Data:', {
      ...enquiryForm.value,
      files: uploadedFiles.value.map(f => f.name)
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Show success message
    alert('Thank you for your enquiry! We will get back to you within 24 hours.');

    // Reset form
    resetForm();

  } catch (error) {
    console.error('Error submitting enquiry:', error);
    alert('There was an error submitting your enquiry. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
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
   
    timeline: ''
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
</style>