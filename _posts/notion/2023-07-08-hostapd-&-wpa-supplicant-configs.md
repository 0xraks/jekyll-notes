---
layout: post
comments: true
date: 2023-07-08
title: "Hostapd & WPA Supplicant configs" 
tags:
  - wifi
  - networking
 
categories:
  - software

pin: false
---

## Basic WPA sup


```bash
# Basic wpa_supplicant 
country=us
update_config=1
ctrl_interface=/var/run/wpa_supplicant

network={
 scan_ssid=1
 ssid="MyNetworkSSID"
 psk="Pa55w0rd1234"
}
```


## WPA3R3 ONLY STA


```bash
#WPA3R3 ONLY STA
country=us
update_config=1
ctrl_interface=/var/run/wpa_supplicant
sae_pwe=2

network={
	key_mgmt=SAE
	scan_ssid=1
	ssid="WPA3R3"
	psk="12345678"
	ieee80211w=2
}
```


## WPA3R3 ONLY 5G AP


```bash
#WPA3R3 ONLY 5G AP
interface=wlan0
driver=nl80211
ctrl_interface=/var/run/hostapd
ssid=WPA3R3
hw_mode=a
channel=36/80
ignore_broadcast_ssid=0
wmm_enabled=1
ieee80211ac=1
vht_oper_chwidth=1
vht_oper_centr_freq_seg0_idx=42
ht_capab=[SHORT-GI-20][SHORT-GI-40][HT40+]
vht_capab=[SHORT-GI-80]
wpa=2
auth_algs=1
wpa_key_mgmt=SAE
rsn_pairwise=CCMP
ieee80211w=1
sae_password=12345678
sae_pwe=2
wpa=2
```


## WPA2 SHA256 ONLY STA


```bash
# WPA2 SHA256 ONLY STA
country=us
update_config=1
ctrl_interface=/var/run/wpa_supplicant

network={
 key_mgmt=WPA-PSK-SHA256
 scan_ssid=1
 ssid="SHA256"
 psk="12345678"
 ieee80211w=1
}
```


## WPA2 SHA256 ONLY AP 2G


```bash
# WPA2 SHA256 ONLY AP 2G
country_code=US
interface=wlan0
ssid=SHA256
hw_mode=g
ieee80211n=1
ieee80211d=1
ieee80211w=2
channel=6
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
beacon_int=15
wpa_passphrase=12345678
wpa_key_mgmt=WPA-PSK-SHA256
wpa_pairwise=TKIP
rsn_pairwise=CCMP
```


## WPA3 WPA2 Dual 5G AP


```bash
interface=wlan0
driver=nl80211
ctrl_interface=/var/run/hostapd
beacon_int=100
dtim_period=2
ssid=WPA3_DUALSTA_AP
hw_mode=a
channel=36/80
ignore_broadcast_ssid=0
wmm_enabled=1
ieee80211ac=1
vht_oper_chwidth=1
vht_oper_centr_freq_seg0_idx=42
ht_capab=[SHORT-GI-20][SHORT-GI-40][HT40+]
vht_capab=[SHORT-GI-80]
wpa=2
auth_algs=1
wpa_key_mgmt=SAE WPA-PSK
rsn_pairwise=CCMP
ieee80211w=2
sae_password=12345678
wpa_group_rekey=86400
sae_pwe=2
wpa=2
wpa_passphrase=passwd
```

