<template>
  <section class="w-full">
    <div
        class="w-1/2 mx-auto flex items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl shadow-sm px-3 sm:px-4 py-2.5 mb-4"
    >
      <div class="flex items-center gap-2 text-gray-700 text-sm">
        <RiErrorWarningLine class="w-5 h-5 text-amber-500" />
        <span class="font-medium">Προσοχή! Δεν είσαι συνδεδεμένος</span>
      </div>
      <button
          class="inline-flex items-center gap-2 rounded-lg text-[#2563eb] border border-[#2563eb] text-sm px-3 py-2 hover:bg-[#2563eb] hover:text-white"
          @click="connectBank"
      >
        Συνδέσου με κωδικούς EUROBANK
        <RiArrowRightLine class="w-4 h-4" />
      </button>
    </div>

    <div class="flex items-start justify-between mb-3">
      <h1 class="text-md sm:text-xl font-semibold leading-tight">
        Καλημέρα Γιώργο, καλώς ήρθες<br />
        στο Meal Card app
      </h1>

      <RouterLink
          to="/beneficiaries/upload"
          class="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[#2563eb] text-white text-sm px-3 py-2 shadow hover:brightness-110"
      >
        <RiAddLine class="w-4 h-4" />
        Ξεκίνα προσθέτοντας Δικαιούχους
      </RouterLink>
    </div>

    <div class="bg-white border border-gray-200 rounded-3xl shadow-sm p-3 sm:p-5">
      <div class="flex items-center justify-end mb-3">
        <div class="relative">
          <select
              v-model="period"
              class="appearance-none text-sm border border-gray-300 bg-white rounded-lg pl-3 pr-8 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="month">Επίλεξε Χρονική Περίοδο</option>
            <option value="month">Τρέχων μήνας</option>
            <option value="quarter">Τρέχον τρίμηνο</option>
            <option value="year">Τρέχον έτος</option>
            <option value="last-month">Προηγούμενος μήνας</option>
          </select>
          <RiArrowDownSLine
              class="pointer-events-none w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-4">
        <!-- KPI 1 -->
        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div class="text-sm text-gray-600 mb-2">Πλήθος καρτών / περίοδο</div>
          <div
              class="truncate text-4xl sm:text-5xl font-semibold tracking-wider text-gray-800 max-w-full"
          >
            {{ kpis.cardsCount }}
          </div>
          <div class="text-[11px] text-gray-500 mt-2">
            Στατιστικά αριθμού καρτών %
          </div>
        </div>

        <!-- KPI 2 -->
        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div class="text-sm text-gray-600 mb-2">Αξία φορτίσεων / περίοδο</div>
          <div
              class="truncate text-4xl sm:text-5xl font-semibold tracking-wider text-gray-800 max-w-full"
          >
            {{ kpis.topupsValue }}€
          </div>
          <div class="text-[11px] text-gray-500 mt-2">
            Στατιστικά αξίας φορτίσεων καρτών %
          </div>
        </div>

        <!-- KPI 3 -->
        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div class="text-sm text-gray-600 mb-2">
            Νέες κάρτες που εκδόθηκαν / περίοδο
          </div>
          <div
              class="truncate text-4xl sm:text-5xl font-semibold tracking-wider text-gray-800 max-w-full"
          >
            {{ kpis.newCards }}
          </div>
          <div class="text-[11px] text-gray-500 mt-2">
            Στατιστικά νέων καρτών για την περίοδο %
          </div>
        </div>
      </div>
    </div>

    <RouterLink
        to="/beneficiaries/upload"
        class="sm:hidden mt-4 inline-flex items-center gap-2 rounded-lg bg-[#2563eb] text-white text-sm px-3 py-2 shadow hover:brightness-110"
    >
      <RiAddLine class="w-4 h-4" />
      Ξεκίνα προσθέτοντας Δικαιούχους
    </RouterLink>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import {
  RiErrorWarningLine,
  RiArrowRightLine,
  RiAddLine,
  RiArrowDownSLine
} from '@remixicon/vue'

const period = ref('month')

const kpis = reactive({
  cardsCount: '0000',
  topupsValue: '0.000.000',
  newCards: '0000'
})

function connectBank() {
  alert('Σύνδεση με κωδικούς Eurobank')
}
</script>
