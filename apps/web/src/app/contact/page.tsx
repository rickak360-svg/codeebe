import { SectionHeading } from "@/components/brand/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Contact — Codeebe",
  description: "Get in touch with Codeebe.",
};

export default function ContactPage() {
  return (
    <div className="page-below-header site-container pb-16 pt-8 sm:pb-20">
      <SectionHeading
        eyebrow="Contact"
        title="Let's"
        titleAccent="talk"
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div className="card-surface p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white">Send a message</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-surface p-6">
            <h3 className="font-semibold text-white">Email</h3>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2 block text-[#ff6600] hover:text-[#ff8533]"
            >
              {siteConfig.email}
            </a>
          </div>
          <div className="card-surface p-6">
            <h3 className="font-semibold text-white">Book a meeting</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Schedule a discovery call on Calendly.
            </p>
            <div className="mt-4">
              <ButtonLink href={siteConfig.calendlyUrl} external>
                Open Calendly
              </ButtonLink>
            </div>
          </div>
          <div className="card-surface p-6">
            <h3 className="font-semibold text-white">WhatsApp</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Chat with us on WhatsApp for quick project questions.
            </p>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-[#ff6600] hover:text-[#ff8533]"
            >
              Open WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
