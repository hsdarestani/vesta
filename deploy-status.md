# Vesta deployment status

- Source commit: `eff047214e78801ac64faa90ab7b8c6d9e18dd0f`
- Exit code: `0`
- Checked at: `2026-08-20T06:08:11Z`
- Result: ✅ SUCCESS

```text
[2/5] Preparing web root
Warning: Permanently added '5.75.196.204' (ED25519) to the list of known hosts.
[3/5] Uploading application
Warning: Permanently added '5.75.196.204' (ED25519) to the list of known hosts.
[4/5] Configuring Nginx
Warning: Permanently added '5.75.196.204' (ED25519) to the list of known hosts.
Get:1 https://mirror.hetzner.com/ubuntu/packages resolute InRelease [136 kB]
Get:2 https://mirror.hetzner.com/ubuntu/packages resolute-updates InRelease [137 kB]
Get:3 https://mirror.hetzner.com/ubuntu/packages resolute-backports InRelease [136 kB]
Get:4 https://mirror.hetzner.com/ubuntu/security resolute-security InRelease [137 kB]
Get:5 https://mirror.hetzner.com/ubuntu/packages resolute/main amd64 Packages [1,480 kB]
Get:6 https://mirror.hetzner.com/ubuntu/packages resolute/main Translation-en [524 kB]
Get:7 https://mirror.hetzner.com/ubuntu/packages resolute/main amd64 c-n-f Metadata [32.4 kB]
Get:8 https://mirror.hetzner.com/ubuntu/packages resolute/universe amd64 Packages [16.0 MB]
Get:9 https://mirror.hetzner.com/ubuntu/packages resolute/universe Translation-en [6,329 kB]
Get:10 https://mirror.hetzner.com/ubuntu/packages resolute/universe amd64 c-n-f Metadata [313 kB]
Get:11 https://mirror.hetzner.com/ubuntu/packages resolute/restricted amd64 Packages [152 kB]
Get:12 https://mirror.hetzner.com/ubuntu/packages resolute/restricted Translation-en [25.8 kB]
Get:13 https://mirror.hetzner.com/ubuntu/packages resolute/restricted amd64 c-n-f Metadata [388 B]
Get:14 https://mirror.hetzner.com/ubuntu/packages resolute/multiverse amd64 Packages [290 kB]
Get:15 https://mirror.hetzner.com/ubuntu/packages resolute/multiverse Translation-en [127 kB]
Get:16 https://mirror.hetzner.com/ubuntu/packages resolute/multiverse amd64 c-n-f Metadata [8,276 B]
Get:17 https://mirror.hetzner.com/ubuntu/packages resolute-updates/main amd64 Packages [481 kB]
Get:18 https://mirror.hetzner.com/ubuntu/packages resolute-updates/main Translation-en [115 kB]
Get:19 https://mirror.hetzner.com/ubuntu/packages resolute-updates/main amd64 c-n-f Metadata [5,756 B]
Get:20 https://mirror.hetzner.com/ubuntu/packages resolute-updates/universe amd64 Packages [237 kB]
Get:21 https://mirror.hetzner.com/ubuntu/packages resolute-updates/universe Translation-en [77.8 kB]
Get:22 https://mirror.hetzner.com/ubuntu/packages resolute-updates/universe amd64 c-n-f Metadata [4,704 B]
Get:23 https://mirror.hetzner.com/ubuntu/packages resolute-updates/restricted amd64 Packages [359 kB]
Get:24 https://mirror.hetzner.com/ubuntu/packages resolute-updates/restricted Translation-en [69.7 kB]
Get:25 https://mirror.hetzner.com/ubuntu/packages resolute-updates/restricted amd64 c-n-f Metadata [392 B]
Get:26 https://mirror.hetzner.com/ubuntu/packages resolute-updates/multiverse amd64 Packages [11.3 kB]
Get:27 https://mirror.hetzner.com/ubuntu/packages resolute-updates/multiverse Translation-en [3,032 B]
Get:28 https://mirror.hetzner.com/ubuntu/packages resolute-updates/multiverse amd64 c-n-f Metadata [256 B]
Get:29 https://mirror.hetzner.com/ubuntu/packages resolute-backports/main amd64 c-n-f Metadata [112 B]
Get:30 https://mirror.hetzner.com/ubuntu/packages resolute-backports/universe amd64 Packages [640 B]
Get:31 https://mirror.hetzner.com/ubuntu/packages resolute-backports/universe Translation-en [300 B]
Get:32 https://mirror.hetzner.com/ubuntu/packages resolute-backports/universe amd64 c-n-f Metadata [116 B]
Get:33 https://mirror.hetzner.com/ubuntu/packages resolute-backports/restricted amd64 c-n-f Metadata [120 B]
Get:34 https://mirror.hetzner.com/ubuntu/packages resolute-backports/multiverse amd64 c-n-f Metadata [120 B]
Get:35 https://mirror.hetzner.com/ubuntu/security resolute-security/main amd64 Packages [387 kB]
Get:36 https://mirror.hetzner.com/ubuntu/security resolute-security/main Translation-en [92.4 kB]
Get:37 https://mirror.hetzner.com/ubuntu/security resolute-security/main amd64 c-n-f Metadata [4,616 B]
Get:38 https://mirror.hetzner.com/ubuntu/security resolute-security/universe amd64 Packages [154 kB]
Get:39 https://mirror.hetzner.com/ubuntu/security resolute-security/universe Translation-en [50.0 kB]
Get:40 https://mirror.hetzner.com/ubuntu/security resolute-security/universe amd64 c-n-f Metadata [3,552 B]
Get:41 https://mirror.hetzner.com/ubuntu/security resolute-security/restricted amd64 Packages [332 kB]
Get:42 https://mirror.hetzner.com/ubuntu/security resolute-security/restricted Translation-en [64.1 kB]
Get:43 https://mirror.hetzner.com/ubuntu/security resolute-security/restricted amd64 c-n-f Metadata [396 B]
Get:44 https://mirror.hetzner.com/ubuntu/security resolute-security/multiverse amd64 Packages [9,020 B]
Get:45 https://mirror.hetzner.com/ubuntu/security resolute-security/multiverse Translation-en [2,660 B]
Get:46 https://mirror.hetzner.com/ubuntu/security resolute-security/multiverse amd64 c-n-f Metadata [120 B]
Fetched 28.3 MB in 2s (18.5 MB/s)
Reading package lists...
Reading package lists...
Building dependency tree...
Reading state information...
Solving dependencies...
The following additional packages will be installed:
  nginx-common
Suggested packages:
  fcgiwrap nginx-doc ssl-cert
The following NEW packages will be installed:
  nginx nginx-common
0 upgraded, 2 newly installed, 0 to remove and 11 not upgraded.
Need to get 655 kB of archives.
After this operation, 1,860 kB of additional disk space will be used.
Get:1 https://mirror.hetzner.com/ubuntu/packages resolute-updates/main amd64 nginx-common all 1.28.3-2ubuntu1.8 [37.7 kB]
Get:2 https://mirror.hetzner.com/ubuntu/packages resolute-updates/main amd64 nginx amd64 1.28.3-2ubuntu1.8 [617 kB]
Preconfiguring packages ...
Fetched 655 kB in 0s (9,069 kB/s)
Selecting previously unselected package nginx-common.
(Reading database… (Reading database… 5%(Reading database… 10%(Reading database… 15%(Reading database… 20%(Reading database… 25%(Reading database… 30%(Reading database… 35%(Reading database… 40%(Reading database… 45%(Reading database… 50%(Reading database… 55%(Reading database… 60%(Reading database… 65%(Reading database… 70%(Reading database… 75%(Reading database… 80%(Reading database… 85%(Reading database… 90%(Reading database… 95%(Reading database… 100%(Reading database… 52119 files and directories currently installed.)
Preparing to unpack …/nginx-common_1.28.3-2ubuntu1.8_all.deb…
Unpacking nginx-common (1.28.3-2ubuntu1.8)…
Selecting previously unselected package nginx.
Preparing to unpack …/nginx_1.28.3-2ubuntu1.8_amd64.deb…
Unpacking nginx (1.28.3-2ubuntu1.8)…
Setting up nginx-common (1.28.3-2ubuntu1.8)…
Created symlink '/etc/systemd/system/multi-user.target.wants/nginx.service' → '/usr/lib/systemd/system/nginx.service'.
Setting up nginx (1.28.3-2ubuntu1.8)…
 * Upgrading binary nginx
   ...done.
Processing triggers for man-db (2.13.1-1build1)…
Processing triggers for ufw (0.36.2-9build1)…

Running kernel seems to be up-to-date.

No services need to be restarted.

No containers need to be restarted.

No user sessions are running outdated binaries.

No VM guests are running outdated hypervisor (qemu) binaries on this host.
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
[5/5] Server-side health check
Warning: Permanently added '5.75.196.204' (ED25519) to the list of known hosts.
DEPLOYMENT_OK
```
