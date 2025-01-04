import { Channel } from "stream-chat";
import { MessageType } from "stream-chat-expo";
import { create } from "zustand";

/* ======================================== PROP */
type ChatStore = {
  channel: Channel | undefined;
  thread: MessageType | null;

  setChannel: (channel: Channel | undefined) => void;
  setThread: (thread: MessageType | null) => void;

  resetChat: () => void;
};

/* ======================================== HOOK */
export const useChat = create<ChatStore>((set) => ({
  channel: undefined,
  thread: null,

  setChannel: (channel) => set({ channel }),
  setThread: (thread) => set({ thread }),

  resetChat: () =>
    set({
      channel: undefined,
      thread: null,
    }),
}));
