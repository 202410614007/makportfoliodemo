<template>
  <div class="about-page">
    <section
      class="section fade-in"
      v-for="(item, index) in sections"
      :key="index"
      :class="{ reverse: index % 2 !== 0 }"
    >
      <div class="image-box">
        <img :src="getImage(item.image)" :alt="item.title" />
      </div>
      <div class="text-box">
        <h2>{{ item.title }}</h2>
        <div class="line"></div>
        <p v-for="(p, i) in item.text" :key="i">{{ p }}</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Tema takibi
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

// Resim ismini dark moda göre ayarla
const getImage = (src) => {
  if (src === '/profile2.webp') return src
  if (isDarkMode.value) {
    const parts = src.split('.')
    return `${parts[0]}-dark.${parts[1]}`
  }
  return src
}

const sections = [
  {
    title: 'Hakkımda',
    text: [
      'Ben Muhammed Ali, Balıkesir Üniversitesi Meslek Yüksekokulu Bilgisayar Programcılığı 2. sınıf öğrencisiyim.',
      'Bilgisayarla ilgili projeler geliştirmeyi ve yeni şeyler öğrenmeyi seviyorum.'
    ],
    image: '/profile2.webp'
  },
  {
    title: 'Eğitim',
    text: [
      'Şu anda Balıkesir Üniversitesi\'nde öğrenim görmekteyim.',
    ],
    image: '/egitim.webp'
  },
  {
    title: 'İş ve Staj Deneyimi',
    text: [
      "consectetur adipiscing elit. Nunc auctor lacus eu sem auctor egestas...",
      'Nunc sodales, erat non fringilla feugiat, lorem mi scelerisque neque, a consectetur turpis arcu quis risus.'
    ],
    image: '/isdeneyim.webp'
  },
  {
    title: 'Yeteneklerim',
    text: [
      'Donec lacus lacus, venenatis sed facilisis efficitur, dictum nec lacus. Curabitur at erat orci. '
    ],
    image: '/yetenek.webp'
  },
  {
    title: 'Projeler',
    text: [
      'Aenean rutrum, odio eu pharetra vestibulum, neque mauris luctus nisl, sed ultrices risus dolor a urna.',
      'Pellentesque posuere, est eget finibus convallis, tellus nisl pellentesque metus, et tempus urna nisl volutpat turpis..',
      'Fusce vitae dui commodo, tincidunt felis a, laoreet orci. Nullam iaculis in libero in dignissim. Sed vel iaculis ipsum.'
    ],
    image: '/projeler.webp'
  },
  {
    title: 'Sertifikalar',
    text: [
      'Ut et tellus pharetra, pretium mi eu, aliquam urna.',
      'Nulla ornare, massa sit amet interdum feugiat, enim orci gravida mi, non condimentum ligula risus nec felis.'
    ],
    image: '/sertifikalar.webp'
  }
]

onMounted(() => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
          entry.target.classList.add('visible')
        } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
          entry.target.classList.remove('visible')
        }
      })
    },
    {
      threshold: 0.2
    }
  )

  document.querySelectorAll('.section').forEach(el => observer.observe(el))
})
</script>

<style scoped>
.about-page {
  background-color: #ffffff;
  color: #000000;
  font-family: 'Poppins', sans-serif;
  padding: 2rem 1rem;
  margin-top: 0px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 2rem;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  will-change: opacity, transform;
}

.section.visible {
  opacity: 1;
  transform: translateY(0);
}

.section.reverse {
  flex-direction: row-reverse;
}

.image-box {
  flex: 1;
  max-width: 400px;
}

.image-box img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease, border 0.3s ease;
}

.text-box {
  flex: 1;
  max-width: 600px;
}

.text-box h2 {
  font-size: 2rem;
  margin-bottom: 0.25rem;
  color: #000000;
  transition: color 0.3s ease;
}

.line {
  height: 3px;
  width: 60px;
  background-color: #ffcc00;
  margin-bottom: 1rem;
}

.text-box p {
  font-size: 1rem;
  margin-bottom: 0.75rem;
  line-height: 1.6;
  color: #444;
  transition: color 0.3s ease;
}

/* Dark Mode */
.dark .about-page {
  background-color: #111;
  color: #f0f0f0;
}

.dark .text-box h2 {
  color: #f0f0f0;
}

.dark .text-box p {
  color: #c6c6c6;
}

.dark .image-box img {
  border: 1.5px solid #444;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
}

@media (max-width: 900px) {
  .section {
    flex-direction: column !important;
    text-align: center;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .text-box {
    max-width: 100%;
  }

  .text-box h2 {
    font-size: 1.5rem;
  }

  .text-box p {
    font-size: 0.95rem;
  }

  .line {
    margin-left: auto;
    margin-right: auto;
  }

  .image-box {
    max-width: 100%;
  }

  .image-box img {
    border-radius: 10px;
  }

  .about-page {
    padding: 1rem;
  }
}

</style>
