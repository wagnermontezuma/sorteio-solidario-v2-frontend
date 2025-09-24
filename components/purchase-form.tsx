"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Raffle, PurchaseData } from "@/lib/api"
import { formatCurrency } from "@/lib/utils"
import { ShoppingCart, CreditCard, Minus, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PurchaseFormProps {
  raffle: Raffle
}

export function PurchaseForm({ raffle }: PurchaseFormProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Omit<PurchaseData, "quantity">>({
    name: "",
    email: "",
    phone: "",
    cpf: "",
  })

  const router = useRouter()
  const { toast } = useToast()

  const totalPrice = quantity * raffle.ticket_price
  const remainingTickets = raffle.total_tickets - raffle.sold_tickets

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(remainingTickets, quantity + delta))
    setQuantity(newQuantity)
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate random ticket numbers for demo
      const ticketNumbers = Array.from(
        { length: quantity },
        () => Math.floor(Math.random() * raffle.total_tickets) + 1,
      ).sort((a, b) => a - b)

      // Store purchase data for confirmation page
      const purchaseResult = {
        raffle: raffle.title,
        ticketNumbers,
        totalPrice,
        customerName: formData.name,
      }

      localStorage.setItem("purchaseResult", JSON.stringify(purchaseResult))

      toast({
        title: "Compra realizada com sucesso!",
        description: "Redirecionando para a confirmação...",
      })

      router.push("/parabens")
    } catch (error) {
      toast({
        title: "Erro na compra",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = formData.name && formData.email && formData.phone && formData.cpf

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Participar do Sorteio
        </CardTitle>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{formatCurrency(raffle.ticket_price)}</span>
          <Badge variant="secondary">por número</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quantity Selector */}
          <div className="space-y-2">
            <Label>Quantidade de números</Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center">
                <span className="text-2xl font-bold">{quantity}</span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= remainingTickets}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">Máximo: {remainingTickets} números disponíveis</p>
          </div>

          <Separator />

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Seus dados</h3>

            <div className="space-y-2">
              <Label htmlFor="name">Nome completo *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Seu nome completo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="(11) 99999-9999"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF *</Label>
              <Input
                id="cpf"
                type="text"
                value={formData.cpf}
                onChange={(e) => handleInputChange("cpf", e.target.value)}
                placeholder="000.000.000-00"
                required
              />
            </div>
          </div>

          <Separator />

          {/* Total and Purchase */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="text-2xl font-bold text-primary">{formatCurrency(totalPrice)}</span>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={!isFormValid || isLoading}>
              {isLoading ? (
                "Processando..."
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Finalizar Compra
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Ao finalizar a compra, você será redirecionado para o pagamento seguro.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
