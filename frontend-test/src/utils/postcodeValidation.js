export const validatePostcode = async (postcode) => {
    try {
      const response = await fetch(`https://api.postcodes.io/postcodes/${postcode}/validate`);
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error validating postcode:', error);
      return false;
    }
  };