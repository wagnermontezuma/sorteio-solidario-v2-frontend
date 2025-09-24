"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Mail, Phone, Calendar, DollarSign, Users } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalSpent: number
  totalTickets: number
  totalPurchases: number
  firstPurchase: string
  lastPurchase: string
  status: "active" | "inactive"
  favoriteCategory: string
}

export default function CustomersManagement() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("totalSpent")

  useEffect(() => {
    const loadCustomers = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setCustomers([
        {
          id: "1",
          name: "João Silva",
          email: "joao.silva@email.com",
          phone: "(11) 99999-9999",
          totalSpent: 850,
          totalTickets: 17,
          totalPurchases: 8,
          firstPurchase: "2023-08-15T10:30:00Z",
          lastPurchase: "2024-01-15T10:30:00Z",
          status: "active",
          favoriteCategory: "Eletrônicos",
        },
        {
          id: "2",
          name: "Maria Santos",
          email: "maria.santos@email.com",
          phone: "(11) 88888-8888",
          totalSpent: 650,
          totalTickets: 13,
          totalPurchases: 6,
          firstPurchase: "2023-09-20T14:15:00Z",
          lastPurchase: "2024-01-14T09:15:00Z",
          status: "active",
          favoriteCategory: "Eletrônicos",
        },
        {
          id: "3",
          name: "Pedro Costa",
          email: "pedro.costa@email.com",
          phone: "(11) 77777-7777",
          totalSpent: 450,
          totalTickets: 9,
          totalPurchases: 4,
          firstPurchase: "2023-10-05T16:45:00Z",
          lastPurchase: "2024-01-10T08:45:00Z",
          status: "active",
          favoriteCategory: "Gaming",
        },
        {
          id: "4",
          name: "Ana Oliveira",
          email: "ana.oliveira@email.com",
          phone: "(11) 66666-6666",
          totalSpent: 380,
          totalTickets: 8,
          totalPurchases: 5,
          firstPurchase: "2023-11-12T11:20:00Z",
          lastPurchase: "2024-01-08T08:20:00Z",
          status: "active",
          favoriteCategory: "Casa",
        },
        {
          id: "5",
          name: "Carlos Lima",
          email: "carlos.lima@email.com",
          phone: "(11) 55555-5555",
          totalSpent: 320,
          totalTickets: 7,
          totalPurchases: 3,
          firstPurchase: "2023-12-01T09:30:00Z",
          lastPurchase: "2024-01-05T07:55:00Z",
          status: "active",
          favoriteCategory: "Gaming",
        },
        {
          id: "6",
          name: "Fernanda Rocha",
          email: "fernanda.rocha@email.com",
          phone: "(11) 44444-4444",
          totalSpent: 180,
          totalTickets: 4,
          totalPurchases: 2,
          firstPurchase: "2023-12-15T15:10:00Z",
          lastPurchase: "2023-12-20T12:30:00Z",
          status: "inactive",
          favoriteCategory: "Eletrônicos",
        },
        {
          id: "7",
          name: "Roberto Mendes",
          email: "roberto.mendes@email.com",
          phone: "(11) 33333-3333",
          totalSpent: 720,
          totalTickets: 15,
          totalPurchases: 7,
          firstPurchase: "2023-07-20T13:45:00Z",
          lastPurchase: "2024-01-12T16:20:00Z",
          status: "active",
          favoriteCategory: "Eletrônicos",
        },
        {
          id: "8",
          name: "Juliana Ferreira",
          email: "juliana.ferreira@email.com",
          phone: "(11) 22222-2222",
          totalSpent: 290,
          totalTickets: 6,
          totalPurchases: 3,
          firstPurchase: "2023-11-30T10:15:00Z",
          lastPurchase: "2024-01-03T14:40:00Z",
          status: "active",
          favoriteCategory: "Casa",
        },
      ])

      setIsLoading(false)
    }

    loadCustomers()
  }, [])

  const filteredCustomers = customers
    .filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || customer.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "totalSpent":
          return b.totalSpent - a.totalSpent
        case "totalPurchases":
          return b.totalPurchases - a.totalPurchases
        case "name":
          return a.name.localeCompare(b.name)
        case "lastPurchase":
          return new Date(b.lastPurchase).getTime() - new Date(a.lastPurchase).getTime()
        default:
          return 0
      }
    })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inativo</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const getCustomerSegment = (totalSpent: number) => {
    if (totalSpent >= 500) return { label: "VIP", color: "bg-purple-100 text-purple-800" }
    if (totalSpent >= 200) return { label: "Premium", color: "bg-blue-100 text-blue-800" }
    return { label: "Regular", color: "bg-gray-100 text-gray-800" }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded w-64 animate-pulse mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)
  const avgSpentPerCustomer = totalRevenue / totalCustomers

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciar Clientes</h1>
        <p className="text-muted-foreground">Visualize e gerencie sua base de clientes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">{activeCustomers} ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">de todos os clientes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(avgSpentPerCustomer)}</div>
            <p className="text-xs text-muted-foreground">gasto por cliente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Retenção</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-xs text-muted-foreground">clientes ativos</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="inactive">Inativos</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="totalSpent">Maior gasto</SelectItem>
            <SelectItem value="totalPurchases">Mais compras</SelectItem>
            <SelectItem value="name">Nome A-Z</SelectItem>
            <SelectItem value="lastPurchase">Última compra</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Customers List */}
      <div className="grid gap-4">
        {filteredCustomers.map((customer) => {
          const segment = getCustomerSegment(customer.totalSpent)

          return (
            <Card key={customer.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{customer.name}</h3>
                      {getStatusBadge(customer.status)}
                      <Badge className={segment.color}>{segment.label}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Cliente desde {formatDate(customer.firstPurchase)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>Categoria: {customer.favoriteCategory}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Total Gasto</p>
                        <p className="font-semibold">{formatCurrency(customer.totalSpent)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Bilhetes Comprados</p>
                        <p className="font-semibold">{customer.totalTickets}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total de Compras</p>
                        <p className="font-semibold">{customer.totalPurchases}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Última Compra</p>
                        <p className="font-semibold">{formatDate(customer.lastPurchase)}</p>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/clientes/${customer.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalhes
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Enviar Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone className="mr-2 h-4 w-4" />
                        Ligar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredCustomers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum cliente encontrado</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Tente ajustar sua busca" : "Ainda não há clientes cadastrados"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
