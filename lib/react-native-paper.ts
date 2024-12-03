import { useTheme } from "react-native-paper";

import { AppTheme } from "@/types/react-native-paper";

export const useAppTheme = () => useTheme<AppTheme>();
