<script setup>
import CollectionGrid from '@/Reusable/CollectionGrid.vue'
import productsData from '@/data/products.json'

const collections = productsData.Collection1

</script>

<template>
  <CollectionGrid :collections="collections" />
</template>
