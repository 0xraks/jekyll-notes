---
layout: post
comments: true
date: 2024-01-11
title: "Top Half and Bottom Half in Linux" 
tags:
  - system-software
 
categories:
  - software

---

## Top Half and Bottom Half in Linux


In the context of Linux, the term "bottom half" refers to a concept in the Linux kernel that is related to handling asynchronous events and interrupt processing. The Linux kernel uses a mechanism called the "Softirq" and "Tasklet" subsystems to manage and process interrupts efficiently.


When an interrupt occurs in the system, the kernel acknowledges it and quickly handles the time-sensitive part of the interrupt in the "top half." The top half typically performs minimal processing and schedules the bottom half to handle the remaining tasks in a deferred manner.


The bottom half is also known as the "deferred work" or "deferred processing." It executes at a later time when the system is in a safe state to perform additional processing. The bottom half can be scheduled to run on a specific CPU core or in a generic manner across all cores.


The bottom half mechanism is used for various purposes in the Linux kernel, such as network packet processing, disk I/O, timer callbacks, and other asynchronous events. By deferring non-essential processing to the bottom half, the kernel can handle interrupts more efficiently, minimize latency, and improve overall system responsiveness.


It's worth noting that the concept of bottom halves is specific to the Linux kernel and may not be applicable or have the same terminology in other operating systems or environments.


> 💡 [https://developer.ibm.com/tutorials/l-tasklets/](https://developer.ibm.com/tutorials/l-tasklets/)


## Tasklets and Workqueues


Top Half - Minimal Work - Done in interrupt context


Bottom Half - Work done outside interrupt conetext, done by kernel context


The goal is to defer non time sensitive work.


Tasklets are built on top of softirqs to allow dynamic creation of deferrable functions


Work queues permit work to be deferred outside of the interrupt context into the kernel process context.


Thus, softirqs are reentrant functions and must explicitly protect their data structures with spin locks


## 4 Kinds of operations can be performed on deferrable functions

1. Initialization - Done when kernel inits or Module is loaded.
2. Activation - Deferrable function is marked as pending. So kernel knows next time that this function needs to be run.
3. Masking - Masked function are not executed even if activated.
4. Execution. - Activated deferred functions are run.

Activation and execution are bound together: a deferrable function that has been activated by a given CPU must be executed on the same CPU. There is no self-evident reason suggesting that this rule is beneficial for system performance. Binding the deferrable function to the activating CPU could in theory make better use of the CPU hardware cache. After all, it is conceivable that the activating kernel thread accesses some data structures that will also be used by the deferrable function. However, the relevant lines could easily be no longer in the cache when the deferrable function is run because its execution can be delayed a long time. Moreover, binding a function to a CPU is always a potentially “dangerous” operation, because one CPU might end up very busy while the others are mostly idle.


> A function is said to be reentrant if there is a provision to interrupt the function in the course of execution, service the interrupt service routine and then resume the earlier going on function, without hampering its earlier course of action. Reentrant functions are used in applications like hardware interrupt handling, recursion, etc.


### Requirements for function to be re-entrant

- Do not use static or global variables in your function since those may be changed by time your function resumes
- Function must not modify its own code (e.g. some low level graphic routines may have "habit" to generate itself). It may not modify itself without synchronization.
- It does not call non-reentrant functions.
- It does not use the hardware in a non-atomic way.

### When to use re-entrant functions?

- Interrupt code
- Functions that will be called from multiple threads/tasks must be re-entrant.

```c
// Both foo1() and foo2() are reentrant functions
int foo1(int i)
{
    return i * 5;
}
int foo2(int i)
{
    return foo1(i) * 5;
}
```


```c
int data = 10;
int fun1()
{
    data += 2;
    return data;
}
int fun2()
{
    return fun1() + 2;
}
```


> [https://www.ibm.com/docs/en/aix/7.2?topic=programming-writing-reentrant-threadsafe-code](https://www.ibm.com/docs/en/aix/7.2?topic=programming-writing-reentrant-threadsafe-code)


Table 5-2. Various types of synchronization techniques used by the kernel


| **Technique**             | **Description**                                             | **Scope**             |
| ------------------------- | ----------------------------------------------------------- | --------------------- |
| Per-CPU variables         | Duplicate a data structure among the CPUs                   | All CPUs              |
| Atomic operation          | Atomic read-modify-write instruction to a counter           | All CPUs              |
| Memory barrier            | Avoid instruction reordering                                | Local CPU or All CPUs |
| Spin lock                 | Lock with busy wait                                         | All CPUs              |
| Semaphore                 | Lock with blocking wait (sleep)                             | All CPUs              |
| Seqlocks                  | Lock based on an access counter                             | All CPUs              |
| Local interrupt disabling | Forbid interrupt handling on a single CPU                   | Local CPU             |
| Local softirq disabling   | Forbid deferrable function handling on a single CPU         | Local CPU             |
| Read-copy-update (RCU)    | Lock-free access to shared data structures through pointers | All CPUs              |

undefined
### 

