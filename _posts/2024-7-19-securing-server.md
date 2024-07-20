---
title: 'Securing Home Server with Nginx Proxy Manager, HTTPS, and Fail2Ban'
date: 2024-7-19
toc: true
toc_sticky: true
toc_label: "Table of Contents"
categories:
  - blog 
tags:
  - Server
  - Debian
  - Networking
  - Sysadmin
  - Security
---

## Introduction :bulb:

I have been running a home server for a while now, it currently hosts services like Jellyfin, QbitTorrent, and the Arr suite of software on Docker behind Nginx Proxy Manager. However, I have recently been running an open source intrusion detection system (IDS) called [maltrail](https://github.com/stamparm/maltrail), and it has been logging a lot of suspicious activity like port scans, injection, and RCE attempts. 

![Maltrail Dashboard](https://i.ibb.co/rx3hk7V/maltrail.png)
*A screenshot of my Maltrail dashboard with IP addresses blurred out*

To secure my data and services, I have decided to implement the following security measures:

1. **Nginx Proxy Manager**: To manage my reverse proxy and SSL certificates.
2. **HTTPS**: To encrypt data in transit.
3. **Fail2Ban**: To block malicious IP addresses.

## Nginx Proxy Manager :computer:

I have already set this up in my previous [post](https://zzuo123.github.io/blog/gserve/), so I won't go into too much detail here. Essentially, Nginx Proxy Manager is a reverse proxy that I use to route traffic to the different services running in Docker containers using a single domain name. It has a nice web interface that makes it easy to manage and create new services. And if I put all the services as well as the Nginx Proxy Manager in a single docker-compose file, I can easily assign `<container name>:<port number>` in the Nginx Proxy Manager to route traffic to the correct service.

## HTTPS :lock:

It is important to encrypt data in transit, especially when accessing services over the internet. Regular HTTP traffic is not encrypted, so anyone can intercept and read the data. I have made the stupid mistake of opening port 80 on my router to access Jellyfin, which essentially means every time I log in, my password is sent in plain text over the internet. I have since learned my lesson and have set up HTTPS for all my services, as well as changing my passwords of course.

To set up HTTPS, I used a handy tool included in the Nginx Proxy Manager that allows me to generate SSL certificates for free using Let's Encrypt's ACME DNS-01 challenge. This challenge requires me to create a TXT record in my DNS provider's settings, which proves that I own the domain. I use DuckDNS as my DNS provider, and it is free and easy to set up.

For this, I followed a guide from [Wolfgang's Blog](https://notthebe.ee/blog/easy-ssl-in-homelab-dns01/) that explains this step by step. But essentially, I first get a domain name as well as API token from DuckDNS, which I already use as a dynamic DNS service. Then I just follow the guide and paste in all the required information in Nginx Proxy Manager, and it will generate the SSL certificates for me. Note that it did take a few tries (2 minutes each) for it to work, so don't be discouraged if it doesn't work the first time.

## Fail2Ban :no_entry_sign:

Here is where the fun begins. Fail2Ban is a tool that scans log files for suspicious activity and bans IP addresses that show malicious behavior. It works by reading log files and looking for entries that match certain patterns, like failed login attempts or port scans. If it finds a match, it will add the IP address to a blacklist and block all traffic from that IP address for a certain amount of time.

I have set up Fail2Ban on all the services that I exposed to the internet, but I will use Jellyseerr as an example. Note that the pattern uses regex, so you can literally just create your own pattern to match whatever you want.

To set up Fail2Ban, I first install it using `sudo apt install fail2ban`. Then I create a new filter file in `/etc/fail2ban/filter.d/overseerr.conf` with the following content:

```bash
[Definition]
failregex = .*\[warn\]\[(API|Auth)\]\: Failed (sign-in|login) attempt.*"ip":"<HOST>"
```

Notice that this is a little different from the official guide from Jellyseerr/Overseerr, because I notices in the logs that failed login attempts using Jellyfin credentials has API instead of Auth warnings, and the lingo is a little different. 

Then I create a new jail file in `/etc/fail2ban/jail.d/overseerr.conf` with the following content:

```bash
[overseerr]

backend = auto
enabled = true
port = 80,443
protocol = tcp
filter = overseerr
maxretry = 3
bantime = 86400
findtime = 43200
logpath = <path to Jellyseerr config>/logs/overseerr.log
action = iptables-allports[name=overseerr, chain=DOCKER-USER]
```

Notice that the `chain` is set to `DOCKER-USER` because I am running Jellyseeer in a Docker container and this adds the IP address to ban to the DOCKER-USER chain in iptables. The bantime is set to 86400 seconds (24 hours) and the findtime is set to 43200 seconds (12 hours). This means that if an IP address fails to log in 3 times within 12 hours, it will be banned for 24 hours.

Then I restart Fail2Ban using `sudo systemctl restart fail2ban`, and check the status using `sudo fail2ban-client status overseerr`. If everything is set up correctly, you should see something like this:

```bash
Status for the jail: overseerr
|- Filter
|  |- Currently failed: 0
|  |- Total failed:     0
|  `- File list:        <path to Jellyseerr config>/logs/overseerr.log
`- Actions
   |- Currently banned: 0
   |- Total banned:     0
   `- Banned IP list:
```

To test if it works, I can try to log in to Jellyseerr with the wrong password 3 times, and then check the status again. If it works, I should see the IP address of my computer in the banned IP list.

## Conclusion :wave:

It is scary to see how many malicious actors are out there on the internet, either trying to steal data or to take control of other people's machines. It is important to continue to be vigilant and to take steps to secure our data and services. Stay safe out there! :smile:
