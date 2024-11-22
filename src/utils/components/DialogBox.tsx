import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import React from "react";

interface ReusableDialogProps {
    open: boolean;
    title?: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const DialogBox: React.FC<ReusableDialogProps> = ({
    open,
    title = "Dialog Title",
    children,
    onClose,
}) => {
    return (
        <Dialog open={open} onClose={() => null} aria-labelledby="dialog-title">
            <DialogTitle id="dialog-title" display={"flex"} justifyContent={"space-between"}>
                {title}
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                    size="small"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
        </Dialog>
    );
};

export default DialogBox;
