import { BButton, BCard, BNavbar } from 'bootstrap-vue'
import Vue from 'vue'
import Component from 'vue-class-component'
import Template from './navbar.component.html'

@Template
@Component({
	components: {
		'b-card': BCard,
		'b-navbar': BNavbar,
		'b-button': BButton
	}
})
export class Navbar extends Vue {
	public openNav() {
		document.getElementById('mySidenav')!.style.width = '230px'
	}

	public closeNav() {
		document.getElementById('mySidenav')!.style.width = '0'
	}
}
