# 相似用户与评分预测

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=recommend)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E17-07"></a>

## E17-07 · 2017：User 2 的最近两用户与评分

来源：2017 年扫描卷 · Q7(1-2) / 10 points · PDF p.3

状态：题面未指定预测公式；列出两种口径；形式：计算 / 推导。

### 原题 / 转录整理

List the top 2 most similar users of User 2 based on Euclidean distance. Predict User 2’s rating for Product 2.

| User | Product1 | Product2 | Product3 | Product4 |
| --- | --- | --- | --- | --- |
| 1 | 3 | 1 | 5 | 3 |
| 2 | 3 | ? | 5 | 4 |
| 3 | 1 | 3 | 2 | 1 |
| 4 | 4 | 3 | 2 | 1 |
| 5 | 2 | 2 | 2 | 4 |

### 第一步：中文翻译与条件

用共同评分 Product1/3/4 计算 User2 与其余用户距离，选最近两位，再预测 Product2。题面没有明确评分聚合式，因此给出两种常见口径。

### 逐步解答

| Neighbor | Distance | 1/d weight |
| --- | --- | --- |
| 1 | 1 | 1 |
| 5 | 3.162278 | 0.316228 |
| 4 | 4.358899 | 0.229416 |
| 3 | 4.690416 | 0.213201 |

最近用户是 User1 和 User5。**若采用反距离加权原评分**，$\hat r_{2,2}=(1\times1+(1/\sqrt{10})\times2)/(1+1/\sqrt{10})=1.240253$。

**若按课件均值修正预测**：$\bar r_2=(3+5+4)/3=4$，$\bar r_1=3$，$\bar r_5=2.5$；预测 $4+[1(1-3)+(1/\sqrt{10})(2-2.5)]/(1+1/\sqrt{10})\approx2.360380$。

两者预测数不同，因为预测公式不同；共同可确定的部分是欧氏最近邻 User1/User5。答题时写清相似度转换、均值口径和评分公式。

### English answer pattern

Use only Product1, Product3 and Product4 to compare users. State how neighbor ratings are aggregated.

### 易错点与约定

问号不填0参与距离。原题只指定 Euclidean 邻居，未唯一规定评分聚合方法。


---

<a id="E20-05"></a>

## E20-05 · 2020：欧氏反距离权重与 Top-1 推荐

来源：2020 年扫描卷 · Q5(1-2) / 14 points · PDF p.2

状态：完整；形式：计算 / 推导。

### 原题 / 转录整理

List the top 2 most similar students of Student1 based on Euclidean distance. Which item should be recommended, item2 or item5? Assume similarity=1/distance.

| Student | item1 | item2 | item3 | item4 | item5 |
| --- | --- | --- | --- | --- | --- |
| 1 | 3 | ? | 1 | 2 | ? |
| 2 | 1 | 2 | 4 | 3 | 2 |
| 3 | 3 | 3 | 1 | 5 | 4 |
| 4 | 2 | 1 | 3 | 4 | 1 |

### 第一步：中文翻译与条件

Student1 的 item2、item5 未评分。用其已知 item1/3/4 计算距离，取两最近学生；按 1/d 加权预测两个候选分数，再选更高者。原题文字说 four items，但表列了五件，以表为准。

### 逐步解答

| Student | Distance | 1/d weight |
| --- | --- | --- |
| 3 | 3 | 0.333333 |
| 4 | 3 | 0.333333 |
| 2 | 3.741657 | 0.267261 |

最近为 Student3（d=3）和 Student4（d=3），相似度均 1/3。

按原评分加权，$\hat r_{1,2}=(3+1)/2=2$，$\hat r_{1,5}=(4+1)/2=2.5$，推荐 **item5**。

若明确采用课件均值修正：目标均值2，Student3均值3.2、Student4均值2.2，得到 item2=1.3、item5=1.8，仍推荐 item5。卷面应优先声明采用的预测式；1/d 已由题目指定。

### English answer pattern

The two nearest students are 3 and 4. Equal inverse-distance weights give 2 for item2 and 2.5 for item5, so recommend item5.

### 易错点与约定

Student2 距离 √14≈3.741657，不是最近邻；不要用缺失列 item2/item5 求相似度。


---

<a id="E25-07"></a>

## E25-07 · 2025 · 第7题：余弦邻居、均值修正预测与 Top-1

来源：2025 年人工智能学院回忆卷 · Q7 · PDF p.2

状态：完整复原练习；形式：回忆复原 / 完整练习。

**复原依据：**回忆为对 user2 找两位余弦最相似用户，再预测 item2 与 item5 的评分并选 Top-1。

**补配与口径：**

- 补配 5 用户×5 商品评分矩阵，U2 的 item2/item5 未知。
- 明确采用课件的均值修正预测，用户均值用各自全部已知评分。

以下为可完整作答的复原练习；补配数值不是原卷原值。

### 完整英文题干 / Reconstructed problem

The table contains ratings on a 1–5 scale. A question mark denotes a missing rating.

| User | item1 | item2 | item3 | item4 | item5 |
| --- | --- | --- | --- | --- | --- |
| U1 | 3 | 4 | 1 | 2 | 2 |
| U2 | 3 | ? | 1 | 2 | ? |
| U3 | 3 | 2 | 1 | 5 | 5 |
| U4 | 2 | 5 | 4 | 1 | 1 |
| U5 | 1 | 1 | 3 | 4 | 4 |

**(a)** Compute cosine similarity between U2 and every other user on the co-rated items. Select the two users with the largest similarities; break similarity ties by the smaller user ID.

**(b)** Use these two neighbors to predict U2’s ratings on item2 and item5 with the formula

$$\hat r_{2i}=\bar r_2+
\frac{\sum_{v\in N_2}s(2,v)(r_{vi}-\bar r_v)}{\sum_{v\in N_2}s(2,v)}.$$

Here each $\bar r_u$ is the mean of all observed ratings of user u; similarities are uncentered cosines on co-rated items. Both selected users rate both candidates. Do not round intermediate values.

**(c)** Recommend only one of item2 and item5. Report both predicted ratings to six decimal places and explain the selection.

### 第一步：中文翻译与条件

评分范围为 1—5，问号表示未知评分。对 U2 做基于用户的协同过滤：

(a) 用共同评分列算 U2 与另外四位用户的**未中心化余弦相似度**，并选相似度最高的两位；相似度平局按较小用户编号。

(b) 用这两位邻居及题给均值修正公式预测 item2、item5。每个用户的均值取其**全部已知评分**；两位邻居均对两个候选有评分。计算相似度与计算均值时用的列集合不同，中间步骤不要舍入。

(c) 两个预测值最终各保留 6 位小数，只推荐其中分数较高的一件，并说明选择。

### 小问要求与完成标准

| 小问 | 必须交付 | 明确口径 |
| --- | --- | --- |
| (a) | U2 与其余四人的余弦值、排序、Top-2 | 只用共同评分列 item1/item3/item4；未知评分不补 0。 |
| (b) | 目标/两邻居均值，以及 item2/item5 的预测 | 使用题给均值修正式；相似度仍是未中心化余弦。 |
| (c) | 只推荐一个候选并说明比较 | 按两个预测分数高低选；不重新挑另一套邻居。 |

### 逐步解答

#### 1. 共同评分列与向量

$$J=\{item1,item3,item4\}.$$
$$u_2=(3,1,2),\qquad\lVert u_2\rVert^2=14.$$
$$s(2,v)=\frac{u_2^Tu_v}{\sqrt{14}\,\lVert u_v\rVert}.$$

| Neighbor | Vector on J | Dot product | $\lVert u_v\rVert^2$ | Cosine |
| --- | --- | --- | --- | --- |
| U1 | (3, 1, 2) | 14 | 14 | 1.000000000 |
| U3 | (3, 1, 5) | 20 | 35 | 0.903507903 |
| U4 | (2, 4, 1) | 12 | 21 | 0.699854212 |
| U5 | (1, 3, 4) | 14 | 26 | 0.733799386 |

按相似度排序：$U1>U3>U5>U4$，所以选 **U1、U3**。其中

$$s(2,1)=1,\qquad s(2,3)=\frac{20}{\sqrt{490}}\approx0.903507903.$$

#### 2. 均值与偏差

$$\begin{aligned}
\bar r_2&=\frac{3+1+2}{3}=2,\\[6pt]
\bar r_1&=\frac{3+4+1+2+2}{5}=\frac{12}{5}=2.4,\\[6pt]
\bar r_3&=\frac{3+2+1+5+5}{5}=\frac{16}{5}=3.2.
\end{aligned}$$

| Neighbor | Mean | $r_{v,2}-\bar r_v$ | $r_{v,5}-\bar r_v$ |
| --- | --- | --- | --- |
| U1 | 2.4 | 1.6 | -0.4 |
| U3 | 3.2 | -1.2 | 1.8 |

#### 3. 分别计算候选评分

令 $s=20/\sqrt{490}$，保留其未舍入值：

$$\hat r_{2,2}=2+\frac{1\times1.6+s\times(-1.2)}{1+s}
\approx 2.270968413.$$
$$\hat r_{2,5}=2+\frac{1\times(-0.4)+s\times1.8}{1+s}
\approx 2.644239104.$$

| Candidate | Predicted rating (6 decimals) | Top-1 |
| --- | --- | --- |
| item2 | 2.270968 |  |
| item5 | 2.644239 | ✓ |

#### 4. 解释推荐

均值修正先比较邻居相对自身平均水平的偏爱，再加回 U2 的平均水平。item5 的预测高于 item2，故只推荐 **item5**。这里没有把余弦换成 Pearson；也没有用直接加权原评分式替代题给公式。

### English answer pattern

The two cosine neighbors are U1 and U3. With the specified mean-centered formula, the predicted ratings are 2.270968 for item2 and 2.644239 for item5. Recommend item5.

### 易错点与约定

相似度的共同列与计算用户均值的全部已知列是两套集合；问号不进入任何均值或内积。

### 计算与内存分析

对 $M$ 个候选用户、最多 $d$ 个共同特征直接比较为 $O(Md)$；Top-$k$ 可用 $O(M\log k)$ 时间维护，本题 $k=2$ 为线性。存下全部相似度需 $O(M)$；逐个比较、只留前 $k$ 位则额外 $O(k+d)$ 工作空间。原评分矩阵按稀疏格式占 $O(nnz)$，其中 nnz 为已知评分数，不需要为本题生成 $M^2$ 相似度矩阵。


---

<a id="SUP-COS"></a>

## SUP-COS · 补充变式：余弦邻居与两候选评分

来源：整理者补充变式 · 自设完整矩阵，对应 2025 回忆题型

状态：完整；形式：补充变式。

### 原题 / 转录整理

Target U has known ratings (1,2) on shared items A,B. Three neighbors have A,B ratings V=(2,4), W=(2,1), Z=(0,3). Their ratings on candidate C,D are V=(5,1), W=(4,2), Z=(2,5). Use top-2 cosine neighbors and raw weighted prediction.

### 第一步：中文翻译与条件

目标用户已知评分 (1,2)，用余弦选两邻居并预测 C/D。这里明确使用原评分加权。

### 逐步解答

s(U,V)=1，s(U,W)=4/5=.8，s(U,Z)=2/√5≈.894427。Top-2 为 V、Z。

$\hat r_C=(5+2s)/(1+s)\approx3.583592$，$\hat r_D=(1+5s)/(1+s)\approx2.888544$，其中 s=2/√5。因此推荐 C。最后两个数由脚本独立核对。

Z 与 U 的向量长度不同但方向比较接近；欧氏最近邻排序不一定等同于余弦排序。

### English answer pattern

Select V and Z by cosine similarity, then normalize the weighted rating sum.


---

<a id="SL-JANE"></a>

## SL-JANE · 课件 Jane：均值修正的完整预测

来源：当前完整七讲课件 · recommend.pdf pp.21–22 · PDF p.21

状态：完整；形式：计算 / 推导。

### 原题 / 转录整理

Predict Jane’s Aladdin rating using top-2 cosine neighbors and the mean-centered prediction formula. Zero is a valid rating; ? is missing.

| User | Lion King | Aladdin | Mulan | Anastasia |
| --- | --- | --- | --- | --- |
| John | 3 | 0 | 3 | 3 |
| Joe | 5 | 4 | 0 | 2 |
| Jill | 1 | 2 | 4 | 2 |
| Jane | 3 | ? | 1 | 0 |
| Jorge | 2 | 2 | 0 | 1 |

### 第一步：中文翻译与条件

按课件 Jane 例题，用共同评分余弦选邻居，再用均值修正计算；0 是有效评分，只有 ? 缺失。

### 逐步解答

共同三列为 Lion King、Mulan、Anastasia。余弦：John=.730297，Joe=.880830，Jill=.483046，Jorge=.848528；选 Joe、Jorge。

Jane 均值4/3，Joe=2.75，Jorge=1.25。预测 $4/3+[s_{Joe}(4−2.75)+s_{Jorge}(2−1.25)]/(s_{Joe}+s_{Jorge})=2.338003$。课件先舍入为 1.33、.88、.84 得约2.33。

原题的完整 5×4 表、截图和每项计算已保留在学习讲义第七章；这是课件例题索引，与两张往年推荐矩阵区分。

### English answer pattern

Use cosine weights with the stated mean-centered prediction rule; that does not turn the weights into Pearson correlations.
