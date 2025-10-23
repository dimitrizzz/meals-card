<template>
  <section class="w-full">
    <header class="mb-5">
      <h1 class="text-xl font-semibold">Συχνές ερωτήσεις</h1>
      <p class="text-sm text-gray-500">
        Έχεις απορίες; Δες τις πιο συχνές ερωτήσεις για να βρεις εύκολα και γρήγορα αυτό που χρειάζεσαι.
      </p>
    </header>

    <div class="mb-4">
      <label class="sr-only" for="faq-search">Αναζήτηση</label>
      <div
          class="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-200"
      >
        <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
          <path d="M21 21l-4.3-4.3m1.3-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input
            id="faq-search"
            v-model="q"
            type="search"
            placeholder="Αναζήτηση"
            class="w-full bg-transparent outline-none text-sm"
        />
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-100">
      <div
          v-for="(item, idx) in filteredFaqs"
          :key="item.id"
          class="p-0"
      >
        <button
            class="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-4 text-left"
            @click="toggle(idx)"
            :aria-expanded="isOpen(idx)"
        >
          <span class="font-medium text-[15px] leading-5">
            {{ idx + 1 }}. {{ item.question }}
          </span>
          <RiArrowDownSLine
              class="w-5 h-5 shrink-0 text-gray-500 transition-transform duration-200"
              :class="isOpen(idx) ? 'rotate-180' : ''"
          />
        </button>

        <transition name="faq" enter-active-class="transition duration-200"
                    leave-active-class="transition duration-150">
          <div v-show="isOpen(idx)" class="px-4 sm:px-5 pb-5 -mt-1 text-[14px] leading-6 text-gray-700">
            <p v-for="(p, i) in ensureArray(item.answer)" :key="i" class="mb-3 last:mb-0">
              {{ p }}
            </p>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RiArrowDownSLine } from '@remixicon/vue'
import faqs from '@/data/faq.json'

const q = ref('')

const filteredFaqs = computed(() => {
  const term = q.value.trim().toLowerCase()
  if (!term) return faqs
  return faqs.filter(f =>
      (f.question + ' ' + (Array.isArray(f.answer) ? f.answer.join(' ') : f.answer))
          .toLowerCase().includes(term)
  )
})

const openSet = ref(new Set())
function toggle(idx) {
  const s = new Set(openSet.value)
  s.has(idx) ? s.delete(idx) : s.add(idx)
  openSet.value = s
}
const isOpen = (idx) => openSet.value.has(idx)

const ensureArray = (val) => Array.isArray(val) ? val : [val]
</script>
