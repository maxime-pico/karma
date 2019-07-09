import React from 'react'
import ActJudgingAffiliationInterfaceSubmit from './ActJudgingAffiliationInterfaceSubmit'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const Minimise = styled.button`
	text-align: center;
	color: #a9b4cc;
	font-size: 12px;
	background-color: transparent;
	line-height: 13px;
	border: none;
`

const JudgingInterface = styled.div`
	position: fixed;
	background-color: #545a66;
	bottom: 0;
	left: 0;
	width: 100%;
	color: white;
	font-size: 16px;
	z-index: 2000;
`

const Cross = styled.button`
	background-color: transparent;
	border: none;
	color: #a9b4cc;
	font-size: 24px;
	cursor: pointer;
	padding-right: 12px;
	line-height: 12px;
`
const Title = styled.div`
	font-weight: bold;
	font-size: 24px;
	text-align: center;
	margin-bottom: 12px;
`

const SubTitle = styled.div`
	font-weight: bold;
	font-size: 20px;
	text-align: center;
	margin-bottom: 12px;
`

const Content = styled.div`
	font-size: 16px;
	text-align: left;
	margin-bottom: 24px;
`

const CancelButton = styled.button`
	border-radius: 35px;
	background-color: transparent;
	border: 1px solid #d8d8d8;
	padding: 10px 40px;
	font-size: 16px;
	color: white;

	:hover {
		color: #d8d8d8;
		background: #a9b4cc;
		border-color: transparent;
	}
`

const GradeButton = styled.button`
	background-color: #a9b4cc;
	border-radius: 35px;
	border: none;
	padding: 10px 40px;
	font-size: 16px;
	color: white;
	white-space: normal;
	max-width: 100%;

	:hover {
		color: #a9b4cc;
		background: #d3e2ff;
	}
	&.btn-secondary {
		background: #7f8799;
	}
`

const COMPANY_OVERVIEW_QUERY = gql`
	query Company_Overview_Query($companyId: ID!) {
		companyOverview(companyId: $companyId) {
			name
		}
	}
`

class ActJudgingAffiliationInterface extends React.Component {
	constructor(props) {
		super(props)
		this._closeModal = this.props._closeModal
		this.affiliation = this.props.affiliation
		this.act = this.props.act
		this.companyId = this.props.companyId
		this.error = this.props.error
		this.step = this.props.step
		this._nextStep = this.props._nextStep
	}

	state = {
		grade: 0,
		reduced: false,
	}

	_updateGrade = grade => {
		this.setState(previousState => {
			previousState.grade = grade
			return previousState
		})
	}

	_reduce = () => {
		this.setState(previousState => {
			previousState.reduced = !previousState.reduced
			return previousState
		})
	}

	render() {
		const {
			act,
			companyId,
			_closeModal,
			_stopGrading,
			affiliation,
			step,
			_nextStep,
		} = this.props
		return (
			<Query query={COMPANY_OVERVIEW_QUERY} variables={{ companyId }}>
				{({ loading, error, data }) => {
					if (loading) return <div> Fetching </div>
					if (error) return <div> Error </div>
					const { name } = data.companyOverview
					return (
						<JudgingInterface>
							<Row justifyContent="flex-end" mt="6px">
								<Col md={2}>
									<Minimise onClick={() => this._reduce()}>
										{' '}
										{this.state.reduced ? 'agrandir' : 'reduire'}{' '}
									</Minimise>
								</Col>
								<Col omd={4} md={1} textAlign="right">
									<Cross onClick={() => _stopGrading()}>x</Cross>
								</Col>
							</Row>
							<Row justifyContent="center" mt="24px" mb="12px">
								<Col md={8}>
									{!this.state.reduced && (
										<div>
											<Title>
												Vous êtes en train de juger d’un Acte de {name} (
												{step + 1}
												/2)
											</Title>
											<Content>
												<p>
													Pour ce faire, vous devrez décider d’une note et
													affilier cette note à l’opinion qui vous a le plus
													aidé dans votre décision. Regardez donc les opinions
													existantes et cliquez sur celle à laquelle vous voulez
													affilier votre notation.
												</p>
												<p>
													Si vous trouvez qu’aucune opinion ne reflète vraiment
													votre jugement, pas de problème. Vous pouvez toujours
													décider de créer votre propre opinion. Attention
													cependant : tout opinion doit être sourcée.
												</p>
											</Content>
										</div>
									)}

									<SubTitle>
										{step === 0 && (
											<span>
												Cliquez sur l’opinion à laquelle vous souhaitez vous
												affilier
											</span>
										)}
										{step === 1 && (
											<span>
												Cliquez sur l’opinion à laquelle vous souhaitez vous
												affilier
											</span>
										)}
									</SubTitle>
								</Col>
							</Row>
							{step === 0 && (
								<Row justifyContent="center" mb="30px">
									<Col textAlign="right">
										<CancelButton onClick={_closeModal}>Annuler</CancelButton>
									</Col>
									<Col textAlign="left">
										<GradeButton onClick={() => _nextStep(affiliation)}>
											{' '}
											Suivant{' '}
										</GradeButton>
									</Col>
									<Col
										md={12}
										color={this.props.error ? 'red' : 'transparent'}
										fontWeight="600"
										mt="6px"
									>
										Selectionnez d'abord a une opinion en cliquant dessus !
									</Col>
								</Row>
							)}
							{step === 1 && (
								<div>
									<Row justifyContent="center">
										<ActJudgingAffiliationInterfaceSubmit
											_closeModal={_closeModal}
											_updateGrade={this._updateGrade}
											grade={this.state.grade}
											companyId={companyId}
											opinionId={affiliation}
											act={act}
										/>
									</Row>
									<Row justifyContent="center" mb="36px">
										<Col
											textAlign="center"
											color="#A9B4CC"
											fontSize="12px"
											mt="6px"
										>
											{this.state.grade}
										</Col>
									</Row>
								</div>
							)}
						</JudgingInterface>
					)
				}}
			</Query>
		)
	}
}

export default ActJudgingAffiliationInterface
