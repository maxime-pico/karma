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
				'Description la Cause : explication de ce que la Cause prend en compte',
		},
	},
	CLIMAT_CHANGE: {
		fr: 'Implication dans le changement climatique',
		description: {
			fr:
				"Description le l'Acte : explication de ce que l'acte prend en compte.",
		},
	},
	ECOSYSTEM_PRESERVATION: {
		fr: 'Préservation des écosystèmes',
		description: {
			fr:
				"Description le l'Acte : explication de ce que l'acte prend en compte.",
		},
	},
	RESOURCE_PRESERVATION: {
		fr: 'Préservation des ressources',
		description: {
			fr:
				"Description le l'Acte : explication de ce que l'acte prend en compte.",
		},
	},
	ANIMAL_CONDITION: {
		fr: 'Condition animale',
		description: {
			fr:
				"Description le l'Acte : explication de ce que l'acte prend en compte.",
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
				'Description la Cause : explication de ce que la Cause prend en compte',
		},
	},
	POLITICAL_RESPONSIBILITY: {
		fr: 'Responsabilité politique',
		description: {
			fr:
				"Description le l'Acte : explication de ce que l'acte prend en compte",
		},
	},
	MARKET_INFLUENCE: {
		fr: 'Influence du marché',
		description: {
			fr:
				"Description le l'Acte : explication de ce que l'acte prend en compte",
		},
	},
	POPULATION_RESPECT: {
		fr: 'Respect des populations',
		description: {
			fr:
				"Description le l'Acte : explication de ce que l'acte prend en compte",
		},
	},
	CONSUMER_RESPECT: {
		fr: 'Respect du consommateur',
		description: {
			fr:
				"Description le l'Acte : explication de ce que l'acte prend en compte",
		},
	},
	QUESTIONABLE_INDUSTRIES: {
		fr: 'Industries critiquables et/ou technologies critiquables',
		description: {
			fr:
				"Description le l'Acte : explication de ce que l'acte prend en compte",
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
				'Description la Cause : explication de ce que la Cause prend en compte',
		},
	},
	SHAREHOLDER_REMUNERATION: {
		fr: "Taux de rémunération de l'actionnariat",
		description: {
			fr:
				"Description le l'Acte : explication de ce que l'acte prend en compte",
		},
	},
	TAXATION_LEVEL: {
		fr: "Taux d'imposition",
		description: {
			fr:
				"Description le l'Acte : explication de ce que l'acte prend en compte",
		},
	},
	EXECUTIVE_COMPENSATION: {
		fr: 'Surémunération des dirigeants',
		description: {
			fr:
				"Description le l'Acte : explication de ce que l'acte prend en compte",
		},
	},
	EMPLOYEE_EQUITY: {
		fr: 'Participation des salariés',
		description: {
			fr:
				"Description le l'Acte : explication de ce que l'acte prend en compte",
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
				'Description la Cause : explication de ce que la Cause prend en compte',
		},
	},
	EMPLOYMENT_CONDITIONS: {
		fr: 'Conditions salariales',
		description: {
			fr:
				"Description le l'Acte : explication de ce que l'acte prend en compte",
		},
	},
	EMPLOYEE_DISCRIMINATIONS: {
		fr: 'Discriminations',
		description: {
			fr:
				"Description le l'Acte : explication de ce que l'acte prend en compte",
		},
	},
	WORKING_CONDITIONS: {
		fr: 'Conditions de travail',
		description: {
			fr:
				"Description le l'Acte : explication de ce que l'acte prend en compte",
		},
	},
	MANAGING_CONDITIONS: {
		fr: 'Management et Epanouïssement salarial',
		description: {
			fr:
				"Description le l'Acte : explication de ce que l'acte prend en compte",
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
}

export const AUTH_TOKEN = 'auth-token_toBeHidden'
