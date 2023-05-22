---
title: "Setting up Nomachine"
date: 2023-04-03T23:15:00+07:00
slug: Setting up Nomachine
category: remote
summary:
description: 
cover:
  image: "covers/NoMachine-Logo.png"
  alt: "Nomachine"
  caption: 
  relative: true
showtoc: true
draft: false
---

# What is No Machine?

Simple script that helps you setup remote desktop access on any device.
No machine supports drag and drop, sound pass through. mDNS based discovery of devices in local network and many more !


```bash
#!/bin/bash

# Determine the architecture of the host
HOST_ARCH=$(uname -m)

# Set the download URL based on the host architecture
if [[ "$HOST_ARCH" == "armv7l" ]]; then
    DOWNLOAD_URL="https://download.nomachine.com/download/8.4/Arm/nomachine_8.4.2_1_armhf.deb"
elif [[ "$HOST_ARCH" == "aarch64" ]]; then
    DOWNLOAD_URL="https://download.nomachine.com/download/8.4/Arm/nomachine_8.4.2_1_arm64.deb"
elif [[ "$HOST_ARCH" == "x86_64" ]]; then
    DOWNLOAD_URL="https://download.nomachine.com/download/8.4/Linux/nomachine_8.4.2_1_amd64.deb"
else
    echo "Unsupported host architecture: $HOST_ARCH"
    exit 1
fi

# Download the NoMachine deb package for the host
wget "$DOWNLOAD_URL" -O nomachine.deb

# Install the NoMachine deb package
sudo dpkg -i nomachine.deb

# Remove the NoMachine deb package after installation
rm nomachine.deb


```

## Setup a display if it doesn't exist

```bash
#!/bin/bash

# Navigate to the directory containing the xorg.conf file
cd /etc/X11/

# Define the configuration to add
CONFIG='
Section "Screen"
Identifier "Default Screen"
Monitor "Configured Monitor"
Device "Tegra0”
SubSection "Display"
Depth 24
Virtual 1920 1080  # Modify the resolution by editing these values
EndSubSection
EndSection
'

# Add the configuration to the xorg.conf file
echo "$CONFIG" | sudo tee -a xorg.conf > /dev/null

```

{{< collapse summary="What is SPF?" >}}
Your content goes here. You can use **Markdown** or <strong>HTML</strong> inside the collapsible section.
{{< /collapse >}}

