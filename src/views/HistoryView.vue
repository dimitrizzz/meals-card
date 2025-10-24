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
        Καλησπέρα <span class="font-semibold ">George</span>, τι θα ήθελες να κάνεις σήμερα;
      </h2>

      <div class="flex flex-col sm:flex-row gap-6">

        <div
            class="group bg-white shadow-sm border border-gray-200 rounded-2xl p-8 w-72 text-center transition cursor-pointer hover:bg-[#2563eb] hover:text-white hover:shadow-md"
        >
          <div class="flex justify-center mb-4 transition-colors duration-200 group-hover:text-white">
            <RiInfoCardLine class="w-16 h-16 group-hover:text-white" />
          </div>
          <h3 class="font-semibold mb-2 transition-colors duration-200 group-hover:text-white">
            Ιστορικό Παραγγελιών
          </h3>
          <p class="text-sm text-gray-400 transition-colors duration-200 group-hover:text-gray-100">
            Δες όλες τις παραγγελίες καρτών και το status τους
          </p>
        </div>

        <RouterLink
            to="/history/topups"
            class="group bg-white shadow-sm border border-gray-200 rounded-2xl p-8 w-72 text-center transition cursor-pointer hover:bg-[#2563eb] hover:text-white hover:shadow-md"
        >
          <div class="flex justify-center mb-4 transition-colors duration-200 group-hover:text-white">
            <RiResetRightFill class="w-16 h-16 group-hover:text-white" />
          </div>
          <h3 class="font-semibold mb-2 transition-colors duration-200 group-hover:text-white">
            Ιστορικό Φορτίσεων
          </h3>
          <p class="text-sm text-gray-400 transition-colors duration-200 group-hover:text-gray-100">
            Δες όλες τις φορτίσεις καρτών, κατέβασε reports ή επανέλαβε μαζικά φορτίσεις
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
import {RiInfoCardLine, RiResetRightFill} from '@remixicon/vue'
</script>
