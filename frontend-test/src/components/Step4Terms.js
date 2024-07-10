import React, { useContext, useState, useEffect } from 'react';
import { FormContext } from '../contexts/FormContext';
import productImage from '../images/image1.PNG';

const Step4Terms = ({ nextStep }) => {
    const { formData, updateFormData } = useContext(FormContext);
    const [termsAccepted, setTermsAccepted] = useState({
        term1: formData.termsAccepted?.term1 || false,
        term2: formData.termsAccepted?.term2 || false,
        term3: formData.termsAccepted?.term3 || false,
    });
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setIsValid(termsAccepted.term1 && termsAccepted.term2 && termsAccepted.term3);
    }, [termsAccepted]);

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setTermsAccepted(prevState => ({ ...prevState, [name]: checked }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            updateFormData('termsAccepted', termsAccepted);
            nextStep();
        } else {
            setError('You must accept all the terms and conditions to proceed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="step-content">
            <div className="info-box">
                <div className="info-section">
                    <div>
                        <h3>Your order</h3>
                        <div className="order-item">
                            <img src={productImage} alt="Product" className="product-image" />
                            <div className="product-details">
                                <p>1 X GEM OIL</p>
                                <p>Organic edition</p>
                            </div>
                        </div>
                    </div>
                </div>
                
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
              
                <div className="info-section">
                    <div>
                        <h3>Payment details</h3>
                        <p>£1.79 - Visa ending **** {formData.paymentInfo.cardNumber ? formData.paymentInfo.cardNumber.slice(-4) : ''}</p>
                        <p>Expiry Date: {formData.paymentInfo.expiryDate}</p>
                    </div>
                    <a href="#" className="edit-link">Edit</a>
                </div>
            </div>
            <div className="spacing-box"></div>
            <div className="terms-box">
                <h2>Terms and conditions <span className="required">*</span></h2>
                <p>Read the terms of use and privacy policy</p>
                <label className={`checkbox-label ${termsAccepted.term1 ? 'checked' : ''}`}>
                    <span className="vitamin-text">terms terms terms terms terms <br></br> terms terms terms terms terms</span>
                    <input
                        type="checkbox"
                        name="term1"
                        checked={termsAccepted.term1}
                        onChange={handleChange}
                    />
                    <span className="checkbox-custom"></span>
                </label>
                <label className={`checkbox-label ${termsAccepted.term2 ? 'checked' : ''}`}>
                    <span className="vitamin-text">terms terms terms terms terms <br></br> terms terms terms terms terms</span>
                    <input
                        type="checkbox"
                        name="term2"
                        checked={termsAccepted.term2}
                        onChange={handleChange}
                    />
                    <span className="checkbox-custom"></span>
                </label>
                <label className={`checkbox-label ${termsAccepted.term3 ? 'checked' : ''}`}>
                    <span className="vitamin-text">terms terms terms terms terms <br></br> terms terms terms terms terms</span>
                    <input
                        type="checkbox"
                        name="term3"
                        checked={termsAccepted.term3}
                        onChange={handleChange}
                    />
                    <span className="checkbox-custom"></span>
                </label>
                {error && <p className="error">{error}</p>}
            </div>
            <button type="submit" className={`btn-next ${isValid ? 'enabled' : 'disabled'}`}>Confirm order</button>
        </form>
    );
};

export default Step4Terms;