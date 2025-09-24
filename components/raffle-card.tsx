import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Raffle } from "@/lib/api"
import { formatCurrency, formatDate } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

interface RaffleCardProps {
  raffle: Raffle
}

export function RaffleCard({ raffle }: RaffleCardProps) {
  const progressPercentage = (raffle.sold_tickets / raffle.total_tickets) * 100
  const remainingTickets = raffle.total_tickets - raffle.sold_tickets

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <Image src={raffle.prize_image || "/placeholder.svg"} alt={raffle.title} fill className="object-cover" />
          <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">Ativo</Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2 text-balance">{raffle.title}</CardTitle>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{raffle.description}</p>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Progresso</span>
            <span className="text-sm text-muted-foreground">
              {raffle.sold_tickets}/{raffle.total_tickets}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />

          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-primary">{formatCurrency(raffle.ticket_price)}</p>
              <p className="text-xs text-muted-foreground">por número</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{remainingTickets}</p>
              <p className="text-xs text-muted-foreground">restantes</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">Sorteio: {formatDate(raffle.draw_date)}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" size="lg">
          <Link href={`/sorteio/${raffle.slug}`}>Participar Agora</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
