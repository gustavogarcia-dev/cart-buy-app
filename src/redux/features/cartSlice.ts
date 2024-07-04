import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
}

export interface CartState {
    item: Product[];
    showAddAlert: boolean; 
    isInCart: boolean;
}
export const initialState: CartState = {
    item: [],
    showAddAlert: false,
    isInCart: false,
};

export const getInitialCartState = (): CartState => {
    if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            return {
                ...initialState,
                item: JSON.parse(storedCart),
            };
        }
    }
    return initialState;
};
  
export const cartSlice = createSlice({
    name: 'cart',
    initialState: getInitialCartState(),
    reducers: {
        
        addCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.item.find(item => item.id === action.payload.id);
            
            if (existingItem) {
                state.isInCart = true;
                state.showAddAlert = true;
            } else {
                state.item.push({ ...action.payload});

                state.isInCart = false;
                state.showAddAlert = true;
                localStorage.setItem('cart', JSON.stringify(state.item));

            }
            
        },
        
        removeItem: (state, action: PayloadAction<string>) => {
            state.item = state.item.filter(item => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.item));
        },
        clearCart: (state) => {
            state.item = [];
            localStorage.setItem('cart', JSON.stringify(state.item));
            
          },
          dismissAddAlert: (state) => {
            state.showAddAlert = false;
        }
    }
})

export const {addCart,removeItem, clearCart, dismissAddAlert,} = cartSlice.actions
export default cartSlice.reducer