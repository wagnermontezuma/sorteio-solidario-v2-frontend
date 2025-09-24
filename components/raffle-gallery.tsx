"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Raffle } from "@/lib/api"

interface RaffleGalleryProps {
  raffle: Raffle
}

export function RaffleGallery({ raffle }: RaffleGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = [raffle.prize_image, ...raffle.prize_images].filter(Boolean)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (images.length === 0) {
    return (
      <Card className="aspect-square bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Nenhuma imagem disponível</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <Card className="relative overflow-hidden">
        <div className="aspect-square relative">
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={`${raffle.title} - Imagem ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority
          />

          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </Card>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                index === currentImageIndex ? "border-primary" : "border-transparent hover:border-muted-foreground/50"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${raffle.title} - Miniatura ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
