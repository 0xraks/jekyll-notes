---
layout: post
comments: true
date: 2023-06-15
title: "New VM - Container SSH script" 
tags:
  - networking
 
categories:
  - software

---

```bash
sudo apt-get update
sudo apt-get install openssh-server -y

# Configure SSH options
sudo sed -i 's/#ClientAliveInterval 0/ClientAliveInterval 600/' /etc/ssh/sshd_config
sudo sed -i 's/#ClientAliveCountMax 3/ClientAliveCountMax 3/' /etc/ssh/sshd_config
sudo sed -i 's/#PermitRootLogin yes/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config

# Your public keys
keys="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDUd55+PJVVPThXEoYBkmpYNs+l/wubKXPgnQe5WutboHArmecfZjfcdQGSBvLczWL7KVo0Gp0e664rmsAUCGI925o5BgEbC8c71Q/jZBxzatsfRqqE7xWHc0jkOEi8nIiWV2abtyZ05doe89qtppAAS3x9tXhixCzSE+9KXMv6C0b8xLin7kLlnJvP5sUrh1wjfKwDjufWBXX9DDNqUzltUzRInfpnCWScH+6FOgaMR5e+0xIkTpcACwfGRRoxMPauWjpNHQJbRQF02yYA6UEjH23Q7gnpbBvse1uAGwKEmPwtUu576/pTsmi5pGquH8F6/GM2QJldwrVaUhne01YYkUlIbON8luhIp0fnsoCNtqvKHzsejA2M83LMZMMDXTJI7PdXpBP6KdmwGuMvW8duLbi6qIixS37GpA98ZppJ9h3YcfVq3eY8oPwIHdt4/nDSuBd1DGqQNqGLGA4hm9potTWTFS/5VUEybLvUVyi5ZRyasyi9S9a4qB6dyx0kghM=
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3NOoulZ0zfS4bcKptRHYpt51E5p32XIhCxKuYp0CDkRbqAhF2EhQRHKGNvNO3Q5a9dorqdE6/+/LxvE8p9cT9GRLtP/P74Mx0C++9Oxe834sk6kJ5jcHhu1kJKQtSh4IEfcoEZxEwFnUqv+WpvRY+OB19KBsNnsCVT3tsPggFbPh874nAnh6Y1TM0FKsCfoJsrNt+Nep+MRtMZdMIzezgO0RpAgqOntXnpZqwyYB3p57Trq1kzG/A70OE2ObEXw2+sudmlRKVnxKm5FeHpZ2I2SOVgk7f0tz93zNuYbnTbmWoABgZewlbtatu1onq7NpAxHDbf5uJkh5XIHGKzaHj
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDC1BJhT/6VMUo6xTfsh4p2IGWPOBuDG6b2R57e/vu2gCO7InDEjbk3lNYfheY1tiM0xWUislvXphLtZZCAQPsKnzJeEw6jDY1tDLO2KXi7idSdXUeABnE2GlvOIRF/VGfPju23s/NjqyhDEjbBZvsc8cID7/pH5vv61xdwxb/dxRgDNIcl/rfv7UsjIO5+B5DtO6EISnSrsOtXUDq2HUMXl6dPk+hleWTK9zbfO33Dn2+DOTkgUZLQcm4vTNEQhDR+61mePl2YKUclqg9wK0FxFtxnjEVDNhE2BiTYCHuBxESXe5SYsoe9UJK7RWEReWSDeRxrhz3x8P71t9ZoNSoT
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDd2FcjfhPWSm9qiTXELL5gfuaJrGK0AjTYm0zR/SRGFJRGXpgMkmV4xBlxksX6tBOMFX//TC+NEXjctNHxxBgakpvm/cMBY6atZrHxz1UJlzB2Hvz6YIm6e+fIZbfOPOAlkWQtfxvcFmQsRDvP6YysYYUh9tPAYnnLbluLY4uPXL3KkntBE0HV8M7v4Pt09ULW6kQuTF8QxbJSbvRx18z6fO9WpHSMvcydwY8xYFFrHE7al84JKe3sC/GwuDcdgWDcGAd5ka6EplpRSxPUICXTAL0boBRrCVt3SZG9kp/TPUbsUE+sdYwy/YMDTwjLD0ZLJAZAfOCD69Ajd1kNay0LCHxcefrRIO8iKi2897YpoTDs7mdJP3DY+pssLiK1HxnhLrGZZZqyb0vmDCjZaySKl6AZTYRzkFcRMX/5eanQtbchkiif4gBhTMz1XLbe4p6GnsfMCe8/wmeT/bHxkFbdYeoQdXuXjMhK31YeFk+NzdtZHCIe/rct+R5S3CTIBVk= "

mkdir ~/.ssh
touch ~/.ssh/authorized_keys
# Add your public keys to authorized_keys
echo "$keys" | sudo tee -a /root/.ssh/authorized_keys

# Set permissions and ownership for authorized_keys
sudo chmod 600 /root/.ssh/authorized_keys
sudo chown root:root /root/.ssh/authorized_keys

# Disable login message
sudo chmod -x /etc/update-motd.d/*
touch ~/.bashrc
theme = "export PS1="\[\e[31m\][\[\e[m\]\[\e[38;5;172m\]\u\[\e[m\]@\[\e[38;5;153m\]\h\[\e[m\] \[\e[38;5;214m\]\W\[\e[m\]\[\e[31m\]]\[\e[m\]\$ "
echo "$theme" | sudo tee -a ~/.bashrc

# Restart SSH service
sudo service ssh restart
```

