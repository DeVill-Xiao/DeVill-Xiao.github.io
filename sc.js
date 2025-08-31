// Note: This assumes Glide.js is loaded from the HTML

import { fadeIn } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {

    const scheduleData = [
        { dayIndex: 1, dayName: 'Понедельник', lessons: [
            { time: '4 пара (13:10 - 14:30)', subject: 'Основы теории информации (ОТИ)', teacher: 'Ильичёва Татьяна Евгеньевна' },
            { time: '5 пара (14:50 - 16:10)', subject: 'МДК 01.01. Компьютерные сети', teacher: 'Ладовер Татьяна Михайловна' },
            { time: '6 пара (16:20 - 17:40)', isSplit: true, numerator: { subject: 'МДК 0.1.01 Компьютерные сети', teacher: 'Ладовер Татьяна Михайловна' }, denominator: { subject: 'МДК 04.01 Выполнение работ по профессиям рабочих 16199', teacher: 'Забелинская Наталья Александровна' } }
        ]},
        { dayIndex: 2, dayName: 'Вторник', lessons: [
            { time: '4 пара (13:10 - 14:30)', subject: 'Иностранный язык в профессиональной деятельности', teacher: 'Бессорабова / Орлова' },
            { time: '5 пара (14:50 - 16:10)', subject: 'Элементы высшей математики', teacher: 'Симонов Тимофей Александрович' },
            { time: '6 пара (16:20 - 17:40)', subject: 'История России', teacher: 'Безуглов Юрий Викторович' }
        ]},
        { dayIndex: 3, dayName: 'Среда', lessons: [
            { time: '4 пара (13:10 - 14:30)', subject: 'Элементы высшей математики', teacher: 'Симонов Тимофей Александрович' },
            { time: '5 пара (14:50 - 16:10)', subject: 'Основы Бережливого Производства / История России', teacher: 'Забелинская Наталья Александровна / Безуглов Юрий Викторович' },
            { time: '6 пара (16:20 - 17:40)', subject: 'МДК 04.01 Выполнение работ по профессиям рабочих 16199', teacher: 'Забелинская Наталья Александровна' }
        ]},
        { dayIndex: 4, dayName: 'Четверг', lessons: [
            { time: '4 пара (13:10 - 14:30)', subject: 'Основы электротехники', teacher: 'Морщавка Инна Исааковна' },
            { time: '5 пара (14:50 - 16:10)', subject: 'Основы Бережливого Производства', teacher: 'Забелинская Наталья Александровна' },
            { time: '6 пара (16:20 - 17:40)', subject: 'Элементы высшей математики', teacher: 'Симонов Тимофей Александрович' }
        ]},
        { dayIndex: 5, dayName: 'Пятница', lessons: [
            { time: '4 пара (null)', isSplit: true, numerator: { subject: 'Операционные системы и среды (ОСиС)', teacher: 'Мишанкина Лариса Геннадьевна' }, denominator: { subject: 'Основы электротехники', teacher: 'Морщавка Инна Исааковна' } },
            { time: '5 пара (null)', subject: 'Основы теории информации (ОТИ)', teacher: 'Ильичёва Татьяна Евгеньевна' },
            { time: '6 пара (null)', subject: 'Физкультура', teacher: 'Петина Ксения Сергеевна' }
        ]},
        { dayIndex: 6, dayName: 'Суббота', lessons: [
            { time: '4 пара (13:10 - 14:30)', subject: 'Операционные системы и среды (ОСиС)', teacher: 'Мишанкина Лариса Геннадьевна' },
            { time: '5 пара (14:50 - 16:10)', subject: 'Основы теории информации (ОТИ)', teacher: 'Ильичёва Татьяна Евгеньевна' },
            { time: '6 пара (16:20 - 17:40)', subject: 'МДК 01.01. Компьютерные сети', teacher: 'Ладовер Татьяна Михайловна' }
        ]},
        { dayIndex: 0, dayName: 'Воскресенье', lessons: [] }
    ];

    const icons = {
        time: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z"/></svg>',
        teacher: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>'
    };

    // --- DOM ELEMENTS ---
    const radioButtons = document.querySelectorAll('input[name="view"]');
    const selectionIndicator = document.querySelector('.switch-selection');
    const viewContainers = document.querySelectorAll('.view-container');
    const todayTomorrowView = document.getElementById('today-tomorrow-view');
    const fullWeekView = document.getElementById('full-week-view');
    const dailyView = document.getElementById('carousel-view'); // Renaming for clarity
    
    // Custom Select Elements
    const customSelect = document.getElementById('custom-day-select');
    const selectTrigger = customSelect.querySelector('.custom-select__trigger');
    const selectedText = document.getElementById('selected-day-text');
    const optionsContainer = customSelect.querySelector('.custom-options');
    
    const selectedCardContainer = document.getElementById('selected-day-card-container');
    
    let allDayCards = []; // To store generated card elements

    // --- FUNCTIONS ---
    
    function createDayCard(dayData) {
        const card = document.createElement('div');
        card.className = dayData.lessons.length > 0 ? 'schedule-card' : 'no-schedule-card';
        card.dataset.dayIndex = dayData.dayIndex;

        if (dayData.lessons.length === 0) {
            card.innerHTML = `<h2 class="day-title">${dayData.dayName}</h2><em>Тут пусто</em>`;
            return card;
        }

        let lessonsHTML = dayData.lessons.map(lesson => {
            if (lesson.isSplit) {
                return `
                    <div class="lesson">
                        <p class="time">${icons.time}${lesson.time}</p>
                        <div class="split-lesson-container">
                            <div class="split-item">
                                <h4 class="split-title">Числитель</h4>
                                <div class="split-card">
                                    <p class="subject">${lesson.numerator.subject}</p>
                                    <p class="teacher">${icons.teacher}${lesson.numerator.teacher}</p>
                                </div>
                            </div>
                            <div class="split-item">
                                <h4 class="split-title">Знаменатель</h4>
                                <div class="split-card">
                                    <p class="subject">${lesson.denominator.subject}</p>
                                    <p class="teacher">${icons.teacher}${lesson.denominator.teacher}</p>
                                </div>
                            </div>
                        </div>
                    </div>`;
            }
            return `
                <div class="lesson">
                    <p class="time">${icons.time}${lesson.time}</p>
                    <p class="subject">${lesson.subject}</p>
                    <p class="teacher">${icons.teacher}${lesson.teacher}</p>
                </div>`;
        }).join('');

        card.innerHTML = `<h2 class="day-title">${dayData.dayName}</h2>${lessonsHTML}`;
        return card;
    }

    function populateViews() {
        // Clear all containers before populating
        todayTomorrowView.innerHTML = '';
        fullWeekView.innerHTML = '';

        // Sort with Sunday (0) at the end
        const sortedSchedule = [...scheduleData].sort((a, b) => {
            const dayA = a.dayIndex === 0 ? 7 : a.dayIndex;
            const dayB = b.dayIndex === 0 ? 7 : b.dayIndex;
            return dayA - dayB;
        });
        
        allDayCards = sortedSchedule.map(createDayCard);
        
        // 1. Populate Full Week View
        allDayCards.forEach(card => {
            fullWeekView.appendChild(card.cloneNode(true));
        });

        // 2. Populate Today/Tomorrow View
        const todayIndex = new Date().getDay();
        const tomorrowIndex = (todayIndex + 1) % 7;
        
        const todayCard = allDayCards.find(c => c.dataset.dayIndex == todayIndex);
        const tomorrowCard = allDayCards.find(c => c.dataset.dayIndex == tomorrowIndex);
        
        if (todayCard) todayTomorrowView.appendChild(todayCard.cloneNode(true));
        if (tomorrowCard) todayTomorrowView.appendChild(tomorrowCard.cloneNode(true));
        
        if (todayTomorrowView.children.length === 0) {
             todayTomorrowView.innerHTML = '<div class="no-schedule-card">На сегодня и завтра занятий нет.</div>';
        }
    }

    function setupCustomSelect() {
        // Populate options
        allDayCards.forEach(card => {
            const dayIndex = card.dataset.dayIndex;
            const dayName = card.querySelector('.day-title').textContent;
            
            const option = document.createElement('div');
            option.classList.add('custom-option');
            option.textContent = dayName;
            option.dataset.value = dayIndex;
            
            optionsContainer.appendChild(option);
        });

        const options = optionsContainer.querySelectorAll('.custom-option');

        // Toggle dropdown with smart positioning
        selectTrigger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent window click event from firing immediately

            const wasOpen = customSelect.classList.contains('open') || customSelect.classList.contains('open-up');

            // Always close first to reset state
            customSelect.classList.remove('open', 'open-up');

            if (wasOpen) return; // If it was open, we just close it.

            const selectRect = customSelect.getBoundingClientRect();
            const spaceBelow = window.innerHeight - selectRect.bottom;
            
            // Estimate height. Should match CSS max-height.
            const optionsHeight = 320; // Updated to match new CSS max-height

            if (spaceBelow < optionsHeight && selectRect.top > optionsHeight) {
                // Not enough space below, but enough space above -> open up
                customSelect.classList.add('open-up');
            } else {
                // Default to opening down
                customSelect.classList.add('open');
            }
        });

        // Handle option selection
        options.forEach(option => {
            option.addEventListener('click', () => {
                const selectedValue = option.dataset.value;
                selectedText.textContent = option.textContent;
                
                // Close dropdown
                customSelect.classList.remove('open', 'open-up');
                
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                // Display the correct card
                const cardToShow = allDayCards.find(card => card.dataset.dayIndex == selectedValue);
                if (cardToShow) {
                    selectedCardContainer.innerHTML = '';
                    const clonedCard = cardToShow.cloneNode(true);
                    selectedCardContainer.appendChild(clonedCard);
                    anime.set(clonedCard, { opacity: 0, translateY: 20 });
                    fadeIn(clonedCard, { translateY: [20, 0] }, 400);
                }
            });
        });

        // Close when clicking outside
        window.addEventListener('click', () => {
            customSelect.classList.remove('open', 'open-up');
        });

        // Set initial state to today
        const todayIndex = new Date().getDay();
        const initialOption = optionsContainer.querySelector(`[data-value='${todayIndex}']`);
        if (initialOption) {
            initialOption.click();
            // The click handler closes the dropdown, so we don't need to worry about it staying open.
        }
    }

    function initialize() {
        populateViews();
        setupSwitcher();
        setupCustomSelect(); // Replaces setupDaySelector
        handleViewChange('view-today');
        fadeIn('.section-title');
    }

    function handleViewChange(selectedId) {
        // Hide all containers reliably
        viewContainers.forEach(c => {
            c.style.display = 'none';
            c.classList.remove('active');
        });
        
        let targetView;
        let displayType = 'grid'; // Grid is default for 'today' and 'full' views

        if (selectedId === 'view-today') {
            targetView = todayTomorrowView;
        } else if (selectedId === 'view-full') {
            targetView = fullWeekView;
        } else {
            targetView = dailyView;
            displayType = 'block'; // Carousel needs to be a block container
        }
        
        // Show the correct container with the correct display style
        targetView.style.display = displayType;
        targetView.classList.add('active');
        
        // Animate the content inside the activated view
        const elementsToAnimate = targetView.querySelectorAll('.schedule-card, .no-schedule-card');
        if (elementsToAnimate.length > 0) {
            anime.set(elementsToAnimate, { opacity: 0, translateY: 15 });
            fadeIn(elementsToAnimate, {
                translateY: [15, 0],
                delay: anime.stagger(80)
            });
        }
    }

    function setupSwitcher() {
        let activeLabel = document.querySelector('input[name="view"]:checked')?.nextElementSibling;

        function moveIndicator(targetLabel) {
            if (!targetLabel) return;
            activeLabel = targetLabel;
            selectionIndicator.style.width = `${targetLabel.offsetWidth}px`;
            selectionIndicator.style.transform = `translateX(${targetLabel.offsetLeft - 4}px)`;
        }

        moveIndicator(activeLabel);

        radioButtons.forEach(radio => {
            radio.addEventListener('change', (e) => {
                handleViewChange(e.target.id);
                moveIndicator(e.target.nextElementSibling);
            });
        });
        
        window.addEventListener('resize', () => moveIndicator(activeLabel));
    }
    
    initialize();
});
