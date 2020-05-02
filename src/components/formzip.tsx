import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  Form
} from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { RootState } from '../store';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeZipcode, thunkSaveForm } from '../store/actions/form';
import ZipcodeInput from '../components/zipcode_input';
import { fmt } from '..';
import { Formik, FormikProps, FormikErrors } from 'formik';
import { thunkFindLocation } from '../store/actions/location';

const mapState = (state: RootState) => ({
  zipcode: state.form.zipcode,
  dataSaved: state.form.dataSaved
});

const mapDispatch = (dispatch) => bindActionCreators({
  onZipcodeChanged: (zipcode) => dispatch(changeZipcode(zipcode)),
  saveForm: () => thunkSaveForm(),
  findLocation: () => thunkFindLocation()
}, dispatch);

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type IProps = PropsFromRedux;

interface FormValues {
  zipcode: string
}

// type FormProps = FormValues;
interface FormState {
  isSubmitting: boolean
}

class FormZip extends React.PureComponent<IProps, FormState> {
  isSubmitting: boolean;

  constructor(props:IProps) {
    super(props);

    this.state = {
      isSubmitting: false
    }
  }

  render() {
    if (this.props.dataSaved) {
      //alert(this.props.dataSaved);
      window.location.href = '/my-location';
    }
    const zipcodeChanged = (values) => {
      this.props.onZipcodeChanged(values.zipcode);
      this.props.findLocation();
      this.props.saveForm();
    }
    return(
      <Formik
        initialValues={{ zipcode: this.props.zipcode }}
        validate={values => {
          let errors : FormikErrors<FormValues> = { };
          if (!values.zipcode) {
            errors.zipcode = 'Required';
          } else if (!(/^[0-9]{5}$/i.test(values.zipcode)) && !(/^([0-9]{5}-[0-9]{3})$/i.test(values.zipcode))) {
            errors.zipcode = 'Invalid Zip Code';
          }
          return errors;
        }}
        onSubmit={async (values, {setSubmitting}) => {
          await new Promise(resolve => setTimeout(resolve, 500));
          console.log(JSON.stringify(values, null, 2));
          zipcodeChanged(values);
          setSubmitting(false);
        }}
      >
        {(formikBag: FormikProps<FormValues>) => {
          const {
            values,
            errors,
            //touched,
            handleChange,
            //handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          } = formikBag;

          /*let handleSubmit = event => {
            alert('aqui');
            event.preventDefault();
            this.setState({ isSubmitting: true });
            const { formValues, formValidity } = this.state;
            if (Object.values(formValidity).every(Boolean)) {
              alert("Form is validated! Submitting the form...");
              this.setState({ isSubmitting: false });
            } else {
              for (let key in formValues) {
                let target = {
                  name: key,
                  value: formValues[key]
                };
                this.handleValidation(target);
              }
              this.setState({ isSubmitting: false });
            }
          };*/

          return(
            // (value) => this.props.onZipCodeChanged(value)
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="formZipCode">
                <Form.Label>
                  <FormattedMessage id="app.register.question.zipcode"
                  defaultMessage="Digite o seu CEP:"
                  description="Zip Code Label"/>
                </Form.Label>
                <ZipcodeInput
                  placeholder={fmt({id:'app.register.question.zipcode.placeholder'})}
                  name="zipcode"
                  value={values.zipcode}
                  onChange={handleChange}
                  isInvalid={!!errors.zipcode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.zipcode}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="primary" size="lg" block disabled={isSubmitting}>
                {(isSubmitting) ? 'Loading' : <FormattedMessage id="app.register.button.next"
                defaultMessage="Próximo"
                description="Next Button Label"/>}
              </Button>{' '}
            </Form>
          );
        }}
      </Formik>
    );
  }
}

export default connector(FormZip);