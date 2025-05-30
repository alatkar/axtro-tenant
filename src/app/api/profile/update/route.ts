import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: z.string().min(10, 'Invalid phone number'),
  currentlyRenting: z.boolean(),
  monthlyBudget: z.number().min(0, 'Budget must be positive'),
  moveInDate: z.string(),
  preferredLocations: z.string(),
  preferredAmenities: z.string()
})

export async function PUT(request: Request) {
  try {
    const token = await getToken({ req: request as any })

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = updateProfileSchema.parse(body)

    // Convert comma-separated strings to arrays
    const preferredLocations = validatedData.preferredLocations.split(',').map(loc => loc.trim())
    const preferredAmenities = validatedData.preferredAmenities.split(',').map(amenity => amenity.trim())

    const updatedUser = await prisma.user.update({
      where: { id: token.id as string },
      data: {
        name: validatedData.name,
        phoneNumber: validatedData.phoneNumber,
        currentlyRenting: validatedData.currentlyRenting,
        monthlyBudget: validatedData.monthlyBudget,
        moveInDate: new Date(validatedData.moveInDate),
        preferredLocations,
        preferredAmenities
      }
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input data', errors: error.errors },
        { status: 400 }
      )
    }

    console.error('Profile update error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 