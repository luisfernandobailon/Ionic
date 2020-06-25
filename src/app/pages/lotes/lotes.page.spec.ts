import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LotesPage } from './lotes.page';

describe('LotesPage', () => {
  let component: LotesPage;
  let fixture: ComponentFixture<LotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
