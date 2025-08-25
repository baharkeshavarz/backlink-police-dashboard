'use client';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { LocalizationProviderProps } from '@mui/x-date-pickers/LocalizationProvider';
import React, { FC, PropsWithChildren } from 'react';
import { Locale } from '@/navigation';

export interface CustomLocalizationProviderProps {
  locale: Locale;
}

const CustomLocalizationProvider: FC<
  PropsWithChildren<CustomLocalizationProviderProps>
> = ({ children, locale }) => {
  const adapterMap: Record<
    Locale,
    LocalizationProviderProps<any>['dateAdapter']
  > = {
    ar: AdapterDateFnsJalali,
    en: AdapterDateFns,
  };

  return (
    <LocalizationProvider dateAdapter={adapterMap[locale]}>
      {children}
    </LocalizationProvider>
  );
};

export default CustomLocalizationProvider;
