function generateDynamicForm(element,elementsSize) {
    let controlEl = {};
    let controlHTML = '';
    let selectHTML = '';
    if (isTextControl(element)) {
        controlEl = new TextControl(element);
        controlHTML += controlEl.generateTextControl();
    }
    else if (isSelectControl(element)) {
        controlEl = new SelectControl(element); 
        for (let answer of element.answers) {
            selectHTML += controlEl.generateOption(answer.title,answer.value);
        } 
        controlHTML += controlEl.generateSelectControl(selectHTML);
    }
    else {                                                                               // radio or checkbox cases
        controlEl = new InputTypedControl(element);
        for (let answer of element.answers) {
            controlHTML += controlEl.generateInputTypedControl(answer.title,answer.value);
        }
    }
    let container = generateControlContainer(element,controlHTML,elementsSize,counter.getCounter()+1);
    counter.icrementCounter();
    attachToForm(container);
}

function generateDynamicFilledForm(element,elementsSize,prevAnswer) {
    let controlEl = {};
    let controlHTML = '';
    let selectHTML = '';
    if (isTextControl(element)) {
        controlEl = new TextControl(element);
        controlHTML += controlEl.generateFilledTextControl(prevAnswer);
    }
    else if (isSelectControl(element)) {
        controlHTML += generatePrevSelect(selectHTML,element,prevAnswer);
    }
    if (!isSelectControl(element) && !isTextControl(element)) {               // radio or checkbox cases
        controlEl = new InputTypedControl(element);
        if (isAnyCommas(toString(prevAnswer))) {
            controlHTML += generatePrevCheckboxes(element,controlEl,prevAnswer);
        }
        else {
            controlHTML += generatePrevRadios(element,controlEl,prevAnswer);
        }
    }
    counter.decrementCounter();
    let container = generateControlContainer(element,controlHTML,elementsSize,counter.getCounter());
    attachToForm(container);
}