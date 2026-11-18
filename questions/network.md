# 神经网络与反向传播

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=network)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E17-06"></a>

## E17-06 · 2017：分段激活与题给 BP 公式冲突

来源：2017 年扫描卷 · Q6(a-b) / 20 points · PDF p.2

状态：原卷公式不一致；给出两种明确口径；形式：计算 / 推导。

### 原文

A 2–2–1 network has learning rate l=0.9 and all biases initially 0. The printed activation is f(x)=x if x≥1, and 1 if x<1. Input x1=1,x2=0, target z=1. Initial weights: w11=0,w12=2,w21=2,w22=1, output weights T1=T2=1. Compute the forward output and updated weights using the printed error formulas Err_j=O_j(1−O_j)(T_j−O_j), Err_j=O_j(1−O_j)Σ Err_k w_jk.

一个 2–2–1 网络的学习率为 0.9，所有偏置初始为 0。印出的激活函数为：x≥1 时 f(x)=x，x<1 时 f(x)=1。输入 x1=1、x2=0，目标 z=1。初始权重 w11=0、w12=2、w21=2、w22=1，输出权重 T1=T2=1。使用印出的输出层和隐藏层误差公式，计算前向输出及更新后的权重。

### 逐步解答

**先固定图上的连接：** $w_{11}:x_1\to y_1$，$w_{12}:x_2\to y_1$，$w_{21}:x_1\to y_2$，$w_{22}:x_2\to y_2$；$T_1,T_2$ 是隐藏到输出的连接权重，与目标值 t=1 分开记。

前向净输入 $a_{y1}=0,a_{y2}=2$，按印刷分段激活得 $y_1=1,y_2=2$，输出净输入 3，故 $z=3$。

**A. 按题面指定更新式机械代入（不作为正确梯度）：** 输出误差 $\delta_z=3(1-3)(1-3)=12$；隐藏误差 $\delta_{y1}=1(1-1)12=0$、$\delta_{y2}=2(1-2)12=-24$。全部误差先用旧权重计算，再更新：

| Parameter | Updated value |
| --- | --- |
| w11, w12 | 0, 2 |
| w21, w22 | −19.6, 1 |
| T1, T2（若一并更新） | 11.8, 22.6 |
| hidden biases, output bias（若一并更新） | 0, −21.6; 10.8 |

**B. 对印刷激活与平方误差做一致的反向传播：** 此处输出及 y2 净输入均 >1，导数为 1；y1 净输入 <1，导数 0。因此 $\delta_z=1-3=-2$、$\delta_{y1}=0$、$\delta_{y2}=-2$，得到 w11=0,w12=2,w21=.2,w22=1；T1=−.8,T2=−2.6。点 x=1 的不可导情况本样本没有遇到。

卷面建议：明确指出激活与给定导数不一致，写出你遵照的口径。不能悄悄把前向改成 sigmoid，再宣称是唯一原题答案。原扫描页可展开核对。

### English answer pattern

The printed piecewise activation is inconsistent with the supplied sigmoid derivative. State the convention before computing the update.

印出的分段激活函数与给定 Sigmoid 导数不一致。计算更新前，先说明采用哪种约定。

### 易错点与约定

初始偏置为零，更新时仍按偏置梯度计算增量。当前题只要求四个输入权重时，其他权重/偏置可作为补充检查。


---

<a id="HW2-03"></a>

## HW2-03 · 当前 HW2：类别编码与一次 8–2–3 更新

来源：当前 HW2 · Written Q3(a-b)

状态：完整；形式：计算 / 推导。

### 原文

Design a one-hidden-layer feed-forward network for Height/Hair/Eye with classes C1,C2,C3. For (Tall,Red,Brown,C3), compute forward outputs and updated weights and biases. State initial values and learning rate.

针对身高、发色、眼睛颜色及 C1、C2、C3 三类，设计单隐藏层前馈网络。对（高、红发、棕眼、C3），计算前向输出以及更新后的权重和偏置。说明初始值与学习率。

### 逐步解答

Height 三类、Hair 三类、Eye 两类，采用独热输入 $x=(Tall,Medium,Short,Blond,Dark,Red,Brown,Blue)=(1,0,0,0,0,1,1,0)$，输出目标 $t=(0,0,1)$。隐藏层取 2 个神经元，得到 8–2–3 网络。

**为便于逐项核算，自设初值**：所有输入→隐藏权重为 .1，隐藏偏置 0；所有隐藏→输出权重为 .1，输出偏置 0；sigmoid 激活、平方误差、η=.1。下面按这套初值逐项计算。

$h_1=h_2=\sigma(.3)=.574442517$；三个输出均为 $o=\sigma(.1h_1+.1h_2)=.528690575$。输出误差使用 $\delta_k=o_k(1-o_k)(t_k-o_k)$，前两类约 −.131737，第三类约 .117439；精确值以计算验证表为准。

令 $a=\sigma(.3),b=\sigma(.2a)$，则可保留精确表达式：$d_0=-b^2(1-b)$，$d_1=b(1-b)^2$，隐藏误差均为 $d_h=a(1-a)\,.1(2d_0+d_1)$。

更新：$W'_{jk}=.1+.1\delta_k a$，$b'_k=.1\delta_k$；激活的三个输入对应权重变为 $.1+.1d_h$，未激活输入的权重仍 .1；隐藏偏置为 $.1d_h$。将这些表达式同时代入即可得到所有参数，而非只更新一条边。

此初值具有对称性，适合手算检查；实际训练一般用非对称随机初值以打破隐藏单元对称。Softmax+交叉熵可用于三分类，但其输出误差不能再套这里的 sigmoid+SSE 公式。

**本初始化的数值更新表：**

| Parameter group | Updated value |
| --- | --- |
| 每个隐藏单元：Tall/Red/Brown 对应输入权重 | 0.099643004 |
| 其他输入→隐藏权重 | .100000000 |
| 两个隐藏偏置 | -0.000356996 |
| 任一隐藏→C1/C2/C3 | 0.092432441, 0.092432441, 0.106746218 |
| C1/C2/C3 输出偏置 | -0.013173745, -0.013173745, 0.011743940 |

全部27个参数的梯度已用中心差分独立校验。

### English answer pattern

Use one-hot inputs, declare the initialization and loss, compute all deltas with old weights, then update all weights and biases.

采用独热输入，声明初始参数和损失；使用旧权重计算全部误差信号，再更新全部权重和偏置。

### 易错点与约定

本题 C3 标签与建树题不同。当前网络三输出；不要拿往届的二分类网络目标直接套用。

### 计算与内存分析

设总权重/偏置数 P，8–2–3 网络 P=(8+1)×2+(2+1)×3=27，一样本前向与反向均 O(P)。


---

<a id="HX2-02"></a>

## HX2-02 · 往届 HW2：Medium/Blond/Blue 二分类网络

来源：往届 HW2（hxd） · Written Q2

状态：完整；形式：计算 / 推导。

### 原文

Design a one-hidden-layer network for Q1. Show one backpropagation update for (Medium,Blond,Blue,C1), stating initial weights, biases and learning rate.

为 Q1 设计单隐藏层网络。对（中等身高、金发、蓝眼、C1），展示一次反向传播更新，并说明初始权重、偏置和学习率。

### 逐步解答

可取 8–2–1 网络。输入顺序沿用当前网络题，$x=(0,1,0,1,0,0,0,1)$，用 C1=1,C2=0 编码目标，取各权重 .1、偏置 0、η=.1、sigmoid+SSE。

三个激活输入使两个隐藏输出仍 $a=\sigma(.3)$；输出 $b=\sigma(.2a)$。输出误差 $\delta_o=b(1-b)(1-b)$，隐藏误差 $\delta_h=a(1-a)\,.1\delta_o$。

两个隐藏→输出权重均变为 $.1+.1\delta_o a$，输出偏置 $.1\delta_o$；三个激活输入到每个隐藏单元的权重变为 $.1+.1\delta_h$，其他输入权重不变，隐藏偏置 $.1\delta_h$。这是完整可复算的一个自设初始化解。

由于本题只需二分类，一输出即可；若用两输出独热，也要写明目标向量和相应误差式。

本例数值：隐藏输出 0.574442517，最终输出 0.528690575，输出误差 0.117439398，隐藏误差 0.002870904；更新后的两条输出权重均 0.106746218，输出偏置 0.011743940，激活输入权重 0.100287090，隐藏偏置 0.000287090。

### English answer pattern

The older assignment is binary. One sigmoid output is sufficient when C1 is encoded as 1.

往届作业是二分类。把 C1 编码为 1 时，一个 Sigmoid 输出已足够。
