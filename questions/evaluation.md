# 过拟合、评估与选模

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=evaluation)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E17-03"></a>

## E17-03 · 决策树过拟合：历年重复简答

来源：2017 年扫描卷 · Q3 / 5 points · PDF p.1；2020 年扫描卷 · Q3(1-2) / 8 points · PDF p.1

状态：完整；形式：历年简答。

### 原题 / 转录整理

How to overcome overfitting in decision trees? What is overfitting?

### 第一步：中文翻译与条件

什么是过拟合？如何减轻决策树过拟合？

### 逐步解答

过拟合指模型连训练样本中的偶然噪声也拟合了，训练误差低而对未见数据的泛化较差。

1. **Pre-pruning 预剪枝：**限制最大深度、最小分裂/叶样本数、最小增益等，提前停止不可靠分裂。优点是省训练成本；可能过早停止而欠拟合。
2. **Post-pruning 后剪枝：**先生成树，再用验证误差或误差估计、代价复杂度等剪去不能改善泛化的子树。允许保留早期看似弱但后续有用的分裂。
3. 用独立验证集或交叉验证选择树的复杂度；训练误差不是选树依据。增加高质量数据、处理错误标签也有帮助。

复杂度惩罚示例 $R_\alpha(T)=R(T)+\alpha|Leaves(T)|$，α 越大越偏向小树；这里是说明一种剪枝准则，不表示 C5.0 就直接采用这条公式。

### English answer pattern

Overfitting means fitting noise in the training data and generalizing poorly. Use pre-pruning or post-pruning and select complexity on validation data.


---

<a id="E20-03D"></a>

## E20-03D · 2020：神经网络过拟合的防治

来源：2020 年扫描卷 · Q3(4) / 6 points · PDF p.1

状态：完整；形式：历年简答。

### 原题 / 转录整理

A neural network classifier may consist of multiple hidden layers. How to overcome overfitting in a neural network classifier?

### 第一步：中文翻译与条件

多隐藏层网络如何避免过拟合？结合机制说明，不只列英文名词。

### 逐步解答

可选三至四项展开：

1. **Regularization 正则化**：损失增加 λ∥W∥²，抑制过大的权重；λ 用验证集选择。
2. **Early stopping 提前停止**：监测验证损失，在继续训练已不能改善泛化时停止，恢复最佳轮次参数。
3. **Reduce capacity 减小容量**：减少隐藏单元/层或参数；过度缩减会欠拟合。
4. **More representative data / augmentation**：增加有效数据；增强操作须保持标签语义。
5. **Dropout**：训练时随机屏蔽部分单元，减少共同适应，推理时使用对应缩放约定。

输入标准化通常改善优化，不等价于防过拟合；BatchNorm 也不能替代独立验证与正则化。测试集只能用于最终评价，不能逐轮看测试集来早停。

### English answer pattern

Use weight regularization, early stopping, capacity control, appropriate data augmentation or dropout, with hyperparameters selected on validation data.


---

<a id="HW3-LAB1"></a>

## HW3-LAB1 · 银行实验转手算：混淆矩阵与选树

来源：当前 HW3 · Lab Q1；往届 HW2（hxd） · Lab Q1 (pruning parameter differs)

状态：完整；形式：作业提炼 / 评估。

### 原题 / 转录整理

Build PEP decision trees with minimum records per child 56,15,10; compare validation confusion matrices and choose a model for holdout scoring. Current pruning severity is 70; the older homework uses 75.

### 第一步：中文翻译与条件

在验证数据上比较三棵不同最小子分支样本数的树；选择模型给新数据打分。当前和往届剪枝参数不同，不把两者实验结果混用。

### 逐步解答

把软件实验转为考试题时，重点是验证评估和复杂度选择。若给 TP,FP,FN,TN：Accuracy=(TP+TN)/N，Precision=TP/(TP+FP)，Recall=TP/(TP+FN)，Specificity=TN/(TN+FP)。先说明行列方向及正类 PEP=YES。

**自设小变式，非作业原始输出：**模型 A 的 (TP,FP,FN,TN)=(30,10,20,140)，B=(38,22,12,128)。A Accuracy=.85、Precision=.75、Recall=.6；B Accuracy=.83、Precision≈.6333、Recall=.76。若只按准确率选 A；若漏掉潜在购买者代价更高，可能按成本 $C_{FN}FN+C_{FP}FP$ 选 B。

不靠“树越大越好”选模型。当前完整实验输出在原 HW3 results/bank 中；本题仅将可考部分压缩为可以手算的变式，不冒充完整软件重跑。

### English answer pattern

Select on validation performance and business costs, not training accuracy or tree size alone.


---

<a id="HW2-LAB"></a>

## HW2-LAB · 从树路径提取规则与新样本预测

来源：当前 HW2 · Lab 1-3；往届 HW3（hxd） · Lab Prediction

状态：完整；形式：作业提炼 / 读树。

### 原题 / 转录整理

Build a C5.0 tree for pasta, predict 20 rollout customers, and report positive purchase rules up to the fifth level with the root counted as level 1.

### 第一步：中文翻译与条件

从已训练树为新顾客预测，并将通往正类叶子的路径转成规则；层数根为 1。

### 逐步解答

算法：从根开始按样本属性沿满足条件的边下降，直到到达叶子，输出叶标签。每条根到 yes 叶子的路径转为 IF 条件的合取 THEN pasta=yes。

**自设路径示例：**根 level1 测 beer；beer=1 后 level2 测 cheese；cheese=0 到 level3 yes 叶，得到 beer=1 AND cheese=0 ⇒ pasta=yes。对 (beer=1,cheese=0) 预测 yes。

第五层范围不是“最多五个条件”：根到 level5 叶通常只有四条边。若 level5 节点仍有子树，不能未经说明将它当 yes 叶输出；可注明截断后多数类与原完整树预测不同。原题的软件参数和 20 条 rollout 属于实验结果，题库提炼的是读树与路径规则能力。

### English answer pattern

Conjoin the edge tests along each root-to-positive-leaf path. Count the root as level one.


---

<a id="HX2-LAB2"></a>

## HX2-LAB2 · 往届学习行为预测：模型选择与泄漏

来源：往届 HW2（hxd） · Lab Q2 考试成绩预测

状态：实验题提炼；未重跑软件；形式：作业提炼 / 设计。

### 原题 / 转录整理

Predict final-exam pass/fail from online learning behavior. Training data have 873 records and the supplied test data 461 records. Try decision trees, neural networks or logistic regression with different parameters and report a confusion matrix.

### 第一步：中文翻译与条件

根据在线学习时长、阅读次数、模拟考试等行为预测期末及格与否，比较模型参数并汇报混淆矩阵。这里提炼的是实验中可转成笔试的设计与评价步骤。

### 逐步解答

1. 定义正类：及格=1、不及格=0。人员ID用作标识，不直接当连续预测特征。确认所有输入是在预测时点之前可获得的行为；期末之后产生的字段会泄漏答案。

2. 在873条训练数据内部划分验证集或做交叉验证，用验证表现调节树深度/最小叶样本、网络容量/早停、逻辑回归正则化；数值缩放只在各训练折拟合。

3. 选定模型及阈值后再在461条给定测试数据上汇报TP、FP、FN、TN，并计算precision、recall、F1；若原作业使用“测试集”反复选模，须说明它事实上承担验证集作用，最终泛化还需新留出集。

4. 类别不平衡时，全部预测为多数类也可能准确率很高。若重点提前识别不及格学生，可把不及格重新定义为业务正类并完整重算指标；不能只换解释而不换分母。

原题没有给定一张可手算的固定混淆矩阵；本题不把自设矩阵说成这461条数据的实际输出。

### English answer pattern

Tune on training/validation data, prevent temporal leakage, and evaluate the selected model on held-out records with a clearly defined positive class.

### 易错点与约定

不同学习者的重复记录可能需要按人分组划分；同一人同时出现在训练与测试中可能高估泛化。

### 计算与内存分析

模型比较次数乘以单次训练与验证成本；交叉验证K折使训练成本大致再乘K。


---

<a id="E25-05"></a>

## E25-05 · 2025 · 第5题：过拟合定义及神经网络的防治

来源：2025 年人工智能学院回忆卷 · Q5 · PDF p.2

状态：完整复原练习；形式：回忆复原 / 完整练习。

**复原依据：**回忆为简答：说明 overfitting，解释如何解决神经网络过拟合。

**补配与口径：**

- 将简答的作答深度明确为“定义 + 训练/验证表现 + 至少三项带机理的措施 + 选参纪律”。

以下为可完整作答的复原练习；补配数值不是原卷原值。

### 完整英文题干 / Reconstructed problem

**(a)** What is overfitting? Explain its typical effect on training and validation performance.

**(b)** Describe at least three methods for reducing overfitting in a neural network classifier. Explain the mechanism of each method.

**(c)** State how regularization strengths and the stopping epoch should be selected without using the test set for repeated tuning.

### 第一步：中文翻译与条件

先定义过拟合并联系泛化；再给至少三项神经网络防过拟合方法，每项解释原理；最后说明调参、早停和测试集的职责。

### 小问要求与完成标准

| 小问 | 必须交付 | 完整程度 |
| --- | --- | --- |
| (a) | 定义 overfitting，并说明训练与验证误差的典型差异 | 2—3 句，提到泛化。 |
| (b) | 至少 3 种减轻神经网络过拟合的措施 | 每种写名称与起作用的方式；不是只列术语。 |
| (c) | 说明在哪个数据集上选超参数与早停轮次 | 验证集/交叉验证；测试集保留作最终评价。 |

### 逐步解答

#### 1. 定义要落到泛化

过拟合是模型过度适应训练样本中的噪声或偶然规律，以致对未见数据的预测变差。典型现象是训练损失继续下降，而验证损失开始上升；但不能仅凭某一轮波动就断言过拟合，应结合趋势和样本量。

#### 2. 选择三项以上并解释机理

| Method | Mechanism / 机理 | 如何使用 |
| --- | --- | --- |
| L2 regularization | 优化 $\mathcal L_{data}+\lambda\lVert W\rVert_F^2$，惩罚过大权重。 | 用验证集选 λ。 |
| Early stopping | 在验证性能不再改善时停止，恢复验证最优轮次。 | 不能监看测试集来早停。 |
| Dropout | 训练时随机屏蔽部分单元，减轻共同适应。 | 按所用实现处理训练/推理缩放。 |
| Capacity control | 减少不必要的层/隐藏单元，限制拟合容量。 | 过小也会欠拟合。 |
| More representative data / augmentation | 增加有效样本，减少记住有限训练集的倾向。 | 增强须保留标签语义。 |

#### 3. 验证与测试的分工

训练集拟合权重；验证集或交叉验证选择网络规模、正则强度与停止轮次；最终测试集仅评价选好的模型。标准化常帮助优化，但“把数据标准化”不能单独替代正则化与验证。

#### 4. 可直接组织的英文答案

按下面英文段落写清定义、三种措施和选参位置即可；无需推导一遍反向传播。

### English answer pattern

Overfitting occurs when a model learns noise or accidental details in the training set and generalizes poorly. Training loss may keep decreasing while validation loss increases. L2 regularization penalizes large weights; early stopping restores the model at the best validation epoch; dropout reduces co-adaptation of hidden units. Reducing unnecessary model capacity and adding representative, label-preserving training data can also help. Select hyperparameters on validation data or cross-validation, and reserve the test set for final evaluation.

### 易错点与约定

本题问的是防治机制，不是要求画网络或计算梯度。Batch normalization 与输入缩放不能保证消除过拟合。
