# DBSCAN、BIRCH 与网格

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=density)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="SUP-DBSCAN"></a>

## SUP-DBSCAN · 补充计算：核心、边界、噪声与可达

来源：当前完整七讲课件 · clustering.pdf pp.58–60 · PDF p.58；整理者补充变式 · 一维自设数据

状态：完整；形式：补充变式。

### 原题 / 转录整理

Run DBSCAN on {0,0.1,0.2,1,1.1,3}, ε=0.15, MinPts=3, including each point itself in its neighborhood. Label core, border and noise points.

### 第一步：中文翻译与条件

按含自身的邻域计数，找核心点、边界点和最终噪声，并给出簇。

### 逐步解答

邻域：N(0)={0,.1}，N(.1)={0,.1,.2}，N(.2)={.1,.2}，N(1)={1,1.1}，N(1.1)={1,1.1}，N(3)={3}。

唯一核心点 .1；0、.2 为其边界点，组成一个簇。1、1.1、3 最终为噪声。1 与1.1 虽然互为邻居，但没有核心点，不形成满足 MinPts 的密度簇。

若先访问0，其“噪声”只是暂时标签，之后应能被 .1 吸收到簇。直接可达从核心点指向邻域点，不是只要相距≤ε就双向可达。

### English answer pattern

Only 0.1 is core. Points 0 and 0.2 are border points; the others remain noise.

### 计算与内存分析

不使用有效索引时 N 次范围查询最坏 O(N²d)；全部邻域一次物化最坏 O(N²) 内存。


---

<a id="SL-BIRCH"></a>

## SL-BIRCH · BIRCH：CF 可加性和半径计算

来源：当前完整七讲课件 · clustering.pdf pp.45–49 · PDF p.45

状态：完整；形式：计算 / 推导。

### 原题 / 转录整理

For points (3,4),(2,6),(4,5),(4,7),(3,8), compute CF=(N,LS,SS), centroid, RMS radius and RMS pairwise diameter.

### 第一步：中文翻译与条件

计算聚类特征、中心、均方根半径与课件定义的均方根直径；SS 按坐标平方分别求和。

### 逐步解答

N=5，LS=(16,30)，SS=(54,190)；总平方和 S2=244。中心 μ=(3.2,6)。

$R^2=S2/N−∥LS/N∥²=48.8−46.24=2.56$，R=1.6。

$D^2=(2NS2−2∥LS∥²)/(N(N−1))=6.4$，D≈2.529822。

两个不交子簇的 CF 分量直接相加，故可增量更新而不用保存所有点。这里的直径是 RMS，不是最远点对距离；SS 是向量时应先对各坐标求和再代入范数公式。

### English answer pattern

Clustering features are additive sufficient summaries for the stated centroid and dispersion formulas.

### 计算与内存分析

一个 CF 存 O(d) 个数；合并和更新 O(d)，整树扫描成本另受树高与分支数影响。


---

<a id="SL-STING"></a>

## SL-STING · 课件问答：STING 四方面评论

来源：当前完整七讲课件 · clustering.pdf pp.69–70 · PDF p.69

状态：完整；形式：课件可考简答。

### 原题 / 转录整理

Comment on STING in terms of cluster shape, computational complexity, cluster quality and incremental clustering.

### 第一步：中文翻译与条件

从簇形状、成本、质量与增量更新四方面评价 STING。

### 逐步解答

形状：矩形网格并集近似边界，斜线/曲线只能阶梯表示。复杂度：构建统计需扫 N 个点，固定维数约 O(N)，预先建好后查询约 O(G)，G 为底层网格数。质量：粒度粗会丢失结构，格子细则成本高，还依赖统计分布与阈值。增量：新点更新所属单元和祖先统计，可避免每次重建全库。

高维时每维 b 格共有 b^d 个组合，网格指数膨胀；不能把“查询依赖格数而非点数”理解为绝对可扩展。

### English answer pattern

STING trades spatial resolution for storage and query work. Its boundaries follow the grid.
