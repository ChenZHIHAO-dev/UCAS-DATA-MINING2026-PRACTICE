# 复杂度与内存估算

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=cost)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="SUP-COST"></a>

## SUP-COST · 内存计算：距离矩阵、位图与邻居列表

来源：整理者补充变式 · 依据各章算法分析自设数量级

状态：完整；形式：补充变式 / 内存。

### 原文

Estimate storage for: (a) a full float64 pairwise matrix for N=10^6; (b) uncompressed bitmaps for N=10^8,K=10^4; (c) top-50 user neighbors for 10^6 users, 4-byte IDs and 4-byte weights.

估计以下存储：（a）N=10⁶ 的完整 float64 两两矩阵；（b）N=10⁸、K=10⁴ 的未压缩位图；（c）为 10⁶ 个用户分别保存前 50 个邻居，编号与权重各占 4 字节。

### 逐步解答

#### 1. 存储估算的统一方法

先确定记录个数，再乘每条占用字节；bit 转 byte 时除以 8。本题采用十进制单位 $1\,MB=10^6B$、$1\,GB=10^9B$、$1\,TB=10^{12}B$。

#### 2. 完整两两距离矩阵

$N\times N$ 个 float64，每个 8 字节：

$$M=8N^2=8(10^6)^2=8\times10^{12}B=\boxed{8\,TB}.$$

若只存严格下三角，则约 $8N(N-1)/2\approx4\,TB$。对角线和对称性可省存储，但完整矩阵仍随 N 平方增长。

#### 3. 未压缩位图

K 个取值各有一条 N 位的向量，共 NK 位：

$$M=\frac{NK}{8}=\frac{10^8\times10^4}{8}=1.25\times10^{11}B=\boxed{125\,GB}.$$

#### 4. Top-50 邻居表

每用户 50 条记录，每条为 4 字节 ID 加 4 字节权重：

$$M=N\times50\times(4+4)=10^6\times50\times8=4\times10^8B=\boxed{400\,MB}.$$

完整 float32 相似度矩阵则需 $4N^2=4\,TB$。只保留 Top-K 可大幅节省结果存储；精确找出这些邻居仍需额外计算。以上为数据载荷，实际进程还需容器、索引、对齐和临时工作区。


### English answer pattern

Convert bits to bytes explicitly and separate numeric payloads from implementation overhead.

明确将位转换为字节，并区分数值有效载荷与实现开销。


---

<a id="SUP-APR-COST"></a>

## SUP-APR-COST · Apriori 候选爆炸与 FP-tree 内存

来源：整理者补充变式 · 依据 ARM 的复杂度分析

状态：完整；形式：补充变式 / 复杂度。

### 原文

With m=10,000 frequent singleton items, how many candidate pairs are possible? If each pair counter record uses 16 bytes, estimate its payload. Explain why FP-growth is not guaranteed to use tiny memory.

m=10000 个频繁单项时，可能有多少候选对？若每对的计数记录使用 16 字节，估计其有效载荷。解释为何不能保证 FP-growth 内存很小。

### 逐步解答

#### 1. 候选二项集数量

每对不同单项构成一个无序候选，所以使用组合数：

$$|C_2|=\binom m2=\frac{m(m-1)}2=\frac{10000\times9999}2=\boxed{49{,}995{,}000}.$$

#### 2. 候选计数器占用

每条 16 字节，载荷为

$$M=16\times49{,}995{,}000=799{,}920{,}000B=\boxed{799.92\,MB}\approx762.863\,MiB.$$

这里 $1\,MiB=2^{20}B$。哈希桶、指针及对象头会使实际峰值更高。

#### 3. FP-growth 的内存从哪里来

FP-tree 共享有序事务的共同前缀。令 $B=\sum_t|t'|$ 为过滤后事务总长度，最坏可接近 B 个树节点；头表、节点链和递归条件树另外占内存。当事务彼此前缀很少共享时，压缩效果较弱。

若 m 个物品总是共同出现，则非空频繁项集共有

$$2^m-1.$$

主树虽可压成一条长路径，显式输出仍为指数规模。因此评价时分别比较候选数、扫描次数、CPU、树与条件树的峰值内存，以及最终输出量。


### English answer pattern

Candidate generation and output can be exponential. Two database scans do not imply linear total computation.

候选生成和输出可能呈指数规模。数据库扫描两次不能推出总计算量为线性。
