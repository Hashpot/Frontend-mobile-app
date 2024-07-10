import React, { useContext, useState, useEffect } from 'react';
import { FormContext } from '../contexts/FormContext';
import { validatePostcode } from '../utils/postcodeValidation';

const Step2PersonalInfo = ({ nextStep }) => {
    const { formData, updateFormData } = useContext(FormContext);
    const [personalInfo, setPersonalInfo] = useState(formData.personalInfo || {});
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const validateForm = async () => {
            const newErrors = {};
            if (!personalInfo.name) newErrors.name = 'Name is required';
            if (!personalInfo.email) newErrors.email = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) newErrors.email = 'Email is invalid';
            if (!personalInfo.streetAddress) newErrors.streetAddress = 'Street address is required';
            if (!personalInfo.city) newErrors.city = 'City is required';
            if (!personalInfo.postcode) newErrors.postcode = 'Postcode is required';
            else {
                const isValid = await validatePostcode(personalInfo.postcode);
                if (!isValid) newErrors.postcode = 'Invalid UK postcode';
            }
            setErrors(newErrors);
            setIsValid(Object.keys(newErrors).length === 0);
        };
        validateForm();
    }, [personalInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = async (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        await validateField(name);
    };

    const validateField = async (fieldName) => {
        let error = '';
        switch (fieldName) {
            case 'name':
                if (!personalInfo.name) error = 'Name is required';
                break;
            case 'email':
                if (!personalInfo.email) error = 'Email is required';
                else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) error = 'Email is invalid';
                break;
            case 'streetAddress':
                if (!personalInfo.streetAddress) error = 'Street address is required';
                break;
            case 'city':
                if (!personalInfo.city) error = 'City is required';
                break;
            case 'postcode':
                if (!personalInfo.postcode) error = 'Postcode is required';
                else {
                    const isValid = await validatePostcode(personalInfo.postcode);
                    if (!isValid) error = 'Invalid UK postcode';
                }
                break;
            default:
                break;
        }
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValid) {
            updateFormData('personalInfo', personalInfo);
            nextStep();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="step-content step2-form">
            <div className="intro-text">
                <p>Some intro copy some intro copy Some intro copy some intro copy</p>
            </div>
            <h2 className='about'>About you</h2>
            <input
                type="text"
                name="name"
                value={personalInfo.name || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Full name"
                className={`input-personal-info ${errors.name && touched.name ? 'error' : ''}`}
            />
            {errors.name && touched.name && <p className="error">{errors.name}</p>}
            <input
                type="email"
                name="email"
                value={personalInfo.email || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email address"
                className={`input-personal-info ${errors.email && touched.email ? 'error' : ''}`}
            />
            {errors.email && touched.email && <p className="error">{errors.email}</p>}
            <input
                type="text"
                name="streetAddress"
                value={personalInfo.streetAddress || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Street address"
                className={`input-personal-info ${errors.streetAddress && touched.streetAddress ? 'error' : ''}`}
            />
            {errors.streetAddress && touched.streetAddress && <p className="error">{errors.streetAddress}</p>}
            <input
                type="text"
                name="city"
                value={personalInfo.city || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Town / City"
                className={`input-personal-info ${errors.city && touched.city ? 'error' : ''}`}
            />
            {errors.city && touched.city && <p className="error">{errors.city}</p>}
            <input
                type="text"
                name="postcode"
                value={personalInfo.postcode || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Postcode"
                className={`input-personal-info ${errors.postcode && touched.postcode ? 'error' : ''}`}
            />
            {errors.postcode && touched.postcode && <p className="error">{errors.postcode}</p>}
            <div className="button-group">
                <button type="submit" className={`btn-next ${isValid ? 'enabled' : 'disabled'}`}>Continue</button>
            </div>
        </form>
    );
};

export default Step2PersonalInfo;