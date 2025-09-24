// API configuration and types for the solidarity raffle application
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export interface Raffle {
  id: number
  slug: string
  title: string
  description: string
  rules: string
  prize_image: string
  prize_images: string[]
  ticket_price: number
  total_tickets: number
  sold_tickets: number
  draw_date: string
  status: "active" | "completed" | "cancelled"
  created_at: string
  updated_at: string
}

export interface PurchaseData {
  name: string
  email: string
  phone: string
  cpf: string
  quantity: number
}

export interface PurchaseResponse {
  success: boolean
  message: string
  ticket_numbers: number[]
  payment_url?: string
}

// API functions
export async function fetchActiveRaffles(): Promise<Raffle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/sorteios`)
    if (!response.ok) {
      throw new Error("Failed to fetch raffles")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching raffles:", error)
    return []
  }
}

export async function fetchRaffleBySlug(slug: string): Promise<Raffle | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/sorteio/${slug}`)
    if (!response.ok) {
      throw new Error("Failed to fetch raffle")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching raffle:", error)
    return null
  }
}

export async function purchaseTickets(slug: string, data: PurchaseData): Promise<PurchaseResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/sorteio/${slug}/comprar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to purchase tickets")
    }

    return await response.json()
  } catch (error) {
    console.error("Error purchasing tickets:", error)
    return {
      success: false,
      message: "Erro ao processar compra. Tente novamente.",
      ticket_numbers: [],
    }
  }
}
