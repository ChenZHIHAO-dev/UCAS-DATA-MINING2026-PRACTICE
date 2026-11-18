# Apriori 逐层挖掘

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=apriori)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E16-02A"></a>

## E16-02A · 2016：十笔交易 Apriori

来源：2016 年扫描卷 · Q2(a) / 10 points · PDF p.1

状态：完整；形式：计算 / 推导。

### 原题 / 转录整理

Find all frequent itemsets using Apriori, with min_support=50%. Present candidates and frequent itemsets at each level.

| TID | Items |
| --- | --- |
| 1 | a, b, e |
| 2 | a, b, c, e |
| 3 | a, b, d, e |
| 4 | a, c, d, e |
| 5 | b, c, e |
| 6 | b, d, e |
| 7 | c, d |
| 8 | a, b, c |
| 9 | a, b, e |
| 10 | a, b, e |

### 第一步：中文翻译与条件

将每笔事务当作集合；把支持比例变为整数计数阈值，列出每一层候选及频繁项集。

### 逐步解答

计数阈值 $q=\lceil 10\times 0.5\rceil=5$。先生成候选、用子集性质剪枝，再扫描计数。

| k | Candidates Ck with counts | Frequent Lk |
| --- | --- | --- |
| 1 | a:7; b:8; c:5; d:4; e:8 | a:7; b:8; c:5; e:8 |
| 2 | ab:6; ac:3; ae:6; bc:3; be:7; ce:3 | ab:6; ae:6; be:7 |
| 3 | abe:5 | abe:5 |
| 4 | ∅ | ∅ |

一共 8 个非空频繁项集。表中候选是**子集剪枝后实际计数**的候选。

### English answer pattern

Join frequent itemsets, prune candidates with infrequent subsets, count candidates, and retain those meeting the support threshold.

### 易错点与约定

每笔事务内同一项只计一次；重复事务是不同 TID，仍须分别计数。

### 计算与内存分析

标准逐层方法通常每层扫库一次。候选数最坏指数级；候选集合与计数器可能先耗尽内存。


---

<a id="HW3-02A"></a>

## HW3-02A · 当前 HW3：四笔交易、60% 阈值

来源：当前 HW3 · Written Q2(a)

状态：完整；形式：计算 / 推导。

### 原题 / 转录整理

Find all frequent itemsets using Apriori, with min_support=60%. Present candidates and frequent itemsets at each level.

| TID | Items |
| --- | --- |
| 1 | A, B, C, D |
| 2 | A, B, C, D, E |
| 3 | A, B, E |
| 4 | A, B, D |

### 第一步：中文翻译与条件

将每笔事务当作集合；把支持比例变为整数计数阈值，列出每一层候选及频繁项集。

### 逐步解答

计数阈值 $q=\lceil 4\times 0.6\rceil=3$。先生成候选、用子集性质剪枝，再扫描计数。

| k | Candidates Ck with counts | Frequent Lk |
| --- | --- | --- |
| 1 | A:4; B:4; C:2; D:3; E:2 | A:4; B:4; D:3 |
| 2 | AB:4; AD:3; BD:3 | AB:4; AD:3; BD:3 |
| 3 | ABD:3 | ABD:3 |
| 4 | ∅ | ∅ |

一共 7 个非空频繁项集。表中候选是**子集剪枝后实际计数**的候选。

### English answer pattern

Join frequent itemsets, prune candidates with infrequent subsets, count candidates, and retain those meeting the support threshold.

### 易错点与约定

每笔事务内同一项只计一次；重复事务是不同 TID，仍须分别计数。

### 计算与内存分析

标准逐层方法通常每层扫库一次。候选数最坏指数级；候选集合与计数器可能先耗尽内存。


---

<a id="HX3-01A"></a>

## HX3-01A · 往届 HW3：ONEK/DOKEY 五笔交易

来源：往届 HW3（hxd） · Written Q1(a)

状态：完整；形式：计算 / 推导。

### 原题 / 转录整理

Find all frequent itemsets using Apriori, with min_support=40%. Present candidates and frequent itemsets at each level.

| TID | Items |
| --- | --- |
| 1 | E, K, N, O |
| 2 | D, E, K, O, Y |
| 3 | A, E, K, O |
| 4 | C, K, M, U |
| 5 | C, E, I, K, O |

### 第一步：中文翻译与条件

将每笔事务当作集合；把支持比例变为整数计数阈值，列出每一层候选及频繁项集。

### 逐步解答

计数阈值 $q=\lceil 5\times 0.4\rceil=2$。先生成候选、用子集性质剪枝，再扫描计数。

| k | Candidates Ck with counts | Frequent Lk |
| --- | --- | --- |
| 1 | A:1; C:2; D:1; E:4; I:1; K:5; M:1; N:1; O:4; U:1; Y:1 | C:2; E:4; K:5; O:4 |
| 2 | CE:1; CK:2; CO:1; EK:4; EO:4; KO:4 | CK:2; EK:4; EO:4; KO:4 |
| 3 | EKO:4 | EKO:4 |
| 4 | ∅ | ∅ |

一共 9 个非空频繁项集。表中候选是**子集剪枝后实际计数**的候选。

### English answer pattern

Join frequent itemsets, prune candidates with infrequent subsets, count candidates, and retain those meeting the support threshold.

### 易错点与约定

每笔事务内同一项只计一次；重复事务是不同 TID，仍须分别计数。

### 计算与内存分析

标准逐层方法通常每层扫库一次。候选数最坏指数级；候选集合与计数器可能先耗尽内存。
