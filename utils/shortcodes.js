module.exports = {
    icon: function (name) {
        return `<span class="icok"><svg alt="">
                    <use xlink:href="/images/sprite.svg#svg-${name}"></use>
                </svg></span>`
    },
    
    /* textarea: function (label, id, cols, rows, required) {
        return `<div class="inputItem">
        <label class="inputItem__label" for="${id}">${label}</label>
        <div class="inputItem__box">
            <textarea class="default-input" id="${id}" name="${id}" ${required} cols="${cols}" rows="${rows}"></textarea>
        </div>
    </div>`
    }, */
    /* checkbox: function (id, group, required, label) {
        return `<label class="checkboxItem">
            <input class="checkboxItem__control" type="checkbox" name="${group}" id="${id}" ${required}>
            <span class="checkboxItem__label">${label}</span>
        </label>`
    }, */
    /* radio: function (id, group, required, label) {
        return `<label class="radioItem">
            <input class="radioItem__control" type="radio" name="${group}" id="${id}" ${required}>
            <span class="radioItem__label">${label}</span>
        </label>`
    },
 */
}
