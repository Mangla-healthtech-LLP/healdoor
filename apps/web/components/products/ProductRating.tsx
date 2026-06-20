'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { submitProductRating } from '@/app/actions/productRating'

interface ProductRatingProps {
  productId: string
  initialRating: number
  initialCount: number
}

export function ProductRating({ productId, initialRating, initialCount }: ProductRatingProps) {
  const [rating, setRating] = useState(initialRating || 0)
  const [count, setCount] = useState(initialCount || 0)
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleVote = async (vote: number) => {
    if (hasVoted || isSubmitting) return
    
    setIsSubmitting(true)
    
    // Optimistic UI update
    const newCount = count + 1
    const newRating = ((rating * count) + vote) / newCount
    setRating(newRating)
    setCount(newCount)
    setHasVoted(true)

    const result = await submitProductRating(productId, initialRating, initialCount, vote)
    
    if (result.success && result.newRating) {
      setRating(result.newRating)
      setCount(result.newCount ?? newCount)
    } else {
      // Revert on failure
      setRating(initialRating)
      setCount(initialCount)
      setHasVoted(false)
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center" onMouseLeave={() => setHoveredStar(null)}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = (hoveredStar !== null ? star <= hoveredStar : star <= Math.round(rating))
          
          return (
            <button
              key={star}
              type="button"
              disabled={hasVoted || isSubmitting}
              onMouseEnter={() => !hasVoted && setHoveredStar(star)}
              onClick={() => handleVote(star)}
              className={`p-0.5 transition-all ${hasVoted ? 'cursor-default' : 'cursor-pointer hover:scale-110 active:scale-95'}`}
              aria-label={`Rate ${star} stars`}
            >
              <Star 
                className={`w-5 h-5 ${isFilled ? 'fill-orange text-orange' : 'fill-transparent text-border'} transition-colors`} 
              />
            </button>
          )
        })}
      </div>
      <div className="text-sm font-medium text-text-muted flex items-center">
        <span className="text-text-dark font-bold mr-1">{rating.toFixed(1)}</span> 
        ({count} {count === 1 ? 'rating' : 'ratings'})
        {hasVoted && <span className="ml-3 text-teal text-xs font-bold animate-fade-in-up">Thanks for voting!</span>}
      </div>
    </div>
  )
}
