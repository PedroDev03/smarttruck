import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  @Output() filterChange = new EventEmitter<{ search?: string; status?: string }>();

  form: FormGroup;
  private sub: Subscription | undefined;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      search: [''],
      status: ['all']
    });
  }

  ngOnInit(): void {
    this.sub = this.form.valueChanges.pipe(debounceTime(300)).subscribe((v) => {
      this.filterChange.emit(v);
    });
    // Emit initial value so parent can initialize filtered list
    this.filterChange.emit(this.form.value);
  }

  clear(): void {
    this.form.patchValue({ search: '', status: 'all' });
    this.filterChange.emit(this.form.value);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
