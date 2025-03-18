"use strict";
const startButton = document.querySelector('#start');
   const stopButton = document.querySelector('#stop');
   const audio = document.querySelector('#audio');

const constraints = { audio: true, video: true };
let stream = null;


let chunks = [];
let mediaRecorder;
let audioBlob = null

startButton.onclick = startRecord;
stopButton.onclick = mediaRecorderStop;

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
       console.log("khh");
       
       // обработчик окончания записи (см. ниже)
       mediaRecorder.onstop = mediaRecorderStop
     } catch (e) {
       console.error(e)
      //  record_img.src = ' img/microphone.png'
     }
   } else {
     // если запись запущена, останавливаем ее
     console.log("stop play");
          
     mediaRecorder.stop()
   }
}

function mediaRecorderStop() {
   console.log("funct stop");
   console.log(mediaRecorder);
   mediaRecorder.stop();
   // создаем объект `Blob` с помощью соответствующего конструктора,
   // передавая ему `blobParts` в виде массива и настройки с типом создаваемого объекта
   // о том, что такое `Blob` и для чего он может использоваться
   // очень хорошо написано здесь: https://learn.javascript.ru/blob
   audioBlob = new Blob(chunks, { type: 'audio/mp3' })
   // метод `createObjectURL()` может использоваться для создания временных ссылок на файлы
   // данный метод "берет" `Blob` и создает уникальный `URL` для него в формате `blob:<origin>/<uuid>`
   const url = URL.createObjectURL(audioBlob)

   audio.src = url;
   console.log(url);
   // выполняем очистку
   mediaRecorder = null
   chunks = []
}

