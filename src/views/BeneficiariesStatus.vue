B<template>
  <section class="flex flex-col h-full w-full bg-[#f5f7fb] text-gray-800 px-6 sm:px-8 py-6">
    <header class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold">Αναλυτικά Στοιχεία Δικαιούχου</h1>
        <p class="text-sm text-gray-500">
          Παρακάτω μπορείς να δεις αναλυτικά και να διαχειριστείς όλα τα στοιχεία του δικαιούχου που επέλεξες.
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

    <div v-if="beneficiary" class="space-y-5">
      <div class="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-base font-semibold text-gray-800">Προσωπικά Στοιχεία</h2>

          <div class="flex items-center gap-2 text-xs">
            <span class="text-gray-500">Κατάσταση:</span>
            <span
                class="px-2 py-0.5 rounded-full font-medium"
                :class="beneficiary.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'"
            >
              {{ beneficiary.status === 'active' ? 'Ενεργός' : 'Ανενεργός' }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="text-xs text-gray-500">Ονοματεπώνυμο</label>
            <input class="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50" :value="beneficiary.fullname" readonly />
          </div>
          <div>
            <label class="text-xs text-gray-500">Κινητό τηλέφωνο</label>
            <input class="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50" :value="beneficiary.mobile" readonly />
          </div>
          <div>
            <label class="text-xs text-gray-500">ΑΔΤ</label>
            <input class="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50" :value="beneficiary.adt" readonly />
          </div>
          <div>
            <label class="text-xs text-gray-500">ΑΜ</label>
            <input class="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50" :value="beneficiary.am" readonly />
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <button class="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50">
            Ορισμός ως Ανενεργός
          </button>
          <button class="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50">
            Διαγραφή δικαιούχου
          </button>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
        <h2 class="text-base font-semibold text-gray-800 mb-3">Στοιχεία Κάρτας</h2>

        <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-700 mb-3">
          <div class="flex items-center gap-2">
            <span class="text-gray-500">Κατάσταση</span>
            <span class="inline-flex items-center gap-1">
              <span class="w-2 h-2 rounded-full" :class="cardInfo.statusColor"></span>
              {{ cardInfo.statusText }}
            </span>
          </div>
          <div>
            <span class="text-gray-500">Ημερομηνία έκδοσης Κάρτας</span>
            <span class="ml-2 font-medium">{{ cardInfo.issuedAt }}</span>
          </div>
          <div>
            <span class="text-gray-500">Αριθμός Κάρτας</span>
            <span class="ml-2 font-medium">{{ cardInfo.masked }}</span>
          </div>
        </div>

        <!-- dropdown & actions -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-2">
          <button class="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50">
            Ιστορικό Κινήσεων
          </button>

          <div class="sm:ml-auto flex gap-2">
            <!-- ΕΔΩ: Φόρτιση Κάρτας (primary) -->
            <button class="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-[#2563eb] text-white shadow-sm hover:brightness-110">
              Φόρτιση Κάρτας
              <RiArrowGoBackLine class="w-4 h-4 rotate-180 opacity-80" />
            </button>

            <!-- ΕΔΩ: Παραγγελία νέας Κάρτας (secondary / disabled look) -->
            <button
                class="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-400 shadow-sm cursor-not-allowed"
                disabled
            >
              Παραγγελία νέας Κάρτας
              <span class="w-4 h-4 border border-gray-300 rounded-full inline-flex items-center justify-center">→</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Σχόλια -->
      <div class="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
        <label class="text-xs text-gray-500">Σχόλια</label>
        <textarea
            rows="3"
            placeholder="Εισάγαγε τις παρατηρήσεις σου"
            class="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
        ></textarea>

        <div class="mt-4 flex justify-end gap-2">
          <button class="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50">
            Καθαρισμός
          </button>
          <button class="px-3 py-2 text-sm rounded-lg bg-[#2563eb] text-white shadow-sm hover:brightness-110">
            Αποθήκευση αλλαγών
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 py-16">Δεν βρέθηκε δικαιούχος.</div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed, onMounted, reactive } from 'vue'
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

const cardInfo = computed(() => {
  const active = beneficiary.value?.hasCard
  return {
    statusText: active ? 'Charged' : 'Inactive',
    statusColor: active ? 'bg-green-500' : 'bg-gray-400',
    issuedAt: '14/02/2022',
    masked: '1234 **** **** 1234'
  }
})
</script>
