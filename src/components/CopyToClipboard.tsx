import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, IconButtonProps } from "@mui/material";
import { FC, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";

type CopyStatus = "idle" | "success" | "error";

export interface CopyToClipboardProps extends IconButtonProps {
  value: string;
}

const CopyToClipboard: FC<CopyToClipboardProps> = ({ value }) => {
  const [status, setStatus] = useState<CopyStatus>("idle");

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setStatus("success");
      })
      .catch((err) => {
        setStatus(err);
      });
    setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <IconButton aria-label="copy" onClick={handleCopyClick}>
      {status === "success" ? (
        <DoneIcon fontSize="small" />
      ) : (
        <ContentCopyIcon fontSize="small" />
      )}
    </IconButton>
  );
};

export default CopyToClipboard;
