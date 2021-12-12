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
	                    <div class="quiz-widget__main js-main-content">
	                        <div class="quiz-widget__content js-content" data-content data-animation-block> </div>
	                        <div class="quiz-widget__footer js-footer">
	                            <div class="quiz-widget__steps">
	                                <div class="quiz-widget__steps-text">Шаг</div>
	                                <div class="quiz-widget__steps-numeric">
	                                    <div class="quiz-widget__steps-howMany js-count">1</div>
	                                    <div class="quiz-widget__steps-text-from">из</div>
	                                    <div class="quiz-widget__steps-fromHowMany">${options.modalContent.length}</div>
	                                </div>
	                            </div>
	                            <div class="quiz-widget__steps-buttons js-buttons">
	                                <div 
	                                	class="quiz-widget__btn quiz-widget__btn--prev js-btn-prev disabled" 
	                                	aria-label="Предыдущий шаг"
	                                	disabled
                                  >
	                                	<span class="quiz-widget__btn-svg">
	                                		 <svg width="24px" height="24px" viewBox="0 0 24 24"
	                                         xmlns="http://www.w3.org/2000/svg">
	                                        <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 
	                                        12l6.707 6.707z" fill="#fff"/>
	                                    </svg>
																		</span>
	                                   
		                                </div>
                                    <span class="quiz-widget__btn-next-wrap">
			                                <div 
		                                    class="quiz-widget__btn quiz-widget__btn--next js-btn-next disabled"
		                                    disabled
		                                  >
		                                    <span class="text">Далее</span>
		                                    <span class="arrow quiz-widget__btn-svg">
		                                    <svg width="24px" height="24px" viewBox="0 0 24 24"
		                                         xmlns="http://www.w3.org/2000/svg">
		                                        <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z" fill="#fff"/>
		                                    </svg>
		                                  </span>
		                                </div>
	                                 	<small class="form__small-text js-enter-descr">или нажмите <span>Enter</span></small>
																	</span>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="quiz-widget__aside js-aside">
	                        <div class="quiz-widget__bonus">
	                            <div class="quiz-widget__bonus-img-container veil">
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

	// шаблон блока ответа
	const answerTemplate = (item, descr = '') => `
			<label class="quiz-widget__questions-item js-answer" data-animation>
        <input type="radio" name="radio" value="${item}">
        <span class="checked"></span>
        <span class="quiz-widget__questions-text js-answer-text">${item}</span>
        ${descr !== '' ? `<span class="quiz-widget__question-descr-wrap">
					<span class="quiz-widget__question-descr-icon">
						<?xml version="1.0" encoding="iso-8859-1"?>
							<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
							\t viewBox="0 0 496.158 496.158" style="enable-background:new 0 0 496.158 496.158;" xml:space="preserve">
							<path style="fill:#515d6a;" d="M496.158,248.085c0-137.022-111.069-248.082-248.075-248.082C111.07,0.003,0,111.063,0,248.085
							\tc0,137.001,111.07,248.07,248.083,248.07C385.089,496.155,496.158,385.086,496.158,248.085z"/>
							<g>
							\t<path style="fill:#FFFFFF;" d="M315.249,359.555c-1.387-2.032-4.048-2.755-6.27-1.702c-24.582,11.637-52.482,23.94-57.958,25.015
							\t\tc-0.138-0.123-0.357-0.348-0.644-0.737c-0.742-1.005-1.103-2.318-1.103-4.015c0-13.905,10.495-56.205,31.192-125.719
							\t\tc17.451-58.406,19.469-70.499,19.469-74.514c0-6.198-2.373-11.435-6.865-15.146c-4.267-3.519-10.229-5.302-17.719-5.302
							\t\tc-12.459,0-26.899,4.73-44.146,14.461c-16.713,9.433-35.352,25.41-55.396,47.487c-1.569,1.729-1.733,4.314-0.395,6.228
							\t\tc1.34,1.915,3.825,2.644,5.986,1.764c7.037-2.872,42.402-17.359,47.557-20.597c4.221-2.646,7.875-3.989,10.861-3.989
							\t\tc0.107,0,0.199,0.004,0.276,0.01c0.036,0.198,0.07,0.5,0.07,0.933c0,3.047-0.627,6.654-1.856,10.703
							\t\tc-30.136,97.641-44.785,157.498-44.785,182.994c0,8.998,2.501,16.242,7.432,21.528c5.025,5.393,11.803,8.127,20.146,8.127
							\t\tc8.891,0,19.712-3.714,33.08-11.354c12.936-7.392,32.68-23.653,60.363-49.717C316.337,364.326,316.636,361.587,315.249,359.555z"/>
							\t<path style="fill:#FFFFFF;" d="M314.282,76.672c-4.925-5.041-11.227-7.597-18.729-7.597c-9.34,0-17.475,3.691-24.176,10.971
							\t\tc-6.594,7.16-9.938,15.946-9.938,26.113c0,8.033,2.463,14.69,7.32,19.785c4.922,5.172,11.139,7.794,18.476,7.794
							\t\tc8.958,0,17.049-3.898,24.047-11.586c6.876-7.553,10.363-16.433,10.363-26.393C321.646,88.105,319.169,81.684,314.282,76.672z"/>
							</g>
							<g>
							</g>
							<g>
							</g>
							<g>
							</g>
							<g>
							</g>
							<g>
							</g>
							<g>
							</g>
							<g>
							</g>
							<g>
							</g>
							<g>
							</g>
							<g>
							</g>
							<g>
							</g>
							<g>
							</g>
							<g>
							</g>
							<g>
							</g>
							<g>
							</g>
							</svg>
					</span>
					<span class="quiz-widget__question-descr">${descr}</span>
				</span>` : ''}
      </label>
	`

	// контент модалки с вопросами
	const _setQuestionsContent = options => `
		<h1 class="quiz-widget__title" data-animation>${options.questions.title}</h1>
    <div class="quiz-widget__questions-list">${options.answers.map(item => {
			// если есть описание блока овета
			if (typeof item === 'object') {
				return answerTemplate(item.type, item.descr)
			}
			// если блок ответа с вводом текста
			if(item !== 'text') {
				return answerTemplate(item)
			}	else {
				return `
					<div 
					class="quiz-widget__questions-item-input-text-wrap quiz-widget__questions-item js-input-text-wrap"
					data-animation>
	          <input type="text" name="text" placeholder="Другое..." class="quiz-widget__textarea js-answer-input-text">
	          <div class="quiz-widget__input-text-wrap-counter">
	          	<span class="symbols js-symbols">0</span>
	          	<span class="slash">/</span>
	          	<span class="total">80</span>
						</div>
					</div>
				`
			}
		}).join('')}
	</div>
	`

	// контент модалки с формой
	const _setModalForm = () => `
		<div class="form js-form-wrap">
      <div class="form__left js-form-left">
      	<div class="form__left-arrow js-form-arrow">
					<svg data-v-2be8f1c4="" width="64" height="64" viewBox="0 0 64 64" fill="#FFBD59FF">
						<g data-v-2be8f1c4=""><path data-v-2be8f1c4="" d="m63.386,16.193l.002-.002c0.002-0.003 0.004-0.006 0.006-0.01 
						0.172-0.195 0.298-0.43 0.399-0.678 0.032-0.076 0.053-0.148 0.076-0.225 0.058-0.191 0.094-0.389 0.106-0.596 
						0.006-0.076 0.018-0.148 0.016-0.226 0-0.04 0.01-0.076 
						0.008-0.115-0.014-0.239-0.062-0.47-0.136-0.687-0.006-0.023-0.022-0.041-0.03-0.064-0.088-0.239-0.214-0.451-0.363-0.645-0.021-0.027-0.028-0.063-0.05-0.09l-10.311-12.146c-0.789-0.93-2.084-0.948-2.894-0.037-0.808,0.91-0.823,2.402-0.032,3.334l5.558,6.549c-8.121-1.076-16.104,0.633-16.481,0.717-24.646,4.467-42.087,27.227-38.88,50.736 0.159,1.164 
						1.028,1.992 2.019,1.992 0.106,0 0.212-0.009 0.32-0.027 1.116-0.203 1.878-1.409 1.704-2.696-2.857-20.94 13.056-41.282 35.537-45.358 0.103-0.024 8.351-1.794 
						16.117-0.574l-8.577,5.093c-1.005,0.598-1.398,2.02-0.881,3.177 0.516,1.159 1.748,1.608 2.756,1.017l13.52-8.028c0.183-0.111 0.347-0.25 0.491-0.411z"></path></g>
      		</svg>
				</div>
        <div class="form__message-content">
          <h1 class="form__title">На какой номер отправить расчет сроков и стоимости ремонта?</h1>
          <div class="form__bonus-title">ВАШ БОНУС</div>
          <div class="quiz-widget__bonus-unlock js-bonus-lock lock form__bonus">
            <div class="quiz-widget__bonus-img-container veil js-bonus-veil">
              <span class="quiz-widget__bonus-text">Натяжные потолки</span>
              <img class="quiz-widget__bonus-img" src="/img/22-2.jpg" alt="Бонус">
            </div>
          </div>
        </div>
      </div>
      <div class="form__right js-form-right">
        <form class="form__container js-form" action data-name="quiz">
          <div class="form__field">
            <div class="form__field-name">Введите имя*</div>
            <input type="text" name="name" class="form__input" data-input>
            <div class="form__field-icon"></div>
          </div>
          <div class="form__field error_div">
            <div class="form__field-name">Введите телефон*</div>
            <input type="text" name="phone" class="form__input js-phone-input" data-input>
            <div class="form__field-icon"></div>
          </div>
          <div class="form__button-wrap">
            <button type="submit" class="form__button js-send-form-btn">Далее</button>
          </div>
          <p class="form__annotation">Я принимаю условия передачи информации</p>
        </form>
      </div>
    </div>
	`

	const $modal = _createModal(options)
	const ANIMATION_SPEED = 400
	const START_QUESTION_PAGE = 1
	const TRANSITION_ANIMATION = 800
	// запись id пройденных вопросов
	let recordingOfPassed = []
	// запись пройденных вопросов
	let answerValuesArray = []
	let closing = false
	let destroyed = false
	let index = 0
	let count = 0
	let nextBlock = 0
	let saverText = ''
	let notInputText = false

	// отображение первой страницы вопросов при инициализации квиза
	renderNextQuestion(START_QUESTION_PAGE)

	// мутоды
	const modal = {
		// открыть модалку
		open() {
			if (destroyed) console.log('Modal is destroyed')
			!closing && $modal.classList.add('open')
			let scrollWidth = window.innerWidth - document.body.clientWidth;

			document.querySelector('html').style.overflow = 'hidden'
			document.querySelector('html').style.marginRight = scrollWidth + 'px'
		},
		// закрыть модалку
		close() {
			closing = true
			$modal.classList.remove('open')
			$modal.classList.add('hide')
			setTimeout(() => {
				closing = false
				$modal.classList.remove('hide')
				document.querySelector('html').style.overflow = ''
				document.querySelector('html').style.marginRight = ''
			}, ANIMATION_SPEED)
		},
		setQuestionsContent(modalContent, id) {
			$modal.querySelector('[data-content]').setAttribute('id', id)
			$modal.querySelector('[data-content]').innerHTML = modalContent
		},
		setFormContent(modalContent) {
			$modal.querySelector('[data-sidebar]').innerHTML = modalContent
		},
		switchQuestion(id, action = 'answer', answerValue = '', actionKey) {
			const $prevBtn = document.querySelector('.js-btn-prev')
			const $nextBtn = document.querySelector('.js-btn-next')

			// запись ответов в массив только при нажатии на ответ
			if (answerValue !== '' && action !== 'next' && actionKey !== 'keyup' && answerValue.lastValue !== '') {
				index = id - 1
				answerValuesArray.push(answerValue)
				answerValuesArray[index] = answerValue
			}
			// массив выбранных ответов
			answerValuesArray = [...new Set(answerValuesArray)]

			if (answerValuesArray.length === 0) return
			if (answerValue.lastValue === '') {
				return addActionLockButtons($nextBtn, 'disabled')
			} else {
				addActionLockButtons($nextBtn, 'enabled')
			}

			// не менять значение count, если это кнопки prev или next, чтобы управлять их активностью
			if (action !== 'prev' && action !== 'next' && actionKey !== 'keyup') {
				count = answerValuesArray.length
			}

			// проверка на не срабатывание при focus`е инпута
			if (action !== 'inputText') {
				// анимация блоков при уходе
				addStyleForAnimationOutput()
				// убрать класс active с блока ответов
				setSmoothInput()
			}

			switch (action) {
				case 'answer':
					// складываем пройденные id вопросов в массив
					recordingOfPassed.push(id)
					// прибавление номера id после прохождения предыдущего вопроса
					nextBlock = id + 1
					// разблокировать кнопку назад
					addActionLockButtons($prevBtn, 'enabled')
					addActionLockButtons($nextBtn, 'disabled')

					break

				case 'prev':
					// если следующая страница не начальная кнопка prev активна
					if (nextBlock !== START_QUESTION_PAGE) {
						nextBlock = id - 1
						--count
					}
					// если следующая страница начальная кнопка prev блокируется
					if (nextBlock === START_QUESTION_PAGE) {
						addActionLockButtons($prevBtn, 'disabled')
					}
					// блокируем кнопку, если следующие вопросы еще не были пройдены
					blockWithUnansweredQuestions(nextBlock)


					break

				case 'next':
					nextBlock = id + 1
					// с помощью count всегда прибавляем убавленное prev`ом
					++count
					// всегда разблокировывать кнопку prev при нажатии кнопки next
					addActionLockButtons($prevBtn, 'enabled')
					// блокируем кнопку, если следующие вопросы еще не были пройдены
					blockWithUnansweredQuestions(nextBlock)
					addActionLockButtons($nextBtn, 'disabled')

					break

				case 'inputText':
					saverText = answerValue
					// складываем пройденные id вопросов в массив
					recordingOfPassed.push(id)
					// прибавление номера id после прохождения предыдущего вопроса
					nextBlock = id + 1
					// активируем кнопку next, если введен символ
					if (answerValue !== '') {
						addActionLockButtons($nextBtn, 'enabled')
						notInputText = false
						return
					}
					addActionLockButtons($nextBtn, 'disabled')
					return

				default:
					break
			}
			console.log('все ответы',answerValuesArray)

			if (answerValuesArray.length !== [...new Set(recordingOfPassed)].length) return
			// рендерить вопросы пока id/порядковый номер квиза не превысит количество вопросов
			if (nextBlock <= options.modalContent.length) {
				renderNextQuestion(nextBlock, action)
			} else {
				renderForm(answerValuesArray)
				animateHiding()
			}
		},
		thankAlert() {
			const alertMessage = document.createElement('div')
			const form = document.querySelector('.js-form-wrap')
			alertMessage.classList.add('quiz-widget__thank-alert')
			alertMessage.insertAdjacentHTML('beforeend','<h2>Спасибо за обращение.<br>Мы свяжемся с Вами в течении 10 минут.</h2>')
			form.innerHTML = ''
			form.append(alertMessage)
		}
	}

	// блокировать/разблокировать кнопку next, если следующие вопросы еще не были пройдены
	function blockWithUnansweredQuestions(idBlock) {
		const $nextBtn = document.querySelector('.js-btn-next')
		if (answerValuesArray.length >= idBlock) {
			return addActionLockButtons($nextBtn, 'enabled')
		}
		addActionLockButtons($nextBtn, 'disabled')
	}

	// функция активирования/блокирования кнопок
	function addActionLockButtons($btn, action) {
		const $smallDescr = document.querySelector('.js-enter-descr')
		const $nextBtn = document.querySelector('.js-btn-next')

		if (action === 'disabled') {
			$btn.classList.add('disabled')
			$btn.setAttribute('disabled', '')
		}

		if (action === 'enabled') {
			$btn.classList.remove('disabled')
			$btn.removeAttribute('disabled')
		}

		if ($nextBtn && action === 'enabled') {
			$smallDescr.classList.add('active')
		}

		if ($nextBtn && action === 'disabled') {
			$smallDescr.classList.remove('active')
		}
	}

	// рендер входных данных контента модалки по клику "назад/далее"
	function renderNextQuestion(id, action) {
		const $count = document.querySelector('.js-count')

		options.modalContent.forEach(item => {
			if (item.id === id) {
				const $renderHtml = _setQuestionsContent(item)
				const loading = setTimeout(() => {
					// вывод счетчика
					$count.innerHTML = id
					// вывод контента
					modal.setQuestionsContent($renderHtml, item.id)
					// плавное появление
					setSmoothInput('add')
					saveChecked(id)
					if (!notInputText) {
						saveInputText(id)
					}
					blockWithUnansweredQuestions(id)
					document.addEventListener('keyup', createNextQuestionsHandler)
					clearTimeout(loading)
				}, TRANSITION_ANIMATION)
			}
		})
	}

	// функция сохранения checked
	function saveChecked(id) {
		const $answerChecked = document.querySelectorAll('.js-answer')
		const $inputText = document.querySelector('.js-answer-input-text')
		let trueId = id - 1
		if (typeof answerValuesArray[trueId] === 'object') {
			return notInputText = false
		}
		$answerChecked.forEach(($answer, id) => {
			// если текст ответа совпадает с тем ответом который записался в массив, то ставится checked
			if (answerValuesArray.includes($answer.querySelector('.js-answer-text').textContent)) {
				$answer.querySelector('[type=radio]').setAttribute('checked', '')
				notInputText = true
			}
			if ($inputText) {
				$inputText.value = ''
			}
		})
	}

	// функция сохранения input text
	function saveInputText(id) {
		const $inputText = document.querySelector('.js-answer-input-text')
		const $countSymbols = document.querySelector('.js-symbols')
		let prevId

		prevId = id - 1

		if (!$inputText) return
		$countSymbols.innerHTML = typeof answerValuesArray[prevId] === 'object' ?
			answerValuesArray[prevId].lastValue.length : 0
		$inputText.value = answerValuesArray[prevId] && answerValuesArray[prevId].lastValue || ''
		notInputText = false
	}

	// плавный уход блоков
	function addStyleForAnimationOutput() {
		const answerBlocks = document.querySelectorAll('[data-animation]')
		setSlowCycle(answerBlocks, 'output')
	}

	// плавный приход блоков
	function setSmoothInput(action = '') {
		const $answerBlock = document.querySelector('[data-animation-block]')
		const answerBlocks = document.querySelectorAll('[data-animation]')
		let decreaze = 10000

		answerBlocks.forEach(label => {
			decreaze = decreaze - 1000
			label.style.zIndex = decreaze
		})
		action === 'add' ? $answerBlock.classList.add('active') : $answerBlock.classList.remove('active')

	}

	// скрытие футера и aside после всех ответов
	function animateHiding() {
		document.querySelector('.js-footer').classList.add('animate')
		document.querySelector('.js-aside').classList.add('animate')
	}

	// медленный цикл
	function setSlowCycle(arr, where) {
		const iterator = index => {
			if (index >= arr.length) {
				return
			}
			where === 'output' ? arr[index].classList.add('output') : arr[index].classList.add('input')

				setTimeout(() => {
				iterator(++index)
			}, TRANSITION_ANIMATION / arr.length )
		}
		iterator(0)
	}

	// снять блок
	function removeLock() {
		const lock = document.querySelector('.js-bonus-lock')
		const veil = document.querySelector('.js-bonus-veil')
		const arrow = document.querySelector('.js-form-arrow')
		setTimeout(() => {
			lock.classList.add('moving')
		}, 1500)
		setTimeout(() => {
			lock.classList.remove('moving')
			lock.classList.remove('lock')
			veil.classList.remove('veil')
		}, 2500)
		setTimeout(() => {
			arrow.classList.add('animate')
		}, 3000)
	}

	// рендер формы после окончания вопросов
	function renderForm(answerValuesArray) {
		const $renderModal = _setModalForm()
		const loading = setTimeout(() => {
		// вывод контента
			modal.setFormContent($renderModal)

			clearTimeout(loading)
		}, 1000)
		const animate = setTimeout(() => {
			document.querySelector('.js-form-left').classList.add('smooth')
			document.querySelector('.js-form-right').classList.add('smooth')
			document.querySelector('.js-send-form-btn').addEventListener('click', sendDataForm)
			document.addEventListener('keyup', sendDataForm)
			removeLock()
			$$.receivedData = answerValuesArray
			form.validate()
			clearTimeout(animate)
		}, 1200)
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
