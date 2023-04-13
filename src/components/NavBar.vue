<template>
  <div class="nav-bar">
    <v-toolbar density="compact">
      <v-btn color="primary">
        Story

        <v-menu activator="parent">
          <v-list>
            <v-list-item
              v-for="(item, index) in fileItems"
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
              v-for="(item, index) in actItems"
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
        <v-tabs v-model="currentAct" show-arrows>
          <v-tab v-for="item in acts" :key="item.id" :value="item">
            {{ item.title }}
          </v-tab>
        </v-tabs>
        <v-btn icon="mdi-plus" @click="newAct" />
      </template>
    </v-toolbar>

    <v-window v-model="currentAct">
      <v-window-item v-for="item in acts" :key="item.id" :value="item">
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-window-item>
    </v-window>

    <v-dialog v-model="showActEditDialog" width="320">
      <v-card>
        <v-card-title>Act</v-card-title>
        <v-card-text>
          <v-text-field
            label="Title"
            v-model="currentAct.title"
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

const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

// stories
const fileItems = [
  { title: "New..." },
  { title: "Open..." },
  { title: "Save" },
  { title: "Save As..." },
];

// acts
interface ActI {
  id: string;
  title: string;
}

const acts = ref<ActI[]>([{ id: "act-1", title: "Act 1" }]);

const currentAct = ref<ActI>(acts.value[0]);

const showActEditDialog = ref(false);

const newAct = () => {
  acts.value.push({
    id: crypto.randomUUID(),
    title: "",
  });
  currentAct.value = acts.value[acts.value.length - 1];
  showActEditDialog.value = true;
};

const editAct = () => {
  showActEditDialog.value = true;
};

const deleteAct = () => {
  acts.value = acts.value.filter((act) => act.id !== currentAct.value.id);
  currentAct.value = acts.value[acts.value.length - 1];
};

const actItems = computed(() => [
  { title: "New", onClick: newAct },
  {
    title: "Edit...",
    onClick: editAct,
  },
  {
    title: "Delete",
    onClick: deleteAct,
    disabled: acts.value.length === 0,
  },
]);
</script>
