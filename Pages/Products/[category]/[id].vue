<template>
  <div class="min-h-screen bg-gray-50">
    <TopBar 
      @search="handleSearch"
      @quick-action="handleQuickAction"
      @check-delivery="handleCheckDelivery"
      @login="handleLogin"
      @signup="handleSignup"
    />
    <NavBar />
    
    <div class="pt-32 lg:pt-34">
    <ProductDetail 
      v-if="productData"
      :productData="productData"
      @add-to-bag="handleAddToBag"
      @try-at-home="handleTryAtHome"
      @add-to-enquiry="handleAddToEnquiry"
    >
      <template #promo>
        <div class="flex items-center text-green-700 font-semibold">
          💎 Special Offer: Get 15% Off Today Only!
        </div>
      </template>
    </ProductDetail>

    <div v-else class="flex justify-center items-center h-screen">
      <p class="text-xl text-gray-500">Product not found</p>
    </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductDetail from '~/Reusable/ProductDetail.vue'
import TopBar from '~/components/HomePageComponent/topbar.vue'
import NavBar from '~/components/HomePageComponent/navbar.vue'
import Footer from '~/components/HomePageComponent/Footer.vue'

// Import product listing data
const productListData = await import('~/data/productlisting.json').then(m => m.default || m)

const route = useRoute()
const router = useRouter()

// Get product ID from route params
const productId = route.params.id
const category = route.params.category

console.log('Looking for product with ID:', productId)
console.log('In category:', category)

// Find the product from productlisting.json
const selectedProduct = productListData.find(p => p.id === productId)

console.log('Found product:', selectedProduct)

// Transform productlisting data to match ProductDetail component format
const productData = computed(() => {
  if (!selectedProduct) return null
  
  return {
    id: selectedProduct.id,
    title: selectedProduct.name,
    category: selectedProduct.category,
    images: (selectedProduct.images && selectedProduct.images.length > 0)
      ? selectedProduct.images
      : selectedProduct.fallbackImages || ['/products/default-fallback.jpg'],

    thumbnails: (selectedProduct.images && selectedProduct.images.length > 0)
      ? selectedProduct.images
      : selectedProduct.fallbackImages || ['/products/default-fallback.jpg'],
    price: selectedProduct.price,
    originalPrice: selectedProduct.originalPrice,
    discount: selectedProduct.discount || Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100),
    stock: selectedProduct.badge === "BESTSELLER" ? "IN STOCK" : "LAST PIECE",
    rating: selectedProduct.rating || 5,
    reviews: selectedProduct.reviews || Math.floor(Math.random() * 50) + 10,
    discountText: selectedProduct.discountText || `Flat ${Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}% off`,
    taxInfo: selectedProduct.taxInfo || "MPR* Inclusive of all taxes",
    deliveryInfo: selectedProduct.deliveryInfo || (selectedProduct.deliveryText + ". Available in stores for trial. Book an appointment to try at home."),
    sizeHelperText: selectedProduct.sizeHelperText || "Not sure about your ring size?",
    breadcrumb: selectedProduct.breadcrumb || [
      { label: "HOME", path: "/" },
      { label: selectedProduct.category.toUpperCase(), path: `/products/${category}` },
      { label: selectedProduct.name.toUpperCase(), path: "" }
    ],
    // CRITICAL FIX: Use sizes from JSON if available, otherwise use defaults
    sizes: selectedProduct.sizes || [
      { label: "12", value: "12 (51.8 mm)", available: true },
      { label: "13", value: "13 (53.1 mm)", available: true },
      { label: "14", value: "14 (54.4 mm)", available: true },
      { label: "15", value: "15 (55.7 mm)", available: true }
    ],
    // CRITICAL FIX: Transform metals array if it exists in JSON
    metals: selectedProduct.metals || [
      { name: "18K Yellow Gold", available: true },
      { name: "18K White Gold", available: true },
      { name: "18K Rose Gold", available: true },
      { name: "Platinum", available: true }
    ],
    // CRITICAL FIX: Use diamonds from JSON if available
    diamonds: selectedProduct.diamonds || [
      { label: "IJ-SI", value: "IJ-SI", available: true },
      { label: "GH-SI", value: "GH-SI", available: true },
      { label: "GH-VS", value: "GH-VS", available: true },
      { label: "EF-VVS", value: "EF-VVS", available: true }
    ],
    buttons: selectedProduct.buttons || {
      addToBag: "ADD TO BAG",
      tryAtHome: "TRY AT HOME",
      learnMore: "Learn Now →",
      addToEnquiry: "ADD TO ENQUIRY"
    }
  }
})

// Event Handlers
const handleAddToBag = (item) => {
  console.log('Added to bag:', item)
  // Add your cart logic here
}

const handleTryAtHome = (productName) => {
  console.log('Try at home for:', productName)
  // Add your try-at-home logic here
}

const handleAddToEnquiry = async (enquiryData) => {
  console.log('Enquiry submitted:', enquiryData)
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Enquiry submitted successfully!')
    
    // Save to local storage
    const enquiries = JSON.parse(localStorage.getItem('sizeEnquiries') || '[]')
    enquiries.push(enquiryData)
    localStorage.setItem('sizeEnquiries', JSON.stringify(enquiries))
    
  } catch (error) {
    console.error('Error submitting enquiry:', error)
    throw error
  }
}

const handleSearch = (query) => console.log('Search:', query)
const handleQuickAction = (action) => console.log('Quick Action:', action)
const handleCheckDelivery = (pincode) => console.log('Check Delivery:', pincode)
const handleLogin = () => console.log('Login')
const handleSignup = () => console.log('Signup')
</script>