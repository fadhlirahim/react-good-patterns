import { create } from 'zustand';

/**
 * Simulated async function to process payment
 * @param details - Payment details
 * @returns A promise that resolves with the payment details
 */
async function processPayment(details: string): Promise<string> {
  return new Promise((res) => setTimeout(() => res(details), 1000));
}

/**
 * Simulated async function to submit an order
 * @param cart - Array of items in the cart
 * @param paymentDetails - Payment details
 * @returns A promise that resolves when the order is submitted
 */
async function submitOrder(cart: string[], paymentDetails: string | null): Promise<void> {
  return new Promise((res) => setTimeout(res, 1000));
}

/**
 * Type for the possible states of the order process
 */
type OrderState = 'browsing' | 'paymentEntry' | 'processingPayment' | 'confirmOrder' | 'processingOrder' | 'orderComplete';

/**
 * Interface for the order store state
 */
interface OrderStore {
  state: OrderState;
  cart: string[];
  paymentDetails: string | null;
  error: string | null;
  addToCart: (item: string) => void;
  goToCheckout: () => void;
  goBack: () => void;
  submitPayment: (details: string) => Promise<void>;
  placeOrder: () => Promise<void>;
}

/**
 * Zustand store implementing a state machine for the order process
 */
const useOrderStore = create<OrderStore>((set, get: () => OrderStore) => ({
  state: 'browsing',
  cart: [],
  paymentDetails: null,
  error: null,

  addToCart: (item: string) => set((state: OrderStore) => ({ cart: [...state.cart, item] })),

  goToCheckout: () => set({ state: 'paymentEntry' }),

  goBack: () => {
    const { state } = get();
    if (state === 'paymentEntry') set({ state: 'browsing' });
    else if (state === 'confirmOrder') set({ state: 'paymentEntry' });
  },

  submitPayment: async (details: string) => {
    set({ state: 'processingPayment', error: null });
    try {
      const result = await processPayment(details);
      set({ state: 'confirmOrder', paymentDetails: result });
    } catch (e) {
      set({ state: 'paymentEntry', error: (e as Error).message });
    }
  },

  placeOrder: async () => {
    const { cart, paymentDetails } = get();
    set({ state: 'processingOrder', error: null });
    try {
      await submitOrder(cart, paymentDetails);
      set({ state: 'orderComplete' });
    } catch (e) {
      set({ state: 'confirmOrder', error: (e as Error).message });
    }
  },
}));

export default useOrderStore;
