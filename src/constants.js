// Defines the table of cause and acts for reuse in the app
export const CAUSE_AND_ACTS = {
	ENVIRONMENT: {
		name_fr: 'Cause Environnementale',
		acts: [
			{
				act: 'CLIMAT_CHANGE',
				name_fr: 'Implication dans le changement climatique',
			},
			{
				act: 'ECOSYSTEM_PRESERVATION',
				name_fr: 'Préservation des écosystèmes',
			},
			{
				act: 'RESOURCE_PRESERVATION',
				name_fr: 'Préservation des ressources',
			},
		],
	},
	ANIMALS: {
		name_fr: 'Cause animale',
		acts: [
			{
				act: 'ANIMAL_EXPERIMENTATION',
				name_fr: 'Expériences sur les animaux',
			},
			{
				act: 'ANIMAL_RESOURCES',
				name_fr: 'Utilisation de fourrures et autres',
			},
			{
				act: 'ANIMAL_WELFARE',
				name_fr: 'Bien être animal',
			},
		],
	},
	ETHICS: {
		name_fr: 'Cause éthique',
		acts: [
			{
				act: 'POLITICAL_RESPONSIBILITY',
				name_fr: 'Responsabilité politique',
			},
			{
				act: 'MARKET_INFLUENCE',
				name_fr: 'Influence du marché',
			},
			{
				act: 'POPULATION_RESPECT',
				name_fr: 'Respect des populations',
			},
			{
				act: 'CONSUMER_RESPECT',
				name_fr: 'Respect du consommateur',
			},
			{
				act: 'QUESTIONABLE_INDUSTRIES',
				name_fr: 'Industries critiquables et/ou technologies critiquables',
			},
		],
	},
	FISCALITY: {
		name_fr: 'Fiscalité & Gouvernance',
		acts: [
			{
				act: 'SHAREHOLDER_REMUNERATION',
				name_fr: "Taux de rémunération de l'actionnariat",
			},
			{
				act: 'TAXATION_LEVEL',
				name_fr: "Taux d'imposition",
			},
			{
				act: 'EXECUTIVE_COMPENSATION',
				name_fr: 'Surémunération des dirigeants',
			},
			{
				act: 'EMPLOYEE_EQUITY',
				name_fr: 'Participation des salariés',
			},
		],
	},
	SOCIAL: {
		name_fr: 'Cause Sociale',
		acts: [
			{
				act: 'EMPLOYMENT_CONDITIONS',
				name_fr: 'Conditions salariales',
			},
			{
				act: 'EMPLOYEE_DISCRIMINATIONS',
				name_fr: 'Discriminations',
			},
			{
				act: 'WORKING_CONDITIONS',
				name_fr: 'Conditions de travail',
			},
			{
				act: 'MANAGING_CONDITIONS',
				name_fr: 'Management et Epanouïssement salarial',
			},
		],
	},
}

export const AUTH_TOKEN = 'auth-token_toBeHidden'
