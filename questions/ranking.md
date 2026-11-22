# 推荐误差与排序评价

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=ranking)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="SL-MAE"></a>

## SL-MAE · 课件：MAE、NMAE 与 RMSE

来源：当前完整七讲课件 · recommend.pdf · Predictive Accuracy Metrics · PDF p.25；当前完整七讲课件 · recommend.pdf · Example：MAE/NMAE · PDF p.26

状态：完整；形式：计算 / 推导。

### 本题公式 · MAE、NMAE 和 RMSE

n 对评分的真实值为 $r_i$，预测为 $\widehat r_i$，误差 $e_i=\widehat r_i-r_i$。

$$MAE=\frac{\sum_i|e_i|}{n},\quad NMAE=\frac{MAE}{r_{max}-r_{min}},\quad RMSE=\sqrt{\frac{\sum_i e_i^2}{n}}.$$

$r_{max}-r_{min}$ 为题给评分尺度跨度；先列绝对误差和平方误差，再分别汇总。

### 原文

Predicted ratings are (1,2,3,4,4), true ratings (3,5,3,2,1). Compute MAE,NMAE and RMSE on a 1–5 scale.

预测评分为 (1,2,3,4,4)，真实评分为 (3,5,3,2,1)。在 1—5 分尺度上计算 MAE、NMAE、RMSE。

### 逐步解答

#### 1. 指标与分母

在 $n$ 对真实/预测评分上，误差为 $e_i=\widehat r_i-r_i$：

$$MAE=\frac1n\sum_i|e_i|,\quad NMAE=\frac{MAE}{r_{max}-r_{min}},\quad RMSE=\sqrt{\frac1n\sum_i e_i^2}.$$

MAE 是平均绝对误差；NMAE 按评分范围归一化；RMSE 对较大的误差惩罚更重。

#### 2. 逐项误差表

| 序号 | 预测 | 真实 | $e_i$ | $|e_i|$ | $e_i^2$ |
| --- | --- | --- | --- | --- | --- |
| 1 | 1 | 3 | -2 | 2 | 4 |
| 2 | 2 | 5 | -3 | 3 | 9 |
| 3 | 3 | 3 | 0 | 0 | 0 |
| 4 | 4 | 2 | 2 | 2 | 4 |
| 5 | 4 | 1 | 3 | 3 | 9 |
| 总和 | | | | 10 | 26 |

#### 3. 代入并给出结果

$$MAE=\frac{10}5=\boxed{2},\qquad NMAE=\frac2{5-1}=\boxed{0.5}.$$

$$RMSE=\sqrt{\frac{26}5}\approx\boxed{2.280351}.$$

分母 5 是已知真实值与预测值的五对评分。该题满足 $RMSE\ge MAE$，可用于检查计算是否合理。


### English answer pattern

MAE=2, NMAE=0.5 and RMSE≈2.280351.

MAE=2，NMAE=0.5，RMSE≈2.280351。

### 知识点与公式总结

- 设 $e_i=\hat r_i-r_i$，$MAE=\frac1n\sum_i|e_i|$；先逐项列真实、预测、绝对误差和平方误差。
- 评分范围归一化：$NMAE=MAE/(r_{max}-r_{min})$；本题范围为 1–5，分母是 4。
- $RMSE=\sqrt{\frac1n\sum_i e_i^2}$，对大误差更敏感；在相同评分对上应满足 $RMSE\ge MAE$。


---

<a id="SL-RANK"></a>

## SL-RANK · 课件：Spearman 与 Kendall 逐对计算

来源：当前完整七讲课件 · recommend.pdf · Evaluating Ranking · PDF p.29；当前完整七讲课件 · recommend.pdf · Example：Spearman/Kendall · PDF p.30

状态：完整；形式：计算 / 推导。

### 本题公式 · Spearman 与 Kendall

同一物品的预测、真实名次差为 $d_i$；n 为物品数，无并列名次时：

$$\rho=1-\frac{6\sum_i d_i^2}{n(n^2-1)},\qquad \tau=\frac{C-D}{\binom n2}.$$

C、D 分别为先后顺序一致、不一致的物品对数；逐物品算平方差，逐对算一致性。

**与普通相关系数的联系。** Spearman 的 $\rho$ 是对两列**名次**求 Pearson 相关；无并列名次时可化成这里的名次差平方和简式。这里 $d_i$ 是第 i 个物品的名次差。Kendall 的 $\tau$ 按物品对的一致 / 反序数量计算，是另一项排序指标。

### 原文

For the same items i1,i2,i3,i4, predicted ranks are (1,2,3,4), true ranks (1,4,2,3). Compute Spearman ρ and Kendall τ.

对相同物品 i1、i2、i3、i4，预测排名为 (1,2,3,4)，真实排名为 (1,4,2,3)。计算 Spearman ρ 与 Kendall τ。

### 逐步解答

#### 1. Spearman：比较每个物品的名次差

没有并列名次时，令 $d_i=\widehat R_i-R_i$：

$$\rho=1-\frac{6\sum_i d_i^2}{n(n^2-1)}.$$

| 物品 | 预测名次 | 真实名次 | 差 $d_i$ | 差平方 |
| --- | --- | --- | --- | --- |
| i1 | 1 | 1 | 0 | 0 |
| i2 | 2 | 4 | -2 | 4 |
| i3 | 3 | 2 | 1 | 1 |
| i4 | 4 | 3 | 1 | 1 |

$$\rho=1-\frac{6\times6}{4(4^2-1)}=1-\frac{36}{60}=\boxed{0.4}.$$

#### 2. Kendall：比较每对物品的先后关系

四个物品共有 $\binom42=6$ 对。若预测与真实都将同一个物品排在前面，则为一致对（concordant）；次序相反则为不一致对（discordant）。

| 物品对 | 预测先后 | 真实先后 | 类型 |
| --- | --- | --- | --- |
| i1,i2 | i1 在前 | i1 在前 | 一致 |
| i1,i3 | i1 在前 | i1 在前 | 一致 |
| i1,i4 | i1 在前 | i1 在前 | 一致 |
| i2,i3 | i2 在前 | i3 在前 | 不一致 |
| i2,i4 | i2 在前 | i4 在前 | 不一致 |
| i3,i4 | i3 在前 | i3 在前 | 一致 |

$$\tau=\frac{C-D}{\binom n2}=\frac{4-2}6=\boxed{\frac13}.$$

两个值均为正，表示总体排序方向一致，但有两对物品的次序颠倒。以上简式对应无并列情况；并列名次需采用相应修正。


### English answer pattern

Spearman ρ=0.4; Kendall τ=1/3. The two discordant pairs both involve i2.

Spearman ρ=0.4，Kendall τ=1/3。两对不一致物品对都涉及 i2。

### 知识点与公式总结

- 无并列时，Spearman 为 $\rho=1-6\sum_i d_i^2/[n(n^2-1)]$，$d_i$ 是同一物品的两个名次之差。
- Kendall 为 $\tau=(C-D)/\binom n2$，C/D 分别为一致/逆序物品对的数量；逐对比较两个排序的先后。
- 先对齐同一组物品，再列名次差或全部物品对；有并列时使用相应修正版，不直接套无并列简式。


---

<a id="SL-PREC"></a>

## SL-PREC · 课件：推荐列表 precision/recall/F1

来源：当前完整七讲课件 · recommend.pdf · Relevance: Precision and Recall · PDF p.27；当前完整七讲课件 · recommend.pdf · Example：推荐列表 · PDF p.28

状态：完整；形式：计算 / 推导。

### 本题公式 · Precision、Recall 和 F1

把相关物品视为正类、被推荐视为预测正类；先从表格识别 TP、FP、FN、TN。

$$P=\frac{TP}{TP+FP},\quad R=\frac{TP}{TP+FN},\quad F_1=\frac{2PR}{P+R}=\frac{2TP}{2TP+FP+FN}.$$

Precision 的分母为所有已推荐物品；Recall 的分母为所有实际相关物品。

**F1 两种写法的关系。** 将 $P=TP/(TP+FP)$、$R=TP/(TP+FN)$ 代入 $2PR/(P+R)$，通分并约去公共因子，得到

$$F_1=\frac{2TP}{2TP+FP+FN}.$$

两式使用同一张计数表，按方便的形式代入即可。

### 原文

Selected relevant=9, selected irrelevant=3, not-selected relevant=15, not-selected irrelevant=13. Compute precision, recall and F1.

选中且相关 9 个，选中但不相关 3 个，未选中但相关 15 个，未选中且不相关 13 个。计算精确率、召回率和 F1。

### 逐步解答

#### 1. 先把表格对应到 TP、FP、FN、TN

把“相关”作为正类、“被推荐”作为预测正类：

| | 实际相关 | 实际不相关 |
| --- | --- | --- |
| 被推荐 selected | $TP=9$ | $FP=3$ |
| 未被推荐 not selected | $FN=15$ | $TN=13$ |

#### 2. 查准率与查全率

Precision 问“推荐出的 12 个里，多少相关”；Recall 问“全部 24 个相关物品中，找出多少”：

$$P=\frac{TP}{TP+FP}=\frac9{9+3}=\boxed{0.75}.$$

$$R=\frac{TP}{TP+FN}=\frac9{9+15}=\boxed{0.375}.$$

#### 3. F1 综合两者

F1 是查准率和查全率的调和平均：

$$F_1=\frac{2PR}{P+R}=\frac{2\times0.75\times0.375}{0.75+0.375}=\boxed{0.5}.$$

也可直接核算：$F_1=2TP/(2TP+FP+FN)=18/(18+3+15)=0.5$。TN 表示正确未推荐的不相关物品，不进入这三个指标的分母。


### English answer pattern

Precision is 0.75, recall is 0.375 and F1 is 0.5.

精确率 0.75，召回率 0.375，F1 为 0.5。

### 知识点与公式总结

- 把“相关”定义为正类、“被推荐”定义为预测正类，先将四个格子对应为 TP、FP、FN、TN。
- $Precision=TP/(TP+FP)$ 看推荐出的物品；$Recall=TP/(TP+FN)$ 看全部相关物品。
- $F_1=2PR/(P+R)=2TP/(2TP+FP+FN)$；这三个指标的分母均不包含 TN。
