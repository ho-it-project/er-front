import React from "react";
import Divider from "../common/Divider";
import { menuItems } from "./MenuItems";
import Menu from "./Nav";

const MainMenu = () => {
  return (
    <>
      {menuItems.map((item) => {
        return (
          <div key={item.driver}>
            <Divider
              orientation="left"
              plain
              className="text-l mb-2 mt-4 font-bold"
            >
              {item.driver}
            </Divider>
            <Menu data={item.menus} />
          </div>
        );
      })}
    </>
  );
};

export default React.memo(MainMenu);
