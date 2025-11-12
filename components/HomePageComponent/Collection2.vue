<script setup>
import CollectionGrid from '@/Reusable/CollectionGrid.vue'
import productsData from '@/data/products.json'

const collections = productsData.Collection2
console.log('Collections data:', collections) 
</script>

<template>
  <CollectionGrid :collections="collections" />
</template>
