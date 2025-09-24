"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Pause, Play, Trash2, Eye, Gift } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { Raffle } from "@/lib/types"

export default function RafflesManagement() {
  const [raffles, setRaffles] = useState<Raffle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simular carregamento de dados da API
    const loadRaffles = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setRaffles([
        {
          id: "1",
          title: "iPhone 15 Pro Max 256GB",
          slug: "iphone-15-pro-max",
          description: "iPhone 15 Pro Max com 256GB de armazenamento, cor Titânio Natural",
          price: 50,
          totalTickets: 1000,
          soldTickets: 850,
          status: "active",
          drawDate: "2024-02-15T20:00:00Z",
          images: ["/iphone-15-pro-front.jpg"],
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-15T10:30:00Z",
        },
        {
          id: "2",
          title: "Notebook Gamer RTX 4060",
          slug: "notebook-gamer-rtx-4060",
          description: "Notebook Gamer com RTX 4060, 16GB RAM, SSD 512GB",
          price: 50,
          totalTickets: 800,
          soldTickets: 620,
          status: "active",
          drawDate: "2024-02-20T20:00:00Z",
          images: ["/gaming-laptop.jpg"],
          createdAt: "2024-01-05T00:00:00Z",
          updatedAt: "2024-01-15T09:15:00Z",
        },
        {
          id: "3",
          title: 'Smart TV 65" 4K',
          slug: "smart-tv-65-4k",
          description: "Smart TV 65 polegadas 4K com HDR e sistema Android TV",
          price: 50,
          totalTickets: 600,
          soldTickets: 450,
          status: "paused",
          drawDate: "2024-02-25T20:00:00Z",
          images: ["/smart-tv.jpg"],
          createdAt: "2024-01-10T00:00:00Z",
          updatedAt: "2024-01-14T15:20:00Z",
        },
        {
          id: "4",
          title: "PlayStation 5 + 2 Controles",
          slug: "playstation-5-2-controles",
          description: "PlayStation 5 com 2 controles DualSense e jogo Spider-Man 2",
          price: 50,
          totalTickets: 500,
          soldTickets: 380,
          status: "active",
          drawDate: "2024-03-01T20:00:00Z",
          images: ["/ps5.jpg"],
          createdAt: "2024-01-12T00:00:00Z",
          updatedAt: "2024-01-15T08:45:00Z",
        },
        {
          id: "5",
          title: "MacBook Air M2",
          slug: "macbook-air-m2",
          description: "MacBook Air com chip M2, 8GB RAM, SSD 256GB",
          price: 75,
          totalTickets: 400,
          soldTickets: 120,
          status: "draft",
          drawDate: "2024-03-10T20:00:00Z",
          images: ["/macbook-air.jpg"],
          createdAt: "2024-01-14T00:00:00Z",
          updatedAt: "2024-01-15T07:30:00Z",
        },
      ])

      setIsLoading(false)
    }

    loadRaffles()
  }, [])

  const filteredRaffles = raffles.filter((raffle) => raffle.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-800">Pausado</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Rascunho</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Finalizado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleStatusChange = (raffleId: string, newStatus: string) => {
    setRaffles((prev) => prev.map((raffle) => (raffle.id === raffleId ? { ...raffle, status: newStatus } : raffle)))
  }

  const handleDelete = (raffleId: string) => {
    if (confirm("Tem certeza que deseja excluir este sorteio?")) {
      setRaffles((prev) => prev.filter((raffle) => raffle.id !== raffleId))
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciar Sorteios</h1>
          <p className="text-muted-foreground">Crie, edite e monitore suas campanhas</p>
        </div>
        <Link href="/admin/sorteios/novo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Sorteio
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar sorteios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Raffles List */}
      <div className="grid gap-4">
        {filteredRaffles.map((raffle) => {
          const progress = (raffle.soldTickets / raffle.totalTickets) * 100
          const revenue = raffle.soldTickets * raffle.price

          return (
            <Card key={raffle.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{raffle.title}</h3>
                      {getStatusBadge(raffle.status)}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{raffle.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Preço do Bilhete</p>
                        <p className="font-semibold">{formatCurrency(raffle.price)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Vendidos</p>
                        <p className="font-semibold">
                          {raffle.soldTickets.toLocaleString()} / {raffle.totalTickets.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Receita</p>
                        <p className="font-semibold">{formatCurrency(revenue)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Sorteio</p>
                        <p className="font-semibold">{new Date(raffle.drawDate).toLocaleDateString("pt-BR")}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{progress.toFixed(1)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
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
                        <Link href={`/sorteio/${raffle.slug}`} target="_blank">
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/sorteios/${raffle.id}/editar`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {raffle.status === "active" ? (
                        <DropdownMenuItem onClick={() => handleStatusChange(raffle.id, "paused")}>
                          <Pause className="mr-2 h-4 w-4" />
                          Pausar
                        </DropdownMenuItem>
                      ) : raffle.status === "paused" ? (
                        <DropdownMenuItem onClick={() => handleStatusChange(raffle.id, "active")}>
                          <Play className="mr-2 h-4 w-4" />
                          Ativar
                        </DropdownMenuItem>
                      ) : null}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(raffle.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredRaffles.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Gift className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum sorteio encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Tente ajustar sua busca" : "Comece criando seu primeiro sorteio"}
            </p>
            <Link href="/admin/sorteios/novo">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Criar Sorteio
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
