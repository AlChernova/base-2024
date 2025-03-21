
"use strict";

/* для работы классов функции slideToggle пришлось перенести перед классами */
/* SLIDE UP */
let slideUp = (target, duration=500) => {

    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout( () => {
          target.style.display = 'none';
          target.style.removeProperty('height');
          target.style.removeProperty('padding-top');
          target.style.removeProperty('padding-bottom');
          target.style.removeProperty('margin-top');
          target.style.removeProperty('margin-bottom');
          target.style.removeProperty('overflow');
          target.style.removeProperty('transition-duration');
          target.style.removeProperty('transition-property');
          //alert("!");
    }, duration);
};

/* SLIDE DOWN */
let slideDown = (target, duration=500) => {

    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout( () => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
};

/* TOOGLE */
let slideToggle = (target, duration = 500) => {
    if (window.getComputedStyle(target).display === 'none') {
      return slideDown(target, duration);
    } else {
      return slideUp(target, duration);
    }
};


/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   Simple accordion pattern example
 */

class Accordion {
  constructor(domNode, wrapNode) {
    this.rootEl = domNode;
    this.wrapEl = wrapNode;
    this.buttonEl = this.rootEl.querySelector('button[aria-expanded]');
    
    const controlsId = this.buttonEl.getAttribute('aria-controls');
    this.contentEl = this.wrapEl.querySelector(`[data-item=${controlsId}]`);
    // console.log(this.wrapEl);

    this.open = this.buttonEl.getAttribute('aria-expanded') === 'true';

    // add event listeners
    this.buttonEl.addEventListener('click', this.onButtonClick.bind(this));
  }

  onButtonClick() {
    this.toggle(!this.open);
  }

  toggle(open) {
    // don't do anything if the open state doesn't change
    if (open === this.open) {
      return;
    }

    // update the internal state
    this.open = open;

    // handle DOM updates
    this.buttonEl.setAttribute('aria-expanded', `${open}`);
    if (open) {
      this.buttonEl.classList.add('active');
      this.contentEl.removeAttribute('hidden');
      slideDown(this.contentEl, 300);
    } else {
      this.buttonEl.classList.remove('active');
      slideUp(this.contentEl, 300);
      setTimeout(() => {
        this.contentEl.setAttribute('hidden', '');
      }, 300);
    }
  }

  // Add public open and close methods for convenience
  open() {
    this.toggle(true);
  }

  close() {
    this.toggle(false);
  }
}
/* =END accordion =============== */ 



/* 
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *   Desc:   Disclosure button widget that implements ARIA Authoring Best Practices
 */
/*
 *   @constructorDisclosureButton
 * exapmple: answer - question
 */
class DisclosureButton {
  constructor(buttonNode, animation) {
    this.buttonNode = buttonNode;
    this.controlledNode = false;
    this.animation = animation;

    var id = this.buttonNode.getAttribute('aria-controls');

    if (id) {
      this.controlledNode = document.getElementById(id);
      // console.log(this.buttonNode, this.controlledNode);
    }

    if (this.buttonNode.getAttribute('aria-expanded') == 'true') {
      this.showContent();
    }
    // this.buttonNode.setAttribute('aria-expanded', 'false');

    this.buttonNode.addEventListener('click', this.onClick.bind(this));
    this.buttonNode.addEventListener('focus', this.onFocus.bind(this));
    this.buttonNode.addEventListener('blur', this.onBlur.bind(this));
  }

  showContent() {
    if (this.controlledNode) {
      if(this.animation) {
        slideDown(this.controlledNode, 300);
      } else {
        this.controlledNode.removeAttribute('hidden');
      }
      this.controlledNode.classList.add('is-show');

    }
  }

  hideContent() {
    if (this.controlledNode) {
      if(this.animation) {
        slideUp(this.controlledNode, 300);
      } else {
        this.controlledNode.setAttribute('hidden', '');
      }
      this.controlledNode.classList.remove('is-show');
    }
  }

  toggleExpand() {
    if (this.buttonNode.getAttribute('aria-expanded') === 'true') {
      this.buttonNode.setAttribute('aria-expanded', 'false');
      this.hideContent();
    } else {
      this.buttonNode.setAttribute('aria-expanded', 'true');
      this.showContent();
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
}

/* Initialize Hide/Show Buttons

window.addEventListener(
  'load',
  function () {
    var buttons = document.querySelectorAll(
      'button[aria-expanded][aria-controls]'
    );

    for (var i = 0; i < buttons.length; i++) {
      new DisclosureButton(buttons[i]);
    }
  },
  false
); */



/* Initialize Disclosure Menus */
/* window.addEventListener(
  'load',
  function () {
    var menus = document.querySelectorAll('.disclosure-nav');
    var disclosureMenus = [];

    for (var i = 0; i < menus.length; i++) {
      disclosureMenus[i] = new DisclosureNav(menus[i]);
    }
  },
  false
); */



/* TABs
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   File:   tabs-manual.js
*   Desc:   Tablist widget that implements ARIA Authoring Practices
*/

class TabsManual {
  constructor(groupNode) {
    this.tablistNode = groupNode;
  
    this.tabs = [];
  
    this.firstTab = null;
    this.lastTab = null;
  
    this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
    this.tabpanels = [];
    
    for (let i = 0; i < this.tabs.length; i += 1) {
        let tab = this.tabs[i];
        let controlsId = tab.getAttribute('aria-controls');
        let tabpanel = document.querySelector(`[data-item=${controlsId}]`);
        let activeTab = tab.getAttribute('aria-selected');
  
      // tab.tabIndex = -1;
      // tab.setAttribute('aria-selected', 'false');
      this.tabpanels.push(tabpanel);
  
      tab.addEventListener('keydown', this.onKeydown.bind(this));
      tab.addEventListener('click', this.onClick.bind(this));
  
      /* if (!this.firstTab) {
        this.firstTab = tab;
      } 
      this.lastTab = tab;
      */
    //  console.log(activeTab, tab);
      if (activeTab == 'true') {
        this.firstTab = tab;
        // console.log(this.firstTab);
      } else {
        this.lastTab = tab;
      }
    }
    // console.log(this.firstTab);
    this.setSelectedTab(this.firstTab);
  }
  
  setSelectedTab(currentTab) {
    for (let i = 0; i < this.tabs.length; i += 1) {
        let tab = this.tabs[i];
      if (currentTab === tab) {
        tab.setAttribute('aria-selected', 'true');
        tab.removeAttribute('tabindex');
        tab.classList.add('active');
        tab.closest('li').classList.add('active');
        this.tabpanels[i].removeAttribute('hidden');
      } else {
        tab.setAttribute('aria-selected', 'false');
        tab.tabIndex = -1;
        tab.closest('li').classList.remove('active');
        tab.classList.remove('active');
        this.tabpanels[i].setAttribute('hidden', '');
      }
    }
  }
  
  moveFocusToTab(currentTab) {
    currentTab.focus();
  }
  
  moveFocusToPreviousTab(currentTab) {
    var index;
  
    if (currentTab === this.firstTab) {
      this.moveFocusToTab(this.lastTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.moveFocusToTab(this.tabs[index - 1]);
    }
  }
  
  moveFocusToNextTab(currentTab) {
    var index;
  
    if (currentTab === this.lastTab) {
      this.moveFocusToTab(this.firstTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.moveFocusToTab(this.tabs[index + 1]);
    }
  }
  
  /* EVENT HANDLERS */
  
  onKeydown(event) {
    var tgt = event.currentTarget,
      flag = false;
  
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        this.moveFocusToPreviousTab(tgt);
        flag = true;
        break;
  
      case 'ArrowRight':
      case 'ArrowDown':
        this.moveFocusToNextTab(tgt);
        flag = true;
        break;
  
      case 'Home':
        this.moveFocusToTab(this.firstTab);
        flag = true;
        break;
  
      case 'End':
        this.moveFocusToTab(this.lastTab);
        flag = true;
        break;
  
      default:
        break;
    }
  
    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }
  
  // Since this example uses buttons for the tabs, the click onr also is activated
  // with the space and enter keys
  onClick(event) {
    this.setSelectedTab(event.currentTarget);
  }
  }
  
  // Initialize tablist
  
  /* window.addEventListener('load', function () {
    var tablists = document.querySelectorAll('[role=tablist].manual');
    for (var i = 0; i < tablists.length; i++) {
      new TabsManual(tablists[i]);
    }
  }); */


/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   menu-button-links.js
 *
 *   Desc:   Creates a menu button that opens a menu of links
 */

class MenuButtonLinks {
  constructor(domNode) {
    this.domNode = domNode;
    this.buttonNode = domNode.querySelector('button');
    this.containerMenu = this.buttonNode.nextElementSibling;
    this.menuNode = domNode.querySelector('[role="menu"]');
    this.menuitemNodes = [];
    this.firstMenuitem = false;
    this.lastMenuitem = false;
    this.firstChars = [];

    this.buttonNode.addEventListener(
      'keydown',
      this.onButtonKeydown.bind(this)
    );
    this.buttonNode.addEventListener('click', this.onButtonClick.bind(this));

    var nodes = domNode.querySelectorAll('[role="menuitem"]');

    for (var i = 0; i < nodes.length; i++) {
      var menuitem = nodes[i];
      this.menuitemNodes.push(menuitem);
      menuitem.tabIndex = -1;
      this.firstChars.push(menuitem.textContent.trim()[0].toLowerCase());

      menuitem.addEventListener('keydown', this.onMenuitemKeydown.bind(this));

      menuitem.addEventListener(
        'mouseover',
        this.onMenuitemMouseover.bind(this)
      );

      if (!this.firstMenuitem) {
        this.firstMenuitem = menuitem;
      }
      this.lastMenuitem = menuitem;
    }

    domNode.addEventListener('focusin', this.onFocusin.bind(this));
    domNode.addEventListener('focusout', this.onFocusout.bind(this));

    window.addEventListener(
      'mousedown',
      this.onBackgroundMousedown.bind(this),
      true
    );
  }

  setFocusToMenuitem(newMenuitem) {
    this.menuitemNodes.forEach(function (item) {
      if (item === newMenuitem) {
        item.tabIndex = 0;
        newMenuitem.focus();
      } else {
        item.tabIndex = -1;
      }
    });
  }

  setFocusToFirstMenuitem() {
    this.setFocusToMenuitem(this.firstMenuitem);
  }

  setFocusToLastMenuitem() {
    this.setFocusToMenuitem(this.lastMenuitem);
  }

  setFocusToPreviousMenuitem(currentMenuitem) {
    var newMenuitem, index;

    if (currentMenuitem === this.firstMenuitem) {
      newMenuitem = this.lastMenuitem;
    } else {
      index = this.menuitemNodes.indexOf(currentMenuitem);
      newMenuitem = this.menuitemNodes[index - 1];
    }

    this.setFocusToMenuitem(newMenuitem);

    return newMenuitem;
  }

  setFocusToNextMenuitem(currentMenuitem) {
    var newMenuitem, index;

    if (currentMenuitem === this.lastMenuitem) {
      newMenuitem = this.firstMenuitem;
    } else {
      index = this.menuitemNodes.indexOf(currentMenuitem);
      newMenuitem = this.menuitemNodes[index + 1];
    }
    this.setFocusToMenuitem(newMenuitem);

    return newMenuitem;
  }

  setFocusByFirstCharacter(currentMenuitem, char) {
    var start, index;

    if (char.length > 1) {
      return;
    }

    char = char.toLowerCase();

    // Get start index for search based on position of currentItem
    start = this.menuitemNodes.indexOf(currentMenuitem) + 1;
    if (start >= this.menuitemNodes.length) {
      start = 0;
    }

    // Check remaining slots in the menu
    index = this.firstChars.indexOf(char, start);

    // If not found in remaining slots, check from beginning
    if (index === -1) {
      index = this.firstChars.indexOf(char, 0);
    }

    // If match was found...
    if (index > -1) {
      this.setFocusToMenuitem(this.menuitemNodes[index]);
    }
  }

  // Utilities

  getIndexFirstChars(startIndex, char) {
    for (var i = startIndex; i < this.firstChars.length; i++) {
      if (char === this.firstChars[i]) {
        return i;
      }
    }
    return -1;
  }

  // Popup menu methods

  openPopup() {
    slideDown(this.containerMenu, 300);
    // this.containerMenu.style.display = 'block';
    this.buttonNode.setAttribute('aria-expanded', 'true');
  }

  closePopup() {
    if (this.isOpen()) {
        this.buttonNode.removeAttribute('aria-expanded');
        slideUp(this.containerMenu, 300);
    //   this.containerMenu.style.display = 'none';
    }
  }

  isOpen() {
    return this.buttonNode.getAttribute('aria-expanded') === 'true';
  }

  // Menu event handlers

  onFocusin() {
    this.domNode.classList.add('focus');
  }

  onFocusout() {
    this.domNode.classList.remove('focus');
  }

  onButtonKeydown(event) {
    var key = event.key,
      flag = false;

    switch (key) {
      case ' ':
      case 'Enter':
      case 'ArrowDown':
      case 'Down':
        this.openPopup();
        this.setFocusToFirstMenuitem();
        flag = true;
        break;

      case 'Esc':
      case 'Escape':
        this.closePopup();
        this.buttonNode.focus();
        flag = true;
        break;

      case 'Up':
      case 'ArrowUp':
        this.openPopup();
        this.setFocusToLastMenuitem();
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onButtonClick(event) {
    if (this.isOpen()) {
      this.closePopup();
      this.buttonNode.focus();
    } else {
      this.openPopup();
      this.setFocusToFirstMenuitem();
    }

    event.stopPropagation();
    event.preventDefault();
  }

  onMenuitemKeydown(event) {
    var tgt = event.currentTarget,
      key = event.key,
      flag = false;

    function isPrintableCharacter(str) {
      return str.length === 1 && str.match(/\S/);
    }

    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    if (event.shiftKey) {
      if (isPrintableCharacter(key)) {
        this.setFocusByFirstCharacter(tgt, key);
        flag = true;
      }

      if (event.key === 'Tab') {
        this.buttonNode.focus();
        this.closePopup();
        flag = true;
      }
    } else {
      switch (key) {
        case ' ':
          window.location.href = tgt.href;
          break;

        case 'Esc':
        case 'Escape':
          this.closePopup();
          this.buttonNode.focus();
          flag = true;
          break;

        case 'Up':
        case 'ArrowUp':
          this.setFocusToPreviousMenuitem(tgt);
          flag = true;
          break;

        case 'ArrowDown':
        case 'Down':
          this.setFocusToNextMenuitem(tgt);
          flag = true;
          break;

        case 'Home':
        case 'PageUp':
          this.setFocusToFirstMenuitem();
          flag = true;
          break;

        case 'End':
        case 'PageDown':
          this.setFocusToLastMenuitem();
          flag = true;
          break;

        case 'Tab':
          this.closePopup();
          break;

        default:
          if (isPrintableCharacter(key)) {
            this.setFocusByFirstCharacter(tgt, key);
            flag = true;
          }
          break;
      }
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onMenuitemMouseover(event) {
    var tgt = event.currentTarget;
    tgt.focus();
  }

  onBackgroundMousedown(event) {
    if (!this.domNode.contains(event.target)) {
      if (this.isOpen()) {
        this.closePopup();
        this.buttonNode.focus();
      }
    }
  }
}

/* // END классы конструкторы для доступных компонентов */

/* наличие и параметры сессии */
// в контексте старого программирования
// сессия пользователя может быть определена двумя способами:
// 1. если есть активные формы, то обязательно присутствие 3х input[type=hidden]: p1, p2, p_h
// 2. параметры могут быть прописаны в URL-страницы, те же: p1, p2, p_h
// а может ничего не быть.
// Если сессия есть, но параметры не находятся, а нужны - пните разработчиков =D
function checkSession() {
    // ищем и проверяем инпуты
    const p1Input = document.querySelector('input[name="p1"]');
    const p2Input = document.querySelector('input[name="p2"]');
    const p_hInput = document.querySelector('input[name="p_h"]');
    let hasInputs = (p1Input != null && p1Input != undefined) 
                    && (p2Input != null && p2Input != undefined) 
                    && (p_hInput != null && p_hInput != undefined);

    // ищем и проверяем внутри url
    const url = new URL(window.location);
    const p1Url = url.searchParams.get('p1');
    const p2Url = url.searchParams.get('p2');
    const p_hUrl = url.searchParams.get('p_h');
    let hasInUrl = (p1Url != null) 
                   && (p2Url != null) 
                   && (p_hUrl != null);

    let result;
    if (hasInputs || hasInUrl) {
        const p1 = hasInUrl ? p1Url : p1Input.value;
        const p2 = hasInUrl ? p2Url : p2Input.value;
        const p_h = hasInUrl ? p_hUrl : p_hInput.value;
        result = ['true', p1, p2, p_h];
    } else if (!hasInputs && !hasInUrl) {
        result = ['false'];
        console.log("Параметры сессии не обнаружены");
    }
    return result;
}


/* Поле поиска сотрудника определяем к какому json стучаться */
function defineUrlApiEmployees(thisSession) {
    let apiCheck;
    /* стоит проверка рабочий или тестовый сервер */
    if (window.location.hostname == 'shelly.kpfu.ru') {
      // на рабочем проверяем наличие сессии
      if (thisSession[0]) {
        apiCheck = `https://shelly.kpfu.ru/e-ksu/ip_catalog_pack.json_employee_list?p1=${thisSession[1]}&p2=${thisSession[2]}&p_h=${thisSession[3]}`;
        // console.log('apiCheck = ' + apiCheck);
      }
    } else {
      /* если тестовый, то берем тестовый json */
      apiCheck = "/_data/employees.json";
    }
    return apiCheck
  }

window.addEventListener('load', function () {
    let winWidth = window.innerWidth;
    
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
    /* боковое меню */
/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   Supplemental JS for the disclosure menu keyboard behavior
 * 
 * Source https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
 * reworked for vertical and added nesting.
 */

class NestedNav {
  constructor(domNode, controlSelector) {
    this.rootNode = domNode;
    this.menuNodes = [];
    this.openIndex = null;
    this.useArrowKeys = true;
    this.controlNodes = [
      ...this.rootNode.querySelectorAll(
        `${controlSelector}`
      ),
    ];
    // console.log(this.controlNodes);

    this.controlNodes.forEach((control, i) => {
      // handle button + menu
      if (
        control.tagName.toLowerCase() === 'button' &&
        control.hasAttribute('aria-controls')
      ) {
        let idMenu = control.getAttribute('aria-controls');
        let menu = control.parentNode.querySelector(`#${idMenu}`);
        if (menu) {
          // save ref controlled menu
          this.menuNodes.push(menu);

          // collapse menus
          /* node.setAttribute('aria-expanded', 'false');
          this.toggleMenu(menu, false); */
          if (control.getAttribute('aria-expanded') == 'true') {
            this.openIndex = i;
            this.toggleMenu(menu, true);
          }

          // attach event listeners
          // menu.addEventListener('keydown', this.onMenuKeyDown.bind(this));
          control.addEventListener('click', this.onButtonClick.bind(this));
          control.addEventListener('keydown', this.onButtonKeyDown.bind(this));
        }
      }
      // handle links
      else {
        this.menuNodes.push(null);
        control.addEventListener('keydown', this.onLinkKeyDown.bind(this));
      }
    });
  
    // закрываем все меню, если фокус ушел с него
    // this.rootNode.addEventListener('focusout', this.onBlur.bind(this));
  }

  controlFocusByKey(keyboardEvent, nodeList, currentIndex) {
    switch (keyboardEvent.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        keyboardEvent.preventDefault();
        if (currentIndex > -1) {
          var prevIndex = Math.max(0, currentIndex - 1);
          nodeList[prevIndex].focus();
        }
        break;
        case 'ArrowDown':
        case 'ArrowRight':
          keyboardEvent.preventDefault();
          if (currentIndex > -1) {
            var nextIndex = Math.min(nodeList.length - 1, currentIndex + 1);
            nodeList[nextIndex].focus();
          }
        break;
      case 'Home':
        keyboardEvent.preventDefault();
        nodeList[0].focus();
        break;
      case 'End':
        keyboardEvent.preventDefault();
        nodeList[nodeList.length - 1].focus();
        break;
    }
  }

  // public function to close open menu
  close() {
    this.toggleExpand(this.openIndex, false);
  }

  onBlur(event) {
    var menuContainsFocus = this.rootNode.contains(event.relatedTarget);
    if (!menuContainsFocus && this.openIndex !== null) {
      this.toggleExpand(this.openIndex, false);
    }
  }

  onButtonClick(event) {
    var button = event.target;
    var buttonIndex = this.controlNodes.indexOf(button);
    var buttonExpanded = button.getAttribute('aria-expanded') === 'true';
    this.toggleExpand(buttonIndex, !buttonExpanded);
  }

  onButtonKeyDown(event) {
    var targetButtonIndex = this.controlNodes.indexOf(document.activeElement);
    // close on escape
    if (event.key === 'Escape') {
      this.toggleExpand(this.openIndex, false);
    }

    // move focus into the open menu if the current menu is open
    else if (
      this.useArrowKeys &&
      this.openIndex === targetButtonIndex &&
      event.key === 'ArrowDown'
    ) {
      event.preventDefault();
      this.menuNodes[this.openIndex].querySelector('.subMenuSide__link').focus();
    }

    // handle arrow key navigation between top-level buttons, if set
    else if (this.useArrowKeys) {
      this.controlFocusByKey(event, this.controlNodes, targetButtonIndex);
    }
  }

  onLinkKeyDown(event) {
    var targetLinkIndex = this.controlNodes.indexOf(document.activeElement);

    // handle arrow key navigation between top-level buttons, if set
    if (this.useArrowKeys) {
      this.controlFocusByKey(event, this.controlNodes, targetLinkIndex);
    }
  }

  onMenuKeyDown(event) {
    if (this.openIndex === null) {
      return;
    }

    var menuLinks = Array.prototype.slice.call(
      this.menuNodes[this.openIndex].querySelectorAll('a')
    );
    var currentIndex = menuLinks.indexOf(document.activeElement);

    // close on escape
    if (event.key === 'Escape') {
      this.controlNodes[this.openIndex].focus();
      this.toggleExpand(this.openIndex, false);
    }

    // handle arrow key navigation within menu links, if set
    else if (this.useArrowKeys) {
      this.controlFocusByKey(event, menuLinks, currentIndex);
    }
  }

  toggleExpand(index, expanded) {
    // close все другие открытые меню
    /* if (this.openIndex !== index) {
      this.toggleExpand(this.openIndex, false);
    } */

    // handle menu at called index
    if (this.controlNodes[index]) {
      this.openIndex = expanded ? index : null;
      this.controlNodes[index].setAttribute('aria-expanded', expanded);
      this.toggleMenu(this.menuNodes[index], expanded);
    }
  }

  toggleMenu(domNode, show) {
    if (domNode) {
      // domNode.style.display = show ? 'block' : 'none';
      if (show) {
        slideDown(domNode, 200);
      } else {
        slideUp(domNode, 200);
      }
    }
  }

  updateKeyControls(useArrowKeys) {
    this.useArrowKeys = useArrowKeys;
  }
}


const menus = document.querySelectorAll('.menuSide__list');
let disclosureMenus = [];

if (menus.length != 0) {
  for (var i = 0; i < menus.length; i++) {
    disclosureMenus[i] = new NestedNav(menus[i], ".menuSide__link");
  }
}
const subMenus = document.querySelectorAll('.subMenuSide');
let disclosureSubMenus = [];

if (subMenus.length != 0) {
  for (var i = 0; i < subMenus.length; i++) {
    disclosureSubMenus[i] = new NestedNav(subMenus[i], `#${subMenus[i].getAttribute('id')} > * > .subMenuSide__link`);
  }
}



/* END боковое мееню */
    
    /* ==== попапы ==== */

/* = Нативный dialog Модальное окно = */
const listBtnPopup = document.querySelectorAll('[data-modal]');
const listCloseBtnPopup = document.querySelectorAll('[data-modal-close]');
const listPopup = document.querySelectorAll('.winModal');

// открыть
if (listBtnPopup.length != 0) {
    listBtnPopup.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let thisBtn = e.target.closest('[data-modal]');
            if (!thisBtn) return;
            let target = thisBtn.getAttribute('data-modal');
            document.querySelector(`#${target}`).showModal();
            document.body.classList.add("scroll-lock");
        });
    });
}

// анимация закрытия 
function animateCloseModal(modal) {
    modal.classList.add("hide");
    let onAnimationEnd = () => {
        modal.classList.remove("hide");
        modal.close();
        modal.removeEventListener("animationend", onAnimationEnd);
    };            
    
    modal.addEventListener("animationend", onAnimationEnd);
    document.body.classList.remove("scroll-lock");
};

// закрыть кнопкой
if (listCloseBtnPopup.length != 0) {
    listCloseBtnPopup.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let thisBtn = e.target.closest('[data-modal-close]');
            if (!thisBtn) return;
            let thisPopup = thisBtn.closest('dialog');
            animateCloseModal(thisPopup);
            // thisPopup.close();
        });
    });
}

// закрыть кликом по фону
const handleModalClick = ({ currentTarget, target }) => {
    const isClickedOnBackdrop = target === currentTarget;
    if (isClickedOnBackdrop) {
        animateCloseModal(currentTarget);
    }
};
/*  */
if (listPopup.length != 0) {
    listPopup.forEach(popup => {
        let blocker = popup.hasAttribute('data-blocker');
        if (!blocker) {
            /* если просто модалка, то вешаем закрытие по фону */
            popup.addEventListener("click", handleModalClick);
        } else {
            /* если блокирующая модалка, то сразу открываем и убираем закрытие по отмене */
            popup.showModal();
            popup.addEventListener('cancel', (event) => {
                event.preventDefault();
            });
        }
    });
}

/* = FANCYBOX =*/
// отключаем функции карусели для текстовых окон,
// а то когда их несколько, он объединяет их в карусель 
Fancybox.bind("[data-fancybox='dialog']", {
    groupAttr: false,
    infinite: false,
    // этот пункт сделать для картинок чтобы отключить превью
    Thumbs: {
        autoStart: false
    }
}); 


/* = Нативный dialog просто поп-ап (типа ушек алертов) = */
const listBtnAlert = document.querySelectorAll('[data-popup]');
const listCloseBtnAlert = document.querySelectorAll('[data-popup-close]');

// открыть
if (listBtnAlert.length != 0) {
    listBtnAlert.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let thisBtn = e.target.closest('[data-popup]');
            if (!thisBtn) return;
            let target = thisBtn.getAttribute('data-popup');
            document.querySelector(`#${target}`).show();
        });
    });
}

// закрыть
if (listCloseBtnAlert.length != 0) {
    listCloseBtnAlert.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let thisBtn = e.target.closest('[data-popup-close]');
            if (!thisBtn) return;
            let thisPopup = thisBtn.closest('dialog');
            animateCloseModal(thisPopup);
            // thisPopup.close();
        });
    });
}

/* ==END == попапы ==== */


    
    /* test инициализация аудиоплееров */
const audios = document.querySelectorAll('[data-audio]');
if (audios.length > 0) {
    audios.forEach(item => {
        new audioPlayer2(item);
    });
}

const recorders = document.querySelectorAll('[data-audiorecord]');
if (recorders.length > 0) {
    recorders.forEach(item => {
        new audioRecorder(item, {
            showResult: true,
            // showPlayer: true, // default player generated script
            showCustomPlayer: "true", // 
            showDownload: true,
            limit: 30, // seconds
            linkIcons: "/images/sprite.svg" // путь к svg спрайту
        });
    });
}
    
},
false
);
    /* Все для работы форм */

/*  вызов стилизованного селекта, если он есть  */
const hasCustomSelect = document.querySelector('.select-custom');
const arrInitCustomSelect = [];
const paramsCustomSelect = {
    OnlyList: {
        allowHTML: true,
        searchEnabled: false,
        shouldSort: false,
        placeholder: true,
        // placeholderValue: 'Выберите',
        // searchPlaceholderValue: 'text',
        itemSelectText: '',
        loadingText: 'Загружается...',
        noResultsText: 'Ничего не найдено',
        noChoicesText: 'Вы уже все выбрали',
        uniqueItemText: 'Можно добавлять только уникальные значения',
        customAddItemText: 'Можно добавлять только значения, соответствующие определенным условиям',
    },
    SearchByList: {
        allowHTML: true,
        placeholderValue: 'Введите, чтобы найти',
        placeholder: 'Введите, чтобы найти',
        searchPlaceholderValue: 'Введите, чтобы найти',
        shouldSort: false, // отвечает за сортировку списка
        shouldSortItems: false,
        itemSelectText: '',
        loadingText: 'Загружается...',
        noResultsText: 'Ничего не найдено',
        noChoicesText: 'Вы уже все выбрали',
        uniqueItemText: 'Можно добавлять только уникальные значения',
        customAddItemText: 'Можно добавлять только значения, соответствующие определенным условиям',        
    }
}
if (hasCustomSelect !== undefined) {
    initCustomSelect();
}

function initCustomSelect() {
    /* запуск */
    const customSelects = document.querySelectorAll('.select-custom select');
    customSelects.forEach((select, i) => {

        if(select.hasAttribute('data-searchlist')) {
            arrInitCustomSelect[i] = {
                name: select.id,
                choices: new Choices(select, paramsCustomSelect.SearchByList)
            };
            // console.log(arrInitCustomSelect[i]);
        } else {
            arrInitCustomSelect[i] = {
                name: select.id,
                choices: new Choices(select, paramsCustomSelect.OnlyList)
            };             
        }


        /* select.addEventListener('showDropdown', function (e) {
            let parent = e.target.closest('.inputItem');
            parent.classList.add('_focused');
        },
        false,); */
        /* select.addEventListener('change', function (e) {
            let parent = e.target.closest('.inputItem');
            parent.classList.add('_filled');
        },
        false,); */
    });
}
  
/* Local language for date range */
// определение общих параметров в src/scripts/includes/const.js (build .. main.js)
// примеры вызова  с доп. параметрами в src/scripts/modules/docs/daterange.js (build .. scripts/modules/docs.js)



/* END Все для работы форм */



/* для закрытия попапа с iframe по кнопке отмена */
function closeIframeMain(){ 
    // $(".is-close").trigger("click"); 
    Fancybox.close();
}

/* вызов попапа из другого попапа */
function openIframeTwo(source) {
    console.log(window.frames);
    Fancybox.show([
        {
            src: `calculation-popup.html?source=${source}`,
            type: "iframe",
            preload: false,
            width: 600,
            height: 300,
        },
    ]);
}
/* обмен данными между попапами */
function insertDataTo(source, data) {
    let frames = document.querySelector(`iframe#${source}`);
    console.log(frames);
    let output = frames.contentDocument.querySelector('#testdata');
    output.textContent = data;

}