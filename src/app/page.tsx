'use client'
import NavBar from "@/app/components/nav/page";
import Products from "@/app/products/page";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center p-4 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between p-8 bg-white rounded-lg shadow-lg">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              Bienvenido a Tu Tienda Favorita
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Descubre productos exclusivos para ti
            </p>
            <Link href="/products">
              <div className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 block w-full md:inline-block md:w-auto text-center">
                Ver Productos
              </div>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              className="rounded-lg shadow-xl max-w-full md:max-w-md"
              src="https://www.dsigno.es/blog/wp-content/uploads/2023/04/Decorar-una-tienda-de-ropa.png"
              alt="Decoración de una tienda de ropa"
              width={600}
              height={400}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
