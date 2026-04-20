import Image from "next/image";
import { EnquiryForm } from "@/components/enquiry-form";

export default function AdvertisePage() {
  return (
    <div className="bg-white">
      <section className="mx-auto grid w-full max-w-7xl gap-12 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:pb-24">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--olive)]">Advertise with us</p>
          <h1 className="font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
            Your business, in front of every Jobe resident.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
            Reach tenants across 6 phases. People who live, eat, and spend within walking distance of your door.
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
          eyebrow="Advertise with us"
          title="Tell us about your business."
          description="If you want to reach Jobe residents, leave your details and we will get back to you with placement options."
          submitLabel="Send enquiry"
          fields={[
            { name: "businessName", label: "Business name", placeholder: "Restaurant, salon, laundromat, local shop" },
            { name: "contactName", label: "Your name", placeholder: "Full name" },
            { name: "phone", label: "Phone number", placeholder: "071 234 5678", type: "tel" },
            { name: "email", label: "Email address", placeholder: "hello@example.com", type: "email" },
            { name: "placementInterest", label: "What would you like to promote?", placeholder: "Special offer, opening, weekly deal" },
          ]}
        />
      </section>
    </div>
  );
}
