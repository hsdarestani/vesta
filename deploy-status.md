# Vesta deployment status

- Source commit: `2ce636ac818d3f9413c8a3e521ea7d08beddfce4`
- Exit code: `0`
- Checked at: `2026-08-22T15:52:12Z`
- Result: ✅ SUCCESS

```text
[1/6] Checking SSH connection
Warning: Permanently added '5.75.196.204' (ED25519) to the list of known hosts.
SSH_OK
Linux Srv-HET-df1253 7.0.0-29-generic #29-Ubuntu SMP PREEMPT_DYNAMIC Fri Jul 17 20:52:35 UTC 2026 x86_64 GNU/Linux
[2/6] Preparing web root
Warning: Permanently added '5.75.196.204' (ED25519) to the list of known hosts.
[3/6] Uploading application
Warning: Permanently added '5.75.196.204' (ED25519) to the list of known hosts.
[4/6] Configuring Nginx
Warning: Permanently added '5.75.196.204' (ED25519) to the list of known hosts.
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
[5/6] Ensuring HTTPS certificate
Warning: Permanently added '5.75.196.204' (ED25519) to the list of known hosts.
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Certificate not yet due for renewal
Deploying certificate
Successfully deployed certificate for vesta.smarbiz.sbs to /etc/nginx/sites-enabled/vesta.smarbiz.sbs
Congratulations! You have successfully enabled HTTPS on https://vesta.smarbiz.sbs

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
[6/6] Public health checks
DEPLOYMENT_OK
```
