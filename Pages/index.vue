<!-- app.vue or pages/index.vue -->

<template>
  <div class="min-h-screen bg-white">
        <topbar />
    <navbar />
  
    <main>
      <Hero />
      <ProductCategory />
      <Collection/>
      <CategoryHighlight />
      <FeatureSection/>
    </main>
    <ProductView/>
     <StoreLocation />
      <reviews />
    <JoinUs />
    <Footer />
  </div>
</template>

<script setup>
import navbar from '../components/HomePageComponent/navbar.vue'
import topbar from '../components/HomePageComponent/topbar.vue'
import Footer from '../components/HomePageComponent/Footer.vue'
import reviews from '../components/HomePageComponent/reviews.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import StoreLocation from '../components/HomePageComponent/StoreLocation.vue'
import JoinUs from '../components/HomePageComponent/JoinUs.vue'

import FeatureSection from '../components/HomePageComponent/FeatureSection.vue'
// This can be empty for now
import Hero from "../components/HomePageComponent/Hero";
import ProductCategory from "../components/HomePageComponent/ProductCategory.vue";
import Collection from "../components/HomePageComponent/Collection.vue";

import ProductView from "/Pages/Products/ProductView.vue";
import CategoryHighlight from '../components/HomePageComponent/CategoryHighlight.vue'

</script>