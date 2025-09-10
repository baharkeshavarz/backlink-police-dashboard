"use client";

import { useMemo } from "react";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { parseDateRange } from "@/lib/filter-utils";
import { BaseFiltersList } from "@/services/common/types";

const queryParsers = {
  page: parseAsInteger.withDefault(1),
  size: parseAsInteger.withDefault(10),
  sort: parseAsString,
  search: parseAsString,
  publisherUrl: parseAsString,
  backlinkUrl: parseAsString,
  urlStatus: parseAsString,
  followStatus: parseAsString,
  scanStatus: parseAsString,
  anchorKeyword: parseAsString,
  purchasedOn: parseAsString,
  lastScan: parseAsString,
} as const;

export default function useBaseFilters(): Partial<BaseFiltersList> {
  const [values] = useQueryStates(queryParsers);

  return useMemo(() => {
    const purchasedRange = parseDateRange(values.purchasedOn ?? undefined);

    // Only return fields expected by the projects service type
    const result: Partial<BaseFiltersList> = {
      page: values.page ?? undefined,
      size: values.size ?? undefined,
      fromDate: purchasedRange.start
        ? purchasedRange.start.toISOString()
        : undefined,
      toDate: purchasedRange.end ? purchasedRange.end.toISOString() : undefined,
    };

    return result;
  }, [values]);
}
