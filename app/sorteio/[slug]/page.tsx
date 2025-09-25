import { notFound } from "next/navigation";
import { fetchRaffleBySlug } from "@/lib/api";
import { RaffleGallery } from "@/components/raffle-gallery";
import { RaffleInfo } from "@/components/raffle-info";
import { PurchaseForm } from "@/components/purchase-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface RafflePageProps {
  params: {
    slug: string;
  };
}

export default async function RafflePage({ params }: RafflePageProps) {
  const raffle = await fetchRaffleBySlug(params.slug);

  if (!raffle) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="font-semibold text-lg text-balance">{raffle.title}</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Gallery and Info */}
          <div className="space-y-8">
            <RaffleGallery raffle={raffle} />
            <RaffleInfo raffle={raffle} />
          </div>

          {/* Right Column - Purchase Form */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <PurchaseForm raffle={raffle} />
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateMetadata({ params }: RafflePageProps) {
  const raffle = await fetchRaffleBySlug(params.slug);

  if (!raffle) {
    return {
      title: "Sorteio não encontrado",
    };
  }

  return {
    title: `${raffle.title} - Sorteio Solidário`,
    description: raffle.description ?? undefined,
  };
}
