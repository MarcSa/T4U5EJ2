<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { students } from '@/data/students-data';
</script>

<template>
    <section class="container py-4">
        <header class="d-flex align-items-center justify-content-between mb-3">
            <h1 class="h4 mb-0">Listado de Alumnos</h1>
            <RouterLink to="/" class="btn btn-outline-secondary btn-sm">Volver a Home</RouterLink>
        </header>

        <div class="list-group">
            <RouterLink
                v-for="student in students"
                :key="student.id"
                :to="{ name: 'student-detail', params: { id: student.id } }"
                class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
                <span class="d-flex flex-column">
                    <span
                        ><strong>
                            {{ student.name }}
                        </strong>
                    </span>
                    <span>
                        {{ student.email }}
                    </span>
                </span>
                <span class="text-muted small">ID: {{ student.id }}</span>
            </RouterLink>
        </div>
    </section>
</template>
