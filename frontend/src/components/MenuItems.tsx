import React, { FunctionComponent } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import TranslateIcon from '@mui/icons-material/Translate';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import ConstructionIcon from '@mui/icons-material/Construction';
import QuizIcon from '@mui/icons-material/Quiz';
import ListItemLink from './ListItemLink';

type MenuItemsProps = {};

export const MenuItems: FunctionComponent<MenuItemsProps> = () => {
    return (
        <React.Fragment>
            <ListItemLink to="/" primary="Dashboard" icon={<DashboardIcon />} />
            <ListItemLink to="/quiz-select" secondaryMatch="/quiz" primary="Quiz" icon={<QuizIcon />} />
            <ListItemLink to="/lessons" primary="Lekcje" icon={<ClassIcon />} />
            <ListItemLink to="/grammar" primary="Gramatyka" icon={<TranslateIcon />} />
            <ListItemLink to="/dictionary" primary="Słownik" icon={<MenuBookIcon />} />
            <ListItemLink to="/tools" primary="Narzędzia" icon={<ConstructionIcon />} />
            <ListItemLink to="/settings" primary="Ustawienia" icon={<SettingsIcon />} />
        </React.Fragment>
    );
};
