
<script setup lang="ts">
import { ref, watch } from 'vue';
import axios from 'axios';
import type { Ticket } from '@/types/ticket';
import { getTickets } from '@/services/ticketService';
import { apiKey } from '@/states/apiKey';

const tickets = ref<Ticket[] | null>(null);
const error = ref<string | null>(null);

async function loadTickets() {
    if (!apiKey) {
        error.value = "An API key is needed to show tickets."
        return
    }

    try {
        tickets.value = await getTickets();
        error.value = null;
    } catch(err) {
        tickets.value = null;

        if (axios.isAxiosError(err)) {
            if (err.response?.status === 401) {
                error.value = "Invalid API key.";
            } else {
                error.value = "Server error.";
            }
        } else {
            error.value = "Something went wrong.";
        }
    }
}

watch(
    apiKey,
    () => {
        loadTickets();
    },
    { immediate: true },
);
</script>

<template>
    <div id="ticketList">
        <p class="error" v-if="error">
            {{ error }}
        </p>
        <p v-else-if="tickets === null">
            Loading tickets.
        </p>
        <p v-else-if="tickets.length === 0">
            No tickets found.
        </p>
        <ul v-else>
            <li v-for="ticket in tickets" v-bind:class="(ticket.used)?'used':''">
                {{ ticket.id }}
            </li>
        </ul>
    </div>
</template>

<style>
.used {
    background-color: lightgray;
}
</style>
