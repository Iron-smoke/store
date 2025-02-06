function detectDevice() {
    if (localStorage.getItem('redirectDone')) return;

    let isMobile = /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent);

    if (isMobile && window.location.pathname !== "/mobile.html") {
        localStorage.setItem('redirectDone', 'true');
        window.location.href = window.location.origin + "/mobile.html";  // Указываем полный путь
    }
    else if (!isMobile && window.location.pathname !== "/index.html") {
        localStorage.setItem('redirectDone', 'true');
        window.location.href = window.location.origin + "/index.html";  // Указываем полный путь
    }
}

detectDevice();




detectDevice();
document.addEventListener("DOMContentLoaded", function() {
    /* ===== Основная логика категорий и разделов ===== */
    const categories = document.querySelectorAll(".category-panel .col");
    const btnRows = document.querySelectorAll(".btn-row");
    const productCards = document.querySelectorAll(".product-cards");

    // Функция для скрытия всех карточек (основной сайт)
    function hideAllCards() {
        productCards.forEach(card => {
            card.classList.add("disabled");
        });
    }

    // Функция для показа карточек по категории и разделу (основной сайт)
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

    function resetActiveStates() {
        categories.forEach(category => category.classList.remove("active"));
        btnRows.forEach(row => {
            row.classList.remove("active");
            const buttons = row.querySelectorAll("button");
            buttons.forEach(button => button.classList.remove("active"));
        });
    }

    // Устанавливаем активную категорию и раздел (для основного сайта)
    function setActive(categoryName, sectionName) {
        resetActiveStates();

        // Активируем выбранную категорию
        categories.forEach(category => {
            if (category.getAttribute("data-category") === categoryName) {
                category.classList.add("active");
            }
        });

        // Активируем ряд кнопок и нужный раздел
        btnRows.forEach(row => {
            if (row.getAttribute("data-category") === categoryName) {
                row.classList.add("active");
                const buttons = row.querySelectorAll("button");
                buttons.forEach(button => {
                    if (button.getAttribute("data-section") === sectionName) {
                        button.classList.add("active");
                    }
                });
            }
        });

        // Показываем карточки для выбранного раздела (на основном сайте)
        hideAllCards();
        showCards(categoryName, sectionName);
    }

    // Устанавливаем категорию "Кошки" и раздел "Игрушки" по умолчанию
    setActive("cats", "toys-cat");

    // Обработчик кликов по категориям
    categories.forEach(category => {
        category.addEventListener("click", function() {
            const categoryName = this.getAttribute("data-category");
            const btnRow = document.querySelector(`.btn-row[data-category="${categoryName}"]`);
            let sectionName = "toys"; // значение по умолчанию
            if (btnRow) {
                const firstButton = btnRow.querySelector("button");
                sectionName = firstButton ? firstButton.getAttribute("data-section") : "toys";
            }
            setActive(categoryName, sectionName);
            // Если функция обновления слайдера доступна (на мобилках), обновляем его:
            if (typeof window.updateSlider === "function") {
                window.updateSlider(categoryName, sectionName);
            }
        });
    });

    // Обработчик кликов по кнопкам разделов
    btnRows.forEach(row => {
        const buttons = row.querySelectorAll("button");
        buttons.forEach(button => {
            button.addEventListener("click", function() {
                const categoryName = row.getAttribute("data-category");
                const sectionName = this.getAttribute("data-section");
                setActive(categoryName, sectionName);
                if (typeof window.updateSlider === "function") {
                    window.updateSlider(categoryName, sectionName);
                }
            });
        });
    });
    const defaultCategory = "cats";
    const defaultBtnRow = document.querySelector(`.btn-row[data-category="${defaultCategory}"]`);
    const defaultSection = defaultBtnRow && defaultBtnRow.querySelector("button")
        ? defaultBtnRow.querySelector("button").getAttribute("data-section")
        : "toys";
    setActive(defaultCategory, defaultSection);

// мобильный слайдер

const sliderWrapper = document.querySelector(".slider-wrapper");
const prevButton = document.querySelector(".slider-button.prev");
const nextButton = document.querySelector(".slider-button.next");

// Скрываем оригинальные карточки на мобильных (чтобы показывался слайдер)
function hideOriginalCards() {
    const mobileCards = document.querySelectorAll(".product-cards");
    mobileCards.forEach(card => {
        card.classList.add("d-none");
    });
}

    // Обновить слайдер с карточками текущего раздела
    function updateSlider(category, section) {
        sliderWrapper.innerHTML = ""; // очищаем слайдер
        const activeCards = document.querySelectorAll(
            `.product-cards[data-category="${category}"][data-section="${section}"] .card`
        );
        activeCards.forEach(card => {
            const sliderCard = card.cloneNode(true);
            sliderCard.classList.add("slider-card");
            sliderWrapper.appendChild(sliderCard);
        });
        // Сбрасываем позицию слайдера
        showSlide(0);
    }



    window.updateSlider = updateSlider;

    // Логика переключения слайдов
    let currentSlide = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll(".slider-wrapper .slider-card");
        const totalSlides = slides.length;
        if (totalSlides === 0) return;
        currentSlide = Math.min(Math.max(index, 0), totalSlides - 2);
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
    const initialSection = "toys-cat";
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


document.querySelectorAll('.toggle-icon-blog').forEach((button) => {
    button.addEventListener('click', () => {
        const blogCard = button.closest('.blog-card'); // Находим родительский блок
        blogCard.classList.toggle('active'); // Переключаем класс "active"

        const blogExtra = blogCard.querySelector('.blog-extra');
        if (blogCard.classList.contains('active')) {
            // Устанавливаем точную высоту для плавного открытия
            blogExtra.style.maxHeight = blogExtra.scrollHeight + 'px';
        } else {
            // Возвращаем высоту в 0 для закрытия
            blogExtra.style.maxHeight = '0';
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
const questionCounter = document.getElementById("question-counter"); // Счетчик вопросов

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
        // Скрываем прогресс-бар, вопрос и счетчик вопросов
        progressBar.parentElement.style.display = "none";
        questionElement.style.display = "none";
        questionCounter.style.display = "none";
        return;
    }

    // Анимация исчезновения текущего вопроса
    questionElement.classList.add("fade-out");
    optionsElement.classList.add("fade-out");

    // Ждём завершения анимации исчезновения перед загрузкой нового вопроса
    setTimeout(() => {
        // Удаляем старые классы анимации исчезновения
        questionElement.classList.remove("fade-out");
        optionsElement.classList.remove("fade-out");

        // Отображаем прогресс-бар, вопрос и обновляем счетчик
        progressBar.parentElement.style.display = "block";
        questionElement.style.display = "block";

        const totalSteps = quizData.filter(q => !q.id.startsWith("result")).length;
        questionCounter.textContent = `Вопрос №${step + 1}`;
        questionCounter.style.display = "block"; // Показываем счетчик

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

        // Анимация появления нового вопроса
        questionElement.classList.add("slide-fade-in");
        optionsElement.classList.add("slide-fade-in");

        // Убираем классы анимации появления через 0.5 секунд
        setTimeout(() => {
            questionElement.classList.remove("slide-fade-in");
            optionsElement.classList.remove("slide-fade-in");
        }, 500);

        updateProgress();
        updateBackButton();
    }, 500); // Ждём завершения анимации исчезновения (0.5 секунды)
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

        resultSection.classList.add("fade-in"); // Класс анимации
        resultCard.innerHTML = `
            <div class="card">
                <h3>${resultData.title}</h3>
                <p class="description-text">${resultData.description}</p>
                <img src="${resultData.image}" alt="${resultData.title}" class="card-img">
                <p class="card-reccomended-title">С этим кормом выбирают:</p>
                <div class="related-cards">
                    <div class="related-card">
                        <p class="card-reccomended-description">${resultData.descriptionrec1}</p>
                        <img src="${resultData.relatedImage}" alt="" class="related-img">
                    </div>
                    <div class="related-card">
                        <p class="card-reccomended-description">${resultData.descriptionrec2}</p>
                        <img src="${resultData.relatedImage2}" alt="" class="related-img related-img-2">
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


document.addEventListener("DOMContentLoaded", function () {
    // Селекторы для footer-ссылок и основной секции
    const footerLinks = document.querySelectorAll(".footer-link");
    const productSection = document.querySelector(".product-section");

    // Обработчик кликов на кнопки в footer
    footerLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Предотвращаем стандартное поведение ссылки

            const category = this.getAttribute("data-category");
            const section = this.getAttribute("data-section");

            // Скроллим к .product-section
            if (productSection) {
                productSection.scrollIntoView({ behavior: "smooth" });
            }

            // Имитируем клик на соответствующую кнопку внутри .product-section
            setTimeout(() => {
                const targetButton = document.querySelector(
                    `.btn-row[data-category="${category}"] button[data-section="${section}"]`
                );
                if (targetButton) {
                    targetButton.click();
                }
            }, 500); // Добавляем задержку для плавного скролла
        });
    });
});


// document.addEventListener("DOMContentLoaded", function () {
//     document.querySelectorAll(".footer-link").forEach(link => {
//         link.addEventListener("click", function (e) {
//             e.preventDefault();
//
//             let targetSection = this.getAttribute("data-target");
//
//             // Закрываем все секции перед открытием новой
//             document.querySelectorAll(".product-cards").forEach(section => {
//                 section.classList.add("disabled");
//             });
//
//             // Открываем нужную секцию
//             let targetElement = document.querySelector(`.product-cards[data-section="${targetSection}"]`);
//             if (targetElement) {
//                 targetElement.classList.remove("disabled");
//                 targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
//             }
//         });
//     });
// });

// Получаем все изображения
const images = document.querySelectorAll('.hero-image');

// Для каждого изображения устанавливаем последовательную задержку анимации
images.forEach((image, index) => {
    // Генерируем задержку для каждого изображения, начиная с 0s и добавляя 0.3s для каждого следующего
    const delay = index * 1 + 's'; // Увеличиваем задержку для каждого изображения на 0.3 секунды

    // Применяем эту задержку к каждому изображению
    image.style.animationDelay = delay;
});


document.querySelectorAll(".footer-link").forEach(link => {
    link.addEventListener("click", function () {
        console.log("Клик по ссылке:", this.getAttribute("data-target"));
    });
});

document.getElementById("toggle-about").addEventListener("click", function() {
    let content = document.getElementById("about-content");
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
});

document.getElementById("hide-about").addEventListener("click", function() {
    document.getElementById("about-content").style.maxHeight = null;
});


document.getElementById("toggle-about").addEventListener("click", function() {
    let content = document.getElementById("about-content");
    let arrow = document.querySelector(".about-toggle-button .arrow");
    if (content.classList.contains("open")) {
        content.style.maxHeight = "0";
        content.classList.remove("open");
        arrow.style.transform = "rotate(0deg)";
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add("open");
        arrow.style.transform = "rotate(180deg)";
    }
});

document.getElementById("hide-about").addEventListener("click", function() {
    let content = document.getElementById("about-content");
    let arrow = document.querySelector(".about-toggle-button .arrow");
    content.style.maxHeight = "0";
    content.classList.remove("open");
    arrow.style.transform = "rotate(0deg)";
});

document.getElementById('toggle-about').addEventListener('click', function() {
    this.classList.toggle('rotated');
});


// Находим элементы мобильной секции
const sections = [
    {
        toggleButton: document.getElementById('mobile-toggle-blog'),
        hideButton: document.getElementById('mobile-hide-blog'),
        content: document.getElementById('mobile-blog-content'),
        isOpen: true // Начальное состояние
    },
    {
        toggleButton: document.getElementById('mobile-toggle-blog1'),
        hideButton: document.getElementById('mobile-hide-blog1'),
        content: document.getElementById('mobile-blog-content1'),
        isOpen: true // Начальное состояние
    },
    {
        toggleButton: document.getElementById('mobile-toggle-blog2'),
        hideButton: document.getElementById('mobile-hide-blog2'),
        content: document.getElementById('mobile-blog-content2'),
        isOpen: false
    },
    {
        toggleButton: document.getElementById('mobile-toggle-blog3'),
        hideButton: document.getElementById('mobile-hide-blog3'),
        content: document.getElementById('mobile-blog-content3'),
        isOpen: false
    },
    {
        toggleButton: document.getElementById('mobile-toggle-blog4'),
        hideButton: document.getElementById('mobile-hide-blog4'),
        content: document.getElementById('mobile-blog-content4'),
        isOpen: false
    }
];

// Пробегаем по всем секциям и вешаем обработчики
sections.forEach(section => {
    if (!section.toggleButton || !section.hideButton || !section.content) {
        console.error('Ошибка: один из элементов не найден.');
        return;
    }

    // Если секция изначально открыта, добавляем классы
    if (section.isOpen) {
        section.content.classList.add('open');
        section.toggleButton.classList.add('active');
    }

    section.toggleButton.addEventListener('click', function () {
        section.isOpen = !section.isOpen;
        section.content.classList.toggle('open', section.isOpen);
        section.toggleButton.classList.toggle('active', section.isOpen);
    });

    section.hideButton.addEventListener('click', function () {
        section.isOpen = false;
        section.content.classList.remove('open');
        section.toggleButton.classList.remove('active');

        // Плавный скролл к кнопке
        section.toggleButton.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Логика мобильного блога


let articles = [];            // Все статьи из JSON
let filteredArticles = [];    // Статьи, отфильтрованные по выбранной категории
let currentIndex = 0;         // Индекс текущей статьи в отфильтрованном массиве
let currentCategory = "кошки"; // Значение по умолчанию

// Список категорий
const categories = ["кошки", "собаки", "грызуны", "рыбки", "птицы","для всех"];

// Функция загрузки статей
function fetchArticles() {
    fetch('./articles.json')
        .then(response => response.json())
        .then(data => {
            articles = data;
            // Фильтруем статьи по умолчанию (кошки)
            filteredArticles = articles.filter(article => article.category === currentCategory);
            renderCategories(); // Рендерим кнопки категорий
            renderSlider();     // Рендерим слайдер
            renderPagination();
        })
        .catch(error => console.error('Ошибка загрузки:', error));
}

// Функция рендера кнопок категорий
function renderCategories() {
    const container = document.getElementById("articles-container");

    // Если у тебя нет отдельного контейнера для категорий, создадим его
    let categoryContainer = document.querySelector(".category-container");
    if (!categoryContainer) {
        categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");
        container.prepend(categoryContainer);
    }
    categoryContainer.innerHTML = ""; // Очистим перед рендером

    // Создаем кнопки для каждой категории
    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.textContent = category;
        btn.classList.add("category-btn");
        // Добавляем класс active, если категория совпадает с текущей
        if (category === currentCategory) {
            btn.classList.add("active");
        }
        btn.addEventListener("click", () => {
            // При клике меняем текущую категорию и фильтруем статьи
            currentCategory = category;
            // Сбросим индекс до нуля, чтобы показать первую статью выбранной категории
            currentIndex = 0;
            filteredArticles = articles.filter(article => article.category === currentCategory);
            // Обновляем UI: перерисовываем категории, слайдер и пагинацию
            renderCategories();
            updateUI();
        });
        categoryContainer.appendChild(btn);
    });
}

// Функция рендера слайдера
function renderSlider() {
    const container = document.getElementById("articles-container");
    container.innerHTML = "";  // Очистка контейнера перед рендером

    // Добавляем контейнер для категорий (если их еще нет)
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");
    container.appendChild(categoryContainer);
    // Рендерим категории
    renderCategories();

    // Создаем основной контейнер слайдера
    const sliderContainer = document.createElement("div");
    sliderContainer.classList.add("slider-container-mobile");

    // Создаем блок статьи
    const articleBlock = document.createElement("div");
    articleBlock.classList.add("article-block");

    // Создаем заголовок статьи и контейнер для изображения и навигации
    const articleHeader = document.createElement("div");
    articleHeader.classList.add("article-header");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("article-image-container");

    const articleImage = document.createElement("img");
    articleImage.classList.add("article-image");
    articleImage.alt = "Картинка";
    imageContainer.appendChild(articleImage);

    // Кнопка "предыдущая" со стрелкой
    const prevButton = document.createElement("button");
    prevButton.classList.add("slider-nav", "prev");
    prevButton.innerHTML = `<svg viewBox="0 0 24 24">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
  </svg>`;
    prevButton.addEventListener("click", () => changePage(currentIndex - 1));

    // Кнопка "следующая" со стрелкой
    const nextButton = document.createElement("button");
    nextButton.classList.add("slider-nav", "next");
    nextButton.innerHTML = `<svg viewBox="0 0 24 24">
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
  </svg>`;
    nextButton.addEventListener("click", () => {
        if (currentIndex < filteredArticles.length - 1) {
            changeArticleWithAnimation(currentIndex + 1);
        }
    });

    imageContainer.appendChild(prevButton);
    imageContainer.appendChild(nextButton);

    // Контейнер для заголовка и кнопки "toggle"
    const titleWrapper = document.createElement("div");
    titleWrapper.classList.add("title-wrapper");

    const articleTitle = document.createElement("h3");
    articleTitle.classList.add("article-title");
    articleTitle.textContent = "Заголовок статьи"; // Заглушка, обновится динамически

    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle-button");
    toggleButton.innerHTML = `<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.4999 33.9167C27.0143 33.9167 33.9166 27.0144 33.9166 18.5C33.9166 9.98565 27.0143 3.08337 18.4999 3.08337C9.98553 3.08337 3.08325 9.98565 3.08325 18.5C3.08325 27.0144 9.98553 33.9167 18.4999 33.9167Z" stroke="#FFFEFE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.3333 18.5L18.4999 24.6667L24.6666 18.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18.5 12.3334V24.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
    toggleButton.addEventListener("click", function () {
        toggleArticle(toggleButton);
    });

    titleWrapper.appendChild(articleTitle);
    titleWrapper.appendChild(toggleButton);

    const articleInfo = document.createElement("div");
    articleInfo.classList.add("article-info");
    articleInfo.appendChild(titleWrapper);

    articleHeader.appendChild(imageContainer);
    articleHeader.appendChild(articleInfo);

    articleBlock.appendChild(articleHeader);

    const articleContent = document.createElement("div");
    articleContent.classList.add("article-content");
    articleContent.innerHTML = `<p class="article-text"></p>`;
    articleBlock.appendChild(articleContent);

    sliderContainer.appendChild(articleBlock);
    container.appendChild(sliderContainer);

    updateUI();
}

// Обновление содержимого статьи (используем filteredArticles)
function updateArticle() {
    if (!filteredArticles.length) {
        console.warn("Нет статей для выбранной категории");
        return;
    }
    const article = filteredArticles[currentIndex];
    const articleBlock = document.querySelector(".article-block");
    const contentBlock = document.querySelector(".article-content");

    // Меняем фон блока по значению color из JSON
    articleBlock.style.backgroundColor = article.color;
    contentBlock.style.backgroundColor = article.color;
    // Обновляем изображение
    articleBlock.querySelector(".article-image").src = article.image;
    // Добавляем нумерацию к заголовку (если в JSON нет поля id, используем индекс + 1)
    const articleNumber = article.id || (currentIndex + 1);
    articleBlock.querySelector(".article-title").textContent = `${articleNumber}. ${article.title}`;
    // Обновляем содержимое статьи
    articleBlock.querySelector(".article-text").textContent = article.content;
    // Сбрасываем состояние содержимого (свернуто)
    const content = articleBlock.querySelector(".article-content");
    content.classList.remove("visible");

    content.scrollTop = 0;
}

// Переключение состояния раскрытия содержимого с плавной анимацией
function toggleArticle(button) {
    const content = document.querySelector(".article-content");
    content.classList.toggle("visible");
    button.classList.toggle("open");  // Меняем класс для стрелки
}

// Обновление UI: обновляем статью и пагинацию
function updateUI() {
    updateArticle();
    renderPagination();
}

// Функция для переключения страниц и слайдера (используем filteredArticles)
function changePage(newIndex) {
    if (newIndex >= 0 && newIndex < filteredArticles.length) {
        currentIndex = newIndex;
        updateUI();
    }
}

// Функция рендера пагинации
function renderPagination() {
    const container = document.getElementById("articles-container");
    let paginationContainer = document.querySelector(".pagination");

    if (!paginationContainer) {
        paginationContainer = document.createElement("div");
        paginationContainer.classList.add("pagination");
        container.appendChild(paginationContainer);
    } else {
        paginationContainer.innerHTML = "";
    }

    const totalPages = filteredArticles.length;
    const maxVisiblePages = 4;
    let startPage = Math.max(0, currentIndex - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(0, endPage - maxVisiblePages);
    }

    // Кнопка "предыдущая" для пагинации
    const prevButton = document.createElement("button");
    prevButton.innerHTML = `<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.4999 33.9167C27.0143 33.9167 33.9166 27.0144 33.9166 18.5C33.9166 9.98565 27.0143 3.08337 18.4999 3.08337C9.98553 3.08337 3.08325 9.98565 3.08325 18.5C3.08325 27.0144 9.98553 33.9167 18.4999 33.9167Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.3333 18.5L18.4999 24.6667L24.6666 18.5"
      transform="rotate(90 18.5 18.5)"
      stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18.5 12.3334V24.6667"
      transform="rotate(-90 18.5 18.5)"
      stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
    prevButton.disabled = currentIndex === 0;
    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            changeArticleWithAnimation(currentIndex - 1);
        }
    });
    paginationContainer.appendChild(prevButton);

    // Нумерация страниц
    for (let i = startPage; i < endPage; i++) {
        const pageItem = document.createElement("span");
        // Здесь можно выводить номер страницы или id статьи, как тебе удобнее
        pageItem.textContent = filteredArticles[i].id;
        pageItem.classList.add("page-item");
        if (i === currentIndex) {
            pageItem.classList.add("active");
        }
        pageItem.addEventListener("click", () => {
            changeArticleWithAnimation(i);
        });
        paginationContainer.appendChild(pageItem);
    }

    // Кнопка "следующая" для пагинации
    const nextButton = document.createElement("button");
    nextButton.innerHTML = `<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.4999 33.9167C27.0143 33.9167 33.9166 27.0144 33.9166 18.5C33.9166 9.98565 27.0143 3.08337 18.4999 3.08337C9.98553 3.08337 3.08325 9.98565 3.08325 18.5C3.08325 27.0144 9.98553 33.9167 18.4999 33.9167Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.3333 18.5L18.4999 24.6667L24.6666 18.5"
      transform="rotate(-90 18.5 18.5)"
      stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18.5 12.3334V24.6667"
      transform="rotate(90 18.5 18.5)"
      stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
    nextButton.disabled = currentIndex === totalPages - 1;
    nextButton.addEventListener("click", () => {
        if (currentIndex < totalPages - 1) {
            changeArticleWithAnimation(currentIndex + 1);
        }
    });
    paginationContainer.appendChild(nextButton);
}

// Функция переключения статьи с анимацией
function changeArticleWithAnimation(newIndex) {
    const articleBlock = document.querySelector(".article-block");
    articleBlock.style.opacity = "0";
    setTimeout(() => {
        currentIndex = newIndex;
        updateArticle();
        renderPagination();
        articleBlock.style.opacity = "1";
    }, 300);
}

// При загрузке страницы получаем статьи
document.addEventListener("DOMContentLoaded", fetchArticles);
