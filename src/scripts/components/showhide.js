/* show\hide */

  const showHideList = document.querySelectorAll(
    '[data-control="show-hide"]'
  );

  if (showHideList.length != 0) {
    showHideList.forEach(control => {
      new DisclosureButton(control, true);
      // 2й параметр отвечает за наличие анимации
    });
  }

  const showHideListNoAnim = document.querySelectorAll(
    '[data-control="show-hide no-anim"]'
  );

  if (showHideListNoAnim.length != 0) {
    showHideListNoAnim.forEach(control => {
      new DisclosureButton(control, false);
      // 2й параметр отвечает за наличие анимации
    });
  }
/* END show\hide */
  



