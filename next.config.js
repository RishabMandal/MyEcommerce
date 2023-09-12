/** @type {import('next').NextConfig} */
const nextConfig = {
//   output: "export",
  env: {
    MONGO_URL:
      "mongodb+srv://Rishab829:Kanchan%401@expresstry.wqhmyb0.mongodb.net/myecommerce?retryWrites=true&w=majority",
      STRIPE_PUBLIC_KEY:"pk_test_51Np7d4SHBnKtF1MbVoLUuKGTci9hWRJrGFTN0Ry5NBPc0jYh1pF70qjCVXcehn7CQSUNk6ex9GpDmnU83yVGuad4004R5EITA6"
  },
};

module.exports = nextConfig;
