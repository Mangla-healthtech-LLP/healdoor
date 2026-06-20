import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FAQBlockData } from '@healdoor/types'

export function FAQBlock({
  sectionTitle,
  sectionDescription,
  faqItems,
}: FAQBlockData) {
  if (!faqItems || faqItems.length === 0) return null

  return (
    <section className="section-padding-sm bg-white border-y border-border/50">
      <div className="container max-w-4xl">
        {(sectionTitle || sectionDescription) && (
          <div className="text-center mb-8">
            {sectionTitle && (
              <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-text-dark mb-2">
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p className="text-base text-text-body">
                {sectionDescription}
              </p>
            )}
          </div>
        )}

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqItems.map((faq, i) => (
            <AccordionItem 
              key={faq.id || i} 
              value={`item-${i}`}
              className="bg-white border border-border/30 rounded-xl px-4 md:px-5 data-[state=open]:shadow-sm transition-all duration-300"
            >
              <AccordionTrigger className="text-left font-heading text-base font-semibold text-text-dark hover:text-teal hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-text-body text-sm leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
