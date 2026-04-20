import Image from "next/image";
import { EnquiryForm } from "@/components/enquiry-form";

export default function AdvertisePage() {
  return (
    <div className="bg-white">
      <section className="mx-auto grid w-full max-w-7xl gap-12 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:pb-24">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Advertising enquiries</p>
          <h1 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
            Let local businesses pay to be seen where tenants already pay attention.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
            A polished /advertise page turns the website into more than a rental brochure. Lifestyle Corner tenants, nearby shops, and service businesses can enquire for placements that the owner approves.
          </p>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[color:var(--stone)]">
            <Image
              src="https://jobepropco.co.za/wp-content/uploads/2025/05/Jobe-Lifestyle.jpg"
              alt="Jobe Lifestyle Corner"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <EnquiryForm
          endpoint="/api/advertise"
          eyebrow="Submit an enquiry"
          title="Advertise at Jobe Propco."
          description="Capture prospective advertisers with a proper lead form now. Pricing, placement management, and self-serve slots can come after the owner validates demand."
          submitLabel="Send ad enquiry"
          fields={[
            { name: "businessName", label: "Business name", placeholder: "Restaurant / laundromat / local shop" },
            { name: "contactName", label: "Contact person", placeholder: "Full name" },
            { name: "phone", label: "Phone", placeholder: "071 234 5678", type: "tel" },
            { name: "email", label: "Email", placeholder: "hello@example.com", type: "email" },
            { name: "placementInterest", label: "Placement interest", placeholder: "Homepage feature, tenant offer, launch campaign" },
          ]}
        />
      </section>
    </div>
  );
}
