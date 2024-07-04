'use client'
import React, { useState, useEffect} from 'react';
import CartModal from './cartModal';
import Link from 'next/link';
import { Product} from '@/redux/features/cartSlice';
import { useSelector} from 'react-redux';

const NavBar: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const items = useSelector((state: { cart: { item: Product[] } }) => state.cart.item);
    // const [cartState, setCartState] = useState<CartState>(initialState);
   const [cartItems, setCartItems] = useState<Product[]>([]);
    
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, [items]);

    const handleCartClick = () => {
        setIsCartOpen(true);
    };

    const handleCloseModal = () => {
        setIsCartOpen(false);
    };

    
    return (
        <header className="h-16 bg-white w-full p-4 shadow-md fixed top-0 z-50">
            <nav className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="text-2xl font-bold text-gray-800">
                    <Link href="/">UrbanStyle</Link>
                </div>
                <ul className="flex space-x-6 text-lg font-medium text-gray-600">
                    <li>
                        <Link href="/" className="hover:text-gray-900 transition-colors duration-200">Home</Link>
                    </li>
                    <li>
                        <Link href="/products" className="hover:text-gray-900 transition-colors duration-200">Productos</Link>
                    </li>
                </ul>
                <div className="relative">
                    <button onClick={handleCartClick} className="relative focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800 hover:text-gray-900 transition-colors duration-200">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        <div className='absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold'>
                            {cartItems.length}
                        </div>
                    </button>
                </div>
            </nav>
            <CartModal isOpen={isCartOpen} onRequestClose={handleCloseModal} />
        </header>
    );
};

export default NavBar;
