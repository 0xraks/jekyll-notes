---
layout: post
comments: true
date: 2024-06-09
title: "Flower Bouquets - Coding Question DP" 
tags:
  - coding
 
categories:
  - interview

pin: false
---

### Flower Bouquets


Lara owns a flower shop where she sells only two types of flower bouquets:

- **Type 1:** The first type of bouquet contains three roses and costs p dollars.
- **Type 2:** The second type of bouquet contains one cosmos and one rose and costs q dollars.

Lara grows these flowers in her own garden in a single row. Consider the row as a one-dimensional array where each cell either contains a rose or a cosmos. For example, in the array `001101011`, `0` indicates a rose and `1` indicates a cosmos.


Lara follows an important rule when she makes the bouquets: she makes each bouquet with only consecutive flowers from the array. For example, in a bouquet, the flowers from consecutive indices (i,i+1,i+2)(i, i+1, i+2)(i,i+1,i+2) in the array can be present, but not from non-consecutive indices (i,i+2)(i, i+2)(i,i+2). In the array above, Lara cannot make any bouquets of type 1 but she can make 3 bouquets of type 2.


Now she wonders what is the maximum profit she can make if she makes these bouquets optimally. You are given a binary string representing her garden row. Calculate the maximum profit Lara can make. Remember that it is not necessary to use every flower.


### Function Description


Complete the `flowerBouquets` function in the editor below. The function must return an integer that denotes the maximum profit Lara can make if she makes her bouquets optimally.


**`flowerBouquets`** **has three parameters:**

- `p`: integer denoting the cost of a bouquet of type 1.
- `q`: integer denoting the cost of a bouquet of type 2.
- `s`: string denoting the garden pattern, where zero indicates rose and one indicates cosmos.

### Constraints

- 1≤p,q≤1000
- 1≤ mod(s) ≤ 100000

### Input Format For Custom Testing


**Sample Case 0**


**Sample Input 0**


```c
2
3
0001000
```


**Sample Output 0**


```text
5
```


**Explanation 0**


Lara can make two bouquets of three roses by the corresponding indices: (0,1,2)(0, 1, 2)(0,1,2) and (4,5,6)(4, 5, 6)(4,5,6) and can earn 2+2=42 + 2 = 42+2=4 profit.


Or,


Lara can make one bouquet of three roses by the corresponding indices: (0,1,2)(0, 1, 2)(0,1,2) and one bouquet of one rose and one cosmos by the corresponding indices (3,4)(3, 4)(3,4) and can earn 2+3=52 + 3 = 52+3=5 profit.


5 is greater than 4 so print 5.

<details>
  <summary>Image</summary>


![flower_bouqet](../../static/images/2024-06-09-flower-bouquets---coding-question-dp.md/flower_bouqet)



  </details>