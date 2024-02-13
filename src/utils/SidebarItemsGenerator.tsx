import { TSideBarItems, TUserPath } from "../types";
import { NavLink } from "react-router-dom";

export const sideBarItemsGenerator = (items: TUserPath[], role) => {
  const sideBarItems = items.reduce((acc: TSideBarItems[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.path}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.path}</NavLink>,
        })),
      });
    }

    return acc;
  }, []);
  return sideBarItems;
};
