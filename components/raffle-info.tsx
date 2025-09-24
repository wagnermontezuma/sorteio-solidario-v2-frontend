import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Raffle } from "@/lib/api"
import { formatDate } from "@/lib/utils"
import { Calendar, Users, Trophy, Info } from "lucide-react"

interface RaffleInfoProps {
  raffle: Raffle
}

export function RaffleInfo({ raffle }: RaffleInfoProps) {
  const progressPercentage = (raffle.sold_tickets / raffle.total_tickets) * 100
  const remainingTickets = raffle.total_tickets - raffle.sold_tickets

  return (
    <div className="space-y-6">
      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Sobre o Prêmio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{raffle.description}</p>
        </CardContent>
      </Card>

      {/* Progress and Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Progresso do Sorteio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Números vendidos</span>
            <Badge variant="secondary">
              {raffle.sold_tickets}/{raffle.total_tickets}
            </Badge>
          </div>

          <Progress value={progressPercentage} className="h-3" />

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{remainingTickets}</div>
              <div className="text-xs text-muted-foreground">Números restantes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</div>
              <div className="text-xs text-muted-foreground">Vendidos</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Draw Date */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Data do Sorteio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">{formatDate(raffle.draw_date)}</div>
            <p className="text-sm text-muted-foreground">O sorteio será realizado ao vivo no Instagram</p>
          </div>
        </CardContent>
      </Card>

      {/* Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Regulamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{raffle.rules}</p>
        </CardContent>
      </Card>
    </div>
  )
}
