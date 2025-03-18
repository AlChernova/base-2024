/* test инициализация аудиоплееров */
const audios = document.querySelectorAll('[data-audio]');
if (audios.length > 0) {
    audios.forEach(item => {
        new audioPlayer2(item, item.dataset.audio, item.dataset.nocontrol);
    });
}

