# 贝叶斯与条件概率

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=bayes)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E16-04"></a>

## E16-04 · 2016：Naïve Bayes 对 (0,1,0) 分类

来源：2016 年扫描卷 · Q4 / 10 points · PDF p.2

状态：完整；形式：计算 / 推导。

### 原题 / 转录整理

Use Naïve Bayesian Classifier to predict the class of (A=0,B=1,C=0).

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

### 第一步：中文翻译与条件

从给定十条记录估计类别先验和类条件概率，对 (0,1,0) 预测。默认先按未平滑极大似然解。

### 逐步解答

| Class | Prior | P(A=0\|class) | P(B=1\|class) | P(C=0\|class) | Unnormalized score |
| --- | --- | --- | --- | --- | --- |
| C1 | 5/10 | 2/5 | 1/5 | 1/5 | 0.008 |
| C2 | 5/10 | 3/5 | 1/5 | 0/5 | 0 |

后验：C1=1, C2=0。预测 C1。

分数是 $P(class)\prod_jP(x_j|class)$，不是直接的后验。C2 的 C=0 没出现，未平滑分数为 0。若使用二元属性 Laplace +1 平滑：C1 分数 $(1/2)(3/7)(2/7)(2/7)=6/343$；C2 为 $(1/2)(4/7)(2/7)(1/7)=4/343$，归一后 C1=.6、C2=.4，分类不变。

### English answer pattern

Estimate probabilities within each class. The unsmoothed C2 score is zero because C=0 never appears in C2.

### 易错点与约定

Laplace 的每个类条件分母为该类样本数 + 属性可取值数，而不是 + 特征个数。


---

<a id="HW2-02"></a>

## HW2-02 · 当前 HW2：Short/Blond/Brown 分类

来源：当前 HW2 · Written Q2

状态：完整；形式：计算 / 推导。

### 原题 / 转录整理

Using the Q1 training table, what would a naïve Bayesian classifier classify Z=(Height=Short,Hair=Blond,Eye=Brown)?

### 第一步：中文翻译与条件

沿用 Height/Hair/Eye 九行建树题数据，估计朴素贝叶斯，对未知样本 Z 分类。

### 逐步解答

| Class | Prior | P(Short\|class) | P(Blond\|class) | P(Brown\|class) | Unnormalized score |
| --- | --- | --- | --- | --- | --- |
| C1 | 5/9 | 2/5 | 2/5 | 3/5 | 0.053333 |
| C2 | 4/9 | 1/4 | 2/4 | 0/4 | 0 |

后验：C1=1, C2=0。预测 C1。

原始数据中 C2 从未出现 Brown，所以未平滑 C2 分数为零。不要把未知样本先放入训练表；也不要因词的大小写不同就当不同类别，本题 blond 与 Blond 同义。

### English answer pattern

The unsmoothed classifier predicts C1. Multiplying class-conditional probabilities assumes conditional independence given the class.


---

<a id="HX2-03"></a>

## HX2-03 · 往届 HW2：吸烟、研究生与宿舍的后验

来源：往届 HW2（hxd） · Written Q3(a-c)

状态：完整；形式：计算 / 推导。

### 原题 / 转录整理

The fraction of undergraduates who smoke is 15%, and the fraction of graduates who smoke is 23%. One-fifth of students are graduates. (a) What is P(graduate|smokes)? (b) Is a random student more likely graduate or undergraduate? (c) 30% of graduates and 10% of undergraduates live in a dorm. Given smoking and dorm residence, which class is more likely? Assume independence for the two behaviors.

### 第一步：中文翻译与条件

本科生吸烟率 .15，研究生 .23；研究生占 .2、本科 .8。求吸烟者为研究生概率、随机学生的更可能身份，以及同时吸烟住校时的身份。第三问按**给定学生类别后，吸烟与住校条件独立**解释。

### 逐步解答

令 G=研究生、U=本科生、S=吸烟、D=住校。

1. $P(S)=.2\times.23+.8\times.15=.166$，因此 $P(G|S)=.046/.166=23/83\approx.277108$。
2. 随机抽一学生，P(U)=.8>P(G)=.2，因此本科生更可能；即使已知吸烟，P(U|S)=60/83 仍更大。
3. 条件独立下，联合分数：G 为 $.2\times.23\times.30=.0138$，U 为 $.8\times.15\times.10=.012$。归一后 $P(G|S,D)=.0138/.0258=23/43\approx.534884$，因此研究生略更可能。

原文 independence 的措辞简略。这里明确假设 $S\perp D\mid class$，因为仅有边缘独立并不足以推出上述类条件乘积。

### English answer pattern

Bayes gives P(G|S)=23/83. Under conditional independence given student status, P(G|S,D)=23/43.

### 易错点与约定

条件概率 P(S|G) 不等于 P(G|S)；第三问的独立性应明确是给定类别后的条件独立。
