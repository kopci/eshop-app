import { Component } from '@angular/core';
import { DataProviderService } from './shared/dataprovider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'eshop-app';
  loadedFeature = 'home';

  constructor() {}
}
