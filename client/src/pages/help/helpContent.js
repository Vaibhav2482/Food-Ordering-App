// Content here is a mix of real, accurate answers (derived from how the app
// actually behaves — cancellation rules, payment methods, login) and clearly
// marked TODO placeholders for business specifics only a human can supply
// (legal text, registered address, support contact). Replace every TODO
// before treating this as customer-facing.

export const HELP_TOPICS = [
    {
        slug: "stuck",
        label: "I am stuck",
        items: [
            {
                q: "I didn't receive my OTP",
                a: "In test/demo mode, no SMS is sent — the OTP is shown directly on the login screen in a blue box after you tap \"Send OTP\". If you're on the live app and expected a real text message, TODO: add your SMS provider support contact here."
            },
            {
                q: "My order isn't updating",
                a: "Order status refreshes automatically every 15 seconds while the page is open. If it still looks stuck, pull to refresh or reopen the order from My Orders."
            },
            {
                q: "I can't log in",
                a: "Use the Mobile OTP tab for the fastest way in, or Email + Password if you registered that way. Forgotten passwords currently need a new registration — TODO: add a password-reset flow or support contact here."
            }
        ]
    },
    {
        slug: "cancellations",
        label: "Order cancellations",
        items: [
            {
                q: "Can I cancel my order?",
                a: "Yes — you can cancel from My Orders any time while the order is Pending, Accepted, or Preparing. Once it's Ready (or Out for Delivery), it can no longer be cancelled since the kitchen has already finished preparing it."
            },
            {
                q: "Will I get a refund if I cancel?",
                a: "If you paid online (UPI/Card) and cancel before the order is prepared, TODO: confirm your refund turnaround time and add it here. Cash on Delivery orders have nothing to refund."
            }
        ]
    },
    {
        slug: "payment",
        label: "Payment",
        items: [
            {
                q: "What payment methods are accepted?",
                a: "UPI, Debit/Credit Card (via Razorpay), and Cash on Delivery / Cash at the counter for Dine In."
            },
            {
                q: "My payment failed but I was charged",
                a: "Online payments are verified with a cryptographic signature before an order is ever marked paid — if Razorpay reports a failure, no order is created. TODO: add your refund-timeline text and support contact for any customer who sees a bank deduction anyway."
            }
        ]
    },
    {
        slug: "how-it-works",
        label: "How ChaiChakhna Works",
        items: [
            {
                q: "Placing an order",
                a: "Pick your branch, browse the menu, add items to your cart, then checkout as Dine In (tell our staff your name when it's ready) or Delivery (add an address). Pay online or on arrival/delivery."
            },
            {
                q: "Tracking your order",
                a: "Open My Orders to see live status: Pending → Accepted → Preparing → Ready → (Out for Delivery) → Delivered."
            }
        ]
    },
    {
        slug: "faqs",
        label: "FAQ's",
        items: [
            {
                q: "Is the food vegetarian?",
                a: "Yes — ChaiChakhna Company is 100% pure vegetarian, with no refined oil, additives, or added food color."
            },
            {
                q: "Do you deliver to my area?",
                a: "TODO: add your actual delivery radius / serviceable pincodes per branch here."
            }
        ]
    },
    {
        slug: "legal",
        label: "Legal",
        items: [
            {
                q: "Terms of Service",
                a: "TODO: add your Terms of Service text here."
            },
            {
                q: "Privacy Policy",
                a: "TODO: add your Privacy Policy text here — what customer data you collect (name, phone, email, addresses, order history) and how it's used/stored."
            }
        ]
    },
    {
        slug: "about",
        label: "About Us",
        items: [
            {
                q: "Our story",
                a: "TODO: add your company's story, founding details, and registered business info here."
            }
        ]
    },
    {
        slug: "complaint",
        label: "Raise a Complaint",
        items: [
            {
                q: "How do I reach support?",
                a: "TODO: add a real support email and/or phone number here."
            }
        ]
    }
];

export const getHelpTopic = (slug) => HELP_TOPICS.find((topic) => topic.slug === slug);
