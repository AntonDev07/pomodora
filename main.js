let countdown;
const displayTime = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    // clear all interval exist
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondLeft = Math.round((then - Date.now()) / 1000);
        // check second to stop function
        if(secondLeft < 0) {
            clearInterval(countdown);
            return;
        }

        //display it
        displayTimeLeft(secondLeft);
    }, 1000);
}
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

    displayTime.textContent = display;
    document.title = display;

}
function displayEndTime(timestamp) {
    const beBackAt = new Date(timestamp);

    const hours = beBackAt.getHours();
    const minutes = beBackAt.getMinutes();
    const adjustedHour = hours > 12 ? hours - 12 : hours;
    const dayOrNoon = hours > 12 ? 'PM' : 'AM';
    endTime.textContent = `Take a break At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes} ${dayOrNoon}`;
}
function startTimer(e) {
    const second = parseInt(this.dataset.time);
    timer(second);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = parseInt(document.customForm.minutes.value) * 60;
    timer(mins);
    this.reset();
})