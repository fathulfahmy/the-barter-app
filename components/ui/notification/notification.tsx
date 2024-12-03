import { Portal, Snackbar } from "react-native-paper";

import { useNotification } from "./notification-store";

export const Notification = () => {
  const { notification, dismissNotification } = useNotification();

  const messages = notification
    ? Array.isArray(notification.messages)
      ? notification.messages.join("\n")
      : notification.messages
    : "";

  return (
    <Portal>
      <Snackbar
        visible={!!notification}
        onDismiss={dismissNotification}
        icon="close-circle"
        onIconPress={dismissNotification}
      >
        {messages}
      </Snackbar>
    </Portal>
  );
};
