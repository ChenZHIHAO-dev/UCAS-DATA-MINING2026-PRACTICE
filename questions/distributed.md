# 分布式与数据流设计

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=distributed)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E16-06"></a>

## E16-06 · 2016：分布式全局关联规则

来源：2016 年扫描卷 · Q6 / 15 points · PDF p.2

状态：完整；形式：算法设计 / 证明。

### 原文

A large store has transaction databases at four locations. Propose an efficient algorithm to mine global association rules without shipping all data to one site or causing excessive network communication.

大型商店在四个地点保存事务数据库。提出高效算法，在不将全部数据运到单站点、且不造成过大网络通信的情况下，挖掘全局关联规则。

### 逐步解答

#### 本题公式

设第 p 站有 $N_p$ 笔事务，总数 N，支持度比例阈值为 s：

$$N=\sum_pN_p,\qquad q_p=\lceil sN_p\rceil,\qquad q=\lceil sN\rceil.$$

第 p 站的计数为 $n_p(X)$，全局计数为 $n(X)=\sum_p n_p(X)$。规则用全局计数：

$$supp(A\Rightarrow B)=\frac{n(A\cup B)}N,\qquad conf(A\Rightarrow B)=\frac{n(A\cup B)}{n(A)}.$$

#### 1. 两阶段挖掘算法

1. 各站点用本地阈值 $q_p$ 独立挖出 $L_p$，只发送项集编码及 $N_p$。
2. 协调者取候选并集 $C=\bigcup_p L_p$，广播 C。
3. 每站重新扫描本地事务，精确统计每个候选的 $n_p(X)$，回传计数向量。
4. 协调者求和，保留 $L=\{X\in C:n(X)\ge q\}$。
5. 对每个 $F\in L$ 枚举非空真子集 A，令后件 $B=F\setminus A$；按置信度阈值过滤后输出。

#### 2. 为什么候选不会漏掉全局频繁项集

若 X 在所有站点都低于局部比例阈值，则

$$n(X)=\sum_p n_p(X)<\sum_p sN_p=sN.$$

因此 X 在全局也不频繁。逆否命题说明全局频繁项集至少在一处局部频繁，所以进入并集 C。局部频繁只是候选，第二遍全局精确计数用于排除误入项集。

#### 3. 资源分析与最终输出

四站点上传候选、接收候选并集，再各回传 $|C|$ 个计数；全程原始事务留在本地。设候选平均长度为 $\ell$，候选与计数器载荷约 $O((\ell+1)|C|)$。本地挖掘本身可能需要多轮扫描，另需一次候选重数；候选和规则数量仍可能很大。

输出全局 L 及满足全局支持度、全局置信度的规则。各站点置信度的简单平均不能替代全局计数之比。


### English answer pattern

Union all locally frequent itemsets, count that union globally, then generate rules from global counts. Every globally frequent itemset is locally frequent somewhere.

合并全部局部频繁项集，对并集进行全局计数，再根据全局计数生成规则。每个全局频繁项集必在某个站点局部频繁。

### 易错点与约定

局部频繁不保证全局频繁；第二阶段精确验证不能省。局部挖掘可能需要多轮内存操作，不能称整个算法只有两次 CPU 操作。

### 计算与内存分析

通信约 O(Σp|Lp|·平均项集长度 + P|C|·平均项集长度 + P|C| 计数)，不传 O(N·平均篮长) 原数据。候选过多时仍可能昂贵。


---

<a id="E17-08"></a>

## E17-08 · 2017：分布式同步 K-means

来源：2017 年扫描卷 · Q8 / 16 points · PDF p.3

状态：完整；形式：算法设计 / 伪代码。

### 原文

A large database is distributed among four locations. Propose an efficient K-means algorithm in pseudocode without moving all data to one site or excessive network overhead.

大型数据库分布于四个地点。用伪代码提出高效 K-means 算法，避免把全部数据移到单站点或造成过大网络开销。

### 逐步解答

#### 本题公式

第 p 站对第 j 簇只汇报点数和向量和：

$$n_{pj}=|C_{pj}|,\qquad S_{pj}=\sum_{x\in C_{pj}}x.$$

全局新中心由总和除以总点数：

$$\mu_j^{new}=\frac{\sum_p S_{pj}}{\sum_p n_{pj}}=\frac{\sum_p n_{pj}\mu_{pj}}{\sum_p n_{pj}}.$$

#### 1. 同步迭代算法

1. 初始化同一套 k 个中心，并广播至四站点。各站采用同一尺度、距离与平局规则。
2. 各站把本地每个点分配到最近的当前中心，同时累计每簇 $n_{pj},S_{pj}$。
3. 上传这两种摘要；协调者按上式求新的全局中心。
4. 若全局某簇为空，执行事先声明的保留旧中心或重置策略。
5. 广播新中心，重复直到中心最大位移不超过 $\varepsilon$，或达到迭代上限：

$$\max_j\|\mu_j^{new}-\mu_j^{old}\|_2\le\varepsilon.$$

#### 2. 为什么需要按点数加权

站点 A 的某簇只有 1 点、局部均值 0；站点 B 有 9 点、均值 10，则

$$\mu^{new}=\frac{1\times0+9\times10}{1+9}=9.$$

局部均值简单平均得到 5，忽略了样本数量。因此要传“和与计数”，并让全部站点用同一轮旧中心完成分配。

#### 3. 通信、计算与内存

每轮每站上传 k 个 d 维和以及 k 个计数，广播 k 个 d 维中心，通信量为 $O(4kd)$。第 p 站计算距离的时间为 $O(N_pk d)$；若数据流式读取，除原始数据外，累计摘要只需 $O(kd)$ 内存。


### English answer pattern

Broadcast shared centroids and reduce per-cluster counts and coordinate sums. Compute weighted global means.

广播共享质心，归约各簇的计数和坐标和，计算加权全局均值。

### 计算与内存分析

t轮：站点p计算 O(tNp kd)，每轮总通信 O(Pkd) 个数；每站工作区 O(kd)，原数据若存内存另需 O(Np d)。


---

<a id="E20-07"></a>

## E20-07 · 2020：单遍数据流聚类与演化

来源：2020 年扫描卷 · Q7 / 15 points · PDF p.3

状态：完整；形式：算法设计 / 伪代码。

### 原文

A data stream is continuous, ordered, fast-changing and possibly infinite. Present a K-means-based efficient single-scan clustering algorithm that discovers clusters and provides their evolution, in pseudocode.

数据流连续、有序、快速变化，且可能无限。用伪代码给出一种基于 K-means 的高效单遍聚类算法，发现簇并提供簇的演化。

### 逐步解答

#### 本题公式

每个在线簇维护有效点数 n、向量和 LS、平方和 SS。无衰减时，加入新点 x：

$$\begin{aligned}
n'&=n+1, &LS'&=LS+x, &SS'&=SS+x\odot x,\\
\mu'&=\frac{LS'}{n'}=\mu+\frac{x-\mu}{n+1}.
\end{aligned}$$

这里 $x\odot x$ 表示各坐标分别平方；簇内平方误差可由摘要计算：

$$SSE=\sum_r SS_r-\frac{\|LS\|_2^2}{n}.$$

指数衰减因子为 $a=e^{-\lambda\Delta t}$，将 n、LS、SS 同乘 a，再加入新点；旧数据权重会随时间减小。

#### 1. 单遍处理与固定预算

可给一个固定预算的在线摘要方案。每簇保存 n、LS、SS、last_time，中心 μ=LS/n；用指数衰减适应漂移，用固定长度快照环保存演化。

```text
initialize at most Kmax clusters from a small bounded warm-up buffer
for each arriving (x,t):
    decay cluster n,LS,SS by exp(-lambda*(t-last_update))
    j = nearest current centroid to x
    if clusters empty OR distance(x,mu[j]) > radius_threshold:
        create a new cluster if budget permits
        otherwise retire a weak stale cluster or record x as an anomaly
    else:
        n[j]+=1; LS[j]+=x; SS[j]+=x*x
        mu[j]=LS[j]/n[j]
    periodically save cluster IDs,centers,weights,dispersion into a fixed ring
    expire obsolete summaries; record births,deaths and large shifts
```

每点仅处理一次，空间随 Kmax、维数和快照预算固定。衰减时 n 可以为实数，表示有效权重。若采用窗口则须另说明如何移除过期点；只保留 LS/n 不足以精确删除某个已遗忘样本。

在线更新 μ←μ+(x−μ)/(n+1) 是无衰减固定簇的特例；历史样本不再重新分配，因此与多遍 Lloyd 并不等价。固定的摘要数和快照数控制内存；簇 ID、中心轨迹及权重变化用于解释群体的出现、消失和漂移。


### English answer pattern

Maintain bounded cluster summaries, update each incoming point once, and retain bounded time snapshots to track evolution.

维护有界簇摘要，每个新点更新一次；保留有界时间快照来跟踪演化。

### 易错点与约定

“超过阈值就新建簇”若没有簇数上限，遇无限异常流会无限占用内存，不能算完整大数据方案。

### 计算与内存分析

直接找最近中心每点 O(Kmax d)，摘要 O(Kmax d)，保留 H 组快照 O(HKmax d)；H和Kmax固定。


---

<a id="E25-08"></a>

## E25-08 · 2025 · 第8题：四站点的全局关联规则挖掘

来源：2025 年人工智能学院回忆卷 · Q8 · PDF p.2；2025 年人工智能学院回忆卷 · Q8：Partition 方法补充页 · PDF p.3

状态：完整复原练习；形式：回忆复原 / 完整练习。

**复原依据：**回忆明确指出与 2016 最后一道四站点分布式关联规则设计题相同，要求不搬运全部原始数据并避免过量通信。

**补配与口径：**

- 将输入输出、阈值和伪代码/正确性/通信量的答题范围写完整；不需要补一个任意事务大表。

以下为可完整作答的复原练习；补配数值不是原卷原值。

### 原文

A store’s transaction database is horizontally distributed among four sites $D_1,\ldots,D_4$ with the same item universe. Site p contains $N_p>0$ transactions; $N=\sum_{p=1}^{4}N_p$. Let the minimum support be $s\in(0,1]$ and minimum confidence be $c\in(0,1]$. Thresholds include equality.

商店事务数据库水平分布在四个站点，各站物品全集相同。第 p 站包含 $N_p>0$ 笔事务，总数 $N=\sum_{p=1}^{4}N_p$。最小支持度为 $s\in(0,1]$，最小置信度为 $c\in(0,1]$。阈值包含等号。

Design an algorithm that outputs all globally frequent itemsets and all global association rules meeting these thresholds, without shipping all raw transactions to a central site.

设计算法，在不把全部原始事务传到中心站点的情况下，输出全部全局频繁项集及满足阈值的全部全局关联规则。

Give **(a)** pseudocode with local and global thresholds, **(b)** a correctness argument, and **(c)** an explanation of the communicated data, database access and candidate-memory costs. It is sufficient to present an algorithm outline; no numerical transaction database is required.

给出 **(a)** 包含局部与全局阈值的伪代码，**(b)** 正确性论证，**(c)** 通信数据、数据库访问和候选内存成本的说明。给出算法纲要即可，不要求提供数值事务数据库。

### 小问要求与完成标准

| 交付项 | 完整程度 |
| --- | --- |
| 输入与阈值 | 4 个站点 Dp、各自 Np、全局 N，支持比例 s 和置信比例 c。 |
| 伪代码 | 本地挖掘、候选并集、广播、本地精确计数、全局筛选、规则生成六步。 |
| 正确性 | 证明全局频繁项集至少局部频繁一次，并说明为什么需全局复核。 |
| 资源分析 | 传什么、扫库/本地计算代价、候选峰值内存；不要把两阶段说成恒定总时间。 |

### 逐步解答

#### 1. 区分比例阈值与计数阈值

$$N=\sum_{p=1}^{4}N_p,\qquad q_p=\lceil sN_p\rceil,\qquad q=\lceil sN\rceil.$$

其中 $s$ 为支持度比例，$N_p$ 为站点事务数，$q_p$ 为该站点的整数门槛，$q$ 为全局整数门槛。各站点按自己的 $N_p$ 计算 $q_p$。

#### 2. 两阶段伪代码

**Algorithm · Distributed frequent-itemset mining and rule generation**

**Input:** $D_1,\ldots,D_4$, support s, confidence c.

**Output:** global frequent itemsets L and strong rules R.

1. **Local mining.** At each site p, mine $L_p$ with count threshold $q_p=\lceil sN_p\rceil$; send itemsets and $N_p$ to the coordinator.

2. **Candidate union.** The coordinator sets $C=\bigcup_pL_p$ and broadcasts C.

3. **Exact recount.** Each site scans its local transactions and counts $n_p(X)$ for every $X\in C$; send the count vector.

4. **Global filtering.** Set $n(X)=\sum_p n_p(X)$ and $L=\{X\in C:n(X)\ge\lceil sN\rceil\}$.

5. **Rule generation.** For every $F\in L$ with $|F|\ge2$, enumerate nonempty proper antecedents $A\subset F$ and set $H=F\setminus A$.

6. Output $A\Rightarrow H$ when $n(F)/n(A)\ge c$. Its support is $n(F)/N$.

#### 3. 为什么候选并集不会漏

假设某项集 X 在全部站点都不频繁，则整数计数满足

$$n_p(X)<\lceil sN_p\rceil\quad\Longrightarrow\quad n_p(X)<sN_p.$$

求和得到

$$n(X)=\sum_pn_p(X)<s\sum_pN_p=sN,$$

所以 X 不可能全局频繁。取逆否命题：**任何全局频繁项集，至少在一处局部频繁**，因此一定进入 C。

局部频繁也可能只在一个小站点出现，所以 C 只是候选；第二阶段全局精确计数必不可少。生成规则的前件 $A\subset F$ 由 Apriori 性质也全局频繁，其计数可从 L 的全局计数表取得。

#### 4. 通信、扫描与内存

| 资源 | 所需数据与工作 |
| --- | --- |
| 上传候选 | 发送 $L_p$ 的项集编码与本地库大小。 |
| 广播 | 全局并集 C 的项集编码；候选多时可以按长度分批。 |
| 上传计数 | 每站点对 C 的精确计数向量，共约 $4\lvert C\rvert$ 个计数。 |
| 内存 | 每站点需本地挖掘工作区及候选/计数器；协调者需 C、全局计数和输出。 |
| 扫描 | 第一阶段本地挖掘可能有多轮扫描/内存遍历；第二阶段至少一次本地精确重数，不能把它简化为两次 CPU 运算。 |

令 $\ell$ 为候选平均项集长度，候选上传约 $O(\ell\sum_p|L_p|)$，广播约 $O(4\ell|C|)$，回传计数约 $O(4|C|)$。候选爆炸时通信、内存及规则输出仍可能很大；优势是原始事务留在本地。

保存候选编码和计数器需 $O((\ell+1)|C|)$，本地挖掘工作区和输出另计。令 $B_p=\sum_{t\in D_p}|t|$ 为站点 p 的总篮长。逐笔建立哈希集合再逐候选检查包含关系，重数的期望时间可写 $O(B_p+N_p|C|\ell)$；更好的候选索引可减少实际检查，但不能只按扫描次数评价 CPU 时间。朴素规则枚举还要处理 $\sum_{F\in L,\,|F|\ge2}(2^{|F|}-2)$ 个前件选择。

#### 5. 规则用全局计数

$$\begin{aligned}
supp(A\Rightarrow H)&=\frac{n(A\cup H)}{N},\\[6pt]
conf(A\Rightarrow H)&=\frac{n(A\cup H)}{n(A)}.
\end{aligned}$$

先分别累加全局共同计数与全局前件计数，再求二者的比值；这样每笔事务按相同权重参与计算。

### English answer pattern

Mine locally with threshold ceil(sNp), union the local frequent itemsets, and recount every candidate globally. Any globally frequent itemset must be frequent at some site. Generate rules from global counts, and communicate itemsets and count vectors rather than raw transactions.

按 ceil(sNp) 阈值进行本地挖掘，合并本地频繁项集，再对每个候选进行全局计数。每个全局频繁项集必在某站点频繁。根据全局计数生成规则，通信传送项集和计数向量，无须传输原始事务。

### 易错点与约定

这是一道算法设计题，完成伪代码、证明和代价分析即可；不要求虚构一套数据库再手算所有规则。
