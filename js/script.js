// Функционал добавления в избранное
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация избранного из localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    
    // Устанавливаем начальное состояние для всех кнопок избранного
    document.querySelectorAll('.wish').forEach(button => {
        const productId = getProductId(button);
        if (savedFavorites[productId]) {
            button.classList.add('active');
        }
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = getProductId(this);
            
            // Переключаем состояние
            this.classList.toggle('active');
            
            // Сохраняем в localStorage
            if (this.classList.contains('active')) {
                savedFavorites[productId] = true;
            } else {
                delete savedFavorites[productId];
            }
            
            localStorage.setItem('favorites', JSON.stringify(savedFavorites));
            
            // Обновляем счетчик в шапке
            updateFavCount();
        });
    });
    
    // Функционал переключения страниц
    document.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Убираем активный класс у всех ссылок
            document.querySelectorAll('.page-link').forEach(l => {
                l.classList.remove('active');
            });
            
            // Добавляем активный класс текущей ссылке
            this.classList.add('active');
            
            // Скрываем все страницы
            document.querySelectorAll('.product-page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Показываем выбранную страницу
            const pageId = 'page' + this.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');
        });
    });
    
    // Обработка кнопки "вперед"
    document.querySelector('.next-link').addEventListener('click', function(e) {
        e.preventDefault();
        
        const currentActive = document.querySelector('.page-link.active');
        const nextPage = parseInt(currentActive.getAttribute('data-page')) + 1;
        
        if (nextPage <= 2) {
            document.querySelector(`.page-link[data-page="${nextPage}"]`).click();
        }
    });
    
    // Инициализация счетчика избранного
    updateFavCount();
});

// Функция для получения идентификатора продукта
function getProductId(button) {
    const productCard = button.closest('.product-card');
    const productTitle = productCard.querySelector('.product-title').textContent;
    return productTitle;
}

// Функция для обновления счетчика избранного в шапке
function updateFavCount() {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    const favCount = Object.keys(savedFavorites).length;
    const favButton = document.querySelector('.fav');
    
    // Создаем или обновляем счетчик
    let counter = favButton.querySelector('.fav-counter');
    if (!counter) {
        counter = document.createElement('span');
        counter.className = 'fav-counter';
        counter.style.cssText = `
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ff4757;
            color: white;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        favButton.style.position = 'relative';
        favButton.appendChild(counter);
    }
    
    counter.textContent = favCount;
    
    // Скрываем счетчик, если нет избранных товаров
    if (favCount === 0) {
        counter.style.display = 'none';

    } else {
        counter.style.display = 'flex';
    }
}