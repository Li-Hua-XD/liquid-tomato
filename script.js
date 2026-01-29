let timeLeft = 25 * 60; 
let totalTime = 25 * 60; 
let timerId = null;

const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset'); // 确保 HTML 里有这个 ID
const circle = document.getElementById('progress'); 

const FULL_DASH_ARRAY = 880; 

function updateDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timeDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

    const timeFraction = timeLeft / totalTime;
    const offset = FULL_DASH_ARRAY - (timeFraction * FULL_DASH_ARRAY);
    circle.style.strokeDashoffset = offset;
}

// 核心逻辑：监听“开始”按钮
startBtn.addEventListener('click', () => {
    if (timerId === null) {
        // 开始运行
        startBtn.textContent = "暂停";
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(timerId);
                timerId = null;
                startBtn.textContent = "开始";
                alert("时间到！");
            }
        }, 1000);
    } else {
        // 暂停运行
        clearInterval(timerId);
        timerId = null;
        startBtn.textContent = "开始";
    }
});

// 核心逻辑：监听“重置”按钮
resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = totalTime;
    updateDisplay();
    startBtn.textContent = "开始";
});

// 初始化显示一次，防止页面打开时是空的
updateDisplay();