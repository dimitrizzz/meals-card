<template>
  <section class="flex flex-col h-full w-full bg-[#f5f7fb] text-gray-800 px-6 sm:px-8 py-6">
    <div class="flex w-full">
      <header class="mb-6 flex items-center justify-between w-full">
        <div>
          <h1 class="text-xl font-semibold">Προβολή και διαχείριση Δικαιούχων</h1>
          <p class="text-sm text-gray-500">
            Παρακάτω μπορείς να δεις και να διαχειριστείς τη λίστα των δικαιούχων της εταιρείας σου.
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
    </div>

    <div class="bg-white w-full p-4 rounded-lg">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-indigo-600">
                <RiUserLine class="w-10 h-10" />
              </div>
              <span class="text-sm text-gray-600">Σύνολο δικαιούχων</span>
            </div>
            <div class="text-3xl font-semibold">{{ rows.length }}</div>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-emerald-600">
                <RiUserSmileLine class="w-8 h-8" />
              </div>
              <span class="text-sm text-gray-600">Ενεργοί δικαιούχοι</span>
            </div>
            <div class="text-3xl font-semibold">{{ activeCount }}</div>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-rose-600">
                <RiUserUnfollowLine class="w-8 h-8" />
              </div>
              <span class="text-sm text-gray-600">Ανενεργοί δικαιούχοι</span>
            </div>
            <div class="text-3xl font-semibold">{{ inactiveCount }}</div>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-sky-600">
                <RiBankCardLine class="w-8 h-8" />
              </div>
              <span class="text-sm text-gray-600">Δικαιούχοι χωρίς κάρτα</span>
            </div>
            <div class="text-3xl font-semibold">{{ withoutCardCount }}</div>
          </div>
        </div>
      </div>

      <div class="relative mb-4">
        <RiSearchLine class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
            v-model="search"
            type="text"
            placeholder="Αναζήτηση (όνομα, ΑΦΜ, ΑΔΤ, τηλέφωνο)"
            class="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 bg-white
           focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
        />
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4"
           v-if="filteredRows.length"
      >
        <div class="flex flex-wrap gap-2">
          <button
              class="px-3 py-2 text-sm rounded-lg border border-gray-200 shadow-sm transition-colors cursor-pointer"
              :class="tab === 'all' ? 'bg-[#eef6ff] text-sky-600 border-sky-600' : 'bg-gray-200 text-gray-700'"
              @click="tab = 'all'"
          >
            Όλοι οι δικαιούχοι
          </button>

          <button
              class="px-3 py-2 text-sm rounded-lg border border-gray-200 shadow-sm transition-colors cursor-pointer"
              :class="tab === 'active' ? 'bg-[#eef6ff] text-sky-600 border-sky-600' : 'bg-gray-200 text-gray-700'"
              @click="tab = 'active'"
          >
            Ενεργοί
          </button>

          <button
              class="px-3 py-2 text-sm rounded-lg border border-gray-200 shadow-sm transition-colors cursor-pointer"
              :class="tab === 'inactive' ? 'bg-[#eef6ff] text-sky-600 border-sky-600' : 'bg-gray-200 text-gray-700'"
              @click="tab = 'inactive'"
          >
            Ανενεργοί
          </button>

          <button
              class="px-3 py-2 text-sm rounded-lg border border-gray-200 shadow-sm transition-colors cursor-pointer"
              :class="tab === 'no-card' ? 'bg-[#eef6ff] text-sky-600 border-sky-600' : 'bg-gray-200 text-gray-700'"
              @click="tab = 'no-card'"
          >
            Χωρίς κάρτα
          </button>
        </div>

        <button
            class="inline-flex items-center gap-2 bg-[#2563eb] text-white text-sm px-4 py-2 rounded-lg shadow hover:brightness-110 whitespace-nowrap self-end sm:self-auto"
        >
          <RiDownloadLine class="w-4 h-4" />
          <span>Εξαγωγή</span>
        </button>
      </div>

      <div
          v-if="filteredRows.length === 0"
          class="py-16 text-center text-gray-500 flex flex-col items-center justify-center"
      >
        <h3 class="text-center text-gray-500 py-16">Δεν βρέθηκαν δικαιούχοι</h3>
      </div>

      <div v-else class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-50 text-gray-600">
          <tr>
            <th class="w-10 p-3 border-r border-gray-200">
              <input type="checkbox" :checked="allSelected" @change="toggleSelectAll" />
            </th>
            <th class="p-3 text-left border-r border-gray-200">ΑΜ</th>
            <th class="p-3 text-left border-r border-gray-200">ΑΔΤ</th>
            <th class="p-3 text-left border-r border-gray-200">Ονοματεπώνυμο</th>
            <th class="p-3 text-left border-r border-gray-200">Κινητό</th>
            <th class="p-3 text-left border-r border-gray-200">Κατάσταση</th>
            <th class="p-3 text-right">Ενέργειες</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="row in filteredRows"
              :key="row.id"
              :class="[
                'border-t border-gray-200 transition-colors',
                selected.includes(row.id)
                  ? 'bg-blue-100 hover:bg-blue-100'
                  : 'odd:bg-gray-50 hover:bg-gray-50'
              ]"
          >
            <td class="p-3 border-r border-gray-200">
              <input type="checkbox" v-model="selected" :value="row.id" />
            </td>
            <td class="p-3">{{ row.am }}</td>
            <td class="p-3">{{ row.adt }}</td>
            <td class="p-3">
              <RouterLink
                  :to="{ name: 'beneficiary-details', params: { id: row.id } }"
                  class="text-indigo-600 hover:underline"
              >
                {{ row.fullname }}
              </RouterLink>
            </td>

            <td class="p-3">{{ row.mobile }}</td>
            <td class="p-3">
                <span
                    class="px-2 py-1 rounded-full text-xs font-medium"
                    :class="
                    row.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  "
                >
                  {{ row.status === 'active' ? 'Ενεργός' : 'Ανενεργός' }}
                </span>
              <span
                  v-if="!row.hasCard"
                  class="ml-2 px-2 py-1 rounded-full text-xs bg-red-100 text-red-700"
              >Χωρίς κάρτα</span
              >
            </td>
            <td class="p-3 text-right">
              <button class="px-2 py-1 text-xs">
                <RiEditLine />
              </button>
              <button
                  class="px-2 py-1 text-xs rounded disabled:opacity-50 cursor-pointer"
                  :class="
                    row.hasCard
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-black hover:text-gray-500'
                  "
                  :disabled="row.hasCard"
              >
                <RiDeleteBinLine />
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4 flex flex-col sm:flex-row gap-3">
        <input
            v-model="note"
            type="text"
            placeholder="Ονομασία σε Λεγεωνάριο (προαιρετικό)"
            class="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
            class="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white shadow-sm disabled:opacity-50"
            :disabled="selected.length === 0"
            @click="bulkDelete"
        >
          Διαγραφή επιλεγμένων
        </button>
        <button
            class="px-3 py-2 text-sm rounded-lg bg-[#2563eb] text-white shadow-sm disabled:opacity-50"
            :disabled="selected.length === 0"
            @click="orderCards"
        >
          Παραγγελία Κάρτας
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  RiArrowGoBackLine,
  RiBankCardLine,
  RiDeleteBinLine,
  RiDownloadLine,
  RiEditLine,
  RiSearchLine,
  RiUserLine,
  RiUserSmileLine,
  RiUserUnfollowLine
} from '@remixicon/vue'
import { computed, reactive, ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import data from '@/data/benefitsData.json'

type Row = {
  id: number
  am: string
  adt: string
  fullname: string
  mobile: string
  status: 'active' | 'inactive'
  hasCard: boolean
}

const rows = reactive<Row[]>([])

onMounted(() => {
  rows.splice(0, rows.length, ...(data as Row[]))
})

const search = ref('')
const tab = ref<'all' | 'active' | 'inactive' | 'no-card'>('all')
const selected = ref<number[]>([])
const note = ref('')

const filteredRows = computed(() => {
  const q = search.value.trim().toLowerCase()
  return rows.filter(r => {
    const matchesTab =
        tab.value === 'all' ||
        (tab.value === 'active' && r.status === 'active') ||
        (tab.value === 'inactive' && r.status === 'inactive') ||
        (tab.value === 'no-card' && !r.hasCard)

    const inText =
        !q ||
        r.fullname.toLowerCase().includes(q) ||
        r.am.includes(q) ||
        r.adt.toLowerCase().includes(q) ||
        r.mobile.includes(q)

    return matchesTab && inText
  })
})

const activeCount = computed(() => rows.filter(r => r.status === 'active').length)
const inactiveCount = computed(() => rows.filter(r => r.status === 'inactive').length)
const withoutCardCount = computed(() => rows.filter(r => !r.hasCard).length)

const allSelected = computed(
    () =>
        filteredRows.value.length > 0 &&
        filteredRows.value.every(r => selected.value.includes(r.id))
)

const toggleSelectAll = () => {
  if (allSelected.value) {
    selected.value = selected.value.filter(
        id => !filteredRows.value.some(r => r.id === id)
    )
  } else {
    const add = filteredRows.value.map(r => r.id)
    selected.value = Array.from(new Set([...selected.value, ...add]))
  }
}

const bulkDelete = () => {
  const toDelete = new Set(selected.value)
  for (let i = rows.length - 1; i >= 0; i--) {
    if (toDelete.has(rows[i].id)) rows.splice(i, 1)
  }
  selected.value = []
}

const orderCards = () => {
  alert(
      `Παραγγελία κάρτας για IDs: ${selected.value.join(', ')}${
          note.value ? ` (Σημ: ${note.value})` : ''
      }`
  )
}
</script>
