import {
  PiBathtub,
  PiBathtubLight,
  PiBed,
  PiBedLight,
  PiCalendarCheck,
  PiCheckSquare,
  PiCurrencyEur,
  PiDrop,
  PiFlowerLotus,
  PiGift,
  PiHamburger,
  PiHamburgerLight,
  PiRulerLight,
  PiSealPercent,
  PiShower,
  PiSparkle,
  PiSwimmingPool,
  PiSwimmingPoolLight,
  PiTimer,
  PiUserCheckLight,
  PiUsers,
  PiWifiHigh,
  PiWifiHighLight,
} from "react-icons/pi";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiWhatsappFill,
} from "react-icons/ri";

export const navbarLinks = [
  { href: "massages", label: "Massages" },
  { href: "soins", label: "Soins" },
  { href: "sejours", label: "Séjours" },
  { href: "forfaits", label: "Forfaits" },
];

export const socialLinks = [
  {
    platform: "Whatsapp",
    href: "https://wa.me/1234567890",
    icon: <RiWhatsappFill />,
  },
  {
    platform: "Instagram",
    href: "https://instagram.com/zenlounge",
    icon: <RiInstagramFill />,
  },
  {
    platform: "Facebook",
    href: "https://facebook.com/zenlounge",
    icon: <RiFacebookCircleFill />,
  },
];

export const categories = [
  {
    title: "Massages",
    description:
      "Offrez à votre corps un moment de pure relaxation avec nos massages sur-mesure. Du massage californien apaisant au massage suédois tonifiant, nos soins répondent à tous vos besoins de bien-être.",
    imageUrl: "/massage-2.jpg",
    keyInfo: [
      { icon: <PiCurrencyEur />, text: "De 50€ à 120€" },
      { icon: <PiTimer />, text: "30 min à 90 min" },
      {
        icon: <PiFlowerLotus />,
        text: "Types de massages : Relaxants, thérapeutiques, énergétiques",
      },
      {
        icon: <PiSparkle />,
        text: "Bienfaits : Réduction du stress, soulagement musculaire",
      },
    ],
    reverse: false,
  },
  {
    title: "Soins du Corps et Visage",
    description:
      "Ravivez l’éclat de votre peau avec nos soins experts. Gommages, enveloppements ou soins hydratants, chaque prestation est conçue pour sublimer votre beauté naturelle.",
    imageUrl: "/soins-visage.jpg",
    keyInfo: [
      { icon: <PiCurrencyEur />, text: "De 40€ à 90€" },
      { icon: <PiTimer />, text: "Durée : 20 min à 60 min" },
      {
        icon: <PiDrop />,
        text: "Produits utilisés : Huiles naturelles, gommages bio",
      },
      {
        icon: <PiSparkle />,
        text: "Bienfaits : Hydratation intense, peau éclatante",
      },
    ],
    reverse: true,
  },
  {
    title: "Séjours Détente",
    description:
      "Plongez dans un univers de sérénité avec nos séjours détente. Profitez d'une combinaison parfaite entre soins relaxants et moments d’évasion pour un bien-être prolongé.",
    imageUrl: "/jacuzzi.jpg",
    keyInfo: [
      { icon: <PiCurrencyEur />, text: "De 120€ à 350€" },
      {
        icon: <PiBed />,
        text: "Prestations incluses : Massage, soin visage, spa",
      },
      { icon: <PiCalendarCheck />, text: "Durée : 1 jour à 2 nuits" },
      {
        icon: <PiUsers />,
        text: "Idéal pour : Solo, duo ou cadeau bien-être",
      },
    ],
    reverse: false,
  },
  {
    title: "Forfaits",
    description:
      "Prenez soin de vous toute l’année avec nos forfaits avantageux. Bénéficiez de remises exclusives pour plusieurs séances de massages ou soins combinés.",
    imageUrl: "/massage-dos.jpg",
    keyInfo: [
      { icon: <PiCurrencyEur />, text: "De 150€ à 500€" },
      {
        icon: <PiCheckSquare />,
        text: "Options : Massages x5, soins visage x3",
      },
      {
        icon: <PiSealPercent />,
        text: "Économies : Jusqu'à 20% sur les tarifs unitaires",
      },
      {
        icon: <PiGift />,
        text: "Idéal pour : Fidèles ou comme cadeau bien-être",
      },
    ],
    reverse: true,
  },
];

export const faqData = [
  {
    id: "item-1",
    question: "Dois-je réserver à l'avance pour une prestation ?",
    answer:
      "Oui, il est recommandé de réserver à l'avance pour garantir un créneau.",
  },
  {
    id: "item-2",
    question: "Dois-je verser un acompte lors de la réservation ?",
    answer:
      "Oui, un acompte peut être demandé pour confirmer votre réservation.",
  },
  {
    id: "item-3",
    question: "Est-ce que je peux modifier ou annuler ma réservation ?",
    answer:
      "Vous pouvez modifier ou annuler votre réservation sous certaines conditions.",
  },
  {
    id: "item-4",
    question: "Combien de temps dure une séance de massage ou de soin ?",
    answer:
      "La durée dépend de la prestation choisie, entre 30 minutes et 2 heures.",
  },
  {
    id: "item-5",
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Nous acceptons les cartes bancaires, espèces et paiements en ligne.",
  },
];

export const massageServices = [
  {
    imageUrl: "/massage-cou.jpg",
    name: "Massage Intuitif",
    description: "Un massage personnalisé pour répondre à vos besoins uniques.",
    duration: "60 min",
    price: "75€",
  },
  {
    imageUrl: "/massage-head.jpg",
    name: "Head & Shoulders",
    description: "Détendez vos épaules et votre tête avec ce massage ciblé.",
    duration: "30 min",
    price: "40€",
  },
  {
    imageUrl: "/foot-massage.jpg",
    name: "Foot Massage",
    description:
      "Soulagez la fatigue et détendez vos pieds avec ce soin apaisant.",
    duration: "30 min",
    price: "35€",
  },
  {
    imageUrl: "/massage-1.jpg",
    name: "Massage Relax",
    description: "Un massage doux et apaisant pour une relaxation totale.",
    duration: "1h",
    price: "65€",
  },
  {
    imageUrl: "/massage-pierre-1.jpg",
    name: "Pierres Chaudes 45mn",
    description: "Un massage aux pierres chaudes pour détendre vos muscles.",
    duration: "45 min",
    price: "70€",
  },
  {
    imageUrl: "/massage-pierre-2.png",
    name: "Pierres Chaudes 1h30",
    description:
      "Une expérience prolongée de relaxation avec les pierres chaudes.",
    duration: "1h30",
    price: "120€",
  },
  {
    imageUrl: "/massage-sel.jpg",
    name: "Massage Escale Energy",
    description:
      "Un massage revitalisant pour redonner de l'énergie à votre corps.",
    duration: "1h",
    price: "80€",
  },
  {
    imageUrl: "/massage-dos.jpg",
    name: "Massage Relaxant Domicile",
    description:
      "Profitez d'un massage relaxant chez vous, dans le confort de votre maison.",
    duration: "1h",
    price: "90€",
  },
];

export const soinsServices = {
  women: [
    {
      imageUrl: "/massage-cou.jpg",
      name: "Évasion Féminine",
      description:
        "Jacuzzi, massage relaxant et gommage pour un moment de douceur.",
      duration: "60 min",
      price: "120€",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Rituel Visage Féminin",
      description:
        "Jacuzzi, massage relaxant et soin du visage pour une beauté sublimée.",
      duration: "90 min",
      price: "170€",
    },
  ],
  men: [
    {
      imageUrl: "/massage-cou.jpg",
      name: "Détente Masculine",
      description:
        "Jacuzzi, massage énergisant et gommage pour une relaxation complète.",
      duration: "90 min",
      price: "150€",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Rituel Pieds Masculin",
      description:
        "Jacuzzi, massage relaxant et soin des pieds pour un bien-être absolu.",
      duration: "90 min",
      price: "170€",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Épilation Sourcils",
      description: "Soin rapide et efficace pour l'épilation des sourcils.",
      duration: "15 min",
      price: "35€",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Khobido Homme",
      description:
        "Massage facial japonais pour revitaliser et lisser les traits.",
      duration: "30 min",
      price: "60€",
    },
  ],
};

export const forfaitSeances = {
  fiveSessions: [
    {
      imageUrl: "/massage-cou.jpg",
      name: "Massage Pierres Chaudes",
      description:
        "Un massage relaxant avec des lissages et pressions ciblées pour améliorer la circulation sanguine et apaiser les tensions.",
      duration: "45 min",
      price: "450€",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Circulation Énergétique",
      description:
        "Un massage revitalisant des bras et jambes pour stimuler la circulation énergétique. Idéal pour retrouver légèreté et énergie.",
      duration: "30 min",
      price: "190€",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Massage Intuitif Therapy",
      description:
        "Un massage ciblant les cervicales, guidé par notre spécialiste, pour une relaxation profonde et un soulagement des tensions.",
      duration: "1h",
      price: "450€",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Foot Massage",
      description:
        "Un massage des pieds apprécié pour relancer la circulation sanguine et éliminer les toxines du corps. Une véritable cure de bien-être.",
      duration: "30 min",
      price: "180€",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Massage Relaxant",
      description:
        "Profitez d’un massage aux huiles essentielles parfumées naturelles, reconnues pour leurs vertus apaisantes.",
      duration: "60 min",
      price: "375€",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Massage Dos Cervicales",
      description:
        "Le massage Tui Na, idéal pour soulager les douleurs de dos et détendre les tensions musculaires.",
      duration: "30 min",
      price: "220€",
    },
  ],
  tenSessions: [
    {
      imageUrl: "/massage-cou.jpg",
      name: "Massage Relaxant",
      description:
        "10 séances de massage relaxant avec baume et huiles essentielles pour un bien-être prolongé.",
      duration: "60 min",
      price: "700€",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Cure Dos Cervicales",
      description:
        "Un massage ciblé combinant pressions shiatsu et techniques Tui Na, parfait pour soulager les douleurs dorsales.",
      duration: "30 min",
      price: "420€",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Neck and Shoulders Soft Foot",
      description:
        "Un massage combiné des cervicales, dos, et jambes pour une relaxation complète et une meilleure circulation.",
      duration: "30 min",
      price: "450€",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Massage Jambes Lourdes",
      description:
        "Un massage drainant spécialement conçu pour soulager les jambes lourdes et améliorer la circulation.",
      duration: "30 min",
      price: "390€",
    },
  ],
};

export const carouselImages = [
  { img: "/lounge-1.jpg", alt: "zen lounge appartement" },
  { img: "/lounge-2.jpg", alt: "zen lounge appartement" },
  { img: "/lounge-3.jpg", alt: "zen lounge appartement" },
  { img: "/lounge-4.jpg", alt: "zen lounge appartement" },
  { img: "/piscine.jpeg", alt: "zen lounge piscine" },
];

export const roomData = {
  description: [
    "Découvrez notre Serenity Suite, un appartement cosy conçue pour allier confort, élégance et détente. Nichée dans un cadre apaisant, cette offre une atmosphère chaleureuse et intimiste, idéale pour vous ressourcer. Profitez d'une décoration soignée, d'un lit d'un confort exceptionnel, et d'un accès direct à des équipements modernes.",
    "Pour votre bien-être, nous mettons à votre disposition un jacuzzi privé et une piscine extérieure pour des moments de relaxation inoubliables. Vous avez également la possibilité de réserver un délicieux brunch ou repas préparé avec des ingrédients frais et locaux. Que vous veniez seul ou accompagné, la Serenity Suite est l'endroit parfait pour vivre une expérience unique.",
  ],
  amenities: [
    {
      icon: <PiWifiHighLight />,
      title: "Wi-Fi Haut Débit",
      description:
        "Restez connecté avec notre connexion Wi-Fi gratuite et rapide, disponible dans toute la suite.",
    },
    {
      icon: <PiBathtubLight />,
      title: "Jacuzzi Privé",
      description:
        "Un jacuzzi chauffé pour des moments de relaxation en toute intimité.",
    },
    {
      icon: <PiSwimmingPoolLight />,
      title: "Piscine",
      description:
        "Accédez à une piscine extérieure pour un moment de fraîcheur et de détente.",
    },
    {
      icon: <PiHamburgerLight />,
      title: "Brunch ou Repas",
      description:
        "Savourez un délicieux brunch ou un repas complet préparé avec des ingrédients frais.",
    },
  ],
  houseRules: [
    "Le check-in s'effectue à partir de 12h.",
    "Le départ doit être effectué avant 12h le lendemain.",
    "Les animaux de compagnie ne sont pas autorisés.",
    "Il est interdit de fumer à l'intérieur de la suite.",
    "Respectez la tranquillité des lieux après 22h.",
  ],
};

export const roomDetails = [
  { icon: <PiRulerLight />, value: "50m²" },
  { icon: <PiUserCheckLight />, value: "2 Personnes" },
  { icon: <PiBedLight />, value: "1 Lit + 1 Canapé" },
  { icon: <PiShower />, value: "1 Salle de Bain" },
];
