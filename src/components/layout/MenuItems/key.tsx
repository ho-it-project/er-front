import { IMenu } from "../Nav";
/**
 * 외부 API를 사용하기위한 key를 관리하는 메뉴
 *
 * 1. 현재 사용하는 key 목록
 *   - smart 택배
 *
 */
export const keyMenuData: IMenu[] = [
  {
    id: "key",
    name: "키 관리",

    submenu: [
      {
        name: "smart 택배",
        link: {
          path: "/key/smart",
        },
      },
    ],
  },
];
