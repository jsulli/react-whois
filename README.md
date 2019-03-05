## React-WhoIs

This react frontend submits an address (ip or domain) and returns whois data about it. The submit calls to an API gateway backend that in turn calls to a lambda server. The site is hosted on S3 and is deployed with terraform and AWS CLI

Backend code is at https://github.com/jsulli/node-whois

#### Deploy

`npm run-script deploy`

#### Test

Tests are done with jest and enzyme for UI testing. Full API and UI test coverage. Run with `npm test`.

