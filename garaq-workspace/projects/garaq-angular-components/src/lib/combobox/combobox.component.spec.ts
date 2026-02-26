import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxComponent } from './combobox.component';

describe('ComboboxComponent', () => {
  let component: ComboboxComponent;
  let fixture: ComponentFixture<ComboboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComboboxComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to single mode', () => {
    expect(component.mode()).toBe('single');
  });

  it('should be closed by default', () => {
    expect((component as any)._isOpen()).toBe(false);
  });

  it('should normalize string options to GcComboboxOption objects', () => {
    fixture.componentRef.setInput('options', ['Apple', 'Banana']);
    fixture.detectChanges();
    const normalized = (component as any)._normalizedOptions();
    expect(normalized[0]).toEqual({ label: 'Apple', value: 'Apple' });
    expect(normalized[1]).toEqual({ label: 'Banana', value: 'Banana' });
  });

  it('should keep GcComboboxOption objects as-is', () => {
    const opt = { label: 'Apple', value: 'apple', description: 'A fruit' };
    fixture.componentRef.setInput('options', [opt]);
    fixture.detectChanges();
    const normalized = (component as any)._normalizedOptions();
    expect(normalized[0]).toBe(opt);
  });

  it('should filter options by search text (case-insensitive)', () => {
    fixture.componentRef.setInput('options', ['Apple', 'Banana', 'Apricot']);
    fixture.detectChanges();
    (component as any)._searchText.set('ap');
    const filtered = (component as any)._filteredOptions();
    expect(filtered.length).toBe(2);
    expect(filtered[0].label).toBe('Apple');
    expect(filtered[1].label).toBe('Apricot');
  });

  it('should return all options when search is empty', () => {
    fixture.componentRef.setInput('options', ['Apple', 'Banana', 'Cherry']);
    fixture.detectChanges();
    const filtered = (component as any)._filteredOptions();
    expect(filtered.length).toBe(3);
  });

  it('should emit valueChange when selecting an option in single mode', () => {
    fixture.componentRef.setInput('options', ['Apple', 'Banana']);
    fixture.detectChanges();
    let emittedValue: any;
    component.valueChange.subscribe((v) => (emittedValue = v));

    const opts = (component as any)._normalizedOptions();
    (component as any)._selectOption(opts[0]);
    expect(emittedValue).toBe('Apple');
  });

  it('should close after selecting in single mode', () => {
    fixture.componentRef.setInput('options', ['Apple']);
    fixture.detectChanges();
    (component as any)._isOpen.set(true);
    const opts = (component as any)._normalizedOptions();
    (component as any)._selectOption(opts[0]);
    expect((component as any)._isOpen()).toBe(false);
  });

  it('should emit valuesChange when selecting options in multiple mode', () => {
    fixture.componentRef.setInput('mode', 'multiple');
    fixture.componentRef.setInput('options', ['Apple', 'Banana']);
    fixture.detectChanges();
    let emittedValues: any[] = [];
    component.valuesChange.subscribe((v) => (emittedValues = v));

    const opts = (component as any)._normalizedOptions();
    (component as any)._selectOption(opts[0]);
    expect(emittedValues).toContain('Apple');

    (component as any)._selectOption(opts[1]);
    expect(emittedValues).toContain('Apple');
    expect(emittedValues).toContain('Banana');
  });

  it('should deselect an already-selected option in multiple mode', () => {
    fixture.componentRef.setInput('mode', 'multiple');
    fixture.componentRef.setInput('options', ['Apple', 'Banana']);
    fixture.detectChanges();
    let emittedValues: any[] = [];
    component.valuesChange.subscribe((v) => (emittedValues = v));

    const opts = (component as any)._normalizedOptions();
    (component as any)._selectOption(opts[0]);
    (component as any)._selectOption(opts[0]); // deselect
    expect(emittedValues).not.toContain('Apple');
  });

  it('should not open when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    (component as any)._open();
    expect((component as any)._isOpen()).toBe(false);
  });

  it('should close on _close()', () => {
    (component as any)._isOpen.set(true);
    (component as any)._close();
    expect((component as any)._isOpen()).toBe(false);
  });

  it('should remove a tag via _removeTag()', () => {
    fixture.componentRef.setInput('mode', 'multiple');
    fixture.detectChanges();
    (component as any)._selectedValues.set(['Apple', 'Banana']);
    let emittedValues: any[] = [];
    component.valuesChange.subscribe((v) => (emittedValues = v));

    (component as any)._removeTag('Apple');
    expect(emittedValues).toEqual(['Banana']);
  });
});
