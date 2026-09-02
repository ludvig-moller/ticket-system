
<script setup lang="ts">
import { ref, watch } from 'vue';
import axios from 'axios';
import type { Ticket } from '@/types/ticket';
import { getTickets } from '@/services/ticketService';
import { apiKey } from '@/states/apiKey';
import { reloadTickets } from '@/states/reloadTickets.ts';
import DeleteTicket from './DeleteTicket.vue';
import { errors } from '@/states/errors.ts';

const tickets = ref<Ticket[] | null>(null);
const error = ref<boolean>(false);

async function loadTickets() {
    if (!apiKey) {
        errors.value.push("An API key is required to get tickets.");
        return
    }

    try {
        const ticketArray = await getTickets();

        ticketArray.sort((a, b) => {
            const aDate = new Date(a.created_at);
            const bDate = new Date(b.created_at);
            if (aDate < bDate)
                return 1;
            if (aDate > bDate)
                return -1;
            return 0;
        });

        tickets.value = ticketArray;
        error.value = false;
    } catch(err) {
        error.value = true;
        tickets.value = null;

        if (axios.isAxiosError(err)) {
            if (err.response?.status === 401) {
                errors.value.push("Invalid API key when getting tickets.");
            } else {
                errors.value.push("Got a server error when getting tickets.");
            }
        } else {
            errors.value.push("Something went wrong when getting tickets.");
        }
    }
}

watch(
    [reloadTickets, apiKey],
    () => {
        loadTickets();
    },
    { immediate: true },
);
</script>

<template>
    <div id="ticketList">
        <p v-if="error">
            Could not get tickets.
        </p>
        <p v-else-if="tickets === null">
            Loading tickets.
        </p>
        <p v-else-if="tickets.length === 0">
            No tickets found.
        </p>
        <ul v-else>
            <li class="ticket" v-for="ticket in tickets" v-bind:class="(ticket.used)?'used':''">
                <p class="ticketId">{{ ticket.id }}</p>
                <DeleteTicket v-bind:ticketId="ticket.id" />
            </li>
        </ul>
    </div>
</template>

<style>
.ticket {
    display: flex;
    justify-content: space-between;
}

.ticketId {
    margin: 15px;
}

.used {
    background-color: lightgray;
}
</style>
