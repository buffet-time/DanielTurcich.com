import { Vue } from 'vue-class-component'

export default class Home extends Vue {
	public functionOne =  //
	`const array = [];
const array2 = [];
for(let x=0; x < 1000001; x++) {
    array.push(x);
}

for(let x=0; x < array.length; x++) {
    array2.push(x * 2)
}`
	public functionTwo =  //
	`const array = [];
const array2 = [];
for(let x=0; x < 1000001; x++) {
    array.push(x);
}
    
array.forEach((element) => {
    array2.push(element * 2)
});`
	public startButton = false
	public stopButton = true

	public mounted(): void {
		//
	}

	public getFuncs(): void {
		console.log(this.functionOne, this.functionTwo)
	}
}
