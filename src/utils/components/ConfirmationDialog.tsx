import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from '@mui/material';
import React from 'react';

interface ConfirmationDialogProp {
    open: boolean,
    onClose: () => void,
    onConfirm: () => void,
    title: string,
    mainText: string,
    cancelText: string,
    confirmText: string,
}

const ConfirmationDialog: React.FC<ConfirmationDialogProp> = ({
    open,
    onClose,
    onConfirm,
    title,
    mainText,
    cancelText = 'Cancel',
    confirmText = 'Yes',
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant="h6">{title}</Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography>{mainText}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="outlined">
                    {cancelText}
                </Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};


export default ConfirmationDialog;
