import Vue from 'vue'
import Component from 'vue-class-component'
import Template from './acronym.component.html'
import { Navbar } from './navbar.component'

@Template
@Component({
	components: {
		'd-navbar': Navbar
	}
})
export class Acronym extends Vue {
	//
}
