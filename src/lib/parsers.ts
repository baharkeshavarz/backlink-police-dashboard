import { createParser } from "nuqs/server";
import * as yup from "yup";

import { dataTableConfig } from "@/config/data-table";

import type {
  ExtendedColumnFilter,
  ExtendedColumnSort,
} from "@/types/data-table";

// ----------------------------
// Sorting Schema
// ----------------------------
const sortingItemSchema = yup.object({
  id: yup.string().required(),
  desc: yup.boolean().required(),
});

export const getSortingStateParser = <TData>(
  columnIds?: string[] | Set<string>
) => {
  const validKeys = columnIds
    ? columnIds instanceof Set
      ? columnIds
      : new Set(columnIds)
    : null;

  return createParser({
    parse: (value) => {
      try {
        const parsed = JSON.parse(value);
        const result = yup.array(sortingItemSchema).safeParse(parsed);

        if (!result.success) return null;

        if (validKeys && result.data.some((item) => !validKeys.has(item.id))) {
          return null;
        }

        return result.data as ExtendedColumnSort<TData>[];
      } catch {
        return null;
      }
    },
    serialize: (value) => JSON.stringify(value),
    eq: (a, b) =>
      a.length === b.length &&
      a.every(
        (item, index) =>
          item.id === b[index]?.id && item.desc === b[index]?.desc
      ),
  });
};

// ----------------------------
// Filter Schema
// ----------------------------
const filterItemSchema = yup.object({
  id: yup.string().required(),
  value: yup.lazy((val) =>
    Array.isArray(val) ? yup.array(yup.string()) : yup.string()
  ),
  variant: yup.mixed().oneOf(dataTableConfig.filterVariants as any),
  operator: yup.mixed().oneOf(dataTableConfig.operators as any),
  filterId: yup.string().required(),
});

export type FilterItemSchema = yup.InferType<typeof filterItemSchema>;

export const getFiltersStateParser = <TData>(
  columnIds?: string[] | Set<string>
) => {
  const validKeys = columnIds
    ? columnIds instanceof Set
      ? columnIds
      : new Set(columnIds)
    : null;

  return createParser({
    parse: (value) => {
      try {
        const parsed = JSON.parse(value);
        const result = yup.array(filterItemSchema).safeParse(parsed);

        if (!result.success) return null;

        if (validKeys && result.data.some((item) => !validKeys.has(item.id))) {
          return null;
        }

        return result.data as ExtendedColumnFilter<TData>[];
      } catch {
        return null;
      }
    },
    serialize: (value) => JSON.stringify(value),
    eq: (a, b) =>
      a.length === b.length &&
      a.every((filter, index) => {
        const other = b[index];
        if (!other) return false;

        // Deep equality for array or string values
        const valueEqual =
          Array.isArray(filter.value) && Array.isArray(other.value)
            ? filter.value.length === other.value.length &&
              filter.value.every((v, i) => v === other.value[i])
            : filter.value === other.value;

        return (
          filter.id === other.id &&
          valueEqual &&
          filter.variant === other.variant &&
          filter.operator === other.operator
        );
      }),
  });
};
