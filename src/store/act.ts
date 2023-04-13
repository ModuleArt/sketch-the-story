import { defineStore } from "pinia";
import { ActI } from "@/types/entities/Act";

interface ActStoreI {
  acts: ActI[];
  currentActId: string;
}

const defaultActStoreValue = {
  acts: [{ id: "act-1", title: "Act 1" }],
  currentActId: "act-1",
};

export const useActStore = defineStore("act", {
  state: () => defaultActStoreValue as ActStoreI,
  actions: {
    setCurrentActId(actId: string) {
      this.currentActId = actId;
    },
    createEmptyAct() {
      const id = crypto.randomUUID();
      this.acts.push({ id, title: "" });
      this.currentActId = id;
    },
    removeActById(actId: string) {
      // remove act
      this.acts = this.acts.filter((act) => act.id !== actId);

      // if no acts left -> create new act
      if (this.acts.length === 0) {
        this.createEmptyAct();
      } else {
        // after deleting current act -> switch to last act
        if (this.currentActId === actId) {
          this.currentActId = this.acts[this.acts.length - 1].id;
        }
      }
    },
  },
  getters: {
    currentAct: (state) => {
      return (
        state.acts.find((act) => act.id === state.currentActId) || state.acts[0]
      );
    },
  },
});
