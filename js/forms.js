
function setPerson(name) {
  $("input[name='person']").val(name);
}
function setTariff(tariff){
  $("input[name='tariff']").val(tariff);
}
function openPopupSendOk() {
  $.magnificPopup.open({
    items: {
        src: '#popup-sendok'
    },
    type: 'inline'
  });
}
function setAnalytics(name) {
  switch (name) {
    case 'callme':
      // ==== Позвонить мне
      fbq('track', 'Lead');
      gtag('event', 'send_form_event', { 'event_category' : 'send_form_category', 'event_label' : 'send_form_label' });
      ym(82183891,'reachGoal','lead');
      // ====
      break;
    case 'zayavka':
      // ==== Оставить заявку
fbq('track', 'Lead');
      gtag('event', 'send_form_event', { 'event_category' : 'send_form_category', 'event_label' : 'send_form_label' });
      ym(82183891,'reachGoal','lead');
      // ====
      break;
    case 'inj':
      // ==== Пригласите БЕСПЛАТНО инженера
fbq('track', 'Lead');
      gtag('event', 'send_form_event', { 'event_category' : 'send_form_category', 'event_label' : 'send_form_label' });
      ym(82183891,'reachGoal','lead');
      // ====
      break;
    case 'rasschet':
      // ==== Заказать рассчет детальной сметы
fbq('track', 'Lead');
      gtag('event', 'send_form_event', { 'event_category' : 'send_form_category', 'event_label' : 'send_form_label' });
      ym(82183891,'reachGoal','lead');
      // ====
      break;
    case 'rasschetdet':
      // ==== Формы рассчета стоимости с параметрами
fbq('track', 'Lead');
      gtag('event', 'send_form_event', { 'event_category' : 'send_form_category', 'event_label' : 'send_form_label' });
      ym(82183891,'reachGoal','lead');
      // ====
      break;
    case 'hassmeta':
      // ==== Уже есть смета?
fbq('track', 'Lead');
      gtag('event', 'send_form_event', { 'event_category' : 'send_form_category', 'event_label' : 'send_form_label' });
      ym(82183891,'reachGoal','lead');
      // ====
      break;
    case 'zakdes':
      // ==== Закажите дизайн-проект
fbq('track', 'Lead');
      gtag('event', 'send_form_event', { 'event_category' : 'send_form_category', 'event_label' : 'send_form_label' });
      ym(82183891,'reachGoal','lead');
      // ====
      break;
    case 'rassrochka':
      // ==== Получить рассрочку
fbq('track', 'Lead');
      gtag('event', 'send_form_event', { 'event_category' : 'send_form_category', 'event_label' : 'send_form_label' });
      ym(82183891,'reachGoal','lead');
      // ====
      break;
    case 'questions':
      // ==== Остались вопросы?
fbq('track', 'Lead');
      gtag('event', 'send_form_event', { 'event_category' : 'send_form_category', 'event_label' : 'send_form_label' });
      ym(82183891,'reachGoal','lead');
      // ====
      break;
    case 'offer':
      // ==== Получить предложение
fbq('track', 'Lead');
      gtag('event', 'send_form_event', { 'event_category' : 'send_form_category', 'event_label' : 'send_form_label' });
      ym(82183891,'reachGoal','lead');
      // ====
      break;
    case 'person':
      // ==== Мы открыты для вас
fbq('track', 'Lead');
      gtag('event', 'send_form_event', { 'event_category' : 'send_form_category', 'event_label' : 'send_form_label' });
      ym(82183891,'reachGoal','lead');
      // ====
      break;

    case 'quiz':
      // ==== Ответы в квизе
      fbq('track', 'Lead');
      gtag('event', 'send_form_event', { 'event_category' : 'send_form_category', 'event_label' : 'send_form_label' });
      ym(82183891,'reachGoal','lead');
      // ====
      break;
  }
}

var forms = {
  callme: 'Позвонить мне',
  zayavka: 'Оставить заявку',
  inj: 'Пригласите БЕСПЛАТНО инженера',
  rasschet: 'Заказать рассчет детальной сметы',
  rasschetdet: 'Формы рассчета стоимости с параметрами',
  hassmeta: 'Уже есть смета?',
  zakdes: 'Закажите дизайн-проект',
  rassrochka: 'Получить рассрочку',
  questions: 'Остались вопросы ?',
  offer: 'Получить предложение',
  person: 'Мы открыты для вас',
  quiz: 'Ответы в квизе',
}
var fields = {
  name: "Имя",
  phone: "Телефон",
  remtype: 'Тип ремонта',
  remdesc: 'Описание работ',
  remwhat: 'Что нужно отремонтировать',
  remtypesel: 'Выберите вид ремонта',
  rembuildtype: 'Выберите тип помещения',
  area: 'Площадь',
  person: 'Сотрудник',
  desc: 'Текст письма',
  tariff: 'Тариф'
}

$(function() {

  // .not('#ajax-contact-form')
  $('form').submit(function (event) {
    console.log('submit');
    event.preventDefault();
    // form data
    var form = $(this);
    var formError = false;
    // var formName = forms[];
    var formName = $(this).data('name')
    var formDataSend = {
      name: forms[formName],
      fields: []
    };
    // fields data
    form.find('input, textarea, select').not("[type='file']").each(function(){
      var field = $(this);
      var fieldValue =  field.val();
      // console.log(fieldValue);
      var fieldName = field.attr('name');
      if(fieldValue){
        field.removeClass('field-error');
        formDataSend.fields.push(
          {
            name: fields[fieldName],
            value: fieldValue
          }
        );
      }else{
        formError = true;
        field.addClass('field-error');
      }
    });

    if(!formError) {

/* send calltouch */
try {
	var fio = form.find('input[name="name"]').val();
	var phone = form.find('input[name="phone"]').val();
	var mail = form.find('input[name="email"]').val();
	var ct_site_id = '47217';
	var sub = forms[formName];
	var ct_data = {
		fio: fio,
		phoneNumber: phone,
		email: mail,
		subject: sub,
		sessionId: window.call_value
	};
	jQuery.ajax({
	  url: 'https://api.calltouch.ru/calls-service/RestAPI/requests/'+ct_site_id+'/register/',
	  dataType: 'json', type: 'POST', data: ct_data, async: false
	});
} catch(e) { }
/* send calltouch */

      if(formName == 'hassmeta'){
        // отправка с файлом
        var http = new XMLHttpRequest(), f = this;
        var th = $(this);
        event.preventDefault();
        // alert(th.find("input[name='name']").val().length);
        if(th.find("input[name='name']").val().length && th.find("input[name='phone']").val().length) {
          http.open("POST", "php/mailsendfile.php", true);
          http.onreadystatechange = function() {
            if (http.readyState == 4 && http.status == 200) {
              // alert(http.responseText);
              openPopupSendOk();

              // аналитика
              setAnalytics(formName);

              if (http.responseText.indexOf(f.name.value) == 0) { // очистить поля формы, если в ответе первым словом будет имя отправителя (nameFF)
                th.trigger("reset");
              }
            }
          }
          http.onerror = function() {
            alert('Ошибка, попробуйте еще раз');
          }
          http.send(new FormData(f));
        }else{
          alert('Заполните все поля!');
        }
      }else{
        // отправка без файла
        axios({
          method: 'POST',
          headers: {
            // 'Content-Type': 'multipart/form-data'
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          url: '/php/mailsend.php',
          data: formDataSend
        })
        .then((response) => {
          // console.log('sendform', response);
          $.magnificPopup.close();
          setTimeout(function(){
            openPopupSendOk();
          },500);
          form.find("input, textarea").val("");

          // аналитика
          setAnalytics(formName);

        })
        .catch((error) => {
          console.log(error);
        });
      }

    }

  });

  /*
  document.getElementById('ajax-contact-form').addEventListener('submit', function(evt){
    var http = new XMLHttpRequest(), f = this;
    var th = $(this);
    evt.preventDefault();
    // alert(th.find("input[name='name']").val().length);
    if(th.find("input[name='name']").val().length && th.find("input[name='phone']").val().length) {
      http.open("POST", "php/mailsendfile.php", true);
      http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
          // alert(http.responseText);
          openPopupSendOk();
          if (http.responseText.indexOf(f.name.value) == 0) { // очистить поля формы, если в ответе первым словом будет имя отправителя (nameFF)
            th.trigger("reset");
          }
        }
      }
      http.onerror = function() {
        alert('Ошибка, попробуйте еще раз');
      }
      http.send(new FormData(f));
    }else{
      alert('Заполните все поля!');
    }
  }, false);
  */

});
