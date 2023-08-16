import { IMenu } from "../Nav";
import { keyMenuData } from "./key";
import { mainMenuData } from "./main";

interface IMenuItem {
  driver: string;
  name: string;
  menus: IMenu[];
}

export const menuItems: IMenuItem[] = [
  {
    driver: "main",
    name: "메인",
    menus: mainMenuData,
  },
  {
    driver: "key",
    name: "키 관리",
    menus: keyMenuData,
  },
];
