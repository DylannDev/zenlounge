import {
  PiBed,
  PiCalendarCheck,
  PiCheckSquare,
  PiCurrencyEur,
  PiDrop,
  PiFlowerLotus,
  PiGift,
  PiSealPercent,
  PiSparkle,
  PiTimer,
  PiUsers,
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
