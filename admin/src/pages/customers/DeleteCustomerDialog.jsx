import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";

function DeleteCustomerDialog({

    open,
    onClose,
    onDelete,
    customer

}) {

    if (!customer) {

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

                Delete Customer

            </DialogTitle>

            <DialogContent>

                <Typography>

                    Are you sure you want to delete

                    <strong>

                        {" "}

                        {customer.FullName}

                    </strong>

                    ?

                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                >

                    Customers with existing orders cannot be deleted.

                </Typography>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >

                    Cancel

                </Button>

                <Button
                    color="error"
                    variant="contained"
                    onClick={onDelete}
                >

                    Delete

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default DeleteCustomerDialog;