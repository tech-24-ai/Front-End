import React from 'react';
import SimpleReactValidator from 'simple-react-validator';


class Form extends React.PureComponent {

    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            element: (message) => <div className="srv-validation-message invalid-feedback">{message}</div>
        });
    }

    handleError = () => {
        this.validator.showMessages();
        this.forceUpdate();
    }

    onChange = (event) => {
        event.persist()
        this.props.onChange(event)
        this.handleError();
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            this.props.onSubmit();
        } else {
            this.handleError();
        }
    }

    render() {
        const { formFields, values } = this.props
        let errors = {};
        connectFormFields.map(formField => {
            errors[formField.name] = this.validator.message(formField.name, form[formField.name], formField.validation)
        })
        return (
            <React.Fragment>
                <Form className="form-block consulting-form" noValidate onSubmit={this.onSubmit}>
                    {formFields && formFields.map((formField, index) => {

                        if (formField.type === 'text') {
                            return (
                                <FormGroup >
                                    <Label>{index + 1}. {formField.lable}</Label>
                                    <Input className={errors[formField.name] ? "is-invalid" : ""} type="text" name={formField.name} value={values[formField.name]} placeholder={formField.placeholder} autoComplete="off" onChange={this.onChange} />
                                    {errors[formField.name] && errors[formField.name]}
                                </FormGroup>
                            )
                        }


                        if (formField.type === 'textarea') {
                            return (
                                <FormGroup>
                                    <Label>{index + 1}. {formField.lable}</Label>
                                    <Input className={errors[formField.name] ? "textarea is-invalid" : "textarea"} type="textarea" name={formField.name} value={values[formField.name]} placeholder={formField.placeholder} rows="5" onChange={this.onChange} />
                                    {errors[formField.name] && errors[formField.name]}
                                </FormGroup>
                            )
                        }

                        if (formField.type === 'select') {
                            return (
                                <FormGroup>
                                    <Label>{index + 1}. {formField.lable}</Label>
                                    <Input className={errors[formField.name] ? "is-invalid" : ""} type="select" name={formField.name} value={values[formField.name]} placeholder={formField.placeholder} onChange={this.onChange}>
                                        <option selected hidden>{formField.placeholder}</option>
                                        {formField.options && formField.options.map((option) => {
                                            return (
                                                <option value={option.value}>{option.text}</option>
                                            )
                                        })}
                                    </Input>
                                    {errors[formField.name] && errors[formField.name]}
                                </FormGroup>
                            )
                        }
                    })}
                </Form>
            </React.Fragment>
        )
    }
}

export default Form;