<template>
  <section class="flex flex-col h-full w-full bg-[#f5f7fb] text-gray-800 px-6 sm:px-8 py-6">
    <div class="flex items-start justify-between mb-4">
      <div>
        <h1 class="text-[18px] font-semibold">Προσθήκη Δικαιούχων</h1>
        <p class="text-xs text-gray-500 mt-0.5">Προσθήκη νέων δικαιούχων στην εταιρεία σου</p>
      </div>

      <RouterLink
          to="/beneficiaries"
          class="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 bg-white hover:bg-gray-50"
      >
        Επιστροφή
        <RiArrowGoBackLine class="w-4 h-4" />
      </RouterLink>
    </div>

    <div class="bg-white border border-gray-200 rounded-2xl shadow-sm">
      <div class="px-4 sm:px-6 py-4 border-b border-gray-100">
        <h2 class="text-sm font-semibold text-gray-800">Ανέβασμα αρχείου</h2>
        <p class="text-xs text-gray-500">
          Ανέβασε το αρχείο σου για να καταχωρίσεις νέο δικαιούχο στην πλατφόρμα
        </p>
      </div>

      <div v-if="uploading" class="flex flex-col items-center justify-center py-16">
        <div class="relative w-24 h-24 mb-4">
          <svg class="w-24 h-24 rotate-[-90deg]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" stroke="#E5E7EB" stroke-width="8" fill="none" />
            <circle
                cx="50" cy="50" r="42"
                stroke="#2563eb" stroke-width="8" stroke-linecap="round" fill="none"
                :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset"
            />
          </svg>
          <div class="absolute inset-0 grid place-items-center">
            <div class="text-center">
              <div class="text-[13px] font-semibold text-[#2563eb]">{{ progress }}%</div>
              <div class="text-[10px] text-gray-400 -mt-0.5">πρόοδος</div>
            </div>
          </div>
        </div>

        <p class="text-sm text-gray-600 mb-4">Το αρχείο ανεβαίνει, παρακαλώ περιμένετε…</p>
        <button
            class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            @click="cancelUpload"
        >
          Ακύρωση
          <RiCloseLine class="w-4 h-4" />
        </button>
      </div>

      <div v-else class="p-4 sm:p-6">
        <div v-if="files.length" class="flex items-center justify-between mb-3">
          <p class="text-[12px] text-gray-500">
            {{ files.length > 1 ? 'Επιλέξτε τα αρχεία που θέλετε και πατήστε “Επικύρωση”.' : 'Επιλέξτε το αρχείο και πατήστε “Επικύρωση”.' }}
          </p>
          <button
              class="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-white bg-[#2563eb] hover:brightness-110 disabled:opacity-50"
              :disabled="selectedIds.size === 0"
              @click="verifySelected"
          >
            Επικύρωση
            <RiCheckLine class="w-4 h-4" />
          </button>
        </div>

        <div class="space-y-3 mb-4">
          <div
              v-for="f in files"
              :key="f.id"
              class="flex items-center justify-between gap-3 rounded-xl border border-gray-200 px-4 py-3"
          >
            <div class="flex items-center gap-3 min-w-0">
              <div class="shrink-0 grid place-items-center w-8 h-8 rounded-md bg-gray-100 text-gray-600">
                <RiFileExcelLine class="w-5 h-5" />
              </div>
              <div class="min-w-0">
                <button
                    class="text-sm text-[#2563eb] hover:underline truncate max-w-[360px] text-left"
                    @click="toggleSelect(f.id)"
                >
                  {{ f.name }}
                </button>
                <div class="text-[11px] text-gray-400">{{ formatSize(f.size) }}</div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <input
                  type="checkbox"
                  class="w-4 h-4 accent-[#2563eb] cursor-pointer"
                  :checked="selectedIds.has(f.id)"
                  @change="toggleSelect(f.id)"
                  :title="selectedIds.has(f.id) ? 'Αποεπιλογή' : 'Επιλογή'"
              />
              <button
                  class="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                  @click="removeFile(f.id)"
                  title="Διαγραφή"
              >
                Διαγραφή
                <RiDeleteBinLine class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div
            class="rounded-xl border-2 border-dashed border-[#9ec5ff] bg-[#eaf3ff] text-center"
            :class="isDragging ? 'bg-[#dbeafe]' : ''"
            @dragenter.prevent="isDragging = true"
            @dragover.prevent
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
        >
          <label
              for="fileInput"
              class="flex flex-col items-center justify-center gap-2 py-10 cursor-pointer"
          >
            <div class="text-[#2563eb]">
              <RiUpload2Line class="w-10 h-10" />
            </div>
            <p class="text-sm font-semibold text-gray-700">
              Σύρε ένα αρχείο εδώ για να το ανεβάσεις
            </p>
            <p class="text-[11px] text-gray-500">
              Εναλλακτικά, <span class="text-indigo-600 underline">ανέβασε</span> από τον υπολογιστή σου
            </p>
          </label>
          <input id="fileInput" type="file" class="hidden" multiple @change="handleFileSelect" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import {
  RiUpload2Line,
  RiFileExcelLine,
  RiDeleteBinLine,
  RiCloseLine,
  RiCheckLine, RiArrowGoBackLine,
} from '@remixicon/vue'

const files = ref([])
const selectedIds = ref(new Set())
const isDragging = ref(false)

const uploading = ref(false)
const progress = ref(0)
let timer = null

const circumference = 2 * Math.PI * 42
const dashOffset = computed(() => circumference * (1 - progress.value / 100))

const formatSize = (bytes) =>
    bytes < 1024
        ? `${bytes} B`
        : bytes < 1024 * 1024
            ? `${(bytes / 1024).toFixed(0)} KB`
            : `${(bytes / (1024 * 1024)).toFixed(2)} MB`

function startUploadMock(newFiles) {
  uploading.value = true
  progress.value = 0
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    progress.value += Math.floor(Math.random() * 8) + 3
    if (progress.value >= 100) {
      progress.value = 100
      clearInterval(timer); timer = null
      const augmented = newFiles.map((f, i) => ({
        id: `${Date.now()}-${i}`,
        name: f.name,
        size: f.size ?? 123456,
      }))
      files.value = [...files.value, ...augmented]
      uploading.value = false
    }
  }, 250)
}

function cancelUpload() {
  if (timer) clearInterval(timer)
  timer = null
  uploading.value = false
  progress.value = 0
}

onUnmounted(() => { if (timer) clearInterval(timer) })

function handleFileSelect(e) {
  const selected = Array.from(e.target.files || [])
  if (!selected.length) return
  startUploadMock(selected)
  e.target.value = ''
}
function handleDrop(e) {
  isDragging.value = false
  const dropped = Array.from(e.dataTransfer?.files || [])
  if (!dropped.length) return
  startUploadMock(dropped)
}

function removeFile(id) {
  files.value = files.value.filter(f => f.id !== id)
  if (selectedIds.value.has(id)) selectedIds.value.delete(id)
  selectedIds.value = new Set(selectedIds.value)
}
function toggleSelect(id) {
  const set = new Set(selectedIds.value)
  set.has(id) ? set.delete(id) : set.add(id)
  selectedIds.value = set
}
function verifySelected() {
  if (selectedIds.value.size === 0) return
  const chosen = files.value.filter(f => selectedIds.value.has(f.id))
  alert(`Επικύρωση για:\n- ${chosen.map(c => c.name).join('\n- ')}`)
}
</script>
