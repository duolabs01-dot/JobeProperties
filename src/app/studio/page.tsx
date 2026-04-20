import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StudioEnquiryForm } from "@/components/studio-enquiry-form";
import { ButtonLink } from "@/components/ui/button-link";
import { ShimmerImage } from "@/components/ui/shimmer-image";
import { whatsappNumber } from "@/lib/property-data";

const campaignImages = [
  {
    src: "https://jobepropco.co.za/wp-content/uploads/2025/05/Open-Space-1-scaled-e1748731339120.jpg",
    alt: "Open-plan studio apartment interior",
  },
  {
    src: "https://jobepropco.co.za/wp-content/uploads/2025/05/Cupboard-1-scaled-e1748731381811.jpg",
    alt: "Built-in cupboards inside a Jobe studio",
  },
  {
    src: "https://jobepropco.co.za/wp-content/uploads/2025/05/bathroom-3-scaled-e1748769189640.jpg",
    alt: "Private bathroom inside a Jobe studio",
  },
  {
    src: "https://jobepropco.co.za/wp-content/uploads/2025/06/QJ2A7347-scaled-e1748771472367.jpg",
    alt: "Balcony studio exterior at Jobe Propco",
  },
];

const heroImage =
  "https://jobepropco.co.za/wp-content/uploads/2025/05/Home-Page-1-2-scaled-e1748765134734-1024x657.jpg";

const whatsappLeadUrl =
  "https://wa.me/27722293229?text=Hi%2C+I%27m+looking+for+a+studio+apartment+near+Sandton.+Can+you+help%3F";

export const metadata: Metadata = {
  title: "Studio Apartments Near Sandton | From R4,300/mo | Jobe Propco",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioPage() {
  return (
    <div className="bg-[color:var(--paper)]">
      <section className="relative isolate min-h-screen overflow-hidden bg-[color:var(--ink)] text-white">
        <Image
          src={heroImage}
          alt="Jobe Propco studio apartments in Alexandra"
          fill
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAcI/8QAIBAAAgIBBAMAAAAAAAAAAAAAAQIDBAUREiExYf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCeq3VFuuuijYSvCZNcySB5ORz8AAAB/9k="
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 flex min-h-screen flex-col">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
            <Link href="/" className="flex items-baseline gap-3">
              <span className="font-display text-xl tracking-[0.18em] text-[color:var(--sand)] sm:text-2xl">JOBE</span>
              <span className="text-[10px] uppercase tracking-[0.36em] text-white/56 sm:text-xs">Propco</span>
            </Link>

            <ButtonLink
              href={whatsappLeadUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/18 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white hover:bg-white/10 sm:px-5"
            >
              WhatsApp {whatsappNumber}
            </ButtonLink>
          </div>

          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 py-16 sm:px-8 lg:px-12">
            <div className="max-w-3xl space-y-6">
              <h1 className="font-display text-5xl leading-none text-white sm:text-6xl lg:text-7xl">
                Studio apartments near Sandton. From R4,300/month.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/76 sm:text-xl">
                No lease required. 24/7 security. Move in fast.
              </p>
              <ButtonLink
                href="#studio-enquiry"
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--sand)] px-7 py-4 text-xs font-semibold uppercase tracking-[0.26em] text-[color:var(--ink)] hover:bg-white"
              >
                Check availability & WhatsApp us
              </ButtonLink>
              <div className="flex flex-wrap gap-3 pt-2">
                {["9km to Sandton", "Biometric security", "No lease"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/82"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-4 sm:grid-cols-2">
          {campaignImages.map((image) => (
            <div key={image.src} className="overflow-hidden rounded-[1.75rem] border border-[color:var(--line-strong)] bg-white">
              <ShimmerImage
                src={image.src}
                alt={image.alt}
                width={1200}
                height={900}
                wrapperClassName="aspect-[4/3] w-full bg-[color:var(--stone)]"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[1fr_0.92fr] lg:px-12 lg:pb-20">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--olive)]">Fastest way in</p>
          <h2 className="max-w-2xl font-display text-4xl leading-none text-[color:var(--ink)] sm:text-5xl">
            Leave your details and we&apos;ll tell you what&apos;s open right now.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            If you already know you want to move quickly, WhatsApp works too. We&apos;ll point you to the right phase and the right layout.
          </p>
          <ButtonLink
            href={whatsappLeadUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-white"
          >
            WhatsApp instead
          </ButtonLink>
        </div>

        <StudioEnquiryForm />
      </section>

      <footer className="border-t border-[color:var(--line)] bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-6 text-sm text-[color:var(--muted)] sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <p>1191 S Africa Loop, Far East Bank, Alexandra, 2014</p>
          <p>{whatsappNumber}</p>
        </div>
      </footer>
    </div>
  );
}
