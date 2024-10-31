/* Sidebar содержит main menu */

class toggleMenu {
    constructor(buttonNode, allFocusedInSide) {
      this.buttonNode = buttonNode;
      this.controlledNode = false;
      this.allFocused = allFocusedInSide;
  
      this.id = this.buttonNode.getAttribute('aria-controls');
  
      if (this.id) {
        this.controlledNode = document.getElementById(this.id);
        /* this.allFocused = Array.from(this.controlledNode.querySelectorAll('a, button:not(:disabled), input:not([disabled]), select:not([disabled]), textarea:not([disabled])')); */
      }
  
      if (this.buttonNode.getAttribute('aria-expanded') == 'true') {
        this.showContent();
      }
      // this.buttonNode.setAttribute('aria-expanded', 'false');
  
      this.buttonNode.addEventListener('click', this.onClick.bind(this));
      this.buttonNode.addEventListener('focus', this.onFocus.bind(this));
      this.buttonNode.addEventListener('blur', this.onBlur.bind(this));
      if (winWidth < 1256) {
        this.controlledNode.addEventListener('keydown', this.controlByKey.bind(this));
        window.addEventListener('focusin', this.onBlurMenu.bind(this));
      }
    }
  
    showContent() {
      if (this.controlledNode) {
        this.buttonNode.setAttribute('aria-label', 'Закрыть меню');
        this.controlledNode.classList.add('is-open');
        this.controlledNode.tabIndex = 0;
        this.allFocused.forEach((el) => el.removeAttribute('tabIndex'));
        document.querySelector('.overlay').classList.add('is-active');
        document.querySelector('.overlay').tabIndex = 0;
        document.querySelector('body').classList.add('scroll-lock');
      }
    }
  
    hideContent() {
      if (this.controlledNode) {
          this.buttonNode.setAttribute('aria-label','Открыть меню');
          this.controlledNode.classList.remove('is-open');
          this.controlledNode.tabIndex = -1;
          this.allFocused.forEach((el) => el.tabIndex = -1);
          document.querySelector('.overlay').classList.remove('is-active');
          document.querySelector('.overlay').removeAttribute('tabIndex');
          document.querySelector('body').classList.remove('scroll-lock');
      }
    }
  
    toggleExpand() {
      if (this.buttonNode.getAttribute('aria-expanded') === 'true') {
        this.buttonNode.setAttribute('aria-expanded', 'false');
        this.hideContent();
        this.buttonNode.focus();
      } else {
        this.buttonNode.setAttribute('aria-expanded', 'true');
        this.showContent();
        this.controlledNode.focus();
      }
    }
  
    /* EVENT HANDLERS */
  
    onClick() {
      this.toggleExpand();
    }
  
    onFocus() {
      this.buttonNode.classList.add('focus');
    }
  
    onBlur() {
      this.buttonNode.classList.remove('focus');
    }

    controlByKey(keyboardEvent) {
        switch (keyboardEvent.key) {
            case 'Escape':
                this.buttonNode.setAttribute('aria-expanded', 'false');
                this.hideContent();
                this.buttonNode.focus();
                break;                
        }
    }
    onBlurMenu(focusEvent) {
        let focusEl = focusEvent.target;
        let parent = focusEl.closest(`#${this.id}`);
        if (!parent && focusEl !== this.buttonNode && this.buttonNode.getAttribute('aria-expanded') === 'true') {
            this.buttonNode.setAttribute('aria-expanded', 'false');
            this.hideContent();
            this.buttonNode.focus();
        }
    } 
}

const btnOpenMenu = document.querySelector('.header__openMenu');
const sideContent = document.querySelector('.sidebar__content');
if (sideContent) {
  const allFocusedInSide = sideContent.querySelectorAll('a, button:not(:disabled), input:not([disabled]), select:not([disabled]), textarea:not([disabled])');

  let initToggleMenu = false;

  if (winWidth < 1256) {
      sideContent.tabIndex = '-1';
      allFocusedInSide.forEach((el) => {
          el.tabIndex = '-1';
      });
      initToggleMenu = new toggleMenu(btnOpenMenu, allFocusedInSide);
  }
  
  window.addEventListener('resize', () => {
      winWidth = window.innerWidth;
      
      if (winWidth >= 1256) {
          sideContent.removeAttribute('tabIndex');
          allFocusedInSide.forEach((el) => {
              el.removeAttribute('tabIndex');
          });        
      } else {
          sideContent.tabIndex = '-1';
          allFocusedInSide.forEach((el) => {
              el.tabIndex = '-1';
          });
          if (!initToggleMenu) {
            initToggleMenu = new toggleMenu(btnOpenMenu);
          }
      }
  });

}
/* END Sidebar содержит main menu */