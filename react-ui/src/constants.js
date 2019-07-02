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
			fr:
				"Afin d'évaluer cet Acte on fera attention : Au secteur d'activité, est-il contributeur ? (ex : énergies fossiles, automobile, agriculture intensive, etc.); Au niveau d'émission de Gaz à effet de serre; A l'éventuelle mise en place de solutions de réduction d'émission de gaz à effet de serre; A l'éventuelle mise en place de solution de captation de gaz à effet de serre;",
		},
	},
	ECOSYSTEM_PRESERVATION: {
		fr: 'Préservation des écosystèmes',
		description: {
			fr:
				"Afin d'évaluer cet Acte on fera attention : A la contribution de l'entreprise à la déforestation de forets sauvages; A l'éventuelle pollution chimique / toxique que l'entreprise génère; A l'éventuelle destruction d'habitats; A la réduction de la biodiversité en générale; A l'implication dans l'élevage intensif;",
		},
	},
	RESOURCE_PRESERVATION: {
		fr: 'Préservation des ressources',
		description: {
			fr:
				"Afin d'évaluer cet Acte on fera attention : Au pratiques de pêche intensive; A l'exploitation des minerais; A l'exploitation des ressources d'eau potable; A l'exploitation des sols; A la consommation d'énergie; A l'investissement éventuel dans les énergies renouvelables; Au reyclage éventuel ou à la politique de traitement des déchets; Au types de matériaux utilisés;",
		},
	},
	ANIMAL_CONDITION: {
		fr: 'Condition animale',
		description: {
			fr:
				"Afin d'évaluer cet Acte on fera attention : Aux éventuelles expériences que l'entreprise mène sur les animaux; Aux éventuelles utilisations de fourrures, pelages, plumes et autres matériaux issus des animaux; Aux conditions d'élevage des animaux; Aux conditions d'abattage des animaux;",
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
			fr:
				"Afin d'évaluer cet Acte on fera attention : Aux pratiques de corruption et/ou lobbying intensif; Aux collusion avec des régimes totalitaires et/ou réseaux mafieux;",
		},
	},
	MARKET_INFLUENCE: {
		fr: 'Influence du marché',
		description: {
			fr:
				"Afin d'évaluer cet Acte on fera attention : Aux délits d'initiés et/ou à l'entente sur les prix avec des concurrents; Au situations de concurrence déloyale ou monopolistique; Au respect des fournisseurs et aux éventuelles pressions à leur égard;",
		},
	},
	POPULATION_RESPECT: {
		fr: 'Respect des populations',
		description: {
			fr:
				"Afin d'évaluer cet Acte on fera attention : A l'Implication dans des scandales sanitaires; A l'éventuelle aide aux population (développement local, humanitaire); Aux déplacement de population et/ou intimidation (expropriation, ect.);",
		},
	},
	CONSUMER_RESPECT: {
		fr: 'Respect du consommateur',
		description: {
			fr:
				"Afin d'évaluer cet Acte on fera attention : Aux éventuelles publicités mensongères; Aux communications choquantes et/ou abusive; A la transparence; Aux pratiques de Green Washing; Aux recours à l'obsolescience programée; A des politiques de prix abusives; Au respect de la vie privée et à la gestion des données utilisateurs;",
		},
	},
	QUESTIONABLE_INDUSTRIES: {
		fr: 'Industries critiquables et/ou technologies critiquables',
		description: {
			fr:
				"Afin d'évaluer cet Acte on fera attention : Aux industries de l'armement; Aux industries de la pornographie; Aux industries du nucléaire; Aux industries du tabac; Aux industries de l'Alcool; Aux industries de la drogue; Aux industries des Jeux d'argent; A l'utilisation d'OGMs; Aux industries du génie génétique; Aux industries des nanotechnologies; Aux industries de la surveillance",
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
			fr:
				"Afin d'évaluer cet Acte on fera attention au taux de rémunération de l'actionnariat.",
		},
	},
	TAXATION_LEVEL: {
		fr: "Taux d'imposition",
		description: {
			fr:
				"Afin d'évaluer cet Acte on fera attention au taux d'imposition et aux éventuelles stratégies d'optimisation fiscale.",
		},
	},
	EXECUTIVE_COMPENSATION: {
		fr: 'Surémunération des dirigeants',
		description: {
			fr:
				"Afin d'évaluer cet Acte on fera attention à la rémunération des dirigeants et aux écarts de salaires dans l'entreprise.",
		},
	},
	EMPLOYEE_EQUITY: {
		fr: 'Participation des salariés',
		description: {
			fr:
				"Afin d'évaluer cet Acte on fera attention : A la part des salariés dans l'actionnariat; A la part des salariés dans la gouvernance de l'entreprise;",
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
			fr:
				"Afin d'évaluer cet Acte on fera attention : Aux pratiques d'esclavagisme, de travail forcé ou de travail des enfants; A la sous-rémunération ou surexploitation des travailleurs (Travail excessif, Heures supplémentaires obligatoires...); Au déni de droits syndicaux et/ou d'accès à la justice prud'homale;",
		},
	},
	EMPLOYEE_DISCRIMINATIONS: {
		fr: 'Discriminations',
		description: {
			fr:
				"Afin d'évaluer cet Acte on fera attention : A l'âge moyen de départ en retraite, la part de séniors dans l'entreprise; A l'égalité salariale h/f; A l'accessibilité aux handicapés; Aux discriminations liées à la sexualité; Aux discriminations communautaires;",
		},
	},
	WORKING_CONDITIONS: {
		fr: 'Conditions de travail',
		description: {
			fr:
				"Afin d'évaluer cet Acte on fera attention : A la précarité des équipements mis à disposition; A la pénibilité du travail demandé; Aux taux d'accidents;",
		},
	},
	MANAGING_CONDITIONS: {
		fr: 'Management et Epanouïssement salarial',
		description: {
			fr:
				"Afin d'évaluer cet Acte on fera attention : A l'aide éventuelle à la formation; A l'aide éventuelle à l'engagement associatif; A la flexibilité du travail (télé-travail, temps partiels etc.); Aux éventuels équipements familiaux; Au harcèlement sexuel; Au harcèlement moral; A la pression hiérarchique (taux de suicide, etc.);",
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
