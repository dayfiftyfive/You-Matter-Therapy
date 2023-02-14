// 1. Import SCSS Styles
import "../scss/main.scss"

// 2. Import Components
import Scroll from "./Scroll"
import Popup from "./Popup"
import ContactForm from "./Contact"

window.addEventListener("DOMContentLoaded", () => {
  // 3. Create Instances
  const scroll = new Scroll()
  const popup = new Popup()
  const form = new ContactForm()

  // 4. Initialize Objects
  scroll.init()
  popup.init()
  form.init()

  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag("js", new Date())

  gtag("config", "UA-209240534-1")
})
