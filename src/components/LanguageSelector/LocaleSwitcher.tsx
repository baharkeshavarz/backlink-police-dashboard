import { useLocale } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import { languages } from "@/navigation";
import { MenuItem } from "@mui/material";

export default function LocaleSwitcher() {
  const locale = useLocale();
  return (
    <LocaleSwitcherSelect defaultValue={locale} label="">
      {Object.entries(languages).map(([code, value]) => (
        <MenuItem key={value.label} value={code}>
          {value.label}
        </MenuItem>
      ))}
    </LocaleSwitcherSelect>
  );
}
