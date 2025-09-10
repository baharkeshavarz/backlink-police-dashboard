import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const searchParams = {
  page: parseAsInteger.withDefault(1),
  size: parseAsInteger.withDefault(10),
  sort: parseAsString,
  search: parseAsString,

  // column filters
  publisherUrl: parseAsString,
  backlinkUrl: parseAsString,
  urlStatus: parseAsString,
  followStatus: parseAsString,
  scanStatus: parseAsString,
  anchorKeyword: parseAsString,

  // range filters (parsed manually)
  purchasedOn: parseAsString,
  lastScan: parseAsString,
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serialize = createSerializer(searchParams);
