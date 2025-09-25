"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Raffle, PurchaseData } from "@/lib/api";
import { purchaseTickets } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { ShoppingCart, CreditCard, Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PurchaseFormProps {
  raffle: Raffle;
}

export function PurchaseForm({ raffle }: PurchaseFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<PurchaseData, "quantity">>({
    name: "",
    email: "",
    phone: "",
    cpf: "",
  });
  const [serverAvailableTickets, setServerAvailableTickets] = useState<number | null>(null);

  const { toast } = useToast();

  const initialRemainingTickets = Math.max(0, raffle.total_tickets - raffle.sold_tickets);
  const effectiveRemainingTickets = serverAvailableTickets ?? initialRemainingTickets;
  const isSoldOut = effectiveRemainingTickets <= 0;
  const totalPrice = quantity * raffle.ticket_price;

  const handleQuantityChange = (delta: number) => {
    const limit = Math.max(1, effectiveRemainingTickets);
    const newQuantity = Math.max(1, Math.min(limit, quantity + delta));
    setQuantity(newQuantity);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSoldOut) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await purchaseTickets(raffle.slug, {
        ...formData,
        quantity,
      });

      if (!result.success || !result.payment_url) {
        if (typeof result.available_tickets === "number") {
          setServerAvailableTickets(result.available_tickets);
          setQuantity(Math.min(quantity, Math.max(1, result.available_tickets)));
        }

        toast({
          title: "Erro na compra",
          description: result.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Checkout gerado com sucesso!",
        description: "Você será redirecionado para finalizar o pagamento.",
      });

      window.location.href = result.payment_url;
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = Boolean(formData.name && formData.email && formData.phone && formData.cpf && !isSoldOut);

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
                disabled={quantity <= 1 || isSoldOut || isLoading}
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
                disabled={quantity >= effectiveRemainingTickets || isSoldOut || isLoading}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {isSoldOut
                ? "Sorteio esgotado"
                : `Máximo: ${effectiveRemainingTickets} números disponíveis`}
            </p>
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
                onChange={(event) => handleInputChange("name", event.target.value)}
                placeholder="Seu nome completo"
                required
                disabled={isSoldOut || isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(event) => handleInputChange("email", event.target.value)}
                placeholder="seu@email.com"
                required
                disabled={isSoldOut || isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(event) => handleInputChange("phone", event.target.value)}
                placeholder="(11) 99999-9999"
                required
                disabled={isSoldOut || isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF *</Label>
              <Input
                id="cpf"
                type="text"
                value={formData.cpf}
                onChange={(event) => handleInputChange("cpf", event.target.value)}
                placeholder="000.000.000-00"
                required
                disabled={isSoldOut || isLoading}
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
  );
}
