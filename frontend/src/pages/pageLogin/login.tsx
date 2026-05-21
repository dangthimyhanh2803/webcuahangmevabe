import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import PhoneForm from "../../components/phoneForm";
import InfoForm from "../../components/infoForm";
import OtpForm from "../../components/otpForm";
import RegisterForm from "../../components/registerForm";

const Login = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState("PHONE");
    const [phone, setPhone] =
        useState("");
    return (
        <div className="login-page">
            <div className="background">
                <div className="form-wrapper">

                    {
                        step === "PHONE" && (

                            <PhoneForm
                                setPhone={setPhone}
                                onLogin={() =>
                                    setStep("LOGIN")
                                }
                                onOtp={() =>
                                    setStep("OTP")
                                }
                            />
                        )
                    }

                    {
                        step === "OTP" && (
                            <OtpForm
                                phone={phone}
                                onNext={() =>
                                    setStep("REGISTER")
                                }
                            />
                        )
                    }

                    {
                        step === "REGISTER" && (

                            <RegisterForm
                                phone={phone}
                                onSuccess={() => navigate("/")}
                            />
                        )
                    }

                    {
                        step === "LOGIN" && (
                            <InfoForm
                                phone={phone}
                            />
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default Login;