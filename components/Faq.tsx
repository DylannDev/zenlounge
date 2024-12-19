import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/data";
import SectionHeader from "./SectionHeader";

const Faq = () => {
  return (
    <div className="flex flex-col py-10 md:py-20 w-full">
      <SectionHeader
        title="FAQ"
        subtitle={["Des réponses à vos questions", "les plus fréquentes"]}
      />
      <Accordion className="flex flex-col gap-3" type="single" collapsible>
        {faqData.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
