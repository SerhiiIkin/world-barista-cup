export default  function removeCardsModalDrop() {
    const cardsDropDown = $(".menu__dropdown .my-card");
    const cardsModal = $(".my-modal .my-card");
    const h2Modal = $(".my-modal h2");
    const h2DropDown = $(".menu__dropdown h2");
    cardsDropDown.remove();
    cardsModal.remove();
    h2DropDown.remove();
    h2Modal.remove();
}