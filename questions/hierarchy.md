# AGNES 与层次聚类

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=hierarchy)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E20-06"></a>

## E20-06 · 2020：相似度表做 AGNES 树状图

来源：2020 年扫描卷 · Q6 / 12 points · PDF p.3

状态：完整；形式：计算 / 推导。

### 原题 / 转录整理

Use the following similarity matrix to perform AGNES clustering. Draw a dendrogram showing the merge order. Numbers indicate similarities.

|  | P1 | P2 | P3 | P4 | P5 |
| --- | --- | --- | --- | --- | --- |
| P1 | 1.0 | 0.1 | 0.41 | 0.55 | 0.35 |
| P2 | 0.1 | 1.0 | 0.64 | 0.47 | 0.98 |
| P3 | 0.41 | 0.64 | 1.0 | 0.44 | 0.85 |
| P4 | 0.55 | 0.47 | 0.44 | 1.0 | 0.76 |
| P5 | 0.35 | 0.98 | 0.85 | 0.76 | 1.0 |

### 第一步：中文翻译与条件

表中是相似度，越大越近。按课件 AGNES 的 single-link 口径，画合并层次并标明合并相似度。

### 逐步解答

按 $s(A∪B,C)=max(s(A,C),s(B,C))$ 更新：

| Step | Merge | Similarity | Distance height 1−s |
| --- | --- | --- | --- |
| 1 | P2 + P5 | .98 | .02 |
| 2 | {P2,P5} + P3 | .85 | .15 |
| 3 | {P2,P3,P5} + P4 | .76 | .24 |
| 4 | {P2,P3,P4,P5} + P1 | .55 | .45 |

```text
height=.45 ─┬─ P1
            └─ .24 ─┬─ P4
                     └─ .15 ─┬─ P3
                              └─ .02 ─┬─ P2
                                       └─ P5
```
选择最小的非对角相似度 .10 合并 P1/P2 是把表读反；扫描上的手写批注不是标准答案。若使用 complete/average-link，会得到别的结果，须先声明 linkage；本题按课件 single-link 解。

### English answer pattern

Merge the largest similarity. With single linkage, the merges occur at .98, .85, .76 and .55.

### 计算与内存分析

保存该矩阵 O(N²)；每轮重找所有簇对的朴素实现 O(N³)，single-link 可专门优化。


---

<a id="SUP-HIER"></a>

## SUP-HIER · 补充变式：single 与 complete 的差别

来源：整理者补充变式 · 依据 clustering pp.39–43

状态：完整；形式：补充变式。

### 原题 / 转录整理

Given distances d(a,b)=2,d(a,c)=7,d(b,c)=5, compute the agglomerative merge heights under single and complete linkage.

### 第一步：中文翻译与条件

给三个距离，分别用最近链接与最远链接合并，说明树状图高度为何不同。

### 逐步解答

两者第一步都在距离2合并 a,b。single-link 下一步 min(7,5)=5；complete-link 下一步 max(7,5)=7。前者容易产生链式连接，后者要求整个合并簇较紧凑。

### English answer pattern

Single linkage uses the closest pair; complete linkage uses the farthest pair.
