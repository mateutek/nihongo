import { Box, Divider, Tab, Tabs, Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
import TabPanel from './TabPanel';

const particles = ['は', 'の', 'を', 'に', '.. から...まで', 'へ', 'で', 'と', 'も', 'に 2'];

type ParticlesProps = {};
export const Particles: FunctionComponent<ParticlesProps> = (props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} variant="fullWidth">
                    {particles.map((particle, index) => (
                        <Tab label={particle} id={`particle-tab-${index}`} />
                    ))}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={6}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={7}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={8}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={9}>
                <Typography my={2}>
                    Wskazuje na odbiorcę danej czynności (komu? kogo?). Łączy się z pewnymi czasownikami.
                </Typography>
                <Box mb={2}>
                    <Box component="span" sx={{ color: 'success.main' }}>
                        きむらさん
                    </Box>
                    <Box component="span" sx={{ color: 'error.main', px: 1 }}>
                        に
                    </Box>
                    <Box component="span" sx={{ color: 'success.main' }}>
                        はな
                    </Box>
                    <Box component="span" sx={{ color: 'error.main', px: 1 }}>
                        を
                    </Box>
                    <Box component="span" sx={{ color: 'info.main' }}>
                        あげました。
                    </Box>
                    <Box component="span">Dałem kwiaty pani Kimurze.</Box>
                </Box>
                <Box mb={2}>
                    <Box component="span" sx={{ color: 'success.main' }}>
                        イーさん
                    </Box>
                    <Box component="span" sx={{ color: 'error.main', px: 1 }}>
                        に
                    </Box>
                    <Box component="span" sx={{ color: 'success.main' }}>
                        ほん
                    </Box>
                    <Box component="span" sx={{ color: 'error.main', px: 1 }}>
                        を
                    </Box>
                    <Box component="span" sx={{ color: 'info.main' }}>
                        かしました。
                    </Box>
                    <Box component="span">Pożyczyłam książkę pani Ii. </Box>
                </Box>
                <Box mb={2}>
                    <Box component="span" sx={{ color: 'success.main' }}>
                        やまださん
                    </Box>
                    <Box component="span" sx={{ color: 'error.main', px: 1 }}>
                        に
                    </Box>
                    <Box component="span" sx={{ color: 'success.main' }}>
                        えいご
                    </Box>
                    <Box component="span" sx={{ color: 'error.main', px: 1 }}>
                        を
                    </Box>
                    <Box component="span" sx={{ color: 'info.main' }}>
                        おしえます。
                    </Box>
                    <Box component="span">Uczę angielskiego pana Yamadę.</Box>
                </Box>
                <Divider />
                <Typography mt={2} gutterBottom>
                    Wskazuje też sprawcę danej czynności (od kogo?). Łączy się z pewnymi czasownikami.
                </Typography>
                <Box mb={2}>
                    <Box component="span" sx={{ color: 'success.main' }}>
                        やまださん
                    </Box>
                    <Box component="span" sx={{ color: 'error.main', px: 1 }}>
                        に
                    </Box>
                    <Box component="span" sx={{ color: 'success.main' }}>
                        はな
                    </Box>
                    <Box component="span" sx={{ color: 'error.main', px: 1 }}>
                        を
                    </Box>
                    <Box component="span" sx={{ color: 'info.main' }}>
                        もらいました。
                    </Box>
                    <Box component="span">Dostałam kwiaty od pana Yamady.</Box>
                </Box>
                <Box mb={2}>
                    <Box component="span" sx={{ color: 'success.main' }}>
                        カリナさん
                    </Box>
                    <Box component="span" sx={{ color: 'error.main', px: 1 }}>
                        に
                    </Box>
                    <Box component="span" sx={{ color: 'success.main' }}>
                        ほん
                    </Box>
                    <Box component="span" sx={{ color: 'error.main', px: 1 }}>
                        を
                    </Box>
                    <Box component="span" sx={{ color: 'info.main' }}>
                        かりました。
                    </Box>
                    <Box component="span">Pożyczyłam książkę od pani Kariny.</Box>
                </Box>
                <Box mb={2}>
                    <Box component="span" sx={{ color: 'success.main' }}>
                        ワンさん
                    </Box>
                    <Box component="span" sx={{ color: 'error.main', px: 1 }}>
                        に
                    </Box>
                    <Box component="span" sx={{ color: 'success.main' }}>
                        ちゅうごくご
                    </Box>
                    <Box component="span" sx={{ color: 'error.main', px: 1 }}>
                        を
                    </Box>
                    <Box component="span" sx={{ color: 'info.main' }}>
                        かりました。
                    </Box>
                    <Box component="span">Uczę się chińskiego od pana Wana.</Box>
                </Box>
            </TabPanel>
        </Box>
    );
};
