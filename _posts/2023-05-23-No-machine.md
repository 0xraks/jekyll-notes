---
title: No-machine Install script
author: Rakshith
date: 2023-05-23 00:15:31 +0530
categories: [tech]
tags: []
image:
  path: "/static/covers/NoMachine-Logo.png"
  alt: "Easy no-machine setup guide"
  caption: 
  relative: true
---


## What is No Machine?

Simple script that helps you setup remote desktop access on any device.
No machine supports drag and drop, sound pass through. mDNS based discovery of devices in local network and many more !

## Installation script
* You can copy past the below script into a terminal.

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
<details>
  <summary>Click me</summary>
    
</details>


# CS361: Systems Programming - Virtual Memory

## Introduction
- In this video, we will discuss the concepts and motivations behind virtual memory.
- Virtual memory is essential for efficient utilization of computer resources and can be applied to everyday challenges in software engineering.

## Background: Old Computers
- Old computers operated at low speeds (in the range of kilohertz) and had slow disk access.
- The cost of computers in the 1960s was extremely high, making it crucial to maximize their usage.
- The challenge was to prevent the CPU from idling while waiting for slow disk operations.

## The Problem of Memory Access
- Unlike registers, memory access involves dealing with a large amount of data.
- Moving data between memory and peripherals (e.g., hard drives) is slow and inefficient.
- Swapping entire programs between memory and disk is not a viable solution due to its slowness and frequency of use.

## Challenges of Multiplexing Memory
- Different programs may require simultaneous access to memory.
- Two potential solutions:
  1. Swapping memory between main memory and disk is slow.
  2. Allowing programs to use different areas of memory would compromise isolation and coordination between programs.

## The Fundamental Theorem of Software Engineering
- Virtual memory introduces a layer of indirection to address the memory multiplexing challenge.
- It allows individual programs to have their own virtual memory addresses, independent of the actual physical memory location.
- Virtual memory provides beneficial properties while maintaining the structure of memory access.

## Virtual Memory Implementation
- Modern machines utilize a memory management unit (MMU) for address translation.
- Each process has its own mapping between virtual and physical memory addresses.
- The MMU translates virtual addresses to the corresponding physical memory locations.
- The use of page tables enables mapping memory in smaller chunks rather than swapping entire programs.

## Challenges of Virtual Memory
- Keeping the page tables small is important to efficiently swap memory chunks.
- Ensuring fast performance is crucial to minimize overhead.
- The layer of indirection introduces additional complexity but also allows for various optimization techniques.

| Part of ELF File         | Description                                      |
|--------------------------|--------------------------------------------------|
| ELF Header               | Contains general information about the file       |
| Program Header Table     | Describes the program segments                    |
| Section Header Table     | Describes the sections                            |
| Section 1                | Section containing program instructions           |
| Section 2                | Section containing data                           |
| Section 3                | Section containing symbol table                   |
| Section 4                | Section containing string table                   |
| Section 5                | Section containing relocation information         |
| Section 6                | Section containing dynamic linking information    |
| Section 7                | Section containing notes                          |
| Section 8                | Section containing uninitialized data             |
| Section 9                | Section containing dynamic symbol table           |




