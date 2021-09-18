import { Options, Vue } from 'vue-class-component'
import noteGenerator from '../components/soundGenerator.vue'

@Options({
	components: {
		'd-sound-gen': noteGenerator
	}
})
export default class Frequency extends Vue {
	//
}
