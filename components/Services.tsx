import { categories } from "@/data";
import SectionHeader from "./SectionHeader";
import Category from "./Category";

const Services = () => {
  return (
    <div className="flex flex-col gap-10 py-20">
      <SectionHeader
        title="Nos Prestations"
        subtitle={["Explorez notre gamme de soins et massages"]}
      />
      <div className="flex flex-col gap-20">
        {categories.map((category, index) => (
          <Category
            key={index}
            title={category.title}
            description={category.description}
            imageUrl={category.imageUrl}
            keyInfo={category.keyInfo}
            reverse={category.reverse}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
