# 相似用户与评分预测

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=recommend)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E17-07"></a>

## E17-07 · 2017：User 2 的最近两用户与评分

来源：2017 年扫描卷 · Q7(1-2) / 10 points · PDF p.3

状态：题面未指定预测公式；列出两种口径；形式：计算 / 推导。

### 本题公式 · 欧氏距离选邻居，再代入课件评分式

$J_{uv}$ 为共同已评分的物品集合，按欧氏距离从小到大选邻居：

$$d(u,v)=\sqrt{\sum_{i\in J_{uv}}(r_{ui}-r_{vi})^2}.$$

距离小表示接近；加权时需要“越近越大”的相似度。2020 原题指定 $\operatorname{sim}(u,v)=1/d(u,v)$；2017 解答也明确采用这一补充定义。距离为 1 时权重为 1，距离为 $\sqrt{10}$ 时权重为 $1/\sqrt{10}$。

**评分用课件 recommend.pdf 第 20 页的均值修正式。** $r_{ui}$ 是已有评分，$\widehat r_{ui}$ 是预测；$\bar r_u$ 是用户 u 全部已观察评分的均值，$N_u$ 为选出的邻居：

$$\widehat r_{ui}=\bar r_u+\frac{\sum_{v\in N_u}\operatorname{sim}(u,v)(r_{vi}-\bar r_v)}{\sum_{v\in N_u}\operatorname{sim}(u,v)}.$$

先算邻居评分比其自身均值高/低多少，用相似度加权平均，再加回目标用户均值。分母是所用邻居的相似度总和。均值包含有效的 0 分，跳过缺失的问号。 题干中的 $s(u,v)$ 与这里的 $\operatorname{sim}(u,v)$ 表示同一个相似度，代入时使用前面算出的数值。

### 原文

List the top 2 most similar users of User 2 based on Euclidean distance. Predict User 2’s rating for Product 2.

基于欧氏距离，列出与用户 2 最相似的两个用户。预测用户 2 对商品 2 的评分。

| User | Product1 | Product2 | Product3 | Product4 |
| --- | --- | --- | --- | --- |
| 1 | 3 | 1 | 5 | 3 |
| 2 | 3 | ? | 5 | 4 |
| 3 | 1 | 3 | 2 | 1 |
| 4 | 4 | 3 | 2 | 1 |
| 5 | 2 | 2 | 2 | 4 |

### 逐步解答

#### 1. 在共同评分列算欧氏距离

User2 的 Product2 未知；共同已知列为 $J=\{Product1,Product3,Product4\}$，向量为 $(3,5,4)$。使用

$$d(2,v)=\sqrt{\sum_{i\in J}(r_{2i}-r_{vi})^2}.$$

| 用户 | 共同列向量 | 距离的数值代入 |
| --- | --- | --- |
| User1 | (3,5,3) | $\sqrt{(3-3)^2+(5-5)^2+(4-3)^2}=1$ |
| User3 | (1,2,1) | $\sqrt{(3-1)^2+(5-2)^2+(4-1)^2}=\sqrt{22}$ |
| User4 | (4,2,1) | $\sqrt{(3-4)^2+(5-2)^2+(4-1)^2}=\sqrt{19}$ |
| User5 | (2,2,4) | $\sqrt{(3-2)^2+(5-2)^2+(4-4)^2}=\sqrt{10}$ |

因此 $1<\sqrt{10}<\sqrt{19}<\sqrt{22}$，最近两个用户为 **User1、User5**。

#### 2. 将距离转为权重，计算各人均值

原卷指定欧氏邻居；这里沿用 2020 同类题的距离倒数作为补充相似度定义，再使用课件第 20 页的均值修正评分式：

$$\operatorname{sim}(2,1)=1/1=1,\qquad\operatorname{sim}(2,5)=1/\sqrt{10}.$$

较近的 User1 得到更大权重。每人均值取其全部已知评分：

$$\begin{aligned}
\bar r_2&=(3+5+4)/3=4,\\
\bar r_1&=(3+1+5+3)/4=3,\\
\bar r_5&=(2+2+2+4)/4=2.5.
\end{aligned}$$

#### 3. 按课件公式预测 Product2

User1 对 Product2 的偏差为 $1-3=-2$，User5 为 $2-2.5=-0.5$。先加权这些偏差，再加回 User2 的均值：

$$\begin{aligned}
\widehat r_{2,2}&=\bar r_2+\frac{\operatorname{sim}(2,1)(r_{1,2}-\bar r_1)+\operatorname{sim}(2,5)(r_{5,2}-\bar r_5)}{\operatorname{sim}(2,1)+\operatorname{sim}(2,5)}\\
&=4+\frac{1(1-3)+\frac1{\sqrt{10}}(2-2.5)}{1+\frac1{\sqrt{10}}}\\
&\approx\boxed{2.360380}.
\end{aligned}$$

分子分母同乘 $\sqrt{10}$，同一个预测值也可写成

$$4+\frac{-2\sqrt{10}-0.5}{\sqrt{10}+1}.$$

#### 最终答案

最近邻为 **User1、User5**；采用上述距离倒数权重与课件均值修正式，Product2 预测为 **2.360380**。分母把邻居权重归一化，实际加权的是相对各人均值的偏差。


### English answer pattern

The two nearest users are User1 and User5. Using inverse-distance weights as an explicit supplementary definition and the course mean-centered prediction formula, the means are 4, 3 and 2.5, and the predicted rating for Product2 is 2.360380.

最近的两个用户为 User1、User5。将距离倒数明确作为补充权重定义，并使用课件均值修正预测公式，三人的均值为 4、3、2.5，Product2 的预测评分为 2.360380。

### 易错点与约定

问号不填0参与距离。原题只指定 Euclidean 邻居，未唯一规定评分聚合方法。

### 知识点与公式总结

- 欧氏距离只在共同已评分列计算，距离越小越近；本题选 User1、User5。
- 2017 原卷未给距离转权重公式，解答明确补充 $\operatorname{sim}(u,v)=1/d(u,v)$，与 2020 同类题一致。
- 按课件公式：先减邻居各自均值，加权平均偏差，再加回目标均值；本题计算 $4+[1(-2)+(1/\sqrt{10})(-0.5)]/[1+1/\sqrt{10}]$。


---

<a id="E20-05"></a>

## E20-05 · 2020：欧氏反距离权重与 Top-1 推荐

来源：2020 年扫描卷 · Q5(1-2) / 14 points · PDF p.2

状态：完整；形式：计算 / 推导。

### 本题公式 · 欧氏距离选邻居，再代入课件评分式

$J_{uv}$ 为共同已评分的物品集合，按欧氏距离从小到大选邻居：

$$d(u,v)=\sqrt{\sum_{i\in J_{uv}}(r_{ui}-r_{vi})^2}.$$

距离小表示接近；加权时需要“越近越大”的相似度。2020 原题指定 $\operatorname{sim}(u,v)=1/d(u,v)$；2017 解答也明确采用这一补充定义。距离为 1 时权重为 1，距离为 $\sqrt{10}$ 时权重为 $1/\sqrt{10}$。

**评分用课件 recommend.pdf 第 20 页的均值修正式。** $r_{ui}$ 是已有评分，$\widehat r_{ui}$ 是预测；$\bar r_u$ 是用户 u 全部已观察评分的均值，$N_u$ 为选出的邻居：

$$\widehat r_{ui}=\bar r_u+\frac{\sum_{v\in N_u}\operatorname{sim}(u,v)(r_{vi}-\bar r_v)}{\sum_{v\in N_u}\operatorname{sim}(u,v)}.$$

先算邻居评分比其自身均值高/低多少，用相似度加权平均，再加回目标用户均值。分母是所用邻居的相似度总和。均值包含有效的 0 分，跳过缺失的问号。 题干中的 $s(u,v)$ 与这里的 $\operatorname{sim}(u,v)$ 表示同一个相似度，代入时使用前面算出的数值。

### 原文

List the top 2 most similar students of Student1 based on Euclidean distance. Which item should be recommended, item2 or item5? Assume similarity=1/distance.

基于欧氏距离，列出与学生 1 最相似的两个学生。应该推荐 item2 还是 item5？假设相似度等于距离的倒数。

| Student | item1 | item2 | item3 | item4 | item5 |
| --- | --- | --- | --- | --- | --- |
| 1 | 3 | ? | 1 | 2 | ? |
| 2 | 1 | 2 | 4 | 3 | 2 |
| 3 | 3 | 3 | 1 | 5 | 4 |
| 4 | 2 | 1 | 3 | 4 | 1 |

### 逐步解答

#### 1. 欧氏距离与最近两位学生

共同已评分列为 $J=\{item1,item3,item4\}$，Student1 的向量为 $(3,1,2)$。

| 学生 | 共同列向量 | 距离的完整代入 |
| --- | --- | --- |
| Student2 | (1,4,3) | $\sqrt{(3-1)^2+(1-4)^2+(2-3)^2}=\sqrt{14}$ |
| Student3 | (3,1,5) | $\sqrt{(3-3)^2+(1-1)^2+(2-5)^2}=3$ |
| Student4 | (2,3,4) | $\sqrt{(3-2)^2+(1-3)^2+(2-4)^2}=3$ |

最近为 **Student3、Student4**。原题给定 $\operatorname{sim}=1/d$，所以两人的权重均为 $1/3$。

#### 2. 计算均值和候选评分偏差

预测使用课件第 20 页的均值修正公式。每人的均值由全部已评分物品计算：

$$\begin{aligned}
\bar r_1&=(3+1+2)/3=2,\\
\bar r_3&=(3+3+1+5+4)/5=3.2,\\
\bar r_4&=(2+1+3+4+1)/5=2.2.
\end{aligned}$$

| 邻居 | item2 相对其均值的偏差 | item5 相对其均值的偏差 |
| --- | --- | --- |
| Student3 | $3-3.2=-0.2$ | $4-3.2=0.8$ |
| Student4 | $1-2.2=-1.2$ | $1-2.2=-1.2$ |

#### 3. 分别代入同一个课件预测式

$$\begin{aligned}
\widehat r_{1,2}&=2+\frac{\frac13(3-3.2)+\frac13(1-2.2)}{\frac13+\frac13}=\boxed{1.3},\\[5pt]
\widehat r_{1,5}&=2+\frac{\frac13(4-3.2)+\frac13(1-2.2)}{\frac13+\frac13}=\boxed{1.8}.
\end{aligned}$$

两个权重均为 $1/3$，在分子、分母中约去同一因子后，得到偏差的普通平均：

$$2+\frac{-0.2-1.2}{2}=1.3,\qquad 2+\frac{0.8-1.2}{2}=1.8.$$

最后加回的 2 是目标用户均值。

#### 最终答案

最近邻为 **Student3、Student4**；item2 预测 **1.3**，item5 预测 **1.8**，推荐 **item5**。


### English answer pattern

Student3 and Student4 are the nearest neighbors, both at distance 3 and with the specified similarity 1/3. Applying the course mean-centered formula with means 2, 3.2 and 2.2 gives 1.3 for item2 and 1.8 for item5. Recommend item5.

Student3、Student4 是最近邻，距离均为 3，指定相似度均为 1/3。使用课件均值修正式及均值 2、3.2、2.2，得到 item2 评分 1.3、item5 评分 1.8。推荐 item5。

### 易错点与约定

Student2 距离 √14≈3.741657，应按距离排序后选择最近两人；不要用缺失列 item2/item5 求相似度。

### 知识点与公式总结

- 共同列为 item1、item3、item4；按欧氏距离选 Student3、Student4。
- 原题指定 $\operatorname{sim}=1/d$；两个距离均为 3，所以两个权重均为 $1/3$。
- 用课件均值修正式，先加权 $(r_{vi}-\bar r_v)$ 再加回 $\bar r_1=2$；两候选得到 1.3、1.8。


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

### 本题公式 · 课件推荐公式：余弦相似度与均值修正

$J_{uv}$ 为 u、v 共同已评分的物品集合。课件第 19 页的余弦相似度为

$$\operatorname{sim}(u,v)=\frac{\sum_{i\in J_{uv}}r_{ui}r_{vi}}{\sqrt{\sum_{i\in J_{uv}}r_{ui}^2}\sqrt{\sum_{i\in J_{uv}}r_{vi}^2}}.$$

分子是逐项相乘再相加的点积；两个根号分别是两个用户向量的模长。先分别写出数值，再除以两个模长，相似度越大越近。$\sqrt a\sqrt b=\sqrt{ab}$（$a,b\ge0$），两种根号写法等价。

**评分用课件 recommend.pdf 第 20 页的均值修正式。** $r_{ui}$ 是已有评分，$\widehat r_{ui}$ 是预测；$\bar r_u$ 是用户 u 全部已观察评分的均值，$N_u$ 为选出的邻居：

$$\widehat r_{ui}=\bar r_u+\frac{\sum_{v\in N_u}\operatorname{sim}(u,v)(r_{vi}-\bar r_v)}{\sum_{v\in N_u}\operatorname{sim}(u,v)}.$$

先算邻居评分比其自身均值高/低多少，用相似度加权平均，再加回目标用户均值。分母是所用邻居的相似度总和。均值包含有效的 0 分，跳过缺失的问号。 题干中的 $s(u,v)$ 与这里的 $\operatorname{sim}(u,v)$ 表示同一个相似度，代入时使用前面算出的数值。

### 原文

The table contains ratings on a 1–5 scale. A question mark denotes a missing rating.

表中为 1—5 分尺度的评分。问号表示评分缺失。

| User | item1 | item2 | item3 | item4 | item5 |
| --- | --- | --- | --- | --- | --- |
| U1 | 3 | 4 | 1 | 2 | 2 |
| U2 | 3 | ? | 1 | 2 | ? |
| U3 | 3 | 2 | 1 | 5 | 5 |
| U4 | 2 | 5 | 4 | 1 | 1 |
| U5 | 1 | 1 | 3 | 4 | 4 |

**(a)** Compute cosine similarity between U2 and every other user on the co-rated items. Select the two users with the largest similarities; break similarity ties by the smaller user ID.

**(a)** 在共同评分物品上，计算 U2 与其他各用户的余弦相似度。选择相似度最大的两个用户；相似度相同时，取用户编号较小者。

**(b)** Use these two neighbors to predict U2’s ratings on item2 and item5 with the formula

**(b)** 用这两个邻居，按下式预测 U2 对 item2 和 item5 的评分。

$$\hat r_{2i}=\bar r_2+
\frac{\sum_{v\in N_2}s(2,v)(r_{vi}-\bar r_v)}{\sum_{v\in N_2}s(2,v)}.$$

Here each $\bar r_u$ is the mean of all observed ratings of user u; similarities are uncentered cosines on co-rated items. Both selected users rate both candidates. Do not round intermediate values.

这里每个用户均值取其全部已观测评分的平均；相似度是共同评分物品上未经中心化的余弦。两位已选用户都评过两个候选物品。中间结果不要舍入。

**(c)** Recommend only one of item2 and item5. Report both predicted ratings to six decimal places and explain the selection.

**(c)** 在 item2、item5 中只推荐一个。将两个预测评分保留六位小数，并解释选择。

### 小问要求与完成标准

| 小问 | 必须交付 | 明确口径 |
| --- | --- | --- |
| (a) | U2 与其余四人的余弦值、排序、Top-2 | 只用共同评分列 item1/item3/item4；未知评分不补 0。 |
| (b) | 目标/两邻居均值，以及 item2/item5 的预测 | 使用题给均值修正式；相似度仍是未中心化余弦。 |
| (c) | 只推荐一个候选并说明比较 | 按两个预测分数高低选；不重新挑另一套邻居。 |

### 逐步解答

共同列为 item1、item3、item4；问号不参与相似度计算。

#### 1. 共同评分向量、点积和模长

目标用户 U2 在共同列上的向量为 $(3,1,2)$，其模长为

$$\|r_{U2,J}\|=\sqrt{3^2+1^2+2^2}=\sqrt{14}.$$

| 邻居及共同列向量 | 点积的逐项计算 | 邻居模长的计算 |
| --- | --- | --- |
| U1：$(3,1,2)$ | $3\times3+1\times1+2\times2=14$ | $\sqrt{3^2+1^2+2^2}=\sqrt{14}$ |
| U3：$(3,1,5)$ | $3\times3+1\times1+2\times5=20$ | $\sqrt{3^2+1^2+5^2}=\sqrt{35}$ |
| U4：$(2,4,1)$ | $3\times2+1\times4+2\times1=12$ | $\sqrt{2^2+4^2+1^2}=\sqrt{21}$ |
| U5：$(1,3,4)$ | $3\times1+1\times3+2\times4=14$ | $\sqrt{1^2+3^2+4^2}=\sqrt{26}$ |

#### 2. 将点积和两个模长完整代入余弦式

$$\begin{aligned}
\operatorname{sim}(U2,U1)&=\frac{14}{\sqrt{14}\sqrt{14}}\approx 1.000000000\\[5pt]
\operatorname{sim}(U2,U3)&=\frac{20}{\sqrt{14}\sqrt{35}}\approx 0.903507903\\[5pt]
\operatorname{sim}(U2,U4)&=\frac{12}{\sqrt{14}\sqrt{21}}\approx 0.699854212\\[5pt]
\operatorname{sim}(U2,U5)&=\frac{14}{\sqrt{14}\sqrt{26}}\approx 0.733799386
\end{aligned}$$

按相似度从大到小为 U1、U3、U5、U4，选 **U1、U3**。

#### 3. 均值与偏差

$$\begin{aligned}
\bar r_2&=\frac{3+1+2}{3}=2,\\[6pt]
\bar r_1&=\frac{3+4+1+2+2}{5}=\frac{12}{5}=2.4,\\[6pt]
\bar r_3&=\frac{3+2+1+5+5}{5}=\frac{16}{5}=3.2.
\end{aligned}$$

| Neighbor | Mean | $r_{v,2}-\bar r_v$ | $r_{v,5}-\bar r_v$ |
| --- | --- | --- | --- |
| U1 | 2.4 | 1.6 | -0.4 |
| U3 | 3.2 | -1.2 | 1.8 |

#### 4. 分别计算候选评分

$$\widehat r_{ui}=\bar r_u+\frac{\sum_{v\in N_u}\operatorname{sim}(u,v)(r_{vi}-\bar r_v)}{\sum_{v\in N_u}\operatorname{sim}(u,v)}.$$

代入前表中的均值、相似度和偏差，两个候选使用同一组邻居：

$$\begin{aligned}
\widehat r_{2,2}&=2+\frac{1(4-2.4)+\frac{20}{\sqrt{14}\sqrt{35}}(2-3.2)}{1+\frac{20}{\sqrt{14}\sqrt{35}}}\\
&\approx\boxed{2.270968},\\[5pt]
\widehat r_{2,5}&=2+\frac{1(2-2.4)+\frac{20}{\sqrt{14}\sqrt{35}}(5-3.2)}{1+\frac{20}{\sqrt{14}\sqrt{35}}}\\
&\approx\boxed{2.644239}.
\end{aligned}$$

| Candidate | Predicted rating (6 decimals) | Top-1 |
| --- | --- | --- |
| item2 | 2.270968 |  |
| item5 | 2.644239 | ✓ |

#### 最终答案

均值修正先比较邻居相对自身平均水平的偏爱，再加回 U2 的平均水平。item5 的预测高于 item2，故只推荐 **item5**。按课件余弦相似度选邻居，再用题目给出的均值修正式预测评分。


### English answer pattern

The two cosine neighbors are U1 and U3. With the specified mean-centered formula, the predicted ratings are 2.270968 for item2 and 2.644239 for item5. Recommend item5.

两个余弦近邻为 U1、U3。按指定去均值公式，item2 预测为 2.270968，item5 为 2.644239。推荐 item5。

### 易错点与约定

相似度的共同列与计算用户均值的全部已知列是两套集合；问号不进入任何均值或内积。

### 计算与内存分析

对 $M$ 个候选用户、最多 $d$ 个共同特征直接比较为 $O(Md)$；Top-$k$ 可用 $O(M\log k)$ 时间维护，本题 $k=2$ 为线性。存下全部相似度需 $O(M)$；逐个比较、只留前 $k$ 位则额外 $O(k+d)$ 工作空间。原评分矩阵按稀疏格式占 $O(nnz)$，其中 nnz 为已知评分数，不需要为本题生成 $M^2$ 相似度矩阵。

### 知识点与公式总结

- 在 item1、item3、item4 上计算点积与两个模长，分别写入余弦分子和分母。
- 选 U1、U3；均值分别用各人的全部已知评分算，目标均值为 2，邻居均值为 2.4、3.2。
- 按课件/题给均值修正式分别预测 item2、item5；保留中间精度，最后比较 2.270968 与 2.644239，推荐 item5。


---

<a id="SUP-COS"></a>

## SUP-COS · 补充变式：余弦邻居与两候选评分

来源：整理者补充练习 · 自设完整矩阵，对应 2025 回忆题型

状态：完整；形式：补充变式。

### 本题公式 · 课件推荐公式：余弦相似度与均值修正

$J_{uv}$ 为 u、v 共同已评分的物品集合。课件第 19 页的余弦相似度为

$$\operatorname{sim}(u,v)=\frac{\sum_{i\in J_{uv}}r_{ui}r_{vi}}{\sqrt{\sum_{i\in J_{uv}}r_{ui}^2}\sqrt{\sum_{i\in J_{uv}}r_{vi}^2}}.$$

分子是逐项相乘再相加的点积；两个根号分别是两个用户向量的模长。先分别写出数值，再除以两个模长，相似度越大越近。$\sqrt a\sqrt b=\sqrt{ab}$（$a,b\ge0$），两种根号写法等价。

**评分用课件 recommend.pdf 第 20 页的均值修正式。** $r_{ui}$ 是已有评分，$\widehat r_{ui}$ 是预测；$\bar r_u$ 是用户 u 全部已观察评分的均值，$N_u$ 为选出的邻居：

$$\widehat r_{ui}=\bar r_u+\frac{\sum_{v\in N_u}\operatorname{sim}(u,v)(r_{vi}-\bar r_v)}{\sum_{v\in N_u}\operatorname{sim}(u,v)}.$$

先算邻居评分比其自身均值高/低多少，用相似度加权平均，再加回目标用户均值。分母是所用邻居的相似度总和。均值包含有效的 0 分，跳过缺失的问号。 题干中的 $s(u,v)$ 与这里的 $\operatorname{sim}(u,v)$ 表示同一个相似度，代入时使用前面算出的数值。

### 原文

Target U has known ratings (1,2) on shared items A,B. Three neighbors have A,B ratings V=(2,4), W=(2,1), Z=(0,3). Their ratings on candidate C,D are V=(5,1), W=(4,2), Z=(2,5). Use top-2 cosine neighbors and the course mean-centered prediction formula. Compute each user’s mean from all their observed ratings. Predict C and D, then recommend one.

目标 U 在共同物品 A、B 上的已知评分为 (1,2)。三个邻居在 A、B 上的评分为 V=(2,4)、W=(2,1)、Z=(0,3)。他们在候选 C、D 上的评分为 V=(5,1)、W=(4,2)、Z=(2,5)。使用前两位余弦邻居和课件的均值修正预测公式。根据每个用户的全部已观察评分计算该用户均值。预测 C、D，然后推荐其中一个。

### 逐步解答

#### 1. 共同评分向量、点积和模长

目标用户 U 在共同列上的向量为 $(1,2)$，其模长为

$$\|r_{U,J}\|=\sqrt{1^2+2^2}=\sqrt{5}.$$

| 邻居及共同列向量 | 点积的逐项计算 | 邻居模长的计算 |
| --- | --- | --- |
| V：$(2,4)$ | $1\times2+2\times4=10$ | $\sqrt{2^2+4^2}=\sqrt{20}$ |
| W：$(2,1)$ | $1\times2+2\times1=4$ | $\sqrt{2^2+1^2}=\sqrt{5}$ |
| Z：$(0,3)$ | $1\times0+2\times3=6$ | $\sqrt{0^2+3^2}=\sqrt{9}$ |

#### 2. 将点积和两个模长完整代入余弦式

$$\begin{aligned}
\operatorname{sim}(U,V)&=\frac{10}{\sqrt{5}\sqrt{20}}\approx 1.000000000\\[5pt]
\operatorname{sim}(U,W)&=\frac{4}{\sqrt{5}\sqrt{5}}\approx 0.800000000\\[5pt]
\operatorname{sim}(U,Z)&=\frac{6}{\sqrt{5}\sqrt{9}}\approx 0.894427191
\end{aligned}$$

因此余弦大小为 $V>Z>W$，选 **V、Z**。其中 $6/(\sqrt5\sqrt9)=6/(3\sqrt5)=2/\sqrt5$，是同一个权重的等价简写。

#### 3. 根据全部已观察评分求均值

U 的 C、D 未知，因此 U 的均值只用 A、B；各邻居的四项评分均已知：

| 用户 | 均值计算 |
| --- | --- |
| U | $(1+2)/2=1.5$ |
| V | $(2+4+5+1)/4=3$ |
| W | $(2+1+4+2)/4=2.25$ |
| Z | $(0+3+2+5)/4=2.5$ |

#### 4. 代入课件均值修正预测式

$$\widehat r_{ui}=\bar r_u+\frac{\sum_{v\in N_u}\operatorname{sim}(u,v)(r_{vi}-\bar r_v)}{\sum_{v\in N_u}\operatorname{sim}(u,v)}.$$

将上面已求出的均值与相似度代入，$\operatorname{sim}(U,V)=1$，$\operatorname{sim}(U,Z)=2/\sqrt5$：

$$\begin{aligned}
\widehat r_{U,C}&=1.5+\frac{1(5-3)+\frac2{\sqrt5}(2-2.5)}{1+\frac2{\sqrt5}}\\
&\approx\boxed{2.319660},\\[5pt]
\widehat r_{U,D}&=1.5+\frac{1(1-3)+\frac2{\sqrt5}(5-2.5)}{1+\frac2{\sqrt5}}\\
&\approx\boxed{1.624612}.
\end{aligned}$$

#### 最终答案

邻居为 **V、Z**；C 的预测为 **2.319660**，D 为 **1.624612**，推荐 **C**。


### English answer pattern

The top two cosine neighbors are V and Z. The means of U, V and Z are 1.5, 3 and 2.5. With the course mean-centered formula, the predictions are 2.319660 for C and 1.624612 for D. Recommend C.

前两位余弦邻居为 V、Z。U、V、Z 的均值为 1.5、3、2.5。按课件均值修正式，C 的预测为 2.319660，D 为 1.624612。推荐 C。

### 知识点与公式总结

- 点积为“对应评分相乘再求和”，每个向量模长为“各分量平方和开方”；余弦分母保留两个模长可直接核查。
- 根据 A、B 的共同列选 V、Z；计算各人均值时，邻居已知的 C、D 评分也应计入。
- 统一使用课件均值修正式，先加权邻居相对均值的偏差，再加回目标均值 1.5；预测 C 更高。


---

<a id="SL-JANE"></a>

## SL-JANE · 课件 Jane：均值修正的完整预测

来源：当前完整七讲课件 · recommend.pdf · Example：Jane 邻居计算；p.22 评分预测 · PDF p.21

状态：完整；形式：计算 / 推导。

### 本题公式 · 课件推荐公式：余弦相似度与均值修正

$J_{uv}$ 为 u、v 共同已评分的物品集合。课件第 19 页的余弦相似度为

$$\operatorname{sim}(u,v)=\frac{\sum_{i\in J_{uv}}r_{ui}r_{vi}}{\sqrt{\sum_{i\in J_{uv}}r_{ui}^2}\sqrt{\sum_{i\in J_{uv}}r_{vi}^2}}.$$

分子是逐项相乘再相加的点积；两个根号分别是两个用户向量的模长。先分别写出数值，再除以两个模长，相似度越大越近。$\sqrt a\sqrt b=\sqrt{ab}$（$a,b\ge0$），两种根号写法等价。

**评分用课件 recommend.pdf 第 20 页的均值修正式。** $r_{ui}$ 是已有评分，$\widehat r_{ui}$ 是预测；$\bar r_u$ 是用户 u 全部已观察评分的均值，$N_u$ 为选出的邻居：

$$\widehat r_{ui}=\bar r_u+\frac{\sum_{v\in N_u}\operatorname{sim}(u,v)(r_{vi}-\bar r_v)}{\sum_{v\in N_u}\operatorname{sim}(u,v)}.$$

先算邻居评分比其自身均值高/低多少，用相似度加权平均，再加回目标用户均值。分母是所用邻居的相似度总和。均值包含有效的 0 分，跳过缺失的问号。 题干中的 $s(u,v)$ 与这里的 $\operatorname{sim}(u,v)$ 表示同一个相似度，代入时使用前面算出的数值。

### 原文

Predict Jane’s Aladdin rating using top-2 cosine neighbors and the mean-centered prediction formula. Zero is a valid rating; ? is missing.

使用余弦相似度最高的两个邻居及均值中心化预测公式，预测 Jane 对 Aladdin 的评分。0 是有效评分；问号表示缺失。

| User | Lion King | Aladdin | Mulan | Anastasia |
| --- | --- | --- | --- | --- |
| John | 3 | 0 | 3 | 3 |
| Joe | 5 | 4 | 0 | 2 |
| Jill | 1 | 2 | 4 | 2 |
| Jane | 3 | ? | 1 | 0 |
| Jorge | 2 | 2 | 0 | 1 |

### 逐步解答

共同列为 Lion King、Mulan、Anastasia；0 是有效评分，问号才表示缺失。

#### 1. 共同评分向量、点积和模长

目标用户 Jane 在共同列上的向量为 $(3,1,0)$，其模长为

$$\|r_{Jane,J}\|=\sqrt{3^2+1^2+0^2}=\sqrt{10}.$$

| 邻居及共同列向量 | 点积的逐项计算 | 邻居模长的计算 |
| --- | --- | --- |
| John：$(3,3,3)$ | $3\times3+1\times3+0\times3=12$ | $\sqrt{3^2+3^2+3^2}=\sqrt{27}$ |
| Joe：$(5,0,2)$ | $3\times5+1\times0+0\times2=15$ | $\sqrt{5^2+0^2+2^2}=\sqrt{29}$ |
| Jill：$(1,4,2)$ | $3\times1+1\times4+0\times2=7$ | $\sqrt{1^2+4^2+2^2}=\sqrt{21}$ |
| Jorge：$(2,0,1)$ | $3\times2+1\times0+0\times1=6$ | $\sqrt{2^2+0^2+1^2}=\sqrt{5}$ |

#### 2. 将点积和两个模长完整代入余弦式

$$\begin{aligned}
\operatorname{sim}(Jane,John)&=\frac{12}{\sqrt{10}\sqrt{27}}\approx 0.730296743\\[5pt]
\operatorname{sim}(Jane,Joe)&=\frac{15}{\sqrt{10}\sqrt{29}}\approx 0.880830329\\[5pt]
\operatorname{sim}(Jane,Jill)&=\frac{7}{\sqrt{10}\sqrt{21}}\approx 0.483045892\\[5pt]
\operatorname{sim}(Jane,Jorge)&=\frac{6}{\sqrt{10}\sqrt{5}}\approx 0.848528137
\end{aligned}$$

选相似度最高的 **Joe、Jorge**。上式的两个根号分别对应 Jane 与邻居的模长；将其合为 $\sqrt{290}$ 或 $\sqrt{50}$ 只是等价简写。

#### 3. 全部已评分均值与 Aladdin 偏差

$$\begin{aligned}
\bar r_{Jane}&=(3+1+0)/3=4/3,\\
\bar r_{Joe}&=(5+4+0+2)/4=2.75,\\
\bar r_{Jorge}&=(2+2+0+1)/4=1.25.
\end{aligned}$$

Joe 对 Aladdin 的偏差为 $4-2.75=1.25$，Jorge 为 $2-1.25=0.75$。

#### 4. 按课件均值修正式逐项代入

$$\widehat r_{ui}=\bar r_u+\frac{\sum_{v\in N_u}\operatorname{sim}(u,v)(r_{vi}-\bar r_v)}{\sum_{v\in N_u}\operatorname{sim}(u,v)}.$$

先把前面求出的相似度和偏差代入分子、分母，分别算清楚：

**加权偏差和（分子）：**

$$\frac{15}{\sqrt{10}\sqrt{29}}(4-2.75)+\frac6{\sqrt{10}\sqrt5}(2-1.25)
=1.737434014\ldots$$

**相似度之和（分母）：**

$$\frac{15}{\sqrt{10}\sqrt{29}}+\frac6{\sqrt{10}\sqrt5}=1.729358466\ldots$$

**加回 Jane 的均值：**

$$\widehat r_{Jane,Aladdin}=\frac43+\frac{1.737434014\ldots}{1.729358466\ldots}
\approx\boxed{2.338003}.$$

计算中保留根号形式的原始精度，以上小数只用于展示中间结果。

#### 最终答案

邻居为 **Joe、Jorge**，预测评分为 **2.338003**。课件第 22 页显示 2.33；保留中间精度复算为 2.338003。两位邻居对 Aladdin 的评分均高于各自平均水平，所以预测高于 Jane 的均值。


### English answer pattern

The two cosine neighbors are Joe and Jorge. Their similarities are $15/(\sqrt{10}\sqrt{29})$ and $6/(\sqrt{10}\sqrt5)$. The mean-centered formula, using means 4/3, 2.75 and 1.25, predicts Jane’s Aladdin rating as 2.338003.

两个余弦邻居为 Joe、Jorge。相似度分别为 $15/(\sqrt{10}\sqrt{29})$ 和 $6/(\sqrt{10}\sqrt5)$。均值修正式使用均值 4/3、2.75、1.25，预测 Jane 的 Aladdin 评分为 2.338003。

### 知识点与公式总结

- 共同三列中的 Jane 向量为 (3,1,0)，模长为 $\sqrt{10}$；每个邻居另算自己的点积和模长。
- 余弦排序选 Joe、Jorge；均值用全部已评分项计算，0 也计入分母和加总。
- 使用课件均值修正式：先减各邻居均值，加权后加回 $4/3$，得到 2.338003。


---

<a id="E26-07"></a>

## E26-07 · 2026 · 第7题：为指定用户和商品编写协同过滤预测代码

来源：2026 年期末考后回忆 · Q7

状态：回忆整理（代码任务明确，参数细节缺失）；形式：2026 考后回忆 / 代码设计。

**回忆记录：** 为指定用户和商品编写协同过滤预测代码

**尚缺信息：** 具体相似度、k、评分矩阵及其他实现限定未完整记回；解答明确提供一种课件示范方案。

**相关已有题：** E17-07、E20-05、E25-07、SL-JANE。

### 本题公式 · 课件推荐公式：余弦相似度与均值修正

$J_{uv}$ 为 u、v 共同已评分的物品集合。课件第 19 页的余弦相似度为

$$\operatorname{sim}(u,v)=\frac{\sum_{i\in J_{uv}}r_{ui}r_{vi}}{\sqrt{\sum_{i\in J_{uv}}r_{ui}^2}\sqrt{\sum_{i\in J_{uv}}r_{vi}^2}}.$$

分子是逐项相乘再相加的点积；两个根号分别是两个用户向量的模长。先分别写出数值，再除以两个模长，相似度越大越近。$\sqrt a\sqrt b=\sqrt{ab}$（$a,b\ge0$），两种根号写法等价。

**评分用课件 recommend.pdf 第 20 页的均值修正式。** $r_{ui}$ 是已有评分，$\widehat r_{ui}$ 是预测；$\bar r_u$ 是用户 u 全部已观察评分的均值，$N_u$ 为选出的邻居：

$$\widehat r_{ui}=\bar r_u+\frac{\sum_{v\in N_u}\operatorname{sim}(u,v)(r_{vi}-\bar r_v)}{\sum_{v\in N_u}\operatorname{sim}(u,v)}.$$

先算邻居评分比其自身均值高/低多少，用相似度加权平均，再加回目标用户均值。分母是所用邻居的相似度总和。均值包含有效的 0 分，跳过缺失的问号。 题干中的 $s(u,v)$ 与这里的 $\operatorname{sim}(u,v)$ 表示同一个相似度，代入时使用前面算出的数值。

### 英文题干（根据考后回忆整理）

A rating matrix contains N users and M items. Write code to predict a specified user's rating for a specified item using similar users.

评分矩阵包含N名用户和M个商品。编写代码，利用相似用户预测指定用户对指定商品的评分。

### 解答

采用课件的用户余弦相似度与均值修正作为示范方案。先用共同已评分物品计算相似度，再用给目标商品评过分的邻居预测：

$$\widehat r_{ui}=\bar r_u+\frac{\sum_{v\in N_u}\operatorname{sim}(u,v)(r_{vi}-\bar r_v)}{\sum_{v\in N_u}\operatorname{sim}(u,v)}.$$

```text
function PREDICT(R, u, item, k):
    if R[u,item] is known: return R[u,item]
    mean_u = mean of known ratings in row u
    if row u has no known ratings: return global known-rating mean
    candidates = []
    for each user v other than u who rated item:
        skip v if the co-rated vectors have a zero norm
        sim = cosine of u and v on their co-rated items
        if sim > 0:
            mean_v = mean of known ratings in row v
            save (sim, v, R[v,item] - mean_v) in candidates
    neighbors = top k candidates by sim
    if neighbors is empty: return mean_u
    return mean_u + sum(sim * deviation) / sum(sim)
```

0 分参与计算，缺失值跳过。以上伪代码先展示核心步骤；下方完整 Python 用堆维护前 k 人，并处理零模长及回退。


### English answer · 英文作答

One complete implementation uses co-rated-item cosine similarity and the course mean-centered predictor. Consider only users who rated the target item, retain the top-k positive similarities, and normalize the weighted rating deviations before adding the target user mean. Skip missing values without treating valid zeros as missing. Use the user mean, or the global mean for a user without ratings, when a prediction has no supporting neighbors.

一种完整实现使用共同评分商品上的余弦相似度和课件均值修正预测式。只考虑对目标商品打过分的用户，保留前 k 个正相似度，归一化加权评分偏差后加回目标用户均值。跳过缺失值，不把有效的零分当作缺失。在预测缺少邻居支持时，使用用户均值；用户没有评分时使用全局均值。

<details>
<summary>补充解释（展开）</summary>


### 补充详解

#### 1. 用课件方法给出一个完整实现

下面示范课件的“用户余弦相似度＋均值修正预测”。具体代码采用这些明确约定：None 表示缺失，0 为有效评分；只考虑给目标商品打过分的其他用户；选前 k 个正相似度邻居，同相似度优先较小用户编号。k 为函数参数。

设 $J_{uv}$ 为 u、v 共同已评分的商品，$N_u$ 为本次选中的邻居：

$$\operatorname{sim}(u,v)=\frac{\sum_{j\in J_{uv}}r_{uj}r_{vj}}{\sqrt{\sum_{j\in J_{uv}}r_{uj}^2}\sqrt{\sum_{j\in J_{uv}}r_{vj}^2}}.$$

各用户的均值 $\bar r$ 使用其全部已知评分。预测时先减邻居均值，加权后加回目标用户均值：

$$\widehat r_{ui}=\bar r_u+\frac{\sum_{v\in N_u}\operatorname{sim}(u,v)(r_{vi}-\bar r_v)}{\sum_{v\in N_u}\operatorname{sim}(u,v)}.$$

#### 2. 按公式写代码

代码中的用户u与商品item使用从0开始的下标。

```python
from math import sqrt
from heapq import heappush, heapreplace

def predict(ratings, u, item, k=10):
    """None is missing; 0 is a valid rating; k must be positive."""
    if k < 1:
        raise ValueError("k must be positive")
    if ratings[u][item] is not None:
        return float(ratings[u][item])

    def mean(row):
        total, count = 0.0, 0
        for value in row:
            if value is not None:
                total += value
                count += 1
        return total / count if count else None

    user_mean = mean(ratings[u])
    if user_mean is None:
        total, count = 0.0, 0
        for row in ratings:
            for value in row:
                if value is not None:
                    total += value
                    count += 1
        return total / count if count else None

    heap = []
    for v, row in enumerate(ratings):
        if v == u or row[item] is None:
            continue
        dot, norm_u2, norm_v2 = 0.0, 0.0, 0.0
        for a, b in zip(ratings[u], row):
            if a is not None and b is not None:
                dot += a * b
                norm_u2 += a * a
                norm_v2 += b * b
        if norm_u2 == 0 or norm_v2 == 0:
            continue
        sim = dot / (sqrt(norm_u2) * sqrt(norm_v2))
        if sim <= 0:                # declared positive-neighbor policy
            continue
        offset = row[item] - mean(row)
        entry = (sim, -v, offset)   # equal similarity: smaller user ID first
        if len(heap) < k:
            heappush(heap, entry)
        elif entry[:2] > heap[0][:2]:
            heapreplace(heap, entry)

    if not heap:
        return user_mean
    weight_sum = sum(sim for sim, _, _ in heap)
    correction = sum(sim * offset for sim, _, offset in heap) / weight_sum
    return user_mean + correction
```

#### 3. 各分支对应的含义

- 目标评分已经存在时，直接返回该评分。
- 共同评分向量的模长为 0 时跳过该用户；正相似度筛选是本示范算法的邻居策略。
- 无合格邻居时返回目标用户均值；目标用户没有已知评分时返回全体有效评分均值；矩阵全缺失时返回 None。
- 小根堆只保留当前最优 k 人；最后用“相似度乘评分偏差”的和除以权重和，再加回用户均值。

#### 最终作答要点

代码完成“读共同评分→算相似度→筛选并保留邻居→算均值偏差→归一化预测”，并处理缺失和空邻域。余弦及均值修正来自课件；上述 k、正相似度和回退处理是为完整代码明确的示范选择。


### 易错点与约定

代码中的 sim<=0 筛选、同分编号规则和回退均已声明为示范选择；不将它们写成原卷已经指定的条件。所有有效 0 都参与均值及共同评分运算。

### 计算与内存分析

对一个用户—商品查询，最多比较 N 位用户，每次扫描 M 项，时间为 $O(NM+N\log k)$，k=1 时堆操作按常数计。代码逐行计算均值，不另存全部 N 个相似度或均值，只需 $O(k)$ 额外堆空间与常数累计量；评分矩阵本身的 $O(NM)$ 输入存储另计。 上方伪代码若存下全部候选，额外空间为O(N)；下方堆实现只保留k名邻居，额外空间为O(k)，均不含输入评分矩阵。

</details>

### 知识点与公式总结

- 用共同已评分集合 $J_{uv}$ 算余弦，但只有已评目标商品的用户能贡献 $r_{vi}$。
- 课件预测式是目标均值加上邻居评分偏差的归一化加权和。
- None 为缺失、0 有效；跳过零模长，明确 top-k、相似度筛选和空邻域回退。
