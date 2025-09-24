import { Button } from "@/components/ui/button"
import { RaffleCard } from "@/components/raffle-card"
import { getMockRaffles } from "@/lib/mock-data"
import { Heart, Users, Trophy } from "lucide-react"
import Link from "next/link"

export default async function HomePage() {
  const raffles = await getMockRaffles()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Heart className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Sorteio Solidário</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Concorra a Prêmios Incríveis e <span className="text-primary">Ajude uma Boa Causa</span>
          </h1>

          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto">
            Participe dos nossos sorteios solidários e tenha a chance de ganhar prêmios fantásticos enquanto contribui
            para transformar vidas através da nossa instituição.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="#sorteios-ativos">Ver Sorteios Ativos</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              Saiba Mais
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">2.500+</div>
              <div className="text-sm text-muted-foreground">Participantes</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">150+</div>
              <div className="text-sm text-muted-foreground">Prêmios Entregues</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">R$ 50k+</div>
              <div className="text-sm text-muted-foreground">Arrecadados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Raffles Section */}
      <section id="sorteios-ativos" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Sorteios Ativos</h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Escolha seu sorteio favorito e participe agora mesmo. Cada número comprado ajuda nossa causa solidária.
            </p>
          </div>

          {raffles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {raffles.map((raffle) => (
                <RaffleCard key={raffle.id} raffle={raffle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Trophy className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Nenhum sorteio ativo no momento</p>
                <p className="text-sm">Novos sorteios em breve!</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-muted/50 py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-balance mb-6">Transparência e Solidariedade</h2>
          <p className="text-lg text-muted-foreground text-balance mb-8">
            Todos os nossos sorteios são realizados de forma transparente através de transmissões ao vivo. O valor
            arrecadado é destinado integralmente para projetos sociais da nossa instituição, ajudando famílias em
            situação de vulnerabilidade social.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-background p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Como Funciona</h3>
              <p className="text-sm text-muted-foreground">
                Escolha seu sorteio, compre seus números da sorte e acompanhe o sorteio ao vivo. É simples, seguro e
                transparente.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Nossa Causa</h3>
              <p className="text-sm text-muted-foreground">
                Cada participação contribui diretamente para nossos projetos sociais, levando esperança e oportunidades
                para quem mais precisa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Sorteio Solidário</h3>
              <p className="text-sm opacity-90">
                Transformando vidas através da solidariedade. Cada sorteio é uma oportunidade de fazer a diferença.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links Úteis</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="opacity-90 hover:opacity-100">
                    Como Funciona
                  </Link>
                </li>
                <li>
                  <Link href="#" className="opacity-90 hover:opacity-100">
                    Regulamento
                  </Link>
                </li>
                <li>
                  <Link href="#" className="opacity-90 hover:opacity-100">
                    Ganhadores
                  </Link>
                </li>
                <li>
                  <Link href="#" className="opacity-90 hover:opacity-100">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-sm opacity-90">
                <p>contato@sorteiosolidario.com.br</p>
                <p>(11) 99999-9999</p>
                <p>Segunda a Sexta, 9h às 18h</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-75">
            <p>&copy; 2025 Sorteio Solidário. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
