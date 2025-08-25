'use client';

import { Locale } from 'next-intl';
import { ReactNode, useTransition } from 'react';
import { usePathname, useRouter } from '@/navigation';
import { Select, SelectChangeEvent } from '@mui/material';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(event: SelectChangeEvent) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace({ pathname }, { locale: nextLocale });
    });
  }

  return (
    <Select
      defaultValue={defaultValue}
      disabled={isPending}
      onChange={onSelectChange}
      sx={{ bgcolor: 'white' }}
    >
      {children}
    </Select>
  );
}
