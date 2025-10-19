<template>
  <div class="card" @click="navigate">
    <div class="image-wrapper">
      <img :src="img" :alt="title"/>
    </div>
    <div class="desc">
      <h3>{{ title }}</h3>
      <p>{{ excerpt }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  title: String,
  excerpt: String,
  img: String,
  id: [String, Number]
})

const router = useRouter()
function navigate() {
  router.push({ name: 'ProjectDetail', params: { id: props.id } })
}
</script>

<style scoped>
.card {
  cursor: pointer;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}
.image-wrapper {
  width: 100%;
  padding-top: 100%; /* kare */
  position: relative;
  overflow: hidden;
}
.image-wrapper img {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.desc {
  padding: 0.75rem;
  height: calc(50%); /* görselin yarısı kadar */
  overflow: hidden;
}
.desc h3 {
  margin: 0;
  font-size: 1.1rem;
}
.desc p {
  font-size: 0.9rem;
  color: #555;
  margin-top: 0.5rem;
}
</style>
