import React, { useState, useContext } from 'react';
import Step1Vitamins from './Step1Vitamins';
import Step2PersonalInfo from './Step2PersonalInfo';
import Step3Payment from './Step3Payment';
import Step4Terms from './Step4Terms';
import Step5Completion from './Step5Completion';
import { FormContext } from '../contexts/FormContext';
import image1 from '../images/image1.PNG';

const StepForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const { updateFormData } = useContext(FormContext);

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const goToStep = (step) => {
        if (step > 1 && currentStep < step) return; // Prevent navigation if steps are not completed sequentially
        setCurrentStep(step);
    };

    const resetForm = () => {
        setCurrentStep(1);
        updateFormData('vitamins', []);
        updateFormData('personalInfo', {});
        updateFormData('paymentInfo', {});
        updateFormData('termsAccepted', false);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1Vitamins nextStep={nextStep} />;
            case 2:
                return <Step2PersonalInfo nextStep={nextStep} />;
            case 3:
                return <Step3Payment nextStep={nextStep} />;
            case 4:
                return <Step4Terms nextStep={nextStep} />;
            case 5:
                return <Step5Completion resetForm={resetForm} />;
            default:
                return null;
        }
    };

    return (
        <div className="step-form">
            <div className="title">sampl</div>
            <img src={image1} alt="sampl" className="header-image" />
            <div className="progress-dots">
                {[1, 2, 3, 4, 5].map((step) => (
                    <span
                        key={step}
                        className={`dot ${currentStep >= step ? 'active' : ''}`}
                        onClick={() => goToStep(step)}
                    ></span>
                ))}
            </div>
            {renderStep()}
        </div>
    );
};

export default StepForm;