import React, { useContext, useState, useEffect } from 'react';
import { FormContext } from '../contexts/FormContext';
import appleLogo  from '../images/apple.png';

const Step3Payment = ({ nextStep }) => {
    const { formData, updateFormData } = useContext(FormContext);
    const [paymentInfo, setPaymentInfo] = useState(formData.paymentInfo || {});
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const validateForm = () => {
            const newErrors = {};
            if (touched.cardNumber && !paymentInfo.cardNumber) newErrors.cardNumber = 'Card number is required';
            if (touched.expiryDate && !paymentInfo.expiryDate) newErrors.expiryDate = 'Expiry date is required';
            if (touched.cvv && !paymentInfo.cvv) newErrors.cvv = 'CVV is required';
            setErrors(newErrors);
            setIsValid(Object.keys(newErrors).length === 0);
        };
        validateForm();
    }, [paymentInfo, touched]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            updateFormData('paymentInfo', paymentInfo);
            nextStep();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="step-content">
            <div className="info-box">
                <div className="info-section">
                    <div>
                        <h3>About you</h3>
                        <p>{formData.personalInfo.name}</p>
                        <p>{formData.personalInfo.email}</p>
                    </div>
                    <a href="#" className="edit-link">Edit</a>
                </div>
                <div className="info-section">
                    <div>
                        <h3>Shipping</h3>
                        <p>{formData.personalInfo.streetAddress}</p>
                        <p>{formData.personalInfo.city}</p>
                        <p>{formData.personalInfo.postcode}</p>
                    </div>
                    <a href="#" className="edit-link">Edit</a>
                </div>
            </div>
            <div className="payment-box">
                <h2>Payment method</h2>
                <div className="payment-methods">
                    <div className="subtotal">
                        <p>Subtotal - <span className="free">Free</span></p>
                        <p>Tax -</p>
                        <p>Shipping - £1.79</p>
                        <div className="total-container">
                            <p>Total - <span className="total">£1.79</span></p>
                        </div>
                    </div>
                    <div className="apple-pay-container">
                        <button className="apple-pay">
                            <img src={appleLogo} alt="Apple Logo" className="apple-logo" /> Pay
                        </button>
                    </div>
                    <p className="or">Or pay using card</p>
                </div>
                <input
                    type="text"
                    name="cardNumber"
                    value={paymentInfo.cardNumber || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="1234 1234 1234 1234"
                    className={`card-number ${errors.cardNumber ? 'error' : ''}`}
                />
                {errors.cardNumber && touched.cardNumber && <p className="error">{errors.cardNumber}</p>}
                <div className="card-details">
                    <input
                        type="text"
                        name="expiryDate"
                        value={paymentInfo.expiryDate || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="EXP"
                        className={errors.expiryDate ? 'error' : ''}
                    />
                    <input
                        type="text"
                        name="cvv"
                        value={paymentInfo.cvv || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="CVV"
                        className={`cvv-number ${errors.cvv ? 'error' : ''}`}
                    />
                </div>
                {errors.expiryDate && touched.expiryDate && <p className="error">{errors.expiryDate}</p>}
                {errors.cvv && touched.cvv && <p className="error">{errors.cvv}</p>}
                <div className="checkbox-group">
                    <label>
                        <input type="checkbox" />
                        Billing address is the same as shipping
                    </label>
                </div>
                <p className="note">You will not be charged until your sample request is approved</p>
            </div>
            <div className="button-group">
                <button type="submit" className={`btn-next ${isValid ? 'enabled' : 'disabled'}`}>Continue</button>
            </div>
        </form>
    );
};

export default Step3Payment;