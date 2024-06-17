---
layout: post
comments: true
date: 2024-06-01
title: "System Design C Linux Problems" 
tags:
  - system-software
 
categories:
  - interview

pin: true
---

> 💡 Design an event handling system which can handle 20 events; there are 10 modules in the system which would like to listen to these events. Each module must register a callback function pointer for the event it is interested in. Also, it must provide its “context” during the registration of the callback. When an event occurs the event system would call the callback handler registered by the module and pass it the event/context which was registered.  
>   
> 1. Define Data structure required for storing the state required by the event handling system  
> 2. Write the “register_event_handler” API which will be used by the modules to register the callback along with the context. It should ensure it takes all the information from modules that are essential for making the callback.  
> 3. Write the “event_dispatch” function which will basically call the callbacks registered for each event.


To solve the problem of designing an event handling system, we need to address the following points:

1. **Define Data Structure Required for Storing State**: We need to create a data structure to keep track of event handlers (callbacks) and their associated contexts.
2. **Write the** **`register_event_handler`** **API**: This function allows modules to register their callbacks and context for specific events.
3. **Write the** **`event_dispatch`** **Function**: This function will be called when an event occurs to trigger the appropriate callbacks.

Here's a step-by-step approach to designing the system:


### Step 1: Define Data Structure


We need a data structure that maps events to their registered callbacks and contexts. Each event can have multiple listeners, so we use a list to store them.


```c
#define MAX_EVENTS 20
#define MAX_MODULES 10

typedef void (*EventHandler)(void* context, int event);

typedef struct {
    EventHandler callback;
    void* context;
} EventListener;

typedef struct {
    int event_id;
    EventListener listeners[MAX_MODULES];
    int listener_count;
} Event;

Event event_table[MAX_EVENTS];

```


### Step 2: Implement `register_event_handler` API


This function registers a callback and its context for a specified event.


```c
#include <stdio.h>
#include <string.h>

// Initialize the event table
void init_event_system() {
    for (int i = 0; i < MAX_EVENTS; ++i) {
        event_table[i].event_id = i;
        event_table[i].listener_count = 0;
    }
}

int register_event_handler(int event_id, EventHandler handler, void* context) {
    if (event_id < 0 || event_id >= MAX_EVENTS) {
        return -1;  // Invalid event ID
    }

    Event* event = &event_table[event_id];
    if (event->listener_count >= MAX_MODULES) {
        return -2;  // Too many listeners
    }

    event->listeners[event->listener_count].callback = handler;
    event->listeners[event->listener_count].context = context;
    event->listener_count++;

    return 0;  // Success
}

```


### Step 3: Implement `event_dispatch` Function


This function will dispatch the event to all registered listeners for a given event.


```c
void event_dispatch(int event_id) {
    if (event_id < 0 || event_id >= MAX_EVENTS) {
        return;  // Invalid event ID
    }

    Event* event = &event_table[event_id];
    for (int i = 0; i < event->listener_count; ++i) {
        event->listeners[i].callback(event->listeners[i].context, event_id);
    }
}

```


### Pros and Cons


**Pros:**

1. **Simplicity**: The system is straightforward and easy to understand.
2. **Efficiency**: Direct array indexing is efficient for event lookup and callback invocation.
3. **Fixed Memory Usage**: The maximum memory usage is known at compile-time.

**Cons:**

1. **Scalability**: Fixed-size arrays for events and listeners limit the scalability of the system.
2. **Flexibility**: Changing the number of events or modules requires recompilation.
3. **Error Handling**: The current implementation has limited error handling and may not gracefully handle edge cases such as duplicate registrations or unregistration.

### Alternative Approaches

1. **Dynamic Allocation**:
	- **Pros**: More flexible, can handle a dynamic number of events and listeners.
	- **Cons**: More complex memory management, potential for fragmentation and memory leaks.
2. **Linked Lists**:
	- **Pros**: Allows for dynamic and flexible handling of event listeners.
	- **Cons**: Increased complexity, slower traversal compared to array indexing.
3. **Hash Maps**:
	- **Pros**: Efficient event lookup, can handle a large number of events dynamically.
	- **Cons**: More complex to implement, higher memory overhead due to hash table structures.

### Example of an Alternative Approach Using Linked Lists


Here’s how you could use linked lists for more flexibility:


```c
#include <stdlib.h>

// Define a node for the linked list
typedef struct EventListenerNode {
    EventHandler callback;
    void* context;
    struct EventListenerNode* next;
} EventListenerNode;

typedef struct {
    int event_id;
    EventListenerNode* listeners;
} Event;

Event event_table[MAX_EVENTS];

// Initialize the event table
void init_event_system() {
    for (int i = 0; i < MAX_EVENTS; ++i) {
        event_table[i].event_id = i;
        event_table[i].listeners = NULL;
    }
}

int register_event_handler(int event_id, EventHandler handler, void* context) {
    if (event_id < 0 || event_id >= MAX_EVENTS) {
        return -1;  // Invalid event ID
    }

    Event* event = &event_table[event_id];
    EventListenerNode* new_node = (EventListenerNode*)malloc(sizeof(EventListenerNode));
    if (!new_node) {
        return -3;  // Memory allocation failed
    }

    new_node->callback = handler;
    new_node->context = context;
    new_node->next = event->listeners;
    event->listeners = new_node;

    return 0;  // Success
}

void event_dispatch(int event_id) {
    if (event_id < 0 || event_id >= MAX_EVENTS) {
        return;  // Invalid event ID
    }

    Event* event = &event_table[event_id];
    EventListenerNode* current = event->listeners;
    while (current) {
        current->callback(current->context, event_id);
        current = current->next;
    }
}

// Function to free the event table when done
void cleanup_event_system() {
    for (int i = 0; i < MAX_EVENTS; ++i) {
        EventListenerNode* current = event_table[i].listeners;
        while (current) {
            EventListenerNode* next = current->next;
            free(current);
            current = next;
        }
    }
}

```


## Event handling systems are a crucial component in many low-level software components, including operating systems and embedded systems. Here are some real-life examples:


### 1. **Linux Kernel: Interrupt Handling**


In the Linux kernel, event handling mechanisms are widely used for managing hardware interrupts. When a hardware interrupt occurs (e.g., a network packet arrives, a disk I/O completes), the kernel needs to handle this interrupt and notify the appropriate device driver.


**Data Structure:**

- The kernel uses structures like `irq_desc` to represent an interrupt and its associated handlers.

**API for Registration:**

- Functions like `request_irq` are used by device drivers to register an interrupt handler.

**Event Dispatch:**

- When an interrupt occurs, the kernel invokes the registered handler(s) associated with the interrupt line.

```c
#include <linux/interrupt.h>

static irqreturn_t my_interrupt_handler(int irq, void *dev_id) {
    // Handle the interrupt
    return IRQ_HANDLED;
}

static int __init my_module_init(void) {
    int irq = 17; // Example IRQ number
    request_irq(irq, my_interrupt_handler, 0, "my_device", NULL);
    return 0;
}

static void __exit my_module_exit(void) {
    int irq = 17;
    free_irq(irq, NULL);
}

module_init(my_module_init);
module_exit(my_module_exit);

```


### 2. **Embedded Systems: Real-Time Operating Systems (RTOS) Event Handling**


In embedded systems running an RTOS like FreeRTOS, event handling is used to manage inter-task communication and synchronization. Events can signal tasks when a specific condition occurs, such as data arrival or a timeout.


**Data Structure:**

- Event groups and queues are used to manage events.

**API for Registration:**

- Functions like `xEventGroupCreate`, `xEventGroupSetBits`, and `xEventGroupWaitBits` are used to create event groups and set/wait for events.

**Event Dispatch:**

- Tasks block on an event group, and when an event is set, the RTOS scheduler wakes up the waiting tasks.

```c
#include "FreeRTOS.h"
#include "event_groups.h"

#define BIT_0 (1 << 0)

static EventGroupHandle_t xEventGroup;

void vTask1(void *pvParameters) {
    for (;;) {
        // Wait for an event bit to be set
        xEventGroupWaitBits(xEventGroup, BIT_0, pdTRUE, pdFALSE, portMAX_DELAY);
        // Event bit was set, handle the event
    }
}

void vTask2(void *pvParameters) {
    for (;;) {
        // Simulate event occurrence
        vTaskDelay(pdMS_TO_TICKS(1000));
        // Set the event bit
        xEventGroupSetBits(xEventGroup, BIT_0);
    }
}

void main(void) {
    xEventGroup = xEventGroupCreate();
    xTaskCreate(vTask1, "Task 1", 1000, NULL, 1, NULL);
    xTaskCreate(vTask2, "Task 2", 1000, NULL, 1, NULL);
    vTaskStartScheduler();
}

```


### 3. **Windows Kernel: I/O Completion Ports**


In the Windows kernel, I/O completion ports are used for efficient I/O event handling. When an I/O operation completes, the system needs to notify the appropriate application or thread.


**Data Structure:**

- Structures like `IO_STATUS_BLOCK` and completion port handles.

**API for Registration:**

- Functions like `CreateIoCompletionPort` are used to associate an I/O device with a completion port.

**Event Dispatch:**

- The system uses `GetQueuedCompletionStatus` to retrieve completed I/O events and dispatch them to the appropriate handler.

```c
#include <windows.h>

HANDLE hCompletionPort;

DWORD WINAPI ThreadProc(LPVOID lpParameter) {
    DWORD bytesTransferred;
    ULONG_PTR completionKey;
    LPOVERLAPPED lpOverlapped;
    
    while (GetQueuedCompletionStatus(hCompletionPort, &bytesTransferred, &completionKey, &lpOverlapped, INFINITE)) {
        // Handle the completed I/O operation
    }
    return 0;
}

void SetupIoCompletionPort(HANDLE hDevice) {
    hCompletionPort = CreateIoCompletionPort(hDevice, NULL, 0, 0);
    CreateThread(NULL, 0, ThreadProc, NULL, 0, NULL);
}

```


### Summary


These examples illustrate how event handling mechanisms are crucial in various low-level software components for managing asynchronous events efficiently. In each case, the event handling system is designed to:

- Register event handlers (callbacks) along with their context.
- Dispatch events to the registered handlers when they occur.

Each implementation varies in its details, depending on the specific requirements and constraints of the system, but the underlying principles of event handling remain consistent.


---


### 1. **Design a Memory Management System for Embedded Systems**


**Question:**
Design a memory management system for an embedded application that can handle dynamic memory allocation and deallocation. Implement a `malloc` and `free` equivalent for this system. Discuss strategies to handle memory fragmentation and ensure efficient memory usage.


**Real-World Application:**
Memory management is critical in embedded systems with limited resources. Efficient allocation and deallocation mechanisms are necessary to ensure the system remains responsive and avoids memory leaks or fragmentation. Real-time operating systems (RTOS) like FreeRTOS and embedded applications often require custom memory management solutions tailored to their specific needs.


### 2. **Implement a Thread Synchronization Mechanism**


**Question:**
Implement a thread synchronization mechanism such as mutexes or semaphores in C for a multi-threaded embedded application. Write code to demonstrate how two threads can synchronize access to a shared resource using your implementation.


**Real-World Application:**
Thread synchronization is essential in multi-threaded environments to prevent race conditions and ensure data integrity. In embedded systems, threads often need to coordinate access to hardware resources or shared data structures. Proper synchronization mechanisms are crucial for stable and reliable operation.


### 3. **Develop a Custom Communication Protocol**


**Question:**
Design and implement a custom communication protocol in C for an embedded system that transmits data between two devices over a serial connection (UART). Include error detection and handling mechanisms.


**Real-World Application:**
Custom communication protocols are often required in embedded systems for specialized applications where standard protocols are either too complex or not suitable. Examples include communication between microcontrollers, sensors, and actuators in industrial automation, medical devices, and IoT applications.


### 4. **Create a Device Driver for a New Peripheral**


**Question:**
Write a Linux device driver in C for a new custom peripheral (e.g., a sensor or an actuator). The driver should handle device initialization, read/write operations, and interrupt handling.


**Real-World Application:**
Device drivers are essential for interfacing hardware peripherals with the operating system. Writing device drivers is a common task for embedded Linux developers, enabling support for new hardware devices and ensuring they can be effectively controlled by user applications.


### 5. **Implement a Real-Time Clock (RTC) Interface**


**Question:**
Implement an interface for a Real-Time Clock (RTC) in an embedded system using C. Provide functions to set and get the current time, and handle any necessary configuration for the RTC hardware.


**Real-World Application:**
Real-time clocks are used in many embedded systems to keep track of time even when the main system is powered off. Applications include logging events with timestamps, scheduling tasks, and maintaining accurate time in devices like GPS systems, digital clocks, and data loggers.


### Sample Implementations and Real-World Relevance


### 1. **Memory Management System**


```c
#include <stddef.h>
#define HEAP_SIZE 1024

static char heap[HEAP_SIZE];
static size_t free_index = 0;

void* my_malloc(size_t size) {
    if (free_index + size > HEAP_SIZE) {
        return NULL; // Out of memory
    }
    void* ptr = &heap[free_index];
    free_index += size;
    return ptr;
}

void my_free(void* ptr) {
    // Simple allocator doesn't support free
}

```


**Relevance:**
Embedded systems often use custom memory allocators to manage limited memory resources efficiently.


### 2. **Thread Synchronization Mechanism**


```c
#include <pthread.h>

pthread_mutex_t lock;

void* thread_func(void* arg) {
    pthread_mutex_lock(&lock);
    // Critical section
    pthread_mutex_unlock(&lock);
    return NULL;
}

int main() {
    pthread_t thread1, thread2;
    pthread_mutex_init(&lock, NULL);
    pthread_create(&thread1, NULL, thread_func, NULL);
    pthread_create(&thread2, NULL, thread_func, NULL);
    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);
    pthread_mutex_destroy(&lock);
    return 0;
}

```


**Relevance:**
Mutexes and other synchronization mechanisms prevent race conditions in multi-threaded applications, ensuring data integrity.


### 3. **Custom Communication Protocol**


```c
#include <stdio.h>

#define START_BYTE 0x02
#define STOP_BYTE 0x03

void send_data(const char* data) {
    putchar(START_BYTE);
    while (*data) {
        putchar(*data++);
    }
    putchar(STOP_BYTE);
}

void receive_data() {
    int ch;
    while ((ch = getchar()) != START_BYTE) {}
    while ((ch = getchar()) != STOP_BYTE) {
        putchar(ch);
    }
}

int main() {
    send_data("Hello");
    receive_data();
    return 0;
}

```


**Relevance:**
Custom protocols are essential for ensuring reliable data transmission in embedded systems with specific requirements.


### 4. **Device Driver for a New Peripheral**


```c
#include <linux/module.h>
#include <linux/fs.h>
#include <linux/uaccess.h>

#define DEVICE_NAME "my_device"
#define BUF_LEN 80

static int device_open(struct inode *, struct file *);
static int device_release(struct inode *, struct file *);
static ssize_t device_read(struct file *, char *, size_t, loff_t *);
static ssize_t device_write(struct file *, const char *, size_t, loff_t *);

static int major;
static char msg[BUF_LEN];
static char *msg_ptr;

static struct file_operations fops = {
    .read = device_read,
    .write = device_write,
    .open = device_open,
    .release = device_release
};

static int __init my_init(void) {
    major = register_chrdev(0, DEVICE_NAME, &fops);
    if (major < 0) {
        printk(KERN_ALERT "Registering char device failed with %d\n", major);
        return major;
    }
    printk(KERN_INFO "I was assigned major number %d. To talk to\n", major);
    return 0;
}

static void __exit my_exit(void) {
    unregister_chrdev(major, DEVICE_NAME);
}

static int device_open(struct inode *inode, struct file *file) {
    msg_ptr = msg;
    try_module_get(THIS_MODULE);
    return 0;
}

static int device_release(struct inode *inode, struct file *file) {
    module_put(THIS_MODULE);
    return 0;
}

static ssize_t device_read(struct file *filp, char *buffer, size_t length, loff_t * offset) {
    int bytes_read = 0;
    if (*msg_ptr == 0) return 0;
    while (length && *msg_ptr) {
        put_user(*(msg_ptr++), buffer++);
        length--;
        bytes_read++;
    }
    return bytes_read;
}

static ssize_t device_write(struct file *filp, const char *buff, size_t len, loff_t * off) {
    int i;
    for (i = 0; i < len && i < BUF_LEN; i++) {
        get_user(msg[i], buff + i);
    }
    msg_ptr = msg;
    return i;
}

module_init(my_init);
module_exit(my_exit);

MODULE_LICENSE("GPL");

```


**Relevance:**
Device drivers are vital for enabling the OS to communicate with hardware devices, providing necessary control and data operations.


### 5. **Real-Time Clock (RTC) Interface**


```c
#include <time.h>
#include <stdio.h>

void set_rtc_time(struct tm* new_time) {
    // Example to set time on a hypothetical RTC device
    // In real code, you'd use ioctl or direct memory access to set the RTC time
    printf("Setting RTC time to: %s", asctime(new_time));
}

void get_rtc_time(struct tm* current_time) {
    // Example to get time from a hypothetical RTC device
    // In real code, you'd use ioctl or direct memory access to get the RTC time
    time_t t = time(NULL);
    *current_time = *localtime(&t);
}

int main() {
    struct tm new_time = { .tm_year = 2024-1900, .tm_mon = 5, .tm_mday = 8, .tm_hour = 12, .tm_min = 0, .tm_sec = 0 };
    set_rtc_time(&new_time);

    struct tm current_time;
    get_rtc_time(&current_time);
    printf("Current RTC time is: %s", asctime(&current_time));
    return 0;
}

```


**Relevance:**
RTC interfaces are critical for maintaining accurate time in embedded systems, used in applications like logging and scheduling.


These questions and implementations provide a glimpse into real-world challenges and solutions in embedded systems and low-level programming, highlighting the practical importance of these skills.

