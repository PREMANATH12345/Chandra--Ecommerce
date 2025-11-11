<template>
  <div class="relative w-[calc(100%-10mm)] h-auto overflow-hidden mx-[5mm] my-8">
    <div class="w-full h-full overflow-hidden">
      <div
        class="flex h-full transition-transform duration-500 ease-in-out"
        :style="{
          transform: `translateX(-${currentIndex * slideWidth}%)`,
          transition: isTransitioning ? 'transform 0.6s ease-in-out' : 'none'
        }"
        @transitionend="handleTransitionEnd"
      >
        <div
          v-for="(service, index) in extendedServices"
          :key="index"
          class="min-w-full sm:min-w-[70%] lg:min-w-[47.5%] h-auto lg:h-56 mr-4 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-lg flex flex-col md:flex-row items-center md:items-center justify-between gap-5"
          :style="{ background: service.gradient }"
        >
          <!-- Left content -->
          <div class="flex-1 z-10 text-center md:text-left">
            <p class="text-xs md:text-sm font-semibold tracking-wider text-white/90 mb-2 uppercase">
              {{ service.label }}
            </p>
            <h2 class="text-xl md:text-2xl font-semibold text-white mb-4 leading-tight">
              {{ service.title }}
            </h2>
            <button
              class="bg-white text-gray-800 px-6 md:px-7 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              {{ service.buttonText }}
            </button>
            <p class="text-xs text-white/80 mt-3">{{ service.terms }}</p>
          </div>

          <!-- Right image -->
          <div class="flex-shrink-0 opacity-90">
            <img
              :src="service.image"
              :alt="service.title"
              class="w-28 h-28 md:w-32 md:h-32 object-contain mx-auto md:mx-0"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Indicators -->
    <div class="absolute -bottom-9 left-1/2 -translate-x-1/2 flex gap-2 z-10">
      <span
        v-for="(service, index) in services"
        :key="index"
        class="w-2.5 h-2.5 rounded-full bg-gray-300 cursor-pointer transition-all duration-300 flex items-center justify-center text-xs font-semibold text-white"
        :class="{ 'bg-purple-900 min-w-[45px] px-2.5 rounded-xl h-6': index === (currentIndex % services.length) }"
        @click="goToSlide(index)"
      >
        {{ index === (currentIndex % services.length) ? `${index + 1}/${services.length}` : '' }}
      </span>
    </div>

    <!-- Navigation buttons -->
    <button
      class="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6 bg-purple-900/80 hover:bg-purple-900 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
      @click="prevSlide"
    >
      <svg width="20" height="20" sm:width="24" sm:height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <button
      class="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6 bg-purple-900/80 hover:bg-purple-900 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
      @click="nextSlide"
    >
      <svg width="20" height="20" sm:width="24" sm:height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'OtherService',
  data() {
    return {
      currentIndex: 0,
      isTransitioning: true,
      autoPlayInterval: null,
      windowWidth: window.innerWidth,
      services: [
        {
          image: "/OtherService/shaya.png",
          label: 'ONE OF A KIND',
          title: 'Silver Jewellery',
          buttonText: 'Shop Now',
          terms: 'Terms & Conditions Apply',
          gradient: 'linear-gradient(135deg, #2d7a6e 0%, #4a9b8e 100%)'
        },
        {
          image: "/OtherService/EXCHANGE.png",
          label: 'GOLD EXCHANGE PROGRAM',
          title: '0% Deduction on exchange value',
          buttonText: 'Calculate Gold Value',
          terms: 'Terms & Conditions Apply',
          gradient: 'linear-gradient(135deg, #b8941e 0%, #d4af37 50%, #f0e68c 100%)'
        },
        {
          image: "/OtherService/growth-icon.png",
          label: 'INVEST WITH E-GOLD',
          title: 'You can invest & redeem anytime',
          buttonText: 'Buy Digital Gold',
          terms: 'Terms & Conditions Apply',
          gradient: 'linear-gradient(135deg, #9eb23b 0%, #c6d446 100%)'
        },
        {
          image: "/OtherService/TC_LOGO.png",
          label: 'CARATLANE TREASURE CHEST',
          title: 'Get 10th instalment FREE',
          buttonText: 'Enrol Now',
          terms: 'Terms & Conditions Apply',
          gradient: 'linear-gradient(135deg, #4a148c 0%, #7b1fa2 100%)'
        }
      ]
    };
  },
  computed: {
    extendedServices() {
      return [...this.services, ...this.services];
    },
    slideWidth() {
      if (this.windowWidth < 768) return 100;     // mobile
      if (this.windowWidth < 1024) return 70;     // tablet
      return 47.5;                                // desktop
    }
  },
  mounted() {
    this.startAutoPlay();
    window.addEventListener("resize", this.updateWidth);
  },
  beforeUnmount() {
    this.stopAutoPlay();
    window.removeEventListener("resize", this.updateWidth);
  },
  methods: {
    updateWidth() {
      this.windowWidth = window.innerWidth;
    },
    startAutoPlay() {
      this.autoPlayInterval = setInterval(this.nextSlide, 3000);
    },
    stopAutoPlay() {
      clearInterval(this.autoPlayInterval);
    },
    nextSlide() {
      this.isTransitioning = true;
      this.currentIndex++;
    },
    prevSlide() {
      this.isTransitioning = true;
      this.currentIndex = (this.currentIndex - 1 + this.services.length) % this.services.length;
    },
    handleTransitionEnd() {
      if (this.currentIndex >= this.services.length) {
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
