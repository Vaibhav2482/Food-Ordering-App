CREATE   PROCEDURE dbo.sp_GetDashboardSummary
(
    @BranchId INT = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        (SELECT COUNT(*)
         FROM dbo.Orders
         WHERE CAST(OrderDate AS DATE) = CAST(GETDATE() AS DATE)
           AND (@BranchId IS NULL OR BranchId = @BranchId)) AS TodayOrders,

        (SELECT ISNULL(SUM(TotalAmount),0)
         FROM dbo.Orders
         WHERE CAST(OrderDate AS DATE) = CAST(GETDATE() AS DATE)
         AND OrderStatus <> 'Cancelled'
         AND (@BranchId IS NULL OR BranchId = @BranchId)) AS TodayRevenue,

        (SELECT COUNT(*)
         FROM dbo.Orders
         WHERE OrderStatus = 'Pending'
           AND (@BranchId IS NULL OR BranchId = @BranchId)) AS PendingOrders,

        (SELECT COUNT(*)
         FROM dbo.Orders
         WHERE OrderStatus = 'Accepted'
           AND (@BranchId IS NULL OR BranchId = @BranchId)) AS AcceptedOrders,

        (SELECT COUNT(*)
         FROM dbo.Orders
         WHERE OrderStatus = 'Preparing'
           AND (@BranchId IS NULL OR BranchId = @BranchId)) AS PreparingOrders,

        (SELECT COUNT(*)
         FROM dbo.Orders
         WHERE OrderStatus = 'Ready'
           AND (@BranchId IS NULL OR BranchId = @BranchId)) AS ReadyOrders,

        (SELECT COUNT(*)
         FROM dbo.Orders
         WHERE OrderStatus = 'Out For Delivery'
           AND (@BranchId IS NULL OR BranchId = @BranchId)) AS OutForDeliveryOrders,

        (SELECT COUNT(*)
         FROM dbo.Orders
         WHERE OrderStatus = 'Delivered'
           AND (@BranchId IS NULL OR BranchId = @BranchId)) AS DeliveredOrders,

        (SELECT COUNT(*)
         FROM dbo.Orders
         WHERE OrderStatus = 'Cancelled'
           AND (@BranchId IS NULL OR BranchId = @BranchId)) AS CancelledOrders,

        (SELECT COUNT(*)
         FROM dbo.Customers
         WHERE IsActive = 1) AS TotalCustomers,

        (SELECT COUNT(*)
         FROM dbo.MenuItems
         WHERE IsAvailable = 1
           AND (@BranchId IS NULL OR BranchId = @BranchId)) AS TotalMenuItems;
END;
GO
