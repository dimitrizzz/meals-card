<template>
  <aside
      class="hidden lg:flex relative h-screen sticky top-0 bg-white border-r border-[#e5e7eb] flex-col transition-[width] duration-150 ease-in-out"
      :style="{ width: collapsed ? '60px' : '260px' }"
      :aria-expanded="!collapsed"
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
      <img src="../../public/Logo.svg" alt="Logo" class="brand-logo w-full h-full" />
    </div>

    <nav class="flex flex-col gap-[6px] mt-2 mx-2">
      <RouterLink
          to="/"
          :class="[
          baseLinkClasses,
          collapsed ? 'justify-center px-2' : '',
          isActive('/') && activeClasses
        ]"
          :title="collapsed ? 'Αρχική' : undefined"
      >
        <span class="grid place-items-center shrink-0 w-[22px] h-[22px]" aria-hidden="true">
          <RiHomeLine class="h-5 w-5" />
        </span>
        <span :class="collapsed ? 'opacity-0 w-0 pointer-events-none overflow-hidden' : ''">Αρχική</span>
      </RouterLink>

      <RouterLink
          to="/beneficiaries"
          :class="[
          baseLinkClasses,
          collapsed ? 'justify-center px-2' : '',
          isActive('/beneficiaries') && activeClasses
        ]"
          :title="collapsed ? 'Δικαιούχοι' : undefined"
      >
        <span class="grid place-items-center shrink-0 w-[22px] h-[22px]" aria-hidden="true">
          <RiGroupLine class="h-5 w-5" />
        </span>
        <span :class="collapsed ? 'opacity-0 w-0 pointer-events-none overflow-hidden' : ''">Δικαιούχοι</span>
      </RouterLink>

      <RouterLink
          to="/cards"
          :class="[
          baseLinkClasses,
          collapsed ? 'justify-center px-2' : '',
          isActive('/cards') && activeClasses
        ]"
          :title="collapsed ? 'Διαχείριση Καρτών' : undefined"
      >
        <span class="grid place-items-center shrink-0 w-[22px] h-[22px]" aria-hidden="true">
          <RiBankCardLine class="h-5 w-5" />
        </span>
        <span :class="collapsed ? 'opacity-0 w-0 pointer-events-none overflow-hidden' : ''">Διαχείριση Καρτών</span>
      </RouterLink>

      <RouterLink
          to="/history"
          :class="[
          baseLinkClasses,
          collapsed ? 'justify-center px-2' : '',
          isActive('/history') && activeClasses
        ]"
          :title="collapsed ? 'Ιστορικό' : undefined"
      >
        <span class="grid place-items-center shrink-0 w-[22px] h-[22px]" aria-hidden="true">
          <RiHistoryLine class="h-5 w-5" />
        </span>
        <span :class="collapsed ? 'opacity-0 w-0 pointer-events-none overflow-hidden' : ''">Ιστορικό</span>
      </RouterLink>

      <RouterLink
          to="/faq"
          :class="[
          baseLinkClasses,
          collapsed ? 'justify-center px-2' : '',
          isActive('/faq') && activeClasses
        ]"
          :title="collapsed ? 'Συχνές Ερωτήσεις' : undefined"
      >
        <span class="grid place-items-center shrink-0 w-[22px] h-[22px]" aria-hidden="true">
          <RiQuestionLine class="h-5 w-5" />
        </span>
        <span :class="collapsed ? 'opacity-0 w-0 pointer-events-none overflow-hidden' : ''">Συχνές Ερωτήσεις</span>
      </RouterLink>

      <RouterLink
          to="/contact"
          :class="[
          baseLinkClasses,
          collapsed ? 'justify-center px-2' : '',
          isActive('/contact') && activeClasses
        ]"
          :title="collapsed ? 'Επικοινωνία' : undefined"
      >
        <span class="grid place-items-center shrink-0 w-[22px] h-[22px]" aria-hidden="true">
          <RiPhoneLine class="h-5 w-5" />
        </span>
        <span :class="collapsed ? 'opacity-0 w-0 pointer-events-none overflow-hidden' : ''">Επικοινωνία</span>
      </RouterLink>
    </nav>
  </aside>

  <button
      class="lg:hidden fixed top-4 left-4 z-40 border border-[#e5e7eb] bg-white rounded-lg p-2 shadow-sm"
      @click="mobileOpen = true"
      aria-label="Άνοιγμα μενού"
  >
    <RiMenuLine class="h-6 w-6" />
  </button>

  <transition name="fade">
    <div
        v-if="mobileOpen"
        class="lg:hidden fixed inset-0 z-40 bg-black/30"
        role="dialog"
        aria-modal="true"
        @click.self="closeMobile"
        @keydown.esc="closeMobile"
    />
  </transition>

  <transition name="slide-left">
    <div
        v-if="mobileOpen"
        class="lg:hidden fixed inset-y-0 left-0 z-50 w-[400px] max-w-[85%] bg-white border-r border-[#e5e7eb] flex flex-col"
    >
      <div class="flex items-center justify-between px-3 py-3 border-b border-[#e5e7eb]">
        <div class="flex items-center gap-2">
          <img src="../../public/Logo.svg" alt="Logo" class="h-8 w-auto" />
        </div>
        <button
            class="border border-[#e5e7eb] bg-white rounded-lg p-2"
            @click="closeMobile"
            aria-label="Κλείσιμο μενού"
        >
          <RiCloseLine class="h-5 w-5" />
        </button>
      </div>

      <nav class="flex flex-col gap-[6px] mt-2 mx-2 pb-4 overflow-y-auto">
        <RouterLink
            to="/"
            :class="[baseLinkClasses, isActive('/') && activeClasses]"
            @click="closeMobile"
        >
          <span class="grid place-items-center shrink-0 w-[22px] h-[22px]" aria-hidden="true">
            <RiHomeLine class="h-5 w-5" />
          </span>
          <span>Αρχική</span>
        </RouterLink>

        <RouterLink
            to="/beneficiaries"
            :class="[baseLinkClasses, isActive('/beneficiaries') && activeClasses]"
            @click="closeMobile"
        >
          <span class="grid place-items-center shrink-0 w-[22px] h-[22px]" aria-hidden="true">
            <RiGroupLine class="h-5 w-5" />
          </span>
          <span>Δικαιούχοι</span>
        </RouterLink>

        <RouterLink
            to="/cards"
            :class="[baseLinkClasses, isActive('/cards') && activeClasses]"
            @click="closeMobile"
        >
          <span class="grid place-items-center shrink-0 w-[22px] h-[22px]" aria-hidden="true">
            <RiBankCardLine class="h-5 w-5" />
          </span>
          <span>Διαχείριση Καρτών</span>
        </RouterLink>

        <RouterLink
            to="/history"
            :class="[baseLinkClasses, isActive('/history') && activeClasses]"
            @click="closeMobile"
        >
          <span class="grid place-items-center shrink-0 w-[22px] h-[22px]" aria-hidden="true">
            <RiHistoryLine class="h-5 w-5" />
          </span>
          <span>Ιστορικό</span>
        </RouterLink>

        <RouterLink
            to="/faq"
            :class="[baseLinkClasses, isActive('/faq') && activeClasses]"
            @click="closeMobile"
        >
          <span class="grid place-items-center shrink-0 w-[22px] h-[22px]" aria-hidden="true">
            <RiQuestionLine class="h-5 w-5" />
          </span>
          <span>Συχνές Ερωτήσεις</span>
        </RouterLink>

        <RouterLink
            to="/contact"
            :class="[baseLinkClasses, isActive('/contact') && activeClasses]"
            @click="closeMobile"
        >
          <span class="grid place-items-center shrink-0 w-[22px] h-[22px]" aria-hidden="true">
            <RiPhoneLine class="h-5 w-5" />
          </span>
          <span>Επικοινωνία</span>
        </RouterLink>
      </nav>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  RiHomeLine,
  RiGroupLine,
  RiBankCardLine,
  RiHistoryLine,
  RiQuestionLine,
  RiPhoneLine,
  RiContractLeftLine,
  RiMenuLine,
  RiCloseLine,
} from '@remixicon/vue'

const route = useRoute()

const isActive = (base: string) =>
    route.path === base || route.path.startsWith(base + '/')

const baseLinkClasses =
    'flex items-center gap-[10px] no-underline text-[#1f2937] px-3 py-[10px] rounded-[10px] text-[14px] border border-transparent transition-colors hover:bg-gray-100'
const activeClasses = '!bg-[#eef6ff] !text-[#2563eb] !font-semibold'

const EXPANDED = '260px'
const COLLAPSED = '60px'
const collapsed = ref(false)

const applyWidth = (isCollapsed: boolean) => {
  document.documentElement.style.setProperty('--sidebar-w', isCollapsed ? COLLAPSED : EXPANDED)
}

const toggle = () => {
  collapsed.value = !collapsed.value
}

const mobileOpen = ref(false)
const closeMobile = () => { mobileOpen.value = false }

watch(() => route.path, () => {
  if (mobileOpen.value) closeMobile()
})

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

