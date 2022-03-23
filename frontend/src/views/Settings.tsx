import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useSettings } from '../data/SettingsProvider';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    DialogActions,
    FormGroup,
    Switch,
    TextField,
    DialogContentText,
} from '@mui/material';
import LS, { loadDefaultData } from '../data/lowdb';

export default function Settings() {
    const { userSettings, saveSetting } = useSettings();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        saveSetting({ [event.target.name]: event.target.checked });
    };

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        saveSetting({ [event.target.name]: parseInt(event.target.value) });
    };

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClear = async () => {
        LS.data = loadDefaultData();
        LS.write();
        setOpen(false);
        window.location.reload();
    };

    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} lg={6}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Settings
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch checked={userSettings.showRomaji} onChange={handleChange} name="showRomaji" />
                            }
                            label="Pokaż Rōmaji"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={userSettings.kanjiPriority}
                                    onChange={handleChange}
                                    name="kanjiPriority"
                                />
                            }
                            label="Kanji jako domyślny tekst"
                        />
                        <TextField
                            sx={{ marginTop: 1 }}
                            id="filled-number"
                            label="Domyślna ilość pytań"
                            name="startingQuestions"
                            onChange={handleNumberChange}
                            inputProps={{
                                min: 5,
                                step: 5,
                            }}
                            value={userSettings.startingQuestions}
                            type="number"
                            variant="standard"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormGroup>
                    <Button variant="outlined" onClick={handleClickOpen} sx={{ mt: 2 }}>
                        Odśwież dane
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle id="alert-dialog-title">Czy chcesz odświeżyć lokalne dane?</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Twoje postępy nie zostaną wyczyszczone.</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} autoFocus>
                                Anuluj
                            </Button>
                            <Button color="error" onClick={handleClear}>
                                Wyczyść
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </Grid>
        </Grid>
    );
}
