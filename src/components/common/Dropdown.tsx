import React, { useState } from "react";

interface MenuProp {
  items: {
    label: React.ReactNode;
    key: string;
  }[];
}

const Dropdown = ({
  menu,
  children,
}: {
  menu: MenuProp;

  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="mt-1 rounded-lg text-center text-sm font-medium focus:ring-4 focus:ring-blue-300"
        onClick={toggleDropdown}
      >
        {children}
      </div>
      {isOpen && (
        <div
          id="dropdown"
          className="absolute z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
        >
          <ul
            className="px-2 py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {menu.items.map((item) => (
              <li
                key={item.key}
                className=" block rounded-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default React.memo(Dropdown);
