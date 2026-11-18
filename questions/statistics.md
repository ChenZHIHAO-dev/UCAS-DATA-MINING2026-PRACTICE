# 统计、箱线图与相关

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=statistics)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E20-02B"></a>

## E20-02B · 2020：五数概括与离群值

来源：2020 年扫描卷 · Q2(2) / 4 points · PDF p.1

状态：完整；形式：计算 / 推导。

### 原文

Determine outliers in the age data by five-number summary.

利用五数概括确定年龄数据中的离群值。

20, 13, 15, 16, 25, 35, 36, 40, 45, 46, 52, 25, 25, 30, 21, 22, 22, 33, 33, 35, 35, 70, 19, 20

### 逐步解答

采用上下半组各自中位数法。排序后五数为 min, Q1, median, Q3, max = (13, 20.5, 27.5, 35.5, 70)。

$IQR=35.5-20.5=15$，下界 $20.5-1.5\times15=-2$，上界 $35.5+1.5\times15=58$，只有 **70** 超过界限。箱体从 20.5 到 35.5，中位线 27.5；下须至 13，上须至 52，70 单独画点。

```text
13 ───── [20.5 ── 27.5 ── 35.5] ─── 52       •70
          Q1    median   Q3               outlier
```
五数概括的 max=70 与箱线图上须=52 不同。

### English answer pattern

The upper fence is 58, so 70 is an outlier. The upper whisker ends at 52, the largest observed non-outlier.

上界为 58，因此 70 是离群值。上须止于最大的非离群实际观测 52。

### 易错点与约定

某些软件四分位数插值不同；应给出计算约定。本题即使采用常见线性插值也不改变 70 为唯一离群的结论。


---

<a id="HW1-03"></a>

## HW1-03 · 当前 HW1：销量统计、箱线图与 Pearson

来源：当前 HW1 · Q3(a,b,d,e)

状态：完整；形式：计算 / 推导。

### 原文

A: 21, 16, 19, 24, 27, 23, 22, 21, 20, 17, 16, 20, 23, 22, 18, 24, 26, 25, 20, 26

B: 38, 24, 38, 45, 46, 44, 42, 34, 40, 30, 31, 40, 40, 32, 36, 42, 50, 47, 46, 50

Calculate mean, median, standard deviation of A; draw its boxplot; compute the correlation coefficient of A and B and draw a scatter plot.

计算 A 的均值、中位数、标准差；画出其箱线图；计算 A、B 的相关系数，并画散点图。

### 逐步解答

A 的和为 430，均值 21.5，中位数 21.5。离均差平方和为 207。

总体标准差 $\sigma=\sqrt{\sum(x-\mu)^2/20}=3.217142$；样本标准差 $s=\sqrt{\sum(x-\bar x)^2/19}=3.300718$。题目未指定时先声明口径。

五数概括 (16, 19.5, 21.5, 24, 27)，$IQR=4.5$，界限 $[12.75,30.75]$，无离群点；须为 16、27。

Pearson 使用原月序配对：

$$r=\frac{\sum_i(A_i-\bar A)(B_i-\bar B)}{\sqrt{\sum_i(A_i-\bar A)^2\sum_i(B_i-\bar B)^2}}=0.830863.$$

散点图横轴 A、纵轴 B，每个月一对。趋势为较强正线性相关；这不证明 A 的销售导致 B 的销售。作图可使用表格中的 20 对坐标；完整散点图与箱线图见配套学习讲义 HW1 专题。

### English answer pattern

The paired monthly sales are positively correlated. State whether standard deviation uses N or N−1.

配对月销量正相关。应说明标准差使用 N 还是 N−1。

### 易错点与约定

可以为了箱线图单独排序 A；计算相关系数时绝不能分别排序 A、B 再配对。

### 计算与内存分析

均值/方差/相关均可 O(N) 流式累计；通常排序求精确四分位数 O(N log N)。


---

<a id="HX1-03"></a>

## HX1-03 · 往届 HW1：年龄/体脂、z-score 与相关

来源：往届 HW1（hxd） · Q3(a-e) · PDF p.1

状态：完整；形式：计算 / 推导。

### 原文

Suppose a hospital tested age and body fat for 16 adults. Calculate mean, median, standard deviation; draw boxplots and scatter plot; normalize using z-score; calculate Pearson correlation.

假设医院测量了 16 位成年人的年龄和体脂率。计算均值、中位数、标准差；绘制箱线图和散点图；用 z 分数归一化；计算 Pearson 相关系数。

| age | %fat |
| --- | --- |
| 23 | 9.5 |
| 23 | 26.5 |
| 27 | 7.8 |
| 27 | 17.8 |
| 39 | 31.4 |
| 41 | 25.9 |
| 47 | 27.4 |
| 49 | 27.2 |
| 50 | 31.2 |
| 52 | 34.6 |
| 53 | 42.5 |
| 53 | 28.8 |
| 54 | 33.4 |
| 55 | 38 |
| 56 | 36 |
| 57 | 30.9 |

### 逐步解答

| Variable | Mean | Median | Population SD | Sample SD | Five-number summary |
| --- | --- | --- | --- | --- | --- |
| age | 44.125 | 49.5 | 12.051323 | 12.446552 | (23, 33, 49.5, 53.5, 57) |
| fat | 28.05625 | 29.85 | 9.150681 | 9.450783 | (7.8, 26.2, 29.85, 34, 42.5) |

总体口径标准化分别为 $z_{age}=(age-44.125)/12.051323$，$z_{fat}=(fat-28.05625)/9.150681$。每条记录代入该列公式即得标准分数；样本口径则同时替换两个分母。

Pearson $r=0.809086$，为正相关。箱线图按各自五数与 $1.5IQR$ 界限绘制；年龄与体脂单位不同，不应硬用同一纵轴。散点的横纵轴分别 age 与 %fat，保留表中配对关系。

### English answer pattern

Standardize each variable with its own mean and standard deviation, and retain paired records for correlation.

各变量用自己的均值和标准差标准化；计算相关性时保留配对记录。
