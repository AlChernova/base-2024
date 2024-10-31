/* Загрузка файлов. 
Стилизация дефолтной браузерной. 
Без немедленной отправки на сервер */

const uploadFiles = document.querySelectorAll('.uploadFile input'),
      delFiles = document.querySelectorAll('.uploadFile__delete'),
      dropFiles = document.querySelectorAll('.uploadFile');
let fileInstance;
let boxUpload;

if (uploadFiles.length > 0) {
    /* выбор файла */
    uploadFiles.forEach(item => {
        item.addEventListener('input', function (e) {
            boxUpload = e.target.closest('.uploadFile');
            boxUpload.classList.add('_selected');
            boxUpload.querySelector('.uploadFile__add').classList.add("visually-hidden");
            let nameFile = e.target.files[0].name;
            let outputName = boxUpload.querySelector('.uploadFile__name');
            outputName.textContent = `${nameFile}`;
            boxUpload.querySelector('.uploadFile__result').removeAttribute('hidden');
            // console.log(nameFile);
        });
    });
    /* сброс выбора файла */
    delFiles.forEach(item => {
        item.addEventListener('click', function (e) {
            boxUpload = e.target.closest('.uploadFile');
            boxUpload.querySelector('.uploadFile__name').textContent = "";
            boxUpload.querySelector('.uploadFile__result').setAttribute('hidden', '');
            boxUpload.classList.remove('_selected');
            boxUpload.querySelector('.uploadFile__add').classList.remove("visually-hidden");
            boxUpload.querySelector('input').value = '';
        });
    });

    /* если файл уже выбран */
    window.addEventListener('load', () => {
        // console.log('window load');
        uploadFiles.forEach(item => {
            if (item.files.length != 0) {
                // console.log(item.files[0].name);
                boxUpload = item.closest('.uploadFile');
                boxUpload.classList.add('_selected');
                boxUpload.querySelector('.uploadFile__add').classList.add("visually-hidden");
                let nameFile = item.files[0].name;
                let outputName = boxUpload.querySelector('.uploadFile__name');
                outputName.textContent = `${nameFile}`;
                boxUpload.querySelector('.uploadFile__result').classList.remove('_hide');
            } else {
                // console.log('empty');
            }
        });
    });

}
/* END Загрузка файлов. 
Стилизация дефолтной браузерной. */