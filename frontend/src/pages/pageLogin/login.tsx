import React, { useState } from "react";
import "./login.css";
import PhoneForm from "../../components/PhoneForm";
import InfoForm from "../../components/InfoForm";

const Login = () => {
    const [step, setStep] = useState(1);

    return (
        <div className="login-page">
            <div className="background">
                <div className="form-wrapper">
                    {step === 1 && <PhoneForm onNext={() => setStep(2)} />}
                    {step === 2 && <InfoForm />}
                </div>
            </div>
        </div>
    );
};

export default Login;