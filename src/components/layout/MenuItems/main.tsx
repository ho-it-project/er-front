import { Home, Package2Icon, ShoppingBagIcon, User } from "lucide-react";
import { IMenu } from "../Nav";

export const mainMenuData: IMenu[] = [
  {
    id: "home",
    name: "홈",
    icon: <Home className="h-5 w-5" />,
    link: {
      path: "/",
    },
  },
  {
    id: "user",
    name: "유저 관리",
    icon: <User className="h-5 w-5" />,
    link: {
      path: "/users",
    },
    submenu: [
      {
        name: "목록",
        link: {
          path: "/users/list",
        },
      },
      {
        name: "권한",
        link: {
          path: "/users/list",
        },
      },
    ],
  },
  {
    id: "product",
    name: "상품 관리",
    icon: <Package2Icon className="h-5 w-5" />,
    link: {
      path: "/products",
    },
    submenu: [
      {
        name: "등록",
        link: {
          path: "/products/form",
        },
      },
      {
        name: "상품목록",
        link: {
          path: "/products/list",
        },
      },
      {
        name: "아카이브",
        link: {
          path: "/products/archives",
        },
      },
      {
        name: "카테고리",
        link: {
          path: "/products/categories",
        },
      },
    ],
  },

  {
    id: "order",
    name: "주문 관리",
    icon: <ShoppingBagIcon className="h-5 w-5" />,
    link: {
      path: "/orders",
    },
    submenu: [
      {
        name: "목록",
        link: {
          path: "/orders/list",
        },
      },
      {
        name: "취소목록",
        link: {
          path: "/orders/cancel",
        },
      },
      {
        name: "교환목록",
        link: {
          path: "/orders/exchange",
        },
      },
      {
        name: "환불목록",
        link: {
          path: "/orders/refund",
        },
      },
    ],
  },
  {
    id: "shipping",
    name: "배송 관리",
    icon: <ShoppingBagIcon className="h-5 w-5" />,
    link: {
      path: "/shippings",
    },
    submenu: [
      {
        name: "목록",
        link: {
          path: "/shippings/list",
        },
      },
    ],
  },
  {
    id: "QnA",
    name: "QnA 관리",
    icon: <User className="h-5 w-5" />,
    link: {
      path: "/QnAs",
    },
    submenu: [
      {
        name: "목록",
        link: {
          path: "/QnAs/list",
        },
      },
    ],
  },
  {
    id: "event",
    name: "이벤트 관리",
    icon: <User className="h-5 w-5" />,
    link: {
      path: "/events",
    },
    submenu: [
      {
        name: "목록",
        link: {
          path: "/events/list",
        },
      },
    ],
  },
  {
    id: "notice",
    name: "공지사항 관리",

    icon: <User className="h-5 w-5" />,
    link: {
      path: "/notices",
    },
    submenu: [
      {
        name: "목록",
        link: {
          path: "/notices/list",
        },
      },
    ],
  },
];
