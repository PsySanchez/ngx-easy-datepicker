# ngx-easy-datepicker

![Example Image](https://github.com/PsySanchez/ngx-easy-datepicker/blob/master/datepicker.png)

ngx-easy-datepicker is a lightweight, user-friendly Angular datepicker component built on top of Angular Material. It offers a clean and intuitive interface for selecting dates, making it easy for users to input date values in your Angular applications.

## Installation

```bash
npm install ngx-easy-datepicker
```

## Usage

```typescript
import { Component } from '@angular/core';
import { EasyDatepicker } from 'ngx-easy-datepicker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EasyDatepicker],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-project';
  
  minDate = new Date(2021, 0, 1);
  maxDate = new Date(2021, 11, 31);

  onDateChange(date: Date) {
    console.log('Selected date:', date);
  }
}


// In your component template app.component.html
<easy-datepicker
  [min]="minDate"
  [max]="maxDate"
  (dateChange)="onDateChange($event)"
></easy-datepicker>
```

## Options

```markdown
| Option            | Type                 | Mandatory                                      | Description                                                                                 |
| ----------------- | -------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------- |
| initialDate       | Date                 | false                                          | Sets the initial date.                                                                      |
| min               | Date                 | false                                          | Specifies the earliest selectable date.                                                     |
| max               | Date                 | false                                          | Defines the latest selectable date (by default 120 years).                                  |
| disabled          | boolean              | false                                          | Disables the datepicker.                                                                    |
| mode              | string               | false                                          | Controls the level of detail displayed in the datepicker ("YEAR", "MONTHYEAR", "FULLDATE"). |
| appearance        | string               | false                                          | Determines the visual style of the datepicker ("outline", "fill").                          |
| placeholder       | string               | false                                          | Sets the placeholder text displayed when no date is selected.                               |
| label             | string               | false                                          | Provides a label for the datepicker field.                                                  |
| required          | boolean              | false                                          | Makes the datepicker field mandatory.                                                       |
| dateChange        | EventEmitter<Date>   | Emits an event when the selected date changes. |
```
