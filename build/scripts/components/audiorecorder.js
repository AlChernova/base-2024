"use strict";
/* Audio player
Aleksandra Chernova, 2025.03.19 */

class audioRecorder {
   constructor(recorder) {
      // consts controls
      this.recorder = recorder;
      this.startButton = this.recorder.querySelector('[data-record=start]');
      this.stopButton = this.recorder.querySelector('[data-record=stop]');
      this.result = this.recorder.querySelector('[data-record=result]');
      this.resultListen = this.recorder.querySelector('[data-record=result_listen]');
      this.resultDownload = this.recorder.querySelector('[data-record=result_download]');
      this.inputPost = this.recorder.querySelector('[data-record=post]');

      // consts datas
      this.constraints = { audio: true, video: false };
      this.stream = null;
      this.chunks = [];
      this.mediaRecorder = null;
      this.audioBlob = null

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

   async startRecord() {
      /* this.startButton.disabled = true;
      this.stopButton.disabled = false;
      this.result.disabled = true;
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.mediaRecorder.addEventListener('dataavailable', this.handleDataAvailable.bind(this));
      this.mediaRecorder.addEventListener('stop', this.handleStop.bind(this));
      this.mediaRecorder.start(); */

      // проверяем поддержку
      if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
         return console.warn('Not supported')
      }
      
      if (!this.mediaRecorder) {
         this.startButton.setAttribute('disabled', '');
         this.stopButton.removeAttribute('disabled');
         // сбрасываем пердыдущие результаты
         if (this.result.getAttribute('hidden') != 'true') {
            this.resultListen.src = '';
            this.resultDownload.href = '';
            this.inputPost.value = '';
            this.result.setAttribute('hidden', '');
         }

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
               const url = URL.createObjectURL(this.audioBlob)
               this.resultListen.src = url;
               this.resultDownload.href = url;
               this.result.removeAttribute('hidden');

               // для отправки на сервер конвертируем blob в  base64
               let reader = new FileReader();
               reader.readAsDataURL(this.audioBlob); // конвертирует Blob в base64 и вызывает onload
               reader.onload = (e) => {
                  this.inputPost.value = reader.result;
                  // console.log(reader.result);
               }

               // выполняем очистку
               this.mediaRecorder = null
               this.chunks = []
            });

            this.stopButton.addEventListener('click', (e) => {
               this.mediaRecorder.stop();
               this.startButton.removeAttribute('disabled');
               this.stopButton.setAttribute('disabled', '');
            });
   
         } catch (e) {
            console.error(e)
            //  record_img.src = ' img/microphone.png'
         }
      }
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



