export default class Popup {

    constructor() {

        this.hide = sessionStorage.getItem('popup');

    }


    init() {

        if ( !this.hide ) {

            window.location.hash = "free-consultation";
            sessionStorage.setItem('popup', '1');
    
        }

    }

}