"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, Calendar, Gift, User } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface CustomerDetails {
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
  purchases: Array<{
    id: string
    raffle: string
    amount: number
    tickets: number
    date: string
    status: string
  }>
}

export default function CustomerDetails() {
  const params = useParams()
  const router = useRouter()
  const [customer, setCustomer] = useState<CustomerDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCustomer = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simular dados do cliente
      setCustomer({
        id: params.id as string,
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
        purchases: [
          {
            id: "1",
            raffle: "iPhone 15 Pro Max",
            amount: 150,
            tickets: 3,
            date: "2024-01-15T10:30:00Z",
            status: "completed",
          },
          {
            id: "2",
            raffle: "Notebook Gamer RTX 4060",
            amount: 200,
            tickets: 4,
            date: "2024-01-10T14:20:00Z",
            status: "completed",
          },
          {
            id: "3",
            raffle: "iPhone 15 Pro Max",
            amount: 100,
            tickets: 2,
            date: "2024-01-05T09:15:00Z",
            status: "completed",
          },
          {
            id: "4",
            raffle: 'Smart TV 65"',
            amount: 150,
            tickets: 3,
            date: "2023-12-20T16:45:00Z",
            status: "completed",
          },
          {
            id: "5",
            raffle: "PlayStation 5",
            amount: 100,
            tickets: 2,
            date: "2023-12-10T11:30:00Z",
            status: "completed",
          },
          {
            id: "6",
            raffle: "MacBook Air M2",
            amount: 75,
            tickets: 1,
            date: "2023-11-25T13:20:00Z",
            status: "completed",
          },
          {
            id: "7",
            raffle: "iPhone 15 Pro Max",
            amount: 50,
            tickets: 1,
            date: "2023-11-15T08:45:00Z",
            status: "completed",
          },
          {
            id: "8",
            raffle: "Notebook Gamer RTX 4060",
            amount: 25,
            tickets: 1,
            date: "2023-10-30T15:10:00Z",
            status: "pending",
          },
        ],
      })

      setIsLoading(false)
    }

    loadCustomer()
  }, [params.id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Concluído</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Falhou</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getCustomerSegment = (totalSpent: number) => {
    if (totalSpent >= 500) return { label: "VIP", color: "bg-purple-100 text-purple-800" }
    if (totalSpent >= 200) return { label: "Premium", color: "bg-blue-100 text-blue-800" }
    return { label: "Regular", color: "bg-gray-100 text-gray-800" }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse mb-4"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded w-48 animate-pulse mb-4"></div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/clientes">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="p-12 text-center">
            <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Cliente não encontrado</h3>
            <p className="text-muted-foreground">O cliente solicitado não existe ou foi removido.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const segment = getCustomerSegment(customer.totalSpent)
  const avgPurchaseValue = customer.totalSpent / customer.totalPurchases

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/clientes">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
          <p className="text-muted-foreground">Detalhes do cliente e histórico de compras</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Customer Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge
                  className={customer.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                >
                  {customer.status === "active" ? "Ativo" : "Inativo"}
                </Badge>
                <Badge className={segment.color}>{segment.label}</Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Cliente desde {formatDate(customer.firstPurchase)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Gift className="h-4 w-4 text-muted-foreground" />
                  <span>Categoria favorita: {customer.favoriteCategory}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between gap-4">
                  <Button size="sm" className="flex-1">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Phone className="mr-2 h-4 w-4" />
                    Ligar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estatísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Gasto</p>
                <p className="text-2xl font-bold">{formatCurrency(customer.totalSpent)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bilhetes Comprados</p>
                <p className="text-2xl font-bold">{customer.totalTickets}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Compras</p>
                <p className="text-2xl font-bold">{customer.totalPurchases}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valor Médio por Compra</p>
                <p className="text-2xl font-bold">{formatCurrency(avgPurchaseValue)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Purchase History */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Compras</CardTitle>
              <CardDescription>Todas as transações realizadas pelo cliente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customer.purchases.map((purchase) => (
                  <div key={purchase.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">{purchase.raffle}</h4>
                        {getStatusBadge(purchase.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{formatDate(purchase.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(purchase.amount)}</p>
                      <p className="text-sm text-muted-foreground">
                        {purchase.tickets} {purchase.tickets === 1 ? "bilhete" : "bilhetes"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
