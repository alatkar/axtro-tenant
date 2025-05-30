import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { z } from 'zod'

const prisma = new PrismaClient()

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phoneNumber: z.string().min(10, 'Invalid phone number'),
  currentlyRenting: z.boolean(),
  monthlyBudget: z.number(),
  moveInDate: z.string(),
  preferredLocations: z.array(z.string()),
  preferredAmenities: z.array(z.string())
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = signUpSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        phoneNumber: validatedData.phoneNumber,
        currentlyRenting: validatedData.currentlyRenting,
        monthlyBudget: validatedData.monthlyBudget,
        moveInDate: new Date(validatedData.moveInDate),
        preferredLocations: validatedData.preferredLocations,
        preferredAmenities: validatedData.preferredAmenities
      }
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      { message: 'User created successfully', user: userWithoutPassword },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input data', errors: error.errors },
        { status: 400 }
      )
    }

    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 