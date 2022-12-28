import showSearchResult from "./showSearchResult.js";
import { cardsData, sponsorsImgs, instagramImgs } from "./data.js";
import removeCardsModalDrop from "./removeCardsModal.js";

let timer;
let currentPage = 1;
const CARDS_PER_PAGE = 4;
const ANTAL_PAGES = cardsData.length / CARDS_PER_PAGE;

const sectionCards = $(".cards");
const modalSearch = $(".modal-search");
const modalMenu = $(".modal-menu");
const navLogo = $(".navigation__logo");
const btnBurgerMenu = $(".btn-burger-menu");
const navInputSearchLabel = $(".navigation__input-search-label");
const modalInputSearchLabel = $(".modal-search__label");
const page = $(".page");
const btnPrev = $(".btn-prev");
const btnNext = $(".btn-next");
const sponsorsLogos = $(".sponsors__logos");
const footerFotos = $(".footer__fotos");
const body = $("body");
const modalInputSearch = $(".my-modal__input-search");
const navigationInputSearch = $(".navigation__input-search");
const menuDropdown = $(".menu__dropdown");

const htmlCard = $(".mycard").html();
const htmlActiveCard = $(".my-active-card").html();
const htmlPagination = $(".mypagination").html();
const htmlImg = $(".image-template").html();

showCards(currentPage);
showSponsorsLogo();
showInstagramLogos();

if (sectionCards) {
    sectionCards.on("click", ".my-card__btn", onMyCardBtnClick);
    sectionCards.on("click", onMyCardClick);
}

btnPrev && btnPrev.on("click", onBtnPrevClick);
btnNext && btnNext.on("click", onBtnNextClick);
navInputSearchLabel && navInputSearchLabel.on("click", onInputSearchLabelClick);
modalInputSearchLabel &&
    modalInputSearchLabel.on("click", onModalInputSearchLabelClick);
btnBurgerMenu && btnBurgerMenu.on("click", onBtnBurgerMenuClick);

modalInputSearch &&
    modalInputSearch.on("keydown keyup paste", onInputSearchChange);

navigationInputSearch &&
    navigationInputSearch.on("keydown keyup paste", onInputSearchChange);

menuDropdown &&
    menuDropdown.on("click", ".my-card__content", onSearchResultClick);
modalSearch &&
    modalSearch.on("click", ".my-card__content", onSearchResultClick);

function onBtnPrevClick(e) {
    currentPage <= 2 && btnPrev.addClass("disabled");

    if (currentPage >= 1) {
        btnNext.removeClass("disabled");
        removeCards();
        currentPage -= 1;
        showCards(currentPage);
    }
}

function onBtnNextClick(e) {
    currentPage >= ANTAL_PAGES - 1 && btnNext.addClass("disabled");

    if (currentPage <= ANTAL_PAGES) {
        btnPrev.removeClass("disabled");
        removeCards();
        currentPage += 1;
        showCards(currentPage);
    }
}

function onInputSearchLabelClick(e) {
    const target = e.target;

    if (
        target.classList.contains("input-search-label") &&
        window.innerWidth <= 768
    ) {
        body.toggleClass("overflowH");
        modalSearch.toggleClass("active-modal");
        navInputSearchLabel.toggleClass("rotate-icon");
        navLogo.toggleClass("notActive");
    }

    clearInput(target);
}

function onModalInputSearchLabelClick(e) {
    clearInput(e.target);
}

function clearInput(target) {
    const input = target
        .closest(".input-search-label")
        .querySelector(".input-search");
    const btnClear = target
        .closest(".input-search-label")
        .querySelector(".btn__clear");
    const isBtnClear = target.classList.contains("btn__clear");

    if (isBtnClear) {
        input.value = "";
        btnClear.classList.remove("active-clear");
        menuDropdown.removeClass("open-dropdown");
        removeCardsModalDrop();
    }
}

function onBtnBurgerMenuClick(e) {
    if (btnBurgerMenu.hasClass("btn-burger-menu")) {
        navInputSearchLabel.toggleClass("notActive");
        navLogo.toggleClass("notActive");
        modalMenu.toggleClass("active-modal");
        btnBurgerMenu.toggleClass("active-btn-burger-menu");
        body.toggleClass("overflowH");
    }
}

function onInputSearchChange(e) {
    const value = e.target.value;
    const delay = 2000;
    const btnClear = e.target
        .closest(".input-search-label")
        .querySelector(".btn__clear");

    const isNavInput = () => {
        if (e.target.id === "nav-input-search") {
            return true;
        } else {
            return false;
        }
    };

    clearTimeout(timer);

    timer = setTimeout(() => {
        showSearchResult(value, isNavInput);
    }, delay);

    if (e.type === "keydown" && !btnClear.classList.contains("active-clear")) {
        btnClear.classList.add("active-clear");
    } else if (!value.trim("").length) {
        btnClear.classList.remove("active-clear");
        menuDropdown.removeClass("open-dropdown");
    }
}

function onSearchResultClick(e) {
    const id = getId(e.target);
    const card = cardsData.find((card) => card.id === id);

    body.toggleClass("overflowH");
    sectionCards.prepend(activeCardhtml(card));
}

function getId(target) {
    return +target.closest(".my-card__content").dataset.id;
}

function onMyCardBtnClick(e) {
    e.stopPropagation();
    const description = e.target
        .closest(".my-card")
        .querySelector(".my-card__description");
    const btn = e.target;

    if (description.classList.contains("cutoff-text--7")) {
        btn.innerText = "Hide";
    } else {
        btn.innerText = "Read more";
    }

    description.classList.toggle("cutoff-text--7");
}

function onMyCardClick(e) {
    const card = e.target.closest(".my-card");
    if (card) {
        const description = card.querySelector(".my-card__description");
        const btn = card.querySelector(".my-card__btn");
        const btnClose = card.querySelector(".my-card__btn-close");

        body.toggleClass("overflowH");
        card.classList.toggle("active-card");
        description.classList.toggle("cutoff-text--7");
        btnClose.classList.toggle("show-btn");

        btn ? btn.classList.toggle("hide-btn") : card.remove();
    }
}

function paginationHtml(currentPage) {
    return htmlPagination
        .replace("{{currentPage}}", currentPage)
        .replace("{{lastPage}}", ANTAL_PAGES);
}

function showCards(currentPage) {
    let filteredData = cardsData.slice(
        (currentPage - 1) * CARDS_PER_PAGE,
        (currentPage - 1) * CARDS_PER_PAGE + CARDS_PER_PAGE
    );
    page[0].innerText = "";
    page.append(paginationHtml(currentPage));

    for (let i = 0; i < filteredData.length; i++) {
        const card = filteredData[i];
        sectionCards.prepend(cardHtml(card));
    }
}

function removeCards() {
    const card = $(".cards .my-card");
    card.remove();
}

function showSponsorsLogo() {
    for (let i = 0; i < sponsorsImgs().length; i++) {
        const data = sponsorsImgs()[i];
        sponsorsLogos.append(imgHtml(data));
    }
}

function showInstagramLogos() {
    for (let i = 0; i < instagramImgs().length; i++) {
        const data = instagramImgs()[i];
        footerFotos.append(imgHtml(data));
    }
}

function imgHtml({ img, alt }) {
    return htmlImg.replace("{{logo}}", img).replace("{{textAlt}}", alt);
}

function cardHtml(card) {
    return htmlCard
        .replace("{{id}}", card.id)
        .replace("{{title}}", card.title)
        .replace("{{title}}", card.title)
        .replace("{{description}}", card.description)
        .replace("{{img}}", card.img)
        .replace("{{dato}}", card.dato);
}

function activeCardhtml(card) {
    return htmlActiveCard
        .replace("{{id}}", card.id)
        .replace("{{title}}", card.title)
        .replace("{{title}}", card.title)
        .replace("{{description}}", card.description)
        .replace("{{img}}", card.img)
        .replace("{{dato}}", card.dato);
}
