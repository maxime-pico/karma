const KARMA_LABELS = [
  { value: -2, slug: 'vb', label: { fr: 'Très Mauvais Karma' } },
  { value: -1, slug: 'b', label: { fr: 'Plutôt Mauvais Karma' } },
  { value: 0, slug: 'n', label: { fr: 'Karma Neutre' } },
  { value: 1, slug: 'g', label: { fr: 'Plutôt Bon Karma' } },
  { value: 2, slug: 'vg', label: { fr: 'Très bon Karma' } },
];

const BRANDS_SORTING_LABELS = [
  { name: { fr: 'Ordre alphabétique (A > Z)' }, value: 'name_ASC' },
  { name: { fr: 'Ordre alphabétique (Z > A)' }, value: 'name_DESC' },
  { name: { fr: 'Karma (plus mauvais au meilleur)' }, value: 'karma_ASC' },
  { name: { fr: 'Karma (meilleur au plus mauvais)' }, value: 'karma_DESC' }
];

const BRANDS_RESULTS_MESSAGE = {
  no_results: { fr: 'Aucune marque ne correspond aux critères de recherche' },
  main_results: { fr: 'Les marques déjà sur Karma Panda :' }
}

const BRANDS_STATIC_CONTENTS = {
  filters_categories_title: { fr: 'Catégories :' },
  filters_karmas_title: { fr: 'Catégories :' },
  sorting_title: { fr: 'Trier par :' },
  search_input_placeholder: { fr: 'Rechercher une marque' }
}

module.exports = {
  KARMA_LABELS,
  BRANDS_SORTING_LABELS,
  BRANDS_RESULTS_MESSAGE,
  BRANDS_STATIC_CONTENTS
};
