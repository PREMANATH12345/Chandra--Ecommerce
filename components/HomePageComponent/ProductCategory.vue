<script setup>
import ProductCategory from '@/Reusable/ProductCategory.vue'
import productsData from '@/data/products.json'

const categories = productsData.category
</script>

<template>
  <!-- Reuse same component -->
  <ProductCategory :categories="categories" />
</template>
