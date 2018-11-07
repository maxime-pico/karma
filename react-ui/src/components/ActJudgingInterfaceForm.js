import React from 'react'
import { isUrlValid } from '../utils'
import ActJudgingInterfaceFormFields from './ActJudgingInterfaceFormFields'
import ActJudgingInterfaceFormSubmit from './ActJudgingInterfaceFormSubmit'
import { Row, Col, Box } from '@smooth-ui/core-sc'

class ActJudgingInterfaceForm extends React.Component {
	state = {
		title: {
			value: '',
			error: true,
		},
		text: {
			value: '',
			error: true,
		},
		sources: {
			value: '',
			error: true,
			array: [],
		},
		tags: {
			value: '',
			error: false,
			array: [],
		},
	}

	_recordValueInState = (e, field) => {
		this.setState(previousState => {
			previousState[field].value = e
			return previousState
		})
	}

	//form validation from state values
	_checkFields = async () => {
		const inputs = ['title', 'text', 'sources', 'tags']
		const { sources, tags } = this.state
		await this.setState(previousState => {
			inputs.forEach(input => (previousState[input].error = false))
			return previousState
		})
		inputs.forEach(input => {
			if (input !== 'tags' && this.state[input].value === '') {
				this.setState(previousState => {
					previousState[input].error =
						'!! Ce champ ne peut être vide, remplissez le ou affiliez-vous à une opinion existante !!'
					return previousState
				})
			}
		})
		if (sources.value !== '') {
			this.setState(previousState => {
				previousState.sources.array = previousState.sources.value
					.split(' ')
					.join('')
					.split(',')
					.filter(Boolean)
				var invalidUrl = false
				previousState.sources.array.forEach(url => {
					invalidUrl = invalidUrl || !isUrlValid(url)
				})
				previousState.sources.error = invalidUrl
					? '!! Veuillez vérifier vos urls et rentrer des urls valides !! '
					: false
				return previousState
			})
		}
		if (tags.value !== '') {
			this.setState(previousState => {
				previousState.tags.array = previousState.tags.value
					.split(' ')
					.join('')
					.split(',')
					.filter(Boolean)
				return previousState
			})
		}

		const allInputsPassedValidation = await !inputs.reduce(
			(accumulator, currentValue) =>
				accumulator || this.state[currentValue].error,
			false,
		) //returns true if all fields passed validation
		return allInputsPassedValidation
	}

	render() {
		const { grade, companyId, act, affiliation } = this.props
		const { title, text, sources, tags } = this.state
		return (
			<Box py={20}>
				<Row my={2} justifyContent="center">
					<Col md={6} textAlign="justify">
						Pour Juger un acte vous êtes obligés de vous affilier à une opinion
						ou en créer une. Pour vous affilier à une opinion, cliquez sur l'une
						des opinions dans la liste ci-dessous. Pour créer une opinion,
						veuillez remplir les champs suivants :
					</Col>
				</Row>
				<ActJudgingInterfaceFormFields
					_recordValueInState={this._recordValueInState}
					title={title}
					text={text}
					sources={sources}
					tags={tags}
				/>
				<ActJudgingInterfaceFormSubmit
					_checkFields={this._checkFields}
					title={title.value}
					text={text.value}
					sources={sources.array}
					tags={tags.array}
					grade={grade}
					companyId={companyId}
					act={act}
					opinionId={affiliation}
				/>
			</Box>
		)
	}
}

export default ActJudgingInterfaceForm
