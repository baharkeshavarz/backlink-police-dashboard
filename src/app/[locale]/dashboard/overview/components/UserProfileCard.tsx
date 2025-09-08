import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import { Card, Typography, Box } from "@mui/material";

type UserProfileCardProps = {
  user: {
    name: string;
    image: string;
  };
};

const UserProfileCard = ({ user }: UserProfileCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 5.5,
        my: 2,
        border: 0,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          bgcolor: "#a6a6a6",
          width: 100,
          height: 95,
          borderRadius: "41%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={user?.image || `${DEFAULT_DASHBOARD_ICONS}/profile-icon.png`}
          sx={{
            width: user?.image ? 100 : 89,
            height: user?.image ? 95 : 80,
          }}
        />
      </Box>
      <Typography variant="h2" fontWeight="700">
        Welcome back {user?.name || "Admin"}! 👋
      </Typography>
    </Card>
  );
};

export default UserProfileCard;
