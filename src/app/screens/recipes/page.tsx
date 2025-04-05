'use client';
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Search } from 'lucide-react'
import { motion } from 'framer-motion'

interface Recipe {
  id: number;
  nombre: string;
  categoria: string;
  link_receta: string;
  valoracion: number;
  dificultad: string;
  tiempo: string;
  tipo: string;
  ingredientes: string;
}

interface FilterOptions {
  categorias: string[];
  dificultades: string[];
  tipos: string[];
}

export default function RecipesPage() {
  const [search, setSearch] = useState('')
  const [categoria, setCategoria] = useState('')
  const [dificultad, setDificultad] = useState('')
  const [tipo, setTipo] = useState('')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ categorias: [], dificultades: [], tipos: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 20

  const fetchRecipes = async () => {
    if (!search.trim() && !categoria && !dificultad && !tipo) {
      setError('Por favor, ingresa al menos un filtro.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `http://localhost:8000/api/recetas?ingrediente=${encodeURIComponent(search)}&categoria=${encodeURIComponent(categoria)}&dificultad=${encodeURIComponent(dificultad)}&tipo=${encodeURIComponent(tipo)}&page=${currentPage}`
      )
      if (!res.ok) throw new Error('Error en la búsqueda')
      const data = await res.json()

      setRecipes(data.data || [])
      setTotalPages(data.last_page)
    } catch (err) {
      console.error(err)
      setError('No se encontraron recetas o hubo un error.')
      setRecipes([])
    }

    setLoading(false)
  }

  const fetchFilterOptions = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/recetas/filtros')
      if (!res.ok) throw new Error('Error al cargar los filtros.')
      const data = await res.json()

      setFilterOptions({
        categorias: data.categorias,
        dificultades: data.dificultades,
        tipos: data.tipos,
      })
    } catch (err) {
      console.error(err)
      setError('No se pudieron cargar los filtros.')
    }
  }

  useEffect(() => {
    fetchFilterOptions()
  }, [])

  useEffect(() => {
    if (search || categoria || dificultad || tipo) fetchRecipes()
  }, [currentPage, search, categoria, dificultad, tipo])

  const handleSearch = () => {
    setCurrentPage(1)
    fetchRecipes()
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    fetchRecipes();
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      fetchRecipes();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        🍽️ Encuentra tu Receta Perfecta
      </h1>
      <div className="flex flex-wrap gap-6 mb-12 justify-center items-center bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <Input
          placeholder="🔍 Buscar por ingrediente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm border-gray-300 focus:ring-2 focus:ring-purple-500 rounded-lg shadow-sm"
        />
        
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full max-w-sm border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 shadow-sm"
        >
          <option value="">Categoría</option>
          {filterOptions.categorias.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={dificultad}
          onChange={(e) => setDificultad(e.target.value)}
          className="w-full max-w-sm border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 shadow-sm"
        >
          <option value="">Dificultad</option>
          {filterOptions.dificultades.map((diff, index) => (
            <option key={index} value={diff}>{diff}</option>
          ))}
        </select>

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full max-w-sm border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 shadow-sm"
        >
          <option value="">Tipo</option>
          {filterOptions.tipos.map((tip, index) => (
            <option key={index} value={tip}>{tip}</option>
          ))}
        </select>

        <Button 
          onClick={handleSearch} 
          disabled={loading} 
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
          {loading ? 'Buscando...' : 'Buscar'}
        </Button>
      </div>

      {error && <p className="text-red-500 text-center mb-8 text-lg">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {loading ? (
          Array.from({ length: itemsPerPage }).map((_, i) => (
            <Card key={i} className="h-72 animate-pulse bg-gray-100 rounded-xl shadow-md" />
          ))
        ) : recipes.length > 0 ? (
          recipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden border border-gray-200">
                <CardContent className="p-5">
                  <div className="w-full h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-4 flex items-center justify-center text-gray-500 text-sm">
                    Sin imagen
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{recipe.nombre}</h3>
                  <p className="text-sm text-gray-600">Categoría: {recipe.categoria}</p>
                  <p className="text-sm text-gray-600">Dificultad: {recipe.dificultad}</p>
                  <p className="text-sm text-gray-600">Tiempo: {recipe.tiempo}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">No se encontraron recetas.</p>
        )}
      </div>

      {recipes.length > 0 && (
        <div className="flex justify-between items-center mt-12">
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-5 py-3 rounded-lg shadow-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            Anterior
          </Button>
          <span className="text-gray-700 font-medium">
            Página {currentPage}
          </span>
          <Button
            onClick={handleNextPage}
            className="px-5 py-3 rounded-lg shadow-md bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  )
}
