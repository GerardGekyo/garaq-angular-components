import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparatorComponent } from './separator.component';

describe('SeparatorComponent', () => {
  let component: SeparatorComponent;
  let fixture: ComponentFixture<SeparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeparatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeparatorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have role="separator" on host', () => {
    expect(fixture.nativeElement.getAttribute('role')).toBe('separator');
  });

  it('should default to horizontal orientation', () => {
    expect(component.orientation()).toBe('horizontal');
    expect(fixture.nativeElement.classList.contains('gc-horizontal')).toBe(true);
  });

  it('should set aria-orientation to horizontal by default', () => {
    expect(fixture.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('should apply gc-vertical class when orientation is vertical', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('gc-vertical')).toBe(true);
    expect(fixture.nativeElement.classList.contains('gc-horizontal')).toBe(false);
  });

  it('should update aria-orientation when orientation changes', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('should not render .gc-label when label is empty', () => {
    expect(fixture.nativeElement.querySelector('.gc-label')).toBeNull();
  });

  it('should render .gc-label when label is provided', () => {
    fixture.componentRef.setInput('label', 'OR');
    fixture.detectChanges();
    const labelEl = fixture.nativeElement.querySelector('.gc-label');
    expect(labelEl).toBeTruthy();
    expect(labelEl.textContent.trim()).toBe('OR');
  });

  it('should add gc-has-label class when label is provided', () => {
    fixture.componentRef.setInput('label', 'OR');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('gc-has-label')).toBe(true);
  });

  it('should remove gc-has-label class when label is cleared', () => {
    fixture.componentRef.setInput('label', 'OR');
    fixture.detectChanges();
    fixture.componentRef.setInput('label', '');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('gc-has-label')).toBe(false);
  });
});
