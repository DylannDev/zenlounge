import {
  PiBathtubLight,
  PiBed,
  PiBedLight,
  PiCalendarCheck,
  PiCheckSquare,
  PiCurrencyEur,
  PiDrop,
  PiFlowerLotus,
  PiGift,
  PiHamburgerLight,
  PiRulerLight,
  PiSealPercent,
  PiShower,
  PiSignOut,
  PiSparkle,
  PiTimer,
  PiUserCheckLight,
  PiUserCircle,
  PiUsers,
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
  { href: "forfaits", label: "Forfaits" },
  { href: "sejours", label: "Séjours" },
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
    imageUrl: "/lounge-1.jpg",
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
    duration: 60,
    price: 75,
    slug: "massage-intuitif",
  },
  {
    imageUrl: "/massage-head.jpg",
    name: "Head & Shoulders",
    description: "Détendez vos épaules et votre tête avec ce massage ciblé.",
    duration: 30,
    price: 40,
    slug: "head-shoulders",
  },
  {
    imageUrl: "/foot-massage.jpg",
    name: "Foot Massage",
    description:
      "Soulagez la fatigue et détendez vos pieds avec ce soin apaisant.",
    duration: 30,
    price: 35,
    slug: "foot-massage",
  },
  {
    imageUrl: "/massage-1.jpg",
    name: "Massage Relax",
    description: "Un massage doux et apaisant pour une relaxation totale.",
    duration: 60,
    price: 65,
    slug: "massage-relax",
  },
  {
    imageUrl: "/massage-pierre-1.jpg",
    name: "Pierres Chaudes 45mn",
    description: "Un massage aux pierres chaudes pour détendre vos muscles.",
    duration: 45,
    price: 70,
    slug: "pierres-chaudes-45mn",
  },
  {
    imageUrl: "/massage-pierre-2.png",
    name: "Pierres Chaudes 1h30",
    description:
      "Une expérience prolongée de relaxation avec les pierres chaudes.",
    duration: 90,
    price: 120,
    slug: "pierres-chaudes-1h30",
  },
  {
    imageUrl: "/massage-sel.jpg",
    name: "Massage Escale Energy",
    description:
      "Un massage revitalisant pour redonner de l'énergie à votre corps.",
    duration: 60,
    price: 80,
    slug: "massage-escale-energy",
  },
  {
    imageUrl: "/massage-dos.jpg",
    name: "Massage Relaxant Domicile",
    description:
      "Profitez d'un massage relaxant chez vous, dans le confort de votre maison.",
    duration: 60,
    price: 90,
    slug: "massage-relaxant-domicile",
  },
];

export const soinsServices = {
  women: [
    {
      imageUrl: "/massage-cou.jpg",
      name: "Évasion Féminine",
      description:
        "Jacuzzi, massage relaxant et gommage pour un moment de douceur.",
      duration: 60,
      price: 120,
      slug: "evasion-feminine",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Rituel Visage Féminin",
      description:
        "Jacuzzi, massage relaxant et soin du visage pour une beauté sublimée.",
      duration: 90,
      price: 170,
      slug: "rituel-visage-feminin",
    },
  ],
  men: [
    {
      imageUrl: "/massage-cou.jpg",
      name: "Détente Masculine",
      description:
        "Jacuzzi, massage énergisant et gommage pour une relaxation complète.",
      duration: 90,
      price: 150,
      slug: "detente-masculine",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Rituel Pieds Masculin",
      description:
        "Jacuzzi, massage relaxant et soin des pieds pour un bien-être absolu.",
      duration: 90,
      price: 170,
      slug: "rituel-pieds-masculin",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Épilation Sourcils",
      description: "Soin rapide et efficace pour l'épilation des sourcils.",
      duration: 15,
      price: 35,
      slug: "epilation-sourcils",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Khobido Homme",
      description:
        "Massage facial japonais pour revitaliser et lisser les traits.",
      duration: 30,
      price: 60,
      slug: "khobido-homme",
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
      duration: 45,
      price: 450,
      slug: "forfait-massage-pierres-chaudes",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Circulation Énergétique",
      description:
        "Un massage revitalisant des bras et jambes pour stimuler la circulation énergétique. Idéal pour retrouver légèreté et énergie.",
      duration: 30,
      price: 190,
      slug: "forfait-circulation-energetique",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Massage Intuitif Therapy",
      description:
        "Un massage ciblant les cervicales, guidé par notre spécialiste, pour une relaxation profonde et un soulagement des tensions.",
      duration: 60,
      price: 450,
      slug: "forfait-massage-intuitif-therapy",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Foot Massage",
      description:
        "Un massage des pieds apprécié pour relancer la circulation sanguine et éliminer les toxines du corps. Une véritable cure de bien-être.",
      duration: 30,
      price: 180,
      slug: "forfait-foot-massage",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Massage Relaxant",
      description:
        "Profitez d’un massage aux huiles essentielles parfumées naturelles, reconnues pour leurs vertus apaisantes.",
      duration: 60,
      price: 375,
      slug: "forfait-massage-relaxant",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Massage Dos Cervicales",
      description:
        "Le massage Tui Na, idéal pour soulager les douleurs de dos et détendre les tensions musculaires.",
      duration: 30,
      price: 220,
      slug: "forfait-massage-dos-cervicales",
    },
  ],
  tenSessions: [
    {
      imageUrl: "/massage-cou.jpg",
      name: "Massage Relaxant",
      description:
        "10 séances de massage relaxant avec baume et huiles essentielles pour un bien-être prolongé.",
      duration: 60,
      price: 700,
      slug: "forfait-10-massage-relaxant",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Cure Dos Cervicales",
      description:
        "Un massage ciblé combinant pressions shiatsu et techniques Tui Na, parfait pour soulager les douleurs dorsales.",
      duration: 30,
      price: 420,
      slug: "forfait-10-cure-dos-cervicales",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Neck and Shoulders Soft Foot",
      description:
        "Un massage combiné des cervicales, dos, et jambes pour une relaxation complète et une meilleure circulation.",
      duration: 30,
      price: 450,
      slug: "forfait-10-neck-shoulders-soft-foot",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Massage Jambes Lourdes",
      description:
        "Un massage drainant spécialement conçu pour soulager les jambes lourdes et améliorer la circulation.",
      duration: 30,
      price: 390,
      slug: "forfait-10-massage-jambes-lourdes",
    },
  ],
};

export const carouselImages = [
  { img: "/lounge-1.jpg", alt: "zen lounge appartement" },
  { img: "/lounge-2.jpg", alt: "zen lounge appartement" },
  { img: "/lounge-3.jpg", alt: "zen lounge appartement" },
  { img: "/lounge-4.jpg", alt: "zen lounge appartement" },
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
    // {
    //   icon: <PiSwimmingPoolLight />,
    //   title: "Piscine",
    //   description:
    //     "Accédez à une piscine extérieure pour un moment de fraîcheur et de détente.",
    // },
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

export const loggedInLinks = [
  {
    label: "Profil",
    href: "/profil",
    icon: <PiUserCircle />,
  },
  {
    label: "Prestations",
    href: "/prestations",
    icon: <PiFlowerLotus />,
  },
  {
    label: "Déconnexion",
    icon: <PiSignOut />,
  },
];
