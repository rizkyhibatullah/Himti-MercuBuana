<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import FooterSection from '../components/FooterSection.vue'

// --- DATA KONFIGURASI WAKTU ---
const REG_CLOSE_DATE = new Date('2026-04-14T23:59:59').getTime() // Selasa
const DEPARTURE_DATE = new Date('2026-04-16T07:00:00').getTime() // Kamis

// --- DATA TIMELINE (100% Sesuai Proposal) ---
const timelineItems = ref([
  {
    date: '16 April 2026 (07.00 - 07.30)',
    title: 'Kumpul & Persiapan',
    desc: 'Berkumpul di Masjid Universitas Mercu Buana.',
  },
  {
    date: '16 April 2026 (07.30 - 08.00)',
    title: 'Absensi',
    desc: 'Absensi peserta dan panitia.',
  },
  {
    date: '16 April 2026 (08.00 - 09.00)',
    title: 'Keberangkatan',
    desc: 'Berangkat di Perjalanan menuju lokasi.',
  },
  {
    date: '16 April 2026 (09.00 - 09.15)',
    title: 'Tiba di Lokasi',
    desc: 'Sampai ke Tempat Tujuan (Kantor Blu By BCA Digital).',
  },
  {
    date: '16 April 2026 (09.15 - 12.00)',
    title: 'Acara Utama',
    desc: 'Acara dimulai (Pemaparan materi dan kunjungan industri).',
  },
  {
    date: '16 April 2026 (12.00 - 12.15)',
    title: 'Penutupan Acara',
    desc: 'Acara Selesai.',
  },
  {
    date: '16 April 2026 (12.10 - 12.30)',
    title: 'Persiapan Pulang',
    desc: 'Persiapan kembali ke Mercu Buana.',
  },
  {
    date: '16 April 2026 (13.00 - 13.30)',
    title: 'Tiba di Kampus',
    desc: 'Sampai ke Universitas Mercu Buana.',
  },
])

// --- LOGIC COUNTDOWN DINAMIS ---
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const countdownLabel = ref('')
const isRegistrationOpen = ref(true)
let timerInterval = null

const updateCountdown = () => {
  const now = new Date().getTime()

  let targetDate
  if (now < REG_CLOSE_DATE) {
    targetDate = REG_CLOSE_DATE
    countdownLabel.value = 'Pendaftaran Ditutup Dalam'
    isRegistrationOpen.value = true
  } else {
    targetDate = DEPARTURE_DATE
    countdownLabel.value = 'Waktu Menuju Keberangkatan'
    isRegistrationOpen.value = false
  }

  const distance = targetDate - now

  if (distance < 0) {
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    if (now > DEPARTURE_DATE)
      countdownLabel.value = 'Acara Sedang Berlangsung / Selesai'
    return
  }

  days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
  hours.value = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
}

onMounted(() => {
  updateCountdown()
  timerInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<template>
  <div
    class="flex min-h-screen flex-col justify-between overflow-x-hidden bg-[#1e002e] font-sans text-white"
  >
    <div class="flex-grow">
      <div class="container relative z-0 mx-auto px-4 pb-20 pt-40 text-center">
        <h1 class="mb-4 text-4xl font-bold text-white md:text-5xl">
          Company Visit ke blu by BCA Digital
        </h1>

        <p class="mb-8 text-lg font-medium text-purple-400">
          Waktu Keberangkatan: Kamis, 16 April 2026 | 07.00 WIB
        </p>

        <p class="mx-auto mb-12 max-w-3xl px-4 leading-relaxed text-gray-300">
          Mengusung tema
          <strong
            >"Inovasi Artificial Intelligence dan Strategi Cyber Security dalam
            Pengembangan Sistem Perbankan Digital"</strong
          >, kegiatan ini bertujuan memberikan wawasan langsung mengenai
          penerapan teknologi AI dan keamanan siber dalam layanan digital
          banking modern.
        </p>

        <h2 class="mb-8 text-2xl font-semibold text-white">
          {{ countdownLabel }}
        </h2>

        <div class="mb-10 flex flex-wrap justify-center gap-4">
          <div
            class="w-24 rounded-xl border border-purple-500/30 bg-[#4c1d95] p-4 shadow-lg md:w-32"
          >
            <div class="text-3xl font-bold md:text-4xl">{{ days }}</div>
            <div class="mt-1 text-xs uppercase tracking-wider">Hari</div>
          </div>
          <div
            class="w-24 rounded-xl border border-purple-500/30 bg-[#4c1d95] p-4 shadow-lg md:w-32"
          >
            <div class="text-3xl font-bold md:text-4xl">{{ hours }}</div>
            <div class="mt-1 text-xs uppercase tracking-wider">Jam</div>
          </div>
          <div
            class="w-24 rounded-xl border border-purple-500/30 bg-[#4c1d95] p-4 shadow-lg md:w-32"
          >
            <div class="text-3xl font-bold md:text-4xl">{{ minutes }}</div>
            <div class="mt-1 text-xs uppercase tracking-wider">Menit</div>
          </div>
          <div
            class="w-24 rounded-xl border border-purple-500/30 bg-[#4c1d95] p-4 shadow-lg md:w-32"
          >
            <div class="text-3xl font-bold md:text-4xl">{{ seconds }}</div>
            <div class="mt-1 text-xs uppercase tracking-wider">Detik</div>
          </div>
        </div>

        <div v-if="isRegistrationOpen">
          <a
            href="#"
            target="_blank"
            class="inline-block transition-transform hover:-translate-y-1"
          >
            <button
              class="rounded-full border border-purple-400 bg-[#5b21b6] px-10 py-3 font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all hover:bg-[#4c1d95]"
            >
              Daftar Disini
            </button>
          </a>
        </div>
        <div v-else>
          <span
            class="inline-block rounded-full border border-red-500/50 bg-red-500/20 px-8 py-3 font-bold text-red-400"
          >
            Pendaftaran Sudah Ditutup
          </span>
        </div>

        <div class="mt-16 animate-bounce opacity-70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mx-auto h-10 w-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      <div class="relative overflow-hidden rounded-t-[3rem] bg-[#3c1e70] py-20">
        <div class="container mx-auto px-4">
          <h2 class="mb-4 text-center text-3xl font-bold md:text-4xl">
            Rundown Kegiatan
          </h2>
          <div
            class="mx-auto mb-16 h-1 w-24 rounded-full bg-purple-400/50"
          ></div>

          <div class="relative mx-auto max-w-6xl">
            <div
              class="absolute left-4 top-2 h-full w-0.5 bg-purple-300/30 md:left-1/2 md:-translate-x-1/2 md:transform"
            ></div>

            <div class="space-y-12">
              <div
                v-for="(item, index) in timelineItems"
                :key="index"
                class="relative flex flex-col items-start md:flex-row md:items-center"
              >
                <div class="hidden justify-end pr-12 md:flex md:w-1/2">
                  <div
                    class="whitespace-nowrap rounded-full border border-purple-400/20 bg-[#6d44a0] px-6 py-3 text-sm font-semibold shadow-md"
                  >
                    {{ item.date }}
                  </div>
                </div>

                <div
                  class="absolute left-4 z-10 h-4 w-4 rounded-full border-4 border-[#3c1e70] bg-[#a855f7] shadow-lg md:left-1/2 md:h-5 md:w-5 md:-translate-x-1/2 md:transform"
                ></div>

                <div class="hidden pl-12 text-left md:block md:w-1/2">
                  <h3 class="mb-1 text-lg font-bold text-white">
                    {{ item.title }}
                  </h3>
                  <p
                    class="text-sm font-medium leading-relaxed text-gray-200 md:text-base"
                  >
                    {{ item.desc }}
                  </p>
                </div>

                <div class="w-full pl-12 md:hidden">
                  <div
                    class="mb-2 inline-block rounded-full border border-purple-400/20 bg-[#6d44a0] px-4 py-2 text-xs font-semibold"
                  >
                    {{ item.date }}
                  </div>
                  <h3 class="mb-1 text-lg font-bold text-white">
                    {{ item.title }}
                  </h3>
                  <p class="mt-1 text-sm leading-relaxed text-gray-200">
                    {{ item.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterSection />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
div {
  font-family: 'Poppins', sans-serif;
}
</style>
