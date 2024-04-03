import "@src/scripts/global";
import $ from "jquery";

$(document).ready(() => {
    console.log("fuck!");
    let a = undefined;
    let b = a ?? 'c';
    console.log(b);
    $('button#search-cep').on('click', function() {
        $.get('https://api.postmon.com.br/v1/cep/' + $('input[name="zipCode"]').val(), function(response) {
            if(!("erro" in response)) {
                $('input[name="zipCode"]').val(response.cep);
                $('input[name="street"]').val(response.logradouro);
                $('input[name="state"]').val(response.estado);
                $('input[name="city"]').val(response.cidade);
                $('input[name="district"]').val(response.bairro);
            }
        });
    });
});