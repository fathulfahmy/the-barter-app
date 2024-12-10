import { useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";

import { AppTextInput } from "@/components/ui/form";
import { useDisclosure } from "@/hooks/use-disclosure";
import { loginInputSchema, useLogin } from "@/lib/auth/auth";

export const LoginForm = () => {
  const login = useLogin({ onSuccess: () => router.replace("/(tabs)") });

  const { isOpen: passwordVisible, toggle: togglePasswordVisibility } = useDisclosure(false);

  const defaultValues = {
    email: "user@demo.com",
    password: "password",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginInputSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = handleSubmit((values) => login.mutate(values));

  return (
    <>
      <View style={{ flex: 1, gap: 16 }}>
        <AppTextInput control={control} label="Email" name="email" errors={errors.email?.message} inputMode="email" />
        <AppTextInput
          control={control}
          label="Password"
          name="password"
          errors={errors.password?.message}
          secureTextEntry={!passwordVisible}
          right={<TextInput.Icon icon={passwordVisible ? "eye" : "eye-off"} onPress={togglePasswordVisibility} />}
        />
      </View>

      <View style={{ gap: 8 }}>
        <Link href="/register" replace asChild>
          <Button>Don't have an account? Register</Button>
        </Link>
        <Button mode="contained" onPress={onSubmit}>
          Login
        </Button>
      </View>
    </>
  );
};
