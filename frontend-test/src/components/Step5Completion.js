import React, { useContext } from 'react';
import { FormContext } from '../contexts/FormContext';
import productImage from '../images/image1.PNG';

const Step5Completion = ({ resetForm }) => {
    const { formData } = useContext(FormContext);

    return (
        <div className="completion-container">
            <div className="completion-header">
                <h1>Thank you!</h1>
                <p>Thanks for your request, it's being reviewed.<br />Keep an eye out on your inbox for further updates.</p>
            </div>
            <div className="completion-section">
                <h3>Shipping</h3>
                <p>You will not be charged until your sample request is approved</p>
            </div>
            <div className="completion-section">
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
    );
};

export default Step5Completion;