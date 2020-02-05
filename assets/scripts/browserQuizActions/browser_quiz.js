/* html elements */
const questionBlock = document.querySelector('.question');
const formEl = document.querySelector('.js-form');
const controlWrapperEl = formEl.querySelector('.js-form-control');
const FIELD_NAME = "answer";
const testUrlEndpoint = localStorage.getItem("endpoint");


class Counter {

    constructor(counter) {
        this.counter = counter;
    }

    icrementCounter() {
        return this.counter++;
    }

    decrementCounter() {
        return this.counter--;
    }

    getCounter() {
        return this.counter;
    }
}

let counter = new Counter(0);

/* data containers */
let questionsArray = [];
let allResults = {};
let currentAnswers = [];


function hasNextQuestion(allQuestions,property) {
    return allQuestions.hasOwnProperty(property);
}

function showQuestion(data,direction,answer) {
    if (direction === 'forward') {
        generateDynamicForm(data[resultsDataLength(allResults)],data.length);
    }
    if (direction === 'back') {
        generateDynamicFilledForm(data[resultsDataLength(allResults)],data.length,answer);    
    }
    hideUnwantedWarnings(questionBlock,1);        
}


function generateControlContainer({question_text,type},control,size,id) {
    return `
        <h1 class="" data-translate="QUESTION_№${id}"> Вопрос: №${id} </h1>
        <p class="question-content"> ${question_text} </p>
        <div class="${type}-answers">
            ${control}
        </div>
        <hr>
        <div class="question-navigation">
            <button class="question-btn back-btn" type="reset"><i class="fas fa-arrow-left"></i></button>
            <span class="question-number"> Вопрос: ${id}/${size}</span>
            <button class="question-btn next-btn" type="submit" data-direction='forward'>
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>   
    `;    
}

function attachToForm(html) {
    let controlEl = document.createElement('div');
    controlEl.innerHTML = html;
    controlWrapperEl.append(controlEl);
    if (controlWrapperEl.children.length > 1) {
        controlWrapperEl.firstElementChild.replaceWith(controlEl); 
    }
}



function checkTheAnswer(answer,value) {
    return (value === answer) ? true : false;
}


/* shows info when we can`t go forward or backwards */
function addWarning(formElement,warningMessage) {
    formElement.insertAdjacentHTML('afterend', `<strong class="error">*${warningMessage}</strong>`);  
    hideUnwantedWarnings(questionBlock,2);
}

function hideUnwantedWarnings(domElem,index) {
    if (domElem.children.length > index) {
        domElem.children[index].innerHTML = '';
    }   
}

// starting quiz with first question
function runQuiz(length,dataFirst) {
    generateDynamicForm(dataFirst,length);        
}

function getDataAndRunQuiz() {
    fetch("http://localhost:3000/questions")
    .then((resp) => {
	   	return resp.json();
	})
	.then((data) => {
        let currentTestData = {};
        let finalData = {};
        let countElements = 0;
        countElements = getIntermediateDataAndCountEls(data, currentTestData,countElements);
        getCorrectData(data,currentTestData,finalData,countElements);
        getQuestionsData(currentTestData);
        runQuiz(countElements,finalData[0]);
    });
}


getDataAndRunQuiz(); 


formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    let userAnswer = toString(extractAnswersListValue(formEl.elements[FIELD_NAME]));
    addAnswerToFinalResults(userAnswer);
    if (!inputValidation(userAnswer)) {
        addWarning(formEl,"Введите ответ корректно");
    }
    else {
        if (hasNextQuestion(questionsArray,resultsDataLength(allResults))) {
            showQuestion(questionsArray,"forward");
        }
        else {
            showTable(allResults);
        }
    } 
});

formEl.addEventListener('reset', (event) => {
    event.preventDefault();
    let answer = currentAnswers[currentAnswers.length-1];
    if (hasNextQuestion(questionsArray,resultsDataLength(allResults)-1)) {
        rewriteData(allResults,currentAnswers);
        showQuestion(questionsArray,"back",answer);
    }   
    else {
        addWarning(formEl,"Нет предыдущего вопроса");
    }
});