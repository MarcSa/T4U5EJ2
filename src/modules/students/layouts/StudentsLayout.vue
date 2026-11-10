<script setup lang="ts">
import FooterComponent from '@/common/components/FooterComponent.vue';
import HeaderComponent from '@/common/components/HeaderComponent.vue';
</script>

<template>
    <div class="d-flex flex-column min-vh-100">
        <HeaderComponent />
        <main class="container">
            <RouterView />
        </main>
        <FooterComponent />
    </div>
</template>

<style scoped></style>
