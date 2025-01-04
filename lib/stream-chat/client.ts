import { StreamChat } from "stream-chat";

/* ======================================== SINGLETON */
export const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_CHAT_KEY!);
