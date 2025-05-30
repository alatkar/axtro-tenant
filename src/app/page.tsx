import Link from 'next/link'
import { HomeIcon, UserGroupIcon, DocumentCheckIcon, StarIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Easy Property Search',
    description: 'Find your perfect home with our advanced search filters and recommendations.',
    icon: HomeIcon,
  },
  {
    name: 'Community Reviews',
    description: 'Read and share authentic experiences from fellow tenants about properties and neighborhoods.',
    icon: UserGroupIcon,
  },
  {
    name: 'Smart Applications',
    description: 'Apply to multiple properties with a single profile - no repetitive forms.',
    icon: DocumentCheckIcon,
  },
  {
    name: 'Referral System',
    description: 'Earn rewards by referring properties to other tenants in the community.',
    icon: StarIcon,
  },
]

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Find Your Perfect Home in Our Community
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join our community of tenants to discover great properties, share experiences, and make informed decisions about your next home.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/properties"
                className="btn-primary"
              >
                Browse Properties
              </Link>
              <Link 
                href="/about" 
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Better Renting Experience</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to find your next home
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform simplifies the rental process by connecting you with the right properties and people.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-start">
                <div className="rounded-lg bg-gray-50 p-2 ring-1 ring-gray-200">
                  <feature.icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900">{feature.name}</dt>
                <dd className="mt-2 leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
