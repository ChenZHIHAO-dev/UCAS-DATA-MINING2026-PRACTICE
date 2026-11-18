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

| Technique | What it produces | Application |
| --- | --- | --- |
| Characterization / discrimination | 一类的概况与类间区别 | 对比常客与非活跃客户特征 |
| Association / frequent patterns | 经常共同出现的商品或事件 | 购物篮捆绑、交叉销售 |
| Classification | 从带标签样本预测离散类别 | 垃圾邮件、是否违约 |
| Numeric prediction / regression | 预测连续数值 | 销售额、房价 |
| Clustering | 无标签对象的相似群体 | 客户细分、土地类型探索 |
| Outlier analysis | 偏离主体的稀有对象 | 欺诈交易、异常设备 |
| Evolution / sequential analysis | 时间变化、顺序和周期 | 点击序列、购买顺序、季节趋势 |

回答连接“输入、输出、应用”，不要只把七个名称抄成列表。

### English answer pattern

Classification uses labeled examples, clustering discovers unlabeled groups, and association mining finds co-occurring patterns. Outlier analysis identifies unusual objects.

分类使用带标签样本；聚类发现无标签分组；关联挖掘寻找共现模式；离群点分析识别异常对象。


---

<a id="E17-04B"></a>

## E17-04B · 2017：训练垃圾/普通/重要邮件分类器

来源：2017 年扫描卷 · Q4(b) / 10 points · PDF p.1

状态：完整；形式：历年应用设计。

### 原文

Suppose you have roughly classified previous e-mails as junk, unimportant or normal/important. Describe how a data mining system can use this training set to classify new or unclassified messages.

假设你已把以往邮件粗分为垃圾、不重要、正常或重要。描述数据挖掘系统怎样利用该训练集，对新邮件或未分类邮件分类。

### 逐步解答

1. 明确标签和标注规则，建立已标注训练集，保留时间上较晚或独立的测试集。
2. 解析发件人、标题、正文与链接等特征；文本分词、词袋/TF-IDF，编码是否含可疑链接。词表与IDF只在训练集拟合，避免泄漏。
3. 训练朴素贝叶斯、决策树或其他分类器。若选朴素贝叶斯，估计类别先验及词的类条件概率，对未见词用平滑。
4. 验证调参，用每类 precision/recall 和混淆矩阵评价；误判重要邮件为垃圾通常代价高，应关注这一类错误。
5. 将相同特征变换应用到新邮件后预测，可对低置信样本转人工复核，并用新标注定期更新以应对垃圾邮件模式漂移。

### English answer pattern

Build features from labeled messages, fit a supervised classifier, validate without leakage, and apply the same feature pipeline to new mail.

从带标签邮件构建特征，拟合监督分类器，进行无泄漏验证，再把同一特征流程应用到新邮件。


---

<a id="SUP-INDEX"></a>

## SUP-INDEX · 来源问答整理：位图与仓库/事务库对比

来源：本地期末问答笔记 · 位图、数据库与数据仓库条目

状态：补充问答；年份不明；形式：来源补充简答。

### 原文



简述位图索引的适用场景，并区分 OLTP 数据库和 OLAP 数据仓库。该文档无明确年份与题号，不能标为某年原题。

### 逐步解答

位图适合分析型、读多写少且较低基数属性，多条件可按位交并；高基数及频繁更新是局限。原笔记称“一定减少空间/I/O”过强，应加上数据分布、压缩和查询条件。

OLTP 偏向当前事务、细粒度、短小读写和一致性；OLAP 偏向历史集成数据、主题分析、复杂聚合与大范围扫描。按主要工作负载比较两者：事务库侧重及时处理业务，仓库侧重集成历史分析。

### English answer pattern

OLTP supports operational transactions; OLAP supports integrated historical analysis. Bitmap suitability depends on cardinality and update patterns.

OLTP 支持业务事务；OLAP 支持集成历史分析。位图适用性取决于基数与更新模式。
