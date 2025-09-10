import { Card, CardContent, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import EditUserForm from "../../components/EditUserForm";
import { useQueryClient } from "@tanstack/react-query";
import { GET_USER_DETAILS } from "../../hooks/useGetUserDetails";

const GeneralInfomation = () => {
  const { userId } = useParams<{ userId: string }>();
  const queryClient = useQueryClient();

  const onSuccessOperation = () => {
    queryClient.invalidateQueries({ queryKey: [GET_USER_DETAILS] });
  };

  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 1, border: 0, bgcolor: "white", mt: 2 }}
    >
      <CardContent>
        <Typography variant="body2" fontWeight="800" color="grey.900" my={2}>
          General information
        </Typography>
        <EditUserForm
          userId={userId}
          editType="GENERAL"
          onSuccess={onSuccessOperation}
        />
      </CardContent>
    </Card>
  );
};

export default GeneralInfomation;
