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
    <section className="section-padding bg-white border-y border-border/50">
      <div className="container max-w-4xl">
        {(sectionTitle || sectionDescription) && (
          <div className="text-center mb-12">
            {sectionTitle && (
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-text-dark mb-4">
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p className="text-lg text-text-body">
                {sectionDescription}
              </p>
            )}
          </div>
        )}

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((faq, i) => (
            <AccordionItem 
              key={faq.id || i} 
              value={`item-${i}`}
              className="bg-white border border-border/30 rounded-2xl px-6 data-[state=open]:shadow-md transition-all duration-300"
            >
              <AccordionTrigger className="text-left font-heading text-lg font-bold text-text-dark hover:text-teal hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-text-body text-base leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
