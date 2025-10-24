<template>
  <section class="w-full">
    <h1 class="text-xl font-semibold mb-4">Επικοινωνία</h1>

    <div class="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6">
      <p class="text-sm text-gray-600 mb-3">
        Χρειάζεσαι βοήθεια ή έχεις ερωτήσεις; Επικοινώνησε μαζί μας με τον τρόπο που σε βολεύει.
      </p>

      <div
          class="grid sm:grid-cols-3 gap-3 text-sm bg-gray-50 border border-gray-200 rounded-xl p-3 mb-4"
      >
        <div class="flex items-center gap-2">
          <span class="font-medium">Email υποστήριξης:</span>
          <a href="mailto:support@xxxxxx.gr" class="text-indigo-600 hover:underline"
          >support@xxxxxx.gr</a
          >
        </div>
        <div class="flex items-center gap-2">
          <span class="font-medium">Γραμμή εξυπηρέτησης:</span>
          <a href="tel:2100000000" class="text-gray-800">210 000 0000</a>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-medium">Ώρες λειτουργίας:</span>
          <span class="text-gray-700">Δευτέρα - Παρασκευή 10:00–18:00</span>
        </div>
      </div>

      <p class="text-sm text-gray-600 mb-4">
        Συμπλήρωσε την παρακάτω φόρμα και θα επικοινωνήσουμε μαζί σου.
      </p>

      <form @submit.prevent="submit" class="space-y-4">
        <div class="grid md:grid-cols-4 gap-3">
          <div class="flex flex-col">
            <label class="text-xs font-medium text-gray-700 mb-1">Όνομα</label>
            <input
                v-model.trim="form.firstName"
                type="text"
                class="h-10 rounded-lg border border-gray-300 px-3 outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                placeholder="Γράψε το ονομά σου"
            />
          </div>
          <div class="flex flex-col">
            <label class="text-xs font-medium text-gray-700 mb-1">Επώνυμο</label>
            <input
                v-model.trim="form.lastName"
                type="text"
                class="h-10 rounded-lg border border-gray-300 px-3 outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                placeholder="Γράψε το επώνυμο σου"
            />
          </div>
          <div class="flex flex-col md:col-span-1">
            <label class="text-xs font-medium text-gray-700 mb-1">Εταιρικό e-mail</label>
            <input
                v-model.trim="form.email"
                type="email"
                class="h-10 rounded-lg border border-gray-300 px-3 outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                placeholder="name@company.com"
            />
          </div>
          <div class="flex flex-col md:col-span-1">
            <label class="text-xs font-medium text-gray-700 mb-1">Εταιρεία</label>
            <input
                v-model.trim="form.company"
                type="text"
                class="h-10 rounded-lg border border-gray-300 px-3 outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                placeholder="Entersoft - Softone"
            />
          </div>
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">Γράψε το μήνυμά σου</label>
          <textarea
              v-model.trim="form.message"
              rows="6"
              class="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200 resize-y text-sm"
              placeholder="Γράψε ένα μήνυμα"
          ></textarea>
        </div>

        <div v-if="errors.length" class="text-sm text-red-600">
          <ul class="list-disc ml-5 space-y-1">
            <li v-for="(e, i) in errors" :key="i">{{ e }}</li>
          </ul>
        </div>

        <div class="flex items-center justify-between pt-1">
          <button
              type="button"
              @click="clearForm"
              class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
          >
            Καθαρισμός
          </button>

          <button
              type="submit"
              :disabled="submitting"
              class="rounded-lg bg-[#2563eb] text-white px-4 py-2 text-sm hover:brightness-110 disabled:opacity-50"
          >
            Αποστολή
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  message: ''
})

const errors = ref([])
const submitting = ref(false)

function validate() {
  const errs = []
  if (!form.firstName) errs.push('Το όνομα είναι υποχρεωτικό.')
  if (!form.lastName) errs.push('Το επώνυμο είναι υποχρεωτικό.')
  if (!form.email) errs.push('Το email είναι υποχρεωτικό.')
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.push('Το email δεν είναι έγκυρο.')
  if (!form.message) errs.push('Το μήνυμα είναι υποχρεωτικό.')
  errors.value = errs
  return errs.length === 0
}

function clearForm() {
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.company = ''
  form.message = ''
  errors.value = []
}

async function submit() {
  if (!validate()) return
  submitting.value = true

  setTimeout(() => {
    alert('Το μήνυμα στάλθηκε με επιτυχία!')
    submitting.value = false
    clearForm()
  }, 600)
}
</script>
