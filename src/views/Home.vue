<template>
  <div class="page-container">
    <main class="main-content">
      <section class="left-side">
        <div class="left-content">
          <img :src="import.meta.env.BASE_URL + 'profile2.webp'" alt="Profil Fotoğrafı" class="profile-photo-shadowed" />
        </div>
      </section>

      <section class="right-side">
        <div class="center-section">
          <div class="about-wrapper">
            <h3 class="about-title gradient-text">Merhaba! Ben Muhammed Ali.</h3>
            <p class="about-text">
              Bilgisayar Programcılığı öğrencisiyim ve projelerimi bu sayfada sergiliyorum.
            </p>
          </div>

          <div class="buttons-wrapper">
            <router-link
              v-for="(item, index) in projects"
              :key="item.id"
              :to="item.path"
              class="project-btn"
              :style="{ '--bg-position-y': `${index * -52}px` }"
            >
              {{ item.title }}
            </router-link>
          </div>

          <div class="social-wrapper">
            <a href="https://github.com/" target="_blank" class="social-icon">
              <img :src="import.meta.env.BASE_URL + 'github.webp'" alt="GitHub" class="icon-img" />
            </a>
            <a href="https://linkedin.com/" target="_blank" class="social-icon">
              <img :src="import.meta.env.BASE_URL + 'linkedin.webp'" alt="LinkedIn" class="icon-img" />
            </a>
            <a href="mailto:klaslan1016@gmail.com" class="social-icon">
              <img :src="import.meta.env.BASE_URL + 'eposta.webp'" alt="E-posta" class="icon-img" />
            </a>
            <a href="https://instagram.com/creedistaken" target="_blank" class="social-icon">
              <img :src="import.meta.env.BASE_URL + 'instagram.webp'" alt="Instagram" class="icon-img" />
            </a>
            <a href="https://twitter.com/" target="_blank" class="social-icon">
              <img :src="import.meta.env.BASE_URL + 'twitter.webp'" alt="Twitter" class="icon-img" />
            </a>
          </div>
        </div>

        <!-- 📍 Copyright sağ bloğun en altına bağımsız konumlandırıldı -->
        <div class="copyright">
          © 2025 Muhammed Ali Kılıçaslan. Tüm hakları saklıdır.
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
const projects = [
  { id: 2, title: 'Hakkımda', path: '/about' },
  { id: 3, title: 'Projelerim', path: '/projects' },
  { id: 4, title: 'Blog', path: '/blog' },
  { id: 5, title: 'İletişim', path: '/contact' },
]
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  background-color: #242424;
  overflow-x: hidden;
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
}

.left-side {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/bg-blur.webp');
  background-size: cover;
  background-position: center;
  padding: 2rem;
}

.right-side {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000;
  padding: 2rem;
  color: #ffcc00;
}

.center-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-width: 400px;
  width: 100%;
  gap: 1.5rem;
  padding: 2rem 0;
}

.about-wrapper {
  text-align: center;
  margin-top: 1rem;
}

.about-title {
  font-size: 2rem;
  text-align: center;
  line-height: 1.4;
}

.about-text {
  font-size: 1rem;
  color: #e0e0e0;
}

.buttons-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  align-items: center;
}

.project-btn {
  --bg-position-y: 0px;
  background-image: url('/bgturuncu.webp');
  background-size: 100% 280px;
  background-position: center var(--bg-position-y);
  background-repeat: no-repeat;
  color: #fff;
  font-weight: 400;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 30px;
  width: 100%;
  text-align: center;
  text-decoration: none;
  background-color: transparent;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, background-position 0.4s ease;
}

.project-btn:hover {
  transform: scale(1.05);
  background-position: center calc(var(--bg-position-y) - 20px);
}

.social-wrapper {
  display: flex;
  gap: 1.8rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.social-icon .icon-img {
  width: 28px;
  height: 28px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.social-icon:hover .icon-img {
  transform: scale(1.2);
}

/* 📌 Artık sağ alt köşeye sabitlendi */
.copyright {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  color: #888;
  text-align: center;
}

.profile-photo-shadowed {
  width: 450px;
  height: 450px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

/* Mobil uyum */
@media (max-width: 900px) {
  .main-content {
    flex-direction: column;
  }

  .left-side {
    flex: none;
    width: 100%;
    padding: 2rem 1rem;
  }

  .right-side {
    padding: 2rem 1rem;
  }

  .profile-photo-shadowed {
    width: 300px;
    height: 300px;
  }

  .center-section {
    padding-top: 1rem;
    padding-bottom: 2rem;
    gap: 1.5rem;
  }
}

/* Geniş ekranlar için iyileştirme */
@media (min-width: 1440px) {
  .profile-photo-shadowed {
    width: 520px;
    height: 520px;
  }

  .about-title {
    font-size: 2rem;
  }

  .about-text {
    font-size: 1.2rem;
  }

  .project-btn {
    font-size: 1.1rem;
    padding: 1rem 2rem;
  }

  .icon-img {
    width: 32px;
    height: 32px;
  }

  .center-section {
    max-width: 500px;
    gap: 2rem;
  }
}

.gradient-text {
  background-image: url('/bgturuncu.webp');
  background-size: cover;
  background-position: center;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-weight: bold;
  display: inline-block;
}
</style>
