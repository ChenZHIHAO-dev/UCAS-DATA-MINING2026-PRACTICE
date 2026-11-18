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

(a) $8N^2=8×10^{12}$ B=8 TB；下三角约4 TB，不含容器开销。

(b) $NK$ bits，转为字节 $NK/8=1.25×10^{11}$ B=125 GB。每个不同取值对应一条长 N 位的向量，所以共有 NK 位。

(c) $10^6×50×(4+4)=4×10^8$ B=400 MB。完整 float32 用户相似度矩阵则需4 TB；Top-K降低存储，但精确构建邻居仍可能耗费大量计算。

十进制 GB=10^9 B，GiB=2^30 B。Python对象、指针、对齐、索引与临时工作区会额外占空间，估计进程峰值时也要计入这些结构。

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

候选数 $\binom{10000}{2}=49,995,000$。按每条16B，约799,920,000B=799.92MB≈762.863MiB，哈希桶/对象头等开销另计。

FP-tree 主树节点最多接近保留后所有事务总长度；共享前缀少则压缩有限。递归条件树和输出频繁项集可能很大。m项全共同出现时，非空频繁项集达2^m−1，任何显式列出算法都有输出成本下界。

因此比较时分别说扫描次数、CPU、主树与条件树峰值内存、输出规模，不能只答“FP-growth 扫两次，所以 O(N)”。

### English answer pattern

Candidate generation and output can be exponential. Two database scans do not imply linear total computation.

候选生成和输出可能呈指数规模。数据库扫描两次不能推出总计算量为线性。
