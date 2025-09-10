export interface BaseFilters {
  page?: number;
  size?: number;
  search?: string | null;
  sort?: string | null; // or { id: string, desc: boolean }[] if you're passing complex sort objects
}

export interface DateRange {
  start?: Date;
  end?: Date;
}

export function parseBoolean(value?: string): boolean | undefined {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export function parseDateRange(param?: string | null): {
  start?: Date;
  end?: Date;
} {
  if (!param) return {};
  const [startStr, endStr] = param.split(",");

  const start = startStr ? new Date(Number(startStr)) : undefined;
  const end = endStr ? new Date(Number(endStr)) : undefined;

  if (start) start.setHours(0, 0, 0, 0);
  if (end) end.setHours(23, 59, 59, 999);

  return { start, end };
}

export function parseNumberRange(param?: string | null): {
  start?: number;
  end?: number;
} {
  if (!param) return {};

  const [startStr, endStr] = param.split(",");
  const start = startStr ? parseInt(startStr, 10) : undefined;
  const end = endStr ? parseInt(endStr, 10) : undefined;

  return { start, end };
}
