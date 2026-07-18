import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";

function DeactivateTableDialog({

    open,
    onClose,
    onDeactivate,
    table

}) {

    if (!table) {

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

                Deactivate Table

            </DialogTitle>

            <DialogContent>

                <Typography>

                    Are you sure you want to deactivate

                    <strong> {table.TableName}</strong>

                    ?

                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                >

                    Past orders keep this table on record — it just stops appearing
                    as an option when staff create a new dine-in order.

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

export default DeactivateTableDialog;
