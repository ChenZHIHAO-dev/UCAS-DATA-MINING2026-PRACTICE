# 归一化计算

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=normalization)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E16-01CD"></a>

## E16-01CD · 2016：min-max 与 body-fat z-score

来源：2016 年扫描卷 · Q1(c-d) / 10 points · PDF p.1

状态：完整；形式：计算 / 推导。

### 原文

Use min-max normalization to transform age 49 to [0,1]. Use z-score normalization to transform body fat 41.2, where the standard deviation of body fat is 9.25.

用最小—最大归一化将年龄 49 映射到 [0,1]。用 z 分数归一化变换体脂率 41.2，已知体脂率标准差为 9.25。

| age | %fat |
| --- | --- |
| 39 | 31.4 |
| 57 | 30.2 |
| 41 | 25.9 |
| 58 | 34.1 |
| 47 | 27.4 |
| 58 | 32.9 |
| 49 | 27.2 |
| 60 | 41.2 |
| 50 | 31.2 |
| 61 | 35.7 |
| 23 | 9.5 |
| 52 | 34.6 |
| 23 | 26.5 |
| 54 | 42.5 |
| 27 | 7.8 |
| 54 | 28.8 |
| 27 | 17.8 |
| 56 | 33.4 |

### 逐步解答

年龄 $min=23,max=61$，故 $z=(49-23)/(61-23)=26/38=0.684211$。

体脂总和 $\sum x=518.1$，均值 $\mu=28.783333$。使用题给 $\sigma=9.25$：

$$z=\frac{41.2-28.783333}{9.25}=1.342342.$$

这个数表示高于均值约相应个标准差。题目已给标准差，不能重新计算后偷偷换分母。

### English answer pattern

Min-max uses the observed minimum and maximum. Z-score uses the mean and the stated standard deviation.

最小—最大归一化使用观测最小值与最大值。z 分数使用均值和题目给定标准差。


---

<a id="E20-02C"></a>

## E20-02C · 2020：33 的 min-max 归一化

来源：2020 年扫描卷 · Q2(3) / 4 points · PDF p.1

状态：完整；形式：计算 / 推导。

### 原文

Use min-max normalization to normalize 33. Use the age data of Question 2.

用最小—最大归一化变换 33。使用第 2 题的年龄数据。

### 逐步解答

$$z=\frac{33-13}{70-13}=\frac{20}{57}\approx0.350877.$$

除非题目明确要求先移除离群点，否则仍使用原数据最大值 70。不能因为上一小题判 70 异常，就擅自改成最大值 52。

### English answer pattern

Using the original data range gives 20/57, approximately 0.350877.

使用原始数据范围，得到 20/57，约 0.350877。


---

<a id="E17-02"></a>

## E17-02 · 2017 简答：三种归一化及利弊

来源：2017 年扫描卷 · Q2 / 6 points · PDF p.1

状态：完整；形式：历年简答。

### 原文

What is Normalization? Please describe the major Normalization methods and their corresponding pros and cons.

什么是归一化？请描述主要归一化方法及各自的优点和缺点。

### 逐步解答

归一化是将数值属性转换到更可比较的尺度，减少量纲或数值范围主导模型的影响。

| 方法 | 公式 | 优点 | 局限 |
| --- | --- | --- | --- |
| Min-max | $(x-min)/(max-min)$，再映射目标范围 | 保留相对位置，训练范围清楚 | 极值敏感；新值可越界；max=min 需处理 |
| Z-score | $(x-\mu)/\sigma$ | 标准化中心和离散程度，无须预设取值范围 | 变换值可超出 [0,1]；均值和标准差受极值影响 |
| Decimal scaling | $x/10^j$，选使最大绝对值小于 1 的最小整数 j | 简单 | 依赖最大绝对值；不保证单位方差或稳健性 |

应在训练集估计参数，验证/测试集沿用。决策树通常不依赖正尺度线性变换后的排序，但 K-means、kNN 和距离推荐往往强烈依赖尺度。

### English answer pattern

Normalization rescales numeric attributes. Min-max controls a range, z-score centers and scales by dispersion, and decimal scaling moves the decimal point.

归一化重新缩放数值属性。最小—最大方法控制范围，z 分数中心化并按离散程度缩放，小数定标移动小数点。


---

<a id="HW1-03C"></a>

## HW1-03C · 当前 HW1：20 个销量的 min-max

来源：当前 HW1 · Q3(c)

状态：完整；形式：计算 / 推导。

### 原文

Normalize the 20 monthly sales values using min-max normalization: 21, 16, 19, 24, 27, 23, 22, 21, 20, 17, 16, 20, 23, 22, 18, 24, 26, 25, 20, 26.

用最小—最大归一化变换 20 个月的销售量：21、16、19、24、27、23、22、21、20、17、16、20、23、22、18、24、26、25、20、26。

### 逐步解答

min=16，max=27，范围11；每项使用 $z=(x-16)/11$。归一化后的月序如下。

| Month | Sales | Exact normalized | Decimal |
| --- | --- | --- | --- |
| 1 | 21 | 5/11 | 0.454545 |
| 2 | 16 | 0/11 | 0.000000 |
| 3 | 19 | 3/11 | 0.272727 |
| 4 | 24 | 8/11 | 0.727273 |
| 5 | 27 | 11/11 | 1.000000 |
| 6 | 23 | 7/11 | 0.636364 |
| 7 | 22 | 6/11 | 0.545455 |
| 8 | 21 | 5/11 | 0.454545 |
| 9 | 20 | 4/11 | 0.363636 |
| 10 | 17 | 1/11 | 0.090909 |
| 11 | 16 | 0/11 | 0.000000 |
| 12 | 20 | 4/11 | 0.363636 |
| 13 | 23 | 7/11 | 0.636364 |
| 14 | 22 | 6/11 | 0.545455 |
| 15 | 18 | 2/11 | 0.181818 |
| 16 | 24 | 8/11 | 0.727273 |
| 17 | 26 | 10/11 | 0.909091 |
| 18 | 25 | 9/11 | 0.818182 |
| 19 | 20 | 4/11 | 0.363636 |
| 20 | 26 | 10/11 | 0.909091 |

最小值映成0，最大值映成1，相同销量映到相同值；不要先排序再声称这是原月序。

### English answer pattern

Use z=(x−16)/11. Keep the monthly order when reporting the normalized sequence.

使用 z=(x−16)/11。报告归一化序列时保持月份顺序。

### 易错点与约定

这是当前作业的销量，不使用2020考试的13和70，也不混用z-score的标准差。

### 计算与内存分析

已知min/max后变换O(N)，参数空间O(1)；若需保留全部变换结果则O(N)。
