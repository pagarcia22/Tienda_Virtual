"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ShoppingCart,
  Search,
  Menu,
  Star,
  Heart,
  User,
  Truck,
  Shield,
  Clock,
  Grid3X3,
  List,
  Plus,
  Minus,
  Filter,
  MapPin,
  Phone,
  ArrowRight,
  Check,
  CreditCard,
  Banknote,
  Building,
  ChevronLeft,
} from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  subcategory: string
  brand: string
  unit: string
  stock: number
  isOrganic?: boolean
  isOffer?: boolean
  discount?: number
  description: string
}

interface CartItem extends Product {
  quantity: number
}

interface CheckoutFormData {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  notes: string
  paymentMethod: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Leche en Polvo",
    price: 11833,
    image: "/powdered-milk-bag.png",
    rating: 4.6,
    reviews: 234,
    category: "lacteos",
    subcategory: "leche",
    brand: "Vaca Feliz",
    unit: "400g",
    stock: 45,
    description: "Leche en polvo entera, fortificada con vitaminas",
  },
  {
    id: 2,
    name: "Arroz",
    price: 3400,
    image: "/white-rice-bag.png",
    rating: 4.3,
    reviews: 189,
    category: "granos-cereales",
    subcategory: "arroz",
    brand: "Don Pepe",
    unit: "kilo",
    stock: 50,
    description: "Arroz blanco de grano largo, ideal para el día a día",
  },
  {
    id: 3,
    name: "Frijoles",
    price: 7200,
    image: "/red-beans-bag.png",
    rating: 4.5,
    reviews: 156,
    category: "granos-cereales",
    subcategory: "frijoles",
    brand: "La Cosecha",
    unit: "kilo",
    stock: 75,
    description: "Frijoles frescos, ricos en proteína",
  },
  {
    id: 4,
    name: "Pollo (Carne)",
    price: 17500,
    image: "/chicken-breast.png",
    rating: 4.7,
    reviews: 145,
    category: "carnes",
    subcategory: "pollo",
    brand: "Granja Feliz",
    unit: "kilo",
    stock: 25,
    description: "Carne de pollo fresca, ideal para preparaciones familiares",
  },
  {
    id: 5,
    name: "Aguacate Hass",
    price: 5000,
    image: "/avocado-hass.png",
    rating: 4.4,
    reviews: 92,
    category: "frutas-verduras",
    subcategory: "frutas",
    brand: "Fresco Natural",
    unit: "kilo",
    stock: 30,
    description: "Aguacate Hass cremoso y nutritivo",
  },
  {
    id: 6,
    name: "Guayaba",
    price: 3000,
    image: "/guava-fruit.png",
    rating: 4.2,
    reviews: 78,
    category: "frutas-verduras",
    subcategory: "frutas",
    brand: "Tropical",
    unit: "kilo",
    stock: 40,
    description: "Guayaba fresca y dulce, rica en vitamina C",
  },
  {
    id: 7,
    name: "Cebolla Cabezona Blanca",
    price: 1200,
    image: "/white-onion.png",
    rating: 4.1,
    reviews: 67,
    category: "frutas-verduras",
    subcategory: "verduras",
    brand: "Verde Fresco",
    unit: "kilo",
    stock: 60,
    description: "Cebolla cabezona blanca fresca para condimentar",
  },
  {
    id: 8,
    name: "Aceite Vegetal",
    price: 7175,
    image: "/cooking-oil-bottle.png",
    rating: 4.6,
    reviews: 203,
    category: "aceites-condimentos",
    subcategory: "aceites",
    brand: "Girasol",
    unit: "1000 c.c.",
    stock: 35,
    description: "Aceite vegetal puro para cocinar",
  },
  {
    id: 9,
    name: "Tomate Chonto",
    price: 5000,
    image: "/cherry-tomato.png",
    rating: 4.3,
    reviews: 124,
    category: "frutas-verduras",
    subcategory: "verduras",
    brand: "Huerta Fresca",
    unit: "kilo",
    stock: 45,
    description: "Tomate chonto fresco, perfecto para ensaladas y salsas",
  },
  {
    id: 10,
    name: "Papa Pastusa",
    price: 1600,
    image: "/potato-pastusa.png",
    rating: 4.5,
    reviews: 167,
    category: "frutas-verduras",
    subcategory: "verduras",
    brand: "Campesina",
    unit: "kilo",
    stock: 80,
    description: "Papa pastusa ideal para freír y preparaciones caseras",
  },
]

const categories = [
  {
    id: "frutas-verduras",
    name: "Frutas y Verduras",
    icon: "🥬",
    color: "bg-blue-100 text-blue-800",
    subcategories: ["frutas", "verduras"],
  },
  {
    id: "granos-cereales",
    name: "Granos y Cereales",
    icon: "🌾",
    color: "bg-blue-100 text-blue-800",
    subcategories: ["arroz", "frijoles"],
  },
  {
    id: "carnes",
    name: "Carnes",
    icon: "🥩",
    color: "bg-blue-100 text-blue-800",
    subcategories: ["pollo"],
  },
  {
    id: "aceites-condimentos",
    name: "Aceites y Condimentos",
    icon: "🫒",
    color: "bg-blue-100 text-blue-800",
    subcategories: ["aceites"],
  },
  {
    id: "lacteos",
    name: "Lácteos",
    icon: "🥛",
    color: "bg-blue-100 text-blue-800",
    subcategories: ["leche"],
  },
]

export default function SupermercadoVirtual() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSubcategory, setSelectedSubcategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 20000])
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState(1)
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
    paymentMethod: "efectivo",
  })
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesSubcategory = selectedSubcategory === "all" || product.subcategory === selectedSubcategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesSubcategory && matchesPrice
    })

    // Ordenar productos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, selectedSubcategory, priceRange, sortBy])

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      }
      return [...prev, { ...product, quantity }]
    })

    toast({
      title: "Producto agregado",
      description: `${product.name} se ha agregado al carrito`,
      action: <ToastAction altText="Ver carrito">Ver carrito</ToastAction>,
    })
  }

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId))
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const selectedCategoryData = categories.find((cat) => cat.id === selectedCategory)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  const handleCheckout = () => {
    setIsCheckoutOpen(true)
    setCheckoutStep(1)
  }

  const handleNextStep = () => {
    if (checkoutStep < 3) {
      setCheckoutStep(checkoutStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (checkoutStep > 1) {
      setCheckoutStep(checkoutStep - 1)
    } else {
      setIsCheckoutOpen(false)
    }
  }

  const handleSubmitOrder = () => {
    // Generar número de orden aleatorio
    const randomOrderNumber = Math.floor(100000 + Math.random() * 900000).toString()
    setOrderNumber(randomOrderNumber)
    setIsOrderComplete(true)
    setCheckoutStep(3)

    // Mostrar diálogo de éxito después de un breve retraso
    setTimeout(() => {
      setIsSuccessDialogOpen(true)
    }, 1000)
  }

  const handleCloseSuccessDialog = () => {
    setIsSuccessDialogOpen(false)
    setIsCheckoutOpen(false)
    setCartItems([])
    setIsOrderComplete(false)
  }

  const deliveryCost = 5000
  const totalWithDelivery = cartTotal + deliveryCost

  return (
    <div className="min-h-screen bg-background">
      <Toaster />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menú</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-4">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className="text-left text-sm font-medium hover:text-primary transition-colors"
                    >
                      {category.icon} {category.name}
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2">
              <div className="text-2xl">🌾</div>
              <div>
                <h1 className="text-xl font-bold text-blue-600">Granero Dios es amor</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Productos de la canasta familiar</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar productos..."
                  className="w-64 pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Carrito de Compras</SheetTitle>
                  <SheetDescription>
                    {cartItemsCount === 0 ? "Tu carrito está vacío" : `${cartItemsCount} productos en tu carrito`}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-4 max-h-96 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        <p className="text-sm font-semibold">
                          ${item.price.toLocaleString("es-CO")} / {item.unit}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                {cartItems.length > 0 && (
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total: ${cartTotal.toLocaleString("es-CO")}</span>
                    </div>
                    <Button className="w-full" size="lg" onClick={handleCheckout}>
                      <Truck className="h-4 w-4 mr-2" />
                      Proceder al Checkout
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-12">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800">Ofertas Especiales</Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                La canasta familiar <br />
                <span className="text-blue-600">a tu alcance</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Productos básicos y de calidad para tu hogar. Los mejores precios en granos, harinas, aceites y más.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Ver Ofertas
                </Button>
                <Button size="lg" variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  Verificar Cobertura
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/supermarket-hero.png"
                alt="Productos frescos del supermercado"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Categorías</h3>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCategory === "all" ? "ring-2 ring-blue-600" : ""
              }`}
              onClick={() => {
                setSelectedCategory("all")
                setSelectedSubcategory("all")
              }}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">🛍️</div>
                <h4 className="font-medium text-sm">Todos</h4>
              </CardContent>
            </Card>
            {categories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedCategory === category.id ? "ring-2 ring-blue-600" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(category.id)
                  setSelectedSubcategory("all")
                }}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <h4 className="font-medium text-sm">{category.name}</h4>
                  <Badge className={`text-xs mt-1 ${category.color}`}>
                    {products.filter((p) => p.category === category.id).length}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filtros */}
          {showFilters && (
            <Card className="p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Subcategoría</label>
                  <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {selectedCategoryData?.subcategories.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub.charAt(0).toUpperCase() + sub.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Ordenar por</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Nombre</SelectItem>
                      <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                      <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                      <SelectItem value="rating">Mejor Calificación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">
                    Rango de Precio: ${priceRange[0].toLocaleString("es-CO")} - ${priceRange[1].toLocaleString("es-CO")}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={20000}
                    min={0}
                    step={500}
                    className="mt-2"
                  />
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Productos */}
      <section className="py-8">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">
              {selectedCategory === "all"
                ? "Todos los Productos"
                : categories.find((c) => c.id === selectedCategory)?.name}
              <span className="text-muted-foreground ml-2">({filteredProducts.length})</span>
            </h3>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isOffer && <Badge className="bg-red-500">-{product.discount}%</Badge>}
                        {product.isOrganic && <Badge className="bg-green-500">Orgánico</Badge>}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </Button>
                      {product.stock < 10 && (
                        <Badge className="absolute bottom-3 left-3 bg-orange-500">
                          <Clock className="h-3 w-3 mr-1" />
                          Últimas {product.stock}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>

                    <CardTitle className="text-lg mb-1 line-clamp-2">{product.name}</CardTitle>
                    <CardDescription className="text-sm mb-2">{product.brand}</CardDescription>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">${product.price.toLocaleString("es-CO")}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice.toLocaleString("es-CO")}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">/ {product.unit}</span>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.stock === 0 ? "Sin Stock" : "Agregar"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-lg">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">{product.brand}</p>
                            <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < Math.floor(product.rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">({product.reviews})</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl font-bold">${product.price.toLocaleString("es-CO")}</span>
                              {product.originalPrice && (
                                <span className="text-lg text-muted-foreground line-through">
                                  ${product.originalPrice.toLocaleString("es-CO")}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">/ {product.unit}</p>
                            <Button
                              className="mt-2 bg-blue-600 hover:bg-blue-700"
                              onClick={() => addToCart(product)}
                              disabled={product.stock === 0}
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              {product.stock === 0 ? "Sin Stock" : "Agregar"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No se encontraron productos</h3>
              <p className="text-muted-foreground">Intenta ajustar tus filtros o términos de búsqueda</p>
            </div>
          )}
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Entrega Rápida</h4>
              <p className="text-muted-foreground">Recibe tus productos en 2-4 horas</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Productos Frescos</h4>
              <p className="text-muted-foreground">Garantía de frescura en todos nuestros productos</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Soporte 24/7</h4>
              <p className="text-muted-foreground">Atención al cliente siempre disponible</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-2xl">🌾</div>
                <h4 className="text-lg font-semibold">Granero Dios es amor</h4>
              </div>
              <p className="text-muted-foreground mb-4">
                Tu granero de confianza para productos de la canasta familiar. Calidad y buenos precios para tu hogar.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Categorías</h5>
              <ul className="space-y-2 text-muted-foreground">
                {categories.slice(0, 4).map((category) => (
                  <li key={category.id}>
                    <a href="#" className="hover:text-foreground">
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Servicio</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Entregas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Devoluciones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Soporte
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Contacto</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>📞 +57 (310) 952-4567</li>
                <li>📧 info@granerodiosesamor.com</li>
                <li>📍 Calle 123 #45-67, Bogotá</li>
                <li>🕒 Lun-Dom: 7AM-9PM</li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Granero Dios es amor. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Checkout Modal */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-[600px] p-0">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-blue-600">Finalizar Compra</DialogTitle>
              <DialogDescription>
                {checkoutStep === 1 && "Completa tus datos para procesar tu pedido"}
                {checkoutStep === 2 && "Selecciona tu método de pago preferido"}
                {checkoutStep === 3 && "¡Gracias por tu compra!"}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6">
              {/* Pasos del checkout */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${checkoutStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                  >
                    1
                  </div>
                  <span className="text-xs mt-1">Datos</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${checkoutStep >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${checkoutStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                  >
                    2
                  </div>
                  <span className="text-xs mt-1">Pago</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${checkoutStep >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${checkoutStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                  >
                    3
                  </div>
                  <span className="text-xs mt-1">Confirmación</span>
                </div>
              </div>

              {/* Paso 1: Datos de envío */}
              {checkoutStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Nombre completo</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Ingresa tu nombre completo"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="correo@ejemplo.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Número de teléfono"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Dirección de entrega</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Dirección completa"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Ciudad</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Ciudad"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Instrucciones especiales para la entrega"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Paso 2: Método de pago */}
              {checkoutStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold mb-2">Resumen del pedido</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal ({cartItemsCount} productos):</span>
                        <span>${cartTotal.toLocaleString("es-CO")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Costo de envío:</span>
                        <span>${deliveryCost.toLocaleString("es-CO")}</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${totalWithDelivery.toLocaleString("es-CO")}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Selecciona tu método de pago</h3>
                    <RadioGroup value={formData.paymentMethod} onValueChange={handlePaymentMethodChange}>
                      <div className="flex items-center space-x-2 border p-4 rounded-lg mb-3">
                        <RadioGroupItem value="efectivo" id="efectivo" />
                        <Label htmlFor="efectivo" className="flex items-center">
                          <Banknote className="h-5 w-5 mr-2 text-blue-600" />
                          Pago en efectivo
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-4 rounded-lg mb-3">
                        <RadioGroupItem value="transferencia" id="transferencia" />
                        <Label htmlFor="transferencia" className="flex items-center">
                          <Building className="h-5 w-5 mr-2 text-blue-600" />
                          Transferencia bancaria
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-4 rounded-lg">
                        <RadioGroupItem value="tarjeta" id="tarjeta" />
                        <Label htmlFor="tarjeta" className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                          Tarjeta de crédito/débito
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Paso 3: Confirmación */}
              {checkoutStep === 3 && (
                <div className="text-center py-6">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">¡Pedido Confirmado!</h3>
                  <p className="text-muted-foreground mb-4">Tu pedido ha sido procesado correctamente.</p>
                  <div className="bg-blue-50 p-4 rounded-lg mb-6 inline-block">
                    <p className="font-semibold">Número de pedido:</p>
                    <p className="text-2xl font-bold text-blue-600">{orderNumber}</p>
                  </div>
                  <p className="mb-6">
                    Hemos enviado un correo electrónico con los detalles de tu compra a {formData.email}.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tu pedido será entregado en la dirección proporcionada en las próximas 24 horas.
                  </p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="bg-gray-50 p-6">
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={handlePrevStep}>
                {checkoutStep === 1 ? (
                  "Cancelar"
                ) : (
                  <>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Atrás
                  </>
                )}
              </Button>
              {checkoutStep < 3 ? (
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={checkoutStep === 2 ? handleSubmitOrder : handleNextStep}
                >
                  {checkoutStep === 2 ? "Confirmar Pedido" : "Continuar"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCloseSuccessDialog}>
                  Finalizar
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de éxito */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">¡Compra Exitosa!</DialogTitle>
            <DialogDescription className="text-center">Tu pedido ha sido procesado correctamente</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-center mb-2">
              Gracias por tu compra en <span className="font-bold">Granero Dios es amor</span>
            </p>
            <p className="text-center text-muted-foreground">Tu pedido #{orderNumber} será entregado pronto</p>
          </div>
          <DialogFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleCloseSuccessDialog}>
              Continuar Comprando
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
