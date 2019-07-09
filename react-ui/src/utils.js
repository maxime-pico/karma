import { GRADES_TO_WORDS, CAUSE_AND_ACTS } from './constants'

export function convertGradesIntoWords(grade, type) {
	if (grade === null) return GRADES_TO_WORDS.NULL
	if (grade <= -1.5) return GRADES_TO_WORDS.WORST[type]
	if (-1.5 < grade && grade <= -0.5) return GRADES_TO_WORDS.BAD[type]
	if (-0.5 < grade && grade <= 0.5) return GRADES_TO_WORDS.NEUTRAL[type]
	if (0.5 < grade && grade <= 1.5) return GRADES_TO_WORDS.GOOD[type]
	if (1.5 < grade) return GRADES_TO_WORDS.BEST[type]
	return 'error'
}

export function convertGradesIntoColors(grade) {
	if (grade <= -1.5) return '#AD454D'
	if (-1.5 < grade && grade <= -0.5) return '#AE687B'
	if (-0.5 < grade && grade <= 0.5 && grade !== null) return '#D7D0C8'
	if (0.5 < grade && grade <= 1.5) return '#98E0DD'
	if (1.5 < grade) return '#7BCDCB'
	return '#B6B6B6'
}

export function adjacentCause(cause, direction) {
	const causes = ['ENVIRONMENT', 'SOCIAL', 'ETHICS', 'FISCAL']
	const currentIndex = causes.indexOf(cause)
	var newIndex = (currentIndex + direction) % 4
	if (newIndex < 0) {
		newIndex += 4
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

export function isUrlValid(userInput) {
	return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
		userInput,
	)
}
