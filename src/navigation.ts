import { Direction } from '@mui/material';
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export type Locale = 'en' | 'ar';
export const LOCALE_VALUES = ['en', 'ar'] as const;

export const languages: Record<
  Locale,
  {
    label: string;
    direction: Direction;
    flag: string;
  }
> = {
  en: {
    label: 'English',
    direction: 'ltr',
    flag: '',
  },
  ar: {
    label: 'العربیه',
    direction: 'rtl',
    flag: '',
  },
};

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
