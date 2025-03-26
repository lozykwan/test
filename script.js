document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const minutesInput = document.getElementById('minutes');
    
    let timer;
    let totalSeconds = 0;
    let remainingSeconds = 0;
    let isRunning = false;
    let isPaused = false;
    
    // 初始化顯示
    updateDisplay(25 * 60);
    
    // 開始按鈕事件
    startBtn.addEventListener('click', startTimer);
    
    // 暫停按鈕事件
    pauseBtn.addEventListener('click', togglePause);
    
    // 停止按鈕事件
    stopBtn.addEventListener('click', resetTimer);
    
    // 時間輸入變化
    minutesInput.addEventListener('change', function() {
        if (!isRunning) {
            totalSeconds = parseInt(minutesInput.value) * 60;
            updateDisplay(totalSeconds);
        }
    });
    
    function startTimer() {
        if (isRunning && !isPaused) return;
        
        if (!isRunning) {
            totalSeconds = parseInt(minutesInput.value) * 60;
            if (isNaN(totalSeconds) || totalSeconds <= 0) {
                alert('請輸入有效的分鐘數！');
                return;
            }
            remainingSeconds = totalSeconds;
        }
        
        isRunning = true;
        isPaused = false;
        
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        stopBtn.disabled = false;
        minutesInput.disabled = true;
        
        timer = setInterval(updateCountdown, 1000);
    }
    
    function togglePause() {
        if (isPaused) {
            // 繼續計時
            timer = setInterval(updateCountdown, 1000);
            pauseBtn.textContent = '暫停';
            isPaused = false;
        } else {
            // 暫停計時
            clearInterval(timer);
            pauseBtn.textContent = '繼續';
            isPaused = true;
        }
    }
    
    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        isPaused = false;
        remainingSeconds = totalSeconds;
        updateDisplay(totalSeconds);
        
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        stopBtn.disabled = true;
        minutesInput.disabled = false;
        pauseBtn