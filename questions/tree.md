# 信息增益与决策树

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=tree)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E16-03"></a>

## E16-03 · 2016：二元属性信息增益与整棵树

来源：2016 年扫描卷 · Q3 / 15 points · PDF p.2

状态：完整；形式：计算 / 推导。

### 本题公式 · 决策树：符号、公式与选属性规则

### 先认清符号

- $D$：**当前节点**的数据集，$|D|$ 为其中样本数。
- $C_k$：第 $k$ 个**类别**；$p_k=n_k/|D|$ 为当前节点内该类占比。
- $A$：待比较的**分裂属性**；$v$ 是它的一个取值。代入题目时，$A$ 可换成 B、Hair、Eye 等实际列名。
- $D_v=\{x\in D:A(x)=v\}$：按 $A=v$ 分出的子集；$w_v=|D_v|/|D|$ 为该分支占父节点的比例。

计算 $H(D_v)$ 时，用该子集内部的类别比例。所有对数以2为底，$0\log_2 0=0$。

### ① 类别熵 Entropy：当前节点有多混杂

$$H(D)=-\sum_k p_k\log_2p_k.$$

只有一个类别时为0；二分类各占一半时为1 bit。

### ② 条件熵 Conditional entropy：分裂后还剩多少混杂

$$H(D\mid A)=\sum_v w_vH(D_v).$$

先算每个子集的类别熵，再按子集人数占比加权。

### ③ 信息增益 Information gain：熵减少了多少

$$Gain(A)=H(D)-H(D\mid A).$$

选择信息增益最大的属性，再对未纯净子节点重新计算。

### ④ 分裂信息 Split information：样本怎样分配到分支

$$SplitInfo(A)=-\sum_v w_v\log_2w_v.$$

这里用的是**各分支人数比例 $w_v$**；类别熵用的是**各类别人数比例 $p_k$**。

### ⑤ 增益率 Gain ratio：用分裂信息归一化增益

$$GainRatio(A)=\frac{Gain(A)}{SplitInfo(A)}.$$

按增益率准则比较有效候选时，取较大者；$SplitInfo(A)=0$ 的分裂跳过该比值。C4.5还结合信息增益筛选候选，避免仅由很小的分母获得较高比值。

### ⑥ 基尼指数 Gini index：用平方比例衡量类别混杂

$$\begin{aligned}
Gini(D)&=1-\sum_k p_k^2,\\
Gini_{split}(A)&=\sum_v w_vGini(D_v),\\
\Delta Gini(A)&=Gini(D)-Gini_{split}(A).
\end{aligned}$$

选择**加权子 Gini 最小**的分裂，等价于选择 **$\Delta Gini$ 最大**的分裂。

**计算顺序：** 当前节点类频数 → 子节点类频数与人数权重 → 代入公式 → 比较结果 → 画树。

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

#### 1. 父节点：先数类别，再代入熵

当前 $D$ 有10条记录，$C_1$ 有6条、$C_2$ 有4条：

$$H(D)=-\frac6{10}\log_2\frac6{10}-\frac4{10}\log_2\frac4{10}
=\boxed{0.970951}.$$

#### 2. 按 A、B、C 分组，列出类频数与子熵

每对计数依次为 $(C_1,C_2)$。

| 属性 | 分支 | 类频数 | $|D_v|$ | $H(D_v)$ |
| --- | --- | --- | --- | --- |
| A | 0 | (3,1) | 4 | 0.811278 |
| A | 1 | (3,3) | 6 | 1 |
| B | 0 | (5,0) | 5 | 0 |
| B | 1 | (1,4) | 5 | 0.721928 |
| C | 0 | (4,3) | 7 | 0.985228 |
| C | 1 | (2,1) | 3 | 0.918296 |

例如A=0的子集，类别比例为 $3/4,1/4$：

$$H(D_{A=0})=-\frac34\log_2\frac34-\frac14\log_2\frac14=0.811278.$$

#### 3. 每个属性都写“加权条件熵 → 信息增益”

$$\begin{aligned}
H(D\mid A)&\approx\frac4{10}(0.811278124)+\frac6{10}(1)=0.924511250,\\
Gain(A)&\approx0.970950594-0.924511250\approx\boxed{0.046439}.
\end{aligned}$$

$$\begin{aligned}
H(D\mid B)&\approx\frac5{10}(0)+\frac5{10}(0.721928095)=0.360964047,\\
Gain(B)&\approx0.970950594-0.360964047\approx\boxed{0.609987}.
\end{aligned}$$

$$\begin{aligned}
H(D\mid C)&\approx\frac7{10}(0.985228136)+\frac3{10}(0.918295834)=0.965148445,\\
Gain(C)&\approx0.970950594-0.965148445\approx\boxed{0.005802}.
\end{aligned}$$

B的信息增益最大，故根节点选择B。B=0的5条记录全为$C_1$，直接成为叶节点。

#### 4. 只在 B=1 的5条数据内比较 A、C

现在令 $D$ 为B=1子节点的数据。类频数为$(1,4)$，故 $H(D)=0.721928$。

| 候选属性 | 0分支 $(C_1,C_2)$ | 1分支 $(C_1,C_2)$ |
| --- | --- | --- |
| A | (1,1)，2条 | (0,3)，3条 |
| C | (1,3)，4条 | (0,1)，1条 |

$$\begin{aligned}
H(D\mid A)&=\frac25(1)+\frac35(0)=0.4,\\
Gain(A)&=0.721928-0.4=\boxed{0.321928};\\[4pt]
H(D\mid C)&=\frac45(0.811278)+\frac15(0)=0.649022,\\
Gain(C)&=0.721928-0.649022=\boxed{0.072906}.
\end{aligned}$$

该节点选择A。A=1的3条记录全为$C_2$；A=0的2条记录类别各一，熵为1。最后用C将这两条分开，条件熵为0、增益为1：C=0给$C_1$，C=1给$C_2$。

#### 5. 根据上述选择画最终树

![2016决策树：根为B；B=1分支继续按A、C分裂](../assets/solutions/detail-tree-2016.svg)

从根沿属性取值到叶节点即可预测。将原表10条记录逐行代回，全部分类一致；重复记录保留原有计数。

### English answer pattern

Choose B at the root: $Gain(B)=0.609987$. The B=0 branch is C1. In the B=1 subset, choose A: $Gain(A)=0.321928$. The A=1 branch is C2; split A=0 by C to obtain pure leaves.

根选择B：$Gain(B)=0.609987$。B=0分支为C1。在B=1子集中选择A：$Gain(A)=0.321928$。A=1分支为C2；对A=0再按C分裂，得到纯叶节点。

### 易错点与约定

分支权重取该分支样本数占当前节点样本总数的比例。某子集上已用属性 B 的增益为 0，不应再次选择。

### 知识点与公式总结

- $D$始终表示当前节点：根有10条数据；进入B=1后，分母改为该节点的5条数据。
- 根增益：$Gain(B)=0.609987>Gain(A)=0.046439>Gain(C)=0.005802$。
- B=1内：$Gain(A)=0.321928>Gain(C)=0.072906$，故先按A，再用C区分剩下两条。
- 计算权重$w_v$用分支人数，计算子熵用分支内部类别比例。


---

<a id="HW2-01"></a>

## HW2-01 · 当前与往届同题：Height/Hair/Eye 建树

来源：当前 HW2 · Written Q1；往届 HW2（hxd） · Written Q1

状态：完整；形式：计算 / 推导。

### 本题公式 · 决策树：符号、公式与选属性规则

### 先认清符号

- $D$：**当前节点**的数据集，$|D|$ 为其中样本数。
- $C_k$：第 $k$ 个**类别**；$p_k=n_k/|D|$ 为当前节点内该类占比。
- $A$：待比较的**分裂属性**；$v$ 是它的一个取值。代入题目时，$A$ 可换成 B、Hair、Eye 等实际列名。
- $D_v=\{x\in D:A(x)=v\}$：按 $A=v$ 分出的子集；$w_v=|D_v|/|D|$ 为该分支占父节点的比例。

计算 $H(D_v)$ 时，用该子集内部的类别比例。所有对数以2为底，$0\log_2 0=0$。

### ① 类别熵 Entropy：当前节点有多混杂

$$H(D)=-\sum_k p_k\log_2p_k.$$

只有一个类别时为0；二分类各占一半时为1 bit。

### ② 条件熵 Conditional entropy：分裂后还剩多少混杂

$$H(D\mid A)=\sum_v w_vH(D_v).$$

先算每个子集的类别熵，再按子集人数占比加权。

### ③ 信息增益 Information gain：熵减少了多少

$$Gain(A)=H(D)-H(D\mid A).$$

选择信息增益最大的属性，再对未纯净子节点重新计算。

### ④ 分裂信息 Split information：样本怎样分配到分支

$$SplitInfo(A)=-\sum_v w_v\log_2w_v.$$

这里用的是**各分支人数比例 $w_v$**；类别熵用的是**各类别人数比例 $p_k$**。

### ⑤ 增益率 Gain ratio：用分裂信息归一化增益

$$GainRatio(A)=\frac{Gain(A)}{SplitInfo(A)}.$$

按增益率准则比较有效候选时，取较大者；$SplitInfo(A)=0$ 的分裂跳过该比值。C4.5还结合信息增益筛选候选，避免仅由很小的分母获得较高比值。

### ⑥ 基尼指数 Gini index：用平方比例衡量类别混杂

$$\begin{aligned}
Gini(D)&=1-\sum_k p_k^2,\\
Gini_{split}(A)&=\sum_v w_vGini(D_v),\\
\Delta Gini(A)&=Gini(D)-Gini_{split}(A).
\end{aligned}$$

选择**加权子 Gini 最小**的分裂，等价于选择 **$\Delta Gini$ 最大**的分裂。

**计算顺序：** 当前节点类频数 → 子节点类频数与人数权重 → 代入公式 → 比较结果 → 画树。

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

#### 1. 计算父熵

当前 $D$ 有9条记录，类别计数为$(C_1,C_2)=(5,4)$：

$$H(D)=-\frac59\log_2\frac59-\frac49\log_2\frac49=\boxed{0.991076}.$$

#### 2. 为每个候选属性数清分支

| 属性 | 分支及 $(C_1,C_2)$ | 子集人数 |
| --- | --- | --- |
| Height | Tall:(3,2)；Short:(2,1)；Medium:(0,1) | 5，3，1 |
| Hair | Blond:(2,2)；Dark:(3,1)；Red:(0,1) | 4，4，1 |
| Eye | Brown:(3,0)；Blue:(2,4) | 3，6 |

#### 3. 代入条件熵并逐个算增益

$$\begin{aligned}
H(D\mid Height)&=\frac59(0.970951)+\frac39(0.918296)+\frac19(0)\\
&=0.845516,\\
Gain(Height)&=0.991076-0.845516=\boxed{0.145560}.
\end{aligned}$$

$$\begin{aligned}
H(D\mid Hair)&=\frac49(1)+\frac49(0.811278)+\frac19(0)=0.805012,\\
Gain(Hair)&=0.991076-0.805012=\boxed{0.186064}.
\end{aligned}$$

$$\begin{aligned}
H(D\mid Eye)&=\frac39(0)+\frac69(0.918296)=0.612197,\\
Gain(Eye)&=0.991076-0.612197=\boxed{0.378879}.
\end{aligned}$$

根选Eye。Brown的3条全为$C_1$；Blue的6条为$(2,4)$，需要继续分裂。

#### 4. 在 Eye=Blue 的局部数据中重算

现在 $D$ 为Blue子节点的6条数据，$H(D)=0.918296$。

- Hair：Dark为$(2,1)$共3条；Blond两条与Red一条均为$C_2$。
- Height：Tall为$(1,2)$共3条；Short为$(1,1)$共2条；Medium一条为$C_2$。

$$\begin{aligned}
H(D\mid Hair)&=\frac36(0.918296)+\frac26(0)+\frac16(0)=0.459148,\\
Gain(Hair)&=0.918296-0.459148=\boxed{0.459148};\\[4pt]
H(D\mid Height)&=\frac36(0.918296)+\frac26(1)+\frac16(0)=0.792481,\\
Gain(Height)&=0.918296-0.792481=\boxed{0.125815}.
\end{aligned}$$

选择Hair。Blond、Red直接标$C_2$；Dark的3条再按Height分成三个纯叶：Tall、Short标$C_1$，Medium标$C_2$。最后这次Height分裂的加权子熵为0。

#### 5. 画树并检查样本

![HW2决策树：根Eye，Blue分支按Hair，Dark分支按Height](../assets/solutions/detail-tree-hw2.svg)

该树正确分类原表全部9条记录。

### English answer pattern

The root gains for Height, Hair and Eye are 0.145560,0.186064 and 0.378879, so choose Eye. Brown is C1. Within Blue, choose Hair; Blond and Red are C2. Split Dark by Height: Tall and Short are C1, Medium is C2.

Height、Hair和Eye在根节点的增益分别为0.145560、0.186064和0.378879，因此选择Eye。Brown为C1。在Blue内选择Hair；Blond和Red为C2。Dark按Height分裂：Tall和Short为C1，Medium为C2。

### 易错点与约定

当前 HW2 网络题 Q3 的第 8、9 条标签是 C3，这个建树题中仍是 C2。

### 知识点与公式总结

- 根类频数为$(5,4)$；先求各属性的加权子熵，再用父熵$0.991076$相减。
- Eye增益最大$0.378879$；Brown为纯叶，Blue进入局部递归。
- Blue内用6条数据重算，Hair增益$0.459148$，大于Height的$0.125815$。
- 最终树在计算之后画；每次分裂选择与局部数据的计算结果对应。


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

### 本题公式 · 决策树：符号、公式与选属性规则

### 先认清符号

- $D$：**当前节点**的数据集，$|D|$ 为其中样本数。
- $C_k$：第 $k$ 个**类别**；$p_k=n_k/|D|$ 为当前节点内该类占比。
- $A$：待比较的**分裂属性**；$v$ 是它的一个取值。代入题目时，$A$ 可换成 B、Hair、Eye 等实际列名。
- $D_v=\{x\in D:A(x)=v\}$：按 $A=v$ 分出的子集；$w_v=|D_v|/|D|$ 为该分支占父节点的比例。

计算 $H(D_v)$ 时，用该子集内部的类别比例。所有对数以2为底，$0\log_2 0=0$。

### ① 类别熵 Entropy：当前节点有多混杂

$$H(D)=-\sum_k p_k\log_2p_k.$$

只有一个类别时为0；二分类各占一半时为1 bit。

### ② 条件熵 Conditional entropy：分裂后还剩多少混杂

$$H(D\mid A)=\sum_v w_vH(D_v).$$

先算每个子集的类别熵，再按子集人数占比加权。

### ③ 信息增益 Information gain：熵减少了多少

$$Gain(A)=H(D)-H(D\mid A).$$

选择信息增益最大的属性，再对未纯净子节点重新计算。

### ④ 分裂信息 Split information：样本怎样分配到分支

$$SplitInfo(A)=-\sum_v w_v\log_2w_v.$$

这里用的是**各分支人数比例 $w_v$**；类别熵用的是**各类别人数比例 $p_k$**。

### ⑤ 增益率 Gain ratio：用分裂信息归一化增益

$$GainRatio(A)=\frac{Gain(A)}{SplitInfo(A)}.$$

按增益率准则比较有效候选时，取较大者；$SplitInfo(A)=0$ 的分裂跳过该比值。C4.5还结合信息增益筛选候选，避免仅由很小的分母获得较高比值。

### ⑥ 基尼指数 Gini index：用平方比例衡量类别混杂

$$\begin{aligned}
Gini(D)&=1-\sum_k p_k^2,\\
Gini_{split}(A)&=\sum_v w_vGini(D_v),\\
\Delta Gini(A)&=Gini(D)-Gini_{split}(A).
\end{aligned}$$

选择**加权子 Gini 最小**的分裂，等价于选择 **$\Delta Gini$ 最大**的分裂。

**计算顺序：** 当前节点类频数 → 子节点类频数与人数权重 → 代入公式 → 比较结果 → 画树。

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

#### 1. (a) 频数相加得到样本数与父熵

C1、C2列给的是每行的类别人数。八行合计：

$$n_{C_1}=140,\qquad n_{C_2}=140,\qquad |D|=280.$$

$$H(D)=-\frac{140}{280}\log_2\frac{140}{280}
-\frac{140}{280}\log_2\frac{140}{280}=1.$$

#### 2. (a) 按 X 分组，再算条件熵和增益

X=0：$(C_1,C_2)=(40,100)$，共140人；X=1：$(100,40)$，共140人。

$$\begin{aligned}
H(D_{X=0})&=-\frac{40}{140}\log_2\frac{40}{140}
-\frac{100}{140}\log_2\frac{100}{140}=0.863120569,\\
H(D_{X=1})&=0.863120569,\\
H(D\mid X)&=\frac{140}{280}(0.863120569)
+\frac{140}{280}(0.863120569)=0.863120569,\\
Gain(X)&=1-0.863120569=\boxed{0.136879431}.
\end{aligned}$$

#### 3. (b) 对 Y、Z 也写出加权代入

| 属性 | 0分支 $(C_1,C_2)$ | 1分支 $(C_1,C_2)$ |
| --- | --- | --- |
| Y | (80,80)，160人 | (60,60)，120人 |
| Z | (70,70)，140人 | (70,70)，140人 |

四个子集的两类比例均为 $1/2,1/2$，所以各自的类别熵均为1：

$$\begin{aligned}
H(D\mid Y)&=\frac{160}{280}(1)+\frac{120}{280}(1)=1,\\
Gain(Y)&=1-1=\boxed{0};\\[4pt]
H(D\mid Z)&=\frac{140}{280}(1)+\frac{140}{280}(1)=1,\\
Gain(Z)&=1-1=\boxed{0}.
\end{aligned}$$

最大信息增益来自X，故选X为根。

#### 4. (c) 只画题目要求的一层

![X的首次分裂：子节点频数及多数类标签](../assets/diagrams/recall2025-stump.svg)

X=0的子节点标$(40,100)$，多数类为$C_2$；X=1标$(100,40)$，多数类为$C_1$。按题意在这一层停止。

### English answer pattern

There are 280 samples, with 140 in each class. $H(D)=1$ and $H(D\mid X)=0.863120569$, giving $Gain(X)=0.136879431$. $Gain(Y)=Gain(Z)=0$. Draw only the X split: child counts are (40,100) and (100,40), labeled C2 and C1.

共有280个样本，每类140个。$H(D)=1$，$H(D\mid X)=0.863120569$，因此$Gain(X)=0.136879431$。$Gain(Y)=Gain(Z)=0$。只画X的分裂：子节点频数为(40,100)和(100,40)，分别标为C2和C1。

### 易错点与约定

类频数不能当作模型输入；组熵必须乘该组样本比例。多数类标签用于预测；节点是否纯，要检查另一类计数是否为 0。

### 计算与内存分析

对 $r$ 行聚合记录和 $d$ 个属性，可用 $O(rd)$ 时间汇总分裂统计，无须把频数展开成 $N$ 行；额外计数空间按属性取值和类别数计。

### 知识点与公式总结

- 输入是类别频数表，$|D|=\sum_i(n_{i,C_1}+n_{i,C_2})=280$。
- $H(D\mid A)$的权重按样本人数计算：Y两支为160/280与120/280。
- $Gain(X)=0.136879431$，Y和Z的条件熵都为1，所以增益为0。
- 本题只画首次分裂；写子节点频数，再按多数类标记即可。


---

<a id="E20-03C"></a>

## E20-03C · 2020 简答：决策树如何选择分裂属性

来源：2020 年扫描卷 · Q3(3) / 4 points · PDF p.1

状态：完整；形式：历年简答。

### 本题公式 · 决策树：符号、公式与选属性规则

### 先认清符号

- $D$：**当前节点**的数据集，$|D|$ 为其中样本数。
- $C_k$：第 $k$ 个**类别**；$p_k=n_k/|D|$ 为当前节点内该类占比。
- $A$：待比较的**分裂属性**；$v$ 是它的一个取值。代入题目时，$A$ 可换成 B、Hair、Eye 等实际列名。
- $D_v=\{x\in D:A(x)=v\}$：按 $A=v$ 分出的子集；$w_v=|D_v|/|D|$ 为该分支占父节点的比例。

计算 $H(D_v)$ 时，用该子集内部的类别比例。所有对数以2为底，$0\log_2 0=0$。

### ① 类别熵 Entropy：当前节点有多混杂

$$H(D)=-\sum_k p_k\log_2p_k.$$

只有一个类别时为0；二分类各占一半时为1 bit。

### ② 条件熵 Conditional entropy：分裂后还剩多少混杂

$$H(D\mid A)=\sum_v w_vH(D_v).$$

先算每个子集的类别熵，再按子集人数占比加权。

### ③ 信息增益 Information gain：熵减少了多少

$$Gain(A)=H(D)-H(D\mid A).$$

选择信息增益最大的属性，再对未纯净子节点重新计算。

### ④ 分裂信息 Split information：样本怎样分配到分支

$$SplitInfo(A)=-\sum_v w_v\log_2w_v.$$

这里用的是**各分支人数比例 $w_v$**；类别熵用的是**各类别人数比例 $p_k$**。

### ⑤ 增益率 Gain ratio：用分裂信息归一化增益

$$GainRatio(A)=\frac{Gain(A)}{SplitInfo(A)}.$$

按增益率准则比较有效候选时，取较大者；$SplitInfo(A)=0$ 的分裂跳过该比值。C4.5还结合信息增益筛选候选，避免仅由很小的分母获得较高比值。

### ⑥ 基尼指数 Gini index：用平方比例衡量类别混杂

$$\begin{aligned}
Gini(D)&=1-\sum_k p_k^2,\\
Gini_{split}(A)&=\sum_v w_vGini(D_v),\\
\Delta Gini(A)&=Gini(D)-Gini_{split}(A).
\end{aligned}$$

选择**加权子 Gini 最小**的分裂，等价于选择 **$\Delta Gini$ 最大**的分裂。

**计算顺序：** 当前节点类频数 → 子节点类频数与人数权重 → 代入公式 → 比较结果 → 画树。

### 原文

Please present an attribute selection method in a decision tree.

请给出一种决策树的属性选择方法。

### 逐步解答

#### 1. 给出信息增益选属性法

对当前节点数据集$D$，先根据类别人数求$p_k$及$H(D)$。对每个候选属性A，按取值v划分子集$D_v$，计算各子集熵，再按$w_v=|D_v|/|D|$加权：

$$H(D\mid A)=\sum_v w_vH(D_v),\qquad Gain(A)=H(D)-H(D\mid A).$$

选择信息增益最大的属性进行分裂，在尚未纯净的子节点重复上述过程。

#### 2. 用一个小例子说明代入

父节点两类各5人，故$H(D)=1$。某属性分出4人的纯节点和6人的$(1,5)$节点：

$$H(D_{v_2})=-\frac16\log_2\frac16-\frac56\log_2\frac56=0.650022.$$

$$\begin{aligned}
H(D\mid A)&=\frac4{10}(0)+\frac6{10}(0.650022)=0.390013,\\
Gain(A)&=1-0.390013=\boxed{0.609987}.
\end{aligned}$$

其他候选属性也按同样方式计算，再比较数值。

#### 3. 若改用增益率或 Gini，明确比较方向

同一个分裂的分支比例为$0.4,0.6$：

$$\begin{aligned}
SplitInfo(A)&=-0.4\log_2 0.4-0.6\log_2 0.6=0.970951,\\
GainRatio(A)&\approx0.609986547/0.970950594\approx0.628236.
\end{aligned}$$

Gini使用节点内类别比例：

$$\begin{aligned}
Gini(D)&=1-0.5^2-0.5^2=0.5,\\
Gini_{split}(A)&=\frac4{10}(0)+\frac6{10}
\left[1-\left(\frac16\right)^2-\left(\frac56\right)^2\right]
=\frac16,\\
\Delta Gini(A)&=\frac12-\frac16=\frac13.
\end{aligned}$$

信息增益选最大；按增益率比较有效候选时选最大；按加权子Gini比较时选最小，等价于Gini降低量最大。原题只要求介绍一种选属性方法，写清第1部分即可；数值例子用于理解计算。

### English answer pattern

At the current node, compute class entropy, split by each candidate attribute, and weight child entropies by child size. Select the largest information gain. If using Gini, select the smallest weighted child Gini, equivalently the largest Gini reduction.

在当前节点计算类别熵，按各候选属性分裂，并按子节点大小对其熵加权。选择信息增益最大的属性。若使用Gini，则选择加权子Gini最小的分裂，等价于Gini降低量最大的分裂。

### 知识点与公式总结

- 信息增益：$Gain(A)=H(D)-H(D\mid A)$，取最大。
- 分裂信息：$SplitInfo(A)=-\sum_vw_v\log_2w_v$，使用分支比例；增益率为$Gain/SplitInfo$。
- Gini：节点内用类别比例$p_k$；对子Gini用分支权重$w_v$加权。
- 选择加权子Gini最小，等价于选择$\Delta Gini$最大。


---

<a id="PPT-CL24"></a>

## PPT-CL24 · 课件 · 买电脑数据的信息增益

来源：当前完整七讲课件 · classification.pdf · 训练数据表 · PDF p.17；当前完整七讲课件 · classification.pdf · Exercise 1 · PDF p.24

状态：完整课件练习；形式：课件计算 / 逐步练习。

### 本题公式 · 决策树：符号、公式与选属性规则

### 先认清符号

- $D$：**当前节点**的数据集，$|D|$ 为其中样本数。
- $C_k$：第 $k$ 个**类别**；$p_k=n_k/|D|$ 为当前节点内该类占比。
- $A$：待比较的**分裂属性**；$v$ 是它的一个取值。代入题目时，$A$ 可换成 B、Hair、Eye 等实际列名。
- $D_v=\{x\in D:A(x)=v\}$：按 $A=v$ 分出的子集；$w_v=|D_v|/|D|$ 为该分支占父节点的比例。

计算 $H(D_v)$ 时，用该子集内部的类别比例。所有对数以2为底，$0\log_2 0=0$。

### ① 类别熵 Entropy：当前节点有多混杂

$$H(D)=-\sum_k p_k\log_2p_k.$$

只有一个类别时为0；二分类各占一半时为1 bit。

### ② 条件熵 Conditional entropy：分裂后还剩多少混杂

$$H(D\mid A)=\sum_v w_vH(D_v).$$

先算每个子集的类别熵，再按子集人数占比加权。

### ③ 信息增益 Information gain：熵减少了多少

$$Gain(A)=H(D)-H(D\mid A).$$

选择信息增益最大的属性，再对未纯净子节点重新计算。

### ④ 分裂信息 Split information：样本怎样分配到分支

$$SplitInfo(A)=-\sum_v w_v\log_2w_v.$$

这里用的是**各分支人数比例 $w_v$**；类别熵用的是**各类别人数比例 $p_k$**。

### ⑤ 增益率 Gain ratio：用分裂信息归一化增益

$$GainRatio(A)=\frac{Gain(A)}{SplitInfo(A)}.$$

按增益率准则比较有效候选时，取较大者；$SplitInfo(A)=0$ 的分裂跳过该比值。C4.5还结合信息增益筛选候选，避免仅由很小的分母获得较高比值。

### ⑥ 基尼指数 Gini index：用平方比例衡量类别混杂

$$\begin{aligned}
Gini(D)&=1-\sum_k p_k^2,\\
Gini_{split}(A)&=\sum_v w_vGini(D_v),\\
\Delta Gini(A)&=Gini(D)-Gini_{split}(A).
\end{aligned}$$

选择**加权子 Gini 最小**的分裂，等价于选择 **$\Delta Gini$ 最大**的分裂。

**计算顺序：** 当前节点类频数 → 子节点类频数与人数权重 → 代入公式 → 比较结果 → 画树。

### 原文

Please calculate the information gain of income, student, and credit_rating, respectively.

请分别计算 income、student 和 credit_rating 的信息增益。

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

#### 1. 父节点：14人中9个 yes、5个 no

$$H(D)=-\frac9{14}\log_2\frac9{14}-\frac5{14}\log_2\frac5{14}=\boxed{0.940286}.$$

#### 2. 分别统计三个属性的分支类别人数

下表每对计数均为$(yes,no)$。

| 属性 | 分支类频数 | 对应子集熵 |
| --- | --- | --- |
| income | high:(2,2)；medium:(4,2)；low:(3,1) | 1；0.918296；0.811278 |
| student | no:(3,4)；yes:(6,1) | 0.985228；0.591673 |
| credit_rating | fair:(6,2)；excellent:(3,3) | 0.811278；1 |

例如student=yes的子集有7人，类别比例是$6/7,1/7$：

$$H(D_{student=yes})=-\frac67\log_2\frac67-\frac17\log_2\frac17=0.591673.$$

#### 3. 对每个属性完成“权重代入 → 条件熵 → 增益”

$$\begin{aligned}
H(D\mid income)&=\frac4{14}(1)+\frac6{14}(0.918296)
+\frac4{14}(0.811278)=0.911063,\\
Gain(income)&=0.940286-0.911063=\boxed{0.029223}.
\end{aligned}$$

$$\begin{aligned}
H(D\mid student)&=\frac7{14}(0.985228)+\frac7{14}(0.591673)=0.788450,\\
Gain(student)&=0.940286-0.788450=\boxed{0.151836}.
\end{aligned}$$

$$\begin{aligned}
H(D\mid credit\_rating)&=\frac8{14}(0.811278)+\frac6{14}(1)=0.892159,\\
Gain(credit\_rating)&=0.940286-0.892159=\boxed{0.048127}.
\end{aligned}$$

题目要求的三个信息增益如上；在这三个候选属性中，student最大。计算先使用未舍入的子熵，最后保留6位小数。

### English answer pattern

The information gains for income, student and credit_rating are 0.029223,0.151836 and 0.048127. Student is best among these three candidates.

income、student和credit_rating的信息增益分别为0.029223、0.151836和0.048127。在这三个候选属性中，student最佳。

### 计算与内存分析

一次节点分裂可扫描 $n$ 条记录并累计 $d$ 个属性的类别计数，约需 $O(nd)$ 时间。

### 知识点与公式总结

- 父类频数为$(yes,no)=(9,5)$，父熵为$0.940286$。
- income分支人数4、6、4；student为7、7；credit_rating为8、6。
- 先求各子集内部类别熵，再按上述人数除以14加权。
- 三个增益依次为$0.029223,0.151836,0.048127$；按题目指定的三个属性比较时，student最大。
