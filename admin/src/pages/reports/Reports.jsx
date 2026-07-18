import {
  Box,
  Grid,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ReportsToolbar from "./ReportsToolbar";
import ReportsTable from "./ReportsTable";
import StatCard from "../../components/dashboard/StatCard";

import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import {
  getDailySalesReport,
  getWeeklySalesReport,
  getMonthlySalesReport,
  getCustomDateSalesReport
} from "../../services/reportService";

function Reports() {

  const [reportType, setReportType] =
    useState("daily");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const [reports, setReports] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    loadReports();

  }, [reportType]);

  const reportSummary = reports.reduce(

    (summary, item) => {

        summary.totalRevenue += Number(item.TotalRevenue ?? 0);

        summary.totalOrders += Number(item.TotalOrders ?? 0);

        summary.delivered += Number(item.DeliveredOrders ?? 0);

        summary.cancelled += Number(item.CancelledOrders ?? 0);

        return summary;

    },

    {

        totalRevenue: 0,

        totalOrders: 0,

        delivered: 0,

        cancelled: 0

    }

);

  const loadReports = async () => {

    try {

      setLoading(true);

      let response;

      switch (reportType) {

        case "weekly":

          response =
            await getWeeklySalesReport();

          break;

        case "monthly":

          response =
            await getMonthlySalesReport();

          break;

        default:

          response =
            await getDailySalesReport();

      }

      if (response.success) {

        setReports(response.data);

      }

    }
    catch {

      toast.error(
        "Failed to load report."
      );

    }
    finally {

      setLoading(false);

    }

  };

  const handleExport = () => {

    if (reports.length === 0) {

      toast.error("No data to export.");

      return;

    }

    const headers = ["Date", "Total Orders", "Total Revenue", "Delivered Orders", "Cancelled Orders"];

    const rows = reports.map((row) => [
      row.SalesDate,
      row.TotalOrders,
      row.TotalRevenue,
      row.DeliveredOrders,
      row.CancelledOrders
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${value ?? ""}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `sales-report-${reportType}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    URL.revokeObjectURL(url);

  };

  const handlePrint = () => {

    window.print();

  };

  const handleCustomSearch =
    async () => {

      if (!fromDate || !toDate) {

        toast.error(
          "Select From Date and To Date."
        );

        return;

      }

      try {

        setLoading(true);

        const response =
          await getCustomDateSalesReport(

            fromDate,

            toDate

          );

        if (response.success) {

          setReports(
            response.data
          );

        }

      }
      catch {

        toast.error(
          "Failed to load report."
        );

      }
      finally {

        setLoading(false);

      }

    };

  return (



    <Box>


<Box mb={4}>

    <Typography
        variant="h4"
        fontWeight={700}
    >
        Sales Reports
    </Typography>

    <Typography
        color="text.secondary"
        mt={1}
    >
        Analyze restaurant sales performance using daily, weekly,
        monthly and custom date reports.
    </Typography>

</Box>
      <Grid
        container
        spacing={3}
        mb={4}
      >

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>

          <StatCard
            title="Revenue"
            value={`₹${reportSummary.totalRevenue}`}
            subtitle="Current Report"
            color="#22C55E"
            icon={<CurrencyRupeeRoundedIcon />}
          />

        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>

          <StatCard
            title="Orders"
           value={reportSummary.totalOrders}
            subtitle="Total Orders"
            color="#F58220"
            icon={<ShoppingBagRoundedIcon />}
          />

        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>

          <StatCard
            title="Delivered"
            value={reportSummary.delivered}
            subtitle="Completed"
            color="#3B82F6"
            icon={<CheckCircleRoundedIcon />}
          />

        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>

          <StatCard
            title="Cancelled"
            value={reportSummary.cancelled}
            subtitle="Cancelled"
            color="#EF4444"
            icon={<CancelRoundedIcon />}
          />

        </Grid>

      </Grid>
      <ReportsToolbar

        reportType={reportType}

        setReportType={setReportType}

        fromDate={fromDate}

        setFromDate={setFromDate}

        toDate={toDate}

        setToDate={setToDate}

        onSearch={
          handleCustomSearch
        }

        onExport={handleExport}

        onPrint={handlePrint}

      />

      <ReportsTable

        reports={reports}

        loading={loading}

      />

    </Box>

  );

}

export default Reports;