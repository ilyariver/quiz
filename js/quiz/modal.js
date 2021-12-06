$$.modal = function(options) {

	function _createModal(options) {
		const modal = document.createElement('div')
		modal.classList.add('modal')
		modal.insertAdjacentHTML('afterbegin',`		
			<div class="quiz-widget">
	        <div class="quiz-widget__overlay"></div>
	        <div class="quiz-widget__wrap" data-close="true">
              <button 
                type="button" 
                class="quiz-widget__close-button" 
                aria-label="Закрыть"
                data-close="true">×</button>
	            <div class="quiz-widget__container" data-close="true">
	                <section class="quiz-widget__sidebar" data-sidebar>
	                    <div class="quiz-widget__main">
	                        <div class="quiz-widget__content" data-content> </div>
	                        <div class="quiz-widget__footer">
	                            <div class="quiz-widget__steps">
	                                <div class="quiz-widget__steps-text">Шаг</div>
	                                <div class="quiz-widget__steps-numeric">
	                                    <div class="quiz-widget__steps-howMany js-count">1</div>
	                                    <div class="quiz-widget__steps-text-from">из</div>
	                                    <div class="quiz-widget__steps-fromHowMany">${options.modalContent.length}</div>
	                                </div>
	                            </div>
	                            <div class="quiz-widget__steps-buttons js-buttons">
	                                <button 
	                                	type="button" 
	                                	class="quiz-widget__btn quiz-widget__btn--prev" 
	                                	aria-label="Предыдущий шаг"
	                                	data-prev="prev">
	                                    <svg width="24px" height="24px" viewBox="0 0 24 24"
	                                         xmlns="http://www.w3.org/2000/svg">
	                                        <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z" fill="#fff"/>
	                                    </svg>
	                                </button>
	                                <button type="button" class="quiz-widget__btn quiz-widget__btn--next" data-btn="next">
	                                    <span class="text">Далее</span>
	                                    <span class="arrow">
	                                    <svg width="24px" height="24px" viewBox="0 0 24 24"
	                                         xmlns="http://www.w3.org/2000/svg">
	                                        <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z" fill="#fff"/>
	                                    </svg>
	                                </span>
	                                </button>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="quiz-widget__aside">
	                        <div class="quiz-widget__bonus">
	                            <div class="quiz-widget__bonus-img-container">
	                                <span class="quiz-widget__bonus-text">Натяжные потолки</span>
	                                <img class="quiz-widget__bonus-img" src="/img/22-2.jpg" alt="Бонус">
	                            </div>
	                        </div>
	                    </div>
	                </section>
	            </div>
	        </div>
	    </div>
		`)

		document.getElementById('App').append(modal)
		return modal
	}

	// контент модалки с вопросами
	const _setQuestionsContent = options => `
		<h1 class="quiz-widget__title">${options.questions}</h1>
    <div class="quiz-widget__questions-list">${options.answers.map(item => `
			<label class="quiz-widget__questions-item js-answer">
        <input type="radio" name="radio" value="${item}">
        <span class="checked"></span>
        <span class="quiz-widget__questions-text">${item}</span>
      </label>
		`).join('')}</div>
	`
	// контент модалки с формой
	const _setModalForm = () => `
		
	`

	const $modal = _createModal(options)
	const ANIMATION_SPEED = 400
	const START_QUESTION = 1
	let closing = false
	let destroyed = false

	// отображение первой страницы вопросов при инициализации квиза
	renderNextQuestion(START_QUESTION)

	const modal = {
		// открыть модалку
		open() {
			if (destroyed) console.log('Modal is destroyed')
			!closing && $modal.classList.add('open')
			document.querySelector('html').style.overflow = 'hidden'
		},
		// закрыть модалку
		close() {
			closing = true
			document.querySelector('html').style.overflow = ''
			$modal.classList.remove('open')
			$modal.classList.add('hide')
			setTimeout(() => {
				closing = false
				$modal.classList.remove('hide')
			}, ANIMATION_SPEED)
		},
		setContent(modalContent, id) {
			$modal.querySelector('[data-content]').setAttribute('id', id)
			$modal.querySelector('[data-content]').innerHTML = modalContent
		},
		switchQuestion(id) {
			// прибавление номера id после прохождения предыдущего вопроса
			++id
			renderNextQuestion(id)
		}
	}

	// рендер входных данных контента модалки по клику "назад/далее"
	function renderNextQuestion(id) {
		const $count = document.querySelector('.js-count')

		options.modalContent.forEach(item => {
			if (item.id === id) {
				const $renderHtml = _setQuestionsContent(item)
				const loading = setTimeout(() => {
					// вывод счетчика
					$count.innerHTML = id
					// вывод контента
					modal.setContent($renderHtml, item.id)
					clearTimeout(loading)
				}, 1000)
			}
		})
	}

	const closeModalListener = event => {
		// закрыть модалку, если у элемента есть атрибут data-close
		if (event.target.dataset.close) {
			modal.close()
		}
	}

	$modal.addEventListener('click', closeModalListener)

	return {
		...modal,
		destroy() {
			$modal.parentNode.removeChild($modal)
			$modal.removeEventListener('click', closeModalListener)
			destroyed = true
		}
	}
}