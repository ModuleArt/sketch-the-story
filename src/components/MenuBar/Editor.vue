<template>
  <div class="editor">
    <v-window :modelValue="actStore.currentActId">
      <v-window-item v-for="tab in actStore.acts" :key="tab.id" :value="tab.id">
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-window-item>
    </v-window>
  </div>
</template>

<script lang="ts" setup>
import { useActStore } from "@/store/act";

const actStore = useActStore();

const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
</script>
