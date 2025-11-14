<template>
 
    <topbar/>

    <!-- Navbar (Import your existing component) -->
    <NavBar />
  <div class="category-collection mt-[100px]">
    <div class="container">
      <!-- Desktop/Tablet Grid -->
      <div class="desktop-grid">
        <!-- Row 1: Adaa & EN VOGUE (Wide horizontal images) -->
        <div class="category-card wide" :style="{ backgroundImage: `url(${categories[0].image})` }">
          <div class="overlay"></div>
          <h2 class="category-title" :class="categories[0].textColor">{{ categories[0].name }}</h2>
        </div>
        
        <div class="category-card wide" :style="{ backgroundImage: `url(${categories[1].image})` }">
          <div class="overlay"></div>
          <h2 class="category-title" :class="categories[1].textColor">{{ categories[1].name }}</h2>
        </div>

        <!-- Rows 2-4: Vertical images in 3-column layout -->
        <div 
          v-for="category in categories.slice(2)" 
          :key="category.id"
          class="category-card tall"
          :style="{ backgroundImage: `url(${category.image})` }"
        >
          <div class="overlay"></div>
          <h2 class="category-title" :class="category.textColor">{{ category.name }}</h2>
        </div>
      </div>

      <!-- Mobile View -->
      <div class="mobile-view">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="category-card-mobile"
          :style="{ backgroundImage: `url(${category.image})` }"
        >
          <div class="overlay"></div>
          <h2 class="category-title" :class="category.textColor">{{ category.name }}</h2>
        </div>
      </div>
    </div>
  </div>
  <Footer/>

</template>

<script >

import topbar from '../components/HomePageComponent/topbar.vue';
import NavBar from '../components/HomePageComponent/navbar.vue';
import Footer from '../components/HomePageComponent/Footer.vue'
export default {
  name: 'CategoryCollection',
  components: {
    topbar,
    NavBar,
    Footer
  },
  data() {
    return {
      categories: [
        {
          id: 1,
          name: 'Adaa',
          image: '/CategoryCollection/1.jpg',
          textColor: 'text-white'
        },
        {
          id: 2,
          name: 'EN VOGUE',
          image: '/CategoryCollection/2.jpg',
          textColor: 'text-gold'
        },
        {
          id: 3,
          name: 'Classic',
          image: '/CategoryCollection/3.jpg',
          textColor: 'text-white'
        },
        {
          id: 4,
          name: 'Contemporary',
          image: '/CategoryCollection/4.jpg',
          textColor: 'text-white'
        },
        {
          id: 5,
          name: 'Elegant',
          image: '/CategoryCollection/5.jpg',
          textColor: 'text-white'
        },
        {
          id: 6,
          name: 'Heritage',
          image: '/CategoryCollection/6.jpg',
          textColor: 'text-white'
        },
        {
          id: 7,
          name: 'Modern',
          image: '/CategoryCollection/7.jpg',
          textColor: 'text-white'
        },
        {
          id: 8,
          name: 'Luxury',
          image: '/CategoryCollection/8.jpg',
          textColor: 'text-white'
        },
        {
          id: 9,
          name: 'Premium',
          image: '/CategoryCollection/9.jpg',
          textColor: 'text-white'
        },
        {
          id: 10,
          name: 'Designer',
          image: '/CategoryCollection/10.jpg',
          textColor: 'text-white'
        },
        {
          id: 11,
          name: 'Signature',
          image: '/CategoryCollection/11.jpg',
          textColor: 'text-white'
        }
      ]
    };
  }
};

</script>

<style scoped>
.category-collection {
  width: 100%;
  background-color: #ffffff;
  padding: 2rem 1rem;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

/* Desktop Grid Layout */
.desktop-grid {
  display: none;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .desktop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
  }

  .category-card.wide {
    height: 280px;
  }

  .category-card.wide:nth-child(1) {
    grid-column: span 2;
  }

  .category-card.wide:nth-child(2) {
    grid-column: span 1;
  }

  .category-card.tall {
    height: 400px;
  }
}

@media (min-width: 1024px) {
  .desktop-grid {
    gap: 2rem;
  }

  .category-card.wide {
    height: 300px;
  }

  .category-card.tall {
    height: 450px;
  }
}

.category-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%);
  transition: background 0.3s ease;
}

.category-card:hover .overlay {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%);
}

.category-title {
  position: absolute;
  top: 2rem;
  left: 2rem;
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  z-index: 2;
  font-family: 'Georgia', serif;
}

.text-white {
  color: #ffffff;
}

.text-gold {
  color: #d4af37;
}

/* Mobile View */
.mobile-view {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .mobile-view {
    display: none;
  }
}

.category-card-mobile {
  position: relative;
  height: 320px;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.3s ease;
}

.category-card-mobile:active {
  transform: scale(0.98);
}

.category-card-mobile .overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%);
}

.category-card-mobile .category-title {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  z-index: 2;
  font-family: 'Georgia', serif;
}
</style>