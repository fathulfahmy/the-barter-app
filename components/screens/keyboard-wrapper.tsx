import * as React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = ScrollViewProps & {
  children: React.ReactNode;
  withScrollView?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export const KeyboardWrapper = ({ children, withScrollView = true, style, contentContainerStyle, ...rest }: Props) => {
  return (
    <>
      {withScrollView ? (
        <KeyboardAwareScrollView
          {...rest}
          contentContainerStyle={contentContainerStyle}
          keyboardShouldPersistTaps="always"
          // alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          style={[styles.container, style]}
        >
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView style={[styles.container, style]}>{children}</KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
