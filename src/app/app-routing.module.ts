import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistComponent } from './playlist/playlist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SongDetailComponent } from './song-detail/song-detail.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'detail/:id', component: SongDetailComponent },
	{ path: 'playlist/:id', component: PlaylistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
