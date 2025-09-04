import { Box, Typography } from "@mui/material";
import StatusMapper from "./statusMapper";
import { UserStatusEnum } from "@/services/users/types";

interface UserStatusProps {
  status: UserStatusEnum;
}

const UserStatus = ({ status }: UserStatusProps) => {
  const statusMapper = StatusMapper();
  const userStatus = statusMapper[status];

  if (!userStatus) return null;

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          bgcolor: userStatus?.bg || "grey.400",
        }}
      />
      <Typography variant="subtitle1">{userStatus.title}</Typography>
    </Box>
  );
};

export default UserStatus;
