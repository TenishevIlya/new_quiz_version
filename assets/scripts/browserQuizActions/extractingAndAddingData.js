// in checkbox case when we have more than one answer and answers are separated by commas
function extractStringToArray(str) {
    let currentLetter = 0;
    let currentComma = 0;
    let resultedArray = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ',') {
            currentComma = i;
            resultedArray.push(str.slice(currentLetter,currentComma));
            currentLetter = i + 1;
        }
    }
    resultedArray.push(str.slice(currentComma+1,str.length));
    return resultedArray;
}


// getting our final results
function addAnswerToFinalResults(userAnswer) {
    let formElement = formEl.elements;
    let index = resultsDataLength(allResults);
    let currentAnswerArray = [];
    userAnswer = selectAnswerOrNot(formElement);
    if(!inputValidation(userAnswer)) {
        return;
    }
    else {
        let checkUserAnswer = checkTheAnswer(userAnswer,questionsArray[index].answer); 
        allResults[String(index+1)] = String(checkUserAnswer);
        currentAnswerArray.push(userAnswer);
        currentAnswers.push(currentAnswerArray);
    }
}

function extractAnswersListValue(inputEls) {  // getting answers data from json database
    let result = [];
    if (isTextControl(inputEls)) { 
        result.push(inputEls.value); 
    }
    else if (inputEls.type === 'select-one') {
        result.push(inputEls.value); 
    }
    else {
        for (let el of inputEls) {
            if (el.checked) {
                result.push(el.dataset.value);
            }
        }
    }
    return result;
}