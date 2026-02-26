import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to info variant', () => {
    expect(component.variant()).toBe('info');
  });

  it('should apply gc-variant-info class by default', () => {
    expect(fixture.nativeElement.classList.contains('gc-variant-info')).toBe(true);
  });

  it('should apply the given variant class', () => {
    for (const variant of ['info', 'success', 'warning', 'error'] as const) {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();
      expect(fixture.nativeElement.classList.contains(`gc-variant-${variant}`)).toBe(true);
    }
  });

  it('should not have gc-dismissed class initially', () => {
    expect(fixture.nativeElement.classList.contains('gc-dismissed')).toBe(false);
  });

  it('should add gc-dismissed class after _dismiss() is called', () => {
    (component as any)._dismiss();
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('gc-dismissed')).toBe(true);
  });

  it('should emit dismissed event when _dismiss() is called', () => {
    let emitted = false;
    component.dismissed.subscribe(() => (emitted = true));
    (component as any)._dismiss();
    expect(emitted).toBe(true);
  });
});
