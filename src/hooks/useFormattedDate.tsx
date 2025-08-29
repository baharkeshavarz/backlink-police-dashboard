import { useMemo } from "react";
import moment from "jalali-moment";
import { useLocale } from "next-intl";

interface UseFormattedDateParams {
  value: string;
  format?: string;
}

const useFormattedDate = ({
  value,
  format = "YYYY/MM/DD HH:mm",
}: UseFormattedDateParams): string => {
  const i18n = useLocale();

  const formattedDate = useMemo(() => {
    if (!value) {
      return "-";
    }

    let dateTime = value;
    dateTime = dateTime.replace(" +03:30", "").replace(" ", "T");

    if (!dateTime.endsWith("Z")) {
      dateTime += "Z";
    }

    if (i18n === "fa-IR") {
      return moment(dateTime).locale("fa").format(format);
    }
    return moment(dateTime).format(format);
  }, [value, format, i18n]);

  return formattedDate;
};

export default useFormattedDate;
