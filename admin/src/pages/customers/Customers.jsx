import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CustomersToolbar from "./CustomersToolbar";
import CustomersTable from "./CustomersTable";
import CustomerDialog from "./CustomerDialog";
import DeleteCustomerDialog from "./DeleteCustomerDialog";

import {
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} from "../../services/customerService";

function Customers() {

    const [customers, setCustomers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [searchText, setSearchText] = useState("");

    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [isEditMode, setIsEditMode] =
    useState(false);

    const [openDialog, setOpenDialog] = useState(false);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    

    useEffect(() => {

        loadCustomers();

    }, []);

    const loadCustomers = async () => {

        try {

            setLoading(true);

            const response = await getAllCustomers();

            if (response.success) {

                setCustomers(response.data);

            }

        }
        catch {

            toast.error("Failed to load customers.");

        }
        finally {

            setLoading(false);

        }

    };

    const handleView = async (customerId) => {

        try {

            const response = await getCustomerById(customerId);

            if (response.success) {
                setIsEditMode(false);
                setSelectedCustomer(response.data);

                setOpenDialog(true);

            }

        }
        catch {

            toast.error("Failed to load customer.");

        }

    };

    const handleEdit = async (customerId) => {

        try {

            const response = await getCustomerById(customerId);

            if (response.success) {
                setIsEditMode(true);
                setSelectedCustomer(response.data);
                setOpenDialog(true);

            }

        }
        catch {

            toast.error("Failed to load customer.");

        }

    };

    const handleSave = async (customer) => {

        try {

            const response = await updateCustomer(

                selectedCustomer.CustomerId,

                customer

            );

            if (response.success) {

                toast.success(response.message);

                setOpenDialog(false);

                loadCustomers();

            }

        }
        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to update customer."

            );

        }

    };

    const handleDelete = async () => {

        try {

            const response = await deleteCustomer(

                selectedCustomer.CustomerId

            );

            if (response.success) {

                toast.success(response.message);

                setDeleteDialogOpen(false);

                loadCustomers();

            }

        }
        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to delete customer."

            );

        }

    };

    const filteredCustomers = customers.filter((customer) =>

        customer.FullName
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||

        customer.Email
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||

        customer.Phone
            .includes(searchText)

    );

    return (

        <Box>

            <CustomersToolbar

                searchText={searchText}

                setSearchText={setSearchText}

            />

            <CustomersTable

                customers={filteredCustomers}

                loading={loading}

                onView={handleView}

                onEdit={handleEdit}

                onDelete={(customer) => {

                    setSelectedCustomer(customer);

                    setDeleteDialogOpen(true);

                }}

            />

         <CustomerDialog
    open={openDialog}
    onClose={() => setOpenDialog(false)}
    customer={selectedCustomer}
    onSave={handleSave}
    isEditMode={isEditMode}
/>

            <DeleteCustomerDialog

                open={deleteDialogOpen}

                customer={selectedCustomer}

                onClose={() => setDeleteDialogOpen(false)}

                onDelete={handleDelete}

            />

        </Box>

    );

}

export default Customers;