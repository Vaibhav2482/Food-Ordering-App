import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";

function DeactivateBranchDialog({

    open,
    onClose,
    onDeactivate,
    branch

}) {

    if (!branch) {

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

                Deactivate Branch

            </DialogTitle>

            <DialogContent>

                <Typography>

                    Are you sure you want to deactivate

                    <strong> {branch.BranchName}</strong>

                    ?

                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                >

                    Existing menu items and orders stay intact — the branch just
                    stops appearing as an option for new orders.

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

export default DeactivateBranchDialog;
