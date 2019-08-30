import React from 'react'
import styled from 'styled-components'

const Loader = styled.div`
  display: inline-block;
  width: 64px;
  height: 64px;

  &:after {
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #545A66;
    border-color: #545A66 transparent #545A66 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
`
class BasicLoader extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Loader>

      </Loader>
    )
  }

}

export default BasicLoader
