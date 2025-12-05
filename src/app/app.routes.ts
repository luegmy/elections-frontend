import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListaCandidatosComponent } from './components/lista-candidatos/lista-candidatos.component';
import { DetalleCandidatoComponent } from './components/detalle-candidato/detalle-candidato.component';
import { FormularioCandidatoComponent } from './components/formulario-candidato/formulario-candidato.component';

export const routes: Routes = [
  { 
    path: '', 
    component: InicioComponent 
  },
  { 
    path: 'candidatos', 
    component: ListaCandidatosComponent 
  },
  { 
    path: 'candidato/:id', 
    component: DetalleCandidatoComponent 
  },
  { 
    path: 'nuevo-candidato', 
    component: FormularioCandidatoComponent 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];