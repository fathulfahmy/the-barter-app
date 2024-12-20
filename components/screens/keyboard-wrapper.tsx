import * as React from "react";
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from "react-native-keyboard-aware-scroll-view";

type Props = KeyboardAwareScrollViewProps &
  KeyboardAvoidingViewProps & {
    children: React.ReactNode;
    withScrollView?: boolean;
    style?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
  };

export const KeyboardWrapper = ({ children, withScrollView = true, style, contentContainerStyle, ...props }: Props) => {
  return (
    <>
      {withScrollView ? (
        <KeyboardAwareScrollView
          contentContainerStyle={contentContainerStyle}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          style={[styles.container, style]}
          {...props}
        >
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={style}
          keyboardVerticalOffset={96}
          {...props}
        >
          <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
