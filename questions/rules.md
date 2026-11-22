# 支持度、置信度与规则

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=rules)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E16-02C"></a>

## E16-02C · 2016 与 2020：二项前件的强关联规则

来源：2016 年扫描卷 · Q2(c) / 5 points · PDF p.1；2020 年扫描卷 · Q4(2) / 5 points · PDF p.1

状态：完整；形式：计算 / 推导。

### 原文

Using the resulting frequent itemsets, find all strong associations matching buys(x,item1) AND buys(x,item2) ⇒ buys(x,item3). min_support=50%; min_confidence=75% in 2016 and 70% in 2020. Use the ten-transaction table from the FP-growth question.

利用所得频繁项集，找出全部符合“购买物品 1 且购买物品 2⇒购买物品 3”的强关联。最小支持度为 50%；2016 年最小置信度为 75%，2020 年为 70%。使用 FP-growth 题的十笔事务表。

### 逐步解答

#### 本题公式

对不相交的非空项集 $X,Y$，$count(X)$ 是包含 X 中全部物品的事务数：

$$\begin{aligned}
supp(X\Rightarrow Y)&=\frac{count(X\cup Y)}{N},\\
conf(X\Rightarrow Y)&=\frac{count(X\cup Y)}{count(X)}.
\end{aligned}$$

支持度以全部事务为分母，衡量规则覆盖；置信度以前件事务为分母，衡量已知 X 时 Y 的命中比例。强规则需要两个阈值同时满足。

#### 2. 代入计数，逐方向检验

频繁三项集只有 $F=\{a,b,e\}$，支持计数为 5。题目限定“两项前件⇒一项后件”，因此只需检验以下三个方向：

| 规则 | 共同计数 | 前件计数 | 置信度 |
| --- | --- | --- | --- |
| $ab\Rightarrow e$ | 5 | 6 | $5/6=0.833333$ |
| $ae\Rightarrow b$ | 5 | 6 | $5/6=0.833333$ |
| $be\Rightarrow a$ | 5 | 7 | $5/7=0.714286$ |

三条支持度均为 $5/10=0.5$，达到共同的最小支持度 50%。

#### 最终答案

- **2016：** $min\_conf=75\%$，保留 $ab\Rightarrow e$、$ae\Rightarrow b$。
- **2020：** $min\_conf=70\%$，以上三条全部保留。

#### 本题关键点

改变规则方向会改变前件计数，即置信度的分母；同一个频繁项集产生的不同方向可以有不同置信度。


### English answer pattern

All three directions have support 0.5, but their confidences differ. The 70% threshold admits one more rule than 75%.

三个方向支持度均为 0.5，但置信度不同。70% 阈值比 75% 多接纳一条规则。

### 知识点与公式总结

- 规则支持度 $supp(X\Rightarrow Y)=count(X\cup Y)/N$，分母是全部事务数。
- 置信度 $conf(X\Rightarrow Y)=count(X\cup Y)/count(X)$，分母是前件出现数；反向规则通常有不同分母。
- 从频繁三项集枚举两项前件、单项后件；2016 置信度阈值为 75%，2020 为 70%，分别与阈值比较。


---

<a id="HW3-02BC"></a>

## HW3-02BC · 当前 HW3：置信度不对称和全部 2⇒1 规则

来源：当前 HW3 · Written Q2(b-c)

状态：完整；形式：计算 / 推导。

### 原文

For the four transactions and min_sup=60%,min_conf=70%, compute confidence for {A,B}⇒{C} and {C}⇒{A,B}. Is confidence symmetric? List all strong rules matching two items ⇒ one item.

对四笔事务，最小支持度 60%、最小置信度 70%，计算 {A,B}⇒{C} 与 {C}⇒{A,B} 的置信度。置信度是否对称？列出全部“两项⇒一项”形式的强规则。

### 逐步解答

#### 本题公式

对不相交的非空项集 $X,Y$，$count(X)$ 是包含 X 中全部物品的事务数：

$$\begin{aligned}
supp(X\Rightarrow Y)&=\frac{count(X\cup Y)}{N},\\
conf(X\Rightarrow Y)&=\frac{count(X\cup Y)}{count(X)}.
\end{aligned}$$

支持度以全部事务为分母，衡量规则覆盖；置信度以前件事务为分母，衡量已知 X 时 Y 的命中比例。强规则需要两个阈值同时满足。

#### 2. 代入计数，逐方向检验

先从四笔事务得到 $count(AB)=4$、$count(C)=2$、$count(ABC)=2$。

$$\begin{aligned}
conf(AB\Rightarrow C)&=\frac{count(ABC)}{count(AB)}=\frac24=0.5,\\
conf(C\Rightarrow AB)&=\frac{count(ABC)}{count(C)}=\frac22=1.
\end{aligned}$$

两方向置信度不同；两条规则的支持度都为 $2/4=0.5<0.6$，因此均未通过最小支持度要求。

#### 3. 枚举符合元规则的强规则

满足支持度的三项集只有 $\{A,B,D\}$，计数为 3。两项前件的计数为 AB:4、AD:3、BD:3。

| 规则 | 支持度 | 置信度 |
| --- | --- | --- |
| $AB\Rightarrow D$ | $3/4=0.75$ | $3/4=0.75$ |
| $AD\Rightarrow B$ | $3/4=0.75$ | $3/3=1$ |
| $BD\Rightarrow A$ | $3/4=0.75$ | $3/3=1$ |

#### 最终答案

置信度**不对称**；上述三条均满足支持度 60%、置信度 70% 以及“两项⇒一项”的要求，构成最终强规则列表。


### English answer pattern

Confidence is directional because it conditions on the antecedent. High confidence alone does not make a strong rule.

置信度以给定前件为条件，因此有方向性。仅有高置信度不足以构成强规则。

### 知识点与公式总结

- 规则支持度 $supp(X\Rightarrow Y)=count(X\cup Y)/N$，分母是全部事务数。
- 置信度 $conf(X\Rightarrow Y)=count(X\cup Y)/count(X)$，分母是前件出现数；反向规则通常有不同分母。
- 每条强规则同时检验最小支持度、最小置信度及“两项⇒一项”的元规则；高置信度本身不能替代支持度要求。


---

<a id="HX3-02"></a>

## HX3-02 · 往届 HW3：EKO 六个方向与元规则

来源：往届 HW3（hxd） · Written Q2(a-b)

状态：完整；形式：计算 / 推导。

### 原文

Using the five transactions, min_sup=40%,min_conf=40%, present confidence for all rules generated from 3-frequent itemsets, then list rules matching two items ⇒ one item.

使用五笔事务，最小支持度 40%、最小置信度 40%，给出由频繁三项集生成的所有规则的置信度，再列出“两项⇒一项”的规则。

### 逐步解答

#### 本题公式

对不相交的非空项集 $X,Y$，$count(X)$ 是包含 X 中全部物品的事务数：

$$\begin{aligned}
supp(X\Rightarrow Y)&=\frac{count(X\cup Y)}{N},\\
conf(X\Rightarrow Y)&=\frac{count(X\cup Y)}{count(X)}.
\end{aligned}$$

支持度以全部事务为分母，衡量规则覆盖；置信度以前件事务为分母，衡量已知 X 时 Y 的命中比例。强规则需要两个阈值同时满足。

#### 2. 代入计数，逐方向检验

频繁三项集只有 $F=\{E,K,O\}$，$count(F)=4$；单项计数为 E:4、K:5、O:4，二项 EK、EO、KO 的计数均为 4。枚举非空真子集作为前件，三项集产生 $2^3-2=6$ 条规则。

| 规则 | 支持度 | 置信度 | 达标 |
| --- | --- | --- | --- |
| $E\Rightarrow KO$ | $4/5=0.8$ | $4/4=1$ | 是 |
| $K\Rightarrow EO$ | $4/5=0.8$ | $4/5=0.8$ | 是 |
| $O\Rightarrow EK$ | $4/5=0.8$ | $4/4=1$ | 是 |
| $EK\Rightarrow O$ | $4/5=0.8$ | $4/4=1$ | 是 |
| $EO\Rightarrow K$ | $4/5=0.8$ | $4/4=1$ | 是 |
| $KO\Rightarrow E$ | $4/5=0.8$ | $4/4=1$ | 是 |

例如 $K\Rightarrow EO$ 的分母是 K 出现的五笔事务，其中四笔还包含 E 和 O，所以置信度为 80%；其余五个方向的前件计数都是 4，置信度均为 100%。六条均满足 40% 的支持度和置信度阈值。

#### 3. 按元规则筛选最终答案

“两项前件⇒一项后件”要求 $|X|=2,|Y|=1$，因此最终保留

$$\boxed{EK\Rightarrow O,\quad EO\Rightarrow K,\quad KO\Rightarrow E}.$$

它们的支持度均为 $0.8$，置信度均为 $1$。前件只有一个物品的前三条用于完整回答“三项集产生的全部规则”，不计入这一元规则的最终列表。


### English answer pattern

Enumerate all six directions from EKO, then keep only the three 2-to-1 rules required by the metarule.

枚举 EKO 的六个方向，再只保留元规则要求的三条“两项到一项”规则。

### 知识点与公式总结

- 规则支持度 $supp(X\Rightarrow Y)=count(X\cup Y)/N$，分母是全部事务数。
- 置信度 $conf(X\Rightarrow Y)=count(X\cup Y)/count(X)$，分母是前件出现数；反向规则通常有不同分母。
- 三项集产生 $2^3-2=6$ 个非空方向；先列全六条，再按“二项前件⇒单项后件”保留对应三条。


---

<a id="LAB-ARM"></a>

## LAB-ARM · 上机参数：前件支持度、lift 与冗余

来源：当前 HW3 · Lab Q2；往届 HW3（hxd） · Lab Recommendation Systems

状态：完整；形式：作业提炼 / 规则比较。

### 原文

Current lab: minimum antecedent support 7%, confidence 45%, maximum antecedents 4. Older lab: 5%,50%,5. Sort rules by lift, support and confidence and remove redundant ones.

当前实验：最小前件支持度 7%、置信度 45%、最大前件数 4。往届实验：5%、50%、5。分别按提升度、支持度和置信度给规则排序，并删除冗余规则。

### 逐步解答

#### 1. 四个指标分别计算

$$\begin{aligned}
supp(X)&=\frac{count(X)}N, &supp(X\Rightarrow Y)&=\frac{count(X\cup Y)}N,\\
conf(X\Rightarrow Y)&=\frac{count(X\cup Y)}{count(X)},&lift(X\Rightarrow Y)&=\frac{conf(X\Rightarrow Y)}{supp(Y)}.
\end{aligned}$$

Lift 把条件命中率与 Y 本来的出现率比较；$lift=1$ 表示在该指标下没有相对提升。

#### 2. 将题目参数与指标对应

当前作业设置要求 $supp(X)\ge0.07$、$conf(X\Rightarrow Y)\ge0.45$、$|X|\le4$；往届参数为 5%、50%、5。前件支持度的分子是 $count(X)$。

$$supp(X\Rightarrow Y)=supp(X)\,conf(X\Rightarrow Y)\ge0.07\times0.45=0.0315.$$

#### 3. 计算比较示例

以下为便于手算的补充数据，总事务数 $N=1000$。

| 规则 | 前件计数 | 后件计数 | 共同计数 | 前件支持度 | 规则支持度 | 置信度 | Lift |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $A\Rightarrow B$ | 100 | 800 | 80 | 0.10 | 0.08 | 0.80 | $0.80/0.80=1$ |
| $C\Rightarrow D$ | 100 | 100 | 30 | 0.10 | 0.03 | 0.30 | $0.30/0.10=3$ |

第一条通过当前阈值；第二条虽有较高 lift，但置信度 0.30 未达到 0.45，先过滤，再排序。排序时分别观察覆盖、命中和相对提升，可解释三个指标为何给出不同顺序。

#### 4. 冗余规则检查

若 $X\Rightarrow Y$ 与 $XZ\Rightarrow Y$ 的置信度、lift 相同，且增加 Z 没有带来有用细分，可以保留较简单规则。使用这个标准时要同时检查对应覆盖和任务需求。


### English answer pattern

Antecedent support is P(X); rule support is P(X∪Y). Lift compares confidence with the consequent baseline.

前件支持度为 P(X)，规则支持度为 P(X∪Y)。Lift 把置信度与后件基准比较。

### 知识点与公式总结

- 规则支持度 $supp(X\Rightarrow Y)=count(X\cup Y)/N$，分母是全部事务数。
- 置信度 $conf(X\Rightarrow Y)=count(X\cup Y)/count(X)$，分母是前件出现数；反向规则通常有不同分母。
- 前件支持度是 $count(X)/N$；提升度 $lift=conf(X\Rightarrow Y)/supp(Y)$，比较命中率与 Y 本来的出现率。
- 先按题给阈值和最大前件数 $|X|$ 过滤，再排序、检查冗余；覆盖、命中率、相对提升分别回答不同问题。
