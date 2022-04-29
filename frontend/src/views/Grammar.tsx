import React from 'react';
import { Paper, Tabs, Typography, Tab, Box } from '@mui/material';
import TabPanel from '../components/TabPanel';
import { Particles } from '../components/Particles';

const grammarTopics = ['Partykuły', 'Przymiotniki', 'Czasowniki', 'Liczebniki'];

export default function Grammar() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Paper
            sx={{
                p: 2,
            }}
        >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Gramatyka
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
                <Tabs
                    orientation="vertical"
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    {grammarTopics.map((grammar, index) => (
                        <Tab key={`grammar-${index}`} label={grammar} id={`grammar-${index}`} />
                    ))}
                </Tabs>
                <TabPanel value={value} index={0} fullWidth={true} hasPadding={false}>
                    <Particles />
                </TabPanel>
                <TabPanel value={value} index={1} fullWidth={true} hasPadding={false}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2} fullWidth={true} hasPadding={false}>
                    Item Three
                </TabPanel>
                <TabPanel value={value} index={3} fullWidth={true} hasPadding={false}>
                    Item Four
                </TabPanel>
            </Box>
        </Paper>
    );
}
