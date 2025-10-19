<template>
  <header class="header">
    <!-- Logo solda -->
    <router-link to="/" class="left-box">
      <img src="/logo.webp" alt="Logo" class="logo-img" />
    </router-link>

    <!-- Mobilde dark + hamburger sağda -->
    <div class="mobile-header-controls">
      <div class="dark-mode-toggle" @click="$emit('toggleDarkMode')">
        <div :class="['toggle-circle', { 'dark-active': darkMode }]">
          <span class="icon" v-if="!darkMode">🌞</span>
          <span class="icon" v-else>🌙</span>
        </div>
      </div>

      <div class="hamburger" @click="isMobileMenuOpen = !isMobileMenuOpen">
        <span :class="{ open: isMobileMenuOpen }"></span>
        <span :class="{ open: isMobileMenuOpen }"></span>
        <span :class="{ open: isMobileMenuOpen }"></span>
      </div>
    </div>

    <!-- Menü -->
    <nav class="nav-links" :class="{ 'mobile-open': isMobileMenuOpen }">
      <!-- Menü linkleri -->
      <router-link to="/" :class="{ active: isActiveRoute('/') }" @click="closeMenu">Anasayfa</router-link>
      <router-link to="/about" :class="{ active: isActiveRoute('/about') }" @click="closeMenu">Hakkımda</router-link>
      <router-link to="/projects" :class="{ active: isActiveProjects() }" @click="closeMenu">Projeler</router-link>
      <router-link to="/blog" :class="{ active: isActiveRoute('/blog') }" @click="closeMenu">Blog</router-link>
      <router-link to="/contact" :class="{ active: isActiveRoute('/contact') }" @click="closeMenu">İletişim</router-link>

      <div class="active-bg" :style="indicatorStyle" v-if="!isMobile"></div>

      <!-- Masaüstü dark mode -->
      <div class="dark-mode-toggle desktop-only" @click="$emit('toggleDarkMode')">
        <div :class="['toggle-circle', { 'dark-active': darkMode }]">
          <span class="icon" v-if="!darkMode">🌞</span>
          <span class="icon" v-else>🌙</span>
        </div>
      </div>
    </nav>
  </header>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({ darkMode: Boolean })
const route = useRoute()

const isMobileMenuOpen = ref(false)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 900
}
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

const closeMenu = () => {
  isMobileMenuOpen.value = false
}

const isActiveRoute = (path) => route.path === path
const isActiveProjects = () =>
  route.path === '/projects' || route.path.startsWith('/project/')

const indicatorStyle = computed(() => {
  const width = 100
  const gap = 20
  let index = 0

  if (route.path === '/') index = 0
  else if (route.path === '/about') index = 1
  else if (route.path === '/projects' || route.path.startsWith('/project/')) index = 2
  else if (route.path === '/blog' || route.path.startsWith('/blog/')) index = 3
  else if (route.path === '/contact') index = 4

  const offset = index * (width + gap)
  return {
    transform: `translateX(${offset}px)`,
    width: `${width}px`
  }
})
</script>

<style scoped>
/* Header genel yapı */
.header {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a1a1a;
  color: white;
  border-bottom: 2px solid #ffcc00;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  padding: 0 1rem;
  position: relative;
}

/* Logo solda */
.left-box {
  height: 100%;
  display: flex;
  align-items: center;
}

.logo-img {
  height: 60px;
  width: auto;
}

/* Mobil menü ve dark mode sağda */
.mobile-header-controls {
  display: none;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
  position: relative;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
}

.active-bg {
  position: absolute;
  top: calc(50% - 22px);
  height: 44px;
  background-image: url('/bgturuncu.png');
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  transition: transform 0.3s ease;
  z-index: 1;
}

.dark-mode-toggle {
  width: 60px;
  height: 30px;
  background-color: #444;
  border-radius: 50px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 3px;
  transition: background-color 0.3s ease;
}

.toggle-circle {
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111;
  transition: transform 0.3s ease;
  transform: translateX(0);
}

.toggle-circle.dark-active {
  transform: translateX(30px);
  background-color: #1a1a1a;
  color: #000;
}

/* Hamburger menü (mobil) */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  z-index: 1001;
}

.hamburger span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #fff;
  transition: all 0.3s ease;
}

.hamburger span.open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.hamburger span.open:nth-child(2) {
  opacity: 0;
}
.hamburger span.open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Mobil menü */
@media (max-width: 900px) {
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #1a1a1a;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    padding: 1rem;
    display: none;
    z-index: 1000;
  }

  .nav-links.mobile-open {
    display: flex;
  }

  .nav-links a {
    width: 100%;
    text-align: left;
    padding: 0.75rem 1rem;
  }

  .active-bg {
    display: none;
  }

  /*.toggle-circle {
    margin-top: 0.7rem;
  }*/

  .dark-mode-toggle {
    margin-top: 0.5rem;
  }

  /*.toggle-circle.dark-active {
    margin-top: 0.7rem;
  }*/

  .hamburger {
    display: flex;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    margin-top: 0.5rem;
  }

  .hamburger span {
    width: 25px;
    height: 3px;
    background-color: #fff;
    transition: all 0.3s ease;
  }

  .hamburger span.open:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  .hamburger span.open:nth-child(2) {
    opacity: 0;
  }
  .hamburger span.open:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  .active-bg {
    display: none;
  }
}

/* Mobil dark mode + hamburger üst üste */
.mobile-header-controls {
  display: none;
}

@media (max-width: 900px) {
  .mobile-header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .mobile-header-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
    position: absolute;
    right: 1rem;
    top: 1rem;
    z-index: 1001;
    margin-left: auto;
  }

  .left-box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 0;
    margin-right: auto;
  }

  .header {
    justify-content: space-between; /* Mobilde elemanlar arasında boşluk bırak */
    padding: 0 1rem;
  }

  .logo-img {
    height: 44px; /* Logoyu biraz büyütüyoruz */
    width: auto;
  }

  .desktop-only {
    display: none !important;
  }
}
</style>
