<template>
  <ProductDetail 
    :productData="product"
    @add-to-bag="handleAddToBag"
    @try-at-home="handleTryAtHome"
  >
    <template #promo>
      <div class="flex items-center text-green-700 font-semibold">
        💎 Special Offer: Get 15% Off Today Only!
      </div>
    </template>
  </ProductDetail>
</template>

<script setup>
import ProductDetail from '@/Reusable/ProductDetail.vue'
import productList from '@/data/product.json'

const product = productList.productDetail

const handleAddToBag = (item) => {
  console.log('Added to bag:', item)
}

const handleTryAtHome = (productName) => {
  console.log('Try at home for:', productName)
}
</script>
