"use strict";
/* Audio player
Aleksandra Chernova, 2025.03.19 */

class audioRecorder {
   constructor(recorder, options) {
      // consts controls
      this.recorder = recorder;
      this.startButton = this.recorder.querySelector('[data-record=start]');
      this.stopButton = this.recorder.querySelector('[data-record=stop]');
      this.progress = this.recorder.querySelector('[data-record=progress]');
      this.inputFile = this.recorder.querySelector('[data-record=file]');
      // this.inputPost = this.recorder.querySelector('[data-record=post]');

      // Set default values
      const opts = options || {};
      // let timer;

      this.showResult = opts.showResult || false;
      this.url = opts.showResult ? "" : false;
      this.showPlayer = opts.showPlayer || false;
      this.showDownload = opts.showDownload || false;
      this.limit = opts.limit * 1000 || false;

      this.timer = this.recorder.querySelector('[data-record=timer]');
      this.minutes = this.recorder.querySelector('[data-record=minutes]');
      this.seconds = this.recorder.querySelector('[data-record=seconds]');
      if (this.limit) {
         this.bar = this.recorder.querySelector('[data-record=bar]');
      }

      // consts datas
      this.constraints = { audio: true, video: false };
      this.stream = null;
      this.chunks = [];
      this.mediaRecorder = null;
      this.audioBlob = null

      // проверка доступности микрофона
      navigator.mediaDevices.getUserMedia(this.constraints)
         .then((_stream) => {
            this.stream = _stream;
         })
         // если возникла ошибка, значит, либо пользователь отказал в доступе,
         // либо запрашиваемое медиа-устройство не обнаружено
         .catch((err) => {
            //  console.error(`Нет доступа или не найдено устройство: ${err}`);
            alert(`Нет доступа или не найдено устройство: ${err}`);
         });

      // listeners
      this.startButton.addEventListener('click', this.startRecord.bind(this), false);
   }

   // запись
   async startRecord() {
      // проверяем поддержку
      if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
         return console.warn('Not supported')
      }
      
      if (!this.mediaRecorder) {
         this.startButton.setAttribute('disabled', '');
         this.startButton.setAttribute('hidden', '');
         this.progress.removeAttribute('hidden');
         // this.stopButton.removeAttribute('disabled');


         // сбрасываем предыдущие результаты
         /* if (this.showResult && this.result) {
            this.inputFile.value = '';
         } */

         try {
            // получаем поток аудио-данных
            this.stream = await navigator.mediaDevices.getUserMedia({
               audio: true
            })
            // создаем экземпляр `MediaRecorder`, передавая ему поток в качестве аргумента
            this.mediaRecorder = new MediaRecorder(this.stream)
            // запускаем запись
            this.mediaRecorder.start()
            // по окончанию записи и наличии данных добавляем эти данные в соответствующий массив
            this.mediaRecorder.addEventListener('dataavailable', (e) => {
               this.chunks.push(e.data)
            });
            console.log("start record");

            // обработчик окончания записи 
            this.mediaRecorder.addEventListener("stop", (e) => {
               // создаем объект `Blob` с помощью соответствующего конструктора,
               // передавая ему `blobParts` в виде массива и настройки с типом создаваемого объекта
               // о том, что такое `Blob` и для чего он может использоваться
               // очень хорошо написано здесь: https://learn.javascript.ru/blob
               this.audioBlob = new Blob(this.chunks, { type: 'audio/wav' })

               // для вывода проверки записи создаем ссылку на файл
               // метод `createObjectURL()` может использоваться для создания временных ссылок на файлы
               // данный метод "берет" `Blob` и создает уникальный `URL` для него в формате `blob:<origin>/<uuid>`
               if (this.showResult) {
                  this.url = URL.createObjectURL(this.audioBlob)

                  this.createResult();
               }

               // test blob в file и в инпут type=file
               // Для этого создаем объект File из blob и новый объект DataTransfer:
               let file = new File([this.audioBlob], 'test.wav', { type: 'audio/wav' });
               let container = new DataTransfer();
               // Затем вы добавляете файл в контейнер, тем самым заполняя его свойство «files», которое можно назначить свойству «files» входного файла:
               container.items.add(file);

               this.inputFile.files = container.files;
               // console.log(this.inputFile.files);

               // для отправки на сервер конвертируем blob в  base64
               // проблема в длине\размере - сервер не принимает такой большой
               /* let reader = new FileReader();
               reader.readAsDataURL(this.audioBlob); // конвертирует Blob в base64 и вызывает onload
               reader.onload = (e) => {
                  this.inputPost.value = reader.result;
                  // console.log(reader.result);
               } */

               // выполняем очистку
               this.mediaRecorder = null
               this.chunks = []
            });

            // запускаем таймер
            this.progress.removeAttribute('hidden');
            let seconds = 0,
                minutes = 0;
            this.timerStart = setInterval(() => {
               seconds++;

               if (seconds < 10) {
                  this.seconds.textContent = '0' + seconds;
               } else {
                  this.seconds.textContent = seconds;
               }

               if (seconds == 60) {
                  seconds = 0;
                  minutes++;

                  if (minutes < 10) {
                     this.minutes.textContent = '0' + minutes;
                  } else {
                     this.minutes.textContent = minutes;
                  }
               }

               // вывод бара, если есть лимит
               if (this.limit) {
                  let procent = ((seconds + (minutes * 60)) / (this.limit / 1000)) * 100;
                  this.bar.style.width = `${procent}%`;
               }

            }, 1000);

            // ограничение по времени записи
            if (this.limit) {
               console.log(this.limit);
               this.bar.style.width = '0%';

               // запускаем таймер для бара  с меньшим интервалом для плавности
               let seconds = 0;
               this.barTimer = setInterval(() => {
                  seconds++;

                  let procent = (seconds / (this.limit / 10)) * 100;
                  this.bar.style.width = `${procent}%`;

               }, 10);

               // останавливаем запись через заданное время
               this.timerStop = setTimeout(() => {
                  this.stopRecord();
               }, this.limit);
            }

            // стоп кнопка
            this.stopButton.addEventListener('click', (e) => {
               this.stopRecord();
            });


         } catch (e) {
            console.error(e)
            //  record_img.src = ' img/microphone.png'
         }
      }
   }

   stopRecord() {
      this.mediaRecorder.stop();
      this.progress.setAttribute('hidden', '');

      clearInterval(this.timerStart);

      if (this.limit) {
         clearInterval(this.barTimer);
         clearTimeout(this.timerStop);
      }
   }

   // вывод результата
   createResult() {
      const domString = this.createResultDomString();

      // Insert the result in the document
      this.recorder.insertAdjacentHTML("beforeend", domString);

      // Store our result blocks in a property
      this.result = this.recorder.querySelector('[data-record=result]');
      this.reset = this.recorder.querySelector('[data-record=reset]');

      // listener for reset button
      this.reset.addEventListener('click', (e) => {
         this.resetResult(e);
      });

      /* if (this.showPlayer) {
         // похоже нигде не используются
         this.resultListen = this.recorder.querySelector('[data-record=result_listen]');
      } */

      /* if (this.showCustomPlayer) {
         this.resultCustomPlayer = this.recorder.querySelector('[data-record=result_customplayer]');
      } */
      
      if (this.showDownload) {
         this.resultDownload = this.recorder.querySelector('[data-record=result_download]');
      }
   }

   createResultDomString() {
      let html = '<div class="audiorecord__result" data-record="result"><div class="audiorecord__resulttitle">Ответ записан';

      html+='<button class="audiorecord__reset button" data-record="reset">Очистить</button></div>';
      
      if (this.showPlayer) {
         html += `<div class="audiorecord__player"><audio controls src="${this.url}" data-record="result_listen">Ваш браузер не поддерживает встроенное аудио.</audio></div>`;
      }

      if (this.showCustomPlayer) {
         html += this.createCustomPlayerDom();
      }

      if (this.showDownload) {
         html += `<div class="audiorecord__download"><a href="${this.url}" download data-record="result_download">Скачать запись</a></div>`
      }

      html += "</div>";

      return html;
   }

   createCustomPlayerDom() {
      let timeline = `<div class="timeline">
         <div class="progress"></div>
      </div>`;
      let play = `<div class="play-container">
            <button class="toggle-play play" type="button">
               <span class="visually-hidden">Включить аудио</span>
            </button>
         </div>`;
      let time = `<div class="time">
            <div class="current">0:00</div>
            <div class="divider">/</div>
            <div class="length"></div>
         </div>`;
      let name = `<div class="name">Запись ответа</div>`;

      let volume = `<div class="volume-container">
            <button class="volume-button" type="button">
               <span class="visually-hidden">Управление звуком</span>
               <span class="icok">
                  <svg alt="">
                     <use xlink:href="${this.linkIcons}#svg-volume-fill"></use>
                  </svg>
               </span>
            </button>
            <div class="volume-slider">
               <div class="volume-percentage"></div>
            </div>
         </div>`;
      
      let controls = `<div class="controls">${play}${time}${name}${volume}</div>`;

      let html = `<div class="audio-player" data-audio=${this.url}>
         ${timeline}${controls}
      </div>`;


      return html;
   }

   resetResult() {
      this.result.remove();
      this.result = null;
      // this.resultListen = null;
      this.resultDownload = null;
      if (this.limit) {
         this.bar.style.width = '0%';
      }

      this.startButton.removeAttribute('disabled');
      this.startButton.removeAttribute('hidden');
   }
}

// new audioRecorder(recorder);

/* const startButton = recorder.querySelector('[data-record=start]'),
      stopButton = recorder.querySelector('[data-record=stop]'),
      result = recorder.querySelector('[data-record=result]'),
      resultListen = recorder.querySelector('[data-record=result_listen]'),
      resultDownload = recorder.querySelector('[data-record=result_donwload]'),
      inputPost = recorder.querySelector('[data-record=post]');

const constraints = { audio: true, video: false };
let stream = null;
let chunks = [];
let mediaRecorder = null;
let audioBlob = null

navigator.mediaDevices.getUserMedia(constraints)
  .then((_stream) => {
    stream = _stream;
  })
  // если возникла ошибка, значит, либо пользователь отказал в доступе,
  // либо запрашиваемое медиа-устройство не обнаружено
  .catch((err) => {
   //  console.error(`Нет доступа или не найдено устройство: ${err}`);
    alert(`Нет доступа или не найдено устройство: ${err}`);
  });

// startButton.onclick = startRecord;
startButton.addEventListener('click', (e) => {
   startRecord();
}); */
// stopButton.onclick = mediaRecorderStop;

/* async function startRecord() {
   // проверяем поддержку
   if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
     return console.warn('Not supported')
   }
  
   // если запись не запущена
   if (!mediaRecorder) {
      startButton.setAttribute('disabled', '');
      stopButton.removeAttribute('disabled');
      // сбрасываем пердыдущие результаты
      if (result.getAttribute('hidden') != 'true') {
         resultListen.src = '';
         resultDownload.href = '';
         inputPost.value = '';
         result.setAttribute('hidden', '');
      }

      try {
         // получаем поток аудио-данных
         const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
         })
         // создаем экземпляр `MediaRecorder`, передавая ему поток в качестве аргумента
         mediaRecorder = new MediaRecorder(stream)
         // запускаем запись
         mediaRecorder.start()
         // по окончанию записи и наличии данных добавляем эти данные в соответствующий массив
         mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data)
         }
         console.log("start record");
         
         // обработчик окончания записи 
         mediaRecorder.addEventListener("stop", (e) => {
            // создаем объект `Blob` с помощью соответствующего конструктора,
            // передавая ему `blobParts` в виде массива и настройки с типом создаваемого объекта
            // о том, что такое `Blob` и для чего он может использоваться
            // очень хорошо написано здесь: https://learn.javascript.ru/blob
            audioBlob = new Blob(chunks, { type: 'audio/wav' })

            // для вывода проверки записи создаем ссылку на файл
            // метод `createObjectURL()` может использоваться для создания временных ссылок на файлы
            // данный метод "берет" `Blob` и создает уникальный `URL` для него в формате `blob:<origin>/<uuid>`
            const url = URL.createObjectURL(audioBlob)
            resultListen.src = url;
            resultDownload.href = url;
            result.removeAttribute('hidden');

            // для отправки на сервер конвертируем blob в  base64
            let reader = new FileReader();
            reader.readAsDataURL(audioBlob); // конвертирует Blob в base64 и вызывает onload
            reader.onload = function() {
               inputPost.value = reader.result;
               // console.log(reader.result);
            }

            // выполняем очистку
            mediaRecorder = null
            chunks = []
         });

         stopButton.addEventListener('click', function() {
            mediaRecorder.stop();
            startButton.removeAttribute('disabled');
            stopButton.setAttribute('disabled', '');
         });

      } catch (e) {
         console.error(e)
         //  record_img.src = ' img/microphone.png'
      }
      }  *//* else {
      // если запись запущена, останавливаем ее при клике на ту же кнопку
      console.log("stop play");
            
      mediaRecorder.stop()
      } */
/* } */



