# 复杂度与内存估算

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=cost)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="SUP-COST"></a>

## SUP-COST · 内存计算：距离矩阵、位图与邻居列表

来源：整理者补充变式 · 依据各章算法分析自设数量级

状态：完整；形式：补充变式 / 内存。

### 原题 / 转录整理

Estimate storage for: (a) a full float64 pairwise matrix for N=10^6; (b) uncompressed bitmaps for N=10^8,K=10^4; (c) top-50 user neighbors for 10^6 users, 4-byte IDs and 4-byte weights.

### 第一步：中文翻译与条件

分别估计全对距离矩阵、未压缩位图与定长邻居列表的字段内存，区分字节和比特。

### 逐步解答

(a) $8N^2=8×10^{12}$ B=8 TB；下三角约4 TB，不含容器开销。

(b) $NK$ bits，转为字节 $NK/8=1.25×10^{11}$ B=125 GB。位图不是每个值只存一个bit，而是每个值存 N 个bit。

(c) $10^6×50×(4+4)=4×10^8$ B=400 MB。完整 float32 用户相似度矩阵则需4 TB；Top-K降低存储，但精确构建邻居仍可能耗费大量计算。

十进制 GB=10^9 B，GiB=2^30 B。Python对象、指针、对齐、索引与临时工作区会额外占空间，字段估算不是进程实际峰值。

### English answer pattern

Convert bits to bytes explicitly and separate numeric payloads from implementation overhead.


---

<a id="SUP-APR-COST"></a>

## SUP-APR-COST · Apriori 候选爆炸与 FP-tree 内存

来源：整理者补充变式 · 依据 ARM 的复杂度分析

状态：完整；形式：补充变式 / 复杂度。

### 原题 / 转录整理

With m=10,000 frequent singleton items, how many candidate pairs are possible? If each pair counter record uses 16 bytes, estimate its payload. Explain why FP-growth is not guaranteed to use tiny memory.

### 第一步：中文翻译与条件

计算所有二项候选数量与存储，并解释 FP-growth 的最坏空间与输出压力。

### 逐步解答

候选数 $\binom{10000}{2}=49,995,000$。按每条16B，约799,920,000B=799.92MB≈762.863MiB，哈希桶/对象头等开销另计。

FP-tree 主树节点最多接近保留后所有事务总长度；共享前缀少则压缩有限。递归条件树和输出频繁项集可能很大。m项全共同出现时，非空频繁项集达2^m−1，任何显式列出算法都有输出成本下界。

因此比较时分别说扫描次数、CPU、主树与条件树峰值内存、输出规模，不能只答“FP-growth 扫两次，所以 O(N)”。

### English answer pattern

Candidate generation and output can be exponential. Two database scans do not imply linear total computation.
