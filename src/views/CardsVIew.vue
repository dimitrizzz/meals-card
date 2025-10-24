<template>
  <section class="flex flex-col h-full w-full bg-[#f5f7fb] text-gray-800 px-8 py-6">
    <header class="mb-6">
      <h1 class="text-xl font-semibold">Ιστορικό</h1>
      <p class="text-sm text-gray-500">
        Πρόσθεσε, διαχειρίσου ή/και αφαίρεσε τους δικαιούχους / εργαζόμενους της εταιρείας σου.
      </p>
    </header>

    <main class="flex flex-col items-center justify-center flex-1">
      <h2 class="text-lg sm:text-xl mb-8 font-medium">
        Καλησπέρα <span class="font-semibold">George</span>, τι θα ήθελες να κάνεις σήμερα;
      </h2>

      <div class="flex flex-col sm:flex-row gap-6">
        <RouterLink
            :to="{ name: 'cards-upload' }"
            class="group bg-white shadow-sm border border-gray-200 rounded-2xl p-8 w-72 text-center transition hover:bg-[#2563eb] hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <div class="flex justify-center mb-4 transition-colors duration-200 group-hover:text-white">
            <RiBankCard2Line class="w-16 h-16 group-hover:text-white" />
          </div>
          <h3 class="font-semibold mb-2 transition-colors duration-200 group-hover:text-white">
            Παραγγελία νέας κάρτας
          </h3>
          <p class="text-sm text-gray-400 transition-colors duration-200 group-hover:text-gray-100">
            Επίλεξε δικαιούχους από τη λίστα για την παραγγελία νέων καρτών.
          </p>
        </RouterLink>

        <RouterLink
            :to="{ name: 'history-topups' }"
            class="group bg-white shadow-sm border border-gray-200 rounded-2xl p-8 w-72 text-center transition hover:bg-[#2563eb] hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <div class="flex justify-center mb-4 transition-colors duration-200 group-hover:text-white">
            <RiBankCard2Line class="w-16 h-16 group-hover:text-white" />
          </div>
          <h3 class="font-semibold mb-2 transition-colors duration-200 group-hover:text-white">
            Φόρτιση καρτών
          </h3>
          <p class="text-sm text-gray-400 transition-colors duration-200 group-hover:text-gray-100">
            Φόρτισε τις ήδη υπάρχουσες κάρτες
          </p>
        </RouterLink>

        <RouterLink
            :to="{ name: 'cards' }"
            class="group bg-white shadow-sm border border-gray-200 rounded-2xl p-8 w-72 text-center transition hover:bg-[#2563eb] hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <div class="flex justify-center mb-4 transition-colors duration-200 group-hover:text-white">
            <RiInfoCardLine class="w-16 h-16 group-hover:text-white" />
          </div>
          <h3 class="font-semibold mb-2 transition-colors duration-200 group-hover:text-white">
            Eπισκόπηση καρτών
          </h3>
          <p class="text-sm text-gray-400 transition-colors duration-200 group-hover:text-gray-100">
            Δες τη συνολική εικόνα όλων των καρτών και της τρέχουσας κατάστασής τους
          </p>
        </RouterLink>
      </div>

      <p class="mt-10 text-sm text-gray-500">
        Μπορείς να κατεβάσεις
        <a href="#" class="text-indigo-600 font-medium hover:underline">εδώ</a>
        το template των αρχείων για να το συμπληρώσεις.
      </p>
    </main>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { RiBankCard2Line, RiInfoCardLine } from '@remixicon/vue'
</script>
