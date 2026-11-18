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

每条规则的支持度用并集计数除以总事务数，置信度用并集计数除以前件计数。前件改变时，置信度的分母也随之改变。

频繁三项集只有 abe，计数 5。三个方向分别检验：

| Rule | 共同计数 | 前件计数 | 置信度 Confidence |
| --- | --- | --- | --- |
| ab ⇒ e | 5 | 6 | 5/6=.833333 |
| ae ⇒ b | 5 | 6 | 5/6=.833333 |
| be ⇒ a | 5 | 7 | 5/7=.714286 |

所以 2016 通过前两条，2020 三条都通过；支持度均 5/10=.5。把 .70 误记成 .75 会漏掉 2020 的 be⇒a。

### English answer pattern

All three directions have support 0.5, but their confidences differ. The 70% threshold admits one more rule than 75%.

三个方向支持度均为 0.5，但置信度不同。70% 阈值比 75% 多接纳一条规则。


---

<a id="HW3-02BC"></a>

## HW3-02BC · 当前 HW3：置信度不对称和全部 2⇒1 规则

来源：当前 HW3 · Written Q2(b-c)

状态：完整；形式：计算 / 推导。

### 原文

For the four transactions and min_sup=60%,min_conf=70%, compute confidence for {A,B}⇒{C} and {C}⇒{A,B}. Is confidence symmetric? List all strong rules matching two items ⇒ one item.

对四笔事务，最小支持度 60%、最小置信度 70%，计算 {A,B}⇒{C} 与 {C}⇒{A,B} 的置信度。置信度是否对称？列出全部“两项⇒一项”形式的强规则。

### 逐步解答

count(X) 表示同时包含项集 X 中全部物品的事务数。对 X⇒Y，先数同时包含 X、Y 的事务，再除以包含 X 的事务数，得到置信度。

count(AB)=4、count(C)=2、count(ABC)=2，因此 conf(AB⇒C)=.5，conf(C⇒AB)=1，不对称；两条支持度都 .5，低于 .6，均未通过该支持度阈值。

满足支持度的三项集只有 ABD，count=3：

| Rule | 支持度 Support | 置信度 Confidence |
| --- | --- | --- |
| AB ⇒ D | 3/4 | 3/4 = 0.75 |
| AD ⇒ B | 3/4 | 3/3 = 1 |
| BD ⇒ A | 3/4 | 3/3 = 1 |

元规则只允许两项前件与单项后件，不把 A⇒BD 等加入这个答案。

### English answer pattern

Confidence is directional because it conditions on the antecedent. High confidence alone does not make a strong rule.

置信度以给定前件为条件，因此有方向性。仅有高置信度不足以构成强规则。


---

<a id="HX3-02"></a>

## HX3-02 · 往届 HW3：EKO 六个方向与元规则

来源：往届 HW3（hxd） · Written Q2(a-b)

状态：完整；形式：计算 / 推导。

### 原文

Using the five transactions, min_sup=40%,min_conf=40%, present confidence for all rules generated from 3-frequent itemsets, then list rules matching two items ⇒ one item.

使用五笔事务，最小支持度 40%、最小置信度 40%，给出由频繁三项集生成的所有规则的置信度，再列出“两项⇒一项”的规则。

### 逐步解答

count(EKO)=4、count(E)=4、count(K)=5、count(O)=4，EK/EO/KO 的计数都为 4。

| Rule | 支持度 Support | 置信度 Confidence |
| --- | --- | --- |
| C ⇒ K | 2/5 | 2/2 = 1 |
| K ⇒ C | 2/5 | 2/5 = 0.4 |
| E ⇒ K | 4/5 | 4/4 = 1 |
| K ⇒ E | 4/5 | 4/5 = 0.8 |
| E ⇒ O | 4/5 | 4/4 = 1 |
| O ⇒ E | 4/5 | 4/4 = 1 |
| K ⇒ O | 4/5 | 4/5 = 0.8 |
| O ⇒ K | 4/5 | 4/4 = 1 |
| E ⇒ KO | 4/5 | 4/4 = 1 |
| K ⇒ EO | 4/5 | 4/5 = 0.8 |
| O ⇒ EK | 4/5 | 4/4 = 1 |
| EK ⇒ O | 4/5 | 4/4 = 1 |
| EO ⇒ K | 4/5 | 4/4 = 1 |
| KO ⇒ E | 4/5 | 4/4 = 1 |

上表包含全部频繁项集产生的强规则。题目“由三项集产生的规则”只取并集为 EKO 的六条：E⇒KO、K⇒EO、O⇒EK、EK⇒O、EO⇒K、KO⇒E。它们置信度依次 1、.8、1、1、1、1，支持度均 .8。元规则再只留最后三条。

### English answer pattern

Enumerate all six directions from EKO, then keep only the three 2-to-1 rules required by the metarule.

枚举 EKO 的六个方向，再只保留元规则要求的三条“两项到一项”规则。


---

<a id="LAB-ARM"></a>

## LAB-ARM · 上机参数：前件支持度、lift 与冗余

来源：当前 HW3 · Lab Q2；往届 HW3（hxd） · Lab Recommendation Systems

状态：完整；形式：作业提炼 / 规则比较。

### 原文

Current lab: minimum antecedent support 7%, confidence 45%, maximum antecedents 4. Older lab: 5%,50%,5. Sort rules by lift, support and confidence and remove redundant ones.

当前实验：最小前件支持度 7%、置信度 45%、最大前件数 4。往届实验：5%、50%、5。分别按提升度、支持度和置信度给规则排序，并删除冗余规则。

### 逐步解答

设 N=1000，count(A)=100、count(B)=800、count(AB)=80。规则 A⇒B 的前件支持度 .1、规则支持度 .08、置信度 .8、lift=.8/.8=1。虽然 confidence 高，B 本来就常见，A 没提供相对提升。

另规则 C⇒D：count(C)=100,count(D)=100,count(CD)=30，confidence=.3、support=.03、lift=3；提升度更高但覆盖与命中率更低，不能只凭一个指标说绝对更好。

最大前件数 4 表示规则左侧项集满足 |X|≤4。Minimum antecedent support=.07 比较 count(X)/N；若 confidence≥.45，则规则支持可低至 .0315，；应与前件支持度分别计算。

冗余检查：若 X⇒Y 和 XZ⇒Y 的置信度/提升度相同、后者没有新增解释或有用覆盖，可考虑省去更复杂规则；“前件不同”不意味着逻辑上完全不重复。剔除标准须声明，不把所有包含关系规则一概删去。

### English answer pattern

Antecedent support is P(X); rule support is P(X∪Y). Lift compares confidence with the consequent baseline.

前件支持度为 P(X)，规则支持度为 P(X∪Y)。Lift 把置信度与后件基准比较。
