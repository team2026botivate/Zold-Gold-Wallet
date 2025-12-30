import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { PartnersTabSkeleton } from "@/components/skeletons/PartnersTabSkeleton";
import {
  MapPin,
  Phone,
  Star,
  Search,
  Map,
  List,
  Navigation,
  Clock,
  Store,
  ShoppingBag,
  Truck,
  Package,
  Repeat,
  X,
  ShieldCheck,
  Award,
  BadgeCheck,
  Plus,
} from "lucide-react";
import { ZoldLogoHorizontal } from "@/components/ZoldLogo";

interface PartnerTabProps {
  isLoading: boolean;
}

const PartnersMap = dynamic(() => import("./PartnersMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-96 items-center justify-center bg-gray-100 dark:bg-neutral-700">
      <Map className="h-16 w-16 text-gray-300 dark:text-neutral-600 animate-pulse" />
    </div>
  ),
});

const partners = [
  {
    id: 1,
    name: "Botivate Services LLP",
    area: "Vidhan sabha road raipur",
    city: "Raipur",
    lat: 21.28281,
    lng: 81.70326,
    distance: 1,
    rating: 4.8,
    reviews: 234,
    services: ["Web Development", "Mobile App Development", "Automation", "AI"],
    offers: ["10% discount on first order"],
    timings: "10:00 AM - 6:00 PM",
    phone: "+91 98765 43210",
  },
  {
    id: 2,
    name: "AT Plus Jewellers",
    area: "Sadar Bazar",
    city: "Raipur",
    lat: 21.23831,
    lng: 81.63365,
    distance: 11.3,
    rating: 4.6,
    reviews: 156,
    services: ["jewellery", "loan"],
    offers: [],
    timings: "11:00 AM - 7:00 PM",
    phone: "+91 98765 43211",
  },
  {
    id: 3,
    name: "Kalyan Jewellers",
    area: "Pandari",
    city: "Raipur",
    lat: 21.25233,
    lng: 81.64860,
    distance: 7.7,
    rating: 4.9,
    reviews: 412,
    services: ["pickup", "jewellery"],
    offers: ["Special discount on gold coins", "Free insurance for 1 year"],
    timings: "10:30 AM - 9:00 PM",
    phone: "+91 98765 43212",
  },
];



export function PartnersTab({ isLoading }: PartnerTabProps) {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPartner, setSelectedPartner] = useState<
    (typeof partners)[0] | null
  >(null);
  const [isInternalLoading, setIsInternalLoading] = useState(true);
  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    area: "",
    city: "",
    phone: "",
    timings: "",
    rating: "",
    reviews: "",
    coordinates: "",
  });



  const filteredPartners = partners.filter(
    (partner) =>
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.area.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInternalLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isInternalLoading) {
    return <PartnersTabSkeleton />;
  }

  return (
    <div className="min-h-screen pb-6 dark:bg-neutral-900 dark:text-gray-100">
      {/* Header */}
      <div className="rounded-b-3xl bg-gradient-to-br from-[#3D3066] via-[#5C4E7F] to-[#8B7FA8] px-6 pt-6 pb-6">
        <div className="mb-4 flex items-center justify-between">
          <img src="01.jpg" alt="Zold Logo" className="h-16 rounded-xl" />
          <button
            onClick={() => setIsAddPartnerOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-white hover:bg-white/30 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Partner</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-white px-4 py-3 dark:bg-neutral-800">
          <Search className="h-5 w-5 text-gray-400 dark:text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by store, city, or area"
            className="flex-1 text-gray-800 outline-none dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500"
          />
        </div>

        {/* View Toggle */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 transition-colors ${viewMode === "list"
              ? "bg-white text-[#3D3066] dark:bg-neutral-800 dark:text-white"
              : "bg-white/20 text-white hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20"
              }`}
          >
            <List className="h-5 w-5" />
            List View
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 transition-colors ${viewMode === "map"
              ? "bg-white text-[#3D3066] dark:bg-neutral-800 dark:text-white"
              : "bg-white/20 text-white hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20"
              }`}
          >
            <Map className="h-5 w-5" />
            Map View
          </button>
        </div>

        {/* Certifications Section */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg dark:bg-neutral-800 dark:shadow-neutral-900/50">
          <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">Certifications & Licenses</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-neutral-700 dark:bg-neutral-700/50">
              <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900/30">
                <ShieldCheck className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">BIS Hallmarked</p>
                <p className="text-xs text-gray-500 dark:text-neutral-400">Bureau of Indian Standards</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-neutral-700 dark:bg-neutral-700/50">
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                <Award className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">ISO 9001:2015</p>
                <p className="text-xs text-gray-500 dark:text-neutral-400">Quality Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-neutral-700 dark:bg-neutral-700/50">
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                <BadgeCheck className="h-6 w-6 text-green-600 dark:text-green-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Sequoia Insured</p>
                <p className="text-xs text-gray-500 dark:text-neutral-400">100% Vault Insurance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 px-6">
        {viewMode === "list" ? (
          <div className="space-y-4">
            {filteredPartners.map((partner) => (
              <div
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-[#8B7FA8] dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-[#8B7FA8]"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-1 text-black dark:text-white">
                      {partner.name}
                    </h3>
                    <div className="mb-2 flex items-center gap-1 text-sm text-gray-500 dark:text-neutral-500">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {partner.area}, {partner.city} • {partner.distance} km
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 rounded bg-[#F3F1F7] px-2 py-1 dark:bg-neutral-700">
                        <Star className="h-3 w-3 fill-current text-[#8B7FA8] dark:text-[#8B7FA8]" />
                        <span className="text-xs text-[#3D3066] dark:text-white">
                          {partner.rating}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-neutral-500">
                        ({partner.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-3 flex flex-wrap gap-2">
                  {partner.services.includes("pickup") && (
                    <span className="flex items-center gap-1 rounded bg-green-50 px-2 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <Truck className="h-3 w-3" />
                      Pickup
                    </span>
                  )}
                  {partner.services.includes("jewellery") && (
                    <span className="flex items-center gap-1 rounded bg-blue-50 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      <ShoppingBag className="h-3 w-3" />
                      Jewellery
                    </span>
                  )}
                  {partner.services.includes("loan") && (
                    <span className="flex items-center gap-1 rounded bg-purple-50 px-2 py-1 text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                      <Repeat className="h-3 w-3" />
                      Loan
                    </span>
                  )}
                </div>

                {/* Offers */}
                {partner.offers.length > 0 && (
                  <div className="mb-3 rounded-lg border border-orange-200 bg-orange-50 p-2 dark:border-orange-800 dark:bg-orange-900/20">
                    <p className="text-xs text-orange-800 dark:text-orange-300">
                      {partner.offers[0]}
                    </p>
                  </div>
                )}

                <button className="w-full rounded-lg bg-[#3D3066] py-2 text-white transition-colors hover:bg-[#5C4E7F] dark:bg-[#4D3F7F] dark:hover:bg-[#5C4E9F]">
                  View Details
                </button>
              </div>
            ))}

            {filteredPartners.length === 0 && (
              <div className="py-12 text-center text-gray-500 dark:text-neutral-500">
                <MapPin className="mx-auto mb-2 h-12 w-12 text-gray-300 dark:text-neutral-700" />
                <p>No partners found</p>
                <p className="mt-1 text-sm">Try adjusting your search</p>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-hidden bg-white dark:bg-neutral-800">
            <PartnersMap
              partners={filteredPartners}
              onSelectPartner={setSelectedPartner}
            />

            <div className="p-4 border border-t-0 border-gray-200 dark:border-neutral-700 rounded-b-xl">
              <p className="text-center text-sm text-gray-600 dark:text-neutral-400">
                Showing {filteredPartners.length} partners nearby
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Partner Details Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center dark:bg-black/70">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white sm:rounded-2xl dark:bg-neutral-800">
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-neutral-700 dark:bg-neutral-800">
              <h2 className="text-black dark:text-white">{selectedPartner.name}</h2>
              <button
                onClick={() => setSelectedPartner(null)}
                className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-neutral-700"
              >
                <X className="h-6 w-6 text-black" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6 p-6">
              {/* Location */}
              <div>
                <div className="mb-3 flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-gray-600 dark:text-neutral-400" />
                  <div>
                    <p className="text-gray-900 dark:text-white">
                      {selectedPartner.area}, {selectedPartner.city}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      {selectedPartner.distance} km away
                    </p>
                  </div>
                </div>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#F3F1F7] py-2 text-[#3D3066] transition-colors hover:bg-[#E5E1F0] dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600">
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 rounded-lg bg-[#F3F1F7] px-3 py-2 dark:bg-neutral-700">
                  <Star className="h-5 w-5 fill-current text-[#8B7FA8]" />
                  <span className="text-[#3D3066] dark:text-white">
                    {selectedPartner.rating}
                  </span>
                </div>
                <span className="text-gray-600 dark:text-neutral-400">
                  {selectedPartner.reviews} reviews
                </span>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-black mb-3 dark:text-white">Services Available</h3>
                <div className="space-y-2">
                  {selectedPartner.services.includes("pickup") && (
                    <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
                      <Truck className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="text-green-900 dark:text-green-300">
                        Gold Pickup Available
                      </span>
                    </div>
                  )}
                  {selectedPartner.services.includes("jewellery") && (
                    <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
                      <ShoppingBag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-blue-900 dark:text-blue-300">
                        Jewellery Conversion
                      </span>
                    </div>
                  )}
                  {selectedPartner.services.includes("loan") && (
                    <div className="flex items-center gap-3 rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
                      <Repeat className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-purple-900 dark:text-purple-300">
                        Loan Assistance
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Timings & Contact */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-3 dark:bg-neutral-700">
                  <div className="mb-1 flex items-center gap-2 text-gray-600 dark:text-neutral-400">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Timings</span>
                  </div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {selectedPartner.timings}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3 dark:bg-neutral-700">
                  <div className="mb-1 flex items-center gap-2 text-gray-600 dark:text-neutral-400">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">Contact</span>
                  </div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {selectedPartner.phone}
                  </p>
                </div>
              </div>

              {/* Offers */}
              {selectedPartner.offers.length > 0 && (
                <div>
                  <h3 className="text-black mb-3 dark:text-white">Current Offers</h3>
                  <div className="space-y-2">
                    {selectedPartner.offers.map((offer, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-orange-200 bg-orange-50 p-3 dark:border-orange-800 dark:bg-orange-900/20"
                      >
                        <p className="text-sm text-orange-900 dark:text-orange-300">
                          {offer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full rounded-lg bg-[#3D3066] py-3 text-white transition-colors hover:bg-[#5C4E7F] dark:bg-[#4D3F7F] dark:hover:bg-[#5C4E9F]">
                  Convert Gold to Jewellery Here
                </button>
                <button className="w-full rounded-lg border border-gray-300 bg-white py-3 text-gray-700 transition-colors hover:bg-gray-50 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600">
                  Deposit Physical Gold
                </button>
                <button className="w-full rounded-lg border border-gray-300 bg-white py-3 text-gray-700 transition-colors hover:bg-gray-50 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600">
                  Book Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Partner Modal */}
      {isAddPartnerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center dark:bg-black/70">
          <div className="w-full max-w-lg rounded-t-3xl bg-white p-6 shadow-xl sm:rounded-2xl dark:bg-neutral-800">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add New Partner
              </h2>
              <button
                onClick={() => setIsAddPartnerOpen(false)}
                className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-neutral-700"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Partner Name
                </label>
                <input
                  type="text"
                  placeholder="Enter partner name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 p-2.5 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Area
                  </label>
                  <input
                    type="text"
                    placeholder="Area name"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 p-2.5 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 p-2.5 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Timings
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10:00 AM - 9:00 PM"
                    value={formData.timings}
                    onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 p-2.5 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Coordinates (Lat, Lng)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 21.2514, 81.6296"
                    value={formData.coordinates}
                    onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 p-2.5 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 p-2.5 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400"
                />
              </div>

              {/* Hidden fields for data retention visual confirmation if needed, or just keeping them in state */}
              {formData.rating && (
                <div className="rounded-lg bg-yellow-50 p-2 text-xs text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                  Auto-selected: {formData.rating} ★ ({formData.reviews} reviews) • {formData.timings}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsAddPartnerOpen(false)}
                  className="flex-1 rounded-lg border border-gray-300 bg-white py-2.5 text-gray-700 hover:bg-gray-50 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsAddPartnerOpen(false)}
                  className="flex-1 rounded-lg bg-[#3D3066] py-2.5 text-white hover:bg-[#5C4E7F] dark:bg-[#4D3F7F] dark:hover:bg-[#5C4E9F]"
                >
                  Add Partner
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
