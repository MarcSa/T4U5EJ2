import { createRouter, createWebHistory } from 'vue-router';
import StudentList from '@/modules/students/pages/StudentList.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('@/modules/students/layouts/StudentsLayout.vue'),
            children: [
                {
                    path: '/',
                    name: 'students',
                    component: StudentList,
                },
                {
                    path: '/:id',
                    name: 'student-detail',
                    component: () => import('@/modules/students/pages/StudentDetail.vue'),
                    props: true,
                },
            ],
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('@/common/components/NotFound.vue'),
        },
    ],
});

export default router;
