const KARMA_LABELS = {
	vb: { value: -2, slug: 'vb', label: { fr: 'Très Mauvais Karma' } },
	b: { value: -1, slug: 'b', label: { fr: 'Plutôt Mauvais Karma' } },
	n: { value: 0, slug: 'n', label: { fr: 'Karma Neutre' } },
	g: { value: 1, slug: 'g', label: { fr: 'Plutôt Bon Karma' } },
	vg: { value: 2, slug: 'vg', label: { fr: 'Très bon Karma' } },
}

const BRANDS_SORTING_LABELS = [
	{ name: { fr: 'Ordre alphabétique (A > Z)' }, value: '{"name":"asc"}' },
	{ name: { fr: 'Ordre alphabétique (Z > A)' }, value: '{"name":"desc"}' },
	{
		name: { fr: 'Karma (plus mauvais au meilleur)' },
		value: '{"karma":"asc"}',
	},
	{
		name: { fr: 'Karma (meilleur au plus mauvais)' },
		value: '{"karma":"desc"}',
	},
]

const BRANDS_RESULTS_MESSAGES = {
	no_results: { fr: 'Aucune marque ne correspond aux critères de recherche' },
	main_results: { fr: 'Les marques déjà sur Karma Panda :' },
}

const BRANDS_STATIC_CONTENTS = {
	title: { fr: 'Trouver une marque' },
	filters_categories_title: { fr: 'Par catégories :' },
	filters_karmas_title: { fr: 'Par karma proche de :' },
	sorting_title: { fr: 'Trier par :' },
	search_input_placeholder: { fr: 'Rechercher une marque' },
}

module.exports = {
	KARMA_LABELS,
	BRANDS_SORTING_LABELS,
	BRANDS_RESULTS_MESSAGES,
	BRANDS_STATIC_CONTENTS,
}
