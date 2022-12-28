import { cardsData } from "./data.js";
import removeCardsModalDrop from "./removeCardsModal.js";

export default function showSearchResult(value, isNavInput) {
    const notFoundedHtml = $(".not-founded").html();
    const htmlCard = $(".mycard").html();

    const modalSearch = $(".modal-search");
    const menuDropdown = $(".menu__dropdown");

    const filteredData = cardsData.filter(({ title, description, dato }) => {
        if (title.toLocaleLowerCase().includes(value)) {
            return { title, description, dato };
        }
    });

    if (filteredData.length > 0 && value.trim("").length) {
        removeCardsModalDrop();
        if (isNavInput()) {
            menuDropdown.addClass("open-dropdown");
            for (let i = 0; i < filteredData.length; i++) {
                const card = filteredData[i];
                menuDropdown.append(cardHtmlReuslt(card));
            }
        } else {
            for (let i = 0; i < filteredData.length; i++) {
                const card = filteredData[i];
                modalSearch.append(cardHtmlReuslt(card));
            }
        }
    } else if (filteredData.length <= 0 || !value.trim("").length) {
        if (isNavInput()) {
            removeCardsModalDrop();
            menuDropdown.addClass("open-dropdown");
            menuDropdown.append(notFoundedHtml);
            if (!value.trim("").length) {
                removeCardsModalDrop();
                menuDropdown.removeClass("open-dropdown");
            }
        } else {
            removeCardsModalDrop();
            if (filteredData.length <= 0) modalSearch.append(notFoundedHtml);
        }
    }

    function cardHtmlReuslt(card) {
        return htmlCard
            .replace(
                `  <img class="my-card__img" src="{{img}}" alt="{{title}}" />`,
                ""
            )
            .replace(
                `<button class="btn btn-black-border my-card__btn">Read more</button>`,
                ""
            )
            .replace("{{id}}", card.id)
            .replace("{{title}}", card.title)
            .replace("{{description}}", card.description)
            .replace("{{dato}}", card.dato);
    }
}
