import React, { useState } from 'react';
import useOrderStore from '../store/orderStore';

/**
 * OrderProcess component that demonstrates a state machine approach using Zustand
 */
const OrderProcess: React.FC = () => {
  const [paymentInput, setPaymentInput] = useState('');
  const {
    state, cart, error, addToCart, goToCheckout, goBack, submitPayment, placeOrder
  } = useOrderStore();

  return (
    <div className="card shadow">
      <div className="card-header">
        <h3 className="card-title">Order Process (Zustand State Machine)</h3>
      </div>
      <hr className="divider" />
      <div className="card-content flex flex-col gap-4">
        {error && (
          <div className="p-2 rounded bg-red-50 text-red-600 border border-red-200 shadow text-sm">
            {error}
          </div>
        )}
        {state === 'browsing' && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <button onClick={() => addToCart('item')} className="button">Add Item</button>
              <button
                onClick={goToCheckout}
                disabled={cart.length === 0}
                className="button button-secondary"
              >
                Checkout
              </button>
            </div>
            <div className="p-2 rounded bg-blue-50 border border-blue-200 shadow">
              <span className="font-medium">Cart:</span>
              <span className="ml-2 text-gray-600">
                {cart.length === 0 ? 'Empty' : cart.join(', ')}
              </span>
            </div>
          </div>
        )}
        {state === 'paymentEntry' && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Payment details"
              value={paymentInput}
              onChange={e => setPaymentInput(e.target.value)}
              className="input"
            />
            <div className="flex gap-2">
              <button onClick={() => submitPayment(paymentInput)} className="button">
                Submit Payment
              </button>
              <button onClick={goBack} className="button button-secondary">
                Back
              </button>
            </div>
          </div>
        )}
        {state === 'processingPayment' && (
          <div className="flex flex-col gap-2 items-center p-4 rounded bg-blue-50 border border-blue-200">
            <div className="p-2 rounded bg-blue-50 h-8 w-full"></div>
            <span className="text-gray-600 text-sm">Processing Payment...</span>
          </div>
        )}
        {state === 'confirmOrder' && (
          <div className="flex gap-2">
            <button onClick={placeOrder} className="button">Confirm Order</button>
            <button onClick={goBack} className="button button-secondary">Back</button>
          </div>
        )}
        {state === 'processingOrder' && (
          <div className="flex flex-col gap-2 items-center p-4 rounded bg-blue-50 border border-blue-200">
            <div className="p-2 rounded bg-blue-50 h-8 w-full"></div>
            <span className="text-gray-600 text-sm">Placing Order...</span>
          </div>
        )}
        {state === 'orderComplete' && (
          <div className="p-4 rounded bg-green-50 text-green-600 text-center border border-green-200 shadow font-semibold">
            Order Complete! 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderProcess;
