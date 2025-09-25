// API configuration and types for the solidarity raffle application
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

type UnknownRecord = Record<string, unknown>;

function normalizeString(value: unknown): string {
  if (typeof value === "string") return value;
  if (value == null) return "";
  return String(value);
}

function normalizeNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && !Number.isNaN(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? fallback : parsed;
  }

  return fallback;
}

function normalizeStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeString(item)).filter(Boolean);
  }

  if (typeof value === "string" && value.trim() !== "") {
    return [value];
  }

  return [];
}

function normalizeRaffle(data: UnknownRecord | null | undefined): Raffle | null {
  if (!data) {
    return null;
  }

  const id = normalizeNumber(data.id, -1);
  const slug = normalizeString(data.slug);

  if (id < 0 || !slug) {
    return null;
  }

  return {
    id,
    slug,
    title: normalizeString(data.title),
    description: normalizeString(data.description),
    rules: (data.rules as string | null) ?? null,
    prize_image:
      (typeof data.prize_image === "string" && data.prize_image.trim() !== ""
        ? data.prize_image
        : typeof data.prize_image_url === "string"
          ? data.prize_image_url
          : typeof data.image === "string"
            ? data.image
            : null) ?? null,
    prize_images: normalizeStringArray(
      data.prize_images ?? data.prize_gallery ?? data.images ?? null,
    ),
    ticket_price: normalizeNumber(data.ticket_price),
    total_tickets: normalizeNumber(data.total_tickets),
    sold_tickets: normalizeNumber(data.sold_tickets),
    draw_date: (data.draw_date as string | null) ?? null,
    status: (data.status as Raffle["status"]) ?? "active",
    created_at: (data.created_at as string | null) ?? null,
    updated_at: (data.updated_at as string | null) ?? null,
  };
}

function extractCollection(payload: unknown): Raffle[] {
  if (!payload) {
    return [];
  }

  if (Array.isArray(payload)) {
    return payload
      .map((item) => normalizeRaffle((item ?? null) as UnknownRecord))
      .filter((item): item is Raffle => Boolean(item));
  }

  const record = payload as UnknownRecord;

  if (Array.isArray(record.data)) {
    return extractCollection(record.data);
  }

  if (record.data && typeof record.data === "object") {
    const inner = record.data as UnknownRecord;

    if (Array.isArray(inner.data)) {
      return extractCollection(inner.data);
    }
  }

  if (Array.isArray(record.raffles)) {
    return extractCollection(record.raffles);
  }

  return [];
}

function extractResource(payload: unknown): Raffle | null {
  if (!payload) {
    return null;
  }

  if (!Array.isArray(payload) && typeof payload === "object") {
    const record = payload as UnknownRecord;

    if (record.data && typeof record.data === "object" && !Array.isArray(record.data)) {
      const normalized = normalizeRaffle(record.data as UnknownRecord);
      if (normalized) {
        return normalized;
      }
    }

    const normalized = normalizeRaffle(record as UnknownRecord);
    if (normalized) {
      return normalized;
    }
  }

  return null;
}

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

    const payload = await safeParseJson<unknown>(response);

    if (!response.ok || !payload) {
      console.error("Falha ao buscar sorteios:", payload);
      return [];
    }

    const raffles = extractCollection(payload);

    if (!raffles.length) {
      console.error("Nenhum sorteio válido retornado pela API:", payload);
    }

    return raffles;
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

    const payload = await safeParseJson<unknown>(response);

    if (!response.ok || !payload) {
      console.error("Falha ao buscar sorteio:", payload);
      return null;
    }

    const raffle = extractResource(payload);

    if (!raffle) {
      console.error("Resposta de sorteio inválida:", payload);
    }

    return raffle;
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
