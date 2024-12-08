import { Portal, Snackbar } from "react-native-paper";

import { useNotification } from "./notification-store";

export const Notification = () => {
  const { notification, dismissNotification } = useNotification();

  if (!notification) return null;

  const { messages } = notification;

  const text = notification ? (Array.isArray(messages) ? messages.join("\n") : messages) : "";

  return (
    <Portal>
      <Snackbar
        visible={!!notification}
        onDismiss={dismissNotification}
        icon="close-circle"
        onIconPress={dismissNotification}
      >
        {text}
      </Snackbar>
    </Portal>
  );
};
