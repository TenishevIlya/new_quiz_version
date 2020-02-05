function generatePrevSelect(selectHTML,element,prevAnswer) {
    let controlEl = new SelectControl(element); 
        for (let answer of element.answers) {
            if (toString(prevAnswer) === answer.value) {
                selectHTML += controlEl.generateSelectedOption(answer.title,prevAnswer);
            }
            else {
                selectHTML += controlEl.generateOption(answer.title,answer.value);    
            }
        } 
        return controlEl.generateSelectControl(selectHTML);
}

function generatePrevCheckboxes(element,controlEl,prevAnswer) {
    let checkboxControl = '';
    let currentQuestionAnswers = extractStringToArray(toString(prevAnswer));
    for (let answer of element.answers) {
        for (let elem of currentQuestionAnswers) {
            if (elem === toString(answer.value)) {
                checkboxControl += controlEl.generateFilledInputTypedControl(answer.title,answer.value);
                break;
            }   
            if (currentQuestionAnswers.indexOf(toString(answer.value)) === -1) {
                checkboxControl += controlEl.generateInputTypedControl(answer.title,answer.value);
                break; 
            } 
        }   
    }
    return checkboxControl;
}

function generatePrevRadios(element,controlEl,prevAnswer) {
    let radioControl = '';
    for (let answer of element.answers) {
        if (toString(prevAnswer) === toString(answer.value)) {
            radioControl  += controlEl.generateFilledInputTypedControl(answer.title,answer.value);
        } 
        else {
            radioControl  += controlEl.generateInputTypedControl(answer.title,answer.value);   
        }   
    }
    return radioControl;
}