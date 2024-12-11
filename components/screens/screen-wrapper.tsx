import * as React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppTheme } from "@/lib/react-native-paper";

type Props = ScrollViewProps & {
  children: React.ReactNode;
  withScrollView?: boolean;
  isKeyboardAware?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export const ScreenWrapper = ({
  children,
  withScrollView = true,
  isKeyboardAware = true,
  style,
  contentContainerStyle,
  ...rest
}: Props) => {
  const theme = useAppTheme();

  const insets = useSafeAreaInsets();

  const containerStyle = [
    styles.container,
    {
      backgroundColor: theme.colors.background,
      paddingLeft: insets.left,
      paddingRight: insets.left,
    },
  ];

  if (withScrollView && isKeyboardAware) {
    return (
      <KeyboardAwareScrollView
        {...rest}
        contentContainerStyle={[styles.container, contentContainerStyle]}
        keyboardShouldPersistTaps="handled"
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        style={[containerStyle, style]}
      >
        {children}
      </KeyboardAwareScrollView>
    );
  }

  if (withScrollView && !isKeyboardAware) {
    return (
      <ScrollView
        {...rest}
        contentContainerStyle={[styles.container, contentContainerStyle]}
        keyboardShouldPersistTaps="handled"
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        style={[containerStyle, style]}
      >
        {children}
      </ScrollView>
    );
  }

  if (!withScrollView && isKeyboardAware) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={[containerStyle, style]}>{children}</KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[containerStyle, style]}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
