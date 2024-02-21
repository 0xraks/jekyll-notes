---
layout: post
comments: true
date: 2024-02-20
title: "Openstack Installation on Ubuntu 22.04" 
tags:
  - linux
 
categories:
  - tech

pin: false
---

Script to install a basic Openstack instance.


```bash
#!/bin/bash

# Update package list
sudo apt update

# Install git
sudo apt install git -y

# Create user 'stack' with specified home directory and shell
sudo useradd -s /bin/bash -d /opt/stack -m stack

# Grant execute permission to /opt/stack
sudo chmod +x /opt/stack

# Allow 'stack' user to execute sudo commands without password prompt
echo "stack ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/stack

# Switch to 'stack' user
sudo -u stack -i << EOF

# Clone devstack repository
git clone https://git.openstack.org/openstack-dev/devstack
cd devstack
    
# Create and edit local.conf file
cat << EOF2 > local.conf
[[local|localrc]]
ADMIN_PASSWORD=secret
DATABASE_PASSWORD=\$ADMIN_PASSWORD
RABBIT_PASSWORD=\$ADMIN_PASSWORD
SERVICE_PASSWORD=\$ADMIN_PASSWORD
EOF2

# Save and exit editor
exit
EOF

# Change directory to devstack
cd /opt/stack/devstack

# Run stack.sh script
./stack.sh
```

