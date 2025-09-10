import {
  TbUnlink,
  TbLinkOff,
  TbCreditCardFilled,
  TbSearch,
} from "react-icons/tb";
import { FaUser, FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { HiOutlineCloudUpload } from "react-icons/hi";

export const Icons = {
  TbCreditCardFilled,
  TbUnlink,
  TbLinkOff,
  FaUser,
  FaCaretUp,
  FaCaretDown,
  HiOutlineCloudUpload,
  TbSearch,
};
export type IconName = keyof typeof Icons;
export type IconComponent = (typeof Icons)[IconName]; // the actual icon component type
