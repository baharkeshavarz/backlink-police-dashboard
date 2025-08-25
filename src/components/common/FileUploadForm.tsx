'use client';

import {
  GREY_7D_COLOR,
  GREY_F9_COLOR,
  UPLOAD_ICON_IMAGE,
} from '@/constants/general';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { FC, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import RoundedIcon from './RoundedIcon';
import { useLocale } from 'next-intl';

type FileUploadFormProps = {
  name: string;
  label: string;
  subLabel?: string;
  chooseFileText?: string;
  acceptedFormat: string;
  acceptedFormatText: string;
};

const FileUploadForm: FC<FileUploadFormProps> = ({
  name,
  label,
  subLabel = '',
  chooseFileText = 'Choose File',
  acceptedFormat,
  acceptedFormatText,
}) => {
  const locale = useLocale();
  const { control } = useFormContext();
  const [fileName, setFileName] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);

  return (
    <Box width="100%">
      <Typography variant="h5" mb={1} fontWeight={700}>
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        defaultValue={undefined}
        render={({ field }) => {
          const handleChange = (e: any) => {
            const files = e.target.files;
            field.onChange(files);
          };
          return (
            <Box
              component="label"
              htmlFor={`upload-${name}`}
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: '2px dashed #ccc',
                borderRadius: '50px',
                overflow: 'hidden',
                width: '100%',
                cursor: 'pointer',
                minHeight: 80,
                bgcolor: GREY_F9_COLOR,
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                flexDirection={'column'}
                py={2}
                width="100%"
              >
                <RoundedIcon
                  width={35}
                  height={35}
                  sxProp={{
                    backgroundColor: '#D0DAEE',
                  }}
                  icon={
                    <Image
                      alt="upload"
                      width={21}
                      height={21}
                      src={UPLOAD_ICON_IMAGE}
                    />
                  }
                />
                <Typography
                  variant="subtitle1"
                  fontWeight={400}
                  color={GREY_7D_COLOR}
                  textAlign="center"
                  className={`ambitStyleRegular-${locale}`}
                  mt={2}
                >
                  {subLabel}
                </Typography>
                <Typography
                  variant="caption"
                  fontWeight={400}
                  color={GREY_7D_COLOR}
                  className={`ambitStyleRegular-${locale}`}
                  my={2}
                >
                  {acceptedFormatText}
                </Typography>

                {fileName}
              </Box>

              <input
                name={field.name}
                type="file"
                id={`upload-${field.name}`}
                accept={acceptedFormat}
                hidden
                aria-label={label}
                onChange={handleChange}
                multiple={true}
              />
            </Box>
          );
        }}
      />

      {/* {filePreview && (
        <Box
          mt={2}
          p={1}
          sx={{
            border: '1px solid #f3f3f3',
            borderRadius: 2,
            boxShadow: 1,
            backgroundColor: '#f9f9f9',
            textAlign: 'center',
          }}
        >
          <img
            src={filePreview}
            alt="Preview"
            style={{
              width: '100%',
              maxHeight: 200,
              objectFit: 'contain',
              borderRadius: '8px',
              transition: '0.3s ease-in-out',
            }}
          />
        </Box>
      )} */}
    </Box>
  );
};

export default FileUploadForm;
