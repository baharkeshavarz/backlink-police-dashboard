import { CiCreditCard1 } from "react-icons/ci";
import {
  TbUnlink,
  TbLinkOff 
} from 'react-icons/tb';

import { FaUser, FaCaretDown,FaCaretUp } from "react-icons/fa6";

export const Icons = {
  CiCreditCard1,
  TbUnlink,
  TbLinkOff,
  FaUser,
  FaCaretUp,
  FaCaretDown
};
export type IconName = keyof typeof Icons;
export type IconComponent = (typeof Icons)[IconName]; // the actual icon component type
