/* eslint-disable @typescript-eslint/no-explicit-any */
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
        const result = yup
          .array(sortingItemSchema)
          .validateSync(parsed, { strict: true, abortEarly: false });

        if (!Array.isArray(result)) return null;

        if (
          validKeys &&
          result.some((item: { id: string }) => !validKeys.has(item.id))
        ) {
          return null;
        }

        return result as ExtendedColumnSort<TData>[];
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
        const result = yup
          .array(filterItemSchema)
          .validateSync(parsed, { strict: true, abortEarly: false });

        if (!Array.isArray(result)) return null;

        if (
          validKeys &&
          result.some((item: { id: string }) => !validKeys.has(item.id))
        ) {
          return null;
        }

        return result as ExtendedColumnFilter<TData>[];
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

        // Deep equality for array or string values with undefined-safe checks
        const aVal = filter.value;
        const bVal = other.value;
        let valueEqual: boolean;
        if (Array.isArray(aVal) && Array.isArray(bVal)) {
          valueEqual =
            aVal.length === bVal.length && aVal.every((v, i) => v === bVal[i]);
        } else if (typeof aVal === "string" && typeof bVal === "string") {
          valueEqual = aVal === bVal;
        } else {
          valueEqual = aVal === undefined && bVal === undefined;
        }

        return (
          filter.id === other.id &&
          valueEqual &&
          filter.variant === other.variant &&
          filter.operator === other.operator
        );
      }),
  });
};
