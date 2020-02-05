// needed fo correct order of questions when we move backwards
function rewriteData(resultsArray,actualAnswers) {
    delete resultsArray[resultsDataLength(resultsArray)];
    actualAnswers.splice(actualAnswers.length-1,1);
}

function resultsDataLength(data) {
    return Object.keys(data).length;
}

function getQuestionsData(data) {
    for (let elem in data) {
        if (hasNextQuestion(data,elem)) {
            questionsArray.push(data[elem]);    
        } 
    }
}

// amount of all questions in test
function getIntermediateDataAndCountEls(data, currentTestData,counter) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].testTitle === testUrlEndpoint) {
            currentTestData[i] = data[i];
            counter++;
        }
    } 
    return counter;   
}

function getCorrectData(data,currentTestData,finalData,countElements) {
    for (let i = 0; i < countElements; i++) {
        for (let j = 0; j < data.length; j++) {
            if (currentTestData[j] !== undefined) {
                finalData[i] = currentTestData[j];
                break;
            }
        }
    }
}