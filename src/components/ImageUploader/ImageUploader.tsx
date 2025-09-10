"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  className?: string;

  value?: File | null;
  onChange: (file: File | null) => void;
  onBlur?: () => void;
  disabled?: boolean;
  displayPreview?: boolean;
  previewClassName?: string;
  inputClassName?: string;
  size?: number;
  align?: "center" | "left" | "right";
};

export function ImageUploader({
  displayPreview = true,
  value,
  onChange,
  onBlur,
  disabled,
  className,
  previewClassName,
  inputClassName,
  align = "center",
  size,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        if (size && acceptedFiles[0].size > size) {
          toast.error("File size is too large");
          return;
        }
        onChange(acceptedFiles[0]);
      }
    },
    [onChange, size]
  );

  const removeImage = () => {
    onChange(null);
    setPreview(null);
  };

  const acceptConfig = "image/*";
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: acceptConfig,
    multiple: false,
    disabled,
    noClick: true,
  });

  useEffect(() => {
    if (value) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [value]);

  return (
    <Box display="flex" flexDirection="column" gap={2} className={className}>
      {preview ? (
        <Stack
          alignSelf={
            align === "left"
              ? "flex-start"
              : align === "right"
                ? "flex-end"
                : "center"
          }
          spacing={1.5}
          py={2}
        >
          {displayPreview && (
            <Box
              component="img"
              src={preview}
              alt="Preview"
              sx={{
                width: 156,
                height: 148,
                objectFit: "cover",
                borderRadius: 1,
                boxShadow: 1,
              }}
              className={previewClassName}
            />
          )}

          <Button
            type="button"
            size="small"
            variant="text"
            color="error"
            onClick={removeImage}
            disabled={disabled}
            startIcon={<CloseIcon fontSize="small" />}
            sx={{ alignSelf: "center" }}
          >
            Remove
          </Button>
        </Stack>
      ) : (
        <Paper
          variant="outlined"
          {...getRootProps()}
          sx={{
            p: 3,
            borderStyle: "dashed",
            bgcolor: isDragActive ? "action.hover" : "#F9FAFB",
            borderColor: isDragActive ? "primary.main" : "divider",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
          }}
          className={inputClassName}
        >
          <input {...getInputProps({ onBlur })} />
          <Stack alignItems="center" spacing={1.25} textAlign="center">
            <CloudUploadIcon color="action" sx={{ fontSize: 32 }} />
            <Typography variant="subtitle2">
              Click to upload{" "}
              <Typography
                component="span"
                variant="subtitle2"
                color="text.secondary"
              >
                or drag and drop
              </Typography>
            </Typography>
            {size && (
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
              >
                Max. File Size: {Math.round(size / 1024 / 1024)}MB
              </Typography>
            )}

            <Box display="flex" alignItems="center" gap={2}>
              <Divider sx={{ width: 60 }} />
              <Typography variant="caption" color="text.secondary">
                OR
              </Typography>
              <Divider sx={{ width: 60 }} />
            </Box>

            <Button
              variant="contained"
              size="small"
              type="button"
              disabled={disabled}
              onClick={open}
              startIcon={<SearchIcon fontSize="small" />}
            >
              Browse file
            </Button>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}
