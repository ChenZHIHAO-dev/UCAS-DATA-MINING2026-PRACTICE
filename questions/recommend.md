# 相似用户与评分预测

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=recommend)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E17-07"></a>

## E17-07 · 2017：User 2 的最近两用户与评分

来源：2017 年扫描卷 · Q7(1-2) / 10 points · PDF p.3

状态：题面未指定预测公式；列出两种口径；形式：计算 / 推导。

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

#### 1. 只在共同已评分列计算距离

设 $J$ 是目标用户与邻居共同评分的物品集合：

$$d(u,v)=\sqrt{\sum_{i\in J}(r_{ui}-r_{vi})^2},\qquad s(u,v)=\frac1{d(u,v)}.$$

问号表示缺失，在本题的距离中不参与；距离越小，相似度越大。选定邻居后采用加权原评分式：

$$\widehat r_{ui}=\frac{\sum_{v\in N_u}s(u,v)r_{vi}}{\sum_{v\in N_u}s(u,v)}.$$

#### 2. 共同列与邻居排序

共同列为 Product1、Product3、Product4；目标向量为 $(3,5,4)$。

| 邻居 | 共同评分向量 | 平方距离 | 距离 | 反距离权重 |
| --- | --- | --- | --- | --- |
| User1 | (3,5,3) | $0+0+1=1$ | $1$ | $1$ |
| User3 | (1,2,1) | $4+9+9=22$ | $\sqrt{22}$ | $1/\sqrt{22}$ |
| User4 | (4,2,1) | $1+9+9=19$ | $\sqrt{19}$ | $1/\sqrt{19}$ |
| User5 | (2,2,4) | $1+9+0=10$ | $\sqrt{10}$ | $1/\sqrt{10}$ |

最近的两个用户为 **User1、User5**。

#### 3. 采用反距离加权原评分

两位邻居对 Product2 的评分为 1、2：

$$\widehat r_{2,2}=\frac{1\times1+\frac1{\sqrt{10}}\times2}{1+\frac1{\sqrt{10}}}\approx\boxed{1.240253}.$$

#### 4. 采用课件均值修正式时

原题未指定评分聚合式。若使用课程中的均值修正，先求每人的全部已评分均值：$\bar r_2=4,\bar r_1=3,\bar r_5=2.5$。

$$\widehat r_{2,2}=4+\frac{1(1-3)+\frac1{\sqrt{10}}(2-2.5)}{1+\frac1{\sqrt{10}}}\approx\boxed{2.360380}.$$

该式先加权“相对邻居自身均值的偏好”，再加回目标均值。两个预测值分别对应已明确写出的两种公式；邻居选择结果相同。


### English answer pattern

Use only Product1, Product3 and Product4 to compare users. State how neighbor ratings are aggregated.

只使用商品 1、3、4 比较用户。说明怎样聚合邻居评分。

### 易错点与约定

问号不填0参与距离。原题只指定 Euclidean 邻居，未唯一规定评分聚合方法。

### 知识点与公式总结

- 只在共同已评分物品上算 $d(u,v)=\sqrt{\sum_i(r_{ui}-r_{vi})^2}$；距离越小越近，取题目要求的 Top-2。
- 题给反距离权重为 $s=1/d$；原评分预测为 $\hat r_{ui}=\sum_v s_{uv}r_{vi}/\sum_v s_{uv}$，权重需归一化。
- 原题未指定评分聚合式，写清采用原评分加权还是均值修正；后者先减邻居均值、加权后再加目标均值。


---

<a id="E20-05"></a>

## E20-05 · 2020：欧氏反距离权重与 Top-1 推荐

来源：2020 年扫描卷 · Q5(1-2) / 14 points · PDF p.2

状态：完整；形式：计算 / 推导。

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

#### 1. 只在共同已评分列计算距离

设 $J$ 是目标用户与邻居共同评分的物品集合：

$$d(u,v)=\sqrt{\sum_{i\in J}(r_{ui}-r_{vi})^2},\qquad s(u,v)=\frac1{d(u,v)}.$$

问号表示缺失，在本题的距离中不参与；距离越小，相似度越大。选定邻居后采用加权原评分式：

$$\widehat r_{ui}=\frac{\sum_{v\in N_u}s(u,v)r_{vi}}{\sum_{v\in N_u}s(u,v)}.$$

#### 2. 算出三个距离，选两个最近用户

目标用户在 item1、item3、item4 上的向量为 $(3,1,2)$。

| 学生 | 共同评分向量 | 平方距离的展开 | 距离 | 权重 |
| --- | --- | --- | --- | --- |
| 2 | (1,4,3) | $(3-1)^2+(1-4)^2+(2-3)^2=14$ | $\sqrt{14}$ | $1/\sqrt{14}$ |
| 3 | (3,1,5) | $0^2+0^2+(-3)^2=9$ | $3$ | $1/3$ |
| 4 | (2,3,4) | $1^2+(-2)^2+(-2)^2=9$ | $3$ | $1/3$ |

选择 Student3 与 Student4；两人的权重相同。

#### 3. 分别预测两个候选，给出 Top-1

$$\widehat r_{1,2}=\frac{\frac13\times3+\frac13\times1}{\frac13+\frac13}=\boxed{2}.$$

$$\widehat r_{1,5}=\frac{\frac13\times4+\frac13\times1}{\frac13+\frac13}=\boxed{2.5}.$$

因此推荐 **item5**。若另行声明采用课件均值修正式，目标均值为 2、两个邻居均值为 3.2 与 2.2，预测分别为 1.3 与 1.8，Top-1 仍为 item5；卷面需写清所采用的预测公式。


### English answer pattern

The two nearest students are 3 and 4. Equal inverse-distance weights give 2 for item2 and 2.5 for item5, so recommend item5.

最近的两个学生为 3、4。相同的距离倒数权重给出 item2 评分 2、item5 评分 2.5，因此推荐 item5。

### 易错点与约定

Student2 距离 √14≈3.741657，应按距离排序后选择最近两人；不要用缺失列 item2/item5 求相似度。

### 知识点与公式总结

- 只在共同已评分物品上算 $d(u,v)=\sqrt{\sum_i(r_{ui}-r_{vi})^2}$；距离越小越近，取题目要求的 Top-2。
- 题给反距离权重为 $s=1/d$；原评分预测为 $\hat r_{ui}=\sum_v s_{uv}r_{vi}/\sum_v s_{uv}$，权重需归一化。
- 对 item2、item5 分别用同一组邻居预测，再选预测更高的一项；共同评分列用于距离，候选列用于最后的预测。


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

#### 本题公式

余弦比较共同评分向量的方向：

$$s(u,v)=\frac{u^Tv}{\|u\|_2\|v\|_2}=\frac{\sum_i u_iv_i}{\sqrt{\sum_i u_i^2}\sqrt{\sum_i v_i^2}}.$$

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

均值修正先比较邻居相对自身平均水平的偏爱，再加回 U2 的平均水平。item5 的预测高于 item2，故只推荐 **item5**。本题依题给口径，用未中心化余弦选邻居，再用均值修正式预测评分。


### English answer pattern

The two cosine neighbors are U1 and U3. With the specified mean-centered formula, the predicted ratings are 2.270968 for item2 and 2.644239 for item5. Recommend item5.

两个余弦近邻为 U1、U3。按指定去均值公式，item2 预测为 2.270968，item5 为 2.644239。推荐 item5。

### 易错点与约定

相似度的共同列与计算用户均值的全部已知列是两套集合；问号不进入任何均值或内积。

### 计算与内存分析

对 $M$ 个候选用户、最多 $d$ 个共同特征直接比较为 $O(Md)$；Top-$k$ 可用 $O(M\log k)$ 时间维护，本题 $k=2$ 为线性。存下全部相似度需 $O(M)$；逐个比较、只留前 $k$ 位则额外 $O(k+d)$ 工作空间。原评分矩阵按稀疏格式占 $O(nnz)$，其中 nnz 为已知评分数，不需要为本题生成 $M^2$ 相似度矩阵。

### 知识点与公式总结

- 共同评分向量上的余弦 $s(u,v)=u^Tv/(\|u\|_2\|v\|_2)$；相似度越大越近，取 Top-2 后再预测。
- 均值修正预测 $\hat r_{ui}=\bar r_u+\frac{\sum_v s_{uv}(r_{vi}-\bar r_v)}{\sum_v s_{uv}}$；每人均值使用其全部已观察评分。
- 相似度计算不提前舍入；先列邻居对各候选的“评分减均值”，分别代入，再按最高预测评分给出 Top-1。


---

<a id="SUP-COS"></a>

## SUP-COS · 补充变式：余弦邻居与两候选评分

来源：整理者补充变式 · 自设完整矩阵，对应 2025 回忆题型

状态：完整；形式：补充变式。

### 原文

Target U has known ratings (1,2) on shared items A,B. Three neighbors have A,B ratings V=(2,4), W=(2,1), Z=(0,3). Their ratings on candidate C,D are V=(5,1), W=(4,2), Z=(2,5). Use top-2 cosine neighbors and raw weighted prediction.

目标用户 U 在共同物品 A、B 上的已知评分为 (1,2)。三个邻居在 A、B 上的评分为 V=(2,4)、W=(2,1)、Z=(0,3)。他们对候选 C、D 的评分为 V=(5,1)、W=(4,2)、Z=(2,5)。使用余弦相似度最高的两个邻居，并用原始评分加权预测。

### 逐步解答

#### 本题公式

余弦比较共同评分向量的方向：

$$s(u,v)=\frac{u^Tv}{\|u\|_2\|v\|_2}=\frac{\sum_i u_iv_i}{\sqrt{\sum_i u_i^2}\sqrt{\sum_i v_i^2}}.$$

#### 2. 展开三个余弦，选 Top-2

目标向量 $U=(1,2)$，平方长度为 5。

| 邻居 | 点积 | 邻居平方长度 | 余弦 |
| --- | --- | --- | --- |
| V=(2,4) | $1\times2+2\times4=10$ | 20 | $10/\sqrt{100}=1$ |
| W=(2,1) | $1\times2+2\times1=4$ | 5 | $4/5=0.8$ |
| Z=(0,3) | $1\times0+2\times3=6$ | 9 | $6/\sqrt{45}=2/\sqrt5\approx0.894427$ |

选择 V、Z。V 的向量是 U 的两倍，方向完全相同，所以余弦为 1。

#### 3. 加权原评分并比较候选

令 $s=2/\sqrt5$，使用未舍入权重：

$$\widehat r_C=\frac{1\times5+s\times2}{1+s}\approx\boxed{3.583592}.$$

$$\widehat r_D=\frac{1\times1+s\times5}{1+s}\approx\boxed{2.888544}.$$

因此推荐 **C**。这里使用题目要求的原评分加权，目标用户均值不进入预测公式。


### English answer pattern

Select V and Z by cosine similarity, then normalize the weighted rating sum.

按余弦选择 V、Z，再对加权评分和归一化。

### 知识点与公式总结

- 共同评分向量上的余弦 $s(u,v)=u^Tv/(\|u\|_2\|v\|_2)$；相似度越大越近，取 Top-2 后再预测。
- 本题按原评分加权：$\hat r_{ui}=\sum_v s_{uv}r_{vi}/\sum_v s_{uv}$；对 C、D 分别算分子，分母使用相同邻居权重和。
- 余弦比较方向，向量长度成比例时可得相似度 1；先选邻居，再比较两个候选的预测分数。


---

<a id="SL-JANE"></a>

## SL-JANE · 课件 Jane：均值修正的完整预测

来源：当前完整七讲课件 · recommend.pdf · Example：Jane 邻居计算；p.22 评分预测 · PDF p.21

状态：完整；形式：计算 / 推导。

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

#### 本题公式

余弦比较共同评分向量的方向：

$$s(u,v)=\frac{u^Tv}{\|u\|_2\|v\|_2}=\frac{\sum_i u_iv_i}{\sqrt{\sum_i u_i^2}\sqrt{\sum_i v_i^2}}.$$

#### 2. 在共同三列比较全部候选邻居

共同列为 Lion King、Mulan、Anastasia；Jane 的向量为 $(3,1,0)$，平方长度为 10。0 是有效评分，参与长度和均值计算；问号才表示缺失。

| 邻居 | 共同评分向量 | 点积 | 邻居平方长度 | 余弦 |
| --- | --- | --- | --- | --- |
| John | (3,3,3) | 12 | 27 | $12/\sqrt{270}=0.730297$ |
| Joe | (5,0,2) | 15 | 29 | $15/\sqrt{290}=0.880830$ |
| Jill | (1,4,2) | 7 | 21 | $7/\sqrt{210}=0.483046$ |
| Jorge | (2,0,1) | 6 | 5 | $6/\sqrt{50}=0.848528$ |

选 **Joe、Jorge**。余弦只使用共同三列；用户均值使用该用户全部已观察评分。

#### 3. 均值与相对偏好

$$\bar r_{Jane}=\frac{3+1+0}{3}=\frac43,\quad\bar r_{Joe}=\frac{5+4+0+2}{4}=2.75,\quad\bar r_{Jorge}=\frac{2+2+0+1}{4}=1.25.$$

两位邻居对 Aladdin 的偏差分别为 $4-2.75=1.25$ 和 $2-1.25=0.75$。

#### 4. 代入均值修正公式

$$\widehat r_{ui}=\bar r_u+\frac{\sum_{v\in N_u}s(u,v)(r_{vi}-\bar r_v)}{\sum_{v\in N_u}s(u,v)}.$$

令 $s_1=15/\sqrt{290}$、$s_2=6/\sqrt{50}$：

$$\widehat r_{Jane,Aladdin}=\frac43+\frac{s_1\times1.25+s_2\times0.75}{s_1+s_2}\approx\boxed{2.338003}.$$

两位邻居都比各自平均水平更喜欢 Aladdin，所以预测高于 Jane 的均值。课件先将均值和相似度舍入后得到约 2.33；保留中间精度得到这里的结果。


### English answer pattern

Use cosine weights with the stated mean-centered prediction rule; that does not turn the weights into Pearson correlations.

使用余弦权重及规定的去均值预测规则；这些权重仍是余弦相似度。

### 知识点与公式总结

- 共同评分向量上的余弦 $s(u,v)=u^Tv/(\|u\|_2\|v\|_2)$；相似度越大越近，取 Top-2 后再预测。
- 均值修正预测 $\hat r_{ui}=\bar r_u+\frac{\sum_v s_{uv}(r_{vi}-\bar r_v)}{\sum_v s_{uv}}$；每人均值使用其全部已观察评分。
- 0 是有效评分，参与向量和均值；问号才表示缺失。计算 Joe、Jorge 的 Aladdin 偏差，加权后加回 Jane 均值。
