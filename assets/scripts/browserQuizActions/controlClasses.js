class CustomConrtol {

    constructor({type}) {
        this.type = type;
    }
}

class InputTypedControl extends CustomConrtol {

    constructor({type}) {
        super({type});
    }

    generateInputTypedControl(title,value) {
        return `
            <label class="${this.type}-row">
                <input type="${this.type}" name="${FIELD_NAME}" data-value="${value}" class="${this.type}-input">
                <span class="${this.type}-case"></span>
                    ${title}  
            </label>            
        `;
    }

    generateFilledInputTypedControl(title,value) {
        return `
                <label class="${this.type}-row">
                    <input type="${this.type}" name="${FIELD_NAME}" data-value="${value}" checked class="${this.type}-input">
                    <span class="${this.type}-case"></span>
                        ${title}  
                </label>            
        `;
    }
}

class SelectControl extends CustomConrtol {
    
    constructor({type}) {
        super({type});
    }

    generateSelectControl(option) {
        return `
            <select name="${FIELD_NAME}">
                ${option}
            </select>`;
    }

    generateOption(title,value) {
        return `<option value="${value}">
                    ${title}
                </option>`;
    }

    generateSelectedOption(title,value) {
        return `<option selected value="${value}">
                    ${title}
                </option>`;
    }
}

class TextControl extends CustomConrtol {
    
    constructor({type}) {
        super({type});
    }

    generateTextControl() {
        return `
		    <input type="text" name="${FIELD_NAME}" class="input-text" placeholder="Ответ">
	    `;        
    }

    generateFilledTextControl(answerValue) {
        return `
		    <input type="text" value="${answerValue}" name="${FIELD_NAME}" class="input-text" placeholder="Ответ">
	    `;    
    }
}