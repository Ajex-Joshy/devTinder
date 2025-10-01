### Addding a custom Domain name

- purchased domain name from any domain provider
- signup on cloudflare & add a new domain name
- change the nameservers on domain provider and point it to cloudflare
- wait for sometime till your nameservers are updated ~15 minutes
- add DNS record: A devtinder.in 13.60.205.100 (aws machine public ip)
- Enable SSL for website on cloudflare
