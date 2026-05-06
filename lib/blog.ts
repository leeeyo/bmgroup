export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  content: string[];
};

export const siteUrl = "https://bmgroup.ma";

export const blogArticles: BlogArticle[] = [
  {
    slug: "rendez-vous-bm-group",
    title: "Rendez-vous BM Group: une parole régulière sur nos métiers",
    excerpt:
      "BM Group développe une présence éditoriale pour expliquer ses métiers: coulisses, décisions et exigences du groupe.",
    eyebrow: "Actualité groupe",
    image: "/blog/blog-1.jpg",
    imageAlt: "Rendez-vous BM Group avec le directeur général Oussama Braham",
    publishedAt: "2026-05-02",
    readingTime: "3 min",
    category: "Groupe",
    content: [
      "BM Group construit progressivement une présence éditoriale pensée pour expliquer ses métiers avec simplicité. Le rendez-vous hebdomadaire devient un espace de parole pour présenter les coulisses, les décisions et les exigences qui structurent le groupe.",
      "L'objectif est de rendre visibles les choix qui font la différence: sélection des matériaux, coordination des équipes, respect des délais et vision patrimoniale des projets.",
      "Ce format permettra de créer un lien direct avec les clients, partenaires et investisseurs qui souhaitent mieux comprendre la méthode BM Group.",
    ],
  },
  {
    slug: "culture-projet-equipes",
    title: "La culture projet au coeur des équipes BM Group",
    excerpt:
      "Une logique intégrée entre les métiers pour aligner intention, faisabilité et résultat, du concept à la livraison.",
    eyebrow: "Méthode",
    image: "/blog/blog-2.png",
    imageAlt: "Equipe BM Group réunie autour de maquettes de projets",
    publishedAt: "2026-04-24",
    readingTime: "4 min",
    category: "Équipe",
    content: [
      "Chaque projet gagne en qualité lorsque les métiers dialoguent tôt. Chez BM Group, les équipes travaillent avec une logique intégrée pour aligner l'intention, la faisabilité et le résultat final.",
      "Les maquettes, plans, échantillons et réunions de coordination ne sont pas de simples étapes: ce sont des outils de décision qui réduisent les imprévus et améliorent l'expérience client.",
      "Cette culture projet permet de passer d'une idée à un espace livré avec plus de fluidité, de précision et de responsabilité.",
    ],
  },
  {
    slug: "nouvelle-adresse-a-valoriser",
    title: "Ouvrir une adresse, c'est créer une valeur durable",
    excerpt:
      "Au-delà de l'emplacement, une adresse réussie repose sur l'exécution, l'architecture et les usages quotidiens.",
    eyebrow: "Immobilier",
    image: "/blog/blog-3.png",
    imageAlt: "Inauguration d'une nouvelle adresse avec ruban rouge",
    publishedAt: "2026-04-12",
    readingTime: "3 min",
    category: "Développement",
    content: [
      "Dans l'immobilier, une adresse réussie ne se résume pas à son emplacement. Elle dépend de la qualité d'exécution, de la cohérence architecturale et de la manière dont elle répond aux usages quotidiens.",
      "BM Group aborde chaque ouverture comme un moment stratégique: le projet quitte le chantier pour devenir un lieu vivant, identifiable et porteur de valeur.",
      "Cette vision relie les trois pôles du groupe: concevoir avec justesse, bâtir avec maîtrise et valoriser avec une perspective durable.",
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}
