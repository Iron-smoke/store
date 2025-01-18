// логика раздела "Категори товаров //

document.addEventListener("DOMContentLoaded", function () {
    const categories = document.querySelectorAll(".category-panel .col");
    const btnRows = document.querySelectorAll(".btn-row");
    const productCards = document.querySelectorAll(".product-cards");

    // Функция для скрытия всех карточек
    function hideAllCards() {
        productCards.forEach(card => {
            card.classList.add("disabled");
        });
    }

    // Функция для показа карточек по категории и разделу
    function showCards(category, section) {
        productCards.forEach(card => {
            if (
                card.getAttribute("data-category") === category &&
                card.getAttribute("data-section") === section
            ) {
                card.classList.remove("disabled");
            }
        });
    }

    // Сбрасываем активные состояния для всех категорий и кнопок разделов
    function resetActiveStates() {
        categories.forEach(category => category.classList.remove("active"));
        btnRows.forEach(row => {
            const buttons = row.querySelectorAll("button");
            buttons.forEach(button => button.classList.remove("active"));
        });
    }

    // Устанавливаем активную категорию и раздел
    function setActive(categoryName, sectionName) {
        resetActiveStates();

        // Устанавливаем активную категорию
        categories.forEach(category => {
            if (category.getAttribute("data-category") === categoryName) {
                category.classList.add("active");
            }
        });

        // Показываем кнопки разделов для категории
        btnRows.forEach(row => {
            row.classList.remove("active");
            if (row.getAttribute("data-category") === categoryName) {
                row.classList.add("active");

                // Устанавливаем активный раздел
                const buttons = row.querySelectorAll("button");
                buttons.forEach(button => {
                    if (button.getAttribute("data-section") === sectionName) {
                        button.classList.add("active");
                    }
                });
            }
        });

        // Показываем карточки для выбранного раздела
        hideAllCards();
        showCards(categoryName, sectionName);
    }

    // Устанавливаем категорию "Кошки" и раздел "Игрушки" по умолчанию
    setActive("cats", "toys");

    // Обработчик кликов по категориям
    categories.forEach(category => {
        category.addEventListener("click", function () {
            const categoryName = this.getAttribute("data-category");
            setActive(categoryName, "toys"); // По умолчанию выбираем "Игрушки"
        });
    });

    // Обработчик кликов по кнопкам разделов
    btnRows.forEach(row => {
        const buttons = row.querySelectorAll("button");
        buttons.forEach(button => {
            button.addEventListener("click", function () {
                const categoryName = row.getAttribute("data-category");
                const sectionName = this.getAttribute("data-section");
                setActive(categoryName, sectionName);
            });
        });
    });
});

// мобильный слайдер

document.addEventListener("DOMContentLoaded", function () {
    const sliderWrapper = document.querySelector(".slider-wrapper");
    const prevButton = document.querySelector(".slider-button.prev");
    const nextButton = document.querySelector(".slider-button.next");

    // Скрыть оригинальные карточки на мобильной версии
    function hideOriginalCards() {
        const productCards = document.querySelectorAll(".product-cards");
        productCards.forEach(card => {
            card.classList.add("d-none");
        });
    }

    // Обновить слайдер с карточками текущего раздела
    function updateSlider(category, section) {
        sliderWrapper.innerHTML = ""; // Очищаем слайдер перед добавлением карточек

        // Получаем карточки из текущей категории и раздела
        const activeCards = document.querySelectorAll(
            `.product-cards[data-category="${category}"][data-section="${section}"] .card`
        );

        // Добавляем карточки в слайдер
        activeCards.forEach(card => {
            const sliderCard = card.cloneNode(true); // Клонируем карточку
            sliderCard.classList.add("slider-card"); // Добавляем класс для стилей
            sliderWrapper.appendChild(sliderCard);
        });

        // Сбрасываем текущую позицию слайдера
        showSlide(0);
    }


    // Логика переключения слайдов
    let currentSlide = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll(".slider-wrapper .slider-card");
        const totalSlides = slides.length;

        if (totalSlides === 0) return; // Если нет карточек, ничего не делать

        // Ограничиваем индекс для зацикливания
        currentSlide = Math.min(Math.max(index, 0), totalSlides - 2);

        // Смещаем слайдер
        sliderWrapper.style.transform = `translateX(-${currentSlide * 48.5}%)`;
    }

    // Обработчики для кнопок слайдера
    prevButton.addEventListener("click", () => showSlide(currentSlide - 1));
    nextButton.addEventListener("click", () => showSlide(currentSlide + 1));

    // Обновляем слайдер при переключении категории или раздела
    const buttons = document.querySelectorAll(".btn-row button");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.closest(".btn-row").getAttribute("data-category");
            const section = this.getAttribute("data-section");

            // Обновляем карточки слайдера
            updateSlider(category, section);
        });
    });

    // Инициализация слайдера для начального состояния
    const initialCategory = "cats";
    const initialSection = "toys";
    hideOriginalCards(); // Скрываем оригинальные карточки
    updateSlider(initialCategory, initialSection);
});


//логика Категория --> раздел

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn-row button");
    const productCards = document.querySelectorAll(".product-cards");

    // Скрыть все карточки
    function hideAllCards() {
        productCards.forEach(card => {
            card.classList.add("disabled");
        });
    }

    // Показать карточки по категории и разделу
    function showCards(category, section) {
        productCards.forEach(card => {
            if (
                card.getAttribute("data-category") === category &&
                card.getAttribute("data-section") === section
            ) {
                card.classList.remove("disabled");
            }
        });
    }

    // Обработчик кликов
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.closest(".btn-row").getAttribute("data-category");
            const section = this.getAttribute("data-section");

            hideAllCards();
            showCards(category, section);
        });
    });
});


// работа слайдера карточек на мобильной версии
document.addEventListener("DOMContentLoaded", function () {
    const sliderWrapper = document.querySelector(".slider-wrapper");
    const productCards = document.querySelectorAll(".product-card");
    const prevButton = document.querySelector(".slider-button.prev");
    const nextButton = document.querySelector(".slider-button.next");

    let currentIndex = 0;
    const cardsToShow = 2; // Количество карточек на экране
    const cardWidth = productCards[0].offsetWidth + 16; // Ширина карточки + gap

    function updateSlider() {
        sliderWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    nextButton.addEventListener("click", () => {
        if (currentIndex < productCards.length - cardsToShow) {
            currentIndex++;
            updateSlider();
        }
    });

    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // Обновление при изменении размера окна
    window.addEventListener("resize", () => {
        updateSlider();
    });
});

// логика раздела вопросы


document.querySelectorAll('.toggle-answer').forEach(button => {
    button.addEventListener('click', function () {
        const faqBlock = this.closest('.faq-block');
        faqBlock.classList.toggle('active');
    });
});




document.querySelectorAll('.faq-mobile .faq-header').forEach(header => {
    header.addEventListener('click', function () {
        const faqItem = this.closest('.faq-item'); // Находим родительский блок
        const faqContent = faqItem.querySelector('.faq-content'); // Текст ответа
        const icon = this.querySelector('svg'); // Иконка

        if (faqItem.classList.contains('active')) {
            // Закрытие
            faqContent.style.height = `${faqContent.scrollHeight}px`; // Устанавливаем текущую высоту
            window.getComputedStyle(faqContent).height; // Триггер перерисовки
            faqContent.style.height = '0'; // Уменьшаем высоту до 0
            faqItem.classList.remove('active');
            icon.style.transform = 'rotate(0deg)'; // Возвращаем иконку в исходное положение
        } else {
            // Открытие
            faqContent.style.height = `${faqContent.scrollHeight}px`; // Высота по содержимому
            faqItem.classList.add('active'); // Активный класс
            icon.style.transform = 'rotate(180deg)'; // Поворот иконки вниз

            // Сбрасываем height на auto после завершения анимации
            faqContent.addEventListener('transitionend', function setAutoHeight() {
                if (faqItem.classList.contains('active')) {
                    faqContent.style.height = 'auto';
                }
                faqContent.removeEventListener('transitionend', setAutoHeight);
            });
        }
    });
});

// раздел блога


document.querySelectorAll('.toggle-icon').forEach(button => {
    button.addEventListener('click', function () {
        const card = this.closest('.blog-card');
        const isActive = card.classList.contains('active');

        // Закрываем все карточки
        document.querySelectorAll('.blog-card').forEach(otherCard => {
            otherCard.classList.remove('active');
            otherCard.querySelector('.blog-extra').style.display = 'none';
        });

        // Открываем текущую карточку
        if (!isActive) {
            card.classList.add('active');
            card.querySelector('.blog-extra').style.display = 'block';
        }
    });
});

// раздел наши магазины
document.querySelectorAll('.btn-location').forEach((button) => {
    button.addEventListener('click', () => {
        // Убираем активный класс со всех кнопок
        document.querySelectorAll('.btn-location').forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        // Скрываем все экраны и показываем нужный
        document.querySelectorAll('.screen').forEach((screen) => screen.classList.remove('active'));
        const screenId = button.getAttribute('data-screen');
        document.getElementById(screenId).classList.add('active');
    });
});

// Логика слайдера
document.querySelectorAll('.slider').forEach(slider => {
    const images = slider.querySelectorAll('.slider-images img');
    let currentIndex = 0;

    const showImage = (index) => {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index); // Показываем только активное изображение
        });
    };

    slider.querySelector('.left-arrow').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    slider.querySelector('.right-arrow').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    // Инициализация
    showImage(currentIndex);
});



// логика работы квиза

let quizData = [];
let currentStep = 0;
let progress = 0;
const stepHistory = []; // Для хранения истории шагов
const userAnswers = {};

const questionElement = document.getElementById("quiz-question");
const optionsElement = document.getElementById("quiz-options");
const progressBar = document.querySelector(".progress");
const backButton = document.getElementById("back-button");
const resultSection = document.querySelector(".quiz-result");
const resultCard = document.getElementById("result-card");
const restartButton = document.getElementById("restart-button"); // Кнопка "Заново"

// Загружаем данные из JSON
async function loadQuizData() {
    try {
        const response = await fetch('./quiz-data.json'); // Указываем путь к JSON-файлу
        quizData = await response.json();
        loadQuestion(currentStep); // Загружаем первый вопрос
    } catch (error) {
        console.error("Ошибка загрузки данных квиза:", error);
    }
}

// Загружаем вопрос
function loadQuestion(step) {
    const currentData = quizData[step];

    if (!currentData) {
        console.error(`Данные для шага ${step} не найдены.`);
        return;
    }

    // Проверяем, является ли текущий шаг результатом
    if (currentData.id.startsWith("result")) {
        showResult(currentData.id);
        // Скрываем прогресс-бар и вопрос
        progressBar.parentElement.style.display = "none";
        questionElement.style.display = "none";
        return;
    }

    // Если это не результат, отображаем прогресс-бар и вопрос
    progressBar.parentElement.style.display = "block";
    questionElement.style.display = "block";

    questionElement.innerText = currentData.question || "Вопрос не задан";
    optionsElement.innerHTML = "";

    if (currentData.options && currentData.options.length > 0) {
        currentData.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.className = "quiz-option";
            button.innerText = option;
            button.dataset.value = currentData.values[index];
            button.addEventListener("click", () => handleAnswer(currentData, button.dataset.value));
            optionsElement.appendChild(button);
        });
    }

    updateProgress();
    updateBackButton();
}

// Обрабатываем ответ пользователя
function handleAnswer(currentData, answer) {
    userAnswers[currentData.id] = answer;
    stepHistory.push(currentStep); // Сохраняем текущий шаг в историю

    const nextStepId = currentData.next[currentData.values.indexOf(answer)];
    const nextStepIndex = quizData.findIndex(q => q.id === nextStepId);

    if (nextStepIndex !== -1) {
        currentStep = nextStepIndex;
        loadQuestion(currentStep);
    } else {
        console.error(`Следующий шаг с ID ${nextStepId} не найден.`);
    }
}

// Обновляем прогресс
function updateProgress() {
    const totalSteps = quizData.filter(q => !q.id.startsWith("result")).length;
    progress = ((stepHistory.length + 1) / totalSteps) * 100;
    progressBar.style.width = `${progress}%`;
}

// Обновляем видимость кнопки "Назад"
function updateBackButton() {
    backButton.classList.toggle("d-none", stepHistory.length === 0);
}

// Возврат к предыдущему вопросу
function handleBack() {
    if (stepHistory.length > 0) {
        currentStep = stepHistory.pop(); // Возвращаемся к предыдущему шагу
        loadQuestion(currentStep);
    }
}

// Показываем результат
function showResult(resultId) {
    const resultData = quizData.find(result => result.id === resultId);

    if (resultData) {
        optionsElement.innerHTML = "";
        resultSection.classList.remove("d-none");
        resultCard.innerHTML = `
            <div class="card">
                <h3>${resultData.title}</h3>
                <p>${resultData.description}</p>
                <img src="${resultData.image}" alt="${resultData.title}" class="card-img">
                <p>С этим товаром выбирают:</p>
                <div class="related-cards">
                    <div class="related-card">
                        <p>${resultData.descriptionrec1}</p>
                        <img src="${resultData.relatedImage}" alt="Рекомендуемый товар 1" class="related-img">
                    </div>
                    <div class="related-icon">
                        <span>+</span>
                    </div>
                    <div class="related-card">
                        <p>${resultData.descriptionrec2}</p>
                        <img src="${resultData.relatedImage2}" alt="Рекомендуемый товар 2" class="related-img related-img-2">
                    </div>
                    <div class="related-icon">
                        <span>+</span>
                    </div>
                    <div class="related-card">
                        <p>${resultData.descriptionrec3}</p>
                        <img src="${resultData.relatedImage2}" alt="Рекомендуемый товар 2" class="related-img related-img-3">
                    </div>
                </div>
            </div>
        `;

        // Удаляем кнопку "Назад"
        backButton.classList.add("d-none");

        // Показываем кнопку "Заново"
        restartButton.classList.remove("d-none");
        restartButton.style.display = "inline-block"; // Делаем видимой
    } else {
        console.error("Результат с таким ID не найден:", resultId);
    }
}

// Сбрасываем квиз в начальное состояние
function restartQuiz() {
    currentStep = 0;
    progress = 0;
    stepHistory.length = 0;
    resultSection.classList.add("d-none");
    loadQuestion(currentStep);
    updateProgress();

    // Скрываем кнопку "Заново"
    restartButton.classList.add("d-none");
    restartButton.style.display = "none";
}

// Добавляем обработчик на кнопку "Заново"
restartButton.addEventListener("click", restartQuiz);

// Событие для кнопки "Назад"
backButton.addEventListener("click", handleBack);

// Инициализация
loadQuizData(); // Загружаем данные и начинаем квиз

// прокрутка

document.addEventListener("DOMContentLoaded", () => {
    const scrollToTopButton = document.querySelector(".scroll-to-top");

    scrollToTopButton.addEventListener("click", () => {
        // Прокрутка к якорю с ID "dog-hero"
        const targetElement = document.getElementById("dog-hero");
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
// кнопка наверх

/**
 * Реализация бесконечного слайдера с плавной прокруткой на JavaScript.
 */

/**
 * Реализация бесконечного слайдера с равномерной прокруткой на JavaScript.
 */

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".partner-brands__track");
    const items = Array.from(track.children);
    const itemWidth = items[0].offsetWidth; // Ширина одного элемента
    const gap = parseInt(window.getComputedStyle(track).gap) || 0; // Расстояние между элементами

    // Дублируем элементы для бесконечности
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    // Устанавливаем начальные параметры
    let currentPosition = 0;
    const totalWidth = (itemWidth + gap) * items.length; // Полная ширина оригинальных элементов

    // Настраиваем скорость (в пикселях за шаг)
    const speed = 2; // Скорость прокрутки: 2px за шаг
    const intervalTime = 20; // Частота обновления: каждые 20 мс

    const updateSliderPosition = () => {
        currentPosition -= speed; // Равномерное смещение

        // Если прокрутка достигла конца, возвращаемся к началу
        if (Math.abs(currentPosition) >= totalWidth) {
            currentPosition = 0;
        }

        track.style.transform = `translateX(${currentPosition}px)`;
    };

    // Запускаем слайдер
    let sliderInterval = setInterval(updateSliderPosition, intervalTime);

    // Остановка анимации при наведении мыши
    track.addEventListener("mouseover", () => {
        clearInterval(sliderInterval);
    });

    track.addEventListener("mouseout", () => {
        sliderInterval = setInterval(updateSliderPosition, intervalTime);
    });
});








