import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallePagosPage } from './detalle-pagos.page';

describe('DetallePagosPage', () => {
  let component: DetallePagosPage;
  let fixture: ComponentFixture<DetallePagosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePagosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallePagosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
