import { ButtonWithLoading } from "@/components/ButtonWithLoading";
import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Image from "next/image";
import React from "react";

const PaymentInformation = () => {
  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 1, border: 0, bgcolor: "white", m: 2 }}
    >
      <CardContent>
        <Typography variant="body2" fontWeight="800" color="grey.900" mb={1}>
          Payment information
        </Typography>
        <Typography variant="subtitle1" color="grey.600" mt={3}>
          Visa ending in 8607
        </Typography>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mt: 1 }}>
          Next payment of $15 occurs on August 13, 2020.
        </Typography>

        <Box display="flex" gap={2} mt={2}>
          <ButtonWithLoading
            variant="outlined"
            startIcon={
              <Image
                alt="edit"
                src={`${DEFAULT_DASHBOARD_ICONS}pencil-alt.png`}
                width={16}
                height={16}
              />
            }
          >
            <Typography variant="subtitle2">Edit</Typography>
          </ButtonWithLoading>
          <Button variant="text" sx={{ bgcolor: "grey.50" }}>
            <Typography variant="subtitle2" color="grey.500">
              Add a new card
            </Typography>
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentInformation;
