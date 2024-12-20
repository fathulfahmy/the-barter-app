import React from "react";
import { Avatar, Divider, List, Text } from "react-native-paper";

import { router } from "expo-router";

import { AppList } from "@/components/ui";

export const Chats = () => {
  const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <AppList
      data={DATA}
      renderItem={(item) => (
        <List.Item
          title="John Doe"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet vitae natus unde eligendi laborum sit et maiores animi possimus ab officiis, quo mollitia in ipsam."
          left={() => <Avatar.Text label="JD" size={50} />}
          right={(color) => <Text style={{ color: color.color }}>1m ago</Text>}
          descriptionNumberOfLines={1}
          style={{ padding: 16 }}
          onPress={() => router.push(`/chat/1`)}
        />
      )}
      estimatedItemSize={15}
      ItemSeparatorComponent={() => <Divider />}
    />
  );
};
