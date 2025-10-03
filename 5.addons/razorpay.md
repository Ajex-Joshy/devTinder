# Razorpay Integration Guide

Razorpay is a popular payment gateway that allows you to accept online payments easily. This guide explains the complete flow of integrating Razorpay into your application, including order creation, payment processing, signature verification, and handling webhooks.

## 1. Create an Order

- Use Razorpay's API to create an **order** on the server-side.
- The response will include an **order_id**, which is a unique identifier for the transaction.

## 2. Pass Order Details to the Client

- Send the **order_id** along with other necessary details (amount, currency, etc.) to the client.
- On the client side, use Razorpay's checkout script to initiate the payment using the **order_id**.

## 3. Payment Processing on Client Side

- The user completes the payment using Razorpay's checkout form.
- After successful payment, Razorpay returns a **payment_id**, **order_id**, and a **signature** to the client.

## 4. Signature Verification (Server Side)

- To ensure the payment is legitimate and untampered, verify the signature on the server.
- Use your **secret key** (available in Razorpay dashboard) along with the received **order_id** and **payment_id** to generate a HMAC SHA256 hash.
- Compare the generated hash with the **signature** received from Razorpay.
- If they match, the payment is verified successfully.

## 5. Handling Webhooks

- Razorpay sends webhook events to your server for various payment status updates.
- Set up an endpoint to listen for these webhook events.
- Verify the webhook signature using your **secret key** to ensure the webhook is from Razorpay.
- Use webhooks to update payment status in your database asynchronously and handle refunds, cancellations, etc.

## Best Practices

- Always verify the payment signature on the server to avoid fraudulent transactions.
- Use webhooks for reliable payment status updates, especially when client-side verification might fail.
- Keep your **secret key** secure and never expose it on the client side.
- Log all payment events and errors for auditing and troubleshooting.

By following this flow and implementing proper verification, you can securely integrate Razorpay payments into your application.
