import React from "react";

import { ScreenWrapper } from "@/components/screens";
import UpdateProfile from "@/features/profile/components/update-profile";
import { useUser } from "@/lib/auth/auth";

const AuthProfileEditScreen = () => {
  const { data: user } = useUser();

  if (user?.id === null || user?.id === undefined) return null;

  return (
    <ScreenWrapper>
      <UpdateProfile user_id={user.id} />
    </ScreenWrapper>
  );
};

export default AuthProfileEditScreen;
