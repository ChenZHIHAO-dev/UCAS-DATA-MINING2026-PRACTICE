# 混合属性与距离

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=distance)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="SL-CL23"></a>

## SL-CL23 · 课件：混合属性不相似度矩阵

来源：当前完整七讲课件 · clustering.pdf · Exercise 1；pp.24–25 解答 · PDF p.23

状态：完整；形式：计算 / 推导。

### 原文

Compute the dissimilarity matrix for nominal Test-1, ordinal Test-2 and ratio Test-3.

计算由名义型 Test-1、有序型 Test-2、比率尺度型 Test-3 组成的数据的相异度矩阵。

| ID | Test-1 | Test-2 | Test-3 |
| --- | --- | --- | --- |
| 1 | A | excellent | 445 |
| 2 | B | fair | 22 |
| 3 | C | good | 164 |
| 4 | A | excellent | 1210 |

Test-2 的取值 excellent、fair、good 分别为优秀、一般、良好。

### 逐步解答

#### 1. 三种属性分别转换

- Test-1 为名义属性（nominal）：相同为 0，不同为 1。
- Test-2 为有序属性（ordinal）：$fair<good<excellent$，排名 $r=1,2,3$，映射 $z=(r-1)/(3-1)$，所以四个对象得到 $(1,0,0.5,1)$。
- Test-3 为比例属性（ratio）：课件先取对数，再按范围缩放。使用课件先行舍入的结果 $(0.75,0,0.5,1)$；保持精确对数时公式为

$$z_i=\frac{\log x_i-\log22}{\log1210-\log22}.$$

#### 2. 用等权平均合成混合距离

没有缺失值时，三个属性各占 $1/3$：

$$d(i,j)=\frac{d_{\mathrm{nom}}(i,j)+|z_{i,\mathrm{ord}}-z_{j,\mathrm{ord}}|+|z_{i,\mathrm{ratio}}-z_{j,\mathrm{ratio}}|}{3}.$$

例如对象 1 和 2：A/B 不同，名义距离为 1；excellent/fair 距离为 1；比例属性距离为 0.75：

$$d(1,2)=\frac{1+1+0.75}{3}=\frac{11}{12}.$$

对象 1 和 4 的前两属性相同，只有比例属性相差 0.25：

$$d(1,4)=\frac{0+0+0.25}{3}=\frac1{12}.$$

#### 3. 最终矩阵

| 对象 | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| 1 | $0$ | $11/12$ | $7/12$ | $1/12$ |
| 2 | $11/12$ | $0$ | $2/3$ | $1$ |
| 3 | $7/12$ | $2/3$ | $0$ | $2/3$ |
| 4 | $1/12$ | $1$ | $2/3$ | $0$ |

矩阵应对称，主对角线为 0。以上采用课件舍入口径；保留精确对数会使部分数值略有变化。若某对对象有缺失属性，只平均该对象对可比较的属性。


### English answer pattern

Normalize attribute-specific dissimilarities to comparable scales before averaging.

先把各属性相异度归一化到可比较尺度，再取平均。

### 计算与内存分析

N 个对象、d 个属性的全对矩阵 O(N²d) 时间、O(N²) 存储。


---

<a id="PPT-CL59"></a>

## PPT-CL59 · 课件 · 一维 kNN：1、3、5 邻居投票

来源：当前完整七讲课件 · classification.pdf · Exercise 1 · PDF p.59

状态：完整课件练习；形式：课件计算 / 逐步练习。

### 原文

Consider the one-dimensional data set. Please classify the data point x=5.0 according to its 1-, 3-, and 5-nearest neighbors (using majority vote).

考虑此一维数据集。请用多数投票，分别根据 1、3、5 个最近邻对数据点 x=5.0 分类。

| $x$ | $y$ |
| --- | --- |
| 0.5 | - |
| 3.0 | - |
| 4.5 | + |
| 4.6 | + |
| 4.9 | + |
| 5.2 | - |
| 5.3 | - |
| 5.5 | + |
| 7.0 | - |
| 9.5 | - |

### 逐步解答

#### 1. 计算距离并排序

一维欧氏距离为 $d(x,5)=|x-5|$。先算所有距离，再从小到大选择前 $k$ 个点。

| 邻居次序 | $x$ | 类别 | $|x-5|$ |
| --- | --- | --- | --- |
| 1 | 4.9 | + | 0.1 |
| 2 | 5.2 | - | 0.2 |
| 3 | 5.3 | - | 0.3 |
| 4 | 4.6 | + | 0.4 |
| 5 | 4.5 | + | 0.5 |
| 6 | 5.5 | + | 0.5 |
| 7 | 3.0 | - | 2.0 |
| 8 | 7.0 | - | 2.0 |
| 9 | 0.5 | - | 4.5 |
| 10 | 9.5 | - | 4.5 |

#### 2. 按 k 取前缀并投票

| $k$ | 选出的标签 | 正类票数 | 负类票数 | 预测 |
| --- | --- | --- | --- | --- |
| 1 | $+$ | 1 | 0 | $\boxed{+}$ |
| 3 | $+,-,-$ | 1 | 2 | $\boxed{-}$ |
| 5 | $+,-,-,+,+$ | 3 | 2 | $\boxed{+}$ |

第 5 与第 6 邻居同距 0.5、标签均为正，任取一个不会影响 $k=5$ 的结果。$k$ 改变参与投票的局部范围，预测可能随之改变。

#### 3. 答题步骤

写距离公式 → 列距离与标签 → 取前 k 项 → 数票 → 写类别。kNN 直接用训练样本作为参考，无须先拟合一条回归直线。

### English answer pattern

The predicted labels for k=1,3,5 are positive, negative and positive, respectively. Sort the absolute distances to 5.0 and use majority vote.

k=1、3、5 的预测标签依次为正、负、正。将各点到 5.0 的绝对距离排序，再多数投票。

### 计算与内存分析

朴素单次查询计算 $n$ 个 $d$ 维距离需 $O(nd)$ 时间；全排序再取邻居需 $O(n\log n)$，维护大小为 k 的最大堆可将选择部分控制为 $O(n\log k)$。
