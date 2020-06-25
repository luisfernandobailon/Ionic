import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReservarPage } from './reservar.page';

describe('ReservarPage', () => {
  let component: ReservarPage;
  let fixture: ComponentFixture<ReservarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
