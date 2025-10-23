import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import BeneficiariesView from '@/views/BeneficiariesView.vue'
import UploadBeneficiariesView from '@/views/UploadBeneficiariesView.vue'
import CardsView from '@/views/CardsView.vue'
import HistoryView from '@/views/HistoryView.vue'
import FAQView from '@/views/FAQView.vue'
import ContactView from '@/views/ContactView.vue'

import TopupsHistoryView from '@/views/TopupsHistoryView.vue'

const routes = [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Αρχική' } },
    { path: '/beneficiaries', name: 'beneficiaries', component: BeneficiariesView, meta: { title: 'Δικαιούχοι' } },
    { path: '/beneficiaries/upload', name: 'beneficiaries-upload', component: UploadBeneficiariesView, meta: { title: 'Προσθήκη Δικαιούχων' } },
    { path: '/cards', name: 'cards', component: CardsView, meta: { title: 'Διαχείριση Καρτών' } },
    { path: '/history', name: 'history', component: HistoryView, meta: { title: 'Ιστορικό' } },

    { path: '/history/topups', name: 'history-topups', component: TopupsHistoryView, meta: { title: 'Ιστορικό Φορτίσεων' } },

    { path: '/faq', name: 'faq', component: FAQView, meta: { title: 'Συχνές Ερωτήσεις' } },
    { path: '/contact', name: 'contact', component: ContactView, meta: { title: 'Επικοινωνία' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})

router.afterEach((to) => {
    document.title = to.meta?.title ? `${to.meta.title} · Meal Cards` : 'Meal Cards'
})

export default router
