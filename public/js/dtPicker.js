var dtPicker = function(C){
	var o = {},
		c = "container",
		m = "month",
		aM = "activeMonth",
		aMul = "activeMonthUl",
		p = "prev",
		n = "next",
		wDul = "weekDaysUl",
		wD = "weekDays",
		dul = "daysUl",
		d = "days",
		curMonth,
		curYear,
		curDate = "currentDate",
		weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
		months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

		createDTP = function(){
			o[c] = document.createElement("div");
			o[c].classList.add("dtContainer");
			C.parentNode.appendChild(o[c]);
			o[c].style.left = C.offsetLeft + "px";

			o[m] = document.createElement("div");
			o[m].classList.add("dtMonth");
			o[c].appendChild(o[m]);

			o[aMul] = document.createElement("ul");
			o[m].appendChild(o[aMul]);

			o[p] = document.createElement("li");
			o[p].classList.add("dtPrev");
			o[p].innerHTML = "&#10094;";
			o[aMul].appendChild(o[p]);

			o[n] = document.createElement("li");
			o[n].classList.add("dtNext");
			o[n].innerHTML = "&#10095;";
			o[aMul].appendChild(o[n]);

			o[aM] = document.createElement("li");
			o[aM].innerHTML = "Month";
			o[aMul].appendChild(o[aM]);

			o[wDul] = document.createElement("ul");
			o[wDul].classList.add("dtWeekdays");
			o[c].appendChild(o[wDul]);
			for(var i=0;i<weekdays.length;i++){
				o[wD] = document.createElement("li");
				o[wD].innerHTML = weekdays[i];
				o[wDul].appendChild(o[wD]);
			}

			o[dul] = document.createElement("ul");
			o[dul].classList.add("dtDays");
			o[c].appendChild(o[dul]);
		},

		daysMonth = function(month, year){
			return new Date(year, month, 0).getDate();
		},

		firstDay = function(month, year){
			var day = new Date(year + "-" + month + "-01").getDay();
			day = (day===0) ? 7 : day;
			return day;
		},

		loadDays = function(month, year){
			if(month < 1){
				curYear = year-1;
				curMonth = 12;
			} else if(month > 12){
				curYear = year+1;
				curMonth = 1;
			} else {
				curYear = year;
				curMonth = month;
			}

			o[dul].innerHTML = "";

			for(var i=1;i<firstDay(curMonth, curYear);i++){
				o[d] = document.createElement("li");
				o[d].innerHTML = " ";
				o[dul].appendChild(o[d]);
			}

			for(var i = 1; i <= daysMonth(curMonth, curYear); i++){
				o[d] = document.createElement("li");
				o[d].classList.add("dtDate");
				o[d].innerHTML = i;
				if(i == curDate.split(" ")[0] && months[month] == months[curDate.split(" ")[1]] && year == curDate.split(" ")[2]){
					o[d].classList.add("dtActive");
				}
				o[dul].appendChild(o[d]);
				o[d].addEventListener("click", function(){
					curDate = this.innerHTML + " " + (parseInt(curMonth)) + " " + curYear;
					C.value = curDate.split(" ")[0] + " " + months[curDate.split(" ")[1]] + " " + curDate.split(" ")[2];
					makeActive(this);
					o[c].style.display = "none";
				});
			}

			o[aM].innerHTML = months[curMonth] + " " + curYear;
		},

		makeActive = function(id){
			var els = o[c].getElementsByClassName("dtDays")[0].getElementsByTagName("li");
			for(var i=0;i<els.length;i++){
				if(els[i].classList.contains("dtActive")){
					els[i].classList.remove("dtActive");
				}
			}

			id.classList.toggle("dtActive");
		},
		
		init = function(){
			createDTP();

			var today = new Date();
			curDate = today.getDate() + " " + (today.getMonth()+1) + " " + today.getFullYear();
			loadDays(parseInt(curDate.split(" ")[1]), parseInt(curDate.split(" ")[2]));
			
			o[p].addEventListener("click", function(){ loadDays(curMonth-1, curYear); });
			o[n].addEventListener("click", function(){ loadDays(curMonth+1, curYear); });

			C.addEventListener("focus", function(){
				var el = document.getElementsByClassName("dtContainer");
				for(var i=0;i<el.length;i++){
					el[i].style.display = "none";
				}

				o[c].style.display = "block";
			});

			window.addEventListener("click", function(e){
				if(e.target.contains(o[c])){
					o[c].style.display = "none";
				}
			});

			C.value = curDate.split(" ")[0] + " " + months[curDate.split(" ")[1]] + " " + curDate.split(" ")[2];
		}

		init();
}