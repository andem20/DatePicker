# DatePicker
Simple date picker made in JavaScript.<br>
![Datetime Picker Preview](https://github.com/andem20/DateTimePickerJS/blob/master/preview.png)

<p>
  Implementation:
</p>

```javascript
  window.onload = () => {
    var dtPickers = [];
    var dtpEl = document.getElementsByClassName("DatePicker");
    for(var i = 0; i < dtpEl.length; i++){
      dtPickers[i] = new DateTimePicker(dtpEl[i]);
    }
  }
```

```html
  <div class="container">
    <div>Date #1: <input type="text" name="date" class="DatePicker" readonly></div>
    <div>Date #2: <input type="text" name="date" class="DatePicker" readonly></div>
    <div>Date #3: <input type="text" name="date" class="DatePicker" readonly></div>
  </div>
```
