'use client';

import { Locale, languages } from '@/navigation';
import createCache, { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Direction } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

const ltrCache = createCache({
  key: 'mui',
});

const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export interface RTLProviderProps {
  locale: Locale;
}

const caches: Record<Direction, EmotionCache> = {
  ltr: ltrCache,
  rtl: rtlCache,
};

const RTLProvider: FC<PropsWithChildren<RTLProviderProps>> = ({
  children,
  locale,
}) => {
  return (
    <CacheProvider
      value={caches[languages[locale as Locale]?.direction ?? 'ltr']}
    >
      {children}
    </CacheProvider>
  );
};

export default RTLProvider;
