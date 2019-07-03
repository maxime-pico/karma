// Defines the table of cause and acts for reuse in the app
export const CAUSE_AND_ACTS = {
	ENVIRONMENT: {
		fr: 'Cause Environnementale',
		acts: [
			'CLIMAT_CHANGE',
			'ECOSYSTEM_PRESERVATION',
			'RESOURCE_PRESERVATION',
			'ANIMAL_CONDITION',
		],
		description: {
			fr:
				"Afin d'évaluer la Cause Environnementale, on veillera à prendre en compte l'ensemble des notes et opinions des actes sous-jacents dans une proportion reflétant les activités et les responsabilités de l'entreprise.",
		},
	},
	CLIMAT_CHANGE: {
		fr: 'Implication dans le changement climatique',
		description: {
			fr: [
				"Le secteur d'activité, est-il contributeur ? (ex : énergies fossiles, automobile, agriculture intensive, etc.);",
				"Le niveau d'émission de Gaz à effet de serre;",
				"L'éventuelle mise en place de solutions de réduction d'émission de gaz à effet de serre;",
				"L'éventuelle mise en place de solution de captation de gaz à effet de serre;",
			],
		},
	},
	ECOSYSTEM_PRESERVATION: {
		fr: 'Préservation des écosystèmes',
		description: {
			fr: [
				"La contribution de l'entreprise à la déforestation de forets sauvages;",
				"L'éventuelle pollution chimique / toxique que l'entreprise génère; A l'éventuelle destruction d'habitats;",
				"La réduction de la biodiversité en générale; L'implication dans l'élevage intensif;",
			],
		},
	},
	RESOURCE_PRESERVATION: {
		fr: 'Préservation des ressources',
		description: {
			fr: [
				'Les pratiques de pêche intensive;',
				"L'exploitation des minerais;",
				"L'exploitation des ressources d'eau potable;",
				"L'exploitation des sols;",
				"La consommation d'énergie;",
				"L'investissement éventuel dans les énergies renouvelables;",
				'Le reyclage éventuel ou à la politique de traitement des déchets;',
				'Les types de matériaux utilisés;',
			],
		},
	},
	ANIMAL_CONDITION: {
		fr: 'Condition animale',
		description: {
			fr: [
				"Les éventuelles expériences que l'entreprise mène sur les animaux;",
				'Les éventuelles utilisations de fourrures, pelages, plumes et autres matériaux issus des animaux;',
				"Les conditions d'élevage des animaux;",
				"Les conditions d'abattage des animaux;",
			],
		},
	},
	ETHICS: {
		fr: 'Cause éthique',
		acts: [
			'POLITICAL_RESPONSIBILITY',
			'MARKET_INFLUENCE',
			'POPULATION_RESPECT',
			'CONSUMER_RESPECT',
			'QUESTIONABLE_INDUSTRIES',
		],
		description: {
			fr:
				"Afin d'évaluer la Cause éthique, on veillera à prendre en compte l'ensemble des notes et opinions des actes sous-jacents dans une proportion reflétant les activités et les responsabilités de l'entreprise.",
		},
	},
	POLITICAL_RESPONSIBILITY: {
		fr: 'Responsabilité politique',
		description: {
			fr: [
				'Les pratiques de corruption et/ou lobbying intensif;',
				'Les collusion avec des régimes totalitaires et/ou réseaux mafieux;',
			],
		},
	},
	MARKET_INFLUENCE: {
		fr: 'Influence du marché',
		description: {
			fr: [
				"Les délits d'initiés et/ou à l'entente sur les prix avec des concurrents;",
				'Les situations de concurrence déloyale ou monopolistique;',
				'Le respect des fournisseurs et aux éventuelles pressions à leur égard;',
			],
		},
	},
	POPULATION_RESPECT: {
		fr: 'Respect des populations',
		description: {
			fr: [
				"L'Implication dans des scandales sanitaires;",
				"L'éventuelle aide aux population (développement local, humanitaire);",
				'Les déplacement de population et/ou intimidation (expropriation, ect.);',
			],
		},
	},
	CONSUMER_RESPECT: {
		fr: 'Respect du consommateur',
		description: {
			fr: [
				'Les éventuelles publicités mensongères;',
				'Les communications choquantes et/ou abusive;',
				'La transparence;',
				'Les pratiques de Green Washing;',
				"Les recours à l'obsolescience programée;",
				'Les politiques de prix abusives;',
				'Le respect de la vie privée et à la gestion des données utilisateurs;',
			],
		},
	},
	QUESTIONABLE_INDUSTRIES: {
		fr: 'Industries critiquables et/ou technologies critiquables',
		description: {
			fr: [
				"Les industries de l'armement;",
				'Les industries de la pornographie;',
				'Les industries du nucléaire;',
				'Les industries du tabac;',
				"Les industries de l'Alcool",
				'Les industries de la drogue;',
				"Les industries des Jeux d'argent;",
				"L'utilisation d'OGMs;",
				'Les industries du génie génétique;',
				'Les industries des nanotechnologies; ',
				'Les industries de la surveillance',
			],
		},
	},
	FISCAL: {
		fr: 'Fiscalité & Gouvernance',
		acts: [
			'SHAREHOLDER_REMUNERATION',
			'TAXATION_LEVEL',
			'EXECUTIVE_COMPENSATION',
			'EMPLOYEE_EQUITY',
		],
		description: {
			fr:
				"Afin d'évaluer la Cause Fiscalité & Gouvernance, on veillera à prendre en compte l'ensemble des notes et opinions des actes sous-jacents dans une proportion reflétant les activités et les responsabilités de l'entreprise.",
		},
	},
	SHAREHOLDER_REMUNERATION: {
		fr: "Taux de rémunération de l'actionnariat",
		description: {
			fr: ["Le taux de rémunération de l'actionnariat."],
		},
	},
	TAXATION_LEVEL: {
		fr: "Taux d'imposition",
		description: {
			fr: [
				"Le taux d'imposition;",
				" Les éventuelles stratégies d'optimisation fiscale.",
			],
		},
	},
	EXECUTIVE_COMPENSATION: {
		fr: 'Surémunération des dirigeants',
		description: {
			fr: [
				'La rémunération des dirigeants',
				" Les écarts de salaires dans l'entreprise.",
			],
		},
	},
	EMPLOYEE_EQUITY: {
		fr: 'Participation des salariés',
		description: {
			fr: [
				"La part des salariés dans l'actionnariat;",
				" La part des salariés dans la gouvernance de l'entreprise;",
			],
		},
	},
	SOCIAL: {
		fr: 'Cause Sociale',
		acts: [
			'EMPLOYMENT_CONDITIONS',
			'EMPLOYEE_DISCRIMINATIONS',
			'WORKING_CONDITIONS',
			'MANAGING_CONDITIONS',
		],
		description: {
			fr:
				"Afin d'évaluer la Cause Sociale, on veillera à prendre en compte l'ensemble des notes et opinions des actes sous-jacents dans une proportion reflétant les activités et les responsabilités de l'entreprise.;",
		},
	},
	EMPLOYMENT_CONDITIONS: {
		fr: 'Conditions salariales',
		description: {
			fr: [
				"Les pratiques d'esclavagisme, de travail forcé ou de travail des enfants;",
				'La sous-rémunération ou surexploitation des travailleurs (Travail excessif, Heures supplémentaires obligatoires...);',
				"Le déni de droits syndicaux et/ou d'accès à la justice prud'homale;",
			],
		},
	},
	EMPLOYEE_DISCRIMINATIONS: {
		fr: 'Discriminations',
		description: {
			fr: [
				"L'âge moyen de départ en retraite, la part de séniors dans l'entreprise;",
				" L'égalité salariale h/f;",
				"L'accessibilité aux handicapés;",
				'Les discriminations liées à la sexualité;',
				'Les discriminations communautaires;',
			],
		},
	},
	WORKING_CONDITIONS: {
		fr: 'Conditions de travail',
		description: {
			fr: [
				'La précarité des équipements mis à disposition;',
				'La pénibilité du travail demandé;',
				"Le taux d'accidents;",
			],
		},
	},
	MANAGING_CONDITIONS: {
		fr: 'Management et Epanouïssement salarial',
		description: {
			fr: [
				"L'aide éventuelle à la formation;",
				"L'aide éventuelle à l'engagement associatif;",
				'La flexibilité du travail (télé-travail, temps partiels etc.);',
				'Les éventuels équipements familiaux;',
				'Le harcèlement sexuel;',
				'Le harcèlement moral;',
				'La pression hiérarchique (taux de suicide, etc.);',
			],
		},
	},
}

export const STATUS = {
	ASLEEP: {
		fr: 'Panda Endormi',
	},
	AWAKEN: {
		fr: 'Panda Eveillé',
	},
	SACRED: {
		fr: 'Panda Sacré',
	},
	SAINT: {
		fr: 'Saint Panda',
	},
}

export const GRADES_TO_WORDS = {
	WORST: {
		global: {
			fr: 'Très Mauvais Karma',
		},
		cause: {
			fr: 'Très Mauvais Karma',
		},
		act: {
			fr: 'Très Maléfique',
		},
	},
	BAD: {
		global: {
			fr: 'Plutôt Mauvais Karma',
		},
		cause: {
			fr: 'Plutôt Mauvais Karma',
		},
		act: {
			fr: 'Plutôt Maléfique',
		},
	},
	NEUTRAL: {
		global: {
			fr: 'Karma Neutre',
		},
		cause: {
			fr: 'Karma Neutre',
		},
		act: {
			fr: 'Mouais...',
		},
	},
	GOOD: {
		global: {
			fr: 'Plutôt Bon Karma',
		},
		cause: {
			fr: 'Plutôt Bon Karma',
		},
		act: {
			fr: 'Plutôt Bénéfique',
		},
	},
	BEST: {
		global: {
			fr: 'Très Bon Karma',
		},
		cause: {
			fr: 'Très Bon Karma',
		},
		act: {
			fr: 'Très Bénéfique',
		},
	},
	NULL: {
		fr: 'Pas de notes pour le moment...',
	},
}

export const AUTH_TOKEN = 'auth-token_toBeHidden'
