import { IconButton, Menu } from "react-native-paper";

import { router } from "expo-router";

import { useDisclosure } from "@/hooks/use-disclosure";
import { ReportModelName, Transaction } from "@/types/api";

export const MenuWrapper = ({
  item,
  barter_service_id,
}: {
  item: Transaction;
  barter_service_id?: string | undefined;
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
