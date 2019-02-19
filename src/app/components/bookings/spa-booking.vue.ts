import { Component, Vue, Watch } from "vue-property-decorator"
import appConfig from "@/app.config"
import { MiscStore } from "@/state/modules/misc"
import layout from "@/components/m-registration/layout.vue"
@Component({
	// @ts-ignore
	components: {
		layout,
	},
	page : {
		title: "Home",
		meta: [ { name: "description", content: appConfig.description, }, ],
	},
})
// @ts-ignore
export default class Spa extends Vue{
	
	private grouping = Object.keys(this.GROUPINGS)[0]
	private get GROUPINGS(){ return MiscStore.GROUPINGS }
	private get allowAddPeople(){
		if(this.xLayouts < this.GROUPINGS[this.grouping].max) return true
		else{
			if(this.xLayouts > this.GROUPINGS[this.grouping].max) this.xLayouts = this.GROUPINGS[this.grouping].max
			return false
		}
	}

	private get allowDeletePeople(){
		if(this.xLayouts > this.GROUPINGS[this.grouping].min) return true
		else{
			if(this.xLayouts < this.GROUPINGS[this.grouping].min) this.xLayouts = this.GROUPINGS[this.grouping].min
			return false
		}
	}

	private xLayouts = this.GROUPINGS[this.grouping].count
	@Watch("grouping") private onGroupingChange(){ this.xLayouts = this.GROUPINGS[this.grouping].count }

	private addPeople(){
		if(!this.allowAddPeople) return false
		this.xLayouts++
		return true
	}

	private deleteLayout(index){
		console.log(index)
		this.xLayouts--
	}

}