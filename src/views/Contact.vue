<template>
  <div class="contact-page">
    <section class="section-title">
      <h1>İletişim</h1>
      <div class="underline"></div>
    </section>

    <div class="contact-wrapper">
      <!-- Sol kısım -->
      <div class="left-side">
        <img :src="contactImage" alt="Profil Fotoğrafı" class="iletisim-img" />

        <div class="info-box">
          <h2>İletişim Bilgileri</h2>
          <p><strong>📧 E-posta:</strong><br />@mail.com</p>
          <p><strong>🎓 Öğrenci E-posta:</strong><br />202410614007@baun.edu.tr</p>
          <p><strong>📱 Telefon:</strong><br />050. ... .. ..</p>
        </div>
      </div>

      <!-- Sağ kısım -->
      <form ref="form" @submit.prevent="sendEmail" class="form-box">
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
  isDarkMode.value ? '/iletisim-dark.webp' : '/iletisim.webp'
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
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
  padding-bottom: 3rem;
}

.left-side {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 400px;
  flex: 1;
}

.iletisim-img {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease, border 0.3s ease;
}

.info-box {
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.info-box h2 {
  color: #000;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.info-box p {
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #444;
  line-height: 1.5;
}

.info-box strong {
  color: #000;
  font-weight: 600;
}

.form-box {
  background-color: #ffffff;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  width: 100%;
  flex: 1;
  min-width: 700px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 750px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
}

input,
textarea {
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

textarea {
  resize: vertical;
  max-height: 150px;
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

.dark .form-box,
.dark .info-box {
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
@media (max-width: 768px) {
  .contact-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 1rem;
  }

  .left-side,
  .form-box {
    width: 100%;
    max-width: 100%;
    padding: 0;
  }

  .form-box {
    min-width: auto;
    height: auto;
  }

  .form-box {
    padding: 1.5rem;
    min-width: auto;
    height: auto;
    box-sizing: border-box;
  }

  .iletisim-img {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .form-group label {
    font-size: 0.95rem;
  }

  input,
  textarea {
    font-size: 0.95rem;
  }

  .send-btn {
    padding: 0.8rem;
    font-size: 1rem;
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
