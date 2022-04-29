import React from 'react';
import { Box } from '@mui/material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    hasPadding?: boolean;
    fullWidth?: boolean;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, hasPadding = true, fullWidth = false } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            sx={{ ...(fullWidth ? { width: '100%' } : {}) }}
        >
            {value === index && <Box sx={{ px: hasPadding ? 3 : 0 }}>{children}</Box>}
        </Box>
    );
}

export default TabPanel;
