export default {
	computed: {
		totalPage () {
			return Math.ceil(this.totalRow / this.pageSize)
		}
	}
}