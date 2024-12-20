import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";

import { KeyboardWrapper } from "@/components/screens";
import { AppList, Spacer } from "@/components/ui";
import { FormInput } from "@/components/ui/form";
import { useAppTheme } from "@/lib/react-native-paper";

export const Chat = () => {
  const { colors } = useAppTheme();
  const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const timestampStyle = [
    styles.timestamp,
    {
      color: colors.secondary,
    },
  ];

  return (
    <>
      <AppList
        data={DATA}
        renderItem={(item) => (
          <Card style={[styles.card, styles.sender]}>
            <Card.Content>
              <Text variant="bodyMedium">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet vitae natus unde eligendi laborum sit et
                maiores animi possimus ab officiis, quo mollitia in ipsam.
              </Text>
              <Text variant="bodySmall" style={timestampStyle}>
                9:58 AM
              </Text>
            </Card.Content>
          </Card>
        )}
        estimatedItemSize={15}
        ItemSeparatorComponent={() => <Spacer y={8} />}
        contentContainerStyle={{ padding: 16 }}
      />
      <KeyboardWrapper withScrollView={false}>
        <View style={styles.inputContainer}>
          <FormInput style={styles.input} />
          <IconButton icon="send" mode="contained" containerColor={colors.primary} iconColor={colors.onPrimary} />
        </View>
      </KeyboardWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 0.2,
    flexDirection: "row",
    gap: 8,
  },
  input: {
    flex: 1,
  },
  card: {
    flexWrap: "wrap",
    maxWidth: 0.7 * Dimensions.get("window").width,
  },
  sender: {
    alignSelf: "flex-end",
  },
  receiver: {
    alignSelf: "flex-start",
  },
  timestamp: {
    marginTop: 8,
    alignSelf: "flex-end",
  },
});
