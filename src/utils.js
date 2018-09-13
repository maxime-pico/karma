import { GRADES_TO_WORDS } from './constants'

export function convertGradesIntoWords(grade, type) {
	if (grade <= -1.5) return GRADES_TO_WORDS.WORST[type]
	if (-1.5 < grade && grade <= -0.5) return GRADES_TO_WORDS.BAD[type]
	if (-0.5 < grade && grade <= 0.5) return GRADES_TO_WORDS.NEUTRAL[type]
	if (0.5 < grade && grade <= 1.5) return GRADES_TO_WORDS.GOOD[type]
	if (1.5 < grade) return GRADES_TO_WORDS.BEST[type]
	return 'error'
}
