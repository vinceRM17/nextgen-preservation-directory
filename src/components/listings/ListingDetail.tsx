import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Listing } from '@/types';

interface ListingDetailProps {
  listing: Listing;
}

export function ListingDetail({ listing }: ListingDetailProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-oswald font-bold mb-2">{listing.name}</h1>
        <p className="text-xl text-slate-400 font-lato">{listing.role}</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Description */}
          {listing.description && (
            <section>
              <h2 className="text-2xl font-oswald font-semibold mb-3">About</h2>
              <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </section>
          )}

          {/* Specialties */}
          {listing.specialties && listing.specialties.length > 0 && (
            <section>
              <h2 className="text-2xl font-oswald font-semibold mb-3">Specialties</h2>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {listing.specialties.map((specialty, index) => (
                  <li key={index}>{specialty}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Portfolio/Projects */}
          {listing.projects && listing.projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-oswald font-semibold mb-4">Portfolio</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {listing.projects.map((project, index) => (
                  <Card key={index} className="overflow-hidden">
                    {project.imageUrl && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-400">{project.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar - Contact Info */}
        <div className="md:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {listing.phone && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-1">Phone</h3>
                  <a
                    href={`tel:${listing.phone}`}
                    className="text-blue-400 hover:underline"
                  >
                    {listing.phone}
                  </a>
                </div>
              )}
              {listing.email && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-1">Email</h3>
                  <a
                    href={`mailto:${listing.email}`}
                    className="text-blue-400 hover:underline break-all"
                  >
                    {listing.email}
                  </a>
                </div>
              )}
              {listing.website && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-1">Website</h3>
                  <a
                    href={listing.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline break-all"
                  >
                    {listing.website}
                  </a>
                </div>
              )}
              {listing.address && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-1">Address</h3>
                  <p className="text-slate-300 text-sm">{listing.address}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
