var stratton = {
	sidebar_toggle: function(){
		let navigation = document.querySelectorAll('.secondary_nav');
		for(let i=0; i<navigation.length; i++){
			navigation[i].classList.toggle('open');
		}
	},
	cstmSelectTrigger: function(){
		this.parentElement.parentElement.classList.toggle('open');
	},
	cstm_select: function(){
		let cs_radio = document.querySelectorAll('.cs_selectbox .optionsList label');
		for(let i=0; i<cs_radio.length; i++){
			cs_radio[i].addEventListener('click', function(elem){
				elem.preventDefault();
				var elem = cs_radio[i];
				console.log(elem);
				let selectedText = elem.querySelectorAll('input[type="radio"]')[0].getAttribute('data-value');
				console.log(document.activeElement);
				while(!elem.classList.contains('optionsList')){
					elem = elem.parentNode;
				}
				if(elem.previousElementSibling.nodeName == 'INPUT'){
					elem.previousElementSibling.value = selectedText;	
				}else{
					elem.previousElementSibling.innerHTML = selectedText;
				}
				
				if (document.activeElement) {
				    document.activeElement.blur();
				}
			}, false);
		}
	},
	cstm_autosuggest: function(){
		let autosuggestInput = document.querySelectorAll('.autoSuggestInput');
		for(let i=0; i<autosuggestInput.length; i++){
			autosuggestInput[i].addEventListener('focus', function(e){
				e.target.parentNode.style.zIndex = '99';
				e.target.previousElementSibling.classList.add('slide_right');
				let optionsList = e.target.nextElementSibling.querySelectorAll('li');
				for(let i=0; i<optionsList.length; i++){
					optionsList[i].style.display = '';
				}

			});

			autosuggestInput[i].addEventListener('blur', function(e){
				elem = e.target;
				var time = setTimeout(function(){
					elem.parentNode.style.zIndex = '';
				}, 320);
				
				e.target.previousElementSibling.classList.remove('slide_right');	
			});

			autosuggestInput[i].addEventListener('keyup', function(e){
			var key_text = e.target.value.toUpperCase();
			let optionsList = e.target.nextElementSibling.querySelectorAll('li');
				for(let i=0; i<optionsList.length; i++){
					let string = optionsList[i].querySelectorAll('span')[0];
					if(string.innerHTML.toUpperCase().indexOf(key_text) > -1){
						optionsList[i].style.display = '';
					}else{
						optionsList[i].style.display = 'none';
					}
				}
			});
		}

		let cs_radio = document.querySelectorAll('.autosuggest input[type="radio"]');
		for(let i=0; i<cs_radio.length; i++){
			cs_radio[i].addEventListener('change', function(elem){
				elem = elem.target;
				let selectedText = elem.nextElementSibling.innerHTML;
				while(!elem.classList.contains('optionsList')){
					elem = elem.parentNode;
				}
				if(elem.previousElementSibling.nodeName == 'INPUT'){
					elem.previousElementSibling.value = selectedText;	
				}else{
					elem.previousElementSibling.innerHTML = selectedText;
				}
			});
		}
	},
	editFields: function(){
		let editLink = document.querySelectorAll('.editLink');
		for(let i=0; i<editLink.length; i++){
			editLink[i].addEventListener('click', function(e){
				e.preventDefault();
				let elem = e.target;
				while( elem.nodeName !== 'INPUT' ){
					elem = elem.previousElementSibling;
				}
				elem.disabled = false;
				elem.focus();
				editLink[i].style.display = 'none';
				elem.addEventListener('blur', function(){
					editLink[i].style.display = '';
					elem.disabled = true;
				})
			});
		}
	},
	resize_selectBox: function(){
		let selectbox = document.querySelectorAll('.cs_selectbox');
		for(let i=0; i<selectbox.length; i++){
			var paddingSpace = selectbox[i].offsetHeight + 20;
			selectbox[i].querySelectorAll('.optionsList')[0].style.paddingTop = paddingSpace+"px";
		}
	},

	tooltip_toggle: function(){
		let tooltip = document.querySelectorAll('.tooltip_info');
		let close = document.querySelectorAll('.close');
		for(let i=0; i<tooltip.length; i++){
			tooltip[i].addEventListener('click', function(elem){
				elem.target.classList.toggle("showTooltip");
			}, false)
		}
		for(let i=0; i<close.length; i++){
			close[i].addEventListener('click', function(elem){
				let e = elem.target;
				while(!e.classList.contains('tooltip_info')){
					e = e.parentNode;
				}
				e.classList.remove('showTooltip');
			})
		}
	}
}


stratton.cstm_select();
stratton.cstm_autosuggest();
stratton.editFields();
stratton.resize_selectBox();
stratton.tooltip_toggle();

window.addEventListener('resize', function(){
	stratton.resize_selectBox();
});
