# 历年应用简答

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=application)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E17-01"></a>

## E17-01 · 2017：主要挖掘技术及对应应用

来源：2017 年扫描卷 · Q1 / 10 points · PDF p.1

状态：完整；形式：历年简答。

### 原文

Please briefly describe the major types of data mining techniques and their corresponding applications.

请简述数据挖掘技术的主要类型及各自应用。

### 逐步解答

| 技术 Technique | 主要输出 | 应用 Application |
| --- | --- | --- |
| Characterization / discrimination | 一类的概况与类间区别 | 对比常客与非活跃客户特征 |
| Association / frequent patterns | 经常共同出现的商品或事件 | 购物篮捆绑、交叉销售 |
| Classification | 从带标签样本预测离散类别 | 垃圾邮件、是否违约 |
| Numeric prediction / regression | 预测连续数值 | 销售额、房价 |
| Clustering | 无标签对象的相似群体 | 客户细分、土地类型探索 |
| Outlier analysis | 偏离主体的稀有对象 | 欺诈交易、异常设备 |
| Evolution / sequential analysis | 时间变化、顺序和周期 | 点击序列、购买顺序、季节趋势 |

作答时按“技术名称 → 主要输出 → 具体应用”各写一行。分类使用已标注类别训练，聚类按相似性组织未标注对象；关联分析找共现，序列分析还考虑先后顺序。推荐系统（recommender systems）把用户偏好预测与物品排序结合，用于生成个性化推荐列表。

### English answer pattern

Classification uses labeled examples, clustering discovers unlabeled groups, and association mining finds co-occurring patterns. Outlier analysis identifies unusual objects.

分类使用带标签样本；聚类发现无标签分组；关联挖掘寻找共现模式；离群点分析识别异常对象。

### 知识点与公式总结

- 按“技术 → 产出 → 应用”作答：分类预测类别，回归预测数值，聚类形成相似群体。
- 关联模式关注共现，序列模式关注顺序；离群分析寻找偏离主体的少数对象。
- 每类配一个对应场景，如垃圾邮件分类、客户聚类、购物篮关联。


---

<a id="E17-04B"></a>

## E17-04B · 2017：训练垃圾/普通/重要邮件分类器

来源：2017 年扫描卷 · Q4(b) / 10 points · PDF p.1

状态：完整；形式：历年应用设计。

### 本题公式 · 邮件朴素贝叶斯：先验、词平滑与对数分数

以词频袋模型（bag of words）为例，N 是训练邮件数，$N_c$ 是类别 c 的邮件数，V 是训练词表；$n_{cw}$ 为 c 类邮件中词 w 的出现总次数，$x_w$ 为新邮件中词 w 的次数。

$$P(c)=\frac{N_c}{N}.$$

对类别内词频做加一平滑，分母是该类别全部词的出现总数加词表大小：

$$\theta_{cw}=P(w\mid c)=\frac{n_{cw}+1}{\sum_{v\in V}n_{cv}+|V|}.$$

新邮件使用同一训练词表，计算各类别的对数分数并选最大者：

$$S(c)=\log P(c)+\sum_{w\in V}x_w\log\theta_{cw},\qquad \hat c=\arg\max_cS(c).$$

加一平滑使训练中未出现的类内词仍有非零概率；取对数将多词概率乘积转为加法，减少很小数相乘造成的数值下溢。先验按邮件计数，词概率按词出现次数计数，两者分母不同。

### 原文

Suppose you have roughly classified previous e-mails as junk, unimportant or normal/important. Describe how a data mining system can use this training set to classify new or unclassified messages.

假设你已把以往邮件粗分为垃圾、不重要、正常或重要。描述数据挖掘系统怎样利用该训练集，对新邮件或未分类邮件分类。

### 解答

1. 用历史邮件建立带标签训练集，类别为 junk、unimportant、normal/important，另留验证集与测试集。
2. 将标题、正文、发件人等转换为特征，如词频向量；在训练集确定词表和转换规则。
3. 训练朴素贝叶斯或决策树等分类器；在验证集上选择参数。
4. 在测试集上评价各类 Precision、Recall 及混淆矩阵。
5. 新邮件采用相同的特征处理，输入已训练模型并输出预测类别；后续用新增标注更新模型。

### English answer · 英文作答

Build features from labeled messages, fit a supervised classifier, validate without leakage, and apply the same feature pipeline to new mail.

从带标签邮件构建特征，拟合监督分类器，进行无泄漏验证，再把同一特征流程应用到新邮件。

<details>
<summary>补充解释（展开）</summary>


### 补充详解

#### 明确分类任务和数据划分

输入为已标注的历史邮件，类别为 junk（垃圾）、unimportant（不重要）、normal/important（正常或重要）；输出为新邮件的一个类别。训练集拟合模型，验证集选参数，独立测试集评价选好的模型。邮件随时间变化时，可把较晚邮件留作验证和测试。

#### 构造统一的特征表示

提取发件人、标题、正文及链接信息。以词频向量为例，先在训练集建立词表 $V$，令 $x_w$ 为邮件中词 $w$ 的出现次数。对每封新邮件沿用相同词表和处理规则。

#### 用朴素贝叶斯训练和预测

给出一种完整可行方案：多项式朴素贝叶斯（multinomial Naïve Bayes）。设训练邮件数为 $N$，第 $c$ 类邮件数为 $N_c$，第 $c$ 类中词 $w$ 的总次数为 $n_{cw}$。使用加一平滑：

$$\begin{aligned}
P(c)&=\frac{N_c}{N},\\
P(w\mid c)&=\frac{n_{cw}+1}{\sum_{v\in V}n_{cv}+|V|},\\
S(c)&=\log P(c)+\sum_{w\in V}x_w\log P(w\mid c),\\
\hat c&=\arg\max_c S(c).
\end{aligned}$$

先验 $P(c)$ 表示各类的常见程度；词概率表示某类邮件使用该词的倾向；加一平滑为训练中未出现的词保留正概率。取对数把大量小概率的连乘转成求和，预测仍选得分最高的类别。

#### 评估并应用到新邮件

用验证集比较词表规模、平滑参数等选择，并观察逐类混淆矩阵。对任一类别，把该类看作正类：

$$Precision=\frac{TP}{TP+FP},\qquad Recall=\frac{TP}{TP+FN}.$$

例如，把重要邮件误判为垃圾会影响正常通信，应结合这种错误的代价选择策略。最终在独立测试集报告性能，再用已确定的处理流程分类新邮件。持续收集新标注可应对垃圾邮件模式变化。

#### 最终作答要点

标注历史邮件 → 提取特征 → 训练分类器 → 验证选参 → 测试评价 → 同样处理新邮件并预测。题面未给具体训练计数，答案应写清流程及估计、预测方法。


</details>

### 知识点与公式总结

- 邮件分类按“带标签历史数据→特征→训练→验证选参→测试→新邮件预测”组织。
- 对数分数 $S(c)=\log P(c)+\sum_wx_w\log P(w\mid c)$；$x_w$ 为新邮件词频，$n_{cw}$ 为 c 类训练邮件中的词 w 总次数。
- 词表与转换在训练集确定；词表内的类内零计数用平滑处理，新邮件继续使用同一词表编码。


---

<a id="SUP-INDEX"></a>

## SUP-INDEX · 来源问答整理：位图与仓库/事务库对比

来源：本地期末问答笔记 · 位图、数据库与数据仓库条目

状态：补充问答；年份不明；形式：来源补充简答。

### 英文题面（由中文原题译写）

Briefly describe suitable applications of bitmap indexes, and distinguish an OLTP database from an OLAP data warehouse.

简述位图索引的适用场景，并区分 OLTP 数据库和 OLAP 数据仓库。

### 逐步解答

#### 1. 位图如何组合分析条件

对 N 行数据的某属性，每个取值保存 N 位向量。`city=Beijing AND year=2025` 可将两条位图按位 AND；“城市 A 或 B”可按位 OR。适合读多写少、较低基数的分析属性。

若属性有 K 个取值，未压缩位图载荷为

$$M=NK\ \mathrm{bits}=\frac{NK}{8}\ \mathrm{bytes}.$$

实际收益取决于压缩、分布、查询选择性和更新频率；K 很大或频繁写入时，维护与空间开销会增加。

#### 2. 对照主要工作负载

| 比较项 | OLTP 事务数据库 | OLAP 数据仓库 |
| --- | --- | --- |
| 目标 | 及时记录和处理业务 | 集成历史数据并支持分析 |
| 常见粒度 | 当前、细粒度事务记录 | 历史明细与汇总层次 |
| 典型操作 | 单笔查询、插入、修改、删除 | 多表分析、分组聚合、大范围扫描 |
| 例子 | 插入一条订单明细 | 按地区、产品和年份分析销量 |

回答时先说明任务，再给一个实际操作例子，即可将数据库结构与查询目的联系起来。


### English answer pattern

OLTP supports operational transactions; OLAP supports integrated historical analysis. Bitmap suitability depends on cardinality and update patterns.

OLTP 支持业务事务；OLAP 支持集成历史分析。位图适用性取决于基数与更新模式。

### 知识点与公式总结

- 位图索引每个属性值对应一条位向量，AND/OR 组合条件；低基数、分析查询多的属性常受益。
- OLTP 处理短事务和频繁更新；OLAP 面向历史数据的多维分析与聚合。
- 分析索引时写清“加速什么、增加多少空间、如何维护”，按具体负载选择。


---

<a id="PPT-INTRO45"></a>

## PPT-INTRO45 · 课件 · 补充一种可挖掘知识并说明应用

来源：当前完整七讲课件 · Intro.pdf · Exercises 1；页内印刷号 46 · PDF p.45

状态：完整课件练习；形式：课件开放题 / 应用。

### 原文

Can you describe other possible kind of knowledge that needs to be discovered by data mining methods but not been mentioned in class yet?

你能描述其他需要用数据挖掘方法发现、但课堂上尚未提到的知识类型吗？

### 逐步解答

#### 1. 提出一种新的知识形式

可以提出“维护策略对设备故障风险的影响”。沿用设备故障场景，问题是：在可比较的设备和运行条件下，提前维护能使后续故障风险降低多少？输出知识是策略改变带来的风险变化，可用于决定何时维护。

#### 2. 将数据、方法和用途接起来

| 部分 | 本例回答 |
| --- | --- |
| 输入 | 设备历史状态、负载、维护操作、故障结果及对应时间。 |
| 发现的知识 | 相同条件下，采用不同维护策略时故障风险的变化。 |
| 方法思路 | 使用随机对照，或在明确的因果假设下控制影响维护选择和故障风险的共同因素。 |
| 验证 | 在可靠对照或后续实际部署中，比较故障风险与维护成本。 |
| 用途 | 选择有实际收益的维护策略，减少停机损失。 |

#### 3. 解释为什么这一知识有用

设备负载高时可能既更常维护、又更易故障，因此要建立可靠的比较条件，才能将风险变化解释为维护策略的效果。最终回答应同时写清“想发现什么知识、需要什么数据、如何验证、支持什么决定”。


### English answer pattern

One possible task is to discover how a maintenance policy changes equipment failure risk. Use time-stamped equipment states, loads, maintenance actions and outcomes. Estimate the policy effect with a randomized comparison or justified causal assumptions, validate the effect, and use it to improve maintenance decisions.

一种可能的任务是发现维护策略如何改变设备故障风险。使用带时间戳的设备状态、负载、维护操作和结果。通过随机对照或有依据的因果假设估计策略效果，验证该效果，并用于改善维护决策。

### 知识点与公式总结

- 开放题先给清楚的知识形式；本例是“策略改变会使故障风险怎样变化”。
- 数据、方法与用途对应：历史状态及操作→可靠比较→策略效果→维护决策。
- 采用课堂尚未展开的具体任务；讨论因果效果时，应说明对照或识别假设。
