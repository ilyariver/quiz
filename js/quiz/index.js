const data = [
	{
		id: 1,
		questions: {title:'Какой у вас тип жилья?', fields: 'typeApart'},
		answers: ['Квартира вторичка', 'Квартира новостройка', 'Частный дом', 'text']
	},
	{
		id: 2,
		questions: {title:'Какой тип ремонта планируете?', fields: 'remType'},
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
		questions: {title:'У Вас есть дизайн-проект?', fields: 'design'},
		answers: ['Да', 'Нет, будем делать без дизайна', 'Нет, но будет нужен', 'text']
	},
	{
		id: 4,
		questions: {title:'Укажите примерную площадь', fields: 'area'},
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
		questions: {title:'В какое время Вы хотели бы начать ремонт?', fields: 'start'},
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

const form = $$.form({
	data
})

// handlers кнопок ответов/кнопок
function createNextQuestionsHandler(event) {
	if (!document.querySelector('[data-content]')) return
	const START_PAGE = 1
	const contentId = +document.querySelector('[data-content]').getAttribute('id')
	const target = event.target
	const answerTarget = target.closest('.js-answer')
	const radioButtons = document.querySelectorAll('.js-answer')
	const inputText = document.querySelector('.js-answer-input-text')
	const getAnswerValue = () => {
		if (answerTarget && answerTarget.querySelector('input[type=radio]')) {
			if (inputText) inputText.value = ''
			return answerTarget.querySelector('input[type=radio]').value
		}
		if (inputText && inputText) {
			return {inputText: inputText.value, type: 'inputText'}
		}
	}
	const pressedPrevButton = target.closest('.js-btn-prev') && target.closest('.js-btn-prev').classList.contains('js-btn-prev')
	const pressedNextButton = target.closest('.js-btn-next') && target.closest('.js-btn-next').classList.contains('js-btn-next')
	const inputTarget = target.classList.contains('js-answer-input-text')
	let answerValue = getAnswerValue()

	radioButtons.forEach(item => {
		if (item.control.checked) {
			answerValue = item.querySelector('.js-answer-text').textContent
		}
	})

	let action = ''

	// событие ввода инпута
	if (event.code === 'Enter' || event.code === 'NumpadEnter') {
		action = 'keyup'
	}

	const theObject = typeof answerValue === 'object'

	// событие по radio, отправка id контента и название ответа
	if (answerValue && !pressedPrevButton && !theObject && !inputTarget) {
	 	quiz.switchQuestion(contentId, 'answer', answerValue)
	}
	// событие по enter
	if (theObject && answerValue.inputText !== '' && action === 'keyup') {
		return quiz.switchQuestion(contentId, 'next', answerValue)
	}

	// событие по кнопке "назад" и отправка индекса кнопки
	if (pressedPrevButton) {
		if (contentId === START_PAGE) return
		return quiz.switchQuestion(contentId, 'prev')
	}

	// событие по кнопке "вперед" и отправка индекса кнопки
	if (pressedNextButton && answerValue !== '' && (theObject && answerValue.inputText !== '')) {
		return quiz.switchQuestion(contentId, 'next', answerValue)
	}

	if (inputTarget) {
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

let loading = true

// обработчик формы
function sendDataForm(event) {
	if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.target.classList.contains('js-send-form-btn')) {
		document.querySelector('.js-send-form-btn').removeEventListener('click', sendDataForm)
		document.removeEventListener('keyup', sendDataForm)
		form.send(event, loading)
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

