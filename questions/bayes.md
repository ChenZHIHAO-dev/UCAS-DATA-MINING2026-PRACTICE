# 贝叶斯与条件概率

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=bayes)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E16-04"></a>

## E16-04 · 2016：Naïve Bayes 对 (0,1,0) 分类

来源：2016 年扫描卷 · Q4 / 10 points · PDF p.2

状态：完整；形式：计算 / 推导。

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

| Class | Prior | P(A=0\ | class) | P(B=1\ | class) | P(C=0\ | class) | Unnormalized score |
| --- | --- | --- | --- | --- | --- |
| C1 | 5/10 | 2/5 | 1/5 | 1/5 | 0.008 |
| C2 | 5/10 | 3/5 | 1/5 | 0/5 | 0 |

后验：C1=1, C2=0。预测 C1。

先计算未归一化分数 $P(class)\prod_jP(x_j|class)$；需要后验概率时，再除以各类分数之和。C2 的 C=0 没出现，未平滑分数为 0。若使用二元属性 Laplace +1 平滑：C1 分数 $(1/2)(3/7)(2/7)(2/7)=6/343$；C2 为 $(1/2)(4/7)(2/7)(1/7)=4/343$，归一后 C1=.6、C2=.4，分类不变。

### English answer pattern

Estimate probabilities within each class. The unsmoothed C2 score is zero because C=0 never appears in C2.

在每个类别内部估计概率。C=0 从未在 C2 中出现，因此未平滑的 C2 分数为零。

### 易错点与约定

Laplace 的每个类条件分母为该类样本数 + 属性可取值数，，对应给每个可能取值各增加一次计数。


---

<a id="HW2-02"></a>

## HW2-02 · 当前 HW2：Short/Blond/Brown 分类

来源：当前 HW2 · Written Q2

状态：完整；形式：计算 / 推导。

### 原文

Using the Q1 training table, what would a naïve Bayesian classifier classify Z=(Height=Short,Hair=Blond,Eye=Brown)?

使用 Q1 训练表，朴素贝叶斯分类器会把 Z=(身高=矮，发色=金色，眼睛=棕色) 分为哪类？

### 逐步解答

| Class | Prior | P(Short\ | class) | P(Blond\ | class) | P(Brown\ | class) | Unnormalized score |
| --- | --- | --- | --- | --- | --- |
| C1 | 5/9 | 2/5 | 2/5 | 3/5 | 0.053333 |
| C2 | 4/9 | 1/4 | 2/4 | 0/4 | 0 |

后验：C1=1, C2=0。预测 C1。

原始数据中 C2 从未出现 Brown，所以未平滑 C2 分数为零。不要把未知样本先放入训练表；也不要因词的大小写不同就当不同类别，本题 blond 与 Blond 同义。

### English answer pattern

The unsmoothed classifier predicts C1. Multiplying class-conditional probabilities assumes conditional independence given the class.

未平滑分类器预测 C1。相乘类别条件概率时，假设给定类别后各属性条件独立。


---

<a id="HX2-03"></a>

## HX2-03 · 往届 HW2：吸烟、研究生与宿舍的后验

来源：往届 HW2（hxd） · Written Q3(a-c)

状态：完整；形式：计算 / 推导。

### 原文

The fraction of undergraduates who smoke is 15%, and the fraction of graduates who smoke is 23%. One-fifth of students are graduates. (a) What is P(graduate|smokes)? (b) Is a random student more likely graduate or undergraduate? (c) 30% of graduates and 10% of undergraduates live in a dorm. Given smoking and dorm residence, which class is more likely? Assume independence for the two behaviors.

本科生中吸烟者占 15%，研究生中占 23%。全体学生中五分之一是研究生。（a）P(研究生|吸烟) 是多少？（b）随机学生更可能是研究生还是本科生？（c）研究生有 30%、本科生有 10% 住校。已知吸烟且住校，哪类更可能？假设这两种行为独立。

### 逐步解答

令 G=研究生、U=本科生、S=吸烟、D=住校。

1. $P(S)=.2\times.23+.8\times.15=.166$，因此 $P(G|S)=.046/.166=23/83\approx.277108$。
2. 随机抽一学生，P(U)=.8>P(G)=.2，因此本科生更可能；即使已知吸烟，P(U|S)=60/83 仍更大。
3. 条件独立下，联合分数：G 为 $.2\times.23\times.30=.0138$，U 为 $.8\times.15\times.10=.012$。归一后 $P(G|S,D)=.0138/.0258=23/43\approx.534884$，因此研究生略更可能。

原文 independence 的措辞简略。这里明确假设 $S\perp D\mid class$，因为仅有边缘独立并不足以推出上述类条件乘积。

### English answer pattern

Bayes gives P(G|S)=23/83. Under conditional independence given student status, P(G|S,D)=23/43.

贝叶斯公式给出 P(G|S)=23/83。给定学生身份后条件独立时，P(G|S,D)=23/43。

### 易错点与约定

P(S|G) 在研究生中数吸烟者，P(G|S) 在吸烟者中数研究生；第三问的独立性应明确是给定类别后的条件独立。
