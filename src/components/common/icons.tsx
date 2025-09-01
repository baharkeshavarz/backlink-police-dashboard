import { TbUnlink, TbLinkOff, TbCreditCardFilled } from "react-icons/tb";
import { FaUser, FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { HiMiniCreditCard } from "react-icons/hi2";

export const Icons = {
  TbCreditCardFilled,
  TbUnlink,
  TbLinkOff,
  FaUser,
  FaCaretUp,
  FaCaretDown,
};
export type IconName = keyof typeof Icons;
export type IconComponent = (typeof Icons)[IconName]; // the actual icon component type
