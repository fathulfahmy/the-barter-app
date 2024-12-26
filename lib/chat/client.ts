import { StreamChat } from "stream-chat";

export const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_CHAT_KEY!);
