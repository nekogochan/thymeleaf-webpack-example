import "@src/scripts/global";
import $ from "jquery";

$(document).ready(function () {
    const modal = document.getElementById('deleteConfirmModal');
    modal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const href = button.getAttribute('data-bs-href');
        const modalDeleteButton = modal.querySelector('a');
        modalDeleteButton.href = href;
    });
});
