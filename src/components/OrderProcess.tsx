import React, { useState } from 'react';
import useOrderStore from '../store/orderStore';

/**
 * OrderProcess component that demonstrates a state machine approach using Zustand
 */
const OrderProcess: React.FC = () => {
  const [paymentInput, setPaymentInput] = useState<string>('');
  const {
    state, cart, error, addToCart, goToCheckout, goBack, submitPayment, placeOrder
  } = useOrderStore();

  return (
    <div>
      <h2>Order Process (Zustand State Machine)</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {state === 'browsing' && (
        <>
          <button onClick={() => addToCart('item')}>Add Item</button>
          <button onClick={goToCheckout} disabled={cart.length === 0}>Checkout</button>
          <p>Cart: {cart.join(', ') || 'Empty'}</p>
        </>
      )}

      {state === 'paymentEntry' && (
        <>
          <input
            placeholder="Payment details"
            value={paymentInput}
            onChange={(e) => setPaymentInput(e.target.value)}
          />
          <button onClick={() => submitPayment(paymentInput)}>Submit Payment</button>
          <button onClick={goBack}>Back</button>
        </>
      )}

      {state === 'processingPayment' && <p>Processing Payment...</p>}

      {state === 'confirmOrder' && (
        <>
          <button onClick={placeOrder}>Confirm Order</button>
          <button onClick={goBack}>Back</button>
        </>
      )}

      {state === 'processingOrder' && <p>Placing Order...</p>}

      {state === 'orderComplete' && <p>Order Complete!</p>}
    </div>
  );
};

export default OrderProcess;
