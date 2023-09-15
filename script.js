// 전체 문제 수와 정답 수를 저장하기 위한 변수를 선언합니다.
let totalQuestions = 0;
let correctAnswers = 0;

// 문서가 로드되었을 때의 이벤트를 설정합니다.
document.addEventListener('DOMContentLoaded', function() {
    // 초기 문제를 생성합니다.
    generateQuestion();

    // 텍스트 박스에 Enter 키를 눌렀을 때의 이벤트를 바인딩합니다.
    document.getElementById('answer').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
});

// 무작위로 알파벳 또는 숫자를 화면에 표시하는 함수입니다.
function generateQuestion() {
    // 0과 1 사이의 무작위 숫자를 생성하여 알파벳을 표시할지 숫자를 표시할지 결정합니다.
    const isAlpha = Math.random() > 0.5;
    if (isAlpha) {
        // A~Z 사이의 무작위 알파벳을 생성합니다.
        let randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        document.getElementById('question').innerText = randomLetter;
    } else {
        // 1~26 사이의 무작위 숫자를 생성합니다.
        let randomNumber = Math.floor(Math.random() * 26) + 1;
        document.getElementById('question').innerText = randomNumber;
    }
}

// 사용자의 답을 확인하는 함수입니다.
function checkAnswer() {
    // 현재 문제와 사용자의 답을 가져옵니다.
    const question = document.getElementById('question').innerText;
    const userAnswer = document.getElementById('answer').value;
    
    // 문제가 알파벳인 경우 순번에 해당하는 숫자를, 숫자인 경우 해당하는 알파벳을 정답으로 설정합니다.
    const correctAnswer = isNumeric(question) ? String.fromCharCode(64 + parseInt(question)) : (question.charCodeAt(0) - 64).toString();
    
    // 전체 문제 수를 증가시킵니다.
    totalQuestions++;

    // 사용자의 답이 정답인 경우
    if (userAnswer === correctAnswer) {
        correctAnswers++;
        addHistoryItem(question, userAnswer, true);
        generateQuestion();
    } else {
        // 사용자의 답이 틀린 경우
        addHistoryItem(question, userAnswer, false);
    }

    // 정답률을 업데이트합니다.
    updateAccuracy();
    
    // 텍스트 박스를 초기화하고 포커스를 유지합니다.
    const answerInput = document.getElementById('answer');
    answerInput.value = '';
    answerInput.focus();
}

// 숫자인지 판별하는 함수입니다.
function isNumeric(value) {
    return /^\d+$/.test(value);
}

// 사용자의 답과 그 결과를 히스토리에 추가하는 함수입니다.
function addHistoryItem(question, answer, isCorrect) {
    const li = document.createElement('li');
    li.innerText = `문제: ${question}, 답: ${answer}, 결과: ${isCorrect ? '맞음' : '틀림'}`;
    document.getElementById('history').appendChild(li);
}

// 정답률을 계산하고 화면에 표시하는 함수입니다.
function updateAccuracy() {
    const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(2);
    document.getElementById('accuracy').innerText = `${accuracy}%`;
}