import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ToastComponent,
  ToastContainerComponent,
  ToastService,
} from './toast.component';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
    // Reset state between tests
    service.toasts.set([]);
    (service as any)._nextId = 0;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a toast when show() is called', () => {
    service.show('Hello!', 'info', 0);
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].message).toBe('Hello!');
    expect(service.toasts()[0].variant).toBe('info');
  });

  it('should default variant to info', () => {
    service.show('Message', undefined, 0);
    expect(service.toasts()[0].variant).toBe('info');
  });

  it('should add multiple toasts', () => {
    service.show('First', 'success', 0);
    service.show('Second', 'error', 0);
    expect(service.toasts().length).toBe(2);
  });

  it('should assign incremental ids to toasts', () => {
    service.show('A', 'info', 0);
    service.show('B', 'info', 0);
    const [first, second] = service.toasts();
    expect(first.id).toBeLessThan(second.id);
  });

  it('should remove a toast when dismiss() is called with its id', () => {
    service.show('Toast 1', 'success', 0);
    service.show('Toast 2', 'error', 0);
    const id = service.toasts()[0].id;
    service.dismiss(id);
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].message).toBe('Toast 2');
  });

  it('should not remove other toasts when dismissing one', () => {
    service.show('A', 'info', 0);
    service.show('B', 'info', 0);
    service.show('C', 'info', 0);
    const id = service.toasts()[1].id;
    service.dismiss(id);
    expect(service.toasts().length).toBe(2);
    expect(service.toasts().find((t) => t.message === 'B')).toBeUndefined();
  });

  it('should store the correct duration on the toast', () => {
    service.show('Timed', 'warning', 0);
    expect(service.toasts()[0].duration).toBe(0);
  });
});

describe('ToastContainerComponent', () => {
  let component: ToastContainerComponent;
  let fixture: ComponentFixture<ToastContainerComponent>;
  let service: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastContainerComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ToastService);
    service.toasts.set([]);
    (service as any)._nextId = 0;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have aria-live="polite" on host', () => {
    expect(fixture.nativeElement.getAttribute('aria-live')).toBe('polite');
  });

  it('should dismiss a toast via _dismiss()', () => {
    service.show('Test toast', 'info', 0);
    const id = service.toasts()[0].id;
    (component as any)._dismiss(id);
    expect(service.toasts().length).toBe(0);
  });
});

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to info variant', () => {
    expect(component.variant()).toBe('info');
  });

  it('should not be dismissible by default', () => {
    expect(component.dismissible()).toBe(false);
  });

  it('should not render close button when dismissible is false', () => {
    expect(fixture.nativeElement.querySelector('.gc-toast-close')).toBeNull();
  });

  it('should render close button when dismissible is true', () => {
    fixture.componentRef.setInput('dismissible', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.gc-toast-close')).toBeTruthy();
  });

  it('should emit dismissed when close button is clicked', () => {
    fixture.componentRef.setInput('dismissible', true);
    fixture.detectChanges();
    let emitted = false;
    component.dismissed.subscribe(() => (emitted = true));
    fixture.nativeElement.querySelector('.gc-toast-close').click();
    expect(emitted).toBe(true);
  });
});
