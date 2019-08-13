/*
Here is a component called by Search.js that renders the brand "cards" on the
/brand page, based on the information provided by the parent component
 */

// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Row, Col } from '@smooth-ui/core-sc'

// <STYLE>
const ResultCard = styled.div`
	background-color: white;
	border-radius: 30px;
	min-height: 80px;
  font-weight: 500;
  display:flex;
  align-items:center;
  justify-content:center;
  height: 10rem;

	margin: auto;
	position: relative;
	box-sizing: border-box;

	&:hover {
		//border: solid 9px #cbcbcb;
    cursor: pointer;
    
    img{
      transform:scale(1.2);
    }
  }
  
  img{
    display: block;
    margin: auto;
    transition: transform 0.5s ease;
    transform:scale(1);
  }
`

const CompanyName = styled.div`
	color: #a9b4cc;
  font-size: 0.95rem;
  text-align: center;
`

const KarmaBadge = styled.div`
  position: absolute;
  width:3rem;
  height:3rem;
  background-color:red;
  right: 0;
  bottom: 0;
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
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
const SearchResult = (props: Props) => (
  <Col md={3} my={3}>
    <Link to={`/company/${props.id}`} style={{ textDecoration: 'none' }}>
      <ResultCard>
        <Row>
          <Col>
            <img
              src={process.env.PUBLIC_URL + '/images/' + props.logo}
              width="80"
              alt="company"
            />
          </Col>
        </Row>
        <KarmaBadge>{props.karma} 2.5</KarmaBadge>
      </ResultCard>
      <Row>
        <Col py={1}>
          <CompanyName>{props.name}</CompanyName>

        </Col>
      </Row>
    </Link>
  </Col>
)

export default SearchResult
