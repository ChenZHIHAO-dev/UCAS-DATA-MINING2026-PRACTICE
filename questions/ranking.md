# 推荐误差与排序评价

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=ranking)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="SL-MAE"></a>

## SL-MAE · 课件：MAE、NMAE 与 RMSE

来源：当前完整七讲课件 · recommend.pdf pp.25–26 · PDF p.26

状态：完整；形式：计算 / 推导。

### 原文

Predicted ratings are (1,2,3,4,4), true ratings (3,5,3,2,1). Compute MAE,NMAE and RMSE on a 1–5 scale.

预测评分为 (1,2,3,4,4)，真实评分为 (3,5,3,2,1)。在 1—5 分尺度上计算 MAE、NMAE、RMSE。

### 逐步解答

绝对误差 (2,3,0,2,3)，和10，MAE=10/5=2。NMAE=2/(5−1)=.5。

平方误差 (4,9,0,4,9)，和26，RMSE=√(26/5)=2.280351。

分母 5 表示已知真实值与预测值的五对评分；未知评分不得当0加入。RMSE≥MAE，可作为自检。

### English answer pattern

MAE=2, NMAE=0.5 and RMSE≈2.280351.

MAE=2，NMAE=0.5，RMSE≈2.280351。


---

<a id="SL-RANK"></a>

## SL-RANK · 课件：Spearman 与 Kendall 逐对计算

来源：当前完整七讲课件 · recommend.pdf pp.29–30 · PDF p.30

状态：完整；形式：计算 / 推导。

### 原文

For the same items i1,i2,i3,i4, predicted ranks are (1,2,3,4), true ranks (1,4,2,3). Compute Spearman ρ and Kendall τ.

对相同物品 i1、i2、i3、i4，预测排名为 (1,2,3,4)，真实排名为 (1,4,2,3)。计算 Spearman ρ 与 Kendall τ。

### 逐步解答

秩差平方 (0,4,1,1)，总和6；$\rho=1−6×6/[4(4²−1)]=.4$。

六对中 (i2,i3)、(i2,i4) 不一致，另四对一致；$\tau=(4−2)/6=1/3$。

简式适用于无并列名次；有并列应分别用平均秩 Pearson 与 Kendall τ-b 等修正，不能直接照搬。

### English answer pattern

Spearman ρ=0.4; Kendall τ=1/3. The two discordant pairs both involve i2.

Spearman ρ=0.4，Kendall τ=1/3。两对不一致物品对都涉及 i2。


---

<a id="SL-PREC"></a>

## SL-PREC · 课件：推荐列表 precision/recall/F1

来源：当前完整七讲课件 · recommend.pdf pp.27–28 · PDF p.28

状态：完整；形式：计算 / 推导。

### 原文

Selected relevant=9, selected irrelevant=3, not-selected relevant=15, not-selected irrelevant=13. Compute precision, recall and F1.

选中且相关 9 个，选中但不相关 3 个，未选中但相关 15 个，未选中且不相关 13 个。计算精确率、召回率和 F1。

### 逐步解答

Precision=9/(9+3)=.75；Recall=9/(9+15)=.375；F1=2×.75×.375/(.75+.375)=.5。真负例13不进入 precision/recall 分母；“查准”和“查全”不同。

### English answer pattern

Precision is 0.75, recall is 0.375 and F1 is 0.5.

精确率 0.75，召回率 0.375，F1 为 0.5。
