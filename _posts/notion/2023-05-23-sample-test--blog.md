
# Static Linking and Dynamic Linking in Linux


## Introduction


When it comes to building and running software applications in Linux, understanding the concepts of static linking and dynamic linking is essential. These techniques determine how the various components of an application are connected and loaded during runtime. In this article, we will delve into the concepts of static linking and dynamic linking, discuss their differences, and explore their significance in Linux development.


## Static Linking


Static linking involves combining all the necessary libraries and dependencies into the executable binary during the compilation process. In other words, the required libraries are incorporated directly into the application itself. When the application is executed, it does not rely on external libraries, making it self-contained.


The benefits of static linking include:

1. **Portability**: Since all the required libraries are bundled with the executable, the application can be run on any system with a compatible architecture without worrying about missing dependencies.
2. **Simplicity**: Static linking simplifies the deployment process as there is no need to distribute or manage separate library files.

However, static linking has its drawbacks:

1. **Increased File Size**: Since the libraries are included in the executable, the resulting binary file can be larger in size, which may impact storage and network transfer.
2. **Limited Flexibility**: If there are updates or patches to the libraries, the entire application needs to be recompiled and redistributed.

## Dynamic Linking


Dynamic linking, on the other hand, allows multiple applications to share a single instance of a library at runtime. Instead of including the libraries within the executable, the application only contains references to the external libraries it depends on. The operating system loads the required libraries during runtime.


The advantages of dynamic linking are:

1. **Reduced File Size**: Since the libraries are shared among multiple applications, the executable size is smaller compared to static linking.
2. **Flexibility**: Updates or patches to a shared library can be applied without recompiling and redistributing the entire application.

However, dynamic linking also has some considerations:

1. **Dependency Management**: It is essential to ensure that the required libraries are present on the system and accessible to the application during runtime.
2. **Version Compatibility**: Different versions of shared libraries may have different APIs, which could introduce compatibility issues.

## Setting the Environment: `PKG_CONFIG_PATH` and `LD_LIBRARY_PATH`


To properly handle dynamic linking, Linux provides two environment variables: `PKG_CONFIG_PATH` and `LD_LIBRARY_PATH`.


### PKG_CONFIG_PATH


The `PKG_CONFIG_PATH` environment variable specifies the directories where `pkg-config` searches for the metadata files required to compile and link against libraries. These metadata files contain information about the library's version, compiler flags, and linker options.


To set the `PKG_CONFIG_PATH` variable, use the following command:


```text
export PKG_CONFIG_PATH=/path/to/pkg-config/files
```


![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ba317ff3-3792-4894-9fe1-21276c78bf7e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230528%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230528T153510Z&X-Amz-Expires=3600&X-Amz-Signature=10b456e10deac63890581c39a5868c088e24d633534309f69cd613e6d2200094&X-Amz-SignedHeaders=host&x-id=GetObject)

