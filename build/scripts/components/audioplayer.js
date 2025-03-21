"use strict";
/* Audio player
Aleksandra Chernova, 2025.03.14 */
class audioPlayer2 {
    // методы класса
    constructor(item, options) { 
        this.item = item;
        this.source = this.item.dataset.audio;
        this.control = this.item.dataset.nocontrol ? false : true;
        const opts = options || {};

        // consts
        this.audio = new Audio(this.source);
        this.playBtn = this.item.querySelector(".controls .toggle-play");
        this.volumeButton = this.item.querySelector(".volume-button");
        this.volumeSlider = this.item.querySelector(".controls .volume-slider");
        this.timeline = this.item.querySelector(".timeline");
        this.progressBar = this.item.querySelector(".progress"); 
        this.selfDuration = opts.duration || false;       

        // listeners
        this.audio.addEventListener("loadeddata", this.loadeddata.bind(this), false)
        this.volumeSlider.addEventListener("click", this.controlVolume.bind(this), false);
        // this.volumeButton.addEventListener("click", this.toggleVolumeBtn.bind(this), false);
        
        if (this.control) {
            this.audio.addEventListener('ended', this.endPlay.bind(this), false)
            this.playBtn.addEventListener("click", this.togglePlay.bind(this), false);
            this.timeline.addEventListener("click", this.setTime.bind(this), false);
        } else {
            this.countClicks = 0;
            this.playBtn.addEventListener("click", this.oncePlay.bind(this), false);
        }

        // console.log(this.audio);
        //check audio percentage and update time accordingly
        setInterval(() => {
            this.progressBar.style.width = this.audio.currentTime / this.audio.duration * 100 + "%";
            this.item.querySelector(".time .current").textContent = this.getTimeCodeFromNum(
                this.audio.currentTime
            );
        }, 500);
    }
    loadeddata() {
        // console.log("loadeddata");
        this.duration = this.audio.duration == "Infinity" ? this.selfDuration : this.audio.duration;
        // console.log(duration);

        this.item.querySelector(".time .length").textContent = this.getTimeCodeFromNum(this.duration);
        this.audio.volume = .75;
    }
    
    //toggle between playing and pausing on button click
    togglePlay(e) {
        // console.log("togglePlayBtn");
        
        let btn = e.target.closest('.toggle-play');
        if (!btn) return;

        if (this.audio.paused) {
            this.playBtn.classList.remove("play");
            this.playBtn.classList.add("pause");
            this.audio.play();
        } else {
            this.playBtn.classList.remove("pause");
            this.playBtn.classList.add("play");
            this.audio.pause();
        }
    }

    // once play without control timeline
    oncePlay(e) {
        // console.log("oncePlay");

        if (this.countClicks == 0) {
            this.countClicks = 1;
            // playBtn.classList.remove("play");
            this.playBtn.classList.add("disabled");
            this.audio.play();
        } else {
            // playBtn.setAttribute('hidden', '');
        }
    }

    endPlay() {
        this.playBtn.classList.remove("pause");
        this.playBtn.classList.add("play");
    }

    //click volume slider to change volume
    controlVolume(e) {
        // console.log("controlVolume");
        
        const sliderWidth = window.getComputedStyle(this.volumeSlider).width;
        const newVolume = e.offsetX / parseInt(sliderWidth);
        this.audio.volume = newVolume;
        this.item.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
    }

    // toggle mute volume
    toggleVolumeBtn(e) {
        /* const volumeEl = audioPlayer.querySelector(".volume-container .volume");
        audio.muted = !audio.muted;
        if (audio.muted) {
        volumeEl.classList.remove("icono-volumeMedium");
        volumeEl.classList.add("icono-volumeMute");
        } else {
        volumeEl.classList.add("icono-volumeMedium");
        volumeEl.classList.remove("icono-volumeMute");
        } */
    }

    //click on timeline to skip around
    setTime(e) {
        // console.log("setTime");
        
        const timelineWidth = window.getComputedStyle(this.timeline).width;
        const timeToSeek = e.offsetX / parseInt(timelineWidth) * this.duration;
        this.audio.currentTime = timeToSeek;
    }

    getTimeCodeFromNum(num) {
        let seconds = parseInt(num);
        let minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
        const hours = parseInt(minutes / 60);
        minutes -= hours * 60;
      
        if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
        return `${String(hours).padStart(2, 0)}:${minutes}:${String(
          seconds % 60
        ).padStart(2, 0)}`;
    }
}
