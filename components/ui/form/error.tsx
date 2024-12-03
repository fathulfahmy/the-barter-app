import { HelperText } from "react-native-paper";

export type ErrorProps = {
  errorMessage?: string | null;
};

export const Error = ({ errorMessage }: ErrorProps) => {
  if (!errorMessage) return null;

  return (
    <HelperText type="error" visible={!!errorMessage}>
      {errorMessage}
    </HelperText>
  );
};
