import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonComponent } from './radio-button.component';

describe('RadioButtonComponent', () => {
  let component: RadioButtonComponent;
  let fixture: ComponentFixture<RadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioButtonComponent);
    fixture.componentRef.setInput('name', 'test-group');
    fixture.componentRef.setInput('value', 'option-a');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply gc-size-default class by default', () => {
    expect(fixture.nativeElement.classList.contains('gc-size-default')).toBe(true);
  });

  it('should apply size class when size input changes', () => {
    for (const size of ['sm', 'lg'] as const) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      expect(fixture.nativeElement.classList.contains(`gc-size-${size}`)).toBe(true);
    }
  });

  it('should not have gc-checked class by default', () => {
    expect(fixture.nativeElement.classList.contains('gc-checked')).toBe(false);
  });

  it('should add gc-checked class when checked input is true', () => {
    fixture.componentRef.setInput('checked', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('gc-checked')).toBe(true);
  });

  it('should apply gc-disabled class when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('gc-disabled')).toBe(true);
  });

  it('should emit checkedChange with the component value when onChange fires with checked=true', () => {
    let emittedValue: any;
    component.checkedChange.subscribe((v) => (emittedValue = v));
    (component as any).onChange({ target: { checked: true } } as any);
    expect(emittedValue).toBe('option-a');
  });

  it('should not emit checkedChange when onChange fires with checked=false', () => {
    let emitted = false;
    component.checkedChange.subscribe(() => (emitted = true));
    (component as any).onChange({ target: { checked: false } } as any);
    expect(emitted).toBe(false);
  });

  it('should emit the correct value when multiple radios have different values', () => {
    fixture.componentRef.setInput('value', 'option-b');
    fixture.detectChanges();
    let emittedValue: any;
    component.checkedChange.subscribe((v) => (emittedValue = v));
    (component as any).onChange({ target: { checked: true } } as any);
    expect(emittedValue).toBe('option-b');
  });
});
