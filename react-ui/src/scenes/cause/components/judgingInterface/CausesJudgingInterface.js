import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import CausesJudgingInterfaceButtons from './CausesJudgingInterfaceButtons'
import { CAUSE_AND_ACTS } from '../../../../services/constants.js'
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
	margin-bottom: 42px;
`

const COMPANY_OVERVIEW_QUERY = gql`
	query Company_Overview_Query($companyId: ID!) {
		companyOverview(companyId: $companyId) {
			name
		}
	}
`

const GRADING_MUTATION = gql`
	mutation GradingMutation($companyId: ID!, $userGrades: [Int!]!) {
		gradeCauses(companyId: $companyId, userGrades: $userGrades) {
			id
		}
    setOverallKarma(companyId: $companyId){
      id
    }
	}
`
/*

*/

const OVERALL_MUTATION = gql`
	mutation OverallMutation($companyId: ID!) {
    setOverallKarma(companyId: $companyId){
      id
    }
	}
`


class CausesJudgingInterface extends React.Component {
  constructor(props) {
    super(props)
    this._blurBackground = this.props._blurBackground
    this._setGrade = this.props._setGrade
    this._userGrades = this.props.userGrades
    this._adjacentCause = this.props._adjacentCause
    this._stopGrading = this.props._stopGrading
  }

  state = {
    grade: 0,
    cause: this.props.cause,
    reduced: false,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.cause !== state.cause) {
      return {
        grade: state.grade,
        cause: props.cause,
      }
    }
    return null
  }

  _reduce = () => {
    this.setState(previousState => {
      previousState.reduced = !previousState.reduced
      return previousState
    })
  }

  _updateGrade = grade => {
    this.setState(previousState => {
      previousState.grade = grade
      return previousState
    })
  }

  _intoArray = causeGradesObject => {
    if (causeGradesObject) {
      return Object.keys(causeGradesObject).map(
        cause => causeGradesObject[cause],
      )
    }
    return null
  }

  componentDidMount() {
    this._setGrade(this.props.cause, this.state.grade)
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.cause !== prevProps.cause) {
      this._setGrade(this.props.cause, this.state.grade)
    }
  }

  render() {
    const { cause, companyId, userGrades } = this.props
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
                  <Cross onClick={() => this._stopGrading()}>x</Cross>
                </Col>
              </Row>
              <Row justifyContent="center" mt="24px" mb="12px">
                <Col md={8}>
                  {!this.state.reduced && (
                    <div>
                      <Title>
                        Vous êtes en train d'attribuer du Karma à {name}
                      </Title>
                      <Content>
                        Pour ce faire vous allez devoir juger les quatre Causes
												de {name} à partir des informations récoltées et des
												notes attribuées par les autres Pandas. Faites donc un
												tour pour vous faire un avis éclairé. Une fois que vous
												aurez fini de noter les quatre causes, vos notre seront
												ajoutées et le Karma de {name} sera recalculé.
											</Content>
                    </div>
                  )}
                  <SubTitle>
                    Quel Karma attribuez vous à la {CAUSE_AND_ACTS[cause].fr} de{' '}
                    {name}?
									</SubTitle>
                </Col>
              </Row>
              <Mutation
                mutation={GRADING_MUTATION}
                refetchQueries={[
                  `CauseGradesQuery`,
                  `CauseGradesQueryMain`,
                  `CauseGradesQuerySoul`,
                  `OpinionsAndGradesCauseCount`,
                  `Company_Overview_Query`,
                  `SocialGradesQuery`,
                  `EnvironmentGradesQuery`,
                  `EthicsGradesQuery`,
                  `FiscalGradesQuery`
                ]}
                variables={{
                  companyId: companyId,
                  userGrades: this._intoArray(userGrades),
                }}
              >
                {GradingMutation => (
                  <CausesJudgingInterfaceButtons
                    cause={cause}
                    userGrades={userGrades}
                    brandName={name}
                    gradingMutation={GradingMutation}
                    _blurBackground={this._blurBackground}
                    _adjacentCause={this._adjacentCause}
                    _stopGrading={this._stopGrading}
                    _updateGrade={this._updateGrade}
                    _setGrade={this._setGrade}
                  />
                )}
              </Mutation>
              <Row mt="6px" mb="42px">
                <Col color="#A9B4CC" fontSize="12px">
                  {this.state.grade}
                </Col>
              </Row>
            </JudgingInterface>
          )
        }}
      </Query>
    )
  }
}

export default CausesJudgingInterface
