# Vesta deployment status

- Source commit: `1864112e0a8f5e1daa18bcc7ba5db6358f49365f`
- Exit code: `1`
- Checked at: `2026-08-20T06:09:38Z`
- Result: ❌ FAILED

```text
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
Hit:1 https://mirror.hetzner.com/ubuntu/packages resolute InRelease
Hit:2 https://mirror.hetzner.com/ubuntu/packages resolute-updates InRelease
Hit:3 https://mirror.hetzner.com/ubuntu/packages resolute-backports InRelease
Hit:4 https://mirror.hetzner.com/ubuntu/security resolute-security InRelease
Reading package lists...
Reading package lists...
Building dependency tree...
Reading state information...
Solving dependencies...
The following additional packages will be installed:
  python3-acme python3-certbot python3-configargparse python3-icu
  python3-josepy python3-parsedatetime python3-pytz python3-rfc3339
Suggested packages:
  python-certbot-doc python3-certbot-apache python-acme-doc
  python-certbot-nginx-doc
The following NEW packages will be installed:
  certbot python3-acme python3-certbot python3-certbot-nginx
  python3-configargparse python3-icu python3-josepy python3-parsedatetime
  python3-pytz python3-rfc3339
0 upgraded, 10 newly installed, 0 to remove and 11 not upgraded.
Need to get 1,248 kB of archives.
After this operation, 6,391 kB of additional disk space will be used.
Get:1 https://mirror.hetzner.com/ubuntu/packages resolute/universe amd64 python3-josepy all 2.2.0-1 [22.3 kB]
Get:2 https://mirror.hetzner.com/ubuntu/packages resolute/universe amd64 python3-pytz all 2025.2-5 [32.4 kB]
Get:3 https://mirror.hetzner.com/ubuntu/packages resolute/universe amd64 python3-rfc3339 all 2.0.1-2 [6,530 B]
Get:4 https://mirror.hetzner.com/ubuntu/packages resolute/universe amd64 python3-acme all 4.0.0-2 [49.3 kB]
Get:5 https://mirror.hetzner.com/ubuntu/packages resolute/main amd64 python3-configargparse all 1.7-2 [31.7 kB]
Get:6 https://mirror.hetzner.com/ubuntu/packages resolute/universe amd64 python3-parsedatetime all 2.6-3build1 [32.1 kB]
Get:7 https://mirror.hetzner.com/ubuntu/packages resolute/universe amd64 python3-certbot all 4.0.0-4 [267 kB]
Get:8 https://mirror.hetzner.com/ubuntu/packages resolute/universe amd64 certbot all 4.0.0-4 [91.5 kB]
Get:9 https://mirror.hetzner.com/ubuntu/packages resolute/universe amd64 python3-certbot-nginx all 4.0.0-3 [67.7 kB]
Get:10 https://mirror.hetzner.com/ubuntu/packages resolute/main amd64 python3-icu amd64 2.16.1-1build1 [647 kB]
Preconfiguring packages ...
Fetched 1,248 kB in 0s (22.8 MB/s)
Selecting previously unselected package python3-josepy.
(Reading database… (Reading database… 5%(Reading database… 10%(Reading database… 15%(Reading database… 20%(Reading database… 25%(Reading database… 30%(Reading database… 35%(Reading database… 40%(Reading database… 45%(Reading database… 50%(Reading database… 55%(Reading database… 60%(Reading database… 65%(Reading database… 70%(Reading database… 75%(Reading database… 80%(Reading database… 85%(Reading database… 90%(Reading database… 95%(Reading database… 100%(Reading database… 52167 files and directories currently installed.)
Preparing to unpack …/0-python3-josepy_2.2.0-1_all.deb…
Unpacking python3-josepy (2.2.0-1)…
Selecting previously unselected package python3-pytz.
Preparing to unpack …/1-python3-pytz_2025.2-5_all.deb…
Unpacking python3-pytz (2025.2-5)…
Selecting previously unselected package python3-rfc3339.
Preparing to unpack …/2-python3-rfc3339_2.0.1-2_all.deb…
Unpacking python3-rfc3339 (2.0.1-2)…
Selecting previously unselected package python3-acme.
Preparing to unpack …/3-python3-acme_4.0.0-2_all.deb…
Unpacking python3-acme (4.0.0-2)…
Selecting previously unselected package python3-configargparse.
Preparing to unpack …/4-python3-configargparse_1.7-2_all.deb…
Unpacking python3-configargparse (1.7-2)…
Selecting previously unselected package python3-parsedatetime.
Preparing to unpack …/5-python3-parsedatetime_2.6-3build1_all.deb…
Unpacking python3-parsedatetime (2.6-3build1)…
Selecting previously unselected package python3-certbot.
Preparing to unpack …/6-python3-certbot_4.0.0-4_all.deb…
Unpacking python3-certbot (4.0.0-4)…
Selecting previously unselected package certbot.
Preparing to unpack …/7-certbot_4.0.0-4_all.deb…
Unpacking certbot (4.0.0-4)…
Selecting previously unselected package python3-certbot-nginx.
Preparing to unpack …/8-python3-certbot-nginx_4.0.0-3_all.deb…
Unpacking python3-certbot-nginx (4.0.0-3)…
Selecting previously unselected package python3-icu.
Preparing to unpack …/9-python3-icu_2.16.1-1build1_amd64.deb…
Unpacking python3-icu (2.16.1-1build1)…
Setting up python3-configargparse (1.7-2)…
Setting up python3-parsedatetime (2.6-3build1)…
Setting up python3-icu (2.16.1-1build1)…
Setting up python3-pytz (2025.2-5)…
Setting up python3-josepy (2.2.0-1)…
Setting up python3-rfc3339 (2.0.1-2)…
Setting up python3-acme (4.0.0-2)…
Setting up python3-certbot (4.0.0-4)…
Setting up certbot (4.0.0-4)…
Created symlink '/etc/systemd/system/timers.target.wants/certbot.timer' → '/usr/lib/systemd/system/certbot.timer'.
Setting up python3-certbot-nginx (4.0.0-3)…
Processing triggers for man-db (2.13.1-1build1)…

Running kernel seems to be up-to-date.

No services need to be restarted.

No containers need to be restarted.

No user sessions are running outdated binaries.

No VM guests are running outdated hypervisor (qemu) binaries on this host.
Another instance of Certbot is already running.
Ask for help or search for solutions at https://community.letsencrypt.org. See the logfile /tmp/certbot-log-yuazbasd/log or re-run Certbot with -v for more details.
```
