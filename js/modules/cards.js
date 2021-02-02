import {getResource} from '../services/services';

function cards() {

    const menuField = document.querySelector('.menu__field').querySelector('.container');
    menuField.innerHTML = '';

    class MenuCard {
        constructor(img, alt, title, description, price, ...classes) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.transfer = 27;
        }
        changeToUAH() {
            this.price *= this.transfer;
        }
        setCard() {
            this.changeToUAH();

            let div = document.createElement('div');
            
            this.classes[0] = (this.classes.length == 0) ? 'menu__item' : this.classes[0];
            this.classes.forEach(e => div.classList.add(e));

            div.innerHTML = `
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            menuField.append(div);
        }
    }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price).setCard();
            });
        });

    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price).setCard();
    //         });
    //     });
}

export default cards;