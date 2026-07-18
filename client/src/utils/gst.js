const CGST_RATE = 0.025;
const SGST_RATE = 0.025;

export const calculateGst = (subtotal) => {

    const cgst = Math.round(subtotal * CGST_RATE * 100) / 100;
    const sgst = Math.round(subtotal * SGST_RATE * 100) / 100;

    return {
        cgst,
        sgst,
        total: subtotal + cgst + sgst
    };

};
