<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { Icon } from '@iconify/vue/dist/iconify.js'

const route = useRoute()
const router = useRouter()

const navItems = computed(() => {
  const pageSpecificItems = {
    Home: [
      { name: 'Home', path: '#' },
      { name: 'About', path: '/about' },
      { name: 'Program', path: '/program' },
      { name: 'Members', path: '/team' },
      { name: 'Contact us', path: '#contact' },
    ],
    Program: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Program', path: '#' },
      { name: 'Members', path: '/team' },
      { name: 'Contact us', path: '/#contact' },
    ],
    Blog: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Program', path: '/program' },
      { name: 'Members', path: '#team' },
      { name: 'Contact us', path: '/#contact' },
    ],
    About: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '#' },
      { name: 'Program', path: '/program' },
      { name: 'Members', path: '/team' },
      { name: 'Contact us', path: '/#contact' },
    ],
    Default: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Program', path: '/program' },
      { name: 'Members', path: '/team' },
      { name: 'Contact us', path: '/#contact' },
    ],
  }
  return pageSpecificItems[route.name] || pageSpecificItems['Default']
})

const handleNav = (path) => {
  if (path.startsWith('#')) {
    if (route.path !== '/') {
      router.push('/').then(() => {
        setTimeout(() => {
          const el = document.querySelector(path)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      })
    } else {
      const el = document.querySelector(path)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  } else if (path.startsWith('/#')) {
    const hash = path.slice(1)
    if (route.path !== '/') {
      router.push('/').then(() => {
        setTimeout(() => {
          const el = document.querySelector(hash)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      })
    } else {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    router.push({ path, hash: '' })
  }
}
</script>

<template>
  <section class="bg-gray-900">
    <div
      class="mx-auto max-w-screen-xl space-y-8 overflow-hidden px-4 py-12 sm:px-6 lg:px-8"
    >
      <nav class="-mx-5 -my-2 flex flex-wrap justify-center">
        <div v-for="(item, index) in navItems" :key="index" class="px-5 py-2">
          <a
            :href="item.path"
            @click.prevent="handleNav(item.path)"
            class="text-base leading-6 text-gray-500 transition-colors hover:text-main-4"
          >
            {{ item.name }}
          </a>
        </div>
      </nav>

      <div class="mt-8 flex justify-center space-x-6">
        <a href="#" class="text-gray-400 transition-colors hover:text-main-4">
          <span class="sr-only">Facebook</span>
          <Icon icon="simple-icons:facebook" width="23" height="23" />
        </a>
        <a href="https://www.instagram.com/himti_mercubuana/" class="text-gray-400 transition-colors hover:text-main-4">
          <span class="sr-only">Instagram</span>
          <Icon icon="simple-icons:instagram" width="23" height="23" />
        </a>
        <a href="#" class="text-gray-400 transition-colors hover:text-main-4">
          <span class="sr-only">Twitter</span>
          <Icon icon="simple-icons:twitter" width="23" height="23" />
        </a>
        <a href="#" class="text-gray-400 transition-colors hover:text-main-4">
          <span class="sr-only">GitHub</span>
          <Icon icon="simple-icons:github" width="23" height="23" />
        </a>
        <a href="https://www.linkedin.com/company/himti/" class="text-gray-400 transition-colors hover:text-main-4">
          <span class="sr-only">Linkedin</span>
          <Icon icon="simple-icons:linkedin" width="23" height="23" />
        </a>
      </div>

      <p class="mt-8 text-center text-sm leading-6 text-gray-400 lg:text-base">
        © 2025 HIMTI Mercu Buana, Inc. All rights reserved.
      </p>
    </div>
  </section>
</template>

<style scoped></style>
