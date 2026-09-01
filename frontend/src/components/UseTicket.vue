
<script setup lang="ts">
import { ref } from 'vue';
import { useTicket } from '@/services/ticketService';
import axios from 'axios';
import { reloadTickets } from '@/states/reloadTickets';

const ticketId = ref("");
const error = ref<string | null>(null);

const click = async () => {
    if (ticketId.value === "") {
        error.value = "Enter the ticket code."
        return
    }

    try {
        await useTicket(ticketId.value);
        error.value = null;

        reloadTickets.value++;
    } catch(err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 404) {
                error.value = "Ticket not found.";
            } else if (err.response?.status === 409) {
                error.value = "Ticket already used.";
            } else {
                error.value = "Server error.";
            }
        } else {
            error.value = "Something went wrong.";
        }
    }
    ticketId.value = "";
}
</script>

<template>
    <div id="useTicket">
        <input v-model="ticketId" id="ticketId" placeholder="Enter the ticket code" />
        <button @click="click">Use ticket</button>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<style>
#useTicket {
    display: flex;
    justify-content: space-between;
    gap: 40px;
}
</style>
