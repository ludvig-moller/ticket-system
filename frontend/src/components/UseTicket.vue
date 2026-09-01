
<script setup lang="ts">
import { ref } from 'vue';
import { useTicket } from '@/services/ticketService';
import axios from 'axios';
import { reloadTickets } from '@/states/reloadTickets';
import { errors } from '@/states/errors';

const ticketId = ref("");

const click = async () => {
    if (ticketId.value === "") {
        errors.value.push("Ticket code is required.");
        return
    }

    try {
        await useTicket(ticketId.value);
        reloadTickets.value++;
    } catch(err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 404) {
                errors.value.push("Ticket was not found.");
            } else if (err.response?.status === 409) {
                errors.value.push("The ticket has aleady been used.");
            } else {
                errors.value.push("Got a server error when using ticket.");
            }
        } else {
            errors.value.push("Something went wrong when using ticket.");
        }
    }
    ticketId.value = "";
}
</script>

<template>
    <div id="useTicket">
        <input v-model="ticketId" id="ticketId" placeholder="Enter the ticket code" />
        <button @click="click">Use ticket</button>
    </div>
</template>

<style>
#useTicket {
    display: flex;
    justify-content: space-between;
    gap: 40px;
}
</style>
