class DateTimePicker {
    constructor(parentContainer) {
        this.parentContainer = parentContainer;
        this.container = document.createElement("div");
        this.previous = document.createElement("li");
        this.next = document.createElement("li");
        this.activeMonth = document.createElement("li");
        this.daysUL = document.createElement("ul");
        this.weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
	    this.months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.curDate;
        this.curMonth;
		this.curYear;
        this.init();
    }

    createCalendar() {
		this.container.classList.add("dtContainer");
        this.parentContainer.parentNode.appendChild(this.container);
        this.container.style.left = this.parentContainer.offsetLeft + "px";
    
        let monthContainer = document.createElement("div");
        monthContainer.classList.add("dtMonth");
        this.container.appendChild(monthContainer);

        let activeMonthUL = document.createElement("ul");
        monthContainer.appendChild(activeMonthUL);

        this.previous.classList.add("dtPrev");
        this.previous.innerHTML = "&#10094;";
        activeMonthUL.appendChild(this.previous);

        this.next.classList.add("dtNext");
        this.next.innerHTML = "&#10095;";
        activeMonthUL.appendChild(this.next);

        this.activeMonth.innerHTML = "Month";
        activeMonthUL.appendChild(this.activeMonth);

        let weekdaysUL = document.createElement("ul");
        weekdaysUL.classList.add("dtWeekdays");
        this.container.appendChild(weekdaysUL);
        for(var i = 0; i < this.weekdays.length; i++){
            let wd = document.createElement("li");
            wd.innerHTML = this.weekdays[i];
            weekdaysUL.appendChild(wd);
        }

        this.daysUL.classList.add("dtDays");
        this.container.appendChild(this.daysUL);
    }

    daysMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    firstDay(month, year) {
        let day = new Date(year + "-" + month + "-01").getDay();
        day = (day === 0) ? 7 : day;
        return day;
    }

    loadDays(month, year) {
        let self = this;
        if(month < 1){
            this.curYear = year-1;
            this.curMonth = 12;
        } else if(month > 12){
            this.curYear = year+1;
            this.curMonth = 1;
        } else {
            this.curYear = year;
            this.curMonth = month;
        }

        this.daysUL.innerHTML = "";

        for(var i = 1; i < this.firstDay(this.curMonth, this.curYear); i++){
            this.days = document.createElement("li");
            this.days.innerHTML = " ";
            this.daysUL.appendChild(this.days);
        }

        for(var i = 1; i <= this.daysMonth(this.curMonth, this.curYear); i++){
            this.days = document.createElement("li");
            this.days.classList.add("dtDate");
            this.days.innerHTML = i;

            if(i == this.curDate.split(" ")[0] && this.months[month] == this.months[this.curDate.split(" ")[1]] && year == this.curDate.split(" ")[2]){
                this.days.classList.add("dtActive");
            }

            this.daysUL.appendChild(this.days);
            this.days.addEventListener("click", function(){
                self.curDate = this.innerHTML + " " + (parseInt(self.curMonth)) + " " + self.curYear;
                self.parentContainer.value = self.curDate.split(" ")[0] + " " + self.months[self.curDate.split(" ")[1]] + " " + self.curDate.split(" ")[2];
                self.makeActive(this);
                self.container.style.display = "none";
            });
        }

        this.activeMonth.innerHTML = this.months[this.curMonth] + " " + this.curYear;
    }

    makeActive(id) {
        var els = this.container.getElementsByClassName("dtDays")[0].getElementsByTagName("li");
        for(var i = 0; i < els.length; i++) {
            if(els[i].classList.contains("dtActive")) {
                els[i].classList.remove("dtActive");
            }
        }

        id.classList.toggle("dtActive");
    }
    
    init() {
        this.createCalendar();

        let self = this;

        var today = new Date();
        this.curDate = today.getDate() + " " + (today.getMonth()+1) + " " + today.getFullYear();
        this.loadDays(parseInt(this.curDate.split(" ")[1]), parseInt(this.curDate.split(" ")[2]));
        
        this.previous.addEventListener("click", function(){ self.loadDays(self.curMonth-1, self.curYear); });
        this.next.addEventListener("click", function(){ self.loadDays(self.curMonth+1, self.curYear); });

        this.parentContainer.addEventListener("focus", function(){
            var el = document.getElementsByClassName("dtContainer");
            for(var i = 0; i < el.length; i++){
                el[i].style.display = "none";
            }

            self.container.style.display = "block";
        });

        window.addEventListener("click", function(e){
            if(e.target.contains(self.container)){
                self.container.style.display = "none";
            }
        });

        this.parentContainer.value = this.curDate.split(" ")[0] + " " + this.months[this.curDate.split(" ")[1]] + " " + this.curDate.split(" ")[2];
    }
}