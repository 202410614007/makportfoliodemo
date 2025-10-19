<template>
  <div class="card">
    <img :src="image" alt="project image" />
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  image: String,
  title: String,
  description: String,
})
</script>

<style scoped>
.card {
  border: 2px solid var(--color-primary);
  background-color: var(--color-secondary);
  color: var(--color-primary);
  padding: 1rem;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  transition: transform 0.3s ease;
  cursor: pointer;
}
.card:hover {
  transform: scale(1.05);
}
.card img {
  width: 100%;
  border-radius: 4px;
  margin-bottom: 1rem;
}
</style>
