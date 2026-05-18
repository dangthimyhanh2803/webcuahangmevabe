import React from "react";

function InfoForm() {
    return (
        <div className="form-box">
            <h3>Nhập thông tin</h3>
            <input type="text" placeholder="Tên..." />
            <input type="password" placeholder="Mật khẩu..." />
            <button>Hoàn tất</button>
        </div>
    );
}

export default InfoForm;