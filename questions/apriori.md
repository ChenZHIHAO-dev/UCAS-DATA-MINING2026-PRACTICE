# Apriori 逐层挖掘

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=apriori)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E16-02A"></a>

## E16-02A · 2016：十笔交易 Apriori

来源：2016 年扫描卷 · Q2(a) / 10 points · PDF p.1

状态：完整；形式：计算 / 推导。

### 本题公式 · 支持度、整数阈值与逐层计数

设 $N$ 为原事务数，$count(X)$ 为包含项集 $X$ 中全部物品的事务数，支持度阈值比例为 $s$。

$$supp(X)=\frac{count(X)}N,\qquad q=\lceil Ns\rceil,\qquad X\text{ 频繁}\iff count(X)\ge q.$$

Apriori：由 $L_{k-1}$ 连接并检查所有 $(k-1)$ 项子集，再给留下的 $C_k$ 扫描计数，得到 $L_k$。

### 原文

Find all frequent itemsets using Apriori, with min_support=50%. Present candidates and frequent itemsets at each level.

用 Apriori 找出全部频繁项集，最小支持度为 50%。给出每层候选项集与频繁项集。

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

### 逐步解答

#### 1. 阈值与 Apriori 剪枝

$$supp(X)=\frac{count(X)}{N},\qquad count(X)\ge q=\left\lceil N\times min\_sup\right\rceil.$$

若某个 $(k-1)$ 项子集不频繁，其 $k$ 项超集也不频繁，因为同时包含更多物品的事务数不会增加。因此先由 $L_{k-1}$ 连接得到候选，再检查全部 $(k-1)$ 项子集，保留下来的 $C_k$ 才扫描计数。

#### 2. 逐层候选与频繁项集

计数阈值 $q=\lceil 10\times 0.5\rceil=5$。先生成候选、用子集性质剪枝，再扫描计数。

| k | Candidates Ck with counts | Frequent Lk |
| --- | --- | --- |
| 1 | a:7; b:8; c:5; d:4; e:8 | a:7; b:8; c:5; e:8 |
| 2 | ab:6; ac:3; ae:6; bc:3; be:7; ce:3 | ab:6; ae:6; be:7 |
| 3 | abe:5 | abe:5 |
| 4 | ∅ | ∅ |

一共 8 个非空频繁项集。表中候选是**子集剪枝后实际计数**的候选。

#### 3. 展开一次剪枝和计数

单项 $d$ 的计数为 4，小于阈值 5，所以后续候选均不含 $d$。三项候选 $\{a,b,e\}$ 的三个二项子集 $ab,ae,be$ 都在 $L_2$ 中；它出现在 T1、T2、T3、T9、T10，共 5 笔，支持度 $5/10=50\%$，故进入 $L_3$。

下一层无法由两个具有相同前缀的频繁三项集连接得到新候选，算法停止；将全部非空 $L_k$ 合并作为答案。


### English answer pattern

Join frequent itemsets, prune candidates with infrequent subsets, count candidates, and retain those meeting the support threshold.

连接频繁项集，剪去含不频繁子集的候选，给候选计数，保留达到支持阈值者。

### 易错点与约定

每笔事务内同一项只计一次；重复事务是不同 TID，仍须分别计数。

### 计算与内存分析

标准逐层方法通常每层扫库一次。候选数最坏指数级；候选集合与计数器可能先耗尽内存。

### 知识点与公式总结

- 支持计数门槛 $q=\lceil N\,min\_sup\rceil$，本题 $N=10$、$min\_sup=0.5$；支持度为 $supp(X)=count(X)/N$。
- Apriori 性质：频繁项集的全部子集都频繁。连接 $L_{k-1}$ 后，任何 $(k-1)$ 子集不频繁的候选都在计数前剪去。
- 按“候选 $C_k$→扫描计数→频繁 $L_k$”逐层列出；停止后合并各层 $L_k$，将剪枝前连接项与实际计数候选区分清楚。


---

<a id="HW3-02A"></a>

## HW3-02A · 当前 HW3：四笔交易、60% 阈值

来源：当前 HW3 · Written Q2(a)

状态：完整；形式：计算 / 推导。

### 本题公式 · 支持度、整数阈值与逐层计数

设 $N$ 为原事务数，$count(X)$ 为包含项集 $X$ 中全部物品的事务数，支持度阈值比例为 $s$。

$$supp(X)=\frac{count(X)}N,\qquad q=\lceil Ns\rceil,\qquad X\text{ 频繁}\iff count(X)\ge q.$$

Apriori：由 $L_{k-1}$ 连接并检查所有 $(k-1)$ 项子集，再给留下的 $C_k$ 扫描计数，得到 $L_k$。

### 原文

Find all frequent itemsets using Apriori, with min_support=60%. Present candidates and frequent itemsets at each level.

用 Apriori 找出全部频繁项集，最小支持度为 60%。给出每层候选项集与频繁项集。

| TID | Items |
| --- | --- |
| 1 | A, B, C, D |
| 2 | A, B, C, D, E |
| 3 | A, B, E |
| 4 | A, B, D |

### 逐步解答

#### 1. 阈值与 Apriori 剪枝

$$supp(X)=\frac{count(X)}{N},\qquad count(X)\ge q=\left\lceil N\times min\_sup\right\rceil.$$

若某个 $(k-1)$ 项子集不频繁，其 $k$ 项超集也不频繁，因为同时包含更多物品的事务数不会增加。因此先由 $L_{k-1}$ 连接得到候选，再检查全部 $(k-1)$ 项子集，保留下来的 $C_k$ 才扫描计数。

#### 2. 逐层候选与频繁项集

计数阈值 $q=\lceil 4\times 0.6\rceil=3$。先生成候选、用子集性质剪枝，再扫描计数。

| k | Candidates Ck with counts | Frequent Lk |
| --- | --- | --- |
| 1 | A:4; B:4; C:2; D:3; E:2 | A:4; B:4; D:3 |
| 2 | AB:4; AD:3; BD:3 | AB:4; AD:3; BD:3 |
| 3 | ABD:3 | ABD:3 |
| 4 | ∅ | ∅ |

一共 7 个非空频繁项集。表中候选是**子集剪枝后实际计数**的候选。

#### 3. 展开一次剪枝和计数

$C,E$ 的单项计数均为 2，小于阈值 3，所以只用 $A,B,D$ 连接。$AB,AD,BD$ 均频繁，生成 $ABD$；它出现在 T1、T2、T4，共 3 笔，支持度 $3/4=75\%\ge60\%$。这里阈值向上取整，所以计数 2 对应的 50% 不能达标。

下一层无法由两个具有相同前缀的频繁三项集连接得到新候选，算法停止；将全部非空 $L_k$ 合并作为答案。


### English answer pattern

Join frequent itemsets, prune candidates with infrequent subsets, count candidates, and retain those meeting the support threshold.

连接频繁项集，剪去含不频繁子集的候选，给候选计数，保留达到支持阈值者。

### 易错点与约定

每笔事务内同一项只计一次；重复事务是不同 TID，仍须分别计数。

### 计算与内存分析

标准逐层方法通常每层扫库一次。候选数最坏指数级；候选集合与计数器可能先耗尽内存。

### 知识点与公式总结

- 支持计数门槛 $q=\lceil N\,min\_sup\rceil$，本题 $N=4$、$min\_sup=0.6$；支持度为 $supp(X)=count(X)/N$。
- Apriori 性质：频繁项集的全部子集都频繁。连接 $L_{k-1}$ 后，任何 $(k-1)$ 子集不频繁的候选都在计数前剪去。
- 按“候选 $C_k$→扫描计数→频繁 $L_k$”逐层列出；停止后合并各层 $L_k$，将剪枝前连接项与实际计数候选区分清楚。


---

<a id="HX3-01A"></a>

## HX3-01A · 往届 HW3：ONEK/DOKEY 五笔交易

来源：往届 HW3（hxd） · Written Q1(a)

状态：完整；形式：计算 / 推导。

### 本题公式 · 支持度、整数阈值与逐层计数

设 $N$ 为原事务数，$count(X)$ 为包含项集 $X$ 中全部物品的事务数，支持度阈值比例为 $s$。

$$supp(X)=\frac{count(X)}N,\qquad q=\lceil Ns\rceil,\qquad X\text{ 频繁}\iff count(X)\ge q.$$

Apriori：由 $L_{k-1}$ 连接并检查所有 $(k-1)$ 项子集，再给留下的 $C_k$ 扫描计数，得到 $L_k$。

### 原文

Find all frequent itemsets using Apriori, with min_support=40%. Present candidates and frequent itemsets at each level.

用 Apriori 找出全部频繁项集，最小支持度为 40%。给出每层候选项集与频繁项集。

| TID | Items |
| --- | --- |
| 1 | E, K, N, O |
| 2 | D, E, K, O, Y |
| 3 | A, E, K, O |
| 4 | C, K, M, U |
| 5 | C, E, I, K, O |

### 逐步解答

#### 1. 阈值与 Apriori 剪枝

$$supp(X)=\frac{count(X)}{N},\qquad count(X)\ge q=\left\lceil N\times min\_sup\right\rceil.$$

若某个 $(k-1)$ 项子集不频繁，其 $k$ 项超集也不频繁，因为同时包含更多物品的事务数不会增加。因此先由 $L_{k-1}$ 连接得到候选，再检查全部 $(k-1)$ 项子集，保留下来的 $C_k$ 才扫描计数。

#### 2. 逐层候选与频繁项集

计数阈值 $q=\lceil 5\times 0.4\rceil=2$。先生成候选、用子集性质剪枝，再扫描计数。

| k | Candidates Ck with counts | Frequent Lk |
| --- | --- | --- |
| 1 | A:1; C:2; D:1; E:4; I:1; K:5; M:1; N:1; O:4; U:1; Y:1 | C:2; E:4; K:5; O:4 |
| 2 | CE:1; CK:2; CO:1; EK:4; EO:4; KO:4 | CK:2; EK:4; EO:4; KO:4 |
| 3 | EKO:4 | EKO:4 |
| 4 | ∅ | ∅ |

一共 9 个非空频繁项集。表中候选是**子集剪枝后实际计数**的候选。

#### 3. 展开一次剪枝和计数

$CE$ 与 $CO$ 的计数均为 1，所以包含它们的三项候选会被剪去。例如 $CEK$ 的子集 $CE\notin L_2$，无需再次扫描计数。$EKO$ 的全部二项子集 $EK,EO,KO$ 都频繁，计数为 4，支持度 $4/5=80\%$，进入 $L_3$。

下一层无法由两个具有相同前缀的频繁三项集连接得到新候选，算法停止；将全部非空 $L_k$ 合并作为答案。


### English answer pattern

Join frequent itemsets, prune candidates with infrequent subsets, count candidates, and retain those meeting the support threshold.

连接频繁项集，剪去含不频繁子集的候选，给候选计数，保留达到支持阈值者。

### 易错点与约定

每笔事务内同一项只计一次；重复事务是不同 TID，仍须分别计数。

### 计算与内存分析

标准逐层方法通常每层扫库一次。候选数最坏指数级；候选集合与计数器可能先耗尽内存。

### 知识点与公式总结

- 支持计数门槛 $q=\lceil N\,min\_sup\rceil$，本题 $N=5$、$min\_sup=0.4$；支持度为 $supp(X)=count(X)/N$。
- Apriori 性质：频繁项集的全部子集都频繁。连接 $L_{k-1}$ 后，任何 $(k-1)$ 子集不频繁的候选都在计数前剪去。
- 按“候选 $C_k$→扫描计数→频繁 $L_k$”逐层列出；停止后合并各层 $L_k$，将剪枝前连接项与实际计数候选区分清楚。


---

<a id="PPT-ARM25"></a>

## PPT-ARM25 · 课件 · 九笔事务的全部 Apriori 候选与频繁项集

来源：当前完整七讲课件 · ARM.pdf · Exercise 1 · PDF p.25

状态：完整课件练习；形式：课件计算 / 逐步练习。

### 本题公式 · 支持度、整数阈值与逐层计数

设 $N$ 为原事务数，$count(X)$ 为包含项集 $X$ 中全部物品的事务数，支持度阈值比例为 $s$。

$$supp(X)=\frac{count(X)}N,\qquad q=\lceil Ns\rceil,\qquad X\text{ 频繁}\iff count(X)\ge q.$$

Apriori：由 $L_{k-1}$ 连接并检查所有 $(k-1)$ 项子集，再给留下的 $C_k$ 扫描计数，得到 $L_k$。

### 原文

A database has 9 transactions. Let min_sup = 20%. Please present all the candidates and frequent itemsets at each iteration.

数据库有 9 笔事务。设最小支持度为 20%。请给出每轮的全部候选项集和频繁项集。

| TID | List of items_IDs |
| --- | --- |
| T100 | I1,I2,I5 |
| T200 | I2,I4 |
| T300 | I2,I3 |
| T400 | I1,I2,I4 |
| T500 | I1,I3 |
| T600 | I2,I3 |
| T700 | I1,I3 |
| T800 | I1,I2,I3,I5 |
| T900 | I1,I2,I3 |

### 逐步解答

#### 1. 将比例换为整数计数阈值

$$q=\lceil N\cdot min\_sup\rceil=\lceil9(0.2)\rceil=\boxed{2}.$$

支持计数 $count(X)$ 是包含整个项集 $X$ 的事务数；支持度 $supp(X)=count(X)/9$。每轮先连接生成候选，利用“频繁项集的每个子集也频繁”剪枝，再扫描计数。

#### 2. 第一轮：全部单项候选

| 候选 $C_1$ | $\{I_1\}$ | $\{I_2\}$ | $\{I_3\}$ | $\{I_4\}$ | $\{I_5\}$ |
| --- | --- | --- | --- | --- | --- |
| 计数 | 6 | 7 | 6 | 2 | 2 |

五个计数均达到 2，所以 $L_1=C_1$。

#### 3. 第二轮：逐个列出 10 个候选

| 候选 $C_2$ | 计数 | 是否进入 $L_2$ |
| --- | --- | --- |
| $\{I_1,I_2\}$ | 4 | 保留 |
| $\{I_1,I_3\}$ | 4 | 保留 |
| $\{I_1,I_4\}$ | 1 | 删除 |
| $\{I_1,I_5\}$ | 2 | 保留 |
| $\{I_2,I_3\}$ | 4 | 保留 |
| $\{I_2,I_4\}$ | 2 | 保留 |
| $\{I_2,I_5\}$ | 2 | 保留 |
| $\{I_3,I_4\}$ | 0 | 删除 |
| $\{I_3,I_5\}$ | 1 | 删除 |
| $\{I_4,I_5\}$ | 0 | 删除 |

#### 4. 第三轮：连接后检查所有二子集

| 连接得到的三项集 | 子集检查 | 处理 |
| --- | --- | --- |
| $\{I_1,I_2,I_3\}$ | 12、13、23 都频繁 | 保留到 $C_3$ |
| $\{I_1,I_2,I_5\}$ | 12、15、25 都频繁 | 保留到 $C_3$ |
| $\{I_1,I_3,I_5\}$ | 35 不频繁 | 剪枝 |
| $\{I_2,I_3,I_4\}$ | 34 不频繁 | 剪枝 |
| $\{I_2,I_3,I_5\}$ | 35 不频繁 | 剪枝 |
| $\{I_2,I_4,I_5\}$ | 45 不频繁 | 剪枝 |

保留下来的两个候选计数均为 2：

$$C_3=L_3=\{\{I_1,I_2,I_3\}:2,\ \{I_1,I_2,I_5\}:2\}.$$

#### 5. 第四轮与最终答案

123 与 125 可连接为 1235，但其三子集 135、235 不在 $L_3$，故剪枝后 $C_4=\varnothing$，停止。

最终输出 $L_1\cup L_2\cup L_3$，共 $5+6+2=\boxed{13}$ 个频繁项集。若将连接结果称为“未剪枝候选”，应同时写明哪些在计数前被剪掉。

### English answer pattern

The minimum count is 2. L1 has 5 itemsets, L2 has 6, and L3 contains {I1,I2,I3} and {I1,I2,I5}, each with count 2. C4 is empty after subset pruning.

最小计数为 2。L1 有 5 个项集，L2 有 6 个，L3 包含 {I1,I2,I3} 和 {I1,I2,I5}，各计数为 2。子集剪枝后 C4 为空。

### 计算与内存分析

第 k 轮朴素计数可对每个事务测试全部 $|C_k|$ 候选，约 $O(N|C_k|k)$；需保存候选及计数，约 $O(|C_k|k)$。本题只需三次完整计数扫描。

### 知识点与公式总结

- 支持计数门槛 $q=\lceil N\,min\_sup\rceil$，本题 $N=9$、$min\_sup=0.2$；支持度为 $supp(X)=count(X)/N$。
- Apriori 性质：频繁项集的全部子集都频繁。连接 $L_{k-1}$ 后，任何 $(k-1)$ 子集不频繁的候选都在计数前剪去。
- 按“候选 $C_k$→扫描计数→频繁 $L_k$”逐层列出；停止后合并各层 $L_k$，将剪枝前连接项与实际计数候选区分清楚。


---

<a id="PPT-ARM39"></a>

## PPT-ARM39 · 课件 · DIC 分三块：第一遍扫描时的状态

来源：当前完整七讲课件 · ARM.pdf · Exercise 2 · PDF p.39

状态：完整课件练习；形式：课件计算 / 逐步练习。

### 本题公式 · DIC：阈值与启动后的计数

全库阈值为 $q=\lceil Ns\rceil$。候选 $X$ 从其启动位置开始累计覆盖事务中的 $count_{seen}(X)$，与原全库阈值 $q$ 比较。

“是否达到 $q$”和“是否已扫描完整一圈”是两个判断。已达 $q$ 可以成为方形状态；全库支持计数要到该候选计满一圈后确定。

### 原文

A database has 9 transactions. Let min_sup = 20%. Please present all the frequent itemsets generated by DIC in the first iteration. (Note: partition the data into 3 blocks)

数据库有 9 笔事务。设最小支持度为 20%。请给出 DIC 在第一轮产生的全部频繁项集。（注意：将数据分成 3 块。）

| TID | List of items_IDs |
| --- | --- |
| T100 | I1,I2,I5 |
| T200 | I2,I4 |
| T300 | I2,I3 |
| T400 | I1,I2,I4 |
| T500 | I1,I3 |
| T600 | I2,I3 |
| T700 | I1,I3 |
| T800 | I1,I2,I3,I5 |
| T900 | I1,I2,I3 |

### 逐步解答

#### 1. 写清检查点与四种状态

三个块按原顺序为 T100–T300、T400–T600、T700–T900，每块 3 笔。使用全库最小计数 $q=\lceil9\times0.2\rceil=2$。本题“第一轮”按首次从 T100 扫描到 T900 解释。

虚线圆表示“未达到 2，且还未计满完整数据库”；虚线方表示“已达到 2，但尚未计满完整数据库”；计满完整数据库后转为实线圆或实线方。每到检查点，若某候选的所有直接子集均已是方形状态，则启动它的计数，下一块开始统计。

#### 2. 三个检查点的单项计数

| 已处理事务 | $I_1$ | $I_2$ | $I_3$ | $I_4$ | $I_5$ | 可启动的新候选 |
| --- | --- | --- | --- | --- | --- | --- |
| T100–T300 | 1 | 3 | 1 | 1 | 1 | 只有 $I_2$ 达标，暂不能生成二项候选 |
| T100–T600 | 3 | 5 | 3 | 2 | 1 | 启动 12、13、14、23、24、34 |
| T100–T900 | 6 | 7 | 6 | 2 | 2 | 新启动 15、25、35、45，以及 123 |

上表用 12 简记 $\{I_1,I_2\}$，其他同理。

#### 3. 在第 6 笔以后启动的二项候选

这些候选在本遍只统计了 T700、T800、T900：

| 候选 | 12 | 13 | 14 | 23 | 24 | 34 |
| --- | --- | --- | --- | --- | --- | --- |
| 本遍累计数 | 2 | 3 | 0 | 2 | 0 | 0 |
| 第 9 笔状态 | 虚线方 | 虚线方 | 虚线圆 | 虚线方 | 虚线圆 | 虚线圆 |

12、13、23 都已成为方形，因此可在第 9 笔检查点启动 123，其初始计数为 0。新启动的 15、25、35、45 同样尚未计数。

#### 4. 第一遍结束到底能报告什么

已完成全库计数并确认的频繁项集是五个单项：

$$\{I_1\}:6,\ \{I_2\}:7,\ \{I_3\}:6,\ \{I_4\}:2,\ \{I_5\}:2.$$

12、13、23 已达到门槛，说明它们确实频繁，但当前局部计数还不是全库支持计数；它们继续循环计数。14、24、34 本遍的 0 只来自最后一块。例如 24 在前两块出现两次，所以第一遍结束时不能把它删掉。后续运行到全部候选均计满全库，最终频繁项集与 Apriori 相同，共 13 个。

#### 5. 本题关键点

DIC 在数据库扫描途中动态启动新候选，让不同长度的候选重叠计数。判断是否计满一圈时，从该候选自己的启动位置计起。

### English answer pattern

After the first full pass, all five singletons are confirmed frequent. Pairs 12,13,23 have already reached the count threshold but have only been counted over the final block. Continue circular counting to obtain complete supports.

第一遍完整扫描后，五个单项都已确认为频繁。二项集 12、13、23 已达到计数阈值，但只统计了最后一块。继续循环计数才能得到完整支持计数。

### 计算与内存分析

块长控制检查频率和候选的同时驻留量。需保存每个活动候选的计数、状态、起始检查点与已扫描长度；减少全库遍数通常以更多同时活动候选为代价。

### 知识点与公式总结

- DIC 仍使用全库门槛 $q=\lceil9\times0.2\rceil=2$，每处理 3 笔事务到达一个检查点。
- 圆/方表示未达/已达门槛，虚/实线表示尚未/已经计满全库；子集都为方形时，才在检查点启动更长候选。
- 每个候选从自己的启动位置计满一圈；第一遍末的部分计数不是全库计数，未达门槛但尚未计满一圈的候选仍需继续统计。
