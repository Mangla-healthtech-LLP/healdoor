'use server'

import { revalidatePath } from 'next/cache'

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'
const API_KEY = process.env.PAYLOAD_API_KEY || ''

export async function submitProductRating(productId: string, currentRating: number, currentCount: number, newVote: number) {
  try {
    const res = await fetch(`${CMS_URL}/api/products/${productId}/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vote: newVote }),
    })

    if (!res.ok) {
      console.error('Payload API Error:', await res.text())
      throw new Error('Failed to update rating')
    }

    const data = await res.json()
    if (!data.success) {
      throw new Error(data.error || 'Failed to update rating')
    }

    revalidatePath('/products/[slug]', 'page')
    
    return { success: true, newRating: data.newRating, newCount: data.newCount }
  } catch (error) {
    console.error('Error submitting rating:', error)
    return { success: false, error: 'Failed to submit rating' }
  }
}
