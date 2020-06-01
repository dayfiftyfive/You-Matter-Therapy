// Class To Assist With Ajax Requests
class phpRequest {

    constructor(props) {
        this.type = props.type;
        this.url = props.url;
        this.data = props.data;
        this.header = props.header;
    }

    send() {
        return new Promise( (resolve, reject) => {

            // Create Request
            const xhr = new XMLHttpRequest();
            xhr.open(this.type, this.url);
            if ( this.header ) xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            // Attach Event Listener
            xhr.addEventListener('load', () => {
                if ( xhr.status === 200 ) resolve(xhr);
                else reject(xhr);
            });

            // Send Request
            if ( this.header ) xhr.send(this.data);
            else xhr.send();
        });

    }


    static queue( props ) {

        const encodeForPost = data => {
            let encodedString = '';
            for (let prop in data) {
                if ( data.hasOwnProperty( prop ) ) {
                    if ( encodedString.length > 0 ) encodedString += '&';
                    encodedString += encodeURI(`${prop}=${data[prop]}`);
                }
            }
            return encodedString;
        }

        const encodeForGet = data => {
            let encodedString = '';
            for (let prop in data) {
                if ( data.hasOwnProperty( prop ) ) {
                    encodedString += `${ ( encodedString.length > 0 ) ? '&' : ''}${prop}=${data[prop]}`;
                } 
            }
            return `${props.url}?${encodedString}`;
        }

        return new phpRequest({
            type: props.type,
            url: ( props.type.toLowerCase() === 'get' ) ? encodeForGet(props.url) : props.url,
            data: ( props.type.toLowerCase() === 'post' ) ? encodeForPost(props.data) : props.data,
            header: ( props.type.toLowerCase() === 'post' ) ? true : false
        });
    }
}

// Bind Shortcut
export const ajax = phpRequest.queue;