import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

function SwitchBranchDialog({ open, onCancel, onConfirm }) {

    return (

        <Dialog open={open} onClose={onCancel}>

            <DialogTitle>Switch Branch?</DialogTitle>

            <DialogContent>

                <DialogContentText>
                    Switching branches will clear your current cart, since items can't be
                    mixed across branches. Continue?
                </DialogContentText>

            </DialogContent>

            <DialogActions>

                <Button onClick={onCancel}>
                    Cancel
                </Button>

                <Button variant="contained" onClick={onConfirm}>
                    Switch &amp; Clear Cart
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default SwitchBranchDialog;
