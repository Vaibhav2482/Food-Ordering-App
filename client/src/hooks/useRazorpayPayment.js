import { useAuth } from "../context/AuthContext";
import { loadRazorpayScript } from "../utils/loadRazorpayScript";
import { createRazorpayOrder, verifyRazorpayPayment } from "../services/paymentService";

export const PAYMENT_CANCELLED = "PAYMENT_CANCELLED";

export function useRazorpayPayment() {

    const { customer } = useAuth();

    const payWithRazorpay = (order) => {

        return new Promise((resolve, reject) => {

            (async () => {

                try {

                    const scriptLoaded = await loadRazorpayScript();

                    if (!scriptLoaded) {
                        reject(new Error("Failed to load the payment gateway. Please check your connection."));
                        return;
                    }

                    const orderResponse = await createRazorpayOrder(order.OrderId);

                    if (!orderResponse.success) {
                        reject(new Error(orderResponse.message));
                        return;
                    }

                    const { razorpayOrderId, amount, currency, keyId } = orderResponse.data;

                    const razorpay = new window.Razorpay({
                        key: keyId,
                        amount,
                        currency,
                        name: "ChaiChakhna",
                        description: `Order #${order.OrderId}`,
                        order_id: razorpayOrderId,
                        prefill: {
                            name: customer?.FullName,
                            email: customer?.Email,
                            contact: customer?.Phone
                        },
                        theme: { color: "#F58220" },
                        handler: async (response) => {

                            try {

                                const verifyResponse = await verifyRazorpayPayment({
                                    orderId: order.OrderId,
                                    razorpayOrderId: response.razorpay_order_id,
                                    razorpayPaymentId: response.razorpay_payment_id,
                                    razorpaySignature: response.razorpay_signature
                                });

                                if (verifyResponse.success) {
                                    resolve(verifyResponse);
                                } else {
                                    reject(new Error(verifyResponse.message));
                                }

                            } catch (error) {

                                reject(new Error(error.response?.data?.message || "Payment verification failed."));

                            }

                        },
                        modal: {
                            ondismiss: () => reject(new Error(PAYMENT_CANCELLED))
                        }
                    });

                    razorpay.on("payment.failed", (response) => {
                        reject(new Error(response.error?.description || "Payment failed."));
                    });

                    razorpay.open();

                } catch (error) {

                    reject(new Error(error.response?.data?.message || error.message || "Failed to start payment."));

                }

            })();

        });

    };

    return { payWithRazorpay };

}
