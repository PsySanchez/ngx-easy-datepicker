# ngx-easy-datepicker

ngx-easy-datepicker is a lightweight, user-friendly Angular datepicker component built on top of Angular Material. It offers a clean and intuitive interface for selecting dates, making it easy for users to input date values in your Angular applications.

## Installation

```bash
npm install ngx-easy-datepicker
```

## Usage

```typescript
import { EasyDatepicker } from 'ngx-easy-datepicker';

// In your app.module.ts
@NgModule({
  imports: [
    EasyDatepicker
  ],
  // ...
})
export class AppModule {}

// In your component template
<easy-datepicker [(ngModel)]="selectedDate"></easy-datepicker>
```

## Options

```markdown
| Option           | Type      | Mandatory | Description                                                                                   |
| ---------------- | --------- | --------- | --------------------------------------------------------------------------------------------- |
| initialDate      | Date      | false     | Sets the initial date.                                                                        |
| min              | Date      | false     | Specifies the earliest selectable date.                                                       |
| max              | Date      | false     | Defines the latest selectable date (by default 120 years).                                    |
| disabled         | boolean   | false     | Disables the datepicker.                                                                      |
| mode             | string    | false     | Controls the level of detail displayed in the datepicker ("YEAR" | "MONTHYEAR" | "FULLDATE"). |
| appearance       | string    | false     | Determines the visual style of the datepicker ("outline" | "fill").                           |
| placeholder      | string    | false     | Sets the placeholder text displayed when no date is selected.                                 |
| label            | string    | false     | Provides a label for the datepicker field.                                                    |
| required         | boolean   | false     | Makes the datepicker field mandatory.                                                         |
| dateChange       | EventEmitter<Date>    |  Emits an event when the selected date changes.                                               |
```