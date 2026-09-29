import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { INTEGRATIONS_BAND, INTEGRATIONS_GA, docsUrl } from "@/lib/constants";

// Integrations, version 1 (F-515): a short band after "How it works" that says
// Forge has an MCP server and a public API, and links to the manual. It
// renders nothing unless the site was built with NEXT_PUBLIC_INTEGRATIONS_GA=on
// (see INTEGRATIONS_GA in src/lib/constants.ts). The top nav does not change
// and there is no new page: this band and the footer group are the whole of
// the version 1 landing addition.
export default function IntegrationsBand() {
  if (!INTEGRATIONS_GA) return null;

  return (
    <section
      id="developers"
      aria-labelledby="developers-title"
      className="relative py-20 md:py-24 border-t border-white/5"
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <SectionLabel>{INTEGRATIONS_BAND.label}</SectionLabel>
        <h2
          id="developers-title"
          className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-[-0.01em] uppercase text-forge-white mt-6"
        >
          {INTEGRATIONS_BAND.title}
        </h2>
        <p className="text-forge-smoke leading-relaxed mt-6">{INTEGRATIONS_BAND.body}</p>
        <div className="mt-8 flex justify-center">
          <Button href={docsUrl()} variant="secondary" size="md">
            {INTEGRATIONS_BAND.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
