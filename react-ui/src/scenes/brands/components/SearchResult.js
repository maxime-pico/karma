/*
Here is a component called by Search.js that renders the brand "cards" on the
/brand page, based on the information provided by the parent component
 */

// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { KARMA_LABELS } from '../../../utils'

// <STYLE>
const ResultCard = styled.div`
	border-radius: 30px;
	min-height: 80px;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin-right: 5rem;
  margin-bottom: 4rem;
  box-sizing: border-box;

  &:nth-child(5n+5) {
    @media(min-width: 1200px) {
      margin-right: 0;
    }
  }
  &:nth-child(4n+4) {
    @media (min-width: 990px) and (max-width: 1200px) {
      margin-right: 0;
    }
  }
  &:nth-child(3n+3) {
    @media (min-width: 768px) and (max-width: 990px) {
      margin-right: 0;
    }
  }
  &:nth-child(2n+2) {
    @media (max-width: 768px) {
      margin-right: 0;
    }
  }
  @media (max-width: 768px) {
    margin-right: 3.2vw;
  }

  .square {
    position: relative;
    background-color: white;
    height: 18.4rem;
    width: 18.4rem;
    border-radius: 3rem;
    display: flex;
    align-items:center; 

    @media(max-width: 1200px) {
      height: 19.8rem;
      width: 19.8rem;
    }

    @media(max-width: 990px) {
      height: 20.1rem;
      width: 20.1rem;
    }

    @media(max-width: 768px) {
      height: 43.1vw;
      width: 43.1vw;
    }

    @media(max-width: 576px) {
      height: 45vw;
      width: 45vw;
    }
  }	

	&:hover {
    cursor: pointer;
    
    img{
      transform: scale(1.2);
    }
  }
  
  img{
    display: block;
    margin: auto;
    transition: transform 0.5s ease;
    transform: scale(1);
  }
`

const CompanyName = styled.div`
	color: #a9b4cc;
  font-size: 1.5rem;
  text-align: center;
  margin-top: 1rem;
`

const KarmaBadge = styled.div`
  position: absolute;
  width: 3.5rem;
  height: 3.5rem;
  background-color: #f0f0f0;
  color: #D7CFC7;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 1.3rem;
  font-weight: bold;

  &.vb {
    background-color: #B52832;
    color: white;
  }
  &.b{
    background-color: #B4586D;
    color: white;
  }
  &.n{
    background-color: #D7CFC7;
    color: white;
  }
  &.g{
    background-color: #89DFDC;
    color: white;
  }
  &.vg{
    background-color: #28CBC8;
    color: white;
  }
`
// </STYLE>

// Declare types of expected props
type Props = {
  name: string,
  id: string,
  logo: string,
  karma: Float,
}

// SearchResult component: displays the company card based on the name, and
// logo provided. Also adds a link to the relevant brand page based on the id
class SearchResult extends React.Component {

  state = {
    karmaSlug : '',
    karmaTitle : ''
  }

  constructor(props) {
    super(props)
    if(this.props.karma) {
      this.state.karmaSlug = this.getKarmaSlugByValue(this.props.karma);
      this.state.karmaTitle = KARMA_LABELS[this.state.karmaSlug].label['fr']
    } else {
      //this.state.karmaSlug = 'Non nôté';
      this.state.karmaTitle = 'Non nôté'
    }
  }

  getKarmaSlugByValue(val) {
    if(val){
      if(val == 0) {
        return 'n';
      } else {
        if(val >= 1) {
          return (val >= 2) ? 'vg' : 'g';
        }else{
          if(val < 0) {
            return (val >= -1) ? 'b' : 'vb';
          } else {
            return 'n';
          }
        }
      }
    }else {
      return 'na'
    }
  }

  render() {
    return (
      <ResultCard >
        <Link
          to={`/company/${this.props.id}`}
          style={{ textDecoration: 'none' }}
          title={this.props.name + ' - ' + this.state.karmaTitle}
        >
          <div class="square">
            <img
              src={process.env.PUBLIC_URL + '/images/' + this.props.logo}
              width="80"
              alt="company"
            />
            <KarmaBadge  className={this.state.karmaSlug}>{this.props.karma ? (this.props.karma) : ('N/A')}</KarmaBadge>
          </div>
          <CompanyName>{this.props.name}</CompanyName>
        </Link>
      </ResultCard>
      )
    }
  }


export default SearchResult
