import React from 'react';
import { FormProvider } from './contexts/FormContext';
import StepForm from './components/StepForm';
import './App.css';

function App() {
  return (
    <FormProvider>
      <div className="app">
        <StepForm />
      </div>
    </FormProvider>
  );
}

export default App;