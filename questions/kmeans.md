# K-means 迭代与选 K

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=kmeans)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E16-05"></a>

## E16-05 · 2016：初始点 1、2、3 的 K-means

来源：2016 年扫描卷 · Q5 / 15 points · PDF p.2

状态：原卷点数矛盾；按可见六点解；形式：计算 / 推导。

### 原文

Given 8 sample points, perform K-means to generate 3 clusters, initially using points 1,2,3 as centers. List clusters at each iteration. The visible table contains only: (1,1),(1,2),(2,1),(3,4),(3,5),(4,5).

给定 8 个样本点，用 K-means 生成 3 个簇，初始使用点 1、2、3 为中心。列出每轮的簇。可见表只包含 (1,1)、(1,2)、(2,1)、(3,4)、(3,5)、(4,5)。

### 逐步解答

计算采用平方欧氏距离，平局选编号小的中心。

第一轮：C1={1}，C2={2,4,5,6}，C3={3}。点 4 到 C2、C3 的平方距离分别为 8、10，因此归 C2。新中心为 (1,1)、(11/4,4)、(2,1)。

第二轮：C1={1,2}，C2={4,5,6}，C3={3}；中心 (1,1.5)、(10/3,14/3)、(2,1)。第三轮分配不变，停止。

每轮要先用旧中心对全部点分配，再更新；本题给定六点在这条迭代轨迹中不需要距离平局；一般遇平局须声明规则。此解只代表六行表，不声称恢复题面所说八点。

### English answer pattern

The scanned table has six points despite the statement saying eight. Under the stated tie rule, update all centroids after completing each assignment pass.

题干说八点，扫描表实际只有六点。按规定平局规则，完成每次分配后再更新全部质心。


---

<a id="HW3-01"></a>

## HW3-01 · 当前/往届同题：十个三维点

来源：当前 HW3 · Written Q1；往届 HW3（hxd） · Written Q3

状态：完整；形式：计算 / 推导。

### 原文

Cluster the ten 3D points into three clusters using Euclidean distance, initialized at A1,B1,C1. Show first-round centroids and final clusters.

用欧氏距离将十个三维点聚为三个簇，初始中心为 A1、B1、C1。给出第一轮质心及最终簇。

| Point | x | y | z |
| --- | --- | --- | --- |
| A1 | 4 | 2 | 5 |
| A2 | 10 | 5 | 2 |
| A3 | 5 | 8 | 7 |
| B1 | 1 | 1 | 1 |
| B2 | 2 | 3 | 2 |
| B3 | 3 | 6 | 9 |
| C1 | 11 | 9 | 2 |
| C2 | 1 | 4 | 6 |
| C3 | 9 | 1 | 7 |
| C4 | 5 | 6 | 7 |

### 逐步解答

| Point | D² to initial 1 | D² to initial 2 | D² to initial 3 | First cluster |
| --- | --- | --- | --- | --- |
| A1 | 0 | 26 | 107 | 1 |
| A2 | 54 | 98 | 17 | 3 |
| A3 | 41 | 101 | 62 | 1 |
| B1 | 26 | 0 | 165 | 2 |
| B2 | 14 | 6 | 117 | 2 |
| B3 | 33 | 93 | 122 | 1 |
| C1 | 107 | 165 | 0 | 3 |
| C2 | 14 | 34 | 141 | 1 |
| C3 | 30 | 100 | 93 | 1 |
| C4 | 21 | 77 | 70 | 1 |

| Iteration | Cluster 1 | Cluster 2 | Cluster 3 | New centroids |
| --- | --- | --- | --- | --- |
| 1 | A1, A3, B3, C2, C3, C4 | B1, B2 | A2, C1 | (4.5, 4.5, 6.833333); (1.5, 2, 1.5); (10.5, 7, 2) |
| 2 | A1, A3, B3, C2, C3, C4 | B1, B2 | A2, C1 | (4.5, 4.5, 6.833333); (1.5, 2, 1.5); (10.5, 7, 2) |

第一轮中心为 (4.5,4.5,41/6)、(1.5,2,1.5)、(10.5,7,2)。第二轮分配不变，给定初始点下达到稳定。表中用平方距离比较，结果等同于比较欧氏距离，且省去开方。

A/B/C 前缀用于命名数据点。最终簇由坐标距离确定，所以 C3 可以分入以 A1 初始化的簇。

### English answer pattern

Assign by squared Euclidean distance and recompute coordinate-wise means. The second pass leaves assignments unchanged.

按平方欧氏距离分配，再逐坐标重算均值。第二遍分配保持不变。

### 计算与内存分析

一般 O(tNkd)；此题 N=10,k=3,d=3。


---

<a id="E25-06"></a>

## E25-06 · 2025 · 第6题：十个质数的前两轮 K-means

来源：2025 年人工智能学院回忆卷 · Q6 · PDF p.2

状态：完整复原练习；形式：回忆复原 / 完整练习。

**复原依据：**回忆为一维十个排序质数，初始中心 0 和 11；要求前两步迭代过程，以及两轮后的中心和所属簇。

**补配与口径：**

- 采用前十个质数 2,3,5,7,11,13,17,19,23,29。
- 一轮定义为全量分配后统一更新；距离平局选编号小的簇。

以下为可完整作答的复原练习；补配数值不是原卷原值。

### 原文

Use K-means to divide the one-dimensional points

用 K-means 将以下一维点

$$2,3,5,7,11,13,17,19,23,29$$

into two clusters. Initialize the centers at $\mu_1^{(0)}=0$ and $\mu_2^{(0)}=11$. Use Euclidean distance; squared distance may be used for comparisons. Break distance ties by the smaller cluster index.

分成两个簇。初始中心为 0 和 11。使用欧氏距离，比较时可使用平方距离。距离相同时，选择簇编号较小者。

Show **exactly two complete iterations**. In each iteration, assign all points using the old centers, then update both centers. Report the memberships from the second assignment pass and the centers after the second update. Do not iterate to convergence.

展示**恰好两次完整迭代**。每轮使用旧中心分配所有点，再更新两个中心。报告第二次分配后的成员，以及第二次更新后的中心。不要迭代至收敛。

### 小问要求与完成标准

| 交付项 | 写到什么程度 |
| --- | --- |
| 第 1 轮 | 用 (0,11) 分配所有点，写两簇成员和更新均值。 |
| 第 2 轮 | 用第 1 轮的新中心重新分配，写成员和第 2 轮更新均值。 |
| 停止位置 | 只做两轮。第 2 轮更新后不再重分配，否则就是第 3 轮。 |

### 逐步解答

#### 1. 第一轮：用旧中心 0、11 分配

一维两中心分界在中点：

$$b^{(0)}=\frac{0+11}{2}=5.5.$$

| x | $d_1^2=(x-0)^2$ | $d_2^2=(x-11)^2$ | Cluster |
| --- | --- | --- | --- |
| 2 | 4 | 81 | 1 |
| 3 | 9 | 64 | 1 |
| 5 | 25 | 36 | 1 |
| 7 | 49 | 16 | 2 |
| 11 | 121 | 0 | 2 |
| 13 | 169 | 4 | 2 |
| 17 | 289 | 36 | 2 |
| 19 | 361 | 64 | 2 |
| 23 | 529 | 144 | 2 |
| 29 | 841 | 324 | 2 |

$$C_1^{(1)}=\{2,3,5\},\quad C_2^{(1)}=\{7,11,13,17,19,23,29\}.$$
$$\begin{aligned}
\mu_1^{(1)}&=\frac{2+3+5}{3}=\frac{10}{3},\\[6pt]
\mu_2^{(1)}&=\frac{7+11+13+17+19+23+29}{7}=17.
\end{aligned}$$

#### 2. 第二轮：用 10/3、17 重新分配

$$b^{(1)}=\frac{10/3+17}{2}=\frac{61}{6}\approx10.166667.$$

| x | $d_1^2=(x-10/3)^2$ | $d_2^2=(x-17)^2$ | Cluster |
| --- | --- | --- | --- |
| 2 | $\frac{16}{9}$ | 225 | 1 |
| 3 | $\frac{1}{9}$ | 196 | 1 |
| 5 | $\frac{25}{9}$ | 144 | 1 |
| 7 | $\frac{121}{9}$ | 100 | 1 |
| 11 | $\frac{529}{9}$ | 36 | 2 |
| 13 | $\frac{841}{9}$ | 16 | 2 |
| 17 | $\frac{1681}{9}$ | 0 | 2 |
| 19 | $\frac{2209}{9}$ | 4 | 2 |
| 23 | $\frac{3481}{9}$ | 36 | 2 |
| 29 | $\frac{5929}{9}$ | 144 | 2 |

所以 7 从第 2 簇移到第 1 簇，11 仍在第 2 簇：

$$C_1^{(2)}=\{2,3,5,7\},\qquad C_2^{(2)}=\{11,13,17,19,23,29\}.$$
$$\boxed{\mu_1^{(2)}=\frac{17}{4}=4.25.}$$
$$\boxed{\mu_2^{(2)}=\frac{112}{6}=\frac{56}{3}\approx18.666667.}$$

#### 3. 按题目要求停止

上面是第二轮分配得到的成员与第二轮更新得到的中心。再用新中心重新分配就进入**第三轮**。本题在第二次更新后停止。

### English answer pattern

After the first update the centers are 10/3 and 17. After the second assignment, C1={2,3,5,7} and C2={11,13,17,19,23,29}; the updated centers are 17/4 and 56/3. Stop after these two iterations.

第一轮更新后中心为 10/3、17。第二次分配后，C1={2,3,5,7}、C2={11,13,17,19,23,29}；更新后的中心为 17/4、56/3。在这两轮之后停止。

### 易错点与约定

不要边处理某个点边更新中心，那是另一种在线过程。题目只要求两轮；判断收敛需要继续检查分配是否改变。

### 计算与内存分析

直接 Lloyd 实现每轮 $O(Nkd)$，做 $t$ 轮为 $O(tNkd)$；本题 $t=2,N=10,k=2,d=1$。输入占 $O(Nd)$，中心和各簇累加器额外占 $O(kd)$，若保存每点标签还需 $O(N)$。无需存 $N\times k$ 的完整距离表；可逐点比较并保留最小距离。


---

<a id="HX3-LAB3"></a>

## HX3-LAB3 · 雷达信号分选：标准化、SSE 与肘部

来源：往届 HW3（hxd） · Lab 雷达信号分选

状态：完整；形式：作业提炼 / 算法选择。

### 原文

5435 pulse signals have arrival time, frequency, pulse width and arrival angle. Use K-means, excluding arrival time. Try numbers of clusters, iterations and change tolerances; choose K by mean distortions and report assignments.

5435 个脉冲信号具有到达时间、频率、脉宽和到达角。使用 K-means，排除到达时间。尝试不同簇数、迭代次数和变化容差；通过平均失真选择 K，并报告分配结果。

### 逐步解答

1. 按原题排除到达时间。剩余三属性量纲不同，先按训练数据拟合缩放，再聚类；否则 MHz 的数值范围可能主导距离。角度若跨 0°/360°，可按任务语义改用圆周距离或 sin/cos 编码，并说明与普通欧氏的区别。
2. 每个 K 用相同缩放、多个初始化，记录目标值、迭代是否收敛；最大迭代数和容差过松可能只是提前停。
3. SSE=Σ_i∥x_i−μ_{c_i}∥²；原作业定义的 mean distortion=Σ_i∥x_i−μ_{c_i}∥/N，**没有平方**。两者不能混报。
4. K 增大通常使最佳拟合误差下降，所以不能直接选误差最小的最大 K。找下降幅度开始显著放缓的肘部，并结合稳定性、可解释性与业务信号源数量。
5. 原作业配图出现 K=2，是示意，不保证实际数据必然 K=2。本题库不凭图替代重新处理 5435 行数据。

**可算变式：**点 {0,2,10,12}。K=1 中心6，SSE=104、mean distance=5；K=2 分 {0,2}/{10,12}，中心1/11，SSE=4、mean distance=1；K=4 则二者为0。K=2 显著改善且比 K=4 简单。

### English answer pattern

Use comparable scales, exclude the specified field, and distinguish mean distance from mean squared distance.

采用可比较尺度，排除指定字段，并区分平均距离与平均平方距离。
