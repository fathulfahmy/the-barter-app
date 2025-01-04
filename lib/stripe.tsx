import { StripeProvider } from "@stripe/stripe-react-native";
import Constants from "expo-constants";
import * as Linking from "expo-linking";

const merchantId = Constants.expoConfig?.plugins?.find((p) => p[0] === "@stripe/stripe-react-native")?.[1]
  .merchantIdentifier;

/* ======================================== PROVIDER */
export const StripePaymentProvider = (
  props: Omit<React.ComponentProps<typeof StripeProvider>, "publishableKey" | "merchantIdentifier">,
) => {
  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_KEY!}
      merchantIdentifier={merchantId}
      urlScheme={Linking.createURL("/")?.split(":")[0]}
      {...props}
    />
  );
};
