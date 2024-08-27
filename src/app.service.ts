import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      created_by: 'Guilherme Souza de Oliveira',
      company: 'Shopper',
      tech_test_url:
        'https://s3.amazonaws.com/communication-assets-prod.public/production/companies/383/emails/1724758035690/communication-assets-2e61dfb0-6467-11ef-8215-ab8ed6478ae7/teste_tcnico_desenvolvimento_web.pdf?AWSAccessKeyId=AKIAIZVMCEUHKGVSZ3YQ&Expires=1724760328&Signature=mJSz7jUsFnxFRH2fecdJDAhtjwc%3D',
    };
  }
}
