import { DOCUMENT } from "@angular/common";
import { FormControl } from "@angular/forms";
import { MatDatepicker } from "@angular/material/datepicker";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";

export const MY_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@Component({
  selector: "easy-datepicker",
  templateUrl: "./easy-datepicker.component.html",
  styles: [
    `
      input {
        cursor: pointer !important;
      }
    `,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EasyDatepicker implements OnInit, AfterViewInit {
  @Input() value?: Date;
  @Input() min?: Date;
  @Input() max?: Date;
  @Input() disabled: boolean = false;
  @Input() mode: "YEAR" | "MONTHYEAR" | "FULLDATE" = "FULLDATE";
  @Input() appearance: "outline" | "fill" = "outline";
  @Input() placeholder: string = "";
  @Input() label: string = "Date";
  @Input() required: boolean = false;
  @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();
  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date> | undefined;

  public minDate?: Date;
  public maxDate?: Date;
  public dateControl: FormControl;
  public startView = "multi-year";
  public rundomId = Math.floor(Math.random() * 1000000);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _cdRef: ChangeDetectorRef
  ) {
    this.dateControl = new FormControl();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._setParametersToDatepicker();
    }, 100);
  }

  // remove calendar period button if mode specified
  public removeButton() {
    if (this.mode) {
      setTimeout(() => {
        const calendarPeriodButton = document.querySelector(
          ".mat-calendar-period-button"
        ) as HTMLElement;
        const matCalendarArrow = document.querySelector(
          ".mat-calendar-arrow"
        ) as HTMLElement;
        calendarPeriodButton.style.pointerEvents = "none";
        matCalendarArrow.style.display = "none";
      }, 20);
    }
  }

  public chosenYearHandler(
    date?: Moment,
    datepicker?: MatDatepicker<Date>
  ): void {
    if (this.mode === "YEAR" && date) {
      MY_FORMATS["parse"].dateInput = "YYYY";
      MY_FORMATS["display"].dateInput = "YYYY";
      this.dateControl.setValue(date._d);
      if (datepicker) {
        datepicker.close();
      }
      this.dateChange.emit(date._d);
    }
  }

  public chosenMonthYeartHandler(
    date: Moment,
    datepicker?: MatDatepicker<Date>
  ): void {
    if (this.mode === "MONTHYEAR" && datepicker) {
      MY_FORMATS["parse"].dateInput = "MM/YYYY";
      MY_FORMATS["display"].dateInput = "MM/YYYY";
      this.dateControl.setValue(date._d);
      datepicker.close();
      this.dateChange.emit(date._d);
    }
  }

  public chosenDateHandler(
    date: Moment,
    datepicker?: MatDatepicker<Date>
  ): void {
    if (this.mode === "FULLDATE" && date && datepicker) {
      MY_FORMATS["parse"].dateInput = "DD/MM/YYYY";
      MY_FORMATS["display"].dateInput = "DD/MM/YYYY";
      this.dateControl.setValue(date._d);
      datepicker.close();
      if (this.value !== date._d) {
        this.dateChange.emit(date._d);
      }
    }
  }

  private _setParametersToDatepicker(): void {
    //set min and max year to datepicker
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();

    if (this.max) {
      this.maxDate = this.max;
    } else {
      this.maxDate = new Date(
        new Date().getFullYear(),
        currentMonth,
        currentDate
      );
    }

    if (this.min) {
      this.minDate = this.min;
    } else {
      this.minDate = new Date(
        this.maxDate.getFullYear() - 120,
        currentMonth,
        currentDate
      );
    }

    if (this.mode === null) {
      this.mode = "FULLDATE";
    }

    this._cdRef.detectChanges();

    // set value if exist
    this._setValueToDatePicker();
  }

  private _setValueToDatePicker(): void {
    if (this.value) {
      const dateFormat = "YYYYMMDD";
      switch (this.mode) {
        case "FULLDATE":
          this.chosenDateHandler(
            this._convertDateToMoment(this.value, dateFormat),
            this.datepicker
          );
          break;
        case "YEAR":
          this.chosenYearHandler(
            this._convertDateToMoment(this.value, dateFormat),
            this.datepicker
          );
          break;
        case "MONTHYEAR":
          this.chosenMonthYeartHandler(
            this._convertDateToMoment(this.value, dateFormat),
            this.datepicker
          );
          break;
        default:
          break;
      }
      this._cdRef.detectChanges();
    }
  }

  private _convertDateToMoment(date: Date, format: string): Moment {
    if (typeof date === "string") {
      date = new Date(date);
    }

    return {
      _d: date,
      _f: format,
      _isAMomentObject: true,
      _isUTC: false,
      _isValid: true,
      _locale: {},
      _offset: 0,
      _pf: {},
    };
  }
}

interface Moment {
  _d: Date;
  _f: string;
  _isAMomentObject: boolean;
  _isUTC: boolean;
  _isValid: boolean;
  _locale: any;
  _offset: number;
  _pf: any;
}
