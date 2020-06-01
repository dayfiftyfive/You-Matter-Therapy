// 1. Import SCSS Styles
import '../scss/main.scss';


// 2. Import Components
import Scroll from './Scroll';
import Popup from './Popup';
import ContactForm from './Contact';


// 3. Create Instances
const scroll = new Scroll();
const popup = new Popup();
const form = new ContactForm();


// 4. Initialize Objects
scroll.init();
popup.init();
form.init();