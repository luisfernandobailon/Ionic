import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReservadosPage } from './reservados.page';

describe('ReservadosPage', () => {
  let component: ReservadosPage;
  let fixture: ComponentFixture<ReservadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
