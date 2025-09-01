import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import RoundedIcon from "@/components/common/RoundedIcon";
import {
  DEFAULT_DASHBOARD_OVERVIEW_PATH,
  DEFAULT_DASHBOARD_USERS_PATH,
} from "@/constants/routes";

interface ISideBarMenu {
  text: string;
  icon: string;
  callFunc?: VoidFunction;
  linkUrl?: string;
  badgeCount?: number;
}

const SidebarMenus = () => {
  const t = useTranslations();

  const menus: ISideBarMenu[] = [
    {
      text: t("pages.dashboard.sidebar.menu.overview"),
      icon: `${DEFAULT_DASHBOARD_ICONS}/chart-pie.svg`,
      linkUrl: DEFAULT_DASHBOARD_OVERVIEW_PATH,
    },
    {
      text: t("pages.dashboard.sidebar.menu.users"),
      icon: `${DEFAULT_DASHBOARD_ICONS}/shopping-bag.svg`,
      linkUrl: DEFAULT_DASHBOARD_USERS_PATH,
    },
    {
      text: t("pages.dashboard.sidebar.menu.messages"),
      icon: `${DEFAULT_DASHBOARD_ICONS}/inbox-in.svg`,
      badgeCount: 1,
    },
    {
      text: t("pages.dashboard.sidebar.menu.authentication"),
      icon: `${DEFAULT_DASHBOARD_ICONS}/lock.svg`,
    },
    {
      text: t("pages.dashboard.sidebar.menu.docs"),
      icon: `${DEFAULT_DASHBOARD_ICONS}/clipboard-list.svg`,
    },
    {
      text: t("pages.dashboard.sidebar.menu.components"),
      icon: `${DEFAULT_DASHBOARD_ICONS}/collection.svg`,
    },
    {
      text: t("pages.dashboard.sidebar.menu.help"),
      icon: `${DEFAULT_DASHBOARD_ICONS}/support.svg`,
    },
  ];

  return (
    <>
      <List>
        {menus?.map(({ text, icon, callFunc, linkUrl, badgeCount }, _) => {
          const buttonContent = (
            <ListItemButton
              onClick={callFunc}
              component={linkUrl ? Link : "button"}
              href={linkUrl}
              sx={{
                minHeight: 48,
                justifyContent: "flex-start",
                p: 1,
                color: "grey.400",
                width: "100%",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  pl: 2,
                  justifyContent: "center",
                  color: "grey.900",
                }}
              >
                <Image alt={text} src={icon} width={24} height={24} />
              </ListItemIcon>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flex={1}
                px={2}
              >
                <Typography
                  variant="subtitle1"
                  color="grey.900"
                  fontWeight={500}
                >
                  {text}
                </Typography>

                {badgeCount !== undefined && badgeCount > 0 && (
                  <Box ml={4}>
                    <RoundedIcon
                      width={24}
                      height={24}
                      sxProp={{ backgroundColor: "#FFEFEF" }}
                      icon={
                        <Typography variant="caption" color="#9B1C1C">
                          {badgeCount}
                        </Typography>
                      }
                    />
                  </Box>
                )}
              </Box>
            </ListItemButton>
          );
          return (
            <div key={text}>
              <ListItem disablePadding sx={{ display: "block" }}>
                {buttonContent}
              </ListItem>
            </div>
          );
        })}
      </List>
    </>
  );
};

export default SidebarMenus;
