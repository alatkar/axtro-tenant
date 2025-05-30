'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: z.string().min(10, 'Invalid phone number'),
  currentlyRenting: z.boolean(),
  monthlyBudget: z.number().min(0, 'Budget must be positive'),
  moveInDate: z.string(),
  preferredLocations: z.string(),
  preferredAmenities: z.string()
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function Profile() {
  const { data: session, update } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session?.user?.name || '',
      phoneNumber: '',
      currentlyRenting: false,
      monthlyBudget: 0,
      moveInDate: '',
      preferredLocations: '',
      preferredAmenities: ''
    }
  })

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const response = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update profile')
      }

      const updatedUser = await response.json()
      await update(updatedUser)
      setSuccess('Profile updated successfully')
      setIsEditing(false)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An error occurred while updating your profile')
      }
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="space-y-10 divide-y divide-gray-900/10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Update your personal information and preferences.
            </p>
          </div>

          <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('name')}
                      type="text"
                      disabled={!isEditing}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('phoneNumber')}
                      type="tel"
                      disabled={!isEditing}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    {errors.phoneNumber && (
                      <p className="mt-2 text-sm text-red-600">{errors.phoneNumber.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <div className="flex items-center">
                    <input
                      {...register('currentlyRenting')}
                      type="checkbox"
                      disabled={!isEditing}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 disabled:bg-gray-100"
                    />
                    <label htmlFor="currentlyRenting" className="ml-2 block text-sm font-medium leading-6 text-gray-900">
                      Currently Renting
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="monthlyBudget" className="block text-sm font-medium leading-6 text-gray-900">
                    Monthly Budget
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('monthlyBudget', { valueAsNumber: true })}
                      type="number"
                      disabled={!isEditing}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    {errors.monthlyBudget && (
                      <p className="mt-2 text-sm text-red-600">{errors.monthlyBudget.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="moveInDate" className="block text-sm font-medium leading-6 text-gray-900">
                    Preferred Move-in Date
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('moveInDate')}
                      type="date"
                      disabled={!isEditing}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    {errors.moveInDate && (
                      <p className="mt-2 text-sm text-red-600">{errors.moveInDate.message}</p>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="preferredLocations" className="block text-sm font-medium leading-6 text-gray-900">
                    Preferred Locations (comma-separated)
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('preferredLocations')}
                      type="text"
                      disabled={!isEditing}
                      placeholder="Downtown, West End, North Side"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    {errors.preferredLocations && (
                      <p className="mt-2 text-sm text-red-600">{errors.preferredLocations.message}</p>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="preferredAmenities" className="block text-sm font-medium leading-6 text-gray-900">
                    Preferred Amenities (comma-separated)
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('preferredAmenities')}
                      type="text"
                      disabled={!isEditing}
                      placeholder="Parking, Gym, Pool"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    {errors.preferredAmenities && (
                      <p className="mt-2 text-sm text-red-600">{errors.preferredAmenities.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4 mx-8">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {success && (
              <div className="rounded-md bg-green-50 p-4 mx-8">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            )}

            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 