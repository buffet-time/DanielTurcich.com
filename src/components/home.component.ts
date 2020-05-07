import { BCard } from 'bootstrap-vue'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Template from './home.component.html'
import { Navbar } from './navbar.component'

@Template
@Component({
	components: {
		'b-card': BCard,
		'd-navbar': Navbar
	}
})
export class Home extends Vue {
	//
}
