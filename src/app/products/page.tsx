'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart,  Product, dismissAddAlert} from "@/redux/features/cartSlice";
import { RootState } from "@/redux/store";
import NavBar from "../components/nav/page";
import Image from "next/image";


interface Article extends Product{
  description: string
}
export default function Products() {
  const [articles, setArticles] = useState<Article[]>([]);
 ;const { showAddAlert, isInCart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  
  useEffect(() => {
    if (showAddAlert) {
        setTimeout(() => {
            dispatch(dismissAddAlert());
        }, 3000);
    }
}, [showAddAlert, dispatch]);

  const handleClick = (id: string, title: string, price: number, image: string) => {
    const item = { id, title, price, image };
    
    dispatch(addCart(item));
    
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Productos</h1>


      {/* Alerta */}
      {showAddAlert && (
        <div className="fixed bottom-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-md">
          {isInCart ? 'EL Producto ya está en el carrito' : 'Nuevo Producto  al carrito'}
        </div>
      )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="card p-4 border border-gray-200 shadow-lg rounded-lg flex flex-col"
            >
              <div className="img-card w-full h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                <Image
                  className="object-cover w-full h-full"
                  src={article.image}
                  alt={article.title}
                  width={700}
                  height={500}
                  priority
                />
              </div>
              <div className="body-card p-4 flex-grow">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="description text-sm text-gray-700 line-clamp-3">{article.description}</p>
                <p className="text-lg font-bold text-blue-600 mt-2">${article.price}</p>
              </div>
              <div className="flex justify-center mt-auto">
                <button
                  onClick={() => handleClick(article.id, article.title, article.price, article.image)}
                  className="btn-card bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
