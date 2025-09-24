"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, Gift, DollarSign, Eye, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface DashboardStats {
  totalSales: number
  totalCustomers: number
  activeRaffles: number
  totalRevenue: number
  salesGrowth: number
  customerGrowth: number
  recentSales: Array<{
    id: string
    customer: string
    raffle: string
    amount: number
    tickets: number
    date: string
  }>
  topRaffles: Array<{
    id: string
    title: string
    sold: number
    total: number
    revenue: number
    progress: number
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento de dados da API
    const loadStats = async () => {
      // Em produção, fazer chamada para API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStats({
        totalSales: 1247,
        totalCustomers: 892,
        activeRaffles: 8,
        totalRevenue: 124750,
        salesGrowth: 12.5,
        customerGrowth: 8.3,
        recentSales: [
          {
            id: "1",
            customer: "João Silva",
            raffle: "iPhone 15 Pro Max",
            amount: 150,
            tickets: 3,
            date: "2024-01-15T10:30:00Z",
          },
          {
            id: "2",
            customer: "Maria Santos",
            raffle: "Notebook Gamer",
            amount: 200,
            tickets: 4,
            date: "2024-01-15T09:15:00Z",
          },
          {
            id: "3",
            customer: "Pedro Costa",
            raffle: "iPhone 15 Pro Max",
            amount: 50,
            tickets: 1,
            date: "2024-01-15T08:45:00Z",
          },
          {
            id: "4",
            customer: "Ana Oliveira",
            raffle: 'Smart TV 65"',
            amount: 100,
            tickets: 2,
            date: "2024-01-15T08:20:00Z",
          },
          {
            id: "5",
            customer: "Carlos Lima",
            raffle: "Notebook Gamer",
            amount: 250,
            tickets: 5,
            date: "2024-01-15T07:55:00Z",
          },
        ],
        topRaffles: [
          {
            id: "1",
            title: "iPhone 15 Pro Max",
            sold: 850,
            total: 1000,
            revenue: 42500,
            progress: 85,
          },
          {
            id: "2",
            title: "Notebook Gamer",
            sold: 620,
            total: 800,
            revenue: 31000,
            progress: 77.5,
          },
          {
            id: "3",
            title: 'Smart TV 65"',
            sold: 450,
            total: 600,
            revenue: 22500,
            progress: 75,
          },
          {
            id: "4",
            title: "PlayStation 5",
            sold: 380,
            total: 500,
            revenue: 19000,
            progress: 76,
          },
        ],
      })

      setIsLoading(false)
    }

    loadStats()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!stats) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do desempenho dos sorteios</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSales.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stats.salesGrowth > 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={stats.salesGrowth > 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(stats.salesGrowth)}%
              </span>
              <span className="ml-1">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Valor bruto arrecadado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stats.customerGrowth > 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={stats.customerGrowth > 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(stats.customerGrowth)}%
              </span>
              <span className="ml-1">novos este mês</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sorteios Ativos</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRaffles}</div>
            <p className="text-xs text-muted-foreground">Campanhas em andamento</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Sales */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas Recentes</CardTitle>
            <CardDescription>Últimas transações realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{sale.customer}</p>
                    <p className="text-xs text-muted-foreground">{sale.raffle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(sale.amount)}</p>
                    <p className="text-xs text-muted-foreground">
                      {sale.tickets} {sale.tickets === 1 ? "bilhete" : "bilhetes"}
                    </p>
                  </div>
                  <div className="ml-4 text-xs text-muted-foreground">{formatDate(sale.date)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Raffles */}
        <Card>
          <CardHeader>
            <CardTitle>Sorteios em Destaque</CardTitle>
            <CardDescription>Campanhas com melhor performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topRaffles.map((raffle) => (
                <div key={raffle.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{raffle.title}</p>
                    <Badge variant="secondary">{raffle.progress.toFixed(1)}%</Badge>
                  </div>
                  <Progress value={raffle.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {raffle.sold.toLocaleString()} / {raffle.total.toLocaleString()} vendidos
                    </span>
                    <span>{formatCurrency(raffle.revenue)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button>
              <Gift className="mr-2 h-4 w-4" />
              Criar Novo Sorteio
            </Button>
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Ver Relatórios
            </Button>
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Gerenciar Clientes
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Agendar Sorteio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
