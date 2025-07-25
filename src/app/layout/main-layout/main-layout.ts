import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footerbar } from './components/footerbar/footerbar';


@Component({
  selector: 'app-main-layout',
  imports: [
    RouterModule,
    Navbar,
    Footerbar,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {

}
