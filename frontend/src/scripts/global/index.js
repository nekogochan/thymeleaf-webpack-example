import $ from "jquery";
import "jquery-mask-plugin";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";

console.log('importing global')

$(document).ready(function() {
    $(".zipCode").mask("00000-000");
    $(".birthdayDate").mask("00/00/0000");
});
