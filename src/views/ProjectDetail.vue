<template>
  <div class="project-detail-page">
    <!-- Geri Dönüş Yolu -->
    <div class="breadcrumb-wrapper">
      <nav class="breadcrumb">
        <router-link to="/">Anasayfa</router-link>
        <span>›</span>
        <router-link to="/projects">Projeler</router-link>
        <span>›</span>
        <span>{{ project.title }}</span>
      </nav>
    </div>

    <section class="project-container">
      <!-- Sol taraf -->
      <div class="left-side">
        <img :src="project.image" alt="Proje Görseli" class="project-image" />
        <div class="info-box">
          <p><strong>📅 Tarih:</strong> {{ project.date }}</p>
          <p><strong>📂 Kategori:</strong> {{ project.category }}</p>
        </div>
      </div>

      <!-- Sağ taraf -->
      <div class="right-side">
        <h1 class="project-title">{{ project.title }}</h1>
        <div class="project-content" v-html="project.content"></div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const projectId = route.params.id?.toString()
const isDarkMode = ref(document.documentElement.classList.contains('dark'))

// Dark mode gözlemleyici
const observer = new MutationObserver(() => {
  isDarkMode.value = document.documentElement.classList.contains('dark')
})
onMounted(() => {
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

const rawProjects = [
  /*{
    id: '1',
    title: 'Kişisel Özelliklere Dayalı Otomatik Sınıflandırma Projesi',
    date: '20 Haziran 2025',
    category: 'Makine Öğrenimi',
    imageBase: '/MLproje',
    content: `
      <h3>🔍 Projenin Amacı</h3>
      <p>Hipertansiyon, dünya genelinde milyonlarca insanı etkileyen ciddi bir sağlık problemidir. Bu projenin amacı, erken dönemde risk taşıyan bireyleri tespit ederek önleyici sağlık hizmetlerine katkıda bulunmaktır. Geliştirilen sistem, sağlık alanında kullanılabilecek dijital karar destek sistemlerine temel oluşturabilecek niteliktedir.</p>

      <h3>🧠 Kullanılan Yöntem ve Algoritmalar</h3>
      <p>Projede Python programlama dili ve scikit-learn kütüphanesi kullanılarak çeşitli denetimli öğrenme algoritmaları ile modeller geliştirilmiştir. Bunlar arasında:</p>
      <ul>
        <li>Lojistik Regresyon (Logistic Regression)</li>
        <li>Karar Ağaçları (Decision Tree)</li>
        <li>Rassal Orman (Random Forest)</li>
        <li>Destek Vektör Makineleri (SVM)</li>
        <li>K-En Yakın Komşu (KNN)</li>
        <li>XGBoost</li>
      </ul>
      <p>Bu algoritmalar karşılaştırmalı olarak eğitilmiş, test edilmiş ve değerlendirilmiştir. Performans analizinde doğruluk (accuracy), kesinlik (precision), duyarlılık (recall) ve F1 skoru gibi metrikler kullanılmıştır.</p>

      <h3>⚙️ Teknik Detaylar</h3>
      <ul>
        <li><strong>Veri seti:</strong> UCI tabanlı sağlık verileri</li>
        <li><strong>Dil:</strong> Python</li>
        <li><strong>Kütüphaneler:</strong> Pandas, Numpy, scikit-learn, matplotlib, seaborn</li>
        <li><strong>Araç:</strong> Google Colab ortamı</li>
        <li><strong>Model çıktısı:</strong> Sınıflandırma tahmin sonuçları ve analiz raporları</li>
      </ul>

      <h3>👥 Ekip ve Katkılar</h3>
      <ul>
        <li><strong>Muhammed Ali Kılıçaslan</strong> – Veri analizi, modelleme, performans ölçümleri, Veri ön işleme ve algoritma karşılaştırmaları</li>
        <li><strong>Beyza Efe</strong> – Sonuç analizi, grafikler ve makale yazımı</li>
        <li><strong>Sudenaz Eryılmaz</strong> – Sonuç analizi, grafikler ve makale yazımı</li>
      </ul>

      <h3>📄 Yayın ve Belgeler</h3>
      <p>Projenin bilimsel raporu/makalesi hazırlanmış olup, ileride akademik bir yayına dönüştürülmesi planlanmaktadır.</p>

      <h3>🌐 Neden Önemli?</h3>
      <p>Bu proje, bireylerin sağlık verilerini analiz ederek, hastalık oluşmadan önce risklerin belirlenmesini sağlayan önleyici sağlık teknolojileri arasında değerlendirilebilir. Geliştirilen sistem, kolayca farklı veri kümelerine uyarlanabilir yapıdadır.</p>
    `
  },*/
  {
    id: '1',
    title: 'Kişisel Web Sitesi',
    date: '23 Haziran 2025',
    category: 'Frontend Geliştirme',
    imageBase: '/siteproje',
    content: `
                    <p>Bu projede, kendimi ve çalışmalarımı tanıtmak üzere modern ve duyarlı (responsive) bir kişisel web sitesi geliştirdim. Amaç, hem portfolyo içeriklerimi şık bir tasarım altında sunmak, frontend geliştirme becerilerimi sergileyebileceğim bir platform oluşturmak hem de Vibe Coding ile kendimi geliştirmektir. Bu Siteninde %80 kadarı vibe coding ile oluşturulmuştur.</p>

                    <h3>Özellikler ve Yapı</h3>
                    <ul>
                        <li>Vue 3 ile component tabanlı yapı</li>
                        <li>Vite ile hızlı geliştirme ortamı</li>
                        <li>Vue Router ile çok sayfalı gezinme</li>
                        <li>İletişim formu ve e-posta gönderimi altyapısı</li>
                        <li>Karanlık / aydınlık tema desteği</li>
                    </ul>

                    <h3>Teknik Detaylar</h3>
                    <ul>
                        <li><strong>Framework:</strong> Vue 3</li>
                        <li><strong>Geliştirme Aracı:</strong> Vite</li>
                        <li><strong>Tasarım:</strong> Tailwind CSS</li>
                        <li><strong>Dil:</strong> JavaScript, HTML5, CSS3</li>
                        <li><strong>Dağıtım:</strong> GitHub Pages</li>
                    </ul>

                    <h3>Geliştirme Süreci</h3>
                    <p>Proje Bu Hali Son Halidir Güncelleme Almayacaktır. Şuan da Demosunu Görüntüledğiniz Site.</p>

                    <h3>Hedeflerim</h3>
                    <p>Frontend alanında pratik kazanmak, profesyonel görünümlü bir site kurmak ve potansiyel iş/staj fırsatları için referans olabilecek bir proje ortaya koymak.</p>
                `
  }
]

const project = ref({})
watchEffect(() => {
  const selected = rawProjects.find(p => p.id === projectId)
  if (selected) {
    project.value = {
      ...selected,
      image: isDarkMode.value
        ? import.meta.env.BASE_URL + selected.imageBase.replace('/', '') + '-dark.webp'
        : import.meta.env.BASE_URL + selected.imageBase.replace('/', '') + '.webp'
    }
  }
})
</script>

<style scoped>
.project-detail-page {
  background-color: #ffffff;
  padding: 3rem 1.5rem;
  font-family: 'Poppins', sans-serif;
  color: #222;
  min-height: 100vh;
}

.project-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.left-side {
  flex: 1;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
}

.image-wrapper {
  position: relative;
  width: 100%;
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

/* DARK MODE için breadcrumb */
.dark .breadcrumb {
  color: #aaa;
}
.dark .breadcrumb span:last-child {
  color: #f0f0f0;
}

.project-image {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  border: 1px solid #eee;
}

.info-box {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-size: 0.95rem;
  color: #444;
}

.right-side {
  flex: 2;
  min-width: 300px;
}

.project-title {
  font-size: 1.8rem;
  color: #000;
  margin-bottom: 1.2rem;
}

.project-content {
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
}

/* Mobil uyum */
@media (max-width: 768px) {
  .project-container {
    flex-direction: column;
    align-items: center;
  }

  .left-side,
  .right-side {
    max-width: 90%;
  }
}

/* 🌙 DARK MODE */
.dark .project-detail-page {
  background-color: #111;
  color: #f0f0f0;
}

.dark .info-box {
  background-color: #1e1e1e;
  color: #ccc;
  box-shadow: 0 0 0 1px #333, 0 8px 20px rgba(255, 255, 255, 0.05);
}

.dark .project-title {
  color: #f0f0f0;
}

.dark .project-content {
  color: #ccc;
}

.dark .project-image {
  border: 1px solid #333;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
</style>
