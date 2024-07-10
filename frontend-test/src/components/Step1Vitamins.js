import React, { useContext, useState, useEffect  } from 'react';
import { FormContext } from '../contexts/FormContext';

const Step1Vitamins = ({ nextStep }) => {
    const { formData, updateFormData } = useContext(FormContext);
    const [selectedVitamins, setSelectedVitamins] = useState(formData.vitamins);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setIsValid(selectedVitamins.length > 0);
    }, [selectedVitamins]);

    const vitamins = ['Multivitamin', 'Vitamin D', 'Collagen', 'Omega 3'];

    const handleVitaminChange = (vitamin) => {
        const updatedVitamins = selectedVitamins.includes(vitamin)
            ? selectedVitamins.filter(v => v !== vitamin)
            : [...selectedVitamins, vitamin];
        setSelectedVitamins(updatedVitamins);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            updateFormData('vitamins', selectedVitamins);
            nextStep();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="step-content">
            <div className="intro-box">
                <div className="intro-text">
                    <h2>The sample's on us, <br></br>just cover the postage for only £1.79</h2>
                    <p>This is some intro copy sub text</p>
                    <p>This is some intro copy sub text</p>
                    <p>This is some intro copy sub text</p>
                </div>
            </div>
            <div className="spacing-box"></div>
            <div className="vitamin-selection-box">
                <div className="vitamin-header">
                    <h2 className="vitamin">What vitamins do you <br></br> currently buy?</h2>
                    <p className="required">Required</p>
                </div>
                {vitamins.map(vitamin => (
                    <label key={vitamin} className={`checkbox-label ${selectedVitamins.includes(vitamin) ? 'checked' : ''}`}>
                        <span className="vitamin-text">{vitamin}</span>
                        <input
                            type="checkbox"
                            checked={selectedVitamins.includes(vitamin)}
                            onChange={() => handleVitaminChange(vitamin)}
                        />
                        <span className="checkbox-custom"></span>
                    </label>
                ))}
            </div>
            <button type="submit" className={`btn-next ${isValid ? 'enabled' : 'disabled'}`}>Get Started</button>
        </form>
    );
};

export default Step1Vitamins;