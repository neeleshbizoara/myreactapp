import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import formField from './formFields';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmail'


class SurveyForm extends Component {
    renderFields() {
        return _.map(formField, ({label, name}) => {
            return <Field key={name} type="text" name={name} component={SurveyField} label={label}/> 
        });
    }
    render() {
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/survey" className="red btn-flat white-text">
                    CANCEL
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                    Next
                    <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        )
    }
}

function validate(values){
    const errors = {}
    errors.recipients = validateEmails(values.recipients || '');
    _.each(formField, ({name, noValueError}) => {
        if(!values[name]) {
            errors[name] = noValueError;
        }
    });
   
    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);