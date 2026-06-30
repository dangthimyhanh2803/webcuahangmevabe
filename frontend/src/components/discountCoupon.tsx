import React from "react";
import "./style/discountCoupon.css";
import { FaTicketAlt, FaRegClock } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
interface Discount {
    discountId: number;
    discountCode: string;
    discountValue: number;
    discountType: "percent" | "fixed";
    startDate: string;
    endDate: string;
    status: boolean;
}

interface Props {
    discount: Discount;
    onUse?: (code: string) => void;
}

const DiscountCoupon: React.FC<Props> = ({ discount, onUse }) => {

    const formatValue = () => {
        if (discount.discountType === "percent") {
            return `${discount.discountValue}%`;
        }
        return `${discount.discountValue.toLocaleString()}`;
    };

    return (
        <div className={`discount-card ${!discount.status ? "disabled" : ""}`}>
            <div className="discount-left">
                <FaTicketAlt className="ticket-icon"/>
                <h2>{formatValue()}</h2>
            </div>
            <div className="discount-center">
                <h3>{discount.discountCode}</h3>
                <p>
                    {discount.discountType === "percent"
                        ? `Giảm ${discount.discountValue}%`
                        : `Giảm ${discount.discountValue.toLocaleString()}đ`}
                </p>
            </div>
            <div className="discount-right">
                <button
                    disabled={!discount.status}
                    onClick={() => onUse?.(discount.discountCode)}
                >
                    Lưu
                </button>
            </div>
        </div>
    );
};

export default DiscountCoupon;