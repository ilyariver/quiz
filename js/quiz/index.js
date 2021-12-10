// const data = {
// 			typeOfHousing: {
// 				questions: 'Какой у вас тип жилья?',
// 					answers: ['Квартира вторичка', 'Квартира новостройка', 'Частный дом', false]
// 			},
// 			typeOfRepair: {
// 				questions: 'Какой тип ремонта планируете?',
// 					answers: ['Косметический', 'капитальный ремонт', 'Ремонт под ключ', 'Пока не знаю', false]
// 			},
// 			designProject: {
// 				questions: 'У Вас есть дизайн-проект?',
// 					answers: ['Да', 'Нет, будем делать без дизайна', 'Нет, но будет нужен', false]
// 			},
// 			area: {
// 				questions: 'Укажите примерную площадь',
// 					answers: [
// 					'До 30 м2',
// 					'От 30 до 50 м2',
// 					'От 50 до 80 м2',
// 					'От 80 до 120 м2',
// 					'От 120 до 150 м2',
// 					'От 150 до 200 м2',
// 					'От 200 м2',
// 				]
// 			},
// 			startOfHousing: {
// 				questions: 'В какое время Вы хотели бы начать ремонт?',
// 					answers: [
// 					'В этом месяце',
// 					'В ближайшие три месяца',
// 					'В ближайшие полгода',
// 					'Планирую позже, чем через полгода',
// 					'Пока не планирую, просто интересуюсь',
// 				]
// 			},
// 		}

const data = [
	{
		id: 1,
		questions: 'Какой у вас тип жилья?',
		answers: ['Квартира вторичка', 'Квартира новостройка', 'Частный дом', 'text']
	},
	{
		id: 2,
		questions: 'Какой тип ремонта планируете?',
		answers: [
			{type: 'Косметический', descr: 'Меняются настенные, потолочные и напольные покрытия. Выравнивание визуальное.'},
			{type: 'Капитальный ремонт', descr:'Выравниваются все поверхности. Меняются коммуникации. Утепляется балкон.'},
			{type: 'Ремонт под ключ', descr:'Сложный ремонт с перепланировкой. Выполняется по дизайн-проекту.'},
			'Пока не знаю',
			'text'
		]
	},
	{
		id: 3,
		questions: 'У Вас есть дизайн-проект?',
		answers: ['Да', 'Нет, будем делать без дизайна', 'Нет, но будет нужен', 'text']
	},
	{
		id: 4,
		questions: 'Укажите примерную площадь',
		answers: [
			'До 30 м2',
			'От 30 до 50 м2',
			'От 50 до 80 м2',
			'От 80 до 120 м2',
			'От 120 до 150 м2',
			'От 150 до 200 м2',
			'От 200 м2',
		]
	},
	{
		id: 5,
		questions: 'В какое время Вы хотели бы начать ремонт?',
		answers: [
			'В этом месяце',
			'В ближайшие три месяца',
			'В ближайшие полгода',
			'Планирую позже, чем через полгода',
			'Пока не планирую, просто интересуюсь',
		]
	},
]


const quiz = $$.modal({
	modalContent: data
})

function createNextQuestionsHandler(event) {
	event.preventDefault()
	if (!document.querySelector('[data-content]')) return
	const contentId = +document.querySelector('[data-content]').getAttribute('id')
	const target = event.target
	const answerTarget = target.closest('.js-answer')
	const radioButtons = document.querySelectorAll('.js-answer')
	const inputText = document.querySelector('.js-answer-input-text')
	const getAnswerValue = () => {
		if (answerTarget && answerTarget.querySelector('input[type=radio]')) {
			console.log('radio ответ')
			return answerTarget.querySelector('input[type=radio]').value
		}
		if (inputText && inputText) {
			console.log('input ответ')
			return {inputText: inputText.value, type: 'inputText'}
		}
	}
	const answerValue = getAnswerValue()
	let action = ''
	// событие ввода инпута
	if (event.code === 'Enter') {
		debugger
		action = 'keyup'
	}

	// событие по radio, отправка id контента и название ответа
	if (answerValue !== '' && answerTarget) {
		console.log('отправка')
		return quiz.switchQuestion(contentId, 'answer', answerValue)
	}

	// событие по enter
	if (typeof answerValue === 'object' && action === 'keyup') {
		console.log('отправка')
	}

	// событие по кнопке "назад" и отправка индекса кнопки
	if ((target.closest('.js-btn-prev') &&
		target.closest('.js-btn-prev').classList.contains('js-btn-prev')) && action !== 'keyup') {
		console.log('action ===', `"${action}"`)
		if (action === 'keyup') {
			console.log('Назад, но КАК??????')
		} else {
			console.log('Назад')
		}

		return quiz.switchQuestion(contentId, 'prev')
	}

	// событие по кнопке "вперед" и отправка индекса кнопки
	if (target.closest('.js-btn-next') && target.closest('.js-btn-next').classList.contains('js-btn-next')) {
		return quiz.switchQuestion(contentId, 'next', answerValue)
	}

	if (target.classList.contains('js-answer-input-text')) {
		const inputText = document.querySelector('.js-answer-input-text')
		const countSymbols = document.querySelector('.js-symbols')
		let lastValue = ''
		// удаляем все checked если введен один символ
		if (inputText.value.length > 0) {
			radioButtons.forEach(button => {
				button.querySelector('[type=radio]').removeAttribute('checked')
			})
		}
		// счетчик введенных символов
		if (inputText.value.length < 81) {
			lastValue = inputText.value
			countSymbols.innerHTML = inputText.value.length
			return quiz.switchQuestion(contentId, 'inputText', {lastValue, type: 'inputText'})
		}
		inputText.value = lastValue
	}
}

const mainContent = document.querySelector('.js-main-content')
const buttonNext = document.querySelector('.js-btn-next')
const buttonPrev = document.querySelector('.js-btn-prev')
mainContent.addEventListener('click', createNextQuestionsHandler)


window.onload = () => {
	const inputText = document.querySelector('.js-answer-input-text')
	inputText.addEventListener('input', createNextQuestionsHandler)
	buttonNext.addEventListener('click', createNextQuestionsHandler)
	buttonPrev.addEventListener('click', createNextQuestionsHandler)
}

