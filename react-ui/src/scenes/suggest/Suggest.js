import React from 'react'
import Cookies from 'universal-cookie'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN, DELIBERATION_STEPS } from '../../services/constants'
import { Grid, Row, Col, Box, styled } from '@smooth-ui/core-sc'
import { Steps } from 'intro.js-react'
import { Link } from 'react-router-dom'
import SearchResult from './components/SearchResult'
import SuggestBrandModal from './components/SuggestBrandModal'
import LoginToSuggestModal from '../../components/modals/LoginToSuggestModal'


const BlurOnModal = styled(Box)`
	filter: ${props => props.blur};
	margin-bottom: ${props => props.marginbottom};
`

const Title = styled.div`
	font-size: 30px;
	font-weight: 900;
	color: #545a66;
	text-align: left;
	margin-bottom: 42px;
`

const COMPANY_LIST = gql`
	query CompanyList {
		allCompanies(orderBy: name_ASC) {
			id
			name
			logo
		}
	}
`

// Deliberation component: gets the current act and company from path and
// displays the list of corresponding opinions
class Suggest extends React.Component {


  state = {
    loginToSuggestModalIsOpen: false,
    suggestModalIsOpen: false,
  }

  constructor(props) {
    super(props)
    const cookies = new Cookies() // get access to cookies
    this.authToken = cookies.get(AUTH_TOKEN) // if user is logged in authToken contains the token
    this.userOnboarded = cookies.get('userOnboarded_deliberation') // if user has been onboarded contains the token
  }

  _upVote = () => {
    if (this.authToken) {
      // UPVOTE MUTATION
      console.log('Update query')
    } else {
      this.setState(previousState => {
        previousState.loginToSuggestModalIsOpen = true
        window.scrollTo(0, 0)
        return previousState
      })
    }
  }

  _suggestBrand = () => {
    if (this.authToken) {
      this.setState(previousState => {
        previousState.suggestModalIsOpen = true
        previousState.loginToSuggestModalIsOpen = false
        return previousState
      })
    } else {
      this.setState(previousState => {
        previousState.loginToSuggestModalIsOpen = true
        window.scrollTo(0, 0)
        return previousState
      })
    }
  }

  _closeLoginToSuggestModal = () => {
    this.setState(previousState => {
      previousState.loginToSuggestModalIsOpen = false
      return previousState
    })
  }

  _closeSuggestModal = () => {
    this.setState(previousState => {
      previousState.suggestModalIsOpen = false
      return previousState
    })
  }

  render() {
    return (
      <div>

        <h1>Suggestions</h1>

        <Query query={COMPANY_LIST}>
          {({ loading, error, data }) => {
            if (loading) return <div> Loading... </div>
            if (error) return <div> Error </div>

            // companyList is an Object that contains the result of the query: id,
            // name, logo of all companies, ordered by name
            const companyList = data.allCompanies

            //This maps each item in the object to a SearchResult component inside
            //the grid that has layed out
            return (
              <Grid>

                <button onClick={this._suggestBrand} >Proposer une marque</button>

                <Row justifyContent={{ md: 'center' }} mt={'96px'}>
                  <Col md={8}>
                    <Row my={4} justifyContent={{ md: 'center' }}>
                      {companyList.map((company, i) => (
                        <SearchResult
                          key={i}
                          name={company.name}
                          id={company.id}
                          logo={company.logo}
                          _upvote={this._upVote}
                        />
                      ))}
                    </Row>
                  </Col>
                </Row>
              </Grid>
            )
          }}
        </Query>

        <LoginToSuggestModal
          isOpen={this.state.loginToSuggestModalIsOpen}
          _closeModal={this._closeLoginToSuggestModal}
        />

        <SuggestBrandModal
          isOpen={this.state.suggestModalIsOpen}
          _closeModal={this._closeSuggestModal}
        />

      </div>
    )
  }
}

export default Suggest
