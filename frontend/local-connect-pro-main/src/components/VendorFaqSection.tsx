// Adjust this import path if needed to match where your existing Accordion is located!
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/Accordion";

interface VendorFaqSectionProps {
  businessName: string;
}

export function VendorFaqSection({ businessName }: VendorFaqSectionProps) {
  const faqItems = [
    {
      question: "Do you provide emergency service?",
      answer: `Yes, we offer urgent call-outs for critical breakdowns. Reach out directly via our phone number in the contact panel to check immediate availability.`,
    },
    {
      question: "Are materials included in the pricing?",
      answer: "Standard pricing usually covers service fees and basic diagnostic tasks. Heavy components, custom wiring, or fixture replacements are itemized transparently prior to installation.",
    },
    {
      question: "Do you offer a warranty on your work?",
      answer: "Absolutely. All service projects come backed by a standard craftsmanship warranty period to ensure everything functions perfectly post-setup.",
    },
  ];

  return (
    <div className="mt-12">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">
        Frequently Asked Questions
      </div>
      
      <div className="mt-4 border border-border bg-surface rounded-2xl p-2 shadow-soft">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="border-b last:border-b-0 border-border/60 px-4">
              <AccordionTrigger className="text-sm font-medium text-ink hover:no-underline py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}