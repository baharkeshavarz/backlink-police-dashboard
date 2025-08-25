'use client';

import { Box, LinearProgress } from '@mui/material';
import { useTranslations } from 'next-intl';

const ProgressLoading = () => {
  const t = useTranslations();
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="indeterminate" />
    </Box>
  );
};

export default ProgressLoading;
