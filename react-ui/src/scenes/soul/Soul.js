/* This page is available at /company/{companyID} it is the parent component for
the page and calls all other components */

import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Steps } from 'intro.js-react'
import Cookies from 'universal-cookie'
import SoulHeader from './components/header/SoulHeader'
import CauseCard from './components/causeCard/CauseCard'
import LoginToGradeModal from '../../components/modals/LoginToGradeModal'
import GradeKarmaButton from '../../components/buttons/GradeKarmaButton'
import SoulHelpInterface from './components/helpInterface/SoulHelpInterface'
import HelpButton from '../../components/buttons/HelpButton'
import {
  CAUSE_AND_ACTS,
  AUTH_TOKEN,
  SOUL_STEPS,
} from '../../services/constants.js'
import { Grid, Row, Col, Box, styled } from '@smooth-ui/core-sc'

// <STYLE>
// If the state modalIsOpen = true then blur is true and the blur effect is applied
const BlurOnModal = styled.div`
	filter: ${props => (props.blur ? 'blur(4px)' : null)};
`
// </STYLE>

// Preparing query that retireves the list of company grades for the 4 causes as
// well as the overall karma of the company
const CAUSE_GRADES_QUERY = gql`
	query CauseGradesQueryMain($companyId: ID!) {
		companyCauseGrades(companyId: $companyId) {
			ENVIRONMENT
			SOCIAL
			ETHICS
			FISCAL
			overallKarma
		}
	}
`
// Soul component: gets the current company from path and displays the list of
// corresponding causes and their grades
class Soul extends React.Component {
  constructor(props) {
    super(props)
    const cookies = new Cookies() // get access to cookies
    this.authToken = cookies.get(AUTH_TOKEN) // if user is logged in authToken contains the tok
    this.userOnboarded = cookies.get('userOnboarded_soul') // if user has been onboarded contains the token
    this.refetch = null
  }

  state = {
    grading: false,
    help: false, //when true, displays the SoulHelpInterface component
    modalIsOpen: false, //when true, displays the LoginToGradeModal
    stepsEnabled: false,
    initialStep: 0,
    steps: SOUL_STEPS,
  }

  componentDidMount() {
    if (!this.userOnboarded) {
      this.setState(previousState => {
        previousState.stepsEnabled = true
        return previousState
      })
    }

    console.log('Mount')
    if (this.refetch) {
      this.refetch()
    }
  }

  // this function checks if the user is logged in
  // if user is logged in, then it sends him to the environment cause page (see
  // Cause component) in grading mode
  // if user is not logged in, then it opens the LoginToGradeModal
  _startGrading = () => {
    if (this.authToken) {
      this.props.history.push({
        pathname: `/company/${this.props.match.params.companyId}/cause/ENVIRONMENT/`,
        state: { startGrading: true },
      })
    } else {
      this.setState(previousState => {
        previousState.modalIsOpen = true
        window.scrollTo(0, 0)
        return previousState
      })
    }
  }

  // Event handler to close the LoginToGrade modal
  _closeModal = () => {
    this.setState(previousState => {
      previousState.modalIsOpen = false
      return previousState
    })
  }

  // Event handler to open the Help interface
  _openHelp = () => {
    this.setState(previousState => {
      previousState.help = true
      return previousState
    })
  }

  // Event handler to close the Help interface
  _closeHelp = () => {
    this.setState(previousState => {
      previousState.help = false
      return previousState
    })
  }

  _launchTutorial = () => {
    this.setState(previousState => {
      previousState.stepsEnabled = true
      return previousState
    })
  }

  _endTutorial = () => {
    this.setState(previousState => {
      previousState.stepsEnabled = false
      return previousState
    })
    if (!this.userOnboarded) {
      const cookies = new Cookies()
      cookies.set('userOnboarded_soul', 'true', {
        path: '/',
      })
    }
  }

  render() {
    const companyId = this.props.match.params.companyId // gets companyId from path

    return (
      // first fetch the data
      <Query query={CAUSE_GRADES_QUERY} variables={{ companyId }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <div> Loading... </div>
          if (error) {
            return <div> Error: {error.message} </div>
          }

          this.refetch = refetch

          // If data succesfully fetched, then it's split between two consts
          // one holding all the grades and one holding only the overall karma
          const causeGrades = data.companyCauseGrades
          const overallKarma = causeGrades.overallKarma

          return (
            <BlurOnModal blur={this.state.modalIsOpen}>
              <Steps
                enabled={this.state.stepsEnabled}
                steps={this.state.steps}
                initialStep={this.state.initialStep}
                onExit={this._endTutorial}
                options={{
                  showStepNumbers: false,
                  overlayOpacity: 0.01,
                  showBullets: false,
                  hidePrev: true,
                  hideNext: true,
                  nextLabel: 'Suivant',
                  doneLabel: 'Terminé',
                }}
              />
              <SoulHeader
                companyId={companyId}
                overallKarma={overallKarma}
                type={'global'}
                causeGrades={causeGrades}
                pb={0}
              />
              <Box pb={120}>
                <Grid>
                  <Row justifyContent="center">
                    {// for every cause, call the CauseCard component feeding it
                      // the karma, cause label and companyId
                      Object.keys(causeGrades).map(
                        (identifier, i) =>
                          CAUSE_AND_ACTS[identifier] && (
                            <Col key={i} md={10} mb="42px">
                              <CauseCard
                                companyId={companyId}
                                causeKarma={causeGrades[identifier]}
                                identifier={identifier}
                                tutorial={i === 0}
                              />
                            </Col>
                          ),
                      )}
                  </Row>
                </Grid>
              </Box>
              {// only display if state allows
                this.state.help && (
                  <SoulHelpInterface
                    companyId={companyId}
                    _closeHelp={this._closeHelp}
                    _launchTutorial={this._launchTutorial}
                    _endTutorial={this._endTutorial}
                    stepsEnabled={this.state.stepsEnabled}
                  />
                )}
              <LoginToGradeModal
                isOpen={this.state.modalIsOpen}
                _closeModal={this._closeModal}
              />
              <GradeKarmaButton _startGrading={this._startGrading} />
              <HelpButton _openHelp={this._openHelp} />
            </BlurOnModal>
          )
        }}
      </Query>
    )
  }
}

export default Soul
