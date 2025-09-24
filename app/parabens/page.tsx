"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { CheckCircle, Home, Share2, Trophy } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface PurchaseResult {
  raffle: string
  ticketNumbers: number[]
  totalPrice: number
  customerName: string
}

export default function CongratulationsPage() {
  const [purchaseResult, setPurchaseResult] = useState<PurchaseResult | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const storedResult = localStorage.getItem("purchaseResult")
    if (storedResult) {
      try {
        const result = JSON.parse(storedResult)
        setPurchaseResult(result)
        // Clear the stored result after displaying
        localStorage.removeItem("purchaseResult")
      } catch (error) {
        console.error("Error parsing purchase result:", error)
        router.push("/")
      }
    } else {
      // Redirect to home if no purchase result found
      router.push("/")
    }
  }, [router])

  const handleShare = async () => {
    const shareText = `Acabei de participar do sorteio "${purchaseResult?.raffle}" no Sorteio Solidário! 🍀 Meus números da sorte: ${purchaseResult?.ticketNumbers.join(", ")}. Participe você também e ajude uma boa causa!`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Sorteio Solidário",
          text: shareText,
          url: window.location.origin,
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText)
        toast({
          title: "Copiado!",
          description: "Texto copiado para a área de transferência.",
        })
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível copiar o texto.",
          variant: "destructive",
        })
      }
    }
  }

  if (!purchaseResult) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-primary/5">
      <div className="container mx-auto max-w-2xl px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-balance mb-2">Parabéns, {purchaseResult.customerName}!</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Sua participação foi confirmada com sucesso. Boa sorte no sorteio!
          </p>
        </div>

        {/* Purchase Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Detalhes da Participação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Sorteio:</h3>
              <p className="text-muted-foreground">{purchaseResult.raffle}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Valor pago:</h3>
              <p className="text-2xl font-bold text-primary">{formatCurrency(purchaseResult.totalPrice)}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Seus números da sorte:</h3>
              <div className="flex flex-wrap gap-2">
                {purchaseResult.ticketNumbers.map((number) => (
                  <Badge key={number} variant="secondary" className="text-lg px-3 py-1">
                    {number.toString().padStart(4, "0")}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Confirmação por e-mail:</strong> Você receberá um e-mail com todos os detalhes da sua
                  participação em alguns minutos.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Sorteio ao vivo:</strong> O sorteio será realizado via Instagram Live na data programada.
                  Acompanhe nossas redes sociais!
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Contato do ganhador:</strong> Se você for o sortudo, entraremos em contato por telefone e
                  e-mail imediatamente após o sorteio.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="flex-1" size="lg">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Voltar ao Início
            </Link>
          </Button>
          <Button variant="outline" size="lg" onClick={handleShare} className="flex items-center gap-2 bg-transparent">
            <Share2 className="h-4 w-4" />
            Compartilhar
          </Button>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-8 p-6 bg-primary/5 rounded-lg">
          <h2 className="font-semibold mb-2">Obrigado por participar!</h2>
          <p className="text-sm text-muted-foreground text-balance">
            Sua participação ajuda nossa instituição a continuar fazendo a diferença na vida de muitas pessoas. Juntos,
            construímos um futuro melhor!
          </p>
        </div>
      </div>
    </div>
  )
}
