<template>
  <div class="contact-page">
    <section class="section-title">
      <h1>İletişim</h1>
      <div class="underline"></div>
    </section>

    <div class="contact-wrapper">
      <div class="left-column">
        <div class="media-card">
          <img :src="contactImage" alt="Profil Fotoğrafı" class="iletisim-img" />
        </div>

        <div class="info-box">
          <h2>İletişim Bilgileri</h2>
          <p><strong>📧 E-posta:</strong><br />@mail.com</p>
          <p><strong>🎓 Öğrenci E-posta:</strong><br>202410614007@ogr.balikesir.edu.tr<br />202410614007@baun.edu.tr</p>
          <p><strong>📱 Telefon:</strong><br />050. ... .. ..</p>
        </div>
      </div>

      <form ref="form" @submit.prevent="sendEmail" class="form-box">
        <div class="form-content">
          <div class="form-group">
            <label for="name">Ad Soyad</label>
            <input type="text" id="name" v-model="formData.name" required />
          </div>
          <div class="form-group">
            <label for="email">E-posta</label>
            <input type="email" id="email" v-model="formData.email" required />
          </div>
          <div class="form-group">
            <label for="subject">Konu</label>
            <input type="text" id="subject" v-model="formData.subject" required />
          </div>
          <div class="form-group">
            <label for="message">Mesaj</label>
            <textarea id="message" v-model="formData.message" rows="5" required placeholder="Mesajınızı yazınız..."></textarea>
          </div>
        </div>
        <button type="submit" class="send-btn">Gönder</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import emailjs from '@emailjs/browser'

const form = ref(null)
const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Tema durumunu izle
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

// Resmi temaya göre seç
const contactImage = computed(() =>
  isDarkMode.value
    ? import.meta.env.BASE_URL + 'iletisim-dark.webp'
    : import.meta.env.BASE_URL + 'iletisim.webp'
)

const sendEmail = () => {
  emailjs
    .send(
      'service_hvhsw8z',
      'template_41hxe15',
      formData.value,
      '7X1HBuU5_sOvQgF_H'
    )
    .then(() => {
      alert('Mesaj başarıyla gönderildi!')
      formData.value = { name: '', email: '', subject: '', message: '' }
    })
    .catch((error) => {
      alert('Mesaj gönderilemedi: ' + error.text)
    })
}
</script>

<style scoped>
.contact-page {
  background-color: #ffffff;
  padding: 0 1.5rem;
  font-family: 'Poppins', sans-serif;
  color: #222;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  transition: background-color 0.3s ease;
}

.section-title {
  text-align: center;
  margin-top: 3rem;
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



.contact-wrapper {
  --left-card: clamp(260px, 28vw, 340px);
  --right-card: clamp(340px, 38vw, 460px);
  display: grid;
  grid-template-columns: var(--left-card) var(--right-card);
  gap: 2rem;
  justify-content: center;
  align-items: start;
  width: 100%;
  max-width: calc(var(--left-card) + var(--right-card) + 2rem);
  margin: 0 auto;
  padding-bottom: 3rem;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  align-self: stretch;
}

.left-column > * {
  width: 100%;
  max-width: var(--left-card);
}

.media-card,
.info-box,
.form-box {
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  background-color: #fdfdfd;
  aspect-ratio: 1 / 1;
  width: 100%;
}

.media-card {
  position: relative;
  overflow: hidden;
}

.iletisim-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.media-card:hover .iletisim-img {
  transform: scale(1.04);
}

.info-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1.75rem;
}


.info-box h2 {
  color: #000;
  font-size: 1.15rem;
  margin: 0;
}

.info-box p {
  margin: 0;
  font-size: 0.92rem;
  color: #444;
  line-height: 1.45;
}

.info-box strong {
  color: #000;
  font-weight: 600;
}


.form-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.25rem;
  padding: 2rem;
  transition: background-color 0.3s ease, color 0.3s ease;
  overflow: hidden;
  align-self: stretch;
  max-width: var(--right-card);
  aspect-ratio: 1 / 1;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
}

.form-content {
  scrollbar-width: thin;
}

.form-content::-webkit-scrollbar {
  width: 6px;
}

.form-content::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 3px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin: 0;
}

label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
}

input,
textarea {
  padding: 0.75rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: #fff;
  color: #222;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #ffcc00;
  box-shadow: 0 0 0 3px rgba(255, 204, 0, 0.25);
}

textarea {
  min-height: 120px;
  resize: vertical;
}

textarea::placeholder {
  color: #aaa;
}

.send-btn {
  background-color: #ffcc00;
  color: #000;
  border: none;
  padding: 0.9rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.send-btn:hover {
  background-color: #e6b800;
}

/* DARK MODE */
.dark .contact-page {
  background-color: #111;
  color: #f0f0f0;
}

.dark .media-card,
.dark .info-box,
.dark .form-box {
  background-color: #1e1e1e;
  color: #f0f0f0;
  box-shadow: 0 0 0 1px #333, 0 8px 24px rgba(255, 255, 255, 0.05);
}

.dark label,
.dark .info-box strong {
  color: #f0f0f0;
}

.dark textarea::placeholder {
  color: #aaa;
}

.dark input,
.dark textarea {
  background-color: #2a2a2a;
  color: #f0f0f0;
  border-color: #444;
}

/* Responsive */
@media (max-width: 1200px) {
  .contact-wrapper {
    --left-card: clamp(240px, 33vw, 300px);
    --right-card: clamp(320px, 45vw, 420px);
  }
}

@media (max-width: 820px) {
  .contact-wrapper {
    grid-template-columns: minmax(260px, 1fr);
    grid-auto-rows: auto;
    max-width: 480px;
    gap: 1.75rem;
    padding: 0 1rem 2.5rem;
  }

  .media-card,
  .info-box,
  .form-box {
    height: auto;
    aspect-ratio: auto;
    max-width: none;
  }

  .left-column > * {
    max-width: none;
  }

  .form-box {
    padding: 1.75rem;
  }

  .info-box {
    padding: 1.75rem;
  }

  input,
  textarea {
    font-size: 0.95rem;
  }

  .send-btn {
    padding: 0.85rem 1.8rem;
  }
}

.dark .section-title h1 {
  color: #f0f0f0;
}

.dark .info-box h2 {
  color: #f0f0f0;
}

.dark .info-box p {
  color: #dddddd;
}

.dark .iletisim-img {
  border: 1.5px solid #444;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
}
</style>
