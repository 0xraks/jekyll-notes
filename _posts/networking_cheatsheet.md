
---
title: "Networking Cheatsheet"
date: 2022-04-03T23:15:00+07:00
slug: Networking-Cheatsheet
category: bioinformatics
summary:
description: 
cover:
  image: "covers/networking.png"
  alt: "Networking Cheatsheet"
  caption: 
  relative: true
showtoc: true
draft: false
---

My handy-dandy networking cheatsheet. Whether you're a beginner or an experienced network administrator, this cheatsheet provides essential information on IP addressing, subnetting, protocols, and more.

# IPV4 Address Table
|  | IP Range | Private IP Range | Subnet Mask | # of Networks | # of Hosts per Network |
| --- | --- | --- | --- | --- | --- |
| Class A | 1.0.0.0 to 126.0.0.0 | 10.0.0.0 to 10.255.255.255 | 255.0.0.0 | 126 | 16,777,214 |
| Class B | 128.0.0.0 to 191.255.0.0 | 172.16.0.0 to 172.31.255.255 | 255.255.0.0 | 16,382 | 65,534 |
| Class C | 192.0.0.0 to 223.255.255.0 | 192.168.0.0 to 192.168.255.255 | 255.255.255.0 | 2,097,150 | 254 |
| Class D | 224.0.0.0 to 239.255.255.255 | Multicasting | N/A | N/A | N/A |
| Class E | 240.0.0.0 to 255.255.255.255 | Research | N/A | N/A | N/A |
- For Class A, the correct IP range is 1.0.0.0 to 126.0.0.0. The range you provided includes the loop-back address range, which is not part of the Class A range.
- For Class D and Class E, the IP ranges you provided are correct. However, they are not used for assigning IP addresses to hosts in regular networking. Class D is reserved for multicast addresses, and Class E is reserved for research purposes.
- The subnet mask for Class D and Class E is not applicable, as they are not used for host addressing.
- The number of networks and hosts per network for Class D and Class E are not applicable, as they are not used for regular network addressing.

- The IP range 127.0.0.1 to 127.255.255.255 is reserved for loop-back addresses. These addresses are used for testing network functionality on an individual device and cannot be assigned to a device in a network.
- Automatic Private IP Addressing (APIPA) is a feature in Microsoft Windows that allows a computer to automatically assign itself an IP address within the range of 169.254.0.0 to 169.254.255.255 if a DHCP server is not available on the network.