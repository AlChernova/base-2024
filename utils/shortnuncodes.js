module.exports = {

    input: function (field) {
        // type - text, date, tel i t.p.
        // label, id
        // modifycatorBox, modifycatorInput, modifycatorLabel
        // required, disabled
        // value
        let star;
        if (field.required) {
            star = `<span class="color-danger">*</span>`;
        } else {
            star = '';
        }
        
        return `<div class="inputItem ${field.modifycatorBox ? `${field.modifycatorBox}` : ''}">
        <label class="inputItem__label ${field.modifycatorLabel ? `${field.modifycatorLabel}` : ''}" for="${field.id}">
            ${star}
            ${field.label}
        </label>
        <div class="inputItem__box">
            <input class="default-input ${field.modifycatorInput ? `default-input--${field.modifycatorInput}` : ''} inputItem__field" id="${field.id}" name="${field.id}" type="${field.type}" ${field.value ? `value="${field.value}"` : ''}
            ${field.required ? `required` : ''} ${field.disabled ? `disabled` : ''}>
        </div>
    </div>`
    },
    textarea: function (field) {
        // row, col
        // label, id
        // required, modifycatorBox, modifycatorInput
        // disabled
        // value
        
        return `<div class="inputItem ${field.modifycatorBox ? `${field.modifycatorBox}` : ''}">
        <label class="inputItem__label" for="${field.id}">
            ${field.required ? `<span class="color-danger">*</span>` : ''}
            ${field.label}
        </label>
        <div class="inputItem__box">
            <textarea 
            class="default-input ${field.modifycatorInput ? `default-input--${field.modifycatorInput}` : ''}" 
            id="${field.id}" name="${field.id}" 
            cols="${field.cols}" rows="${field.rows}"
            ${field.required ? `required` : ''} 
            ${field.disabled ? `disabled` : ''}
            >${field.value ? `${field.value}` : ''}</textarea>
        </div>
    </div>`
    },
    checkbox: function (field) {
        // label, id, name
        // modifycatorBox, modifycatorInput
        // required, disabled
                
        return `<div class="inputItem">
            <label class="checkboxItem">
            <input class="checkboxItem__control" type="checkbox" name="${field.name}" id="${field.id}" ${field.required ? `required` : ''} ${field.disabled ? `disabled` : ''}>
            <span class="checkboxItem__label">${field.label}</span>
            </label>
            </div>`
    },
    radio: function (field) {
        // label, id, name
        // modifycatorBox, modifycatorInput
        // required, disabled
                
        return `<div class="inputItem">
            <label class="radioItem">
            <input class="radioItem__control" type="radio" name="${field.name}" id="${field.id}" ${field.required ? `required` : ''} ${field.disabled ? `disabled` : ''}>
            <span class="radioItem__label">${field.label}</span>
            </label>
            </div>`
    },
    upload: function(field) {
        // label, id
        // required, modifycatorBox, modifycatorInput, modifycatorLabel
        // disabled
        return `<div class="inputItem uploadFile ${field.modifycatorBox ? `${field.modifycatorBox}` : ''}">
                <label class="inputItem__label ${field.modifycatorLabel ? `${field.modifycatorLabel}` : ''}"  for="${field.id}">
                    ${field.required ? `<span class="color-danger">*</span>` : ''}
                    ${field.label}
                </label>
                <div class="inputItem__box">
                    <div class="uploadFile__add">
                        <!-- невидимый, но активный стандартный загрузчик-->
                        <input id="${field.id}" name="" type="file" placeholder="Загрузить документ" ${field.required ? `required` : ''}  ${field.disabled ? `disabled` : ''}>
                        <!-- видимое, но не активное поле загрузки -->
                        <div class="uploadFile__addLabel button btn-outline btn-outline--neytral button--rectangle button--withicon" aria-hidden="true"><span class="icok"><svg alt=""><use xlink:href="/images/sprite.svg#svg-plus"></use></svg></span>Выбрать файл</div>
                    </div>
                    <!-- результат загрузки -->
                    <div class="uploadFile__result" hidden aria-hidden="true">
                        <div class="uploadFile__title"><span class="icok"><svg alt=""><use xlink:href="/images/sprite.svg#svg-docs-thin-2"></use></svg></span><span class="uploadFile__name"></span></div>
                        <button class="uploadFile__delete link link--minor" type="button">Очистить</button>
                    </div>
                </div>
            </div>`
    },
    tooltip: function(tooltip) {
        return `<span class="tooltip ${tooltip.position ? `tooltip--${tooltip.position}` : ''}">
        <button class="tooltip__toggle" type="button" aria-label="Подсказка" aria-describedby="${tooltip.id}">
            <span class="tooltip__ico"><span class="icok"><svg alt=""><use xlink:href="/images/sprite.svg#svg-${tooltip.icon}"></use></svg></span></span>
        </button>
        <span class="tooltip__content" id="${tooltip.id}" role="tooltip"><span class="tooltip__text">${tooltip.text}</span></span>
    </span>`
    }
}