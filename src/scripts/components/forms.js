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