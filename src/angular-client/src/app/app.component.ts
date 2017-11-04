import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private oauthService: OAuthService,
              private http: HttpClient) {
    this.configureWithNewConfigApi();
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public logoff() {
    this.oauthService.logOut();
  }

  public callApi() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '  + this.oauthService.getAccessToken()
    });

    this.http.get('http://localhost:5001/api/values', {headers: headers}).subscribe(r => {
      console.log(r);
    });
  }
}
