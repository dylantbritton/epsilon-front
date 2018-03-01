import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvpBattleComponent } from './pvp-battle.component';

describe('PvpBattleComponent', () => {
  let component: PvpBattleComponent;
  let fixture: ComponentFixture<PvpBattleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvpBattleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvpBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
