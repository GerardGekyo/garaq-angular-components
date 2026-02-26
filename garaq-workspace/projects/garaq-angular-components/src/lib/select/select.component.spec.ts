import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be open by default', () => {
    expect((component as any)._isOpen()).toBe(false);
    expect(fixture.nativeElement.classList.contains('gc-open')).toBe(false);
  });

  it('should normalize string options to GcSelectOption objects', () => {
    fixture.componentRef.setInput('options', ['Red', 'Green', 'Blue']);
    fixture.detectChanges();
    const normalized = (component as any)._normalizedOptions();
    expect(normalized[0]).toEqual({ label: 'Red', value: 'Red' });
  });

  it('should keep GcSelectOption objects as-is', () => {
    const opt = { label: 'Red', value: 'red', description: 'A color' };
    fixture.componentRef.setInput('options', [opt]);
    fixture.detectChanges();
    const normalized = (component as any)._normalizedOptions();
    expect(normalized[0]).toBe(opt);
  });

  it('should open on _toggle()', () => {
    (component as any)._toggle();
    fixture.detectChanges();
    expect((component as any)._isOpen()).toBe(true);
    expect(fixture.nativeElement.classList.contains('gc-open')).toBe(true);
  });

  it('should close on second _toggle()', () => {
    (component as any)._toggle();
    (component as any)._toggle();
    expect((component as any)._isOpen()).toBe(false);
  });

  it('should not open when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    (component as any)._toggle();
    expect((component as any)._isOpen()).toBe(false);
  });

  it('should emit valueChange when an option is selected', () => {
    fixture.componentRef.setInput('options', ['Red', 'Green', 'Blue']);
    fixture.detectChanges();
    let emittedValue: any;
    component.valueChange.subscribe((v) => (emittedValue = v));

    const opts = (component as any)._normalizedOptions();
    (component as any)._selectOption(opts[1]);
    expect(emittedValue).toBe('Green');
  });

  it('should update _selectedValue after selection', () => {
    fixture.componentRef.setInput('options', ['Red', 'Green']);
    fixture.detectChanges();
    const opts = (component as any)._normalizedOptions();
    (component as any)._selectOption(opts[1]);
    expect((component as any)._selectedValue()).toBe('Green');
  });

  it('should close after selecting an option', () => {
    fixture.componentRef.setInput('options', ['Red']);
    fixture.detectChanges();
    (component as any)._toggle();
    const opts = (component as any)._normalizedOptions();
    (component as any)._selectOption(opts[0]);
    expect((component as any)._isOpen()).toBe(false);
  });

  it('should not select a disabled option', () => {
    const opts = [{ label: 'Red', value: 'red', disabled: true }];
    fixture.componentRef.setInput('options', opts);
    fixture.detectChanges();
    let emitted = false;
    component.valueChange.subscribe(() => (emitted = true));
    (component as any)._selectOption(opts[0]);
    expect(emitted).toBe(false);
  });

  it('should compute _displayLabel from selected option', () => {
    fixture.componentRef.setInput('options', ['Red', 'Green']);
    fixture.detectChanges();
    const opts = (component as any)._normalizedOptions();
    (component as any)._selectOption(opts[0]);
    expect((component as any)._displayLabel()).toBe('Red');
  });
});
