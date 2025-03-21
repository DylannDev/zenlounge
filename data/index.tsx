import {
  PiBathtubLight,
  PiBed,
  PiBedLight,
  PiCalendarCheck,
  PiCheckSquare,
  PiWallet,
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
  PiSparkleLight,
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
  { href: "location", label: "Location" },
];

export const socialLinks = [
  {
    platform: "Whatsapp",
    href: "https://wa.me/594694003935",
    icon: <RiWhatsappFill />,
  },
  {
    platform: "Instagram",
    href: "https://instagram.com/zenlounge",
    icon: <RiInstagramFill />,
  },
  {
    platform: "Facebook",
    href: "https://www.facebook.com/odassenergyzen",
    icon: <RiFacebookCircleFill />,
  },
];

export const categories = [
  {
    title: "Massages",
    description:
      "Découvrez nos massages sur-mesure, conçus pour vous offrir un moment de relaxation absolue. Profitez de soins adaptés à vos besoins, des massages de la tête aux pieds, pour un bien-être total et une détente profonde.",
    imageUrl: "/massage-2.jpg",
    keyInfo: [
      { icon: <PiWallet />, text: "De 35€ à 120€" },
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
    link: "/massages",
    reverse: false,
  },
  {
    title: "Soins du Corps et Visage",
    description:
      "Offrez à votre peau un éclat renouvelé grâce à nos soins experts. Profitez de gommages exfoliants, d'enveloppements nourrissants et de soins hydratants intensifs, spécialement conçus pour révéler la beauté naturelle de votre peau.",
    imageUrl: "/soins-visage.jpg",
    keyInfo: [
      { icon: <PiWallet />, text: "De 35€ à 170€" },
      { icon: <PiTimer />, text: "15 min à 90 min" },
      {
        icon: <PiDrop />,
        text: "Produits utilisés : Huiles naturelles, gommages bio",
      },
      {
        icon: <PiSparkle />,
        text: "Bienfaits : Hydratation intense, peau éclatante",
      },
    ],
    link: "/soins",
    reverse: true,
  },
  {
    title: "Forfaits",
    description:
      "Offrez-vous des forfaits bien-être de 5 ou 10 séances à tarifs dégressifs ! Profitez de massages relaxants à prix avantageux et prenez soin de vous toute l'année.",
    imageUrl: "/massage-dos.jpg",
    keyInfo: [
      { icon: <PiWallet />, text: "De 180€ à 700€" },
      {
        icon: <PiCheckSquare />,
        text: "Options : Forfaits 5 ou 10 séances",
      },
      {
        icon: <PiSealPercent />,
        text: "Économies : Jusqu'à 20% sur les tarifs unitaires",
      },
      {
        icon: <PiGift />,
        text: "Idéal pour : Couples ou en solo",
      },
    ],
    link: "/forfaits",
    reverse: false,
  },
  {
    title: "Séjours Détente - Location",
    description:
      "Offrez-vous une parenthèse hors du temps avec nos séjours détente en Guyane. Entre relaxation absolue, soins bien-être et moments d’évasion, profitez d’un cadre intimiste avec jaccuzi, pour un ressourcement total.",
    imageUrl: "/lounge-1.jpg",
    keyInfo: [
      { icon: <PiWallet />, text: "À partir de 120€" },
      {
        icon: <PiSparkle />,
        text: "Extras : Massage, Massage duo, Brunch",
      },
      { icon: <PiCalendarCheck />, text: "Durée : À partir d'une nuit" },
      {
        icon: <PiUsers />,
        text: "Idéal pour : Solo, couple ou cadeau bien-être",
      },
    ],
    link: "/location",
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
    question: "Puis-je verser un acompte lors de la réservation ?",
    answer:
      "Non, vous devez régler la totalité du prix de la prestation lors de votre réservation.",
  },
  {
    id: "item-3",
    question: "Est-ce que je peux annuler ma réservation ?",
    answer:
      "Oui, vous pouvez annuler votre réservation 48h maximum avant la prestation, sur votre espace personnel.",
  },
  {
    id: "item-4",
    question: "Combien de temps dure une séance de massage ou de soin ?",
    answer: "La durée dépend de la prestation choisie, entre 30 et 90 minutes.",
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
    description:
      "Chaque corps est unique, ce massage s’adapte à vos besoins. Mélange de techniques variées, il cible les zones de tension pour un relâchement total et une détente profonde.",
    duration: 60,
    price: 75,
    slug: "massage-intuitif",
  },
  {
    imageUrl: "/massage-head.jpg",
    name: "Head & Shoulders",
    description:
      "Libérez votre tête et vos épaules des tensions accumulées. Ce massage profond et ciblé apaise les migraines, soulage les raideurs cervicales et procure un bien-être immédiat.",
    duration: 30,
    price: 40,
    slug: "head-shoulders",
  },
  {
    imageUrl: "/foot-massage.jpg",
    name: "Foot Massage",
    description:
      "Accordez à vos pieds le soin qu’ils méritent avec ce massage relaxant. Il stimule la circulation, soulage les tensions et procure une sensation immédiate de légèreté et de bien-être général.",
    duration: 30,
    price: 35,
    slug: "foot-massage",
  },
  {
    imageUrl: "/massage-1.jpg",
    name: "Massage Relax",
    description:
      "Délassez-vous avec ce massage doux et enveloppant, conçu pour évacuer le stress et relâcher les tensions. Parfait pour une pause bien-être, il procure une profonde sensation de sérénité et de relâchement.",
    duration: 60,
    price: 65,
    slug: "massage-relax",
  },
  {
    imageUrl: "/massage-pierre-1.jpg",
    name: "Pierres Chaudes 45mn",
    description:
      "Plongez dans une relaxation intense avec le massage aux pierres chaudes. Ce massage apaise les tensions musculaires, stimule la circulation et rééquilibre l’énergie du corps pour une sensation de bien-être total.",
    duration: 45,
    price: 70,
    slug: "pierres-chaudes-45mn",
  },
  {
    imageUrl: "/massage-pierre-2.png",
    name: "Pierres Chaudes 1h30",
    description:
      "Une expérience prolongée de relaxation avec les pierres chaudes. Ce massage apaise les tensions musculaires, stimule la circulation et rééquilibre l’énergie du corps pour une sensation de bien-être total.",
    duration: 90,
    price: 120,
    slug: "pierres-chaudes-1h30",
  },
  {
    imageUrl: "/massage-sel.jpg",
    name: "Massage Escale Energy",
    description:
      "Rechargez votre corps et votre esprit avec ce massage énergisant. Grâce à des mouvements dynamiques et profonds, il stimule la circulation, libère les tensions et booste votre vitalité pour une sensation de légèreté et d’équilibre.",
    duration: 60,
    price: 80,
    slug: "massage-escale-energy",
  },
  {
    imageUrl: "/massage-dos.jpg",
    name: "Massage Relaxant Domicile",
    description:
      "Offrez-vous un moment de détente sans bouger de chez vous. Ce massage aux gestes lents et enveloppants soulage le stress, apaise le corps et vous plonge dans une relaxation profonde, directement dans votre cocon.",
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
        "Offrez à votre peau un véritable rituel de bien-être. Ce soin complet associe exfoliation, hydratation et modelage pour une peau douce, lumineuse et revitalisée. Un instant de détente absolue rien que pour vous.",
      duration: 60,
      price: 120,
      slug: "evasion-feminine",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Rituel Visage Féminin",
      description:
        "Redonnez à votre peau toute sa vitalité avec ce soin du visage sur-mesure. Gommage, masque nourrissant et modelage relaxant subliment votre teint et procurent une sensation de fraîcheur et de douceur incomparables.",
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
        "Pensé pour la peau des hommes, ce soin purifie, hydrate et apaise en profondeur. Un rituel idéal pour un teint éclatant et une sensation immédiate de fraîcheur et de confort.",
      duration: 90,
      price: 150,
      slug: "detente-masculine",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Rituel Pieds Masculin",
      description:
        "Prenez soin de vos pieds avec ce soin réparateur. Exfoliation, massage et hydratation intense apaisent les tensions et redonnent douceur et légèreté à vos pieds fatigués.",
      duration: 90,
      price: 170,
      slug: "rituel-pieds-masculin",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Épilation Sourcils",
      description:
        "Redéfinissez votre regard avec une épilation des sourcils soignée et précise. Une mise en forme adaptée à votre visage pour un regard structuré et sublimé.",
      duration: 15,
      price: 35,
      slug: "epilation-sourcils",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Khobido Homme",
      description:
        "Ce massage facial ancestral stimule la circulation, raffermit la peau et redonne éclat et tonicité au visage. Un soin anti-âge naturel pour une peau visiblement plus lisse et reposée.",
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
        "Plongez dans une détente absolue grâce à la chaleur réconfortante des pierres volcaniques. Ce massage apaise les tensions musculaires, stimule la circulation et rééquilibre l’énergie du corps pour une sensation de bien-être total.",
      duration: 45,
      price: 450,
      slug: "massage-pierres-chaudes-forfait-5",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Circulation Énergétique",
      description:
        "Rechargez votre corps et votre esprit avec ce massage énergisant. Grâce à des mouvements dynamiques et profonds, il stimule la circulation, libère les tensions et booste votre vitalité pour une sensation de légèreté et d’équilibre.",
      duration: 30,
      price: 190,
      slug: "circulation-energetique-forfait-5",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Massage Intuitif Therapy",
      description:
        "Chaque corps est unique, ce massage s’adapte à vos besoins. Mélange de techniques variées, il cible les zones de tension pour un relâchement total et une détente profonde.",
      duration: 60,
      price: 450,
      slug: "massage-intuitif-therapy-forfait-5",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Foot Massage",
      description:
        "Accordez à vos pieds le soin qu’ils méritent avec ce massage relaxant. Il stimule la circulation, soulage les tensions et procure une sensation immédiate de légèreté et de bien-être général.",
      duration: 30,
      price: 180,
      slug: "foot-massage-forfait-5",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Massage Relaxant",
      description:
        "Délassez-vous avec ce massage doux et enveloppant, conçu pour évacuer le stress et relâcher les tensions. Parfait pour une pause bien-être, il procure une profonde sensation de sérénité et de relâchement.",
      duration: 60,
      price: 375,
      slug: "massage-relaxant-forfait-5",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Massage Dos Cervicales",
      description:
        "Soulagez les tensions accumulées dans le haut du dos et la nuque avec ce massage ciblé. Grâce à des pressions profondes et des gestes précis, il libère les muscles noués et procure un soulagement immédiat.",
      duration: 30,
      price: 220,
      slug: "massage-dos-cervicales-forfait-5",
    },
  ],
  tenSessions: [
    {
      imageUrl: "/massage-cou.jpg",
      name: "Massage Relaxant",
      description:
        "Offrez-vous un moment de sérénité avec ce massage enveloppant aux mouvements fluides et doux. Idéal pour réduire le stress et retrouver un état de relaxation profonde.",
      duration: 60,
      price: 700,
      slug: "massage-relaxant-forfait-10",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Cure Dos Cervicales",
      description:
        "Une approche en plusieurs séances pour éliminer durablement les tensions du dos et des cervicales. Idéal pour ceux qui souffrent de douleurs chroniques et souhaitent retrouver une posture plus équilibrée.",
      duration: 30,
      price: 420,
      slug: "cure-dos-cervicales-forfait-10",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Neck and Shoulders Soft Foot",
      description:
        "Un soin relaxant combinant un massage du cou, des épaules et des pieds pour libérer les tensions tout en procurant une sensation de légèreté. Une expérience idéale après une longue journée.",
      duration: 30,
      price: 450,
      slug: "neck-shoulders-soft-foot-forfait-10",
    },
    {
      imageUrl: "/massage-cou.jpg",
      name: "Massage Jambes Lourdes",
      description:
        "Apaisez la sensation de jambes lourdes avec ce massage drainant. Grâce à des mouvements spécifiques, il stimule la circulation sanguine, réduit la rétention d’eau et redonne tonicité et légèreté à vos jambes.",
      duration: 30,
      price: 390,
      slug: "massage-jambes-lourdes-forfait-10",
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
    "Offrez-vous une pause hors du temps dans la Serenity Suite, un appartement cosy et élégant conçu pour une expérience de détente absolue. Niché dans un cadre paisible et raffiné, ce havre de sérénité est l’endroit idéal pour vous ressourcer, que vous soyez seul ou accompagné.",
    "Pour votre bien-être, nous mettons à votre disposition un jacuzzi privé pour des moments de relaxation inoubliables. Vous avez également la possibilité de réserver un délicieux brunch ou repas préparé avec des ingrédients frais et locaux. Que vous veniez seul ou accompagné, la Serenity Suite est l'endroit parfait pour vivre une expérience unique.",
  ],
  amenities: [
    {
      icon: <PiWifiHighLight />,
      title: "Wi-Fi Haut Débit",
      description:
        "Restez connecté avec notre connexion Wi-Fi gratuite et rapide",
    },
    {
      icon: <PiBathtubLight />,
      title: "Jacuzzi Privé",
      description:
        "Un jacuzzi chauffé pour des moments de relaxation en toute intimité.",
    },
    {
      icon: <PiSparkleLight />,
      title: "Massages solo ou duo",
      description:
        "Entrez dans une relaxation profonde le temps d’un massage en solo ou en duo.",
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

export const profileInformations = [
  {
    id: 1,
    text: "Les forfaits sont valables pour une durée maximale de 3 mois à compter de la date d'achat.",
  },
  {
    id: 2,
    text: "Vous pouvez annuler jusqu'à 2 jours avant votre séance sur votre espace personnel. La veille et le jour du rendez-vous, l'annulation n'est plus possible.",
  },
  {
    id: 3,
    text: "Une annulation ne donne pas droit à un remboursement, mais un crédit vous sera attribué pour reprogrammer une nouvelle séance.",
  },
];
