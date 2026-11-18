# 分布式与数据流设计

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=distributed)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E16-06"></a>

## E16-06 · 2016：分布式全局关联规则

来源：2016 年扫描卷 · Q6 / 15 points · PDF p.2

状态：完整；形式：算法设计 / 证明。

### 原题 / 转录整理

A large store has transaction databases at four locations. Propose an efficient algorithm to mine global association rules without shipping all data to one site or causing excessive network communication.

### 第一步：中文翻译与条件

四个站点保存同格式事务，设计分布式全局频繁项集/规则算法；原始数据留在本地，控制通信。

### 逐步解答

采用 partition/SON 思路。设站点 p 的事务数 Np，全局 N=ΣNp，最小支持比例 s。

```text
for each site p in parallel:
    Lp = mine_local_frequent_itemsets(Dp, ceil(s*Np))
    send Lp to coordinator
C = union_p Lp
broadcast C to all sites
for each site p in parallel:
    countp[X] = exact local transaction count for each X in C
    send countp to coordinator
L = {X in C: sum_p countp[X] >= ceil(s*N)}
generate rules from L and filter by min_conf
```

**完备性证明：**若 X 在每站点的支持比例都 <s，则 Σcountp(X)<sΣNp，即全局也不频繁。逆否命题：全局频繁项集至少在一处局部频繁，因此候选并集不会漏掉它。局部阈值必须按各站点的 Np 换算；不能给每个站点同一个全局整数阈值。

只交换项集和计数；若候选太大，可按长度批次、压缩编码、先过滤已知低计数候选，但要保留正确性。生成全局规则需全局支持计数，不能平均各站点 confidence。

### English answer pattern

Union all locally frequent itemsets, count that union globally, then generate rules from global counts. Every globally frequent itemset is locally frequent somewhere.

### 易错点与约定

局部频繁不保证全局频繁；第二阶段精确验证不能省。局部挖掘可能需要多轮内存操作，不能称整个算法只有两次 CPU 操作。

### 计算与内存分析

通信约 O(Σp|Lp|·平均项集长度 + P|C|·平均项集长度 + P|C| 计数)，不传 O(N·平均篮长) 原数据。候选过多时仍可能昂贵。


---

<a id="E17-08"></a>

## E17-08 · 2017：分布式同步 K-means

来源：2017 年扫描卷 · Q8 / 16 points · PDF p.3

状态：完整；形式：算法设计 / 伪代码。

### 原题 / 转录整理

A large database is distributed among four locations. Propose an efficient K-means algorithm in pseudocode without moving all data to one site or excessive network overhead.

### 第一步：中文翻译与条件

各站点保留本地数据，协调者只收发聚类统计量，得到等价于集中式同轮分配的中心更新。

### 逐步解答

所有站点必须使用同一组初始中心、同样的缩放与平局规则。

```text
choose global centroids mu[1..k]
repeat:
    broadcast mu to every site
    for each site p in parallel:
        countp[j]=0; sump[j]=zero_vector for all j
        for x in local Dp:
            j = argmin_j squared_distance(x, mu[j])
            countp[j] += 1
            sump[j] += x
        send countp and sump
    for j in 1..k:
        n[j] = sum_p countp[j]
        if n[j] > 0: new_mu[j] = sum_p sump[j] / n[j]
        else: apply a declared empty-cluster policy
until centroid shift <= tolerance or max_iterations reached
```

更新全局中心时用点数加权：ΣNp,j μp,j /ΣNp,j。直接平均局部均值错误，例如站点A一人均值0、站点B九人均值10，全局为9，不是5。各站点不能各自收敛后直接合并中心，否则不同局部簇编号与分配条件可能不一致。

### English answer pattern

Broadcast shared centroids and reduce per-cluster counts and coordinate sums. Compute weighted global means.

### 计算与内存分析

t轮：站点p计算 O(tNp kd)，每轮总通信 O(Pkd) 个数；每站工作区 O(kd)，原数据若存内存另需 O(Np d)。


---

<a id="E20-07"></a>

## E20-07 · 2020：单遍数据流聚类与演化

来源：2020 年扫描卷 · Q7 / 15 points · PDF p.3

状态：完整；形式：算法设计 / 伪代码。

### 原题 / 转录整理

A data stream is continuous, ordered, fast-changing and possibly infinite. Present a K-means-based efficient single-scan clustering algorithm that discovers clusters and provides their evolution, in pseudocode.

### 第一步：中文翻译与条件

数据只能看一遍，且可能无限。设计基于 K-means 的在线聚类，并记录簇随时间变化；不能无限保存所有历史点。

### 逐步解答

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

在线更新 μ←μ+(x−μ)/(n+1) 是无衰减固定簇的特例；历史样本不再重新分配，因此与多遍 Lloyd 并不等价。原网上回忆建议的距离阈值只是可行设计方向，这里补上预算、漂移和演化记录。

### English answer pattern

Maintain bounded cluster summaries, update each incoming point once, and retain bounded time snapshots to track evolution.

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

### 完整英文题干 / Reconstructed problem

A store’s transaction database is horizontally distributed among four sites $D_1,\ldots,D_4$ with the same item universe. Site p contains $N_p>0$ transactions; $N=\sum_{p=1}^{4}N_p$. Let the minimum support be $s\in(0,1]$ and minimum confidence be $c\in(0,1]$. Thresholds include equality.

Design an algorithm that outputs all globally frequent itemsets and all global association rules meeting these thresholds, without shipping all raw transactions to a central site.

Give **(a)** pseudocode with local and global thresholds, **(b)** a correctness argument, and **(c)** an explanation of the communicated data, database access and candidate-memory costs. It is sufficient to present an algorithm outline; no numerical transaction database is required.

### 第一步：中文翻译与条件

四站点按事务横向分库，商品编码一致。给出在本地挖掘、全局精确验证并生成强规则的算法，证明不会漏掉全局频繁集，最后分析通信、扫描和候选内存。

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

局部库大小可能不同，不能给四站点都套全局整数阈值 q。

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

| Resource | What is actually needed |
| --- | --- |
| 上传候选 | 发送 $L_p$ 的项集编码与本地库大小；不是每笔事务。 |
| 广播 | 全局并集 C 的项集编码；候选多时可以按长度分批。 |
| 上传计数 | 每站点对 C 的精确计数向量，共约 $4\|C\|$ 个计数。 |
| 内存 | 每站点需本地挖掘工作区及候选/计数器；协调者需 C、全局计数和输出。 |
| 扫描 | 第一阶段本地挖掘可能有多轮扫描/内存遍历；第二阶段至少一次本地精确重数，不能把它简化为两次 CPU 运算。 |

令 $\ell$ 为候选平均项集长度，候选上传约 $O(\ell\sum_p|L_p|)$，广播约 $O(4\ell|C|)$，回传计数约 $O(4|C|)$。候选爆炸时通信、内存及规则输出仍可能很大；优势是原始事务留在本地。

保存候选编码和计数器需 $O((\ell+1)|C|)$，本地挖掘工作区和输出另计。令 $B_p=\sum_{t\in D_p}|t|$ 为站点 p 的总篮长。逐笔建立哈希集合再逐候选检查包含关系，重数的期望时间可写 $O(B_p+N_p|C|\ell)$；更好的候选索引可减少实际检查，但不能只按扫描次数评价 CPU 时间。朴素规则枚举还要处理 $\sum_{F\in L,\,|F|\ge2}(2^{|F|}-2)$ 个前件选择。

#### 5. 规则用全局计数

$$\begin{aligned}
supp(A\Rightarrow H)&=\frac{n(A\cup H)}{N},\\[6pt]
conf(A\Rightarrow H)&=\frac{n(A\cup H)}{n(A)}.
\end{aligned}$$

不能平均各站点的 confidence 代替这个比例，也不能只让协调者统计“在哪几个站点出现过”。

### English answer pattern

Mine locally with threshold ceil(sNp), union the local frequent itemsets, and recount every candidate globally. Any globally frequent itemset must be frequent at some site. Generate rules from global counts, and communicate itemsets and count vectors rather than raw transactions.

### 易错点与约定

这是一道算法设计题，完成伪代码、证明和代价分析即可；不要求虚构一套数据库再手算所有规则。
