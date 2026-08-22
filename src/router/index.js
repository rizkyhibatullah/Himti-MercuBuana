import { createRouter, createWebHistory } from 'vue-router'

// Menggunakan lazy loading untuk setiap halaman
const Home = () => import('../pages/Home.vue')
const Blog = () => import('../pages/Blog.vue')
const Event = () => import('../pages/EventPages.vue')
const EventDetail = () => import('../pages/EventDetail.vue')
const ProgramPage = () => import('../pages/ProgramPages.vue')
const FktiPages = () => import('../pages/FktiPages.vue')
const KelascorePages = () => import('../pages/KelascorePages.vue')

// TAMBAHKAN IMPORT COMPANY VISIT DISINI
const CompanyVisitPages = () => import('../pages/CompanyVisitPages.vue')

const Team = () => import('../pages/MemberPages.vue')
const SeminarITPages = () => import('../pages/SeminarITPages.vue')
const PostDetail = () => import('../pages/PostDetail.vue')
const NotFound = () => import('../components/state/NotFound.vue')
const ComingSoon = () => import('../components/state/ComingSoon.vue')
const AboutPages = () => import('../pages/AboutPages.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPages,
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
  },
  {
    path: '/post/:id(\\d+)',
    name: 'PostDetail',
    component: PostDetail,
    props: true,
  },
  {
    path: '/program',
    name: 'Program',
    component: ProgramPage,
  },
  {
    path: '/event',
    name: 'Event',
    component: Event,
    props: (route) => ({
      category: route.query.category,
      type: route.query.type,
      search: route.query.search,
      date: route.query.date,
    }),
  },
  {
    path: '/event/:slug',
    name: 'EventDetail',
    component: EventDetail,
    props: true,
  },
  {
    path: '/team',
    name: 'Team',
    component: Team,
  },
  {
    path: '/fkti',
    name: 'FktiPages',
    component: ComingSoon,
  },
  {
    path: '/program/kelas-core',
    name: 'KelascorePages',
    component: KelascorePages,
  },

  // ROUTE BARU UNTUK COMPANY VISIT
  {
    path: '/program/company-visit',
    name: 'CompanyVisitPages',
    component: CompanyVisitPages,
  },

  {
    path: '/seminarit',
    name: 'SeminarITPages',
    component: ComingSoon,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return { ...savedPosition, behavior: 'smooth' }
    }
    if (to.path === from.path) {
      return { element: to.hash, behavior: 'smooth' }
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, from, next) => {
  document.title = `${to.name} - Himti Mercu Buana` || 'Himti Mercu Buana'
  next()
})

router.afterEach(() => {})

export default router
