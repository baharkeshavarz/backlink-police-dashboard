import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import { Card, Typography, Box } from "@mui/material";

const UserProfile = () => {
  const user = { firstName: "John" }; //TODO
  return (
    <Card
      variant="outlined"
      sx={{ mb: 4, p: 3, display: "flex", alignItems: "center", gap: 1.5 }}
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
          src={`${DEFAULT_DASHBOARD_ICONS}/profile-icon.png`}
          sx={{
            width: 89,
            height: 80,
          }}
        />
      </Box>
      <Typography variant="h2" fontWeight="700">
        Welcome back {user?.firstName || "Admin"}! 👋
      </Typography>
    </Card>
  );
};

export default UserProfile;
