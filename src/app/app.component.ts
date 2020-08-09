import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Settings, AppSettings } from './components/shared/services/color-option.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ecommerce-sophia-new';
  public settings: Settings;
  public url : any;

  constructor(private spinner: NgxSpinnerService, public appSettings:AppSettings, public router: Router) {
    this.settings = this.appSettings.settings;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    } )
  }


  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0,0)
  });
  }

}
