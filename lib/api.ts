// API configuration and types for the solidarity raffle application
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface Raffle {
  id: number;
  slug: string;
  title: string;
  description: string;
  rules: string | null;
  prize_image: string | null;
  prize_images: string[];
  ticket_price: number;
  total_tickets: number;
  sold_tickets: number;
  draw_date: string | null;
  status: "active" | "completed" | "cancelled" | string;
  created_at: string | null;
  updated_at: string | null;
}

export interface PurchaseData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  quantity: number;
}

export interface PurchaseResponse {
  success: boolean;
  message: string;
  ticket_numbers: number[];
  payment_url?: string;
  purchase_id?: number;
  available_tickets?: number;
}

interface ApiCollection<T> {
  data: T[];
}

interface ApiResource<T> {
  data: T;
}

interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  error?: string;
  available_tickets?: number;
}

function getFetchBaseOptions(): RequestInit {
  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  };
}

async function safeParseJson<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch (error) {
    console.error("Erro ao fazer parse da resposta da API:", error);
    return null;
  }
}

export async function fetchActiveRaffles(): Promise<Raffle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/sorteios`, {
      ...getFetchBaseOptions(),
      method: "GET",
    });

    const payload = await safeParseJson<ApiCollection<Raffle>>(response);

    if (!response.ok || !payload) {
      console.error("Falha ao buscar sorteios:", payload);
      return [];
    }

    return Array.isArray(payload.data) ? payload.data : [];
  } catch (error) {
    console.error("Erro ao buscar sorteios:", error);
    return [];
  }
}

export async function fetchRaffleBySlug(slug: string): Promise<Raffle | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/sorteio/${slug}`, {
      ...getFetchBaseOptions(),
      method: "GET",
    });

    const payload = await safeParseJson<ApiResource<Raffle>>(response);

    if (!response.ok || !payload) {
      console.error("Falha ao buscar sorteio:", payload);
      return null;
    }

    return payload.data ?? null;
  } catch (error) {
    console.error("Erro ao buscar sorteio:", error);
    return null;
  }
}

export async function purchaseTickets(slug: string, data: PurchaseData): Promise<PurchaseResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/sorteio/${slug}/comprar`, {
      ...getFetchBaseOptions(),
      method: "POST",
      body: JSON.stringify(data),
    });

    const payload = await safeParseJson<PurchaseResponse & ApiErrorResponse>(response);

    if (!response.ok || !payload) {
      return {
        success: false,
        message: payload?.message || payload?.error || "Erro ao processar compra. Tente novamente.",
        ticket_numbers: [],
        available_tickets: payload?.available_tickets,
      };
    }

    return {
      success: payload.success ?? true,
      message: payload.message,
      ticket_numbers: payload.ticket_numbers ?? [],
      payment_url: payload.payment_url,
      purchase_id: payload.purchase_id,
      available_tickets: payload.available_tickets,
    };
  } catch (error) {
    console.error("Erro ao enviar compra:", error);
    return {
      success: false,
      message: "Erro ao processar compra. Tente novamente.",
      ticket_numbers: [],
    };
  }
}
