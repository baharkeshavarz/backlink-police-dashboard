'use client';

import { CustomButton } from '@/components/common/CustomStyle';
import {
  DEFAULT_ONBOARDING_PATH,
  DEFAULT_ONBOARDING_WELCOME_PATH,
  DEFAULT_PRICING_PATH,
  DEFAULT_SIGNIN_PATH,
  DEFAULT_SIGNUP_PATH,
} from '@/constants/routes';
import { Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MenusSection = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const pagesMenu = [
    { label: 'Onboarding', href: DEFAULT_ONBOARDING_PATH },
    { label: 'Sig In', href: DEFAULT_SIGNIN_PATH },
    { label: 'Sign Up', href: DEFAULT_SIGNUP_PATH },
    { label: 'Onboarding Steps', href: DEFAULT_ONBOARDING_WELCOME_PATH },
    { label: 'Pricing', href: DEFAULT_PRICING_PATH },
  ];

  return (
    <Stack
      sx={{
        p: 1,
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
        flexWrap: 'wrap',
        justifyContent: isSmallScreen ? 'center' : 'flex-start',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {pagesMenu?.map((page) => (
        <CustomButton
          href={page.href}
          key={page.label}
          sx={{
            color: theme.palette.common.white,
            textTransform: 'none',
            fontSize: '0.9rem',
          }}
        >
          {page.label}
        </CustomButton>
      ))}
    </Stack>
  );
};

export default MenusSection;
