"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"

interface RaffleForm {
  title: string
  description: string
  price: string
  totalTickets: string
  drawDate: string
  drawTime: string
  status: string
  images: File[]
}

export default function NewRaffle() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState<RaffleForm>({
    title: "",
    description: "",
    price: "",
    totalTickets: "",
    drawDate: "",
    drawTime: "20:00",
    status: "draft",
    images: [],
  })

  const handleInputChange = (field: keyof RaffleForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setForm((prev) => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Validações básicas
      if (!form.title || !form.description || !form.price || !form.totalTickets || !form.drawDate) {
        throw new Error("Todos os campos obrigatórios devem ser preenchidos")
      }

      if (form.images.length === 0) {
        throw new Error("Pelo menos uma imagem deve ser adicionada")
      }

      // Simular criação do sorteio
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Em produção, fazer chamada para API
      console.log("Criando sorteio:", form)

      router.push("/admin/sorteios")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar sorteio")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/sorteios">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Novo Sorteio</h1>
          <p className="text-muted-foreground">Crie uma nova campanha de sorteio</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>Dados principais do sorteio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Sorteio *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: iPhone 15 Pro Max 256GB"
                    value={form.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva detalhadamente o prêmio..."
                    rows={4}
                    value={form.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço do Bilhete (R$) *</Label>
                    <Input
                      id="price"
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="50.00"
                      value={form.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalTickets">Total de Bilhetes *</Label>
                    <Input
                      id="totalTickets"
                      type="number"
                      min="1"
                      placeholder="1000"
                      value={form.totalTickets}
                      onChange={(e) => handleInputChange("totalTickets", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data do Sorteio</CardTitle>
                <CardDescription>Quando o sorteio será realizado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="drawDate">Data *</Label>
                    <Input
                      id="drawDate"
                      type="date"
                      value={form.drawDate}
                      onChange={(e) => handleInputChange("drawDate", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="drawTime">Horário</Label>
                    <Input
                      id="drawTime"
                      type="time"
                      value={form.drawTime}
                      onChange={(e) => handleInputChange("drawTime", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Imagens do Prêmio</CardTitle>
                <CardDescription>Adicione fotos do prêmio (mínimo 1 imagem)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {form.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image) || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 h-6 w-6 p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}

                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Adicionar Imagem</span>
                    <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
                <CardDescription>Defina o status inicial do sorteio</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={form.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="paused">Pausado</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Preço por bilhete:</span>
                  <span className="font-medium">
                    {form.price ? `R$ ${Number.parseFloat(form.price).toFixed(2)}` : "R$ 0,00"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total de bilhetes:</span>
                  <span className="font-medium">{form.totalTickets || "0"}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Receita máxima:</span>
                  <span className="font-medium">
                    {form.price && form.totalTickets
                      ? `R$ ${(Number.parseFloat(form.price) * Number.parseInt(form.totalTickets)).toFixed(2)}`
                      : "R$ 0,00"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-end gap-4">
          <Link href="/admin/sorteios">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Criando..." : "Criar Sorteio"}
          </Button>
        </div>
      </form>
    </div>
  )
}
