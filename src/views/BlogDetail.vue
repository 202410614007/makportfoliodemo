<template>
  <div class="blog-detail-page">
    <!-- Geri Dönüş Yolu -->
    <div class="breadcrumb-wrapper">
      <nav class="breadcrumb">
        <router-link to="/">Anasayfa</router-link>
        <span>›</span>
        <router-link to="/blog">Blog</router-link>
        <span>›</span>
        <span>{{ blog.title }}</span>
      </nav>
    </div>

    <section class="blog-container">
      <!-- Sol taraf -->
      <div class="left-side">
        <img :src="blog.image" alt="Blog Görseli" class="blog-image" />
        <div class="info-box">
          <p><strong>🗓 Tarih:</strong> {{ blog.date }}</p>
          <p><strong>📂 Kategori:</strong> {{ blog.category }}</p>
        </div>
      </div>

      <!-- Sağ taraf -->
      <div class="right-side">
        <h1 class="blog-title">{{ blog.title }}</h1>
        <p class="blog-content">{{ blog.content }}</p>
      </div>
    </section>
  </div>
</template>


<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted, watchEffect } from 'vue'

const route = useRoute()
const blogId = route.params.id
const isDarkMode = ref(document.documentElement.classList.contains('dark'))

// Dark mod dinleme
onMounted(() => {
  const observer = new MutationObserver(() => {
    isDarkMode.value = document.documentElement.classList.contains('dark')
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

const rawBlogs = [
  {
    id: '1',
    title: 'Lorem ipsum dolor sit amet',
    date: '20 Haziran 2025',
    category: 'Frontend',
    imageBase: '/blog1',
    author: 'Muhammed Ali',
    readTime: 3,
    content: 'consectetur adipiscing elit. Nunc auctor lacus eu sem auctor egestas...'
  },
  {
    id: '2',
    title: 'Lorem ipsum dolor sit amet',
    date: '18 Haziran 2025',
    category: 'Yazılım Temelleri',
    imageBase: '/blog1',
    author: 'Muhammed Ali',
    readTime: 2,
    content: 'consectetur adipiscing elit. Nunc auctor lacus eu sem auctor egestas...'
  }
]

const blog = ref({})

watchEffect(() => {
  const selected = rawBlogs.find((b) => b.id === blogId)
  if (selected) {
    blog.value = {
      ...selected,
      image: isDarkMode.value
        ? `${selected.imageBase}-dark.webp`
        : `${selected.imageBase}.webp`
    }
  }
})
</script>

<style scoped>
.blog-detail-page {
  background-color: #ffffff;
  padding: 3rem 1.5rem;
  font-family: 'Poppins', sans-serif;
  color: #222;
  min-height: 100vh;
}

.breadcrumb-wrapper {
  max-width: 1200px;
  margin: 0 auto 1rem auto;
  padding: 0 1rem;
}

.breadcrumb {
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555;
  flex-wrap: wrap;
}

.breadcrumb a {
  color: #ffcc00;
  text-decoration: none;
  font-weight: 500;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb span:last-child {
  color: #222;
  font-weight: 600;
}

/* Sayfa ana yapısı */
.blog-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
  align-items: flex-start;
}

.left-side {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;
  flex: 1;
}

.blog-image {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

.info-box {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-size: 0.95rem;
  color: #444;
}

.right-side {
  flex: 2;
  min-width: 300px;
  max-width: 700px;
  margin-top: 1.5rem;
}

.blog-title {
  font-size: 1.8rem;
  color: #000;
  margin-bottom: 1.2rem;
}

.blog-content {
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
}

/* Mobil uyum */
@media (max-width: 768px) {
  .breadcrumb-wrapper {
    padding: 0 1rem;
    text-align: center;
  }

  .breadcrumb {
    justify-content: center;
    flex-wrap: wrap;
    font-size: 0.85rem;
  }
}

.dark .blog-detail-page {
  background-color: #111;
  color: #f0f0f0;
}

.dark .breadcrumb {
  color: #aaa;
}
.dark .breadcrumb span:last-child {
  color: #f0f0f0;
}

.dark .info-box {
  background-color: #1e1e1e;
  color: #ccc;
  box-shadow: 0 0 0 1px #333, 0 6px 20px rgba(255, 255, 255, 0.05);
}

.dark .blog-title {
  color: #f0f0f0;
}

.dark .blog-content {
  color: #ccc;
}

.dark .blog-image {
  border: 1px solid #333;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.dark .breadcrumb span:last-child {
  color: #f0f0f0;
}
</style>
