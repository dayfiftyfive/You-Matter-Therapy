import { dream as $ } from './Dreams';
import { ajax } from './Ajax';

export default class ContactForm {

    constructor() {

        this.regex = {
            phone: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            letters: /^[a-zA-Z]*$/g
        }

        this.nodes = {
            form: $("#contact-form"),
            name: $("#name-input"),
            email: $("#email-input"),
            phone: $("#phone-input"),
            message: $("#message-input"),
            button: $("#send-message")
        }

        this.errors = {
            name: $("#name-error"),
            email: $("#email-error"),
            message: $("#message-error")
        }

    }

    // Init Contact Form
    init() {

        if ( !this.nodes.form.length ) return console.log("No Form On This Page");

        this.nodes.form.prevent( "submit" );
        this.nodes.button.click( () => this.submitForm() );

    }


    // Validate Form
    validate() {

        let valid = true;

        const setInvalid = node => node.setCustomValidity("- This field is required");
        const setValid = node => node.setCustomValidity("");

        const values = {
            name: this.nodes.name.val(),
            email: this.nodes.email.val(),
            phone: this.nodes.phone.val(),
            message: this.nodes.message.val()
        }


        // Validate Name
        if ( !values.name ) {
            valid = false;
            this.nodes.name.forEach( setInvalid );
            this.errors.name.text("* Please enter your name.");
        }
        else {
            this.nodes.name.forEach( setValid );
            this.errors.name.text("Your Name");
        }


        // Validate Email
        if ( !values.email ) {
            valid = false;
            this.nodes.email.forEach( setInvalid );
            this.errors.email.text("* Please enter your email address.");
            
        }
        else if ( values.email && !this.regex.email.test( values.email.toLowerCase() ) ) {
            valid = false;
            this.nodes.email.forEach( setInvalid );
            this.errors.email.text("* Please enter a valid email address.")
        }
        else {
            this.nodes.email.forEach( setValid );
            this.errors.email.text("Email Address");
        }


        // Validate Message
        if ( !values.message ) {
            valid = false;
            this.nodes.message.addClass("invalid");
            this.errors.message.text("* Please enter a message.")
        }
        else {
            this.nodes.message.removeClass("invalid");
            this.errors.message.text("Say Something");
        }


        // Return Data
        this.data = values;
        return valid;

    }


    // Submit Form
    submitForm() {

        console.log( "Nice Try" );

        if ( !this.validate() ) return;

        this.mailMessage();

    }

    async mailMessage() {

        const request = ajax({
            type: "POST",
            url: "../mail.php",
            data: Object.assign( {}, this.data )
        });

        const response = await request.send();

        console.log( response );

        this.nodes.form.addClass("sent");

    }


    // Filter Inputs For Real Time Validation
    filterInput( input, filter ) {

        const events = ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"];

        events.forEach( event => {

            input.addEventListener(event, function() {

                if (filter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } 

                else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } 
                
                else {
                    this.value = "";
                }

            });
        });

    }

}

