'use client';

import { useState, useEffect, useCallback } from "react";
import Image from 'next/image'; // *** Importar next/image ***
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// Interfaz FoodProduct (sin cambios respecto a la versión anterior)
interface FoodProduct {
  id: string | number;
  code?: string;
  product_name?: string;
  brands?: string;
  categories?: string;
  countries?: string;
  image_front_url?: string;
  image_ingredients_url?: string;
  image_nutrition_url?: string;
  nutriscore_grade?: string;
  nova_group?: number | string;
  ecoscore_grade?: string;
  ingredients_text?: string;
  additives_tags?: string[];
  allergens?: string;
  ingredients_analysis_tags?: string[];
  nutriments?: {
    "energy-kcal"?: number | string;
    proteins?: number | string;
    fat?: number | string;
    "saturated-fat"?: number | string;
    carbohydrates?: number | string;
    sugars?: number | string;
    fiber?: number | string;
    salt?: number | string;
    sodium?: number | string;
  };
}

const API_BASE_URL = "http://localhost:8000/api/product";
const ITEMS_PER_PAGE = 6;

// --- ¡IMPORTANTE! Configuración para next/image ---
// Debes añadir el hostname de donde provienen tus imágenes
// a tu archivo next.config.js. Por ejemplo:
// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http', // o 'https'
//         hostname: 'localhost', // o el dominio real ej: 'static.openfoodfacts.org'
//         port: '8000', // si es necesario (como en localhost)
//         pathname: '**', // o una ruta más específica si quieres
//       },
//       // Añade otros dominios si usas más fuentes de imágenes
//     ],
//   },
// }

export default function FoodSearch() {
  const [search, setSearch] = useState("");
  const [allFoods, setAllFoods] = useState<FoodProduct[]>([]);
  const [currentFoods, setCurrentFoods] = useState<FoodProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFood, setSelectedFood] = useState<FoodProduct | null>(null);
  const [isBarcodeSearch, setIsBarcodeSearch] = useState(false);

  // fetchFoods, useEffects, handlers (sin cambios respecto a la versión anterior)
  const fetchFoods = useCallback(async (searchTerm: string, requestedPage: number) => {
    if (!searchTerm.trim()) {
      setError("Por favor, ingrese un nombre o código de barras.");
      setAllFoods([]);
      setTotalPages(1);
      setPage(1);
      return;
    }
    setLoading(true);
    setError(null);
    if (requestedPage === 1) {
        setPage(1);
    }
    try {
      const isBarcode = /^\d+$/.test(searchTerm);
      setIsBarcodeSearch(isBarcode);
      const endpoint = isBarcode
        ? `${API_BASE_URL}/barcode/${searchTerm}`
        : `${API_BASE_URL}/name?name=${encodeURIComponent(searchTerm)}`;
      const response = await fetch(endpoint);
      if (!response.ok) {
        let errorMessage = `Error al buscar: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.detail || errorMessage;
        } catch {}
        throw new Error(errorMessage);
      }
      const data = await response.json();
      let fetchedFoods: FoodProduct[] = [];
      let calculatedTotalPages = 1;
      if (isBarcode) {
        if (data.product) {
          fetchedFoods = [data.product];
        }
        calculatedTotalPages = 1;
      } else {
        fetchedFoods = data.products || [];
        calculatedTotalPages = Math.ceil(fetchedFoods.length / ITEMS_PER_PAGE);
      }
      setAllFoods(fetchedFoods);
      setTotalPages(calculatedTotalPages);
      setPage(current => Math.min(current, calculatedTotalPages));
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(`Error: ${err.message}`);
        } else {
            setError("Ocurrió un error desconocido.");
        }
        setAllFoods([]);
        setTotalPages(1);
        setPage(1);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isBarcodeSearch) {
      setCurrentFoods(allFoods);
    } else {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setCurrentFoods(allFoods.slice(startIndex, endIndex));
    }
  }, [allFoods, page, isBarcodeSearch]);

  const handleSearchClick = () => {
    setPage(1);
    fetchFoods(search, 1);
  };
  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <Navbar />
      <main className="flex-grow px-4 py-8 sm:px-8 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 sm:mb-10 text-center text-blue-800 tracking-tight">
          Buscar Alimentos
        </h2>

        {/* Input y Botón de Búsqueda */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-10">
          <Input
            type="text"
            placeholder="Introduce nombre o código de barras..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { handleSearchClick(); } }}
            className="flex-1 border-2 border-blue-500 focus:ring-blue-500 rounded-lg shadow-md text-base sm:text-lg px-4 py-2 sm:py-3"
            aria-label="Campo de búsqueda de alimentos"
          />
          <Button
            onClick={handleSearchClick}
            disabled={loading || !search.trim()}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg text-base sm:text-lg font-semibold transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
            {loading ? "Buscando..." : "Buscar"}
          </Button>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <p role="alert" className="text-red-600 text-center mb-6 sm:mb-8 font-medium bg-red-100 p-3 sm:p-4 rounded-lg shadow-md">
            {error}
          </p>
        )}

        {/* Resultados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center items-center h-32 sm:h-40">
              <Loader2 className="animate-spin text-blue-500" size={48} />
            </div>
          ) : currentFoods.length > 0 ? (
            currentFoods.map((food) => (
              <Card
                key={food.id || food.code}
                className="shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 border border-gray-200 rounded-lg overflow-hidden bg-white cursor-pointer flex flex-col" // *** Añadido flex flex-col ***
                onClick={() => setSelectedFood(food)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedFood(food); }}
              >
                <CardContent className="p-4 sm:p-6 flex-grow flex flex-col"> {/* *** Añadido flex-grow flex flex-col *** */}
                  <h3 className="font-bold text-lg sm:text-xl text-blue-700 mb-2 sm:mb-3 break-words">
                    {food.product_name || "Nombre no disponible"}
                  </h3>
                  <p className="text-gray-600 mb-1 text-sm"> {/* Reducido mb */}
                    <strong>Marca:</strong> {food.brands || "Desconocida"}
                  </p>
                  <p className="text-gray-600 mb-1 text-sm">
                    <strong>Calorías:</strong> {food.nutriments?.["energy-kcal"] ?? "N/A"} kcal
                  </p>
                  <p className="text-gray-600 mb-3 text-sm"> {/* Incrementado mb */}
                    <strong>Nutri-Score:</strong> {food.nutriscore_grade?.toUpperCase() ?? "N/A"}
                  </p>
                  {/* *** Usando next/image *** */}
                  <div className="mt-auto pt-2"> {/* Empuja la imagen hacia abajo */}
                      {food.image_front_url ? (
                        <div className="relative w-full h-32"> {/* Contenedor para Image */}
                           <Image
                              src={food.image_front_url}
                              alt={`Imagen de ${food.product_name || 'producto'}`}
                              // layout="fill" objectFit="contain" // Alternativa con fill
                              width={150} // Ancho deseado (ajusta según diseño)
                              height={128} // Alto deseado (ajusta según diseño)
                              className="object-contain rounded-lg mx-auto" // Centrar imagen si es más pequeña que w/h
                              // placeholder="blur" // Opcional: requiere blurDataURL
                              // onError={(e) => console.error("Error loading image:", e)} // onError es diferente en next/image
                            />
                        </div>
                      ) : (
                        <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded-lg">
                          <span className="text-gray-400 text-xs">Sin imagen</span>
                        </div>
                      )}
                   </div>
                </CardContent>
              </Card>
            ))
          ) : (
             !loading && !error && allFoods.length === 0 && search && (
                <p className="text-center text-gray-500 col-span-full text-base sm:text-lg mt-4">
                 No se encontraron alimentos para &quot;{search}&quot;. Intenta con otro término.
                </p>
             )
          )}
        </div>

        {/* Paginación */}
        {!isBarcodeSearch && totalPages > 1 && (
           <div className="flex justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-12">
             <Button
               disabled={page <= 1 || loading}
               onClick={handlePreviousPage}
               className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 sm:px-5 sm:py-3 rounded-lg shadow-md text-base sm:text-lg font-medium transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
               aria-label="Página anterior"
             >
               <ChevronLeft size={18} /> Anterior
             </Button>
             <span className="text-base sm:text-lg font-semibold text-gray-700" aria-live="polite">
               Página {page} de {totalPages}
             </span>
             <Button
               disabled={page >= totalPages || loading}
               onClick={handleNextPage}
               className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 sm:px-5 sm:py-3 rounded-lg shadow-md text-base sm:text-lg font-medium transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
               aria-label="Página siguiente"
             >
               Siguiente <ChevronRight size={18} />
             </Button>
           </div>
         )}
      </main>

      {/* Modal */}
      {selectedFood && (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
            onClick={() => setSelectedFood(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="food-modal-title"
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedFood(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Cerrar modal"
            >
              <X size={24} />
            </button>
            <h3 id="food-modal-title" className="font-bold text-2xl text-blue-700 mb-4 pr-8">
              {selectedFood.product_name || "Nombre no disponible"}
            </h3>

            {/* Contenido del Modal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* Columna 1 */}
                <div className="space-y-2">
                    <p><strong>Marca:</strong> {selectedFood.brands || "N/A"}</p>
                    <p><strong>Código:</strong> {selectedFood.code || "N/A"}</p>
                    <p><strong>Categoría:</strong> {selectedFood.categories || "N/A"}</p>
                    <p><strong>Países:</strong> {selectedFood.countries || "N/A"}</p>
                    {/* *** Usando next/image *** */}
                    {selectedFood.image_front_url && (
                      <div className="w-full mt-2">
                        <Image
                          src={selectedFood.image_front_url}
                          alt={`Imagen de ${selectedFood.product_name || 'producto'}`}
                          width={250}
                          height={160}
                          className="object-contain rounded-lg bg-gray-50 mx-auto"
                        />
                      </div>
                    )}
                </div>

                 {/* Columna 2 */}
                 <div className="space-y-1 text-sm border-l border-gray-200 pl-4 md:pl-6"> {/* Ajustado padding */}
                    <h4 className="font-semibold text-base mb-2 text-gray-800">Información Nutricional (por 100g/ml)</h4>
                    <p><strong>Calorías:</strong> {selectedFood.nutriments?.["energy-kcal"] ?? "N/A"} kcal</p>
                    <p><strong>Proteínas:</strong> {selectedFood.nutriments?.proteins ?? "N/A"} g</p>
                    <p><strong>Grasas:</strong> {selectedFood.nutriments?.fat ?? "N/A"} g</p>
                    <p><strong>&nbsp;&nbsp; Saturadas:</strong> {selectedFood.nutriments?.["saturated-fat"] ?? "N/A"} g</p>
                    <p><strong>Carbohidratos:</strong> {selectedFood.nutriments?.carbohydrates ?? "N/A"} g</p>
                    <p><strong>&nbsp;&nbsp; Azúcares:</strong> {selectedFood.nutriments?.sugars ?? "N/A"} g</p>
                    <p><strong>Fibra:</strong> {selectedFood.nutriments?.fiber ?? "N/A"} g</p>
                    <p><strong>Sal:</strong> {selectedFood.nutriments?.salt ?? "N/A"} g</p>
                    <hr className="my-2"/>
                    <p><strong>Nutri-Score:</strong> {selectedFood.nutriscore_grade?.toUpperCase() ?? "N/A"}</p>
                    <p><strong>NOVA Score:</strong> {selectedFood.nova_group ?? "N/A"}</p>
                    <p><strong>Eco-Score:</strong> {selectedFood.ecoscore_grade?.toUpperCase() ?? "N/A"}</p>
                </div>

                {/* Sección Ingredientes */}
                <div className="md:col-span-2 mt-4 pt-4 border-t border-gray-200 text-sm space-y-2">
                    <h4 className="font-semibold text-base mb-2 text-gray-800">Ingredientes y Análisis</h4>
                    <p><strong>Ingredientes:</strong> {selectedFood.ingredients_text || "N/A"}</p>
                    <p><strong>Aditivos:</strong> {selectedFood.additives_tags?.join(", ") || "Ninguno / N/A"}</p>
                    <p><strong>Alérgenos:</strong> {selectedFood.allergens || "Ninguno / N/A"}</p>
                    <p><strong>Vegano:</strong> {selectedFood.ingredients_analysis_tags?.includes("en:vegan") ? "Sí ✅" : "No ❌ / No verificado"}</p>
                    <p><strong>Vegetariano:</strong> {selectedFood.ingredients_analysis_tags?.includes("en:vegetarian") ? "Sí ✅" : "No ❌ / No verificado"}</p>
                </div>

                 {/* Imágenes adicionales */}
                <div className="md:col-span-2 mt-4 flex flex-col sm:flex-row gap-4"> {/* Ajustado para mejor layout */}
                    {/* *** Usando next/image *** */}
                    {selectedFood.image_ingredients_url && (
                        <div className="relative w-full sm:w-1/2 h-32"> {/* Contenedor */}
                            <Image
                                src={selectedFood.image_ingredients_url}
                                alt="Imagen de ingredientes"
                                width={200} // Ajusta según necesidad
                                height={128} // Ajusta según necesidad
                                className="object-contain rounded-lg bg-gray-50 mx-auto"
                            />
                        </div>
                    )}
                    {/* *** Usando next/image *** */}
                    {selectedFood.image_nutrition_url && (
                         <div className="relative w-full sm:w-1/2 h-32"> {/* Contenedor */}
                            <Image
                                src={selectedFood.image_nutrition_url}
                                alt="Imagen de tabla nutricional"
                                width={200} // Ajusta según necesidad
                                height={128} // Ajusta según necesidad
                                className="object-contain rounded-lg bg-gray-50 mx-auto"
                            />
                        </div>
                    )}
                </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}