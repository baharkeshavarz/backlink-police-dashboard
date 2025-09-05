import { Button } from "@mui/material";
import { toast } from "sonner";
import { RefreshCcw } from "lucide-react";
import { rescanProjectLink } from "@/services/projects";
import { useMutation } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { Box, keyframes } from "@mui/system";

interface RescanButtonProps {
  projectLinkId: number | string;
}

// Define spin animation using MUI's keyframes
const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

export const RescanButton: React.FC<RescanButtonProps> = ({
  projectLinkId,
}) => {
  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: rescanProjectLink,
  });

  const handleRescan = async () => {
    const { status } = await mutateAsync({ projectLinkId });
    if (status === HttpStatusCode.Ok) {
      toast.success("Rescan completed successfully");
    } else {
      toast.error("Failed to rescan backlink");
    }
  };

  return (
    <Button
      variant="text"
      onClick={handleRescan}
      disabled={isLoading}
      startIcon={
        <Box
          sx={{
            display: "flex",
            animation: isLoading ? `${spin} 1s linear infinite` : "none",
          }}
        >
          <RefreshCcw width={18} height={18} color="#111928" />
        </Box>
      }
    ></Button>
  );
};

export default RescanButton;
