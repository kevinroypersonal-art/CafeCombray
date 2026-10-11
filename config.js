/*
 * ─────────────────────────────────────────────────────────────
 *  COMBRAY — Contenus modifiables
 * ─────────────────────────────────────────────────────────────
 *  Ce fichier est le seul à modifier pour mettre à jour :
 *  la date d'ouverture, les horaires, la carte, Instagram, l'e-mail.
 *
 *  Règles simples :
 *   - Garder les guillemets "…" autour du texte.
 *   - Laisser une virgule à la fin de chaque ligne d'une liste.
 *   - Une valeur vide ("" ou []) masque l'élément correspondant sur la page.
 * ─────────────────────────────────────────────────────────────
 */
window.COMBRAY = {
  // Date d'ouverture (AAAA-MM-JJ). Avant cette date, la page affiche
  // « Ouverture le 13 octobre 2026 », puis « Ouvert » automatiquement.
  openingDate: "2026-10-13",

  // Compte Instagram, sans le @ (ex. "combray.paris"). Vide = boutons masqués.
  instagram: "",

  // E-mail de contact. Vide = masqué.
  email: "",

  // Téléphone (facultatif), ex. "01 23 45 67 89". Vide = masqué.
  phone: "",

  // Horaires. Un jour absent de la liste = fermé.
  // Jours : "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche".
  // Format des heures : "08:00". Liste vide = « Horaires communiqués très prochainement ».
  hours: [
    // { days: ["lundi", "mardi", "mercredi", "jeudi", "vendredi"], open: "08:00", close: "19:00" },
    // { days: ["samedi"], open: "09:00", close: "19:00" },
  ],

  // Carte : rubriques, produits et prix (en euros).
  //  - colonne : 1 (gauche) ou 2 (droite) sur ordinateur
  //  - sousTitre et description sont facultatifs
  // Liste vide = « La carte sera dévoilée à l'ouverture ».
  menu: [
    {
      title: "Cafés & spécialités",
      sousTitre: "Arabica Yellow Bourbon du Brésil",
      colonne: 1,
      items: [
        { name: "Espresso / Allongé", price: "2,50" },
        { name: "Double Espresso", price: "3,20" },
        { name: "Cappuccino", price: "4,50", description: "Espresso, lait et mousse onctueuse" },
        { name: "Latte", price: "4,80", description: "Espresso, lait et fine mousse de lait" },
        { name: "Flat White", price: "4,80", description: "Double espresso et fine couche de lait" },
        { name: "Mocha", price: "5,20", description: "Espresso, chocolat et mousse de lait" },
        { name: "Pumpkin Spice Latte", price: "5,40", description: "Espresso, lait et sirop de citrouille épicée" },
        { name: "Cinnamon Latte", price: "5,40", description: "Espresso, lait et sirop de cannelle" },
      ],
    },
    {
      title: "Thés",
      colonne: 1,
      items: [
        { name: "Earl Grey Impérial", price: "3,80", description: "Thé noir à la bergamote" },
        { name: "Thé à la menthe", price: "3,80" },
        { name: "Jardin de Combray", price: "3,80", description: "Mélange aux fleurs" },
      ],
    },
    {
      title: "Espace Matcha",
      sousTitre: "Matcha premium Okumidori de Kagoshima",
      colonne: 2,
      items: [
        { name: "Matcha Latte", price: "6,00", description: "Matcha et lait mousseux" },
        { name: "Iced Matcha Vanille", price: "6,30", description: "Matcha glacé à la vanille" },
        { name: "Usucha", price: "5,70", description: "Matcha traditionnel fouetté à l'eau" },
      ],
    },
    {
      title: "Pâtisseries & Granola",
      colonne: 2,
      items: [
        { name: "Madeleines Combray", price: "2,90" },
        { name: "Cinnamon Roll", price: "4,50" },
        { name: "Cake à la pistache", price: "4,50" },
        { name: "Granola Bowl", price: "6,50", description: "Granola, noix et fruits de saison" },
      ],
    },
    {
      title: "Formules gourmandes",
      colonne: 2,
      items: [
        { name: "Formule Proustienne", price: "6,50", description: "1 boisson au choix + 1 madeleine Combray" },
        { name: "Formule Balzac", price: "8,50", description: "1 boisson au choix + 1 pâtisserie" },
        { name: "Formule Zola", price: "9,90", description: "1 boisson au choix + 1 granola bowl" },
      ],
    },
  ],

  // Mentions en bas de la carte. La première ligne est en gras.
  menuNotes: [
    "Lait d'avoine sans supplément",
    "Sirop vanille, noisette ou caramel + 0,60 € · Shot d'espresso supplémentaire + 0,70 €",
  ],
};
