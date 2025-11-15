<template>
  <ProductDetail 
    :productData="product"
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
</template>

<script setup>
import { ref } from 'vue'
import ProductDetail from '@/Reusable/ProductDetail.vue'
import productList from '@/data/product.json'

const product = ref(productList.productDetail)

const handleAddToBag = (item) => {
  // Your add to cart logic here
  // Example: cartStore.addToCart(item)
}

const handleTryAtHome = (productName) => {
  // Your try at home logic here
  // Example: showTryAtHomeModal(productName)
}

const handleAddToEnquiry = async (enquiryData) => {
  
  try {
    // Send enquiry to your backend API
    // const response = await fetch('/api/enquiries', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(enquiryData)
    // })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    
    // You can also save to local storage or send to analytics
    const enquiries = JSON.parse(localStorage.getItem('sizeEnquiries') || '[]')
    enquiries.push(enquiryData)
    localStorage.setItem('sizeEnquiries', JSON.stringify(enquiries))
    
  } catch (error) {
    console.error('Error submitting enquiry:', error)
    throw error // This will be caught in the child component
  }
}
</script>