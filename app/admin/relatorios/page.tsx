"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, TrendingUp, TrendingDown, DollarSign, Users, Target } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface SalesData {
  period: string
  sales: number
  revenue: number
  customers: number
  avgTicketValue: number
  growth: number
}

interface TopPerformer {
  id: string
  title: string
  sales: number
  revenue: number
  conversionRate: number
}

interface ReportsData {
  salesByPeriod: SalesData[]
  topPerformers: TopPerformer[]
  totalSales: number
  totalRevenue: number
  totalCustomers: number
  avgOrderValue: number
  conversionRate: number
  recentTransactions: Array<{
    id: string
    customer: string
    raffle: string
    amount: number
    tickets: number
    date: string
    status: string
  }>
}

export default function Reports() {
  const [data, setData] = useState<ReportsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("30d")

  useEffect(() => {
    const loadReports = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setData({
        salesByPeriod: [
          { period: "Jan", sales: 245, revenue: 12250, customers: 180, avgTicketValue: 68, growth: 12.5 },
          { period: "Fev", sales: 320, revenue: 16000, customers: 240, avgTicketValue: 67, growth: 30.6 },
          { period: "Mar", sales: 280, revenue: 14000, customers: 210, avgTicketValue: 67, growth: -12.5 },
          { period: "Abr", sales: 410, revenue: 20500, customers: 310, avgTicketValue: 66, growth: 46.4 },
          { period: "Mai", sales: 380, revenue: 19000, customers: 290, avgTicketValue: 66, growth: -7.3 },
          { period: "Jun", sales: 450, revenue: 22500, customers: 340, avgTicketValue: 66, growth: 18.4 },
        ],
        topPerformers: [
          { id: "1", title: "iPhone 15 Pro Max", sales: 850, revenue: 42500, conversionRate: 85 },
          { id: "2", title: "Notebook Gamer RTX 4060", sales: 620, revenue: 31000, conversionRate: 77.5 },
          { id: "3", title: 'Smart TV 65"', sales: 450, revenue: 22500, conversionRate: 75 },
          { id: "4", title: "PlayStation 5", sales: 380, revenue: 19000, conversionRate: 76 },
          { id: "5", title: "MacBook Air M2", sales: 120, revenue: 9000, conversionRate: 30 },
        ],
        totalSales: 2420,
        totalRevenue: 144250,
        totalCustomers: 1570,
        avgOrderValue: 59.6,
        conversionRate: 68.5,
        recentTransactions: [
          {
            id: "1",
            customer: "João Silva",
            raffle: "iPhone 15 Pro Max",
            amount: 150,
            tickets: 3,
            date: "2024-01-15T10:30:00Z",
            status: "completed",
          },
          {
            id: "2",
            customer: "Maria Santos",
            raffle: "Notebook Gamer",
            amount: 200,
            tickets: 4,
            date: "2024-01-15T09:15:00Z",
            status: "completed",
          },
          {
            id: "3",
            customer: "Pedro Costa",
            raffle: "iPhone 15 Pro Max",
            amount: 50,
            tickets: 1,
            date: "2024-01-15T08:45:00Z",
            status: "pending",
          },
          {
            id: "4",
            customer: "Ana Oliveira",
            raffle: 'Smart TV 65"',
            amount: 100,
            tickets: 2,
            date: "2024-01-15T08:20:00Z",
            status: "completed",
          },
          {
            id: "5",
            customer: "Carlos Lima",
            raffle: "Notebook Gamer",
            amount: 250,
            tickets: 5,
            date: "2024-01-15T07:55:00Z",
            status: "completed",
          },
        ],
      })

      setIsLoading(false)
    }

    loadReports()
  }, [selectedPeriod])

  const exportReport = () => {
    // Simular exportação de relatório
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Período,Vendas,Receita,Clientes,Ticket Médio,Crescimento\n" +
      data?.salesByPeriod
        .map((row) => `${row.period},${row.sales},${row.revenue},${row.customers},${row.avgTicketValue},${row.growth}%`)
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "relatorio-vendas.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded w-16 animate-pulse mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">Análise detalhada de vendas e performance</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportReport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalSales.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">bilhetes vendidos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">valor bruto arrecadado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Únicos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">compradores únicos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">visitantes que compraram</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Período</CardTitle>
            <CardDescription>Evolução das vendas ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.salesByPeriod.map((period, index) => (
                <div key={period.period} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium">{period.period}</div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{period.sales} vendas</span>
                        <span>{formatCurrency(period.revenue)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${(period.sales / Math.max(...data.salesByPeriod.map((p) => p.sales))) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    {period.growth > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={period.growth > 0 ? "text-green-500" : "text-red-500"}>
                      {Math.abs(period.growth).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Sorteios com Melhor Performance</CardTitle>
            <CardDescription>Campanhas que mais venderam</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topPerformers.map((performer, index) => (
                <div key={performer.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{performer.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {performer.sales} vendas • {performer.conversionRate}% conversão
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(performer.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
          <CardDescription>Últimas vendas realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-sm font-medium">{transaction.customer}</p>
                      <p className="text-xs text-muted-foreground">{transaction.raffle}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(transaction.amount)}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.tickets} {transaction.tickets === 1 ? "bilhete" : "bilhetes"}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground w-20">{formatDate(transaction.date)}</div>
                  <div className="w-20">{getStatusBadge(transaction.status)}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.avgOrderValue)}</div>
            <p className="text-xs text-muted-foreground">valor médio por compra</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sorteios Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">campanhas em andamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Meta Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">R$ 78.000 de R$ 100.000</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
