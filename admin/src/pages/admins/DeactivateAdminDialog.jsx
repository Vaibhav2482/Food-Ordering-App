import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";

function DeactivateAdminDialog({

    open,
    onClose,
    onDeactivate,
    admin

}) {

    if (!admin) {

        return null;

    }

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
        >

            <DialogTitle>

                Deactivate Admin

            </DialogTitle>

            <DialogContent>

                <Typography>

                    Are you sure you want to deactivate

                    <strong> {admin.FullName}</strong>

                    ?

                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                >

                    They will no longer be able to log in. This does not affect any
                    orders or data they created.

                </Typography>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    Cancel
                </Button>

                <Button
                    color="error"
                    variant="contained"
                    onClick={onDeactivate}
                >
                    Deactivate
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default DeactivateAdminDialog;
