# 混合属性与距离

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=distance)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="SL-CL23"></a>

## SL-CL23 · 课件：混合属性不相似度矩阵

来源：当前完整七讲课件 · clustering.pdf pp.23–25 · PDF p.23

状态：完整；形式：计算 / 推导。

### 原文

Compute the dissimilarity matrix for nominal Test-1, ordinal Test-2 and ratio Test-3.

计算由名义型 Test-1、有序型 Test-2、比率尺度型 Test-3 组成的数据的相异度矩阵。

| ID | Test-1 | Test-2 | Test-3 |
| --- | --- | --- | --- |
| 1 | A | excellent | 445 |
| 2 | B | fair | 22 |
| 3 | C | good | 164 |
| 4 | A | excellent | 1210 |

Test-2 的取值 excellent、fair、good 分别为优秀、一般、良好。

### 逐步解答

用课件先行舍入的第三属性 (.75,0,.5,1) 时，得到：

|| 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| 1 | 0 | 11/12 | 7/12 | 1/12 |
| 2 | 11/12 | 0 | 2/3 | 1 |
| 3 | 7/12 | 2/3 | 0 | 2/3 |
| 4 | 1/12 | 1 | 2/3 | 0 |

例如 d(1,2)=(1+1+.75)/3=11/12；d(1,4)=(0+0+.25)/3=1/12。若保留精确对数后缩放，应使用 $(\log x-\log22)/(\log1210-\log22)$，数值会略有不同。缺失属性不计入分母；无缺失时均分三项。

### English answer pattern

Normalize attribute-specific dissimilarities to comparable scales before averaging.

先把各属性相异度归一化到可比较尺度，再取平均。

### 计算与内存分析

N 个对象、d 个属性的全对矩阵 O(N²d) 时间、O(N²) 存储。
