---
layout: post
comments: true
date: 2024-12-06
title: "Learn Recursion with C Programming" 
tags:
  - system-software
  - coding
 
categories:
  - software
  - interview

pin: false
---

This is a cheatsheet / revision list for all recursion based easy, medium and hard problems


## Sum of numbers to from 0 to n


```c
#include<stdio.h>

int summer(int n){
  if (n==0) return 0;
  return summer(n-1) + n;
}

int main() {
  int sample_sum = summer(10);
  printf("Sum = %d",sample_sum);
  return 0;
}
```


## Sum of all digits of number n


```c
#include<stdio.h>

int sum_digits(int n){
  if (n==0) return 0;
  int last_digit = n % 10;
  int other_digits = n / 10;
  return sum_digits(other_digits) + last_digit;
}

int main() {
  int sample = sum_digits(10113);
  printf("Sum digits %d",sample);
  return 0;
}
```


## Factorial of number n


```c
#include<stdio.h>

int factorial(int n){
  if (n==0) return 1;
  return factorial(n-1) * n;
}

int main() {
  int sample = factorial(5);
  printf("factorial %d",sample);
  return 0;
}
```


## Pattern Printing #1


```c

// 1 
// 1 2 
// 1 2 3 
// 1 2 3 4 
// 1 2 3 4 5
#include<stdio.h>

void pattern(int n) {
  if (n==0) return 0;
  pattern(n-1);
  for (int i=1;i<=n;i++) {
    printf("%d ",i);
  }
  printf("\n");
}

int main() {
  pattern(5);
  return 0;
}
```


## Pattern Printing #2


```c
// 1 2 3 4 5 
// 1 2 3 4 
// 1 2 3 
// 1 2 
// 1

#include<stdio.h>

void pattern(int n) {
  if (n==0) return 0;
  for (int i=1;i<=n;i++){
    printf("%d ",i);
  }
  printf("\n");
  pattern(n-1);
}

int main() {
  pattern(5);
  return 0;
}
```


## Pattern Printing #3


```c
// 1 2 3 4 5 
// 1 2 3 4 
// 1 2 3 
// 1 2 
// 1
// 1 2 
// 1 2 3 
// 1 2 3 4 
// 1 2 3 4 5
#include<stdio.h>

void pattern(int n){
  if (n==1){
    printf("1\n");
    return;
  }
  
  for (int i=1;i<=n;i++){
    printf("%d ",i);
  }
  printf("\n");

  pattern(n-1);
  
  for (int i=1;i<=n;i++){
    printf("%d ",i);
  }
  printf("\n");
  
}
int main() {
  pattern(5);
  return 0;
}
```

