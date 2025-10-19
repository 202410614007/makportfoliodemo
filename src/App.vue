<template>
  <div :class="{ dark: isDarkMode }" class="layout">
    <Header
      v-if="showHeader"
      :darkMode="isDarkMode"
      @toggleDarkMode="toggleDarkMode"
    />
    
    <main class="page-content">
      <transition name="fade-slide" mode="out-in">
        <router-view :key="route.fullPath" />
      </transition>
    </main>

    <Footer v-if="showFooter" />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const isDarkMode = ref(false)
const showHeader = ref(route.path !== '/')
const showFooter = ref(route.path !== '/')

watch(route, async () => {
  showHeader.value = route.path !== '/'
  showFooter.value = route.path !== '/'

  await nextTick()
  window.scrollTo({ top: 0, behavior: 'smooth' })

  if (route.path === '/') {
    isDarkMode.value = false
    document.documentElement.classList.remove('dark')
  }
})

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background-color: #fff;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dark body,
.dark {
  background-color: #111;
  color: #f0f0f0;
}

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-content {
  flex: 1;
}

/* Animasyon */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
