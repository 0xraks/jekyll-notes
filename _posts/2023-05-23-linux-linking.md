---
title: linux-linking
author: Rakshith
date: 2023-05-23 19:33:33 +0530
categories: []
tags: []
---

It is Provided by module partners to the customers. Murata for example have it on their github

- [https://github.com/murata-wireless/cyw-fmac-utils-imx32](https://github.com/murata-wireless/cyw-fmac-utils-imx32)[https://github.com/murata-wireless/cyw-fmac-utils-imx64](https://github.com/murata-wireless/cyw-fmac-utils-imx64)
- [https://github.com/murata-wireless/cyw-fmac-utils-imx32](https://github.com/murata-wireless/cyw-fmac-utils-imx32)[https://github.com/murata-wireless/cyw-fmac-utils-imx](https://github.com/murata-wireless/cyw-fmac-utils-imx64)32

Our Internal Link :
[http://iot-webserver.aus.cypress.com/gpfs/iot/projects/wlancore/fmac/tools/](http://iot-webserver.aus.cypress.com/gpfs/iot/projects/wlancore/fmac/tools/)

Compiled WL tool is also present in the mfg-fw package release.

Command Compile errors reference:**  [https://cysemi.my.salesforce.com/5001P000014lR4U?srPos=4&srKp=500](https://cysemi.my.salesforce.com/5001P000014lR4U?srPos=4&srKp=500)

### Building with yocto poky toolchains

[Yocto Linux ](https://www.notion.so/Yocto-Linux-b1cd018e3e7a4d59bca8ce32044b9864)

[Index of /releases/yocto/](http://downloads.yoctoproject.org/releases/yocto/)

Toolchains can be downloaded using above guide. After downloading the .sh, install is by running 'sudo ./name-toolchain.sh'

```bash
source /opt/fsl-imx-x11/4.1.15-2.0.0/environment-setup-cortexa7hf-neon-poky-linux-gnueabi
make clean; rm -rf obj; rm wlarm_le
make TARGETARCH=arm_le NL80211=1 APPLY_PREFIX=false -j16
make TARGETARCH=arm64_android APPLY_PREFIX=false -j16
```

### For Cross Compile

```bash
sudo apt-get install -y libc6-armel-cross libnl-genl-3-dev pkg-config libc6-dev-armel-cross binutils-arm-linux-gnueabi libncurses5-dev gcc-arm-linux-gnueabi u-boot-tools lzop
make CC=arm-linux-gnueabi-gcc TARGETARCH=arm NL80211=1 APPLY_PREFIX=false -j16
```

### Raspberry Pi 3B+/4B Native build

Commands to Native compile WL tool on the RPI:

- Copy wl source into RPi with SCP or any other method you are familiar with
- Extract the tar ball

```bash
tar -xf wlexe_nl80211_1_28.tar.gz
sudo apt-get update
sudo apt-get install -y build-essential libnl-genl-3-dev flex bison pkg-config
cd src/wl/exe
make TARGETARCH=arm_le NL80211=1 APPLY_PREFIX=false -j8
sudo ./wlarm_le
```

## In case of dynamic linking for fmac only!

```bash
cd /usr/lib 
sudo ln -s libnl-3.so libnl.so
sudo ln -s libnl-genl-3.so libnl-genl.so 
cd /usr/include 
sudo ln -s libnl3/netlink netlink
```

This is done so that the wl tool can find the shared libnl libraries.

For a dynamically linked executable, the ldd(list dynamic executables can be used to check if all the dependencies are met on the system). Note that ldd does not work for a cross-compiled binary. It needs to be run on the target machine only. For the host on which the binary was cross-compiled, the 'readelf -d wl' can be used instead. Ref:

[ldd doesn't work on dynamically linked binary](https://stackoverflow.com/questions/16807560/ldd-doesnt-work-on-dynamically-linked-binary)

make -C src/include
make -C src/tools/epictrl
make -C src/wl/exe -f GNUmakefile.wlu_dll BCM_MFGTEST=1

> PKG_CONFIG_PATH - Link time - To directory with .pc files
> 

> LD_LIBRARY_PATH - Run time -  To lib directory
>