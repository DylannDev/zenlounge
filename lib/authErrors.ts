// Fonction pour générer un message d'erreur utilisateur
export const getAuthErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case "auth/popup-closed-by-user":
      return "La fenêtre de connexion a été fermée avant la finalisation. Veuillez réessayer.";
    case "auth/cancelled-popup-request":
      return "Une autre tentative de connexion est en cours. Veuillez patienter.";
    case "auth/network-request-failed":
      return "Problème de connexion Internet. Vérifiez votre réseau et réessayez.";
    case "auth/account-exists-with-different-credential":
      return "Un compte avec cet email existe déjà avec un autre mode de connexion.";
    case "auth/credential-already-in-use":
      return "Cette méthode d'authentification est déjà utilisée pour un autre compte.";
    case "auth/email-already-in-use":
      return "Cette adresse email est déjà associée à un compte.";
    case "auth/invalid-credential":
      return "Les informations de connexion sont invalides. Veuillez réessayer.";
    case "auth/operation-not-allowed":
      return "La connexion avec Google n'est pas activée. Contactez le support.";
    case "auth/too-many-requests":
      return "Trop de tentatives échouées. Veuillez réessayer plus tard.";
    case "auth/user-disabled":
      return "Ce compte a été désactivé. Contactez le support.";
    case "auth/user-not-found":
      return "Aucun compte trouvé avec ces identifiants.";
    case "auth/wrong-password":
      return "Mot de passe incorrect. Veuillez réessayer.";
    default:
      return "Une erreur inconnue s'est produite. Veuillez réessayer.";
  }
};
