"use client";

import { ButtonWithLoading } from "@/components/ButtonWithLoading";
import { Trash2, UserRoundX } from "lucide-react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import {
  Box,
  Card,
  CardContent,
  Collapse,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DeactivateAccountDialog from "./dialogs/DeactivateAccountDialog";
import DeleteAccountDialog from "./dialogs/DeleteAccountDialog";
import { useParams } from "next/navigation";

const UserActivation = () => {
  const params = useParams<{ userId: string }>();
  const userId = params.userId ? params.userId : "";

  const [showDanger, setShowDanger] = useState(false);
  const [openDeactivateDialog, setOpenDeactivateDialog] = useState(false);
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);

  const handleDeactivateDialog = () => {
    setOpenDeactivateDialog((prev) => !prev);
  };

  const handleDeleteAccountDialog = () => {
    setOpenDeleteAccountDialog((prev) => !prev);
  };

  const handleOnSuccessDeactivate = () => {
    setOpenDeactivateDialog(false);
  };

  const handleOnSuccessDelete = () => {
    setOpenDeleteAccountDialog(false);
  };

  return (
    <>
      <Box sx={{ m: 4 }}>
        <Card
          variant="outlined"
          sx={{
            borderColor: "grey.200",
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => setShowDanger(!showDanger)}
              sx={{
                cursor: "pointer",
                backgroundColor: "#FFEFEF",
                height: 64,
                borderBottom: "1px solid #E5E7EB",
                px: 2,
              }}
            >
              <Stack direction="row" spacing={0.5}>
                <UserRoundX color="#F05252" />
                <Typography variant="body2" fontWeight="700" color="#F05252">
                  Danger Zone
                </Typography>
              </Stack>

              {showDanger ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            <Collapse in={showDanger}>
              <Box
                my={3}
                px={4}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>
                  <Typography variant="h3" fontWeight="700">
                    Temporary Deactivation
                  </Typography>
                  <Typography variant="subtitle2" color="grey.600" mt={1}>
                    By taking this action, your account will be deactivated
                  </Typography>
                </Stack>

                <ButtonWithLoading
                  variant="outlined"
                  color="error"
                  startIcon={<PowerSettingsNewIcon />}
                  sx={{
                    height: "44px",
                    "&:hover": {
                      bgcolor: "blue.100",
                    },
                  }}
                  onClick={handleDeactivateDialog}
                >
                  Deactivate Account
                </ButtonWithLoading>
              </Box>
              <Divider />
              <Box
                my={3}
                px={4}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>
                  <Typography variant="h3" fontWeight="700">
                    Permanently Delete Account
                  </Typography>
                  <Typography variant="subtitle2" color="#F05252" mt={1}>
                    Account deletion is final. There will be no way to restore
                    your account.
                  </Typography>
                </Stack>
                <ButtonWithLoading
                  variant="contained"
                  color="error"
                  startIcon={<Trash2 />}
                  sx={{ width: "206px", height: "44px" }}
                  onClick={handleDeleteAccountDialog}
                >
                  Delete Account
                </ButtonWithLoading>
              </Box>
            </Collapse>
          </CardContent>
        </Card>
      </Box>
      <DeactivateAccountDialog
        open={openDeactivateDialog}
        onClose={handleDeactivateDialog}
        onSuccess={handleOnSuccessDeactivate}
        userId={userId}
      />
      <DeleteAccountDialog
        open={openDeleteAccountDialog}
        onClose={handleDeleteAccountDialog}
        onSuccess={handleOnSuccessDelete}
        userId={userId}
      />
    </>
  );
};

export default UserActivation;
