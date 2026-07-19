import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CustomersToolbar from "./CustomersToolbar";
import CustomersTable from "./CustomersTable";
import CustomerDialog from "./CustomerDialog";

import {
    getAllCustomers,
    getCustomerById,
    getCustomerAddresses
} from "../../services/customerService";

function Customers() {

    const [customers, setCustomers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [searchText, setSearchText] = useState("");

    const [fromDate, setFromDate] = useState("");

    const [toDate, setToDate] = useState("");

    const [sortOrder, setSortOrder] = useState("newest");

    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [addresses, setAddresses] = useState([]);

    const [addressesLoading, setAddressesLoading] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);

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

                setSelectedCustomer(response.data);
                setOpenDialog(true);

                setAddresses([]);
                setAddressesLoading(true);

                try {

                    const addressResponse = await getCustomerAddresses(customerId);

                    if (addressResponse.success) {
                        setAddresses(addressResponse.data);
                    }

                } finally {

                    setAddressesLoading(false);

                }

            }

        }
        catch {

            toast.error("Failed to load customer.");

        }

    };

    const filteredCustomers = customers

        .filter((customer) =>

            (customer.FullName || "")
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||

            (customer.Email || "")
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||

            (customer.Phone || "")
                .includes(searchText)

        )

        .filter((customer) => {

            if (!fromDate && !toDate) {
                return true;
            }

            const created = new Date(customer.CreatedAt);

            if (fromDate && created < new Date(`${fromDate}T00:00:00`)) {
                return false;
            }

            if (toDate && created > new Date(`${toDate}T23:59:59`)) {
                return false;
            }

            return true;

        })

        .sort((a, b) => {

            if (sortOrder === "name") {
                return (a.FullName || "").localeCompare(b.FullName || "");
            }

            const dateA = new Date(a.CreatedAt).getTime();
            const dateB = new Date(b.CreatedAt).getTime();

            return sortOrder === "oldest" ? dateA - dateB : dateB - dateA;

        });

    return (

        <Box>

            <CustomersToolbar
                searchText={searchText}
                setSearchText={setSearchText}
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />

            <CustomersTable
                customers={filteredCustomers}
                loading={loading}
                onView={handleView}
            />

            <CustomerDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                customer={selectedCustomer}
                addresses={addresses}
                addressesLoading={addressesLoading}
            />

        </Box>

    );

}

export default Customers;
