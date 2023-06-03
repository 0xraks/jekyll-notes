---
layout: post
comments: true
date: 2023-06-03
title: "Wireshark CheatSheet" 
tags:
  - wifi
  - networking
  - wireshark
 
categories:
  - software

---
undefined<details>
  <summary>What are Wireshark Display Macros?</summary>


Display Filter Macros are a mechanism to create shortcuts for complex filters. For example, defining a display filter macro named _tcp_conv_ whose text is


```text
(ip.src == $1 and ip.dst == $2 and tcp.srcport == $3 and tcp.dstport == $4)
or (ip.src == $2 and ip.dst == $1 and tcp.srcport == $4 and tcp.dstport == $3)
```


would allow to use a display filter like


```text
${tcp_conv:10.1.1.2;10.1.1.3;1200;1400}
```


instead of typing the whole filter.


Display Filter Macros can be managed with a user table, as described in [Section 11.7, “User Table”](https://www.wireshark.org/docs/wsug_html_chunked/ChUserTable.html), by selecting Analyze → Display Filter Macros from the menu. The User Table has the following fields:


**Name** The name of the macro.


**Text** The replacement text for the macro it uses $1, $2, $3, … as the input arguments.



  </details>
```c
(wlan.addr == $1 && wlan.addr == $2) || (wlan.addr == $2 && wlan.addr == $1 && wlan.type.eq(0) && wlan.fc.type_subtype == 0x1D)
```


```c
&& (!(wlan.fc.type_subtype == 4 || wlan.fc.type_subtype == 5 || wlan.fc.type_subtype == 8 ))
```


---


| wlan.fc.type == 0          | all management frames 
 |
| -------------------------- | ----------------------- |
| wlan.fc.type_subtype == 0  | association requests    |
| wlan.fc.type_subtype == 1  | association response    |
| wlan.fc.type_subtype == 2  | re-association request  |
| wlan.fc.type_subtype == 3  | re-association response |
| wlan.fc.type_subtype == 4  | probe requests          |
| wlan.fc.type_subtype == 5  | probe responses         |
| wlan.fc.type_subtype == 8  | beacons                 |
| wlan.fc.type_subtype == 9  | atims                   |
| wlan.fc.type_subtype == 10 | disassosiations         |
| wlan.fc.type_subtype == 11 | authentications         |
| wlan.fc.type_subtype == 12 | deauthentications       |
| wlan.fc.type_subtype == 13 | actions                 |

undefined
| wlan.fc.type == 0          | all management frames 
 |
| -------------------------- | ----------------------- |
| wlan.fc.type_subtype == 0  | association requests    |
| wlan.fc.type_subtype == 1  | association response    |
| wlan.fc.type_subtype == 2  | re-association request  |
| wlan.fc.type_subtype == 3  | re-association response |
| wlan.fc.type_subtype == 4  | probe requests          |
| wlan.fc.type_subtype == 5  | probe responses         |
| wlan.fc.type_subtype == 8  | beacons                 |
| wlan.fc.type_subtype == 9  | atims                   |
| wlan.fc.type_subtype == 10 | disassosiations         |
| wlan.fc.type_subtype == 11 | authentications         |
| wlan.fc.type_subtype == 12 | deauthentications       |
| wlan.fc.type_subtype == 13 | actions                 |

undefined
| wlan.fc.type == 1          | all control frames |
| -------------------------- | ------------------ |
| wlan.fc.type_subtype == 24 | block ack requests |
| wlan.fc.type_subtype == 25 | block ack          |
| wlan.fc.type_subtype == 26 | ps-polls           |
| wlan.fc.type_subtype == 27 | rts                |
| wlan.fc.type_subtype == 28 | cts                |
| wlan.fc.type_subtype == 29 | acks               |
| wlan.fc.type_subtype == 30 | cf-ends            |
| wlan.fc.type_subtype == 31 | cf-ends/cf-acks    |

undefined
| wlan.fc.type == 2          | all data frames            |
| -------------------------- | -------------------------- |
| wlan.fc.type_subtype == 32 | data frames                |
| wlan.fc.type_subtype == 33 | data+cf-ack                |
| wlan.fc.type_subtype == 34 | data+cf-poll               |
| wlan.fc.type_subtype == 35 | data+cf-ack + cf-ack       |
| wlan.fc.type_subtype == 36 | null data                  |
| wlan.fc.type_subtype == 37 | cf-ack                     |
| wlan.fc.type_subtype == 38 | cf-poll                    |
| wlan.fc.type_subtype == 39 | cf-ack + cf-poll           |
| wlan.fc.type_subtype == 40 | qos data                   |
| wlan.fc.type_subtype == 41 | qos data + cf-ack          |
| wlan.fc.type_subtype == 42 | qos data + cf-poll         |
| wlan.fc.type_subtype == 43 | qos data + cf-ack+ cf-poll |
| wlan.fc.type_subtype == 44 | qos null                   |
| wlan.fc.type_subtype == 46 | qos cf-poll                |
| wlan.fc.type_subtype == 47 | qos cf-ack + cf-poll       |

undefined
---


| wlan.fc.retry ==1                       | retry frames                  |
| --------------------------------------- | ----------------------------- |
| wlan.fc.retry ==1 && wlan.fc.tods ==1   | towards ap                    |
| wlan.fc.retry ==1 && wlan.fc.fromds ==1 | from ap towards client device |

undefined
| wlan.fixed.action_code==7 | BSS Transition (Steering) |
| ------------------------- | ------------------------- |
| wlan.fixed.action_code==8 | BSS Transition (Steering) |

undefined
| wlan_radio.signal_dbm < -67                                 | weak signal filter |
| ----------------------------------------------------------- | ------------------ |
| wlan.fc.type_subtype == 0x05 && wlan_radio.signal_dbm < -75 | weak prob response |
| wlan.fc.type_subtype == 0x04 && wlan_radio.signal_dbm < -75 | weak prob requests |

undefined
**Display Filters related Weak signals:**


**Some Extras:**


| wlan.addr == mac address     | specific client by mac address |
| ---------------------------- | ------------------------------ |
| wlan.ta == mac address       | transmitter address            |
| wlan.ra == mac address       | receive address                |
| wlan.sa == mac address       | source address                 |
| wlan.da == mac address       | destination address            |
| wlan.bssid == ap mac address | radio mac address              |
| wlan.mgt.ssid == “your-ssid” | filter by ssid                 |

undefined
| wlan.fc.retry ==1                       | retry frames                  |
| --------------------------------------- | ----------------------------- |
| wlan.fc.retry ==1 && wlan.fc.tods ==1   | towards ap                    |
| wlan.fc.retry ==1 && wlan.fc.fromds ==1 | from ap towards client device |

undefined
| wlan.fixed.action_code==7 | BSS Transition (Steering) |
| ------------------------- | ------------------------- |
| wlan.fixed.action_code==8 | BSS Transition (Steering) |

undefined
| wlan_radio.signal_dbm < -67                                 | weak signal filter |
| ----------------------------------------------------------- | ------------------ |
| wlan.fc.type_subtype == 0x05 && wlan_radio.signal_dbm < -75 | weak prob response |
| wlan.fc.type_subtype == 0x04 && wlan_radio.signal_dbm < -75 | weak prob requests |

undefined
**Display Filters related Weak signals:**


**Some Extras:**


| wlan.addr == mac address     | specific client by mac address |
| ---------------------------- | ------------------------------ |
| wlan.ta == mac address       | transmitter address            |
| wlan.ra == mac address       | receive address                |
| wlan.sa == mac address       | source address                 |
| wlan.da == mac address       | destination address            |
| wlan.bssid == ap mac address | radio mac address              |
| wlan.mgt.ssid == “your-ssid” | filter by ssid                 |

undefined
| wlan.fixed.action_code ==23                        | 802.11v dms request             |
| -------------------------------------------------- | ------------------------------- |
| wlan.fixed.action_code ==24                        | 802.11v dms respose             |
| wlan.fixed.action_code == 4                        | 802.11k neighbour request       |
| wlan.fixed.action_code == 5                        | 802.11k neighbour response      |
| (wlan.fc.type_subtype==0)&&(wlan.rsn.akms.type==3) | 802.11r auth request            |
| (wlan.fc.type_subtype==1)&&(wlan.tag.number==55)   | 802.11r auth response           |
| (wlan.fc.type_subtype==2)&&(wlan.tag.number==55)   | 802.11r re-association request  |
| (wlan.fc.type_subtype==3)&&(wlan.tag.number==55)   | 802.11r re-association response |

undefined