---
layout: post
comments: true
date: 2023-10-12
title: "IMP C Macros" 
tags:
  - cheatsheet
  - system-software
 
categories:
  - interview

pin: false
---

```c
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))
#define ABS(x) ((x) < 0 ? -(x) : (x))
#define IS_POWER_OF_TWO(num) ((num) > 0 && ((num) & ((num) - 1)) == 0)
#define SWAP(x,y) (x ^= y ^=x ^= y)


#define SET_BIT(num, i) ((num) |= (1 << (i)))
#define CLEAR_BIT(num, i) ((num) &= ~(1 << (i)))
#define TOGGLE_BIT(num, i) ((num) ^= (1 << (i)))
#define CHECK_BIT(num, i) (((num) & (1 << (i))) != 0)
#define COUNT_SET_BITS(num) ({       \
    int _count = 0;                  \
    int _num = (num);                \
    while (_num) {                   \
        _num &= (_num - 1);          \
        _count++;                    \
    }                                \
    _count;                          \
})

#define SIZEOF(type) ((char *)(&type + 1) - (char *)(&type))
#define IS_LITTLE_ENDIAN() ((*(char *)&(int){1}) == 1)
#define OFFSET_OF(type, member) ((size_t) &(((type *)0)->member))

#define LIST_FOREACH(head, node) \
    for (struct ListNode *node = (head); node != NULL; node = node->next)
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

