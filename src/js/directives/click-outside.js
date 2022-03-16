const ClickOutside = {
	bind: function (el, binding, vnode) {
		const event = function (event) {
			if (!(el == event.target || el.contains(event.target))) {
				vnode.context[binding.expression](event);
			}
		};
		document.body.addEventListener('click', event)
	},
	unbind: function (el) {
		document.body.removeEventListener('click', event)
	},
}

export default ClickOutside