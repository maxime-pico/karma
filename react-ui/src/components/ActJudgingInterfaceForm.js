import React from 'react'
import { Portal } from 'react-portal'
import { isUrlValid } from '../utils'
import PandaSlider from './PandaSlider'
import ActJudgingInterfaceFormFields from './ActJudgingInterfaceFormFields'
import ActJudgingInterfaceFormSubmit from './ActJudgingInterfaceFormSubmit'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const Backdrop = styled.div`
	position: absolute;
	background-color: rgba(255, 255, 255, 0.2);
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`

const Modal = styled.div`
	font-size: 16px;
	width: 80%;
	max-width: 700px;
	background-color: #fff;
	padding: 60px;
	border-radius: 50px;
	margin-top: 300px;
`
const Label = styled.div`
	font-size: 24px
  font-weight: 600;
  color: #545A66;
  margin-bottom: 12px
`

const COMPANY_OVERVIEW_QUERY = gql`
	query Company_Overview_Query($companyId: ID!) {
		companyOverview(companyId: $companyId) {
			name
		}
	}
`

class ActJudgingInterfaceForm extends React.Component {
	state = {
		error: true,
		title: {
			value: '',
			error: true,
		},
		text: {
			value: '',
			error: true,
		},
		sources: [{ value: '', error: true }],
		sourcesArray: [],
		tags: [{ value: '', error: true }],
		tagsArray: [],
		grade: 0,
	}

	constructor(props) {
		super(props)
		this._closeModal = this.props._closeModal
		this.companyId = this.props.companyId
		this.act = this.props.act
	}

	_updateGrade = grade => {
		this.setState(previousState => {
			previousState.grade = grade
			return previousState
		})
	}

	_addFields = field => {
		this.setState(previousState => {
			previousState[field] = [
				...previousState[field],
				{ value: '', error: true },
			]
			return previousState
		})
	}

	_recordValueInState = (e, field, index) => {
		this.setState(previousState => {
			index !== undefined
				? (previousState[field][index].value = e)
				: (previousState[field].value = e)
			return previousState
		})
	}

	//form validation from state values
	_checkFields = async () => {
		const inputs = ['title', 'text', 'sources', 'tags']
		await this.setState(previousState => {
			previousState.error = false
			inputs.forEach(
				input =>
					input === 'sources' || input === 'tags'
						? previousState[input].forEach(
								(item, i) => (previousState[input][i].error = false),
						  )
						: (previousState[input].error = false),
			)
			return previousState
		})
		inputs.forEach(input => {
			if (this.state[input].value === '') {
				this.setState(previousState => {
					previousState[input].error = '!! Ce champ ne peut être vide !!'
					previousState.error = true
					return previousState
				})
			} else if (input === 'sources') {
				var allSources = ''
				var sourcesArray = []
				this.state['sources'].forEach(
					source => (allSources = allSources.concat(source.value)),
				)
				if (allSources === '') {
					this.setState(previousState => {
						previousState['sources'][0].error =
							'!! Veuillez renseigner au moins une source !!'
						previousState.error = true
						return previousState
					})
				} else {
					this.setState(previousState => {
						this.state['sources'].forEach((source, i) => {
							if (source.value !== '' && !isUrlValid(source.value)) {
								previousState['sources'][i].error =
									'!! Veuillez vérifier votre url et rentrer une url valide !!'
								previousState.error = true
							} else {
								sourcesArray = sourcesArray.concat([source.value])
							}
						})
						previousState.sourcesArray = sourcesArray
						return previousState
					})
				}
			} else if (input === 'tags') {
				var cleanTag = ''
				var tagsArray = []
				this.setState(previousState => {
					this.state['tags'].forEach((tag, i) => {
						cleanTag = tag.value.replace(/#/g, '')
						previousState['tags'][i].value = cleanTag
						tagsArray = tagsArray.concat([cleanTag])
					})
					previousState.tagsArray = tagsArray
					return previousState
				})
			}
		})

		return !this.state.error
	}

	render() {
		const { grade, companyId, act, affiliation, _closeModal } = this.props
		const { title, text, sources, tags } = this.state
		if (this.props.isOpen)
			return (
				<Portal node={document && document.getElementById('App')}>
					<Query query={COMPANY_OVERVIEW_QUERY} variables={{ companyId }}>
						{({ loading, error, data }) => {
							if (loading) return <div> Fetching </div>
							if (error) return <div> Error </div>
							const { name } = data.companyOverview
							return (
								<Backdrop>
									<Modal>
										<ActJudgingInterfaceFormFields
											_recordValueInState={this._recordValueInState}
											title={title}
											text={text}
											sources={sources}
											tags={tags}
											grade={grade}
											act={act}
											_addFields={this._addFields}
											_updateGrade={this._updateGrade}
										/>
										<Row justifyContent="center" mb="24px">
											<Col textAlign="left">
												<Label>Comment jugez-vous de l'Acte de {name}</Label>
												<Row justifyContent="center">
													<Col md={8}>
														<PandaSlider
															identfier={act}
															karma={grade}
															type={'global'}
															disabled={false}
															_updateGrade={this._updateGrade}
															_setGrade={this._updateGrade}
														/>
													</Col>
												</Row>
												<Row justifyContent="center">
													<Col
														textAlign="center"
														color="#A9B4CC"
														fontSize="12px"
														mt="6px"
													>
														{this.state.grade}
													</Col>
												</Row>
											</Col>
										</Row>
										<ActJudgingInterfaceFormSubmit
											_checkFields={this._checkFields}
											_closeModal={_closeModal}
											title={title.value}
											text={text.value}
											sources={this.state.sourcesArray}
											tags={this.state.tagsArray}
											grade={this.state.grade}
											companyId={companyId}
											act={act}
											opinionId={affiliation}
										/>
									</Modal>
								</Backdrop>
							)
						}}
					</Query>
				</Portal>
			)
		else return null
	}
}

export default ActJudgingInterfaceForm
