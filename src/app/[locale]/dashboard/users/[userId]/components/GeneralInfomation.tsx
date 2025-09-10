import { Card, CardContent, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import EditUserForm from "../../components/EditUserForm";

const GeneralInfomation = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 1, border: 0, bgcolor: "white", mt: 2 }}
    >
      <CardContent>
        <Typography variant="body2" fontWeight="800" color="grey.900" my={2}>
          General information
        </Typography>
        <EditUserForm userId={id} editType="GENERAL" />
      </CardContent>
    </Card>
  );
};

export default GeneralInfomation;
