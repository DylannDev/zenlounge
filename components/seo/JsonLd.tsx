/**
 * Composant utilitaire pour injecter du JSON-LD dans une page.
 * Utilise simplement un <script type="application/ld+json"> rendu côté serveur.
 */
type JsonLdProps = {
  id: string;
  data: unknown;
};

export default function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
