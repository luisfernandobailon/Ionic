import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  componentes: Componente[] = [
    {
      icon: 'person',
      name: 'Usuarios',
      redirectTo: '/home',
      nivelUsuario: 0
    },
    {
      icon: 'create',
      name: 'Apartar Lote',
      redirectTo: '/lotes',
      nivelUsuario: 0
    },
    {
      icon: 'create',
      name: 'Lotes Reservados',
      redirectTo: '/reservados',
      nivelUsuario: 0
    }
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }



  redireccionar(a) {
    this.router.navigate([a]);
  }

}
interface Componente {
  icon: string;
  name: string;
  redirectTo: string;
  nivelUsuario: number;
}
