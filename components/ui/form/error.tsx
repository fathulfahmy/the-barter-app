import { HelperText } from "react-native-paper";

export type ErrorProps = {
  messages?: string | string[] | null;
};

export const Error = ({ messages }: ErrorProps) => {
  if (!messages) return null;

  return (
    <>
      {Array.isArray(messages) ? (
        messages
          .filter((message) => message && message.trim())
          .map((message, index) => (
            <HelperText key={index} type="error" visible={!!message}>
              {message}
            </HelperText>
          ))
      ) : (
        <HelperText type="error" visible={!!messages}>
          {messages}
        </HelperText>
      )}
    </>
  );
};
