"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  Typography,
} from "@mui/material";
import { useState } from "react";

const UserActivation = () => {
  const [showDanger, setShowDanger] = useState(false);

  return (
    <Box sx={{ p: 4 }}>
      {/* Danger Zone */}
      <Card sx={{ borderRadius: 3, boxShadow: 3, border: "1px solid #f44336" }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            onClick={() => setShowDanger(!showDanger)}
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="h6" color="error">
              Danger Zone
            </Typography>
            {showDanger ? (
              <ExpandLessIcon color="error" />
            ) : (
              <ExpandMoreIcon color="error" />
            )}
          </Box>
          <Collapse in={showDanger}>
            <Divider sx={{ my: 2 }} />
            <Box mb={3}>
              <Typography variant="subtitle1" gutterBottom>
                Temporary Deactivation
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                By taking this action, your account will be deactivated
              </Typography>
              <Button
                variant="outlined"
                color="error"
                startIcon={<PowerSettingsNewIcon />}
              >
                Deactivate Account
              </Button>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Permanently Delete Account
              </Typography>
              <Typography variant="body2" color="error" gutterBottom>
                Account deletion is final. There will be no way to restore your
                account.
              </Typography>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
              >
                Delete Account
              </Button>
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserActivation;
