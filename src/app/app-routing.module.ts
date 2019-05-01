import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistComponent } from './components/playlist/playlist.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SongDetailComponent } from './components/song-detail/song-detail.component';
import { GigCreateComponent } from './components/gig-create/gig-create.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'detail/:id', component: SongDetailComponent },
	{ path: 'playlist/:id', component: PlaylistComponent },
	{ path: 'gig-create', component: GigCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
