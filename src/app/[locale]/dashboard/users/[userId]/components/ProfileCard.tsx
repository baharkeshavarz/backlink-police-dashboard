"use client";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

type ProfileCardProps = {
  name: string;
  country: string;
  email: string;
  address: string;
  phone: string;
  avatarUrl?: string;
};

const ProfileCard = ({
  name,
  country,
  email,
  address,
  phone,
  avatarUrl,
}: ProfileCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        border: 0,
        borderRight: 1,
        borderRadius: 0,
        borderColor: "grey.200",
        height: "100%",
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Avatar
            alt=""
            src={avatarUrl}
            sx={{ width: 80, height: 80, borderRadius: 1 }}
          />
          <Typography variant="h3" fontWeight="400" color="grey.500">
            {name}
          </Typography>
          <Stack direction="row" display="flex" alignItems="center">
            <LocationOnIcon sx={{ width: "11px", height: "13px" }} />
            <Typography variant="subtitle2" color="grey.500">
              {country}
            </Typography>
          </Stack>
        </Stack>

        <Box mt={2}>
          <Typography variant="subtitle2" color="grey.500">
            Email Address
          </Typography>
          <Typography variant="subtitle2" color="grey.900">
            {email}
          </Typography>
        </Box>

        <Box mt={1.5}>
          <Typography variant="subtitle2" color="grey.500">
            Company Address
          </Typography>
          <Typography variant="subtitle2" color="grey.900">
            {address}
          </Typography>
        </Box>

        <Box mt={1.5}>
          <Typography variant="subtitle2" color="grey.500">
            Phone Number
          </Typography>
          <Typography variant="subtitle2" color="grey.900">
            {phone}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
