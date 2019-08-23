import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { CAUSE_AND_ACTS } from '../../../../services/constants.js'
import { convertGradesIntoColors } from '../../../../services/utils'
import { Row, Col, styled } from '@smooth-ui/core-sc'

const TitleCol = styled(Col)`
	text-align: ${props => props.align};
	@media (max-width: 540px) {
		text-align: center;
	}
`

const Title = styled.span`
	font-size: 26px;
	font-weight: 600;
`

const RoundWindow = styled.div`
	height: ${props => props.size}px;
	width: ${props => props.size}px;
	border-radius: ${props => props.size}px;
	overflow: hidden;
	background-color: ${props => props.color};
	margin: auto;
	position: relative;
  top: -40px;
  display: flex;
  align-items: center;
  justify-content: center;

	img {
		height: 60%;
	}
	@media (max-width: 540px) {
		height: 100px;
		width: 100px;
		border-radius: 100px;
	}
`

const Push = styled.span`
	display: inline-block;
	height: 100%;
	vertical-align: middle;
`

const ActCardHeader = ({ act, grade, companyId, location }) => {
  const karmaColor = convertGradesIntoColors(grade)
  return (
    <div>
      <Row justifyContent="center">
        <Col md={4}>
          <RoundWindow size={80} color={karmaColor}>
            <Push />
            <img
              src={process.env.PUBLIC_URL + `/icons/act/${act}.png`}
              alt={act}
            />
          </RoundWindow>
        </Col>
      </Row>
      <Row justifyContent="center" mt={'-24px'}>
        <TitleCol xs={10} md={8} align="left">
          <Link to={`${location.pathname}act/${act}`}>
            <Title>{CAUSE_AND_ACTS[act].fr}</Title>
          </Link>
        </TitleCol>
        <TitleCol xs={10} md={2} align="right">
          <Title>{grade !== null ? grade : 'N/A'}</Title>
        </TitleCol>
      </Row>
    </div>
  )
}

export default withRouter(ActCardHeader)
