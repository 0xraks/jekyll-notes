---
layout: post
comments: true
date: 2024-02-03
title: "Function returning a function ptr example" 
tags:
  - coding
 
categories:
  - software

---

```javascript
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

