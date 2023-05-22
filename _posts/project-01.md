---
title: "Probing the origins of human acetylcholinesterase inhibition via QSAR modeling and molecular docking"
date: 2021-04-04T23:15:00+07:00
slug: acetylcholinesterase
category: projects
summary:
description:
cover:
  image:
  alt:
  caption:
  relative: true
showtoc: true
draft: false
---

# Abstract

Alzheimer’s disease (AD) is a chronic neurodegenerative disease which leads to the gradual loss of neuronal cells. Several hypotheses for AD exists (e.g., cholinergic, amyloid, tau hypotheses, etc.). As per the cholinergic hypothesis, the deficiency of choline is responsible for AD; therefore, the inhibition of AChE is a lucrative therapeutic strategy for the treatment of AD. Acetylcholinesterase (AChE) is an enzyme that catalyzes the breakdown of the neurotransmitter acetylcholine that is essential for cognition and memory. A large non-redundant data set of 2,570 compounds with reported IC50 values against AChE was obtained from ChEMBL and employed in quantitative structure-activity relationship (QSAR) study so as to gain insights on their origin of bioactivity. AChE inhibitors were described by a set of 12 fingerprint descriptors and predictive models were constructed from 100 different data splits using random forest. Generated models afforded R2, Q2CV and Q2Ext values in ranges of 0.66–0.93, 0.55–0.79 and 0.56–0.81 for the training set, 10-fold cross-validated set and external set, respectively. The best model built using the substructure count was selected according to the OECD guidelines and it afforded R2, Q2CV and Q2Ext values of 0.92 ± 0.01, 0.78 ± 0.06 and 0.78 ± 0.05, respectively. Furthermore, Y-scrambling was applied to evaluate the possibility of chance correlation of the predictive model. Subsequently, a thorough analysis of the substructure fingerprint count was conducted to provide informative insights on the inhibitory activity of AChE inhibitors. Moreover, Kennard–Stone sampling of the actives were applied to select 30 diverse compounds for further molecular docking studies in order to gain structural insights on the origin of AChE inhibition. Site-moiety mapping of compounds from the diversity set revealed three binding anchors encompassing both hydrogen bonding and van der Waals interaction. Molecular docking revealed that compounds 13, 5 and 28 exhibited the lowest binding energies of −12.2, −12.0 and −12.0 kcal/mol, respectively, against human AChE, which is modulated by hydrogen bonding, π–π stacking and hydrophobic interaction inside the binding pocket. These information may be used as guidelines for the design of novel and robust AChE inhibitors.

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the 
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/NjNOGm3sCOQ/0.jpg)](http://www.youtube.com/watch?v=NjNOGm3sCOQ)


```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```
 
```python
s = "Python syntax highlighting"
print s
```
 
```
No language indicated, so no syntax highlighting. 
But let's throw in a <b>tag</b>.
```

# H1
## H2
### H3
#### H4
##### H5
###### H6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------

Here is a simple footnote[^1].

A footnote can also have multiple lines[^2].  

You can also use words, to fit your writing style more closely[^note].

[^1]: My reference.
[^2]: Every new line should be prefixed with 2 spaces.  
  This allows you to have a footnote with multiple lines.
[^note]:
    Named footnotes will still render with numbers instead of the text but allow easier identification and linking.  
    This footnote also has been made with a different syntax using 4 spaces for new lines.


Three or more...

---

Hyphens

***

Asterisks

___

Underscores

# Full-text article
[Read article](https://peerj.com/articles/2322/)
