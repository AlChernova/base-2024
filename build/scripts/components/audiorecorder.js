"use strict";
const recorder = document.querySelector('.audiorecord');
const startButton = recorder.querySelector('[data-record=start]'),
      stopButton = recorder.querySelector('[data-record=stop]'),
      result = recorder.querySelector('[data-record=result]'),
      resultListen = recorder.querySelector('[data-record=result_listen]'),
      resultDownload = recorder.querySelector('[data-record=result_donwload]'),
      inputPost = recorder.querySelector('[data-record=post]');
   /* const stopButton = document.querySelector('#stop');
   const audio = document.querySelector('#audio');
   const downloadLink = document.querySelector('#downloadrecord'); */

const constraints = { audio: true, video: false };
let stream = null;
let chunks = [];
let mediaRecorder = null;
let audioBlob = null

// startButton.onclick = startRecord;
startButton.addEventListener('click', (e) => {
   startRecord();
});
// stopButton.onclick = mediaRecorderStop;

/* navigator.mediaDevices.getUserMedia(constraints)
  .then((_stream) => {
    stream = _stream;
  })
  // если возникла ошибка, значит, либо пользователь отказал в доступе,
  // либо запрашиваемое медиа-устройство не обнаружено
  .catch((err) => {
    console.error(`Нет доступа или не найдено устройство: ${err}`);
   //  alert(`Нет доступа или не найдено устройство: ${err}`);
  }); */

async function startRecord() {
   // проверяем поддержку
   if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
     return console.warn('Not supported')
   }
  
   // если запись не запущена
   if (!mediaRecorder) {
      startButton.setAttribute('disabled', '');
      stopButton.removeAttribute('disabled');
      // сбрасываем результаты
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
      } /* else {
      // если запись запущена, останавливаем ее
      console.log("stop play");
            
      mediaRecorder.stop()
      } */
}



