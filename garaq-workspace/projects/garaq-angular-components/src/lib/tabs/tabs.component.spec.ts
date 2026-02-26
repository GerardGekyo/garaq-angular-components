import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    fixture.componentRef.setInput('tabs', ['Tab 1', 'Tab 2', 'Tab 3']);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should normalize string tabs to GcTab objects', () => {
    const normalized = (component as any)._normalizedTabs();
    expect(normalized[0]).toEqual({ label: 'Tab 1', value: 'Tab 1' });
    expect(normalized[1]).toEqual({ label: 'Tab 2', value: 'Tab 2' });
  });

  it('should accept GcTab objects directly without modification', () => {
    const tabs = [
      { label: 'Overview', value: 'overview' },
      { label: 'Settings', value: 'settings' },
    ];
    fixture.componentRef.setInput('tabs', tabs);
    fixture.detectChanges();
    const normalized = (component as any)._normalizedTabs();
    expect(normalized[0]).toBe(tabs[0]);
  });

  it('should activate the first tab by default', () => {
    expect((component as any)._activeValue()).toBe('Tab 1');
  });

  it('should use value input as active tab when provided', () => {
    fixture.componentRef.setInput('value', 'Tab 3');
    fixture.detectChanges();
    expect((component as any)._activeValue()).toBe('Tab 3');
  });

  it('should update _activeValue when a tab is selected', () => {
    const tabs = (component as any)._normalizedTabs();
    (component as any)._selectTab(tabs[2]);
    expect((component as any)._activeValue()).toBe('Tab 3');
  });

  it('should emit valueChange when a tab is selected', () => {
    let emittedValue: string | undefined;
    component.valueChange.subscribe((v) => (emittedValue = v));
    const tabs = (component as any)._normalizedTabs();
    (component as any)._selectTab(tabs[1]);
    expect(emittedValue).toBe('Tab 2');
  });

  it('should not select or emit when a disabled tab is clicked', () => {
    const disabledTabs = [
      { label: 'Active', value: 'active' },
      { label: 'Disabled', value: 'disabled', disabled: true },
    ];
    fixture.componentRef.setInput('tabs', disabledTabs);
    fixture.detectChanges();

    let emitted = false;
    component.valueChange.subscribe(() => (emitted = true));
    (component as any)._selectTab(disabledTabs[1]);

    expect(emitted).toBe(false);
    expect((component as any)._activeValue()).toBe('active');
  });
});
