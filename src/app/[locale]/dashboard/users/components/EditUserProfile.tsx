"use client";

import { FC } from "react";
import EditUserForm from "./EditUserForm";

type EditUserProfileProps = {
  userId: string;
  onSuccess?: VoidFunction;
};

const EditUserProfile: FC<EditUserProfileProps> = ({ userId, onSuccess }) => {
  return (
    <>
      <EditUserForm userId={userId} onSuccess={onSuccess} editType="EDIT" />
    </>
  );
};

export default EditUserProfile;
