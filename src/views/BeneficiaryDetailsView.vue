<template>
  <section class="flex flex-col h-full w-full bg-[#f5f7fb] text-gray-800 px-6 sm:px-8 py-6">
    <header class="mb-4 flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold">Αναλυτικά Στοιχεία Δικαιούχου</h1>
        <p class="text-sm text-gray-500">
          Παρακάτω μπορείς να δεις αναλυτικά και να διαχειριστείς τα στοιχεία του δικαιούχου.
        </p>
      </div>
      <RouterLink
          to="/beneficiaries"
          class="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 bg-white hover:bg-gray-50"
      >
        Επιστροφή
        <RiArrowGoBackLine class="w-4 h-4" />
      </RouterLink>
    </header>

    <div v-if="beneficiary" class="space-y-4">
      <div class="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <h2 class="font-semibold text-gray-800">Προσωπικά Στοιχεία</h2>
          <span
              class="px-2 py-1 rounded-full text-xs font-medium"
              :class="beneficiary.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'"
          >
            {{ beneficiary.status === 'active' ? 'Ενεργός' : 'Ανενεργός' }}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label class="text-xs text-gray-500">Ονοματεπώνυμο</label>
            <input class="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50" :value="beneficiary.fullname" readonly>
          </div>
          <div>
            <label class="text-xs text-gray-500">Κινητό τηλέφωνο</label>
            <input class="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50" :value="beneficiary.mobile" readonly>
          </div>
          <div>
            <label class="text-xs text-gray-500">ΑΔΤ</label>
            <input class="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50" :value="beneficiary.adt" readonly>
          </div>
          <div>
            <label class="text-xs text-gray-500">ΑΜ</label>
            <input class="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50" :value="beneficiary.am" readonly>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap gap-2">
          <button class="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white shadow-sm">Ορισμός ως Ανενεργός</button>
          <button class="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white shadow-sm" :disabled="beneficiary.hasCard">
            Διαγραφή δικαιούχου
          </button>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <h2 class="font-semibold text-gray-800">Στοιχεία Κάρτας</h2>
          <div class="flex items-center gap-2 text-sm">
            <span class="inline-flex items-center gap-1 text-emerald-600" v-if="beneficiary.hasCard">
              <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Active
            </span>
            <span class="inline-flex items-center gap-1 text-gray-500" v-else>
              <span class="w-2 h-2 rounded-full bg-gray-400 inline-block"></span> Χωρίς κάρτα
            </span>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <button class="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white shadow-sm">Ιστορικό Κινήσεων</button>
          <button class="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white shadow-sm" :disabled="!beneficiary.hasCard">
            Φόρτιση Κάρτας
          </button>
          <button class="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white shadow-sm" :disabled="beneficiary.hasCard">
            Παραγγελία νέας Κάρτας
          </button>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <label class="text-xs text-gray-500">Σχόλια</label>
        <textarea class="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 bg-white" rows="3" placeholder="Εισάγαγε τις παρατηρήσεις σου"></textarea>
        <div class="mt-3 flex gap-2 justify-end">
          <button class="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white shadow-sm">Καθαρισμός</button>
          <button class="px-3 py-2 text-sm rounded-lg bg-[#2563eb] text-white shadow-sm">Αποθήκευση αλλαγών</button>
        </div>
      </div>
    </div>

    <div v-else class="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
      Δεν βρέθηκε δικαιούχος.
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { onMounted, reactive, computed } from 'vue'
import data from '@/data/benefitsData.json'
import { RiArrowGoBackLine } from '@remixicon/vue'

type Row = {
  id: number
  am: string
  adt: string
  fullname: string
  mobile: string
  status: 'active' | 'inactive'
  hasCard: boolean
}

const route = useRoute()
const rows = reactive<Row[]>([])
onMounted(() => {
  rows.splice(0, rows.length, ...(data as Row[]))
})

const id = computed(() => Number(route.params.id))
const beneficiary = computed(() => rows.find(r => r.id === id.value))
</script>
