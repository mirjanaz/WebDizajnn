$(document).ready(function(e) {
    $('#regForm').submit(function(e) {
        e.preventDefault();


        var email = $("input[name=email]").val().trim();
        var username = $("input[name=username]").val().trim();
        var password = $("input[name=password]").val().trim();

        if (email == "" || username == "" || password == "") {
            alert("Nepopunjeni podaci");
        } else {
            alert("Uspesna registracija");
        }
    });
});