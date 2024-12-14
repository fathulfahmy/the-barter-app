import React from "react";

import { LoadingStateScreen, ScreenWrapper } from "@/components/screens";
import UpdateProfile from "@/features/profile/components/update-profile";
import { useUser } from "@/lib/auth/auth";

const AuthProfileEditScreen = () => {
  const userQuery = useUser();

  const user = userQuery.data;

  if (user === null || user === undefined) return null;

  if (userQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  return (
    <ScreenWrapper>
      <UpdateProfile user_id={user.id} />
    </ScreenWrapper>
  );
};

export default AuthProfileEditScreen;
