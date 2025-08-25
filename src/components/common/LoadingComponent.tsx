'use client';

import Logo from '@/components/common/Logo';
import ProgressBar from '@/components/common/ProgressBar';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';

const LoadingComponent = () => {
  const t = useTranslations();
  return (
    <>
      <ProgressBar />
      <Dialog open maxWidth="sm">
        <DialogTitle>
          <Stack spacing={1} alignItems="center" justifyContent="center">
            <Logo />
            <Typography variant="h4" fontWeight={600}>
              {t('siteInfo.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('pages.signIn.welcomeSubMsg')}
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="indeterminate" />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoadingComponent;
