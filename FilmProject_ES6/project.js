const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");




// Tüm eventleri yükleme

eventListener();

function eventListener(){

form.addEventListener("submit", addFilm);
document.addEventListener("DOMcontentLoaded" , function(){
    let films = Storage.getFilmsFromStorage();
    UI.loadAllFilms(films);
});

cardbody.addEventListener("click", deleteFilm);
clear.addEventListener("click", clearAllFilms );
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
        //ERROR
        UI.displayMessages("Tüm alanları doldurunuz...", "danger")
    }
    else{
        //Yeni Film
        const newFilm = new Film(title, director, url);

        UI.addFilmToUI(newFilm); //Arayüze film ekleme
        Storage.addFilmToStorage(newFilm); //Storage a film ekleme
        UI.displayMessages("Film başarıyla eklendi...", "success")
    }

    UI.clearInputs(titleElement, directorElement, urlElement);
    e.preventDefault();
}

function deleteFilm(e){

    if(e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        ui.displayMessages("Silme İşlemi Başarılı", "success");
    }    
}

function clearAllFilms(){

    if(confirm("Tüm filmler silenecek. Emin misiniz?")){

    UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
    }
}