import { createRouter, createWebHistory } from 'vue-router'

// Sayfa bileşenlerini içe aktar
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Projects from '@/views/Projects.vue'
import Blog from '@/views/Blog.vue'
import Contact from '@/views/Contact.vue'

const routes = [
  {
    path: '/',
    component: Home,
    meta: { title: 'Anasayfa | Muhammed Ali' }
  },
  {
    path: '/about',
    component: About,
    meta: { title: 'Hakkımda | Muhammed Ali' }
  },
  {
    path: '/projects',
    component: Projects,
    meta: { title: 'Projeler | Muhammed Ali' }
  },
  {
    path: '/blog',
    component: Blog,
    meta: { title: 'Blog | Muhammed Ali' }
  },
  {
    path: '/contact',
    component: Contact,
    meta: { title: 'İletişim | Muhammed Ali' }
  },
  {
    path: '/project/:id',
    name: 'ProjectDetail',
    component: () => import('@/views/ProjectDetail.vue'),
    meta: { title: 'Proje Detayı | Muhammed Ali' }
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: () => import('@/views/BlogDetail.vue'),
    meta: { title: 'Blog Detayı | Muhammed Ali' }
  },
]

const router = createRouter({
  history: createWebHistory('/makportfoliodemo/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 } // Her sayfada yukarıdan başla
  }
})

// Sekme başlığını güncelle
router.beforeEach((to, from, next) => {
  const defaultTitle = 'Muhammed Ali'
  document.title = to.meta.title || defaultTitle
  next()
})

export default router
