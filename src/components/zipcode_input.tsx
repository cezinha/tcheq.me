import React from 'react';
import { Form } from 'react-bootstrap';

interface IProps {
  placeholder?: string,
  onChange?: Function,
  onBlur?: Function,
  value?: string,
  name: string,
  isInvalid: boolean
}

interface IState {
  zipcode?: string
}

class ZipcodeInput extends React.Component<IProps, IState> {
  inputField:any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      zipcode: this.props.value
    };
  }

  handleChange(e) {
    let oTxt:string = e.target.value;
    oTxt = oTxt.replace('-', '');
    oTxt = oTxt.replace(/[^0-9]/, '');
    if (oTxt.length > 5) {
      oTxt = oTxt.substr(0, 5) + '-' + oTxt.substr(5);

      if (oTxt.length > 9) {
        oTxt = oTxt.substr(0, 9);
      }
    }
    e.target.value = oTxt;
    if (this.props.onChange !== undefined) {
      this.props.onChange(e);
    }

    this.setState({zipcode: oTxt});
  };

  render() {
    return (
      <Form.Control
        type="text"
        name={this.props.name}
        // ref={(inputField) => (this.inputField = inputField)}
        value={this.state.zipcode}
        onChange={this.handleChange.bind(this)}
        onBlur={() => this.props.onBlur}
        placeholder={this.props.placeholder}
        isInvalid={this.props.isInvalid}
      />
    );
  }
}

export default ZipcodeInput;