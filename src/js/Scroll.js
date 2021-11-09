// 1. Import Dreams DOM Library
import { dream as $ } from './Dreams';


// 2. Import Components
import LocomotiveScroll from 'locomotive-scroll';


export default class Scroll {

    constructor() {

        this.locomotive = new LocomotiveScroll({
            el: $('[data-scroll-container]').nodes(),
            smooth: true,
            lerp: 0.25
        });

        this.navbar = $(".navbar");

        this.expanded = true;

    }

    init() {

        this.locomotive.on( "scroll", e => this.handler( e.scroll.y ) );

    }


    handler( y ) {
        
        if ( y >= 400 && this.expanded ) {
            
            this.navbar.addClass('compressed');

            this.expanded = false;

        }

        else if ( y < 400 && !this.expanded ) {
            
            this.navbar.removeClass('compressed');

            this.expanded = true;

        }

    }

}