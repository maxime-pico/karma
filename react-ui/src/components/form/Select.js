import React from 'react'
import { styled } from '@smooth-ui/core-sc'

const SelectInput = styled.select`
height: 2.5rem;
margin-left: 0.8rem;
`;

class Select extends React.Component {

  state = {
    options: [],
  }

  constructor(props) {
    super(props)
    this.state.options = this.props.options;
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.handleChange(event)
  }

  render() {
    return (

      <SelectInput value={this.props.model} onChange={this.handleChange}>
        {this.state.options.map((sort, index) => (
          <option key={'sort-' + index} value={sort.value}>{sort.name['fr']}</option>
        ))}
      </SelectInput>

    )
  }
}

export default Select
