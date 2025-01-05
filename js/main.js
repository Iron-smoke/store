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
        currentSlide = (index + totalSlides) % totalSlides;

        // Смещаем слайдер
        sliderWrapper.style.transform = `translateX(-${currentSlide * 50}%)`;
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