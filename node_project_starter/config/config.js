import 'dotenv/config';

const config = {
  port: process.env.PORT || 3000,
  api: process.env.ABSTRACT_API_KEY,
};

export default config;