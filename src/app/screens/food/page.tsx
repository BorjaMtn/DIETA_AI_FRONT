'use client'

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function FoodSearch() {
  const [search, setSearch] = useState("");
  const [foods, setFoods] = useState<any[]>([]);
  const [currentFoods, setCurrentFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFood, setSelectedFood] = useState<any | null>(null);

  useEffect(() => {
    if (search) {
      fetchFoods();
    }
  }, [page]);

  useEffect(() => {
    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;
    setCurrentFoods(foods.slice(startIndex, endIndex));
  }, [foods, page]);

  const fetchFoods = async () => {
    if (!search.trim()) {
      setError("Por favor, ingrese un nombre o código de barras.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const isBarcode = /^\d+$/.test(search);
      const endpoint = isBarcode
        ? `http://localhost:8000/api/product/barcode/${search}`
        : `http://localhost:8000/api/product/name?name=${encodeURIComponent(search)}&page=${page}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Error al buscar: ${response.statusText}`);
      }

      const data = await response.json();
      setFoods(isBarcode ? (data.product ? [data.product] : []) : data.products || []);
      setTotalPages(isBarcode ? 1 : Math.ceil((data.products?.length || 0) / 6));
    } catch (err) {
      setError("No se encontraron resultados o hubo un error.");
      setFoods([]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <Navbar />
      <div className="flex-grow px-4 py-8 sm:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 sm:mb-10 text-center text-blue-800 tracking-tight">
          Buscar Alimentos
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-10">
          <Input
            type="text"
            placeholder="Introduce nombre o código de barras..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border-2 border-blue-500 focus:ring-blue-500 rounded-lg shadow-md text-base sm:text-lg px-4 py-2 sm:py-3"
          />
          <Button
            onClick={() => {
              setPage(1);
              fetchFoods();
            }}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg text-base sm:text-lg font-semibold transition-transform transform hover:scale-105"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
            {loading ? "Buscando..." : "Buscar"}
          </Button>
        </div>

        {error && (
          <p className="text-red-600 text-center mb-6 sm:mb-8 font-medium bg-red-100 p-3 sm:p-4 rounded-lg shadow-md">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center items-center h-32 sm:h-40">
              <Loader2 className="animate-spin text-blue-500" size={48} />
            </div>
          ) : currentFoods.length > 0 ? (
            currentFoods.map((food, index) => (
              <Card
                key={food.id || index}
                className="shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 border border-gray-200 rounded-lg overflow-hidden bg-white cursor-pointer"
                onClick={() => setSelectedFood(food)}
              >
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-bold text-lg sm:text-xl text-blue-700 mb-2 sm:mb-3">
                    {food.product_name || "Sin nombre"}
                  </h3>
                  <p className="text-gray-500 mb-2 sm:mb-3">
                    <strong>Marca:</strong> {food.brands || "Desconocida"}
                  </p>
                  
                  <p className="text-gray-500 mb-2 sm:mb-3">
                    <strong>Calorías:</strong> {food.nutriments?.["energy-kcal"] || "N/A"} kcal
                  </p>
                  <p className="text-gray-500 mb-2 sm:mb-3">
                    <strong>Nutri-Score:</strong> {food.nutriscore_grade?.toUpperCase() || "N/A"}
                  </p>
                  {food.image_front_url && (
                    <img
                      src={food.image_front_url}
                      alt="Imagen frontal"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full text-base sm:text-lg">
              No se encontraron alimentos.
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-12">
            <Button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 sm:px-5 sm:py-3 rounded-lg shadow-md text-base sm:text-lg font-medium transition-transform transform hover:scale-105"
            >
              <ChevronLeft size={18} /> Anterior
            </Button>
            <span className="text-base sm:text-lg font-semibold text-gray-700">
              Página {page} de {totalPages}
            </span>
            <Button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 sm:px-5 sm:py-3 rounded-lg shadow-md text-base sm:text-lg font-medium transition-transform transform hover:scale-105"
            >
              Siguiente <ChevronRight size={18} />
            </Button>
          </div>
        )}
      </div>

      {selectedFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative">
            <button
              onClick={() => setSelectedFood(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h3 className="font-bold text-2xl text-blue-700 mb-4">
              {selectedFood.product_name || "Sin nombre"}
            </h3>
            <p className="text-gray-500 mb-4">
              <strong>Marca:</strong> {selectedFood.brands || "Desconocida"}
            </p>
            <p className="text-gray-500 mb-4">
              <strong>Código de barras:</strong> {selectedFood.code || "N/A"}
            </p>
            <p className="text-gray-500 mb-4">
              <strong>Categoría:</strong> {selectedFood.categories || "N/A"}
            </p>
            <p className="text-gray-500 mb-4">
              <strong>Países:</strong> {selectedFood.countries || "N/A"}
            </p>
            <div className="text-sm space-y-1">
              <p>
                <strong>Proteínas:</strong> {selectedFood.nutriments?.["proteins"] || "N/A"}g
              </p>
              <p>
                <strong>Grasas:</strong> {selectedFood.nutriments?.["fat"] || "N/A"}g
              </p>
              <p>
                <strong>Grasas saturadas:</strong> {selectedFood.nutriments?.["saturated-fat"] || "N/A"}g
              </p>
              <p>
                <strong>Carbohidratos:</strong> {selectedFood.nutriments?.["carbohydrates"] || "N/A"}g
              </p>
              <p>
                <strong>Azúcares:</strong> {selectedFood.nutriments?.["sugars"] || "N/A"}g
              </p>
              <p>
                <strong>Fibra:</strong> {selectedFood.nutriments?.["fiber"] || "N/A"}g
              </p>
              <p>
                <strong>Sal:</strong> {selectedFood.nutriments?.["salt"] || "N/A"}g
              </p>
              <p>
                <strong>Sodio:</strong> {selectedFood.nutriments?.["sodium"] || "N/A"}mg
              </p>
              <p>
                <strong>NOVA Score:</strong> {selectedFood.nova_group || "N/A"}
              </p>
              <p>
                <strong>Eco-Score:</strong> {selectedFood.ecoscore_grade?.toUpperCase() || "N/A"}
              </p>
              <p>
                <strong>Ingredientes:</strong> {selectedFood.ingredients_text || "N/A"}
              </p>
              <p>
                <strong>Aditivos:</strong> {selectedFood.additives_tags?.join(", ") || "N/A"}
              </p>
              <p>
                <strong>Alérgenos:</strong> {selectedFood.allergens || "N/A"}
              </p>
              <p>
                <strong>Vegano:</strong>{" "}
                {selectedFood.ingredients_analysis_tags?.includes("en:vegan") ? "Sí" : "No"}
              </p>
              <p>
                <strong>Vegetariano:</strong>{" "}
                {selectedFood.ingredients_analysis_tags?.includes("en:vegetarian") ? "Sí" : "No"}
              </p>
            </div>
            <div className="mt-4 space-y-2">
              {selectedFood.image_ingredients_url && (
                <img
                  src={selectedFood.image_ingredients_url}
                  alt="Ingredientes"
                  className="w-full h-32 object-cover rounded-lg"
                />
              )}
              {selectedFood.image_nutrition_url && (
                <img
                  src={selectedFood.image_nutrition_url}
                  alt="Tabla nutricional"
                  className="w-full h-32 object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
