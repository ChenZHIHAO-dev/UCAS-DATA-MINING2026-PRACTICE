# 贝叶斯与条件概率

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=bayes)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E16-04"></a>

## E16-04 · 2016：Naïve Bayes 对 (0,1,0) 分类

来源：2016 年扫描卷 · Q4 / 10 points · PDF p.2

状态：完整；形式：计算 / 推导。

### 本题公式 · 条件概率与贝叶斯：公式和分母

**条件概率与联合概率。** $P(A\mid B)$ 表示已知 B 发生时 A 的概率，分母限定在 B 中：

$$P(A\mid B)=\frac{P(A\cap B)}{P(B)},\qquad P(A\cap B)=P(A\mid B)P(B).$$

**全概率与贝叶斯。** 若类别 $C_1,\ldots,C_K$ 互斥且覆盖全部样本，观察证据 x 后：

$$\begin{aligned}
P(x)&=\sum_kP(x\mid C_k)P(C_k),\\
P(C_c\mid x)&=\frac{P(x\mid C_c)P(C_c)}{\sum_kP(x\mid C_k)P(C_k)}.
\end{aligned}$$

**朴素贝叶斯。** 给定类别后，假设各属性条件独立。先验用“该类人数/总人数”，条件概率用“该类内符合属性的人数/该类人数”：

$$s_c=P(C_c)\prod_jP(x_j\mid C_c),\qquad P_{NB}(C_c\mid x)=\frac{s_c}{\sum_k s_k}.$$

按“类人数→条件计数→相乘得分→比较类别→需要时归一化”计算。分类取分数最大者；条件概率与归一化均要求分母大于 0。题目指定平滑时，按同一规则调整各类条件计数。

### 原文

Use Naïve Bayesian Classifier to predict the class of (A=0,B=1,C=0).

用朴素贝叶斯分类器预测 (A=0,B=1,C=0) 的类别。

| ID | A | B | C | Class |
| --- | --- | --- | --- | --- |
| 1 | 0 | 0 | 0 | C1 |
| 2 | 0 | 0 | 1 | C2 |
| 3 | 0 | 1 | 1 | C2 |
| 4 | 0 | 0 | 1 | C2 |
| 5 | 0 | 0 | 1 | C1 |
| 6 | 1 | 0 | 1 | C1 |
| 7 | 1 | 0 | 1 | C2 |
| 8 | 1 | 0 | 1 | C2 |
| 9 | 1 | 1 | 1 | C1 |
| 10 | 1 | 0 | 1 | C1 |

### 逐步解答

#### 本题公式

对 $x=(A=0,B=1,C=0)$，类条件独立假设给出

$$s_c=P(C_c)P(A=0\mid C_c)P(B=1\mid C_c)P(C=0\mid C_c).$$

先验 $P(C_c)$ 的分母是总人数 10；每个条件概率的分母是对应类别人数 5。选择分数最大者；若需要后验，再计算 $P_{NB}(C_c\mid x)=s_c/(s_1+s_2)$。

#### 1. 逐项计数

| 类别 | 先验 | $P(A=0\mid C_c)$ | $P(B=1\mid C_c)$ | $P(C=0\mid C_c)$ |
| --- | --- | --- | --- | --- |
| C1 | $5/10$ | $2/5$ | $1/5$ | $1/5$ |
| C2 | $5/10$ | $3/5$ | $1/5$ | $0/5$ |

#### 2. 代入分数并分类

$$\begin{aligned}
s_1&=\frac5{10}\times\frac25\frac15\frac15=0.008,\\
s_2&=\frac5{10}\times\frac35\frac15\frac05=0.
\end{aligned}$$

$$P_{NB}(C_1\mid x)=\frac{0.008}{0.008+0}=1,\qquad P_{NB}(C_2\mid x)=0.$$

#### 最终答案

预测为 **C1**。C2 类中没有 C=0 的样本，导致未平滑的乘积为 0；本题按频数估计计算。

若另行采用二元属性的 Laplace +1 平滑，每项概率为“类内对应计数加 1，类人数加 2”。此时两类分数分别为 $6/343$、$4/343$，后验为 0.6、0.4，仍预测 C1。

#### 本题关键点

先数类别总人数，再分别在各类内部数属性取值；只比较分数即可分类，要求概率时才归一化。


### English answer pattern

Estimate probabilities within each class. The unsmoothed C2 score is zero because C=0 never appears in C2.

在每个类别内部估计概率。C=0 从未在 C2 中出现，因此未平滑的 C2 分数为零。

### 易错点与约定

Laplace 的每个类条件分母为该类样本数 + 属性可取值数，，对应给每个可能取值各增加一次计数。

### 知识点与公式总结

- 朴素贝叶斯分数 $s_c=P(C_c)\prod_jP(x_j\mid C_c)$；先验按全体人数计算，条件概率按对应类别人数计算。
- 分类取 $\arg\max_c s_c$；需要后验时再归一化：$P(C_c\mid x)=s_c/\sum_k s_k$。
- 未平滑乘积中，一个条件计数为 0 就使该类分数为 0；若采用 Laplace 平滑，明确属性取值个数后统一加到各类中。


---

<a id="HW2-02"></a>

## HW2-02 · 当前 HW2：Short/Blond/Brown 分类

来源：当前 HW2 · Written Q2

状态：完整；形式：计算 / 推导。

### 本题公式 · 条件概率与贝叶斯：公式和分母

**条件概率与联合概率。** $P(A\mid B)$ 表示已知 B 发生时 A 的概率，分母限定在 B 中：

$$P(A\mid B)=\frac{P(A\cap B)}{P(B)},\qquad P(A\cap B)=P(A\mid B)P(B).$$

**全概率与贝叶斯。** 若类别 $C_1,\ldots,C_K$ 互斥且覆盖全部样本，观察证据 x 后：

$$\begin{aligned}
P(x)&=\sum_kP(x\mid C_k)P(C_k),\\
P(C_c\mid x)&=\frac{P(x\mid C_c)P(C_c)}{\sum_kP(x\mid C_k)P(C_k)}.
\end{aligned}$$

**朴素贝叶斯。** 给定类别后，假设各属性条件独立。先验用“该类人数/总人数”，条件概率用“该类内符合属性的人数/该类人数”：

$$s_c=P(C_c)\prod_jP(x_j\mid C_c),\qquad P_{NB}(C_c\mid x)=\frac{s_c}{\sum_k s_k}.$$

按“类人数→条件计数→相乘得分→比较类别→需要时归一化”计算。分类取分数最大者；条件概率与归一化均要求分母大于 0。题目指定平滑时，按同一规则调整各类条件计数。

### 原文

Using the Q1 training table, what would a naïve Bayesian classifier classify Z=(Height=Short,Hair=Blond,Eye=Brown)?

使用 Q1 训练表，朴素贝叶斯分类器会把 Z=(身高=矮，发色=金色，眼睛=棕色) 分为哪类？

### 逐步解答

#### 本题公式

对 $Z=(Short,Blond,Brown)$，先计算各类联合分数，再比较：

$$s_c=P(C_c)P(Short\mid C_c)P(Blond\mid C_c)P(Brown\mid C_c).$$

若要求后验概率，使用 $P_{NB}(C_c\mid Z)=s_c/(s_1+s_2)$。下面沿用 Q1 的九个训练样本；未知样本 Z 只用于预测。

#### 1. 先验和类内条件概率

| 类别 | 先验 | $P(Short\mid C_c)$ | $P(Blond\mid C_c)$ | $P(Brown\mid C_c)$ |
| --- | --- | --- | --- | --- |
| C1 | $5/9$ | $2/5$ | $2/5$ | $3/5$ |
| C2 | $4/9$ | $1/4$ | $2/4$ | $0/4$ |

例如 C1 类共五人，其中两人 Short、两人 Blond、三人 Brown；分母均取 5。

#### 2. 相乘并归一化

$$\begin{aligned}
s_1&=\frac59\frac25\frac25\frac35=\frac4{75}\approx0.053333,\\
s_2&=\frac49\frac14\frac24\frac04=0.
\end{aligned}$$

$$P_{NB}(C_1\mid Z)=\frac{4/75}{4/75+0}=1,\qquad P_{NB}(C_2\mid Z)=0.$$

#### 最终答案

预测为 **C1**。C2 中没有 Brown，故未平滑分数为 0。题目未指定额外平滑时，按上述频数估计完成分类。


### English answer pattern

The unsmoothed classifier predicts C1. Multiplying class-conditional probabilities assumes conditional independence given the class.

未平滑分类器预测 C1。相乘类别条件概率时，假设给定类别后各属性条件独立。

### 知识点与公式总结

- 朴素贝叶斯分数 $s_c=P(C_c)\prod_jP(x_j\mid C_c)$；先验按全体人数计算，条件概率按对应类别人数计算。
- 分类取 $\arg\max_c s_c$；需要后验时再归一化：$P(C_c\mid x)=s_c/\sum_k s_k$。
- 从 Q1 训练表分别统计 Short、Blond、Brown 的类内人数；待预测样本只用于代入，不加入训练计数。


---

<a id="HX2-03"></a>

## HX2-03 · 往届 HW2：吸烟、研究生与宿舍的后验

来源：往届 HW2（hxd） · Written Q3(a-c)

状态：完整；形式：计算 / 推导。

### 本题公式 · 条件概率与贝叶斯：公式和分母

**条件概率与联合概率。** $P(A\mid B)$ 表示已知 B 发生时 A 的概率，分母限定在 B 中：

$$P(A\mid B)=\frac{P(A\cap B)}{P(B)},\qquad P(A\cap B)=P(A\mid B)P(B).$$

**全概率与贝叶斯。** 若类别 $C_1,\ldots,C_K$ 互斥且覆盖全部样本，观察证据 x 后：

$$\begin{aligned}
P(x)&=\sum_kP(x\mid C_k)P(C_k),\\
P(C_c\mid x)&=\frac{P(x\mid C_c)P(C_c)}{\sum_kP(x\mid C_k)P(C_k)}.
\end{aligned}$$

**朴素贝叶斯。** 给定类别后，假设各属性条件独立。先验用“该类人数/总人数”，条件概率用“该类内符合属性的人数/该类人数”：

$$s_c=P(C_c)\prod_jP(x_j\mid C_c),\qquad P_{NB}(C_c\mid x)=\frac{s_c}{\sum_k s_k}.$$

按“类人数→条件计数→相乘得分→比较类别→需要时归一化”计算。分类取分数最大者；条件概率与归一化均要求分母大于 0。题目指定平滑时，按同一规则调整各类条件计数。

### 原文

The fraction of undergraduates who smoke is 15%, and the fraction of graduates who smoke is 23%. One-fifth of students are graduates. (a) What is P(graduate|smokes)? (b) Is a random student more likely graduate or undergraduate? (c) 30% of graduates and 10% of undergraduates live in a dorm. Given smoking and dorm residence, which class is more likely? Assume independence for the two behaviors.

本科生中吸烟者占 15%，研究生中占 23%。全体学生中五分之一是研究生。（a）P(研究生|吸烟) 是多少？（b）随机学生更可能是研究生还是本科生？（c）研究生有 30%、本科生有 10% 住校。已知吸烟且住校，哪类更可能？假设这两种行为独立。

### 逐步解答

#### 1. 记号与先验

令 $G,U,S,D$ 分别表示研究生、本科生、吸烟、住校。已知 $P(G)=0.2$、$P(U)=0.8$。

#### 2. 已知吸烟时的研究生概率

吸烟者来自两类学生，所以先用全概率公式求分母：

$$P(S)=P(S\mid G)P(G)+P(S\mid U)P(U)=0.23\times0.2+0.15\times0.8=0.166.$$

再用贝叶斯公式：

$$P(G\mid S)=\frac{P(S\mid G)P(G)}{P(S)}=\frac{0.046}{0.166}=\frac{23}{83}\approx\boxed{0.277108}.$$

#### 3. 随机学生属于哪类

未附加条件时，$P(U)=0.8>P(G)=0.2$，因此本科生更可能。即使已知吸烟，本科生的后验仍为 $1-23/83=60/83$，大于研究生。

#### 4. 同时吸烟且住校

采用题意中的类条件独立 $S\perp D\mid class$，先写联合概率的分解式：

$$P(S,D\mid c)=P(S\mid c)P(D\mid c),\qquad s_c=P(c)P(S\mid c)P(D\mid c).$$

再代入两类的先验及条件概率：

$$\begin{aligned}
s_G&=0.2\times0.23\times0.30=0.0138,\\
s_U&=0.8\times0.15\times0.10=0.012.
\end{aligned}$$

$$P(G\mid S,D)=\frac{0.0138}{0.0138+0.012}=\frac{23}{43}\approx\boxed{0.534884}.$$

因此在同时吸烟且住校的人群中，研究生略更可能。增加“住校”信息后，研究生的较高住校比例提高了它的后验概率。


### English answer pattern

Bayes gives P(G|S)=23/83. Under conditional independence given student status, P(G|S,D)=23/43.

贝叶斯公式给出 P(G|S)=23/83。给定学生身份后条件独立时，P(G|S,D)=23/43。

### 易错点与约定

P(S|G) 在研究生中数吸烟者，P(G|S) 在吸烟者中数研究生；第三问的独立性应明确是给定类别后的条件独立。

### 知识点与公式总结

- 全概率先求分母：$P(S)=\sum_cP(S\mid c)P(c)$；贝叶斯公式 $P(G\mid S)=P(S\mid G)P(G)/P(S)$。
- 给定类别后独立时，吸烟且住校的分数为 $P(c)P(S\mid c)P(D\mid c)$，再除以两类分数之和。
- 区分“随机学生”的先验与“已知吸烟/住校”的后验；增加条件后重新计算，不直接沿用上一问的类别比例。


---

<a id="PPT-CL38"></a>

## PPT-CL38 · 课件 · 买电脑数据的朴素贝叶斯预测

来源：当前完整七讲课件 · classification.pdf · Exercise；答案见 pp.39–40 · PDF p.38

状态：完整课件练习；形式：课件计算 / 逐步练习。

### 本题公式 · 条件概率与贝叶斯：公式和分母

**条件概率与联合概率。** $P(A\mid B)$ 表示已知 B 发生时 A 的概率，分母限定在 B 中：

$$P(A\mid B)=\frac{P(A\cap B)}{P(B)},\qquad P(A\cap B)=P(A\mid B)P(B).$$

**全概率与贝叶斯。** 若类别 $C_1,\ldots,C_K$ 互斥且覆盖全部样本，观察证据 x 后：

$$\begin{aligned}
P(x)&=\sum_kP(x\mid C_k)P(C_k),\\
P(C_c\mid x)&=\frac{P(x\mid C_c)P(C_c)}{\sum_kP(x\mid C_k)P(C_k)}.
\end{aligned}$$

**朴素贝叶斯。** 给定类别后，假设各属性条件独立。先验用“该类人数/总人数”，条件概率用“该类内符合属性的人数/该类人数”：

$$s_c=P(C_c)\prod_jP(x_j\mid C_c),\qquad P_{NB}(C_c\mid x)=\frac{s_c}{\sum_k s_k}.$$

按“类人数→条件计数→相乘得分→比较类别→需要时归一化”计算。分类取分数最大者；条件概率与归一化均要求分母大于 0。题目指定平滑时，按同一规则调整各类条件计数。

### 原文

Predict what class does the data sample X = (age <=30, Income = medium, Student = yes, Credit_rating = Fair) belong to? Class: C1:buys_computer = 'yes'; C2:buys_computer = 'no'.

预测数据样本 X=(age≤30，Income=medium，Student=yes，Credit_rating=Fair) 属于哪个类别？类别 C1 为 buys_computer='yes'，C2 为 buys_computer='no'。

| age | income | student | credit_rating | buys_computer |
| --- | --- | --- | --- | --- |
| <=30 | high | no | fair | no |
| <=30 | high | no | excellent | no |
| 31..40 | high | no | fair | yes |
| >40 | medium | no | fair | yes |
| >40 | low | yes | fair | yes |
| >40 | low | yes | excellent | no |
| 31..40 | low | yes | excellent | yes |
| <=30 | medium | no | fair | no |
| <=30 | low | yes | fair | yes |
| >40 | medium | yes | fair | yes |
| <=30 | medium | yes | excellent | yes |
| 31..40 | medium | no | excellent | yes |
| 31..40 | high | yes | fair | yes |
| >40 | medium | no | excellent | no |

### 逐步解答

#### 1. 写后验比较式

朴素贝叶斯在给定类别后将各属性条件概率相乘：

$$s_c=P(c)\prod_{j=1}^{4}P(x_j\mid c),\qquad \hat c=\arg\max_c s_c.$$

所有类别共享同一个分母 $P(X)$，因此比较未归一化分数 $s_c$ 即可。若题目要求具体后验概率，再除以两类分数之和。

#### 2. 逐项计数

| 项目 | yes 类（9 人） | no 类（5 人） |
| --- | --- | --- |
| 先验 | $9/14$ | $5/14$ |
| $age\le30$ | $2/9$ | $3/5$ |
| income=medium | $4/9$ | $2/5$ |
| student=yes | $6/9$ | $1/5$ |
| credit_rating=fair | $6/9$ | $2/5$ |

每个条件概率的分母是对应类别人数。

#### 3. 相乘并给结论

$$\begin{aligned}
s_{yes}&=\frac9{14}\times\frac29\frac49\frac69\frac69=\frac{16}{567}\approx0.0282187,\\
s_{no}&=\frac5{14}\times\frac35\frac25\frac15\frac25=\frac6{875}\approx0.00685714.
\end{aligned}$$

$$P_{NB}(yes\mid X)=\frac{16/567}{16/567+6/875}=\frac{1000}{1243}\approx0.804505.$$

预测为 $\boxed{buys\_computer=yes}$。所有条件计数均非零，本题可直接使用未平滑的频数估计。

### English answer pattern

The unnormalized yes and no scores are 0.0282187 and 0.00685714. The normalized yes probability is approximately 0.804505, so predict buys_computer=yes.

yes 与 no 的未归一化分数分别为 0.0282187 和 0.00685714。归一化后的 yes 概率约为 0.804505，因此预测 buys_computer=yes。

### 知识点与公式总结

- 朴素贝叶斯分数 $s_c=P(C_c)\prod_jP(x_j\mid C_c)$；先验按全体人数计算，条件概率按对应类别人数计算。
- 分类取 $\arg\max_c s_c$；需要后验时再归一化：$P(C_c\mid x)=s_c/\sum_k s_k$。
- 四个属性分别在 yes/no 类内计数，相乘后比较；共同分母 P(X) 对两个类别相同，分类时可先省略。
