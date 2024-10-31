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