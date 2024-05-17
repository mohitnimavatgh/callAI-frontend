<script setup lang="ts">
import { adminAuth } from '~/stores/admin/auth';

definePageMeta({
    layout: 'admin',
    middleware : 'is-admin-authenticate'
})

const adminData = adminAuth();
    
</script>

<template>
    <div>
        
    </div>
</template>