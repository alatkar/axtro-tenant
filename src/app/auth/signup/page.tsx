'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phoneNumber: z.string().min(10, 'Invalid phone number'),
  currentlyRenting: z.boolean(),
  monthlyBudget: z.string().transform((val) => Number(val)),
  moveInDate: z.string(),
  preferredLocations: z.string().transform((val) => val.split(',').map((loc) => loc.trim())),
  preferredAmenities: z.string().transform((val) => val.split(',').map((amenity) => amenity.trim()))
})

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUp() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to sign up')
      }

      router.push('/auth/signin')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An error occurred during sign up')
      }
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Full Name
            </label>
            <div className="mt-2">
              <input
                {...register('name')}
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                {...register('email')}
                type="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                {...register('password')}
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </label>
            <div className="mt-2">
              <input
                {...register('phoneNumber')}
                type="tel"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.phoneNumber && (
                <p className="mt-2 text-sm text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              {...register('currentlyRenting')}
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="currentlyRenting" className="ml-2 block text-sm font-medium leading-6 text-gray-900">
              Currently Renting
            </label>
          </div>

          <div>
            <label htmlFor="monthlyBudget" className="block text-sm font-medium leading-6 text-gray-900">
              Monthly Budget
            </label>
            <div className="mt-2">
              <input
                {...register('monthlyBudget')}
                type="number"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.monthlyBudget && (
                <p className="mt-2 text-sm text-red-600">{errors.monthlyBudget.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="moveInDate" className="block text-sm font-medium leading-6 text-gray-900">
              Preferred Move-in Date
            </label>
            <div className="mt-2">
              <input
                {...register('moveInDate')}
                type="date"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.moveInDate && (
                <p className="mt-2 text-sm text-red-600">{errors.moveInDate.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="preferredLocations" className="block text-sm font-medium leading-6 text-gray-900">
              Preferred Locations (comma-separated)
            </label>
            <div className="mt-2">
              <input
                {...register('preferredLocations')}
                type="text"
                placeholder="Downtown, West End, North Side"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.preferredLocations && (
                <p className="mt-2 text-sm text-red-600">{errors.preferredLocations.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="preferredAmenities" className="block text-sm font-medium leading-6 text-gray-900">
              Preferred Amenities (comma-separated)
            </label>
            <div className="mt-2">
              <input
                {...register('preferredAmenities')}
                type="text"
                placeholder="Parking, Gym, Pool"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.preferredAmenities && (
                <p className="mt-2 text-sm text-red-600">{errors.preferredAmenities.message}</p>
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSubmitting ? 'Creating account...' : 'Sign up'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/auth/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
} 