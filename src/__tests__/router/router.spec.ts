import { it, expect, describe } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import App from '@/App.vue';
import StudentList from '@/modules/students/pages/StudentList.vue';

const createTestRouter = () =>
    createRouter({
        history: createMemoryHistory(),
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
                        path: '/student/:id',
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

describe('Basic Router', () => {
    it('should display students list in the root "/"', async () => {
        // Arrange
        const router = createTestRouter();
        await router.push('/');
        await router.isReady();

        const wrapper = mount(App, {
            global: {
                plugins: [router],
            },
        });

        // Act
        const texto = wrapper.html();

        // Assert
        expect(texto).toContain('Listado de Alumnos');
    });
    it('should display the student page in the route "/student/:id"', async () => {
        // Arrange
        const router = createTestRouter();
        await router.push('/student/1');
        await router.isReady();

        const wrapper = mount(App, {
            global: {
                plugins: [router],
            },
        });

        // Act
        const texto = wrapper.html();

        // Assert
        expect(texto).toContain('Detalle del alumno:');
    });
    it('should navigate the student page when link clicked', async () => {
        // Arrange
        const router = createTestRouter();
        await router.push('/');
        await router.isReady();

        const wrapper = mount(App, {
            global: { plugins: [router] },
        });
        const studentLink = wrapper.get('#alum-1');

        // Act
        await studentLink.trigger('click');
        await flushPromises();

        // Assert
        expect(router.currentRoute.value.path).toBe('/student/1');
        expect(wrapper.html()).toContain('Detalle del alumno:');
    });
    it('should navigate students list when link clicked', async () => {
        // Arrange
        const router = createTestRouter();
        await router.push('/student/1');
        await router.isReady();

        const wrapper = mount(App, {
            global: { plugins: [router] },
        });
        const back = wrapper.get('#return-list');

        // Act
        await back.trigger('click');
        await flushPromises();

        // Assert
        expect(router.currentRoute.value.path).toBe('/');
        expect(wrapper.html()).toContain('Listado de Alumnos');
    });
});
