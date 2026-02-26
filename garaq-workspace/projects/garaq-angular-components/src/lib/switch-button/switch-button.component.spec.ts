import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchButtonComponent } from './switch-button.component';

describe('SwitchButtonComponent', () => {
  let component: SwitchButtonComponent;
  let fixture: ComponentFixture<SwitchButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchButtonComponent);
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

  it('should emit checkedChange(true) when toggled on', () => {
    let emittedValue: boolean | undefined;
    component.checkedChange.subscribe((v) => (emittedValue = v));
    (component as any).onChange({ target: { checked: true } } as any);
    expect(emittedValue).toBe(true);
  });

  it('should emit checkedChange(false) when toggled off', () => {
    let emittedValue: boolean | undefined;
    component.checkedChange.subscribe((v) => (emittedValue = v));
    (component as any).onChange({ target: { checked: false } } as any);
    expect(emittedValue).toBe(false);
  });

  it('should update _currentChecked signal on onChange', () => {
    (component as any).onChange({ target: { checked: true } } as any);
    expect((component as any)._currentChecked()).toBe(true);
    (component as any).onChange({ target: { checked: false } } as any);
    expect((component as any)._currentChecked()).toBe(false);
  });
});
