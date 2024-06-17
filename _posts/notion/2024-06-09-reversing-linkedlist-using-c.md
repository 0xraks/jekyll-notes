---
layout: post
comments: true
date: 2024-06-09
title: "Reversing LinkedList using C" 
tags:
  - system-software
 
categories:
  - interview

pin: false
---

Reversing a Linked List in C


This guide demonstrates two recursive methods to reverse a linked list in C


## Linked List Structure


First, let's define the structure of a linked list node.


```c
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};
```


### Iterative Approach


```c
void reverseIterative(struct Node** head_ref) {
    struct Node* prev = NULL;
    struct Node* current = *head_ref;
    struct Node* next = NULL;
    
    while (current != NULL) {
        next = current->next;  // Store next node
        current->next = prev;  // Reverse current node's pointer
        prev = current;        // Move pointers one position ahead
        current = next;
    }
    
    *head_ref = prev;
}
```


## Head Recursion Approach


In the head recursion method, the recursive call is made before processing the current node. This results in reversing the list after reaching the end of the list.


```c
void reverseHeadRecursive(struct Node** head_ref) {
    if (*head_ref == NULL || (*head_ref)->next == NULL)
        return;

    struct Node* first = *head_ref;
    struct Node* rest = first->next;

    reverseHeadRecursive(&rest);

    first->next->next = first;
    first->next = NULL;

    *head_ref = rest;
}

```


## Tail Recursion Approach


In the tail recursion method, the recursive call is made after processing the current node. This is more efficient in terms of stack usage since it can be optimized by the compiler.


```c
void reverseTailRecursiveUtil(struct Node* curr, struct Node* prev, struct Node** head_ref) {
    if (curr == NULL) {
        *head_ref = prev;
        return;
    }

    struct Node* next = curr->next;
    curr->next = prev;

    reverseTailRecursiveUtil(next, curr, head_ref);
}

void reverseTailRecursive(struct Node** head_ref) {
    if (*head_ref == NULL)
        return;
    
    reverseTailRecursiveUtil(*head_ref, NULL, head_ref);
}
```

