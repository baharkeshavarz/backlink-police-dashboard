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
import { useState } from "react";
import ProfilePictureDialog from "../../components/dialogs/ProfilePictureDialog";
import { useQueryClient } from "@tanstack/react-query";
import useGetUserDetails, {
  GET_USER_DETAILS,
} from "../../hooks/useGetUserDetails";
import { useParams } from "next/navigation";
import useGetLocationDetails from "../../../locations/hooks/useGetLocationDetails";
import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";

const ProfileCard = () => {
  const queryClient = useQueryClient();
  const [openProfilePictureDialog, setOpenProfilePictureDialog] =
    useState(false);
  const params = useParams<{ userId: string }>();
  const userId = params.userId ? params.userId : "";
  const { data } = useGetUserDetails({ userId });

  const { data: location } = useGetLocationDetails({
    locationId: Number(data?.countryId) ?? "",
  });

  const name = data?.firstName ? `${data?.firstName} ${data?.lastName}` : "";
  const country = location?.title ?? "";
  const email = data?.email ?? "";
  const address = data?.address ?? "";
  const phone = data?.phoneNumber ? `+ ${data?.zip} ${data?.phoneNumber}` : "";
  const avatarUrl =
    data?.imageUrl || `${DEFAULT_DASHBOARD_ICONS}/user-icon.png`;

  const handleProfilePictureDialog = () => {
    setOpenProfilePictureDialog((prev) => !prev);
  };

  const onSuccessOperation = () => {
    queryClient.invalidateQueries({ queryKey: [GET_USER_DETAILS] });
  };

  return (
    <>
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
              sx={{ width: 80, height: 80, borderRadius: 1, cursor: "pointer" }}
              onClick={handleProfilePictureDialog}
            />
            {name && (
              <Typography variant="h3" fontWeight="400" color="grey.500">
                {name}
              </Typography>
            )}
            {country && (
              <Stack direction="row" display="flex" alignItems="center">
                <LocationOnIcon sx={{ width: "11px", height: "13px" }} />
                <Typography variant="subtitle2" color="grey.500">
                  {country}
                </Typography>
              </Stack>
            )}
          </Stack>
          <Box mt={2}>
            <Typography variant="subtitle2" color="grey.500">
              Email Address
            </Typography>
            <Typography variant="subtitle2" color="grey.900">
              {email}
            </Typography>
          </Box>

          {address && (
            <Box mt={1.5}>
              <Typography variant="subtitle2" color="grey.500">
                Company Address
              </Typography>
              <Typography variant="subtitle2" color="grey.900">
                {address}
              </Typography>
            </Box>
          )}

          {phone && (
            <Box mt={1.5}>
              <Typography variant="subtitle2" color="grey.500">
                Phone Number
              </Typography>
              <Typography variant="subtitle2" color="grey.900">
                {phone}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <ProfilePictureDialog
        open={openProfilePictureDialog}
        onClose={handleProfilePictureDialog}
        onSuccess={onSuccessOperation}
      />
    </>
  );
};

export default ProfileCard;
