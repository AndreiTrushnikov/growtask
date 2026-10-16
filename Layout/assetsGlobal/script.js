function declineWord(number, form1, form2, form5) {
    const n = Math.abs(number) % 100;
    const n1 = n % 10;
    let answer = number;

    if (n > 10 && n < 20) return `${number} ${form5}`;
    if (n1 > 1 && n1 < 5) return `${number} ${form2}`;
    if (n1 === 1) return `${number} ${form1}`;
    return `${number} ${form5}`;
}

document.addEventListener("DOMContentLoaded", function () {
    // Работа аккордеонов
    const accordions = document.querySelectorAll('[data-el-type="accordion"]');
    if (accordions) {
        accordions.forEach((accordion) => {
            accordion.addEventListener('click', () => {
                if (accordion.classList.contains('show')) {
                    accordion.classList.remove('show');
                } else {
                    accordion.classList.add('show');
                }
            });
        });
    }

    // Работа с кастомными инпутами
    const customFormElements = new CustomFormElements();
    customFormElements.init();
})





