<script setup lang="ts">
import { computed, watch } from 'vue';
import { students } from '@/data/students-data';
import type { Student } from '@/interfaces/student.interface';
import router from '@/router/index';

const props = defineProps<{ id: string }>();
const selectedStudent = computed<Student | undefined>(() =>
    students.find((student) => student.id === parseInt(props.id)),
);

watch(
    selectedStudent,
    (student) => {
        if (!student) {
            router.replace({ name: 'NotFound' });
        }
    },
    { immediate: true },
);
</script>
<template>
    <section class="pt-5">
        <RouterLink to="/" class="btn btn-secondary mb-3"
            ><i class="bi bi-chevron-left"></i> Volver al listado
        </RouterLink>
        <div class="card" v-if="selectedStudent">
            <div class="card-header bg-primary text-white">
                <h1>Detalle del alunmo: {{ selectedStudent.name }}</h1>
            </div>
            <div class="card-body">
                <p><strong>ID:</strong> {{ selectedStudent.id }}</p>
                <p><strong>Email:</strong> {{ selectedStudent.email }}</p>
                <p><strong>Curso:</strong> {{ selectedStudent.course }}</p>
            </div>
        </div>
    </section>
</template>
