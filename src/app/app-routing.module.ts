import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistComponent } from './playlist/playlist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SongDetailComponent } from './song-detail/song-detail.component';

const routes: Routes = [
	{ path: '', redirectTo: '/playlist', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'playlist', component: PlaylistComponent },
	{ path: 'detail/:id', component: SongDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
