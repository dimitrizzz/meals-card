<template>
  <section class="flex flex-col h-full w-full bg-[#f5f7fb] text-gray-800 px-6 lg:px-8 py-6">
    <header class="mb-4">
      <h1 class="text-xl font-semibold">Ιστορικό Φορτίσεων</h1>
      <p class="text-sm text-gray-500">
        Δες τις φορτίσεις που έγιναν, κατέβασε τα reports που χρειάζεσαι και επανάλαβε μαζικά φορτίσεις.
      </p>
    </header>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
      <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <div class="flex items-center gap-2 text-gray-500 text-sm mb-2">
          <RiCalendarLine class="w-5 h-5"/>
          <span>Συνολικές φορτίσεις</span>
        </div>
        <div class="text-3xl md:text-4xl font-semibold">{{ kpis.totalCount }}</div>
      </div>

      <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <div class="flex items-center gap-2 text-gray-500 text-sm mb-2">
          <RiCheckboxCircleLine class="w-5 h-5 text-emerald-500"/>
          <span>Επιτυχείς φορτίσεις</span>
        </div>
        <div class="text-3xl md:text-4xl font-semibold">{{ kpis.successCount }}</div>
      </div>

      <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <div class="flex items-center gap-2 text-gray-500 text-sm mb-2">
          <RiCloseCircleLine class="w-5 h-5 text-rose-500"/>
          <span>Αποτυχημένες φορτίσεις</span>
        </div>
        <div class="text-3xl md:text-4xl font-semibold">{{ kpis.failedCount }}</div>
      </div>

      <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <div class="flex items-center gap-2 text-gray-500 text-sm mb-2">
          <RiMoneyEuroCircleLine class="w-5 h-5"/>
          <span>Συνολικό ποσό φορτίσεων</span>
        </div>
        <div class="text-3xl md:text-4xl font-semibold">{{ formatCurrency(kpis.totalAmount) }}</div>
      </div>
    </div>

    <div class="bg-white border border-gray-200 rounded-3xl shadow-sm p-4 md:p-5">
      <div class="flex flex-col lg:justify-between gap-3 mb-3">
        <div class=" flex gap-3 justify-between">
          <div class="relative">
            <input
                v-model="search"
                type="text"
                placeholder="Αναζήτησε φόρτιση…"
                class="w-full text-sm border border-gray-300 bg-white rounded-lg pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200 placeholder-gray-400"
            />
            <RiSearchLine class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
          </div>

          <div class="flex items-center gap-2 ">
            <input
                v-model="dateFrom"
                type="date"
                class="text-sm border border-gray-300 bg-white rounded-lg px-2 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <span class="text-gray-400 text-sm">–</span>
            <input
                v-model="dateTo"
                type="date"
                class="text-sm border border-gray-300 bg-white rounded-lg px-2 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
            />

            <div class="hidden md:flex items-center gap-1 ml-1">
              <button
                  class="px-2.5 py-1.5 text-xs rounded-md border border-gray-300"
                  :class="period === '15d' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700'"
                  @click="period = '15d'"
              >
                15ήμερο
              </button>
              <button
                  class="px-2.5 py-1.5 text-xs rounded-md border border-gray-300"
                  :class="period === 'month' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700'"
                  @click="period = 'month'"
              >
                Μήνας
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2 ">
          <button
              v-for="t in tabs"
              :key="t.value"
              @click="activeTab = t.value"
              class="px-3 py-1.5 rounded-lg text-sm border transition"

              :class="activeTab === t.value
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'"
          >
            {{ t.label }}
          </button>
          <div class="flex items-center gap-1 ml-2">
            <button
                class="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] text-white text-sm px-3 py-2 shadow hover:brightness-110"
                @click="exportAs('all')"
            >
              <RiDownloadLine class="w-4 h-4"/>
              <span class="hidden sm:inline">Εξαγωγή</span>
            </button>
          </div>
        </div>


      </div>

      <div
          v-for="group in grouped"
          :key="group.key"
          :class="[
          'rounded-2xl border bg-white p-0 overflow-hidden mb-4 transition-colors',
          open[group.key] ? 'border-blue-300 shadow-[0_0_0_1px_rgba(59,130,246,0.15)]' : 'border-indigo-100'
        ]"
      >
        <button
            type="button"
            class="w-full flex items-center justify-between bg-indigo-50/40 px-4 py-3"
            @click="toggleGroup(group.key)"
        >
          <div class="flex items-center gap-4">
            <h3 class="text-sm md:text-base font-semibold tracking-wide">
              {{ group.title }}
            </h3>
            <div class="flex items-center gap-3 text-xs md:text-sm text-gray-600">
              <span class="flex items-center gap-1">
                <RiMoneyEuroCircleLine class="w-4 h-4"/>
                {{ formatCurrency(group.totalAmount) }}
              </span>
              <span class="flex items-center gap-1">
                <RiBankCardLine class="w-4 h-4"/>
                {{ group.count }} κάρτες
              </span>
            </div>
          </div>

          <div class="flex items-center gap-3">

            <RiArrowDownSLine
                class="w-5 h-5 text-gray-500 transition-transform duration-200"
                :class="open[group.key] ? 'rotate-180' : ''"
            />
          </div>
        </button>

        <transition name="accordion">
          <div v-show="open[group.key]" class="border-t border-gray-200">
            <div class="overflow-auto">
              <table class="min-w-[720px] w-full text-sm m-6 border border-gray-200 rounded-lg">
                <thead class="bg-white">
                <tr class="border border-gray-200 text-gray-500">
                  <th class="text-left font-medium px-4 py-3">ID συναλλαγής</th>
                  <th class="text-left font-medium px-4 py-3">Ονοματεπώνυμο</th>
                  <th class="text-left font-medium px-4 py-3">Ημερομηνία φόρτισης</th>
                  <th class="text-left font-medium px-4 py-3">Ποσό φόρτισης</th>
                  <th class="text-left font-medium px-4 py-3">Κατάσταση</th>
                  <th class="w-10"></th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="row in group.rows"
                    :key="row.id"
                    class="border-b border-gray-100 hover:bg-gray-50/60"
                >
                  <td class="px-4 py-3 font-mono text-gray-700">{{ row.id }}</td>
                  <td class="px-4 py-3">{{ row.name }}</td>
                  <td class="px-4 py-3 text-gray-700">{{ formatDateTime(row.datetime) }}</td>
                  <td class="px-4 py-3 font-semibold">{{ formatCurrency(row.amount) }}</td>
                  <td class="px-4 py-3">
                      <span
                          class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs"
                          :class="row.status === 'success'
                          ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                          : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'"
                      >
                        <span
                            class="inline-block w-1.5 h-1.5 rounded-full"
                            :class="row.status === 'success' ? 'bg-emerald-500' : 'bg-rose-500'"
                        />
                        {{ row.status === 'success' ? 'Επιτυχής' : 'Αποτυχημένη' }}
                      </span>
                  </td>
                </tr>

                <tr v-if="group.rows.length === 0">
                  <td colspan="6" class="px-4 py-6 text-center text-gray-500">
                    Δεν βρέθηκαν αποτελέσματα για τα φίλτρα που επέλεξες.
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="flex  justify-end mb-6">
              <span
                  class="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] text-white text-xs md:text-sm px-3 py-2 shadow hover:brightness-110"
                  @click.stop="duplicateGroup(group)"
              >
              Δημιουργία Αντιγράφου
            </span>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div v-if="grouped.length === 0" class="text-center text-gray-500 py-16">
        Δεν υπάρχουν φορτίσεις για τα επιλεγμένα φίλτρα
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  RiCalendarLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiMoneyEuroCircleLine,
  RiDownloadLine,
  RiSearchLine,
  RiBankCardLine,
  RiArrowDownSLine
} from '@remixicon/vue'
import {computed, reactive, ref, watch} from 'vue'

import topupsData from '@/data/history.json'

const search = ref('')
const activeTab = ref('all')
const dateFrom = ref('')
const dateTo = ref('')
const period = ref('month')

const tabs = [
  {value: 'all', label: 'Όλες οι φορτίσεις'},
  {value: 'success', label: 'Επιτυχείς φορτίσεις'},
  {value: 'failed', label: 'Αποτυχημένες φορτίσεις'}
]

const rows = reactive(topupsData.rows ?? [])

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return rows.filter(r => {
    const matchesSearch = !q || r.id.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
    const matchesTab =
        activeTab.value === 'all' ||
        (activeTab.value === 'success' && r.status === 'success') ||
        (activeTab.value === 'failed' && r.status === 'failed')

    const ts = new Date(r.datetime).getTime()
    const fromOk = !dateFrom.value || ts >= new Date(dateFrom.value).getTime()
    const toOk = !dateTo.value || ts <= new Date(dateTo.value + 'T23:59:59').getTime()

    return matchesSearch && matchesTab && fromOk && toOk
  })
})

const grouped = computed(() => {
  const map = new Map()
  for (const r of filtered.value) {
    const key = r.groupKey
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(r)
  }
  const arr = []
  for (const [key, list] of map.entries()) {
    const [y, m] = key.split('-')
    const title = `${monthName(m)} ${y}`
    const totalAmount = list.reduce((s, x) => s + x.amount, 0)
    arr.push({key, title, rows: list, count: list.length, totalAmount})
  }
  return arr.sort((a, b) => (a.key < b.key ? 1 : -1))
})

const kpis = computed(() => {
  const totalCount = filtered.value.length
  const successCount = filtered.value.filter(r => r.status === 'success').length
  const failedCount = filtered.value.filter(r => r.status === 'failed').length
  const totalAmount = filtered.value.reduce((s, x) => s + x.amount, 0)
  return {totalCount, successCount, failedCount, totalAmount}
})

const open = reactive({})

function toggleGroup(key) {
  open[key] = !open[key]
}

watch(
    grouped,
    list => {
      if (list.length) {
        const firstKey = list[0].key
        if (open[firstKey] === undefined) open[firstKey] = true
      }
    },
    {immediate: true}
)

function formatCurrency(n) {
  return new Intl.NumberFormat('el-GR', {style: 'currency', currency: 'EUR'}).format(n)
}

function formatDateTime(iso) {
  const d = new Date(iso)
  const dd = d.toLocaleDateString('el-GR')
  const tt = d.toLocaleTimeString('el-GR', {hour: '2-digit', minute: '2-digit'})
  return `${dd} · ${tt}`
}

function monthName(m) {
  const names = {
    '01': 'ΑΥΓΟΥΣΤΟΣ', '02': 'ΦΕΒΡΟΥΑΡΙΟΣ', '03': 'ΜΑΡΤΙΟΣ', '04': 'ΑΠΡΙΛΙΟΣ',
    '05': 'ΜΑΪΟΣ', '06': 'ΙΟΥΝΙΟΣ', '07': 'ΙΟΥΛΙΟΣ', '08': 'ΑΥΓΟΥΣΤΟΣ',
    '09': 'ΣΕΠΤΕΜΒΡΙΟΣ', '10': 'ΟΚΤΩΒΡΙΟΣ', '11': 'ΝΟΕΜΒΡΙΟΣ', '12': 'ΔΕΚΕΜΒΡΙΟΣ'
  }
  return names[m] ?? m
}

function exportAs(kind) {
  console.log('Export:', kind, {from: dateFrom.value, to: dateTo.value, tab: activeTab.value})
  alert(`Εξαγωγή (${kind}) σε εξέλιξη…`)
}

function duplicateGroup(group) {
  console.log('Duplicate group:', group)
  alert(`Δημιουργία αντιγράφου για ${group.title}`)
}

function repeatTopup(row) {
  console.log('Repeat topup:', row)
  alert(`Επανάληψη φόρτισης για ${row.name} (${formatCurrency(row.amount)})`)
}
</script>

