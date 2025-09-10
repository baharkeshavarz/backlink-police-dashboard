import { BaseFilters, parseDateRange } from "@/lib/filter-utils";
import { searchParamsCache } from "./search-params";

export interface LinkItemFilters extends BaseFilters {
  publisherUrl?: string | null;
  backlinkUrl?: string | null;
  urlStatus?: string | null;
  followStatus?: string | null;
  scanStatus?: string | null;
  anchorKeyword?: string | null;
  purchasedStart?: Date | null;
  purchasedEnd?: Date | null;
  lastScanStart?: Date | null;
  lastScanEnd?: Date | null;
}

export function parseLinksFilters(): LinkItemFilters {
  const purchasedRange = parseDateRange(
    searchParamsCache.get("purchasedOn") ?? undefined
  );
  const lastScanRange = parseDateRange(
    searchParamsCache.get("lastScan") ?? undefined
  );

  return {
    page: searchParamsCache.get("page"),
    size: searchParamsCache.get("size"),
    search: searchParamsCache.get("search"),
    sort: searchParamsCache.get("sort"),
    publisherUrl: searchParamsCache.get("publisherUrl"),
    backlinkUrl: searchParamsCache.get("backlinkUrl"),
    urlStatus: searchParamsCache.get("urlStatus"),
    followStatus: searchParamsCache.get("followStatus"),
    scanStatus: searchParamsCache.get("scanStatus"),
    anchorKeyword: searchParamsCache.get("anchorKeyword"),
    purchasedStart: purchasedRange.start,
    purchasedEnd: purchasedRange.end,
    lastScanStart: lastScanRange.start,
    lastScanEnd: lastScanRange.end,
  };
}
