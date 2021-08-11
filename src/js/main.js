document.addEventListener('DOMContentLoaded', () => {
	const carousel = new Swiper('.carousel__swiper', {
		loop: true,
		slidesPerView: 1,
		effect: 'coverflow',
		speed: 700,
		autoplay: {
			delay: 5000,
		},
		coverflowEffect: {
			rotate: 110,
			slideShadows: false,
			depth: 150,
		},
		breakpoints: {
			992: {
				slidesPerView: 1,
			},
		},

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-next',
			prevEl: '.swiper-prev',
		},

	});

	// ТАБЫ


	const tabsBtn = document.querySelectorAll('.catalog__tab'); // Получаем tab кнопки
	const tabsItems = document.querySelectorAll('.catalog__content')	// Получаем контенты

	tabsBtn.forEach(tab => { // Перебираем каждую кнопку
		tab.addEventListener('click', () => { // задаем обработчик собитий и указывем собитые click
			let currentBtn = tab;
			let tabId = currentBtn.getAttribute('data-tab'); // Получаем атрибут у taba
			let currentTab = document.querySelector(tabId)

			if (!currentBtn.classList.contains('catalog__tab--active')) {

				tabsBtn.forEach(tab => {
					tab.classList.remove('catalog__tab--active') // Удаляем все классы active 
				})

				tabsItems.forEach(item => {
					item.classList.remove('catalog__content--active', 'fade') // Убираем все контенты
				})

				currentBtn.classList.add('catalog__tab--active'); // Добавляем тот который кликнет

				currentTab.classList.add('catalog__content--active', 'fade') // Добавляем контент по tabId
			}
		})
		document.querySelector('.catalog__tab').click(); // Авто клик по первой кнопке
	})

	// Открытие и закрытие окон

	const moreBtn = document.querySelectorAll('.catalog-item__more');
	const backBtn = document.querySelectorAll('.catalog-item__back');
	const itemContent = document.querySelectorAll('.catalog-item__content');
	const itemList = document.querySelectorAll('.catalog-item__list');

	function hideContent(i) {
		itemList[i].classList.toggle('catalog-item__list--active')
		itemContent[i].classList.toggle('catalog-item__content--active')
	}

	moreBtn.forEach((more, i) => {
		more.addEventListener('click', (e) => {
			e.preventDefault();
			hideContent(i);
		})
	})


	backBtn.forEach((back, i) => {
		back.addEventListener('click', (e) => {
			e.preventDefault();
			hideContent(i);
		})
	})
})
