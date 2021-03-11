# DateTimePickerJS
Simple date picker made in JavaScript.<br>
![Datetime Picker Preview](https://github.com/andem20/DateTimePickerJS/blob/master/preview.png)
```javascript
  window.onload = function(){
    var dtPickers = [];
    var dtpEl = document.getElementsByClassName("dtPicker");
    for(var i = 0; i < dtpEl.length; i++){
      dtPickers[i] = new DateTimePicker(dtpEl[i]);
    }
  }
```

```html
  <div class="container">
    <div>Date #1: <input type="text" name="date" class="dtPicker" readonly></div>
    <div>Date #2: <input type="text" name="date" class="dtPicker" readonly></div>
    <div>Date #3: <input type="text" name="date" class="dtPicker" readonly></div>
  </div>
```
