<script setup lang="ts">
import { ref } from 'vue';
import { createTicket } from '@/services/ticketService';

const ticketId = ref("");
const error = ref("");

const click = async () => {
    const res = await createTicket();

    if (res != null) {
        ticketId.value = res;
        error.value = "";
    }
    else {
        error.value = "Something went wrong.";
        ticketId.value = "";
    }
}
</script>

<template>
    <button @click="click()">Create a Ticket</button>

    <p v-if="!error"> 
        {{ ticketId }}
    </p>

    <p v-else class="error">
        {{ error }}
    </p>
</template>