document.querySelectorAll('.urea1, .urea2, .urea3, .urea4').forEach(element => {
    element.addEventListener('mouseover', function () {
        const info = getInfoFromElement(this);
        showMiniContainer(info);
    });

    element.addEventListener('mouseout', function () {
        hideMiniContainer();
    });
});

function getInfoFromElement(element) {
    const className = element.classList[0];
    let title = "";
    let municipios = "";
    let populacao = "";
    switch (className) {
        case 'urea1':
            title = "Urea 1 - SUDESTE";
            municipios = "Municípios: 370";
            populacao = "População: 32.109.836";
            break;
        case 'urea2':
            title = "Urea 2 - CENTRO ";
            municipios = "Municípios: 98 ";
            populacao = "População: 5.135.429 ";
            break;
        case 'urea3':
            title = "Urea 3 - LESTE ";
            municipios = "Municípios: 35 ";
            populacao = "População: 4.627.158 ";
            break; 
        case 'urea4':
            title = "Urea 4 - NORTE ";
            municipios = "Municípios: 142 ";
            populacao = "População: 5.046.626 ";
            break;

        default:
            break;
    }
    return { title, municipios, populacao };
}

function showMiniContainer(info) {
    const container = document.getElementById('mini-container');
    const titleElement = document.getElementById('urea-title');
    const municipiosElement = document.getElementById('urea-municipios');
    const populacaoElement = document.getElementById('urea-populacao');

    titleElement.textContent = info.title;
    municipiosElement.textContent = info.municipios;
    populacaoElement.textContent = info.populacao;

    container.style.display = 'block';
}

function hideMiniContainer() {
    const container = document.getElementById('mini-container');
    container.style.display = 'none';
}