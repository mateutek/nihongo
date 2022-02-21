import React, { FunctionComponent } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import TranslateIcon from '@mui/icons-material/Translate';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ListItemLink from "./ListItemLink";

type MenuItemsProps = {};

export const MenuItems: FunctionComponent<MenuItemsProps> = () => {
  return(
    <React.Fragment>
      <ListItemLink to="/" primary="Dashboard" icon={<DashboardIcon />} />
      <ListItemLink to="/lessons" primary="Lessons" icon={<ClassIcon />} />
      <ListItemLink to="/grammar" primary="Grammar" icon={<TranslateIcon />} />
      <ListItemLink to="/dictionary" primary="Dictionary" icon={<MenuBookIcon />} />
    </React.Fragment>
  );
}
