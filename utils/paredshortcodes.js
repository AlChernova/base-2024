module.exports = {
    select: function (content, id, label, modifycatorBox, required, disabled) {
        return `<div class="inputItem ${modifycatorBox}">
            <label for="${id}" class="inputItem__label">${label}</label>
            <div class="inputItem__box">
                <span class="default-select">
                    <select class="default-select__field" name="${id}" id="${id}" ${required}  ${disabled}>
                        ${content}
                    </select>
                </span>
            </div>
        </div>`
    },
    inputGroup: function (content, label, listModify, groupModify) {
        return `<fieldset class="inputGroup ${groupModify}">
            <legend class="visually-hidden">${label}</legend>
            <div class="inputGroup__label" aria-hidden="true">${label}</div>
            <div class="inputGroup__list ${listModify}">
            ${content}
            </div>
        </fieldset>`
    },
}