import { GRADES_TO_WORDS, CAUSE_AND_ACTS } from './constants'

export function convertGradesIntoWords(grade, type) {
	if (grade <= -1.5) return GRADES_TO_WORDS.WORST[type]
	if (-1.5 < grade && grade <= -0.5) return GRADES_TO_WORDS.BAD[type]
	if (-0.5 < grade && grade <= 0.5) return GRADES_TO_WORDS.NEUTRAL[type]
	if (0.5 < grade && grade <= 1.5) return GRADES_TO_WORDS.GOOD[type]
	if (1.5 < grade) return GRADES_TO_WORDS.BEST[type]
	return 'error'
}

export function adjacentCause(cause, direction) {
	const causes = ['ENVIRONMENT', 'ANIMALS', 'SOCIAL', 'ETHICS', 'FISCAL']
	const currentIndex = causes.indexOf(cause)
	var newIndex = (currentIndex + direction) % 5
	if (newIndex < 0) {
		newIndex += 5
	}
	return causes[newIndex]
}

export function adjacentAct(cause, act, direction) {
	const acts = CAUSE_AND_ACTS[cause].acts
	const currentIndex = acts.indexOf(act)
	const mod = acts.length
	var newIndex = (currentIndex + direction) % mod
	if (newIndex < 0) {
		newIndex += mod
	}
	return acts[newIndex]
}
