import dotenv from 'dotenv';
dotenv.config();

const ABSTRACT_API_KEY = process.env.ABSTRACT_API_KEY;

if (!ABSTRACT_API_KEY) {
  console.warn("WARNING: ABSTRACT_API_KEY is not set in your .env file. API calls to AbstractAPI will fail.");
}

export const validateEmail = async (emailAddress) => {
  if (!ABSTRACT_API_KEY) {
    throw new Error('AbstractAPI key is missing. Please set ABSTRACT_API_KEY in your .env file.');
  }
  const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&email=${emailAddress}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AbstractAPI Email Validation failed with status ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in validateEmail (externalApi.js):', error.message);
    throw error;
  }
};

// validatePhone function removed as per new requirement