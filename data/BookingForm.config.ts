export const formFields: {
  id: string;
  name: "name" | "email" | "phone"; // Les noms doivent correspondre aux clés de `formData`
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  ariaRequired: boolean;
  pattern?: "^[0-9]{10}$";
  additionalInfo?: string | null;
}[] = [
  {
    id: "name",
    name: "name",
    type: "text",
    label: "Nom Prénom",
    placeholder: "Nom Prénom",
    ariaRequired: true,
    required: false,
    additionalInfo: null,
  },
  {
    id: "email",
    name: "email",
    type: "email",
    label: "Adresse e-mail",
    placeholder: "Adresse e-mail",
    ariaRequired: true,
    required: false,
    additionalInfo: null,
  },
  {
    id: "phone",
    name: "phone",
    type: "tel",
    label: "Numéro de téléphone",
    placeholder: "Numéro de téléphone",
    ariaRequired: true,
    required: false,
    // pattern: "^[0-9]{10}$",
    additionalInfo: "Format : 10 chiffres (ex : 0612345678)",
  },
];
