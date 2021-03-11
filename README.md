# DateTimePickerJS
Simple date picker made in JavaScript.<br>
![Datetime Picker Preview](https://github.com/andem20/DateTimePickerJS/blob/master/preview.png)

```javascript
<script type="text/javascript">
  window.onload = function(){
    var dtPickers = [];
    var dtpEl = document.getElementsByClassName("dtPicker");
    for(var i = 0; i < dtpEl.length; i++){
      dtPickers[i] = new DateTimePicker(dtpEl[i]);
    }
  }
</script>
```
