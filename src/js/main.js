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

	// Открытие и закрытие окон на контентах

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

	// Модальные окна

	const consTriggers = document.querySelectorAll('[data-modal="consultation"]'),
		orderTriggers = document.querySelectorAll('.button--mini'),
		overlay = document.querySelectorAll('.overlay'),
		modal = document.querySelectorAll('.modal'),
		modalCons = document.querySelector('#consultation'),
		modalOrder = document.querySelector('#order'),
		modalThanks = document.querySelector('#thanks'),
		catalogSub = document.querySelectorAll('.catalog-item__subtitle'),
		closeBtn = document.querySelectorAll('.modal__close');

	function closeModal() {
		closeBtn.forEach(btn => {
			btn.addEventListener('click', (e) => {
				modalCons.classList.remove('show', 'fade');
				modalOrder.classList.remove('show', 'fade');
				modalThanks.classList.remove('show', 'fade');
				document.body.style.overflow = '';
			})
		})
	}

	consTriggers.forEach(trigger => {
		trigger.addEventListener('click', (e) => {
			modalCons.classList.add('show', 'fade');
			document.body.style.overflow = 'hidden';
			closeModal();
		})
	})

	orderTriggers.forEach((trigger, i) => {
		trigger.addEventListener('click', () => {
			document.querySelector('#order .modal__subtitle').textContent = catalogSub[i].textContent
			modalOrder.classList.add('show', 'fade');
			document.body.style.overflow = 'hidden';
			closeModal();
		})
	})

	/* 	overlay.forEach((item, i) => {
			item.addEventListener('click', (e) => {
				if (e.target === modalCons || modalOrder) {
					console.log('Done Exit');
					modalCons.classList.remove('show', 'fade');
					modalOrder.classList.remove('show', 'fade');
					document.body.style.overflow = '';
				}
			})
		})
	
		modal.forEach(item => {
			item.addEventListener('click', (e) => {
				if (e.target === modal) {
					console.log('dsd');
				}
			})
		}) */


	// JQUERY VALIDATE FORM 

	function validateForm(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: 'required',
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйcта введите свое имя",
					minlength: jQuery.validator.format('Введите минимум {0} символов')
				},
				phone: 'Пожалуйста введите свой номер телефона',
				email: {
					required: "Пожалуйста введите свою почту",
					email: "Неправильно введен адрес почты"
				}
			}
		});
	}

	validateForm('#consultation__form');
	validateForm('#consultation form');
	validateForm('#order form');

	$('input[name=phone]').mask('+7 (999) 999-99-99');

	// PHP MAILER

	$('form').submit(function (e) {
		let $form = $(this);
		if (!$form.valid()) return false;
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function () {
			$(this).find('input').val('');
			modalCons.classList.remove('show', 'fade')
			modalOrder.classList.remove('show', 'fade')
			modalThanks.classList.add('show', 'fade');
			closeModal();
			$('form').trigger('reset');
		});
		return false
	})

	// Smooth scroll and pageup

	$(window).scroll(function () {
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[href = '#up'], a[href = '#catalog']").click(function () {
		const _href = $(this).attr("href");
		$("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
		return false;
	});

	// AOS Animation

	AOS.init();

	AOS.init({

		// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
		offset: 50, // offset (in px) from the original trigger point
		delay: 200, // values from 0 to 3000, with step 50ms
		duration: 800, // values from 0 to 3000, with step 50ms
		easing: 'ease-out-sine', // default easing for AOS animations
		once: true, // whether animation should happen only once - while scrolling down
		anchorPlacement: 'top-center', // defines which position of the element regarding to window should trigger the animation
	});

})