<template>
  <CategoryHighlight :category-data="category" />
</template>

<script setup>
import data from '@/data/products.json'
import CategoryHighlight from '@/Reusable/CategoryHighlight.vue'

const category = data.categoryHightlight[0]
</script>