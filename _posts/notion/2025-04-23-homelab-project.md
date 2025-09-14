---
layout: post
comments: true
date: 2025-04-23
title: "Homelab Project" 
tags:
  - networking
  - linux
 
categories:
  - tech

pin: false
---

![Image as of April 2025](../../static/images/2025-04-23-homelab-project.md/Image as of April 2025)


Like most tinkering adventures, my homelab started small. Back in the day, I had nothing more than a Raspberry Pi 3 running 24/7 on solar power, with everything built from scratch. It wasn’t much, but it was enough to get me hooked on the idea of always-on infrastructure. Over the last seven years, that little Pi has grown into a full-fledged cluster that powers experiments, automation, and a bit of fun along the way.


### Building Blocks


At the core of my setup are **three 11th Gen Intel i5 NUCs**, forming the backbone of my cluster. They handle most of the heavy workloads, things like trans coding my Plex media, or Processing my immich library with a **dedicated laptop on backup power** taking over when reliability really matters.


For wireless experiments, I rely on a mix of **ARM-based Jetson boards and Raspberry Pis**. These have been my go-to for testing everything from IoT protocols to custom firmware builds.


![HomeLab](../../static/images/2025-04-23-homelab-project.md/HomeLab)


### Networking & Remote Access


Getting in and out of the homelab securely was a big step forward. I run a **WireGuard VPN**, accessible through a static IP and port forwarding. To make things even smoother, I added **Cloudflared tunnels**, so I can reach my services from anywhere without exposing ports to the internet.


### Automation & Control


One of my favorite parts of the lab is how it ties into my home. **Home Assistant** runs as the central automation brain, orchestrating everything from smart devices to experimental IoT nodes. I


To monitor and control the cluster itself, I use **Node-RED dashboards**. From a single screen, I can check the health of my machines, trigger actions, or even **wake nodes on LAN** whenever I need more compute power.


### Side Quests & Contributions


Not everything is about servers and automation, some of it is just fun. I run an **ADS-B receiver** that streams live flight data to FlightRadar24, contributing to a global tracking network.


I’ve also dabbled in containerization, self-hosted services, and lightweight CI/CD setups, all running within the cluster. It’s been a great way to learn about Docker, reverse proxies, and edge deployments without relying on cloud credits.


### From Pi to Cluster


Thanks to my full time job, I was able to monetarily invest significantly in my hobby. Looking back, it’s wild to think that all of this started with a single Pi. Today, my homelab is a mix of reliability, experimentation, and curiosity. It’s where I break things, fix them, and learn in the process. 


I plan to write more article on things I learned along the way so that it can help others who are deeply interested to start off on a similar journey!


### Gallery


![The control center!](../../static/images/2025-04-23-homelab-project.md/The control center!)


![Proxmox Dashboard](../../static/images/2025-04-23-homelab-project.md/Proxmox Dashboard)


![Cluster information](../../static/images/2025-04-23-homelab-project.md/Cluster information)

