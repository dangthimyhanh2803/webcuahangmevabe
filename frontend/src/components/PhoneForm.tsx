import React from "react";

type Props = {
    onNext: () => void;
};

const PhoneForm: React.FC<Props> = ({ onNext }) => {
    return (
        <div className="form-box">
            <h3>Vui chào đón bố mẹ</h3>
            <p>Đăng nhập hoặc Đăng ký ngay tài khoản</p>

            <input
                type="text"
                placeholder="Bố mẹ vui lòng nhập số điện thoại..."
            />

            <div className="checkbox">
                <input type="checkbox" id="agree" />
                <label htmlFor="agree">
                    Ba mẹ đã đọc và đồng ý với Điều Khoản Chung & Chính Sách Bảo Mật
                </label>
            </div>

            <button onClick={onNext}>Tiếp tục</button>
        </div>
    );
};

export default PhoneForm;