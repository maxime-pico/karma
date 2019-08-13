import React from 'react'
import { styled } from '@smooth-ui/core-sc'

const PrettyCheckboxLabel = styled.label`
  position: relative;
  cursor: pointer;
  margin: 0 0.1rem 0 0.1rem;
  padding: 0.2rem 0.4rem;
  font-size: 1.6rem;
`

const PrettyCheckboxInput = styled.input`
  cursor: pointer;
  position: absolute;
  z-index: 1;
  left: 0;
  opacity: 0;
  top: 0;
  width: 100%;
  height: 100%;

  &:checked {
    & ~ span {
      color: white;
      background-color:transparent;

      &::before {
        transform: scale(1);
      }
    }
  }
`

const PrettyCheckboxReplacer = styled.span`
  width: 100%;
  padding: 1rem 1.5rem;
  margin-bottom:1rem;
  border: 2px solid white;
  background-color:white;
  position: relative;
  display: flex;
  align-items : center;
  justify-content:center;
  border-radius: 3rem;
  color: #333;
  transition: all 0.1s ease;

  &:hover {
    background-color:#ccc;
  }

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: #45bcb6;
    position: absolute;
    padding: 0.5rem;
    left: 0;
    top: 0;
    transform: scale(0);
    transition: transform 0.1s ease;
    border-radius: 2rem;
    z-index: -2;
  }
`

class PrettyCheckbox extends React.Component {

  state = {
    title: '',
    name: '',
    checked: false,
    value: '',
  }

  constructor(props) {
    super(props)

    this.state.title = this.props.title
    this.state.name = this.props.name
    this.state.checked = this.props.checked
    this.state.value = this.props.value

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.handleChange(event)
  }

  render() {
    return (
      <PrettyCheckboxLabel>
        <PrettyCheckboxInput
          type="checkbox"
          checked={this.props.checked}
          value={this.state.value}
          name={this.state.name}
          onChange={this.handleChange}
        />
        <PrettyCheckboxReplacer>
          {this.state.title}
        </PrettyCheckboxReplacer>

      </PrettyCheckboxLabel>
    )
  }
}

export default PrettyCheckbox
