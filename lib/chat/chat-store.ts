import { Channel as ChannelType } from "stream-chat";
import { MessageType } from "stream-chat-expo";
import { create } from "zustand";

type ChatStore = {
  channel: ChannelType | undefined;

  setChannel: (channel: ChannelType | undefined) => void;

  thread: MessageType | undefined;

  setThread: (thread: MessageType | undefined) => void;
};

export const useChat = create<ChatStore>((set) => ({
  channel: undefined,

  setChannel: (channel) => set({ channel: channel ?? undefined }),

  thread: undefined,

  setThread: (thread) => set({ thread: thread ?? undefined }),
}));
