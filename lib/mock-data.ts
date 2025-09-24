// Mock data for development and testing
import type { Raffle } from "./api"

export const mockRaffles: Raffle[] = [
  {
    id: 1,
    slug: "iphone-15-pro",
    title: "iPhone 15 Pro 256GB",
    description: "Concorra a um iPhone 15 Pro 256GB novinho em folha! Sua participação ajuda nossa causa solidária.",
    rules:
      "Sorteio será realizado via Instagram Live. Ganhador será contatado por telefone e email. Prêmio deve ser retirado em até 30 dias.",
    prize_image: "/iphone-15-pro-hands.png",
    prize_images: ["/iphone-15-pro-front.jpg", "/iphone-15-pro-back.jpg", "/iphone-15-pro-box.jpg"],
    ticket_price: 10.0,
    total_tickets: 1000,
    sold_tickets: 347,
    draw_date: "2025-02-15T20:00:00Z",
    status: "active",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-20T12:00:00Z",
  },
  {
    id: 2,
    slug: "notebook-gamer",
    title: "Notebook Gamer RTX 4060",
    description: "Notebook gamer completo para você arrasar nos jogos! Participe e ajude nossa instituição.",
    rules:
      "Sorteio será realizado via Instagram Live. Ganhador será contatado por telefone e email. Prêmio deve ser retirado em até 30 dias.",
    prize_image: "/gaming-laptop.jpg",
    prize_images: ["/gaming-laptop-open.jpg", "/gaming-laptop-closed.jpg", "/gaming-laptop-specs.jpg"],
    ticket_price: 25.0,
    total_tickets: 800,
    sold_tickets: 156,
    draw_date: "2025-03-01T20:00:00Z",
    status: "active",
    created_at: "2025-01-10T00:00:00Z",
    updated_at: "2025-01-20T15:30:00Z",
  },
  {
    id: 3,
    slug: "vale-compras-1000",
    title: "Vale Compras R$ 1.000",
    description: "Vale compras de R$ 1.000 para você usar onde quiser! Sua participação faz a diferença.",
    rules:
      "Sorteio será realizado via Instagram Live. Ganhador será contatado por telefone e email. Vale deve ser utilizado em até 90 dias.",
    prize_image: "/shopping-voucher-1000-reais.jpg",
    prize_images: ["/shopping-voucher-card.jpg", "/money-bills-1000-reais.jpg"],
    ticket_price: 5.0,
    total_tickets: 2000,
    sold_tickets: 892,
    draw_date: "2025-01-30T20:00:00Z",
    status: "active",
    created_at: "2025-01-05T00:00:00Z",
    updated_at: "2025-01-20T18:45:00Z",
  },
]

// Function to simulate API calls with mock data
export function getMockRaffles(): Promise<Raffle[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRaffles), 500)
  })
}

export function getMockRaffleBySlug(slug: string): Promise<Raffle | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const raffle = mockRaffles.find((r) => r.slug === slug) || null
      resolve(raffle)
    }, 300)
  })
}
