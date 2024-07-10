import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    vitamins: [],
    personalInfo: {},
    paymentInfo: {},
    termsAccepted: false,
  });

  const updateFormData = (step, data) => {
    setFormData(prevData => ({ ...prevData, [step]: data }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};
