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