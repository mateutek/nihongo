import React, { useState } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps, useLocation, useMatch } from 'react-router-dom';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
    secondaryMatch?: string;
}

function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to, secondaryMatch } = props;
    const location = useLocation();
    const [isSelected, setIsSelected] = useState(false);
    const match = useMatch(secondaryMatch ? secondaryMatch : '');
    React.useEffect(() => {
        setIsSelected(location.pathname === to || (location.pathname !== '/' && !!match));
    }, [location, to, match]);

    const renderLink = React.useMemo(
        () =>
            React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(function Link(itemProps, ref) {
                return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
            }),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink} selected={isSelected}>
                {icon ? (
                    <ListItemIcon sx={{ color: isSelected ? 'secondary.main' : 'text.main' }}>{icon}</ListItemIcon>
                ) : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

export default ListItemLink;
