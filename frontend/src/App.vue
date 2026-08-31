
<script setup lang="ts">
import ApiKey from './components/ApiKey.vue';
import CreateTicket from './components/CreateTicket.vue';
import TicketList from './components/TicketList.vue';
import UseTicket from './components/UseTicket.vue';
</script>

<template>
  <main>
    <ApiKey />
    <CreateTicket />
    <UseTicket />
    <TicketList />
  </main>
</template>

<style>
@import "./global.css";
</style>
