import React from "react";
import { IconButton, Menu } from "react-native-paper";

import { router } from "expo-router";

import { useDisclosure } from "@/hooks/use-disclosure";
import { ReportModelName, Transaction } from "@/types/api";

export const TransactionMenu = ({
  item,
  barter_service_id,
  renderMenuItem,
}: {
  item: Transaction;
  barter_service_id?: string | undefined;
  renderMenuItem?: (close: () => void) => React.ReactNode;
}) => {
  const handleReport = (model_id: string, model_name: ReportModelName) => {
    if (barter_service_id) {
      router.push({
        pathname: "/provide/report",
        params: {
          model_id,
          model_name,
        },
      });
    } else {
      router.push({
        pathname: "/my_barters/report",
        params: {
          model_id,
          model_name,
        },
      });
    }
  };

  const { isOpen, open, close } = useDisclosure();

  return (
    <Menu
      visible={isOpen}
      onDismiss={close}
      anchor={<IconButton icon="dots-horizontal" onPress={open} style={{ margin: 0 }} />}
    >
      {renderMenuItem ? renderMenuItem(close) : null}
      <Menu.Item
        title="Report"
        onPress={() => {
          handleReport(item.id, "barter_transaction");
          close();
        }}
      />
    </Menu>
  );
};
