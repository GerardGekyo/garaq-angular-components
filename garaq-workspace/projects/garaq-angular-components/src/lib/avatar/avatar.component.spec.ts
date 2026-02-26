import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
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
    for (const size of ['xs', 'sm', 'lg', 'xl'] as const) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      expect(fixture.nativeElement.classList.contains(`gc-size-${size}`)).toBe(true);
    }
  });

  it('should compute initials from a single word name', () => {
    fixture.componentRef.setInput('name', 'Gerard');
    fixture.detectChanges();
    expect((component as any)._initials()).toBe('G');
  });

  it('should compute initials from a two-word name', () => {
    fixture.componentRef.setInput('name', 'Gerard Gekyo');
    fixture.detectChanges();
    expect((component as any)._initials()).toBe('GG');
  });

  it('should use first and last word of a multi-word name', () => {
    fixture.componentRef.setInput('name', 'Juan De La Cruz');
    fixture.detectChanges();
    expect((component as any)._initials()).toBe('JC');
  });

  it('should return "?" for an empty name', () => {
    fixture.componentRef.setInput('name', '');
    fixture.detectChanges();
    expect((component as any)._initials()).toBe('?');
  });

  it('should show image when src is provided and no error', () => {
    fixture.componentRef.setInput('src', 'https://example.com/avatar.png');
    fixture.detectChanges();
    expect((component as any)._showImage()).toBe(true);
  });

  it('should hide image after _onImgError() is called', () => {
    fixture.componentRef.setInput('src', 'https://example.com/avatar.png');
    fixture.detectChanges();
    (component as any)._onImgError();
    expect((component as any)._showImage()).toBe(false);
  });
});
