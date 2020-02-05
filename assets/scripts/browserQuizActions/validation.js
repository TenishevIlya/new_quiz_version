function isTextControl(control) {
    return (control.type === 'text') ? true : false;
}

function isSelectControl(control) {
    return (control.type === 'select') ? true : false;   
}

function getSelectTypeCase(formElement) {
    return formElement[0].type === 'select-one';    
}

function selectAnswerOrNot(formElement) {
    if (getSelectTypeCase(formElement)){
        return toString(extractAnswersListValue(formEl.elements[0]));
    }
    return toString(extractAnswersListValue(formEl.elements[FIELD_NAME]));
}

function inputValidation(answer) {
    return (stringValidation(answer)) ? (answer.trim() !== '') : (toString(answer).trim() !== '');
}