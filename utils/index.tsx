export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Fonction utilitaire pour générer un slug
export const generateSlug = (name: string) => {
  return name
    .toLowerCase() // Convertir en minuscule
    .replace(/[\s']/g, "-") // Remplacer les espaces et apostrophes par un tiret
    .replace(/[^\w-]+/g, ""); // Supprimer les caractères non alphanumériques
};
