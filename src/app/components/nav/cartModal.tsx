import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart, Product } from '@/redux/features/cartSlice';
import Image from 'next/image';

interface CartModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();
  // const [items, setItems] = useState([])
  const items = useSelector((state: { cart: { item: Product[] } }) => state.cart.item);
  const calculateTotal = (products: Product[]) => {
    return products.reduce((total, product) => total + product.price, 0);
  };

  const total = calculateTotal(items);

  // Formatear el total a dos decimales
  const formattedTotal = total.toFixed(2);
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`fixed inset-y-0 right-0 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out max-w-full w-full md:max-w-3xl lg:max-w-xl z-50`}>
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">UrbanStyle</h2>
          <button onClick={onRequestClose} className="text-gray-500 hover:text-gray-800 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-lg text-gray-700">El carrito está vacío</p>
            <button onClick={onRequestClose} className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition-colors duration-200">Comprar productos</button>
          </div>
        ) : (
          <ul className="flex-grow overflow-y-auto pr-4">
            {items.map((item) => (
              <li key={item.id} className="w-full my-2 p-4 bg-gray-100 border border-gray-200 rounded-lg flex">
                <div className="w-1/3">
                  <Image src={item.image} alt={item.title} width={700} height={500} className="w-full h-auto object-cover rounded" />
                </div>
                <div className="w-2/3 flex flex-col justify-between pl-4">
                  <div>
                    <p className="text-sm text-gray-800 font-medium">{item.title}</p>
                    <p className="text-lg text-gray-900 font-semibold">${item.price}</p>
                  </div>
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className=" justify-center mt-2 bg-red-500 text-white py-1 px-2 rounded flex items-center hover:bg-red-600 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9L14.394 18m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4">
          <div className="text-lg font-semibold text-gray-800">Total a pagar: <span className="text-gray-900">${formattedTotal}</span></div>
          <button onClick={() => dispatch(clearCart())} className="w-full bg-yellow-500 text-white py-2 rounded mt-4 hover:bg-yellow-600 transition-colors duration-200">Clear Cart</button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
