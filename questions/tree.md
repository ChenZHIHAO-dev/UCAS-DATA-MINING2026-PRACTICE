# 信息增益与决策树

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=tree)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E16-03"></a>

## E16-03 · 2016：二元属性信息增益与整棵树

来源：2016 年扫描卷 · Q3 / 15 points · PDF p.2

状态：完整；形式：计算 / 推导。

### 原文

Given attributes {A,B,C} and classes {C1,C2}, build a decision tree using information gain to select the split attribute.

给定属性 {A,B,C} 和类别 {C1,C2}，构建决策树，使用信息增益选择分裂属性。

| ID | A | B | C | Class |
| --- | --- | --- | --- | --- |
| 1 | 0 | 0 | 0 | C1 |
| 2 | 0 | 0 | 1 | C1 |
| 3 | 0 | 1 | 0 | C1 |
| 4 | 0 | 1 | 1 | C2 |
| 5 | 1 | 0 | 0 | C1 |
| 6 | 1 | 0 | 0 | C1 |
| 7 | 1 | 1 | 0 | C2 |
| 8 | 1 | 0 | 1 | C1 |
| 9 | 1 | 1 | 0 | C2 |
| 10 | 1 | 1 | 0 | C2 |

### 逐步解答

总计 C1=6、C2=4，$H(D)=0.970951$。使用 $Gain(A)=H(D)-\sum_v |D_v|H(D_v)/|D|$。

| Attribute | Conditional entropy | Information gain |
| --- | --- | --- |
| A | 0.924511 | 0.046439 |
| B | 0.360964 | 0.609987 |
| C | 0.965148 | 0.005802 |

根选 B。B=0 有 5 条，全部 C1；B=1 有 5 条，其中 C1=1、C2=4，熵 $H(1/5,4/5)=0.721928$。

| Attribute | Conditional entropy | Information gain |
| --- | --- | --- |
| A | 0.4 | 0.321928 |
| B | 0.721928 | 0 |
| C | 0.649022 | 0.072906 |

该子集选 A；A=1 有三条全部 C2；A=0 两条由 C 区分。

```text
B?
├─ 0 → C1
└─ 1 → A?
        ├─ 1 → C2
        └─ 0 → C?
                ├─ 0 → C1
                └─ 1 → C2
```
逐行回代全部十个样本即可检查树是否一致。重复样本仍须保留其计数权重。

### English answer pattern

Choose B at the root and recursively recompute information gain on the B=1 subset.

根节点选 B，在 B=1 子集中重新计算信息增益并递归。

### 易错点与约定

分支权重取该分支样本数占当前节点样本总数的比例。某子集上已用属性 B 的增益为 0，不应再次选择。


---

<a id="HW2-01"></a>

## HW2-01 · 当前与往届同题：Height/Hair/Eye 建树

来源：当前 HW2 · Written Q1；往届 HW2（hxd） · Written Q1

状态：完整；形式：计算 / 推导。

### 原文

Compute information gain for Height, Hair and Eye, then construct a decision tree.

计算身高、发色和眼睛颜色的信息增益，再构建决策树。

| ID | Height | Hair | Eye | Class |
| --- | --- | --- | --- | --- |
| 1 | Tall | Blond | Brown | C1 |
| 2 | Tall | Dark | Blue | C1 |
| 3 | Tall | Dark | Brown | C1 |
| 4 | Short | Dark | Blue | C1 |
| 5 | Short | Blond | Brown | C1 |
| 6 | Tall | Red | Blue | C2 |
| 7 | Tall | Blond | Blue | C2 |
| 8 | Short | Blond | Blue | C2 |
| 9 | Medium | Dark | Blue | C2 |

表中 Tall、Short、Medium 为高、矮、中等；Blond、Dark、Red 为金色、深色、红色；Brown、Blue 为棕色、蓝色。

### 逐步解答

总体 C1=5、C2=4，熵 $H=0.991076$。

| Attribute | Conditional entropy | Information gain |
| --- | --- | --- |
| Height | 0.845516 | 0.14556 |
| Hair | 0.805012 | 0.186064 |
| Eye | 0.612197 | 0.378879 |

根选 Eye。Brown 的三条全部 C1；Blue 的六条 C1=2、C2=4。在 Blue 子集重算，Hair 的增益为 0.459148，Height 为 0.125815，故选 Hair。Hair=Blond/Red 均为 C2；Dark 子集按 Height，Tall/Short 为 C1，Medium 为 C2。

```text
Eye
├─ Brown → C1
└─ Blue → Hair
          ├─ Blond → C2
          ├─ Red → C2
          └─ Dark → Height
                    ├─ Tall → C1
                    ├─ Short → C1
                    └─ Medium → C2
```

往届参考解把总体熵写成约 .9917，与精确 .991076 有误差；本题库以重新计算值为准。

### English answer pattern

Eye has the largest root information gain. Recompute gains within the Blue subset and split by Hair.

Eye 在根节点的信息增益最大。在 Blue 子集内重算增益，按 Hair 分裂。

### 易错点与约定

当前 HW2 网络题 Q3 的第 8、9 条标签是 C3，这个建树题中仍是 C2。


---

<a id="E25-04"></a>

## E25-04 · 2025 · 第4题：8 行频数表的信息增益与一层树

来源：2025 年人工智能学院回忆卷 · Q4 · PDF p.1；2025 年人工智能学院回忆卷 · Q4 续：信息增益与根分裂要求 · PDF p.2

状态：完整复原练习；形式：回忆复原 / 完整练习。

**复原依据：**回忆的表有 X/Y/Z 三个二元属性及 C1/C2 两列样本频数，原卷为 8 行。先算指定属性的信息增益，再选根属性并画根分裂；作者给的四行数字为自填示例。

**补配与口径：**

- 补配 X/Y/Z 的完整 8 组合频数表。
- 限定画一层分裂（根 + 两个子结点），子结点标频数；按多数票加预测标签。

以下为可完整作答的复原练习；补配数值不是原卷原值。

### 原文

Each row below represents multiple samples. Columns C1 and C2 are class **counts**, not input attributes. Logs are base 2.

下表每行代表多个样本。C1、C2 列是类别**计数**，不是输入属性。对数以 2 为底。

| X | Y | Z | C1 | C2 |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 5 | 35 |
| 0 | 0 | 1 | 10 | 30 |
| 0 | 1 | 0 | 15 | 15 |
| 0 | 1 | 1 | 10 | 20 |
| 1 | 0 | 0 | 30 | 10 |
| 1 | 0 | 1 | 35 | 5 |
| 1 | 1 | 0 | 20 | 10 |
| 1 | 1 | 1 | 15 | 15 |

**(a)** Compute the information gain for splitting on X. Show the total sample size, class counts, parent entropy and weighted child entropy.

**(a)** 计算按 X 分裂的信息增益。给出总样本数、类别计数、父熵与加权子熵。

**(b)** Compute the gains for Y and Z and choose the root attribute.

**(b)** 计算 Y、Z 的信息增益，并选择根属性。

**(c)** Draw **only the first split**: the root and its two child nodes. Annotate each child with its C1/C2 counts. If stopping at this depth, label each child by majority class. Do not recursively grow the full tree.

**(c)** 只画**第一次分裂**，即根及两个子节点。在各子节点标出 C1、C2 计数。若在此深度停止，按多数类给子节点标记。不要递归生长完整树。

### 小问要求与完成标准

| 小问 | 必须交付 | 停止位置 |
| --- | --- | --- |
| (a) | 总样本数、总类频数、H(D)、H(D\|X)、Gain(X) | 频数加权，不把 8 行当作 8 个单样本。 |
| (b) | 对 Y、Z 也计算增益并比较 | 选最大增益属性作为根。 |
| (c) | 一层决策树及每个子结点的 C1/C2 频数、停止时多数类 | 只分裂根一次，不递归到完整树。 |

### 逐步解答

#### 1. 按类别频数计算样本量

$$N=280,\qquad n_{C_1}=140,\qquad n_{C_2}=140.$$
$$H(D)=-\tfrac12\log_2\tfrac12-\tfrac12\log_2\tfrac12=1\ \text{bit}.$$

某行如 $(X,Y,Z)=(0,0,0)$ 代表 $5+35=40$ 个样本；将八行的类别计数全部相加，得到 280 个样本。

#### 2. 展开 X 的加权熵

X=0 的类频数为 $(40,100)$，X=1 为 $(100,40)$，两组均 140 人。组内比例分别为 $(2/7,5/7)$ 及 $(5/7,2/7)$。

这里 $H(p_1,p_2)=-p_1\log_2p_1-p_2\log_2p_2$，表示给定两类比例时的不确定性；两组各占总样本的一半。

$$\begin{aligned}
H(D\mid X)&=\frac{140}{280}H\!\left(\frac27,\frac57\right)\\
&\quad+\frac{140}{280}H\!\left(\frac57,\frac27\right)\\
&=0.863120569.
\end{aligned}$$
$$Gain(X)=1-0.863120569=\boxed{0.136879431}.$$

#### 3. 比较 Y、Z

| Attribute | 0 branch: (C1,C2) | 1 branch: (C1,C2) | Weighted entropy | Information gain |
| --- | --- | --- | --- | --- |
| X | (40, 100) | (100, 40) | 0.863120569 | 0.136879431 |
| Y | (80, 80) | (60, 60) | 1.000000000 | 0.000000000 |
| Z | (70, 70) | (70, 70) | 1.000000000 | 0.000000000 |

Y 的两组都是类比例 1:1，Z 也一样，所以条件熵都为 1，增益 0。根选 **X**。

#### 4. 按要求只画一层

![X 的一次分裂与子结点频数](../assets/diagrams/recall2025-stump.svg)

X=0 预测 C2，X=1 预测 C1。两个子节点仍包含两类样本；按各节点多数类标记，即完成题目要求的**一层截断树**。

### English answer pattern

The dataset contains 280 samples. Gain(X)=0.136879431, while Gain(Y)=Gain(Z)=0. Select X and draw only its two children, labeled C2 and C1 by majority vote.

数据集有 280 个样本。Gain(X)=0.136879431，Gain(Y)=Gain(Z)=0。选 X，只画两个子节点；按多数投票分别标为 C2、C1。

### 易错点与约定

类频数不能当作模型输入；组熵必须乘该组样本比例。多数类标签用于预测；节点是否纯，要检查另一类计数是否为 0。

### 计算与内存分析

对 $r$ 行聚合记录和 $d$ 个属性，可用 $O(rd)$ 时间汇总分裂统计，无须把频数展开成 $N$ 行；额外计数空间按属性取值和类别数计。


---

<a id="E20-03C"></a>

## E20-03C · 2020 简答：决策树如何选择分裂属性

来源：2020 年扫描卷 · Q3(3) / 4 points · PDF p.1

状态：完整；形式：历年简答。

### 原文

Please present an attribute selection method in a decision tree.

请给出一种决策树的属性选择方法。

### 逐步解答

可答信息增益：$H(D)=-\sum_cp_c\log_2p_c$，$H(D|A)=\sum_v(|D_v|/|D|)H(D_v)$，$Gain(A)=H(D)-H(D|A)$，在可用属性中选 Gain 最大者。

其中 $p_c$ 为当前结点中类别 c 的比例，$D_v$ 是按 A=v 划出的子集；递归到每个子节点时需重新计算其局部比例。多取值属性的信息增益可能偏高，可用增益率 $Gain/SplitInfo$，但分母零、低增益问题需处理。

如果答 Gini，则写 $Gini(D)=1-\sum_cp_c^2$，选择加权子 Gini 最小的分裂。两种准则不混用。

### English answer pattern

Select the attribute with maximum information gain, recomputed from class proportions at the current node.

选择信息增益最大的属性；在当前节点上根据类别比例重新计算。
