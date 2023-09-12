import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems }) {
  let stripepromise = null;
  const getstripe = () => {
    if (!stripepromise) {
      stripepromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
    }
    return stripepromise;
  };
  const stripe = await getstripe();
  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    // successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    successUrl: `${window.location.origin}/components/Products/Delivery`,
    cancelUrl: window.location.origin,
  });
}
