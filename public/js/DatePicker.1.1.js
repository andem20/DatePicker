class DatePicker {
    constructor(parentContainer) {
        this.parentContainer = parentContainer;
        this.container = document.createElement("div");
        this.previous = document.createElement("li");
        this.next = document.createElement("li");
        this.activeMonth = document.createElement("li");
        this.daysUL = document.createElement("ul");
        this.weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
	    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.selectedDate = new Date();
        this.currentDay = this.selectedDate.getDate();
        this.currentMonth = this.selectedDate.getMonth();
		this.currentYear = this.selectedDate.getFullYear();
        this.init();
    }

    createElements() {
        // Create elements
        let monthContainer = document.createElement("div");
        let activeMonthUL = document.createElement("ul");
        let weekdaysUL = document.createElement("ul");

        // Set styles
        this.container.classList.add("DatePicker-Container");
        this.container.style.left = this.parentContainer.offsetLeft + "px";
        monthContainer.classList.add("DatePicker-Month");
        this.previous.classList.add("DatePicker-Prev");
        this.next.classList.add("DatePicker-Next");
        weekdaysUL.classList.add("DatePicker-Weekdays");
        this.daysUL.classList.add("DatePicker-Days");

        // Appending
        this.parentContainer.parentNode.append(this.container);
        this.container.append(monthContainer, weekdaysUL, this.daysUL);
        monthContainer.append(activeMonthUL);
        activeMonthUL.append(this.previous, this.next, this.activeMonth);

        // Set Content
        this.previous.innerHTML = "&#10094;";
        this.next.innerHTML = "&#10095;";
        this.activeMonth.innerHTML = "Month";

        // Create name of days
        this.weekdays.forEach(e => {
            let wd = document.createElement("li");
            wd.innerHTML = e;
            weekdaysUL.append(wd);
        });
    }

    daysOfMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    // Convert sunday to last day of the week
    firstDayOfMonth(month, year) {
        let day = new Date(year + "-" + month + "-01").getDay();
        return day === 0 ? 7 : day;
    }

    loadDays(month, year) {
        let self = this;

        month = (month + 12) % 12;

        this.currentYear = year;
        if(this.currentMonth === 11 && month === 0) this.currentYear = year + 1;
        if(this.currentMonth === 0 && month === 11) this.currentYear = year - 1;
        this.currentMonth = month;

        // Clear days
        this.daysUL.innerHTML = "";

        // Position the first day of the month
        for(var i = 1; i < this.firstDayOfMonth(this.currentMonth + 1, this.currentYear); i++){
            this.daysUL.append(document.createElement("li"));
        }

        // Populate with days of the month
        for(var i = 1; i <= this.daysOfMonth(this.currentMonth, this.currentYear); i++){
            this.days = document.createElement("li");
            this.days.classList.add("DatePicker-Date");
            this.days.innerHTML = i;

            if(i === this.selectedDate.getDate() && month === this.selectedDate.getMonth() && year === this.selectedDate.getFullYear()){
                this.days.classList.add("DatePicker-Active");
            }

            this.daysUL.appendChild(this.days);
            this.days.addEventListener("click", function(){
                self.selectedDate = new Date((self.currentMonth + 1) + " " + this.innerHTML + " " + self.currentYear);
                self.parentContainer.value = self.selectedDate.getDate() + " " +
                                             self.months[self.selectedDate.getMonth()] + " " + 
                                             self.selectedDate.getFullYear();
                self.makeActive(this);
                self.container.style.display = "none";
            });
        }

        // Show selected month and year
        this.activeMonth.innerHTML = this.months[month] + " " + this.currentYear;
    }

    makeActive(id) {
        var els = this.container.getElementsByClassName("DatePicker-Days")[0].getElementsByTagName("li");
        for(var i = 0; i < els.length; i++) {
            if(els[i].classList.contains("DatePicker-Active")) {
                els[i].classList.remove("DatePicker-Active");
            }
        }

        id.classList.toggle("DatePicker-Active");
    }
    
    init() {
        this.createElements();

        let self = this;

        this.loadDays(this.currentMonth, this.currentYear);
        
        this.previous.addEventListener("click", () => self.loadDays(self.currentMonth-1, self.currentYear));
        this.next.addEventListener("click", () => self.loadDays(self.currentMonth+1, self.currentYear));

        this.parentContainer.addEventListener("focus", () => {
            var el = document.getElementsByClassName("DatePicker-Container");
            for(var i = 0; i < el.length; i++){
                el[i].style.display = "none";
            }

            self.container.style.display = "block";
        });

        window.addEventListener("click", (e) => {
            if(e.target.contains(self.container)){
                self.container.style.display = "none";
                self.currentMonth = self.selectedDate.getMonth();
                self.currentYear = self.selectedDate.getFullYear();
            }
        });

        this.parentContainer.value = this.selectedDate.getDate() + " " + 
                                     this.months[this.selectedDate.getMonth()] + " " + 
                                     this.selectedDate.getFullYear();
    }
}