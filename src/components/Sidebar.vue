<template>
  <aside
      class="relative h-screen sticky top-0 bg-white border-r border-[#e5e7eb] flex flex-col transition-[width] duration-150 ease-in-out"
      :style="{ width: collapsed ? '60px' : '260px' }"
      :aria-expanded="!collapsed"
      :class="collapsed ? '' : ''"
  >
    <button
        class="absolute top-[10px] right-[-18px] border border-[#e5e7eb] bg-white rounded-lg p-[6px] cursor-pointer"
        @click="toggle"
        :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
    >
      <RiContractLeftLine class="h-5 w-5" />
    </button>

    <div
        class="flex items-center gap-[10px] mt-9 mx-[6px] mb-3 px-[6px] py-1 font-bold"
        :class="collapsed ? 'justify-center' : ''"
    >
      <img src="../../public/Logo.svg" alt="" class="brand-logo w-full h-full" style="width: 100%; height: 100%;" />
    </div>

    <nav class="flex flex-col gap-[6px] mt-2 mx-2">
      <RouterLink
          to="/"
          class="flex items-center gap-[10px] no-underline text-[#1f2937] px-3 py-[10px] rounded-[10px] text-[14px] border border-transparent transition-colors hover:bg-gray-100"
          active-class="!bg-[#eef6ff] !text-[#2563eb] !font-semibold"
          :title="collapsed ? 'Αρχική' : undefined"
          :class="collapsed ? 'justify-center px-2' : ''"
      >
        <span class="grid place-items-center shrink-0 w-[22px] h-[22px]" aria-hidden="true">
          <RiHomeLine class="h-5 w-5" />
        </span>
        <span
            class="whitespace-nowrap"
            :class="collapsed ? 'opacity-0 w-0 pointer-events-none overflow-hidden' : ''"
        >Αρχική</span>
      </RouterLink>

      <RouterLink
          to="/beneficiaries"
          class="flex items-center gap-[10px] no-underline text-[#1f2937] px-3 py-[10px] rounded-[10px] text-[14px] border border-transparent transition-colors hover:bg-gray-100"
          active-class="!bg-[#eef6ff] !text-[#2563eb] !font-semibold"
          :title="collapsed ? 'Δικαιούχοι' : undefined"
          :class="collapsed ? 'justify-center px-2' : ''"
      >
        <span class="grid place-items-center shrink-0 w-[22px] h-[22px]" aria-hidden="true">
          <RiGroupLine class="h-5 w-5" />
        </span>
        <span
            class="whitespace-nowrap"
            :class="collapsed ? 'opacity-0 w-0 pointer-events-none overflow-hidden' : ''"
        >Δικαιούχοι</span>
      </RouterLink>

      <RouterLink
          to="/cards"
          class="flex items-center gap-[10px] no-underline text-[#1f2937] px-3 py-[10px] rounded-[10px] text-[14px] border border-transparent transition-colors hover:bg-gray-100"
          active-class="!bg-[#eef6ff] !text-[#2563eb] !font-semibold"
          :title="collapsed ? 'Διαχείριση Καρτών' : undefined"
          :class="collapsed ? 'justify-center px-2' : ''"
      >
        <span class="grid place-items-center shrink-0 w-[22px] h-[22px]" aria-hidden="true">
          <RiBankCardLine class="h-5 w-5" />
        </span>
        <span
            class="whitespace-nowrap"
            :class="collapsed ? 'opacity-0 w-0 pointer-events-none overflow-hidden' : ''"
        >Διαχείριση Καρτών</span>
      </RouterLink>

      <RouterLink
          to="/history"
          class="flex items-center gap-[10px] no-underline text-[#1f2937] px-3 py-[10px] rounded-[10px] text-[14px] border border-transparent transition-colors hover:bg-gray-100"
          active-class="!bg-[#eef6ff] !text-[#2563eb] !font-semibold"
          :title="collapsed ? 'Ιστορικό' : undefined"
          :class="collapsed ? 'justify-center px-2' : ''"
      >
        <span class="grid place-items-center shrink-0 w-[22px] h-[22px]" aria-hidden="true">
          <RiHistoryLine class="h-5 w-5" />
        </span>
        <span
            class="whitespace-nowrap"
            :class="collapsed ? 'opacity-0 w-0 pointer-events-none overflow-hidden' : ''"
        >Ιστορικό</span>
      </RouterLink>

      <RouterLink
          to="/faq"
          class="flex items-center gap-[10px] no-underline text-[#1f2937] px-3 py-[10px] rounded-[10px] text-[14px] border border-transparent transition-colors hover:bg-gray-100"
          active-class="!bg-[#eef6ff] !text-[#2563eb] !font-semibold"
          :title="collapsed ? 'Συχνές Ερωτήσεις' : undefined"
          :class="collapsed ? 'justify-center px-2' : ''"
      >
        <span class="grid place-items-center shrink-0 w-[22px] h-[22px]" aria-hidden="true">
          <RiQuestionLine class="h-5 w-5" />
        </span>
        <span
            class="whitespace-nowrap"
            :class="collapsed ? 'opacity-0 w-0 pointer-events-none overflow-hidden' : ''"
        >Συχνές Ερωτήσεις</span>
      </RouterLink>

      <RouterLink
          to="/contact"
          class="flex items-center gap-[10px] no-underline text-[#1f2937] px-3 py-[10px] rounded-[10px] text-[14px] border border-transparent transition-colors hover:bg-gray-100"
          active-class="!bg-[#eef6ff] !text-[#2563eb] !font-semibold"
          :title="collapsed ? 'Επικοινωνία' : undefined"
          :class="collapsed ? 'justify-center px-2' : ''"
      >
        <span class="grid place-items-center shrink-0 w-[22px] h-[22px]" aria-hidden="true">
          <RiPhoneLine class="h-5 w-5" />
        </span>
        <span
            class="whitespace-nowrap"
            :class="collapsed ? 'opacity-0 w-0 pointer-events-none overflow-hidden' : ''"
        >Επικοινωνία</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import {
  RiHomeLine,
  RiGroupLine,
  RiBankCardLine,
  RiHistoryLine,
  RiQuestionLine,
  RiPhoneLine,
  RiContractLeftLine,
} from '@remixicon/vue'

const EXPANDED = '260px'
const COLLAPSED = '60px'
const collapsed = ref(false)

const applyWidth = (isCollapsed) => {
  document.documentElement.style.setProperty('--sidebar-w', isCollapsed ? COLLAPSED : EXPANDED)
}

const toggle = () => { collapsed.value = !collapsed.value }

onMounted(() => {
  const saved = localStorage.getItem('sidebar-collapsed')
  collapsed.value = saved === '1'
  applyWidth(collapsed.value)
})

watch(collapsed, (v) => {
  localStorage.setItem('sidebar-collapsed', v ? '1' : '0')
  applyWidth(v)
})
</script>
