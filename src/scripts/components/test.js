/* test инициализация аудиоплееров */
const audios = document.querySelectorAll('[data-audio]');
if (audios.length > 0) {
    audios.forEach(item => {
        new audioPlayer2(item, item.dataset.audio, item.dataset.nocontrol);
    });
}

const recorders = document.querySelectorAll('[data-audiorecord]');
if (recorders.length > 0) {
    recorders.forEach(item => {
        new audioRecorder(item, {
            showResult: true,
            showPlayer: true, // default player generated script
            showDownload: true,
            limit: 10, // seconds
        });
    });
}