<template>
  <div class="blog-page">
    <section class="section-title">
      <h1>Blog</h1>
      <div class="underline"></div>
    </section>

    <div class="blog-list">
      <div
  v-for="(post, index) in posts"
  :key="index"
  class="blog-card"
  :class="{ upcoming: post.upcoming }"
  @click="!post.upcoming && goToPost(post.id)"
  data-aos="fade-up"
>
  <img :src="post.image" alt="Blog Görseli" class="blog-image" />
  <div class="blog-content">
    <h2 class="blog-title">{{ post.title }}</h2>
    <p class="blog-desc">{{ post.content.slice(0, 100) }}...</p>
    <span v-if="!post.upcoming" class="blog-meta">{{ post.date }} | {{ post.category }}</span>
    <span v-else class="blog-meta italic text-gray-500">🕒 Hazırlanıyor</span>
  </div>
</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isDarkMode = ref(document.documentElement.classList.contains('dark'))

// DOM class gözlemleme
onMounted(() => {
  const observer = new MutationObserver(() => {
    isDarkMode.value = document.documentElement.classList.contains('dark')
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

// Blog postları (imageBase ile)
const rawPosts = [
  {
    id: '1',
    title: 'Lorem ipsum dolor sit amet',
    date: '20 Haziran 2025',
    category: 'Frontend',
    imageBase: '/blog1',
    content: 'consectetur adipiscing elit. Nunc auctor lacus eu sem auctor egestas...'
  },
  {
    id: '2',
    title: 'Lorem ipsum dolor sit amet',
    date: '18 Haziran 2025',
    category: 'Yazılım Temelleri',
    imageBase: '/blog1',
    content: 'consectetur adipiscing elit. Nunc auctor lacus eu sem auctor egestas...'
  },
  {
    id: null,
    title: 'Yakında...',
    date: '',
    category: 'Yeni İçerik',
    imageBase: '/dahafazlasıyakında',
    content: 'Yeni blog içerikleri çok yakında burada paylaşılacak...',
    upcoming: true
  }
]

const posts = ref([])

// Dark moda göre image yollarını ayarla
watchEffect(() => {
  posts.value = rawPosts.map((p) => ({
    ...p,
    image: isDarkMode.value
      ? import.meta.env.BASE_URL + p.imageBase.replace('/', '') + '-dark.webp'
      : import.meta.env.BASE_URL + p.imageBase.replace('/', '') + '.webp'
  }))
})

const goToPost = (id) => {
  router.push(`/blog/${id}`)
}
</script>


<style scoped>
.blog-page {
  background-color: #fff;
  padding: 3rem 1.5rem;
  font-family: 'Poppins', sans-serif;
  color: #222;
  min-height: 100vh;
}

.section-title {
  text-align: center;
  margin-bottom: 2rem;
}
.section-title h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #000;
}
.underline {
  width: 80px;
  height: 3px;
  background-color: #ffcc00;
  margin: 0 auto;
  border-radius: 2px;
}

.blog-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.blog-card {
  display: flex;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  height: 200px;
}

.blog-card:hover {
  transform: scale(1.01);
}

.blog-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  flex-shrink: 0;
}

.blog-content {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.blog-title {
  font-size: 1.2rem;
  color: #000;
  margin-bottom: 0.4rem;
}

.blog-desc {
  font-size: 0.95rem;
  color: #444;
  flex-grow: 1;
}

.blog-meta {
  font-size: 0.8rem;
  color: #777;
  margin-top: 0.8rem;
}

.blog-card.upcoming {
  opacity: 0.5;
  pointer-events: none;
  filter: grayscale(20%);
  transform: scale(0.98);
}

.blog-card.upcoming .blog-title,
.blog-card.upcoming .blog-desc {
  color: #888;
  font-style: italic;
}

/* DARK MODE */
.dark .blog-page {
  background-color: #111;
  color: #f0f0f0;
}

.dark .section-title h1 {
  color: #f0f0f0;
}

.dark .blog-card {
  background-color: #1e1e1e;
  box-shadow: 0 0 0 1px #333, 0 6px 20px rgba(255, 255, 255, 0.05);
}

.dark .blog-title {
  color: #f0f0f0;
}

.dark .blog-desc {
  color: #ccc;
}

.dark .blog-meta {
  color: #999;
}

@media (max-width: 768px) {
  .blog-card {
    flex-direction: column;
    height: auto;
  }

  .blog-image {
    width: 100%;
    height: 200px;
  }

  .blog-content {
    padding: 1rem;
  }

  .blog-title {
    font-size: 1.1rem;
  }

  .blog-desc {
    font-size: 0.9rem;
  }

  .blog-meta {
    font-size: 0.75rem;
    margin-top: 0.5rem;
  }
}
</style>


