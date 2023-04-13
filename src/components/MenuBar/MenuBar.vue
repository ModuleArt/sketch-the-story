<template>
  <div class="menu-bar">
    <v-toolbar density="compact">
      <v-btn color="primary">
        Story
        <v-menu activator="parent">
          <v-list>
            <v-list-item
              v-for="(item, index) in storyMenuItems"
              :key="index"
              :value="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>

      <v-btn color="primary">
        Act
        <v-menu activator="parent">
          <v-list>
            <v-list-item
              v-for="(item, index) in actMenuItems"
              :key="index"
              :value="index"
              :disabled="item.disabled"
              @click="item.onClick"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          :modelValue="actStore.currentActId"
          show-arrows
          @update:modelValue="(tabId: unknown) => actStore.setCurrentActId(tabId as string)"
        >
          <v-tab v-for="tab in actStore.acts" :key="tab.id" :value="tab.id">
            {{ tab.title || "New act" }}
          </v-tab>
        </v-tabs>
        <v-btn icon="mdi-plus" @click="newAct" />
      </template>
    </v-toolbar>

    <v-dialog v-model="showActEditDialog" width="320">
      <v-card>
        <v-card-text>
          <v-text-field
            label="Title"
            v-model="actStore.currentAct.title"
            variant="underlined"
            autofocus
          />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn color="primary" @click="showActEditDialog = false" block>
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useActStore } from "@/store/act";

// stories
const storyMenuItems = [
  { title: "New..." },
  { title: "Open..." },
  { title: "Save" },
  { title: "Save As..." },
];

// acts
const actStore = useActStore();

const showActEditDialog = ref(false);

const newAct = () => {
  actStore.createEmptyAct();
  showActEditDialog.value = true;
};

const editAct = () => {
  showActEditDialog.value = true;
};

const removeAct = () => {
  actStore.removeActById(actStore.currentActId);
};

const actMenuItems = computed(() => [
  {
    title: "New",
    onClick: newAct,
  },
  {
    title: "Edit...",
    onClick: editAct,
  },
  {
    title: "Remove",
    onClick: removeAct,
    disabled: actStore.acts.length === 0,
  },
]);
</script>
