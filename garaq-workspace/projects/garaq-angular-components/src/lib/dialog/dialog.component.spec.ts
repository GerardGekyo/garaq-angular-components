import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    // jsdom does not implement showModal/close on <dialog>
    if (!(HTMLDialogElement.prototype as any).showModal) {
      (HTMLDialogElement.prototype as any).showModal = function () {
        this.setAttribute('open', '');
      };
    }
    if (!(HTMLDialogElement.prototype as any).close) {
      (HTMLDialogElement.prototype as any).close = function () {
        this.removeAttribute('open');
        this.dispatchEvent(new Event('close'));
      };
    }

    await TestBed.configureTestingModule({
      imports: [DialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have gc-open class when open is false', () => {
    expect(fixture.nativeElement.classList.contains('gc-open')).toBe(false);
  });

  it('should add gc-open class when open input is true', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('gc-open')).toBe(true);
  });

  it('should remove gc-open class when open input becomes false again', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    fixture.componentRef.setInput('open', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('gc-open')).toBe(false);
  });

  it('should emit openChange(false) when _onClose() is called', () => {
    let emittedValue: boolean | undefined;
    component.openChange.subscribe((v) => (emittedValue = v));
    (component as any)._onClose();
    expect(emittedValue).toBe(false);
  });

  it('should emit closed event when _onClose() is called', () => {
    let emitted = false;
    component.closed.subscribe(() => (emitted = true));
    (component as any)._onClose();
    expect(emitted).toBe(true);
  });

  it('should close on Escape keydown via _onKeydown()', () => {
    let emitted = false;
    component.closed.subscribe(() => (emitted = true));
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    (component as any)._onKeydown(event);
    expect(emitted).toBe(true);
  });

  it('should not close on non-Escape keydown', () => {
    let emitted = false;
    component.closed.subscribe(() => (emitted = true));
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    (component as any)._onKeydown(event);
    expect(emitted).toBe(false);
  });
});
