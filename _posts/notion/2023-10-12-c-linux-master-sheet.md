---
layout: post
comments: true
date: 2023-10-12
title: "C Linux Master Sheet" 
tags:
  - cheatsheet
  - system-software
  - linux
 
categories:
  - interview

pin: true
---

C interview cheatsheet of important questions. Make sure to revise the list daily.


## Important C macros


### Basic macros


```c
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))
#define ABS(x) ((x) < 0 ? -(x) : (x))
#define IS_POWER_OF_TWO(num) ((num) > 0 && ((num) & ((num) - 1)) == 0)
#define SWAP(x,y) (x ^= y ^=x ^= y)

#define SWAP(x,y,T) do { \
    T temp = (*x);\
    (*x) = (*y); \
    (*y) = temp; \
} while (0)
```


### Bitwise macros


```c
#define SET_BIT(num, i) ((num) |= (1 << (i)))
#define CLEAR_BIT(num, i) ((num) &= ~(1 << (i)))
#define TOGGLE_BIT(num, i) ((num) ^= (1 << (i)))
#define CHECK_BIT(num, i) (((num) & (1 << (i))) != 0)

/* how to extract specific bits from, say, a 32-bit value */
#define EXTRACT_BITS(value, start, length) \
    (((value) >> (start)) & ((1U << (length)) - 1))

#define COUNT_SET_BITS(num) ({       \
    int _count = 0;                  \
    int _num = (num);                \
    while (_num) {                   \
        _num &= (_num - 1);          \
        _count++;                    \
    }                                \
    _count;                          \
})
```


### Structure and type macros


```c
#define SIZEOF(type) ((char *)(&type + 1) - (char *)(&type))

/* Find offset value of a member of a structure */
#define OFFSET_OF(type, member) ((size_t) &(((type *)0)->member))
```


### List macros


```c
#define LIST_FOREACH_SAFE(head, node) \
    for (struct ListNode *node = (head), *__temp = (node ? node->next : NULL); \
         node != NULL; \
         node = __temp, __temp = (node ? node->next : NULL))

/* Not delete safe */     
#define LIST_FOREACH(head, node) \
    for (struct ListNode *node = (head); node != NULL; node = node->next)
    
/* Find length of LL */   
#define LIST_LENGTH(head, len) \
    do { \
        (len) = 0; \
        struct ListNode *node = (head); \
        while (node) { \
            (len)++; \
            node = node->next; \
        } \
    } while (0)
```


### Other macros


```c
#define IS_LITTLE_ENDIAN() ((*(char *)&(int){1}) == 1)
```


## Function Pointers and Callbacks


### Function Returning a function pointer usage


```c
#include <stdio.h>

typedef int (*OperationFunc)(char);

OperationFunc  additionFunction(int x)

// Function that returns a function pointer
int (*additionFunction(int x))(char) {
        int add(char c) {
        return c;
    }
    return add;
}

int main() {
    // Get the function pointer from the outer function
    int (*sumFunc)(char) = additionFunction(10); //This will call the function "additionFunction"
    
    // Call the function using the function pointer
    int result = sumFunc('A');
    
    printf("Result: %d\n", result); // Output: Result: 85 (ASCII value of 'A' is 65, 10 + 65 = 75)
    
    return 0;
}
```


### Callback example programs to register ops


```c
#include <stdio.h>

typedef struct sample_ops {
    int data;
    void (*print)(int);
} sample_ops;

void printer(int a) {
    printf("Print %d\n", a); // Added the missing argument a
}

int main() {
    // Write C code here
    static const sample_ops my_ops = {
        .data = 60, // Replaced ; with ,
        .print = printer
    };
    
    my_ops.print(brcmf_ops.data); 
    return 0;
}
 
```


## Tricky Code snippets


### Find Length of linked list


```c
int len=0;
for (struct ListNode *i = head; i; i=i->next, len++);
```


> 💡 Only one variable can be declared in for loop init section. So we cant declare `len` there. In the second and third place holder of for loop, we can have multiple statements separated by comma.


### 2D Array Allocation and Free


> 💡 dp[0][0] conversion to *((dp+0)+0)


```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int rows = 3, cols = 4;
    int** array = malloc(rows * sizeof(int*)); // Allocate memory for row pointers

    if (array == NULL) {
        perror("Memory allocation failed");
        return 1;
    }

    for (int i = 0; i < rows; i++) {
        array[i] = malloc(cols * sizeof(int)); // Allocate memory for each row
        if (array[i] == NULL) {
            perror("Memory allocation failed");
            return 1;
        }
    }

    // Access elements
    array[1][2] = 42; // Example usage
    printf("Value at array[1][2]: %d\n", array[1][2]);

    // Free memory
    for (int i = 0; i < rows; i++) {
        free(array[i]); // Free each row
    }
    free(array); // Free the row pointers

    return 0;
}
```


```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int rows = 3, cols = 4;
    int* array = malloc(rows * cols * sizeof(int)); // Single block for all elements

    if (array == NULL) {
        perror("Memory allocation failed");
        return 1;
    }

    // Access elements using index calculations
    array[1 * cols + 2] = 42; // Equivalent to array[1][2] in a "normal" 2D array
    printf("Value at array[1][2]: %d\n", array[1 * cols + 2]);

    // Free memory
    free(array);

    return 0;
}
```


## Mutex, Semaphore and Spinlock


<u>**Semaphore**</u>: Use a semaphore when you (thread) want to sleep till some other thread tells you to wake up. Semaphore 'down' happens in one thread (producer) and semaphore 'up' (for same semaphore) happens in another thread (consumer) e.g.: In producer-consumer problem, producer wants to sleep till at least one buffer slot is empty - only the consumer thread can tell when a buffer slot is empty.


<u>**Mutex**</u>: Use a mutex when you (thread) want to execute code that should not be executed by any other thread at the same time. Mutex 'down' happens in one thread and mutex 'up' must happen in the same thread later on. e.g.: If you are deleting a node from a global linked list, you do not want another thread to muck around with pointers while you are deleting the node. When you acquire a mutex and are busy deleting a node, if another thread tries to acquire the same mutex, it will be put to sleep till you release the mutex.


<u>**Spinlock**</u>: Use a spinlock when you really want to use a mutex but your thread is not allowed to sleep. e.g.: An interrupt handler within OS kernel must never sleep. If it does the system will freeze / crash. If you need to insert a node to globally shared linked list from the interrupt handler, acquire a spinlock - insert node - release spinlock


## Complex Declarations


### Variable Declarations


```c
1. int p; // An integer
2. int p[5]; // An array of 5 integers
3. int *p; // A pointer to an integer
4. int *p[10]; // An array of 10 pointers to integers
5. int **p; // A pointer to a pointer to an integer
6. int (*p)[3]; // A pointer to an array of 3 integers
7. int (*p)(char *); // A pointer to a function a that takes an integer
8. int (*p[5])(int); // An array of 5 pointers to functions that take an integer argument and return an integer
```


## Single, Double and Triple Pointers with type qualifier


![var declerations](../../static/images/2023-10-12-c-linux-master-sheet.md/var declerations)


### Pointer to Array


```c
int (*arr)[10];
```


## Array of pointers or 2D Arrays


```c
int *p[10];
```


```c
int array[5][13];  // A 2D array with 5 rows and 13 columns
int dp[rows][cols];
void func(int rows, int cols, int dp[rows][cols]);
void func(int rows, int cols, int dp[][cols]);  // Rows can be omitted
int (*eaytb)[13];  // Pointer to an array of 13 integers
eaytb = array;     // Pointing eaytb to the first row of the arra
```


In this case, `eaytb` can be used to access the rows of the array. For instance, `(*eaytb)[0]` would give you the first row of the array, while `(*eaytb)[1]` would give you the second row, and so on.
Passing 


### Comparison Table:


| **Method**             | **Memory Layout** | **Indexing**       | **Ease of Passing**      | **Flexibility**              |
| ---------------------- | ----------------- | ------------------ | ------------------------ | ---------------------------- |
| Static Allocation      | Contiguous        | `dp[i][j]`         | Easy                     | Fixed size at compile-time   |
| Contiguous Memory (1D) | Contiguous        | `dp[i * cols + j]` | Requires manual indexing | Flexible runtime size        |
| Pointer-to-Pointer     | Non-contiguous    | `dp[i][j]`         | Easy                     | Flexible runtime size        |
| Variable-Length Arrays | Contiguous        | `dp[i][j]`         | Easy                     | Flexible runtime size (C99+) |

undefined- **Static arrays:** Use for fixed-size arrays known at compile-time.
- **Flattened 1D arrays:** Use for dynamic size with contiguous memory for better cache performance.
- **Pointer-to-pointer:** Use when rows need independent allocation or resizing.
- **VLAs:** Use for flexible sizes if your compiler supports C99 or later.

### C Basic Data Type Sizes and Format Specifiers


| Data Type              | Memory (bytes) | Range                           | Format Specifier |
| ---------------------- | -------------- | ------------------------------- | ---------------- |
| short int              | 2              | -32,768 to 32,767               | %hd              |
| unsigned short int     | 2              | 0 to 65,535                     | %hu              |
| unsigned int           | 4              | 0 to 4,294,967,295              | %u               |
| int                    | 4              | -2,147,483,648 to 2,147,483,647 | %d               |
| long int               | 4              | -2,147,483,648 to 2,147,483,647 | %ld              |
| unsigned long int      | 4              | 0 to 4,294,967,295              | %lu              |
| long long int          | 8              | -(2^63) to (2^63)-1             | %lld             |
| unsigned long long int | 8              | 0 to 18,446,744,073,709,551,615 | %llu             |
| signed char            | 1              | -128 to 127                     | %c               |
| unsigned char          | 1              | 0 to 255                        | %c               |
| float                  | 4              | -                               | %f               |
| double                 | 8              | -                               | %lf              |
| long double            | 12             | -                               | %Lf              |

undefined
### What is the output of below code?


```javascript
#include <stdio.h>

int main()
{
    const char normal[] = "stdout ";
    const char error[] = "stderr ";

    fprintf(stdout,normal);
    fprintf(stderr,error);
    fprintf(stdout,normal);
    fprintf(stderr,error);
    fprintf(stdout,normal);
    fprintf(stderr,error);
	putchar('\n');

    return(0);
}

```


```javascript
stderr stderr stderr stdout stdout stdout 
```


The reason is that stderr are not buffered, whereas stdout is always buffered and output when buffer is full or during a new line character.


## FORK


fork() split the program flow into two processes. The commands following after the fork will be executed by two different processes. (Program will be split)


```javascript
process = fork()
```

- process value is 0 in child process.
- It is 1 in parent process.

### Extract IP from a 32byte array


```c
#include <stdio.h>

void extract_ip(uint32_t ip) {
    // Extract each octet by shifting and masking
    uint8_t octet1 = (ip >> 24) & 0xFF; // First 8 bits
    uint8_t octet2 = (ip >> 16) & 0xFF; // Next 8 bits
    uint8_t octet3 = (ip >> 8) & 0xFF;  // Next 8 bits
    uint8_t octet4 = ip & 0xFF;         // Last 8 bits

    // Print the extracted IP address in dotted decimal format
    printf("%d.%d.%d.%d\n", octet1, octet2, octet3, octet4);
}

int main() {
    uint32_t ip = 3232235776;  // 192.168.1.0
    extract_ip(ip);
    return 0;
}

```


![Max depth](../../static/images/2023-10-12-c-linux-master-sheet.md/Max depth)


```c
int maxDepth(struct Node* root) {
    if (!root) return 0;
    if (root->numChildren == 0) return 1;
    int max=0;
    for (int i=0;i<(root->numChildren);i++){
        int temp = maxDepth(root->children[i]) +1;
        max = temp > max ? temp : max;
    }
    return max;
}
```


Find intersection of LL

