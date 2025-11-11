<template>
  <div class="carousel-container">
    <div class="carousel-wrapper">
      <div 
        class="carousel-track" 
        :style="{ 
          transform: `translateX(-${currentIndex * slideWidth}%)`,
          transition: isTransitioning ? 'transform 0.6s ease-in-out' : 'none'
        }"
        @transitionend="handleTransitionEnd"
      >
        <div v-for="(image, index) in extendedImages" :key="index" class="carousel-slide">
          <img 
            :src="isMobile ? image.mobileSrc : image.src" 
            :alt="image.alt" 
          />
        </div>
      </div>
    </div>

    <!-- Indicators -->
    <div class="carousel-indicators">
      <span 
        v-for="(image, index) in images" 
        :key="index"
        :class="{ active: index === (currentIndex % images.length) }"
        @click="goToSlide(index)"
      ></span>
    </div>

    <!-- Navigation buttons -->
    <button class="nav-btn prev" @click="prevSlide">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <button class="nav-btn next" @click="nextSlide">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Design',
  data() {
    return {
      currentIndex: 0,
      slideWidth: 47.5, // default for desktop
      autoPlayInterval: null,
      isTransitioning: true,
      windowWidth: window.innerWidth,
      isMobile: window.innerWidth < 768,
      images: [
        {
          src: "/Design/Design1.jpg", // Desktop image
          mobileSrc: "/Design/Design11.jpg", // Mobile image
          alt: 'Brilliant Bestsellers',
          title: 'Brilliant Bestsellers',
          subtitle: 'Always in style!'
        },
        {
          src: "/Design/Design2.jpg", // Desktop image
          mobileSrc: "/Design/design12.jpg", // Mobile image
          alt: 'Brooches',
          title: 'Brooches',
          subtitle: 'for every moment'
        },
        {
          src: "/Design/Design3.jpg", // Desktop image
          mobileSrc: "/Design/design13.jpg", // Mobile image
          alt: 'Premium Collection',
          title: 'Premium Collection',
          subtitle: 'Luxury redefined'
        }
      ]
    };
  },
  computed: {
    extendedImages() {
      return [...this.images, ...this.images];
    }
  },
  mounted() {
    this.updateSlideWidth();
    window.addEventListener("resize", this.updateSlideWidth);
    this.startAutoPlay();
  },
  beforeUnmount() {
    this.stopAutoPlay();
    window.removeEventListener("resize", this.updateSlideWidth);
  },
  methods: {
    updateSlideWidth() {
      this.windowWidth = window.innerWidth;
      this.isMobile = this.windowWidth < 768;
      
      if (this.isMobile) {
        this.slideWidth = 100; // Mobile: full width
      } else {
        this.slideWidth = 47.5; // Desktop & Tablet: unchanged
      }
    },
    startAutoPlay() {
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, 3000);
    },
    stopAutoPlay() {
      if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
    },
    nextSlide() {
      this.isTransitioning = true;
      this.currentIndex++;
    },
    prevSlide() {
      this.isTransitioning = true;
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.images.length - 1;
      }
    },
    handleTransitionEnd() {
      if (this.currentIndex >= this.images.length) {
        this.isTransitioning = false;
        this.currentIndex = 0;
      }
    },
    goToSlide(index) {
      this.isTransitioning = true;
      this.currentIndex = index;
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }
};
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: calc(100% - 10mm);
  height: 400px;
  overflow: hidden;
  background: #f5f5f5;
  margin-left: 5mm;
  margin-right: 5mm;
  border-radius: 12px;
}

.carousel-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 0.6s ease-in-out;
}

.carousel-slide {
  min-width: 47.5%;
  height: 100%;
  position: relative;
  margin-right: 10px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

/* Indicators */
.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.carousel-indicators span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-indicators span.active {
  background: white;
  width: 30px;
  border-radius: 6px;
}

/* Navigation Buttons */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(74, 20, 74, 0.8);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.nav-btn:hover {
  background: rgba(74, 20, 74, 1);
  transform: translateY(-50%) scale(1.1);
}

.nav-btn.prev {
  left: 20px;
}

.nav-btn.next {
  right: 20px;
}

/* ✅ Mobile view adjustments ONLY */
@media (max-width: 768px) {
  .carousel-container {
    height: 300px;
  }

  .carousel-slide {
    min-width: 100%; /* ✅ Mobile: show one full image */
    margin-right: 0; /* ✅ Mobile: remove gap between slides */
  }

  .carousel-slide img {
    object-fit: contain; /* ✅ Mobile: ensure images fit perfectly */
    background: #fff; /* ✅ Mobile: white background for better display */
  }

  .nav-btn {
    width: 40px;
    height: 40px;
  }

  .carousel-indicators {
    bottom: 15px;
  }
}
</style>