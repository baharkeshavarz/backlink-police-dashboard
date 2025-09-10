import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import useGetUserDetails from "../hooks/useGetUserDetails";

type UserProfileCardProps = {
  userId: string;
};

const UserProfileCard: FC<UserProfileCardProps> = ({ userId }) => {
  const { data: userProfile } = useGetUserDetails({ userId });
  return (
    <>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        gap={2}
        width="100%"
        mb={5}
      >
        <Avatar
          alt=""
          src={
            userProfile?.imageUrl || `${DEFAULT_DASHBOARD_ICONS}/user-icon.png`
          }
          sx={{ width: 48, height: 48 }}
        />
        <Stack>
          <Typography variant="subtitle1" fontWeight="600">
            {userProfile?.firstName} {userProfile?.lastName}
          </Typography>
          <Typography variant="subtitle2" fontWeight="400" color="grey.600">
            {userProfile?.email}
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default UserProfileCard;
