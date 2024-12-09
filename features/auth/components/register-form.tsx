import { useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";

import { AppTextInput } from "@/components/ui/form";
import { useDisclosure } from "@/hooks/use-disclosure";
import { registerInputSchema, useRegister } from "@/lib/auth/auth";

export const RegisterForm = () => {
  const register = useRegister({ onSuccess: () => router.replace("/(tabs)") });

  const { isOpen: passwordVisible, toggle: togglePasswordVisible } = useDisclosure(false);
  const { isOpen: passwordConfirmVisible, toggle: togglePasswordConfirmVisible } = useDisclosure(false);

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerInputSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = handleSubmit((values) => register.mutate(values));

  return (
    <>
      <View style={{ flex: 1, gap: 16 }}>
        <AppTextInput control={control} label="Name" name="name" errors={errors.name?.message} inputMode="text" />
        <AppTextInput control={control} label="Email" name="email" errors={errors.email?.message} inputMode="email" />
        <AppTextInput
          control={control}
          label="Password"
          name="password"
          errors={errors.password?.message}
          secureTextEntry={!passwordVisible}
          right={<TextInput.Icon icon={passwordVisible ? "eye" : "eye-off"} onPress={togglePasswordVisible} />}
        />
        <AppTextInput
          control={control}
          label="Confirm Password"
          name="password_confirmation"
          errors={errors.password_confirmation?.message}
          secureTextEntry={!passwordConfirmVisible}
          right={
            <TextInput.Icon icon={passwordConfirmVisible ? "eye" : "eye-off"} onPress={togglePasswordConfirmVisible} />
          }
        />
      </View>

      <View style={{ gap: 8 }}>
        <Link href="/login" replace asChild>
          <Button>Already have an account? Login</Button>
        </Link>
        <Button mode="contained" onPress={onSubmit}>
          Register
        </Button>
      </View>
    </>
  );
};
