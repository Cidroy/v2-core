export default class Utils{
	public static appendZeroesToBadgenumber( badgenumber: string): string{

		while (badgenumber.length < 9){
			badgenumber = "0"+badgenumber
		}
		return badgenumber
	}
}
