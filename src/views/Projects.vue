<template>
  <div class="projects-page">
    <section class="section-title">
      <h1>Projelerim</h1>
      <div class="underline"></div>
    </section>

    <div class="projects-grid">
      <template v-for="(project, index) in projects" :key="index">
        <router-link
          v-if="!project.upcoming"
          :to="`/project/${project.id}`"
          class="project-card"
          data-aos="fade-up"
        >
          <img :src="project.image" :alt="project.title" class="project-image" />
          <div class="project-info">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
          </div>
        </router-link>

        <div
          v-else
          class="project-card upcoming"
          data-aos="fade-up"
        >
          <img :src="project.image" :alt="project.title" class="project-image" />
          <div class="project-info">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const isDarkMode = ref(document.documentElement.classList.contains('dark'))

const observer = new MutationObserver(() => {
  isDarkMode.value = document.documentElement.classList.contains('dark')
})

onMounted(() => {
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

const projects = computed(() => [
  /*{
    id: '1',
    title: 'Makine Öğrenmesi ile Hipertansiyon Riski Analizi',
    description: 'Kişisel Özelliklere Dayalı Otomatik Sınıflandırma Projesi',
    image: isDarkMode.value ? '/MLproje-dark.webp' : '/MLproje.webp'
  },*/
  {
    id: '1',
    title: 'Kişisel Web Sitesi Projesi',
    description: 'Vue.js ve Vite Tabanlı Portfolyo Uygulaması',
  image: isDarkMode.value ? import.meta.env.BASE_URL + 'siteproje-dark.webp' : import.meta.env.BASE_URL + 'siteproje.webp'
  },
  {
    title: 'Yakında...',
    description: 'Yeni projeler üzerinde çalışıyorum, yakında burada paylaşacağım.',
  image: isDarkMode.value ? import.meta.env.BASE_URL + 'dahafazlasıyakında-dark.webp' : import.meta.env.BASE_URL + 'dahafazlasıyakında.webp',
    upcoming: true
  }
])
</script>


<style scoped>
.projects-page {
  background-color: #ffffff;
  padding: 3rem 1.5rem;
  color: #222;
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
}

.section-title {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title h1 {
  color: #000;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.underline {
  width: 80px;
  height: 3px;
  background-color: #ffcc00;
  margin: 0 auto;
  border-radius: 2px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Kart yapısı */
.project-card {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  height: auto; /* Sabit yükseklik kalktı */
}

.project-card:hover {
  transform: scale(1.03);
}

/* Görsel kısmı kare */
.project-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

/* Açıklama alanı */
.project-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Ortalanmış hizalama için */
  gap: 0.4rem; /* Az bir boşluk bırak, çok yapışık durmasın */
  min-height: 130px;
}

.project-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #000;
  margin: 0; /* Fazla boşluğu engelle */
  line-height: 1.2;
}

.project-description {
  font-size: 0.9rem;
  color: #444;
  margin: 0; /* Alt boşluk olmasın */
  line-height: 1.4;
  display: -webkit-box;
  display: -webkit-box;
  display: box; /* Standard fallback */
  -webkit-line-clamp: 2;
  line-clamp: 2; /* ✅ Standart özellik */
  -webkit-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Yakında kartı (tıklanamaz) */
.project-card.upcoming {
  cursor: default;
  pointer-events: none;
  opacity: 0.6; /* Daha silik görünüm */
  filter: grayscale(20%); /* Hafif solukluk efekti */
  transform: scale(0.98); /* Hafif küçük göster */
  transition: all 0.3s ease;
}

.project-card.upcoming .project-title,
.project-card.upcoming .project-description {
  color: #888; /* Daha açık gri ton */
  font-style: italic;
}

/* DARK MODE */
.dark .projects-page {
  background-color: #111;
  color: #f0f0f0;
}

.dark .section-title h1 {
  color: #f0f0f0;
}

.dark .project-card {
  background-color: #1e1e1e;
  color: #f0f0f0;
  box-shadow: 0 0 0 1px #333, 0 8px 20px rgba(255, 255, 255, 0.05);
}

.dark .project-title {
  color: #f0f0f0;
}

.dark .project-description {
  color: #ccc;
}

/*.project-image {
  border: 1px solid #eee;
  border-radius: 6px;
}*/
/*.dark .project-image {
  border: 1px solid #333;
}*/
</style>
