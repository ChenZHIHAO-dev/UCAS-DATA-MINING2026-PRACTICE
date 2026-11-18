# 仓库设计与 OLAP

[返回题型索引](../题型索引.md) · [网页练习](../index.html#type=warehouse)

同数据同题合并列出多处来源；题目文字为转录整理，原扫描页保留供核对。

<a id="E20-01"></a>

## E20-01 · 航空公司：事实粒度与饮食事实

来源：2020 年扫描卷 · Q1 / 12 points · PDF p.1

状态：完整；形式：设计 / OLAP。

### 原题 / 转录整理

航空公司希望分析常客的旅行趋势、不同航线旅客的季节变化和增长，并跟踪不同航班上消费的食品和饮料。请为航空公司的任务设计一个数据仓库模型。

### 第一步：中文翻译与条件

原题为中文。需要同时支持“旅客旅行”和“机上餐饮”分析，设计事实表、维度和概念层次。

### 逐步解答

1. **先定粒度。** FactTravel 一行表示一名旅客在一次具体航班航段上的乘坐事实；不能只写“一个航班”却又在事实里存多位旅客。
2. 旅行事实键：passenger_key, flight_leg_key, departure_date_key, route_key；度量 passenger_count=1、fare（有题目数据时）。Passenger 记录常客层级；Route 可保存始发/到达机场及城市、国家；Date 为 day→month→quarter→year，另有 season 属性。
3. **餐饮另设事实表** FactCatering，一行表示一次航段中某旅客对某食品/饮料的一条消费记录，增加 product_key、quantity、amount（有价格时）。它和旅行事实共享旅客、航段、日期维，形成事实星座；如果只有航班总消费，改为 flight_leg×product 粒度并明确无法回溯到个人。
4. 季节客流：按 route、year、season 聚合 passenger_count；餐饮供应：按 route、season、product 聚合 quantity。旅客增长率由相邻期间客流计算，不能把各月增长率直接求和。

```text
DimPassenger ─ FactTravel ─ DimDate
                 │
            DimFlightLeg / DimRoute
                 │
DimProduct ─ FactCatering ─ DimDate
```
三张共享维可分别连接两个事实，图是结构摘要；建模时需显式标出每个事实外键。

### English answer pattern

Define the grain first. Use a passenger-flight fact for travel and a separate consumption fact for catering, with shared date, passenger and flight dimensions.

### 易错点与约定

不同粒度事实直接连接再汇总会重复计数。题目没给票价或消费金额时，应写为可选度量，不能假装已有该字段。


---

<a id="E17-04A"></a>

## E17-04A · 电子邮件库的多维组织

来源：2017 年扫描卷 · Q4(a) / 8 points · PDF p.1

状态：完整；形式：设计 / OLAP。

### 原题 / 转录整理

An e-mail database stores a large number of electronic mail messages. How can such a database be structured so as to facilitate multidimensional search, such as by sender, by receiver, by subject, and by time?

### 第一步：中文翻译与条件

邮件数据库存放大量半结构化邮件。如何组织它，以便按发件人、收件人、主题和时间进行多维检索？

### 逐步解答

先定一封邮件一行的 FactMessage，含 message_key、sender_key、subject_key、sent_time_key、message_count=1、size_bytes（若可得）。维度为 Sender、Subject、Time；Time 可有 hour→day→month→year。正文单独存储或建立全文索引。

一封邮件可能有多个收件人。可用 BridgeMessageRecipient(message_key,recipient_key,recipient_type) 连接接收者维；此时跨收件人统计“邮件数”须 COUNT(DISTINCT message_key)，不能让同一邮件因多收件人而重复。若事实粒度改为邮件×收件人，则须明确 message_count 的含义。

主题关键词或话题标签也可能多值；要区分原始 subject 文本、可检索的词项和经过归类的主题维。

### English answer pattern

Store message-level facts with sender, subject and time dimensions. Model multiple recipients with a bridge and avoid double-counting messages.


---

<a id="E25-01"></a>

## E25-01 · 2025 · 第1题：ER 图、星型模式、概念层次与 OLAP

来源：2025 年人工智能学院回忆卷 · Q1 · PDF p.1

状态：完整复原练习；形式：回忆复原 / 完整练习。

**复原依据：**给停车场、汽车与租车服务商的 ER 图，按已给属性构造星型仓库，标概念层次，再通过 OLAP 查询某年北京停车场中汽车的租价。回忆保留了车牌、是否租赁、price、city/state 及 days/weeks/years 等信息。

**补配与口径：**

- 补绘 5 个实体及其主外键关系。
- 补配 6 条停车日记录。
- 将“某年租价”明确为 2025 年、按车辆计算其北京停车日的平均挂牌日租价。

以下为可完整作答的复原练习；补配数值不是原卷原值。

### 完整英文题干 / Reconstructed problem

The operational database is represented by the ER diagram below. Vehicle has plate_no, is_rental and daily_price; a rental vehicle belongs to one provider. ParkingLot has lot_id, city and state. Calendar contains day, ISO week, week-year and calendar year. ParkingRecord records the lot in which a vehicle is parked on a date. Each vehicle has at most one parking record per date. For this exercise, rental status, provider and listed daily price remain unchanged over the recorded period. Non-rental vehicles have a NULL rental price.

![停车与租赁业务 ER 图](../assets/diagrams/recall2025-er.svg)

**(a)** Design a star-schema data warehouse. State the fact grain, keys, dimensions and measures.

**(b)** Specify appropriate concept hierarchies. Distinguish calendar year from ISO week-year.

**(c)** Starting from the base cuboid [day, vehicle, lot, provider], return, for each rental vehicle parked in Beijing in calendar year 2025, its average listed daily rental price over its recorded Beijing parking days. Give the OLAP operations and a SQL query. Use the six records below to calculate the result. A listed price is not rental revenue.

| Date | Plate | Lot | City | Provider | Daily price |
| --- | --- | --- | --- | --- | --- |
| 2025-01-06 | 京A001 | L1 | Beijing | P1 | 200 |
| 2025-01-07 | 京A001 | L1 | Beijing | P1 | 200 |
| 2025-02-03 | 京B002 | L2 | Beijing | P2 | 150 |
| 2025-02-03 | 京C003 | L1 | Beijing | N/A | NULL |
| 2025-03-01 | 京B002 | L3 | Shanghai | P2 | 150 |
| 2024-12-30 | 京A001 | L1 | Beijing | P1 | 200 |

### 第一步：中文翻译与条件

图中的车辆含车牌、是否租赁和挂牌日租价；租赁车辆归属一个服务商。停车场含编号、城市和州/省，日期维含日、ISO 周、周年与自然年。停车记录说明某车某天停在哪个场：**一车一天最多一条**。本练习中车辆租赁状态、服务商及日租价在记录期内不变；非租赁车的租价为 NULL。

(a) 依据图中的业务实体设计星型仓库，先定义事实表的一行代表什么，再标主外键、维度和度量。

(b) 给出维度概念层次，并说明自然年与 ISO 周年不能随意混用。

(c) 按**自然年 2025、城市 Beijing、租赁车辆**筛选，对每辆车在这些停车日上的挂牌日租价求平均，交出查询步骤、SQL 和实际结果。这里不求租赁收入，也不要求统计未被记录的日期。

### 小问要求与完成标准

| 小问 | 明确要做什么 | 写到什么程度 |
| --- | --- | --- |
| (a) Star schema | 将 ER 模型变为仓库星型模式 | 画 1 张事实表、4 张维度表；写粒度、PK/FK 和度量含义。 |
| (b) Concept hierarchies | 标出日期、地点等可用层次 | 至少写 day→week→week-year、day→year、lot→city→state；指出不同年口径。 |
| (c) OLAP query | 查询 2025 年在北京停车的各租赁车的平均日租价 | 给 OLAP 操作、聚合口径、SQL 及结果表；不把日租价累加成租金收入。 |

### 逐步解答

#### 1. 从业务事实确定粒度

一行表示“**某车辆在某一天、某停车场的停车快照**”。题目约定一车一天最多一条，故事实主键可用 $(date\_key,vehicle\_key)$；lot 与 provider 是该粒度上的外键。不能一行写“停车场全年汇总”却又存单辆车的租价。

![停车日快照星型模式](../assets/diagrams/recall2025-star.svg)

#### 2. 写清表、键与度量

| Table | Keys / fields | 含义 |
| --- | --- | --- |
| FactParkingDay | PK(date_key, vehicle_key); lot_key, provider_key; daily_rent, parked_count | 日快照；parked_count=1；daily_rent 从该车日租价取得。 |
| DimDate | date_key; full_date, day, iso_week, week_year, calendar_year | 同一日期同时有自然年与 ISO 周年属性。 |
| DimVehicle | vehicle_key; plate_no, is_rental | 车牌识别车辆；本练习属性在记录期内不变。 |
| DimLot | lot_key; lot_id, city, state | 停车场及其地点。 |
| DimProvider | provider_key; provider_id, provider_name | 租赁商；自有车可指向 N/A 维度成员。 |

$parked\_count$ 可按日累计为“停车车日”，不是跨日独立车辆数。$daily\_rent$ 是价格，对时间不能当作收入直接求和。若需要物化均价，应保留价格之和与有效价格的观测数，最后相除。

#### 3. 概念层次

- 日期：$day\to ISO\ week\to week\text{-}year\to ALL$；另一路 $day\to calendar\ year\to ALL$。跨年周属于周年，不能硬拼成 week→calendar-year。
- 地点：$lot\to city\to state\to ALL$。
- 车辆：$plate\to rental\ status\to ALL$ 仅用于按租赁状态分组；查询中保留 plate。
- 租赁商：$provider\to ALL$，题目没有给地区等属性，不另造层级。

#### 4. OLAP 与 SQL

对自然年、城市做切片：$calendar\_year=2025$、$city=Beijing$；筛 $is\_rental=1$。地点从 lot roll-up 到 city，日期从 day 聚合到 calendar-year，provider roll-up 至 ALL，**保留 vehicle**，价格按有效停车日做 AVG。

```sql
SELECT v.plate_no, AVG(f.daily_rent) AS avg_daily_price
FROM FactParkingDay AS f
JOIN DimDate AS d ON d.date_key = f.date_key
JOIN DimVehicle AS v ON v.vehicle_key = f.vehicle_key
JOIN DimLot AS l ON l.lot_key = f.lot_key
WHERE d.calendar_year = 2025
  AND l.city = 'Beijing'
  AND v.is_rental = 1
GROUP BY v.plate_no
ORDER BY v.plate_no;
```

筛选后留下前三条：

$$\begin{aligned}
\bar p_{\text{京A001}}&=\frac{200+200}{2}=200,\\[5pt]
\bar p_{\text{京B002}}&=\frac{150}{1}=150.
\end{aligned}$$

| Plate | Included parking days | Average daily price |
| --- | --- | --- |
| 京A001 | 2 | 200 |
| 京B002 | 1 | 150 |

第四条为非租赁车，第五条不在北京，第六条不在自然年 2025。京A001 的价格不是 $200+200=400$ 元日租价。

### English answer pattern

Use a vehicle-day fact grain. Slice to Beijing and calendar year 2025, retain the vehicle dimension, and average valid listed daily prices. The two resulting prices are 200 and 150.

### 易错点与约定

先解释平均的是“已记录的北京停车日”，不补算全年未出现的日期；自然年查询不能误用 week_year。

### 计算与内存分析

直接扫描 $N$ 条事实并哈希分组约 $O(N)$ 时间、$O(g)$ 分组空间，$g$ 是输出车辆数。预聚合均价需保存 sum 和 count，不能直接平均不等样本量的均值。


---

<a id="HW1-01"></a>

## HW1-01 · 销售仓库、Los Angeles 查询与位图

来源：当前 HW1 · Q1(a-c)

状态：完整；形式：设计 / OLAP。

### 原题 / 转录整理

假定数据仓库有 date, product, vendor, location 四维和 sales_volume, sales_cost 两个度量。(a) 画星型模式；(b) 从基本方体出发列出每年在 Los Angles 的每个 vendor 的 sales_volume；(c) 讨论位图索引优点和问题。

### 第一步：中文翻译与条件

原题为中文；Los Angles 按常用地名 Los Angeles 理解。要保留每个供应商，不是只筛 vendor A。

### 逐步解答

事实粒度：date×product×vendor×location 的销售汇总。一张 FactSales 保存四个外键和两个度量，连接 DimDate、DimProduct、DimVendor、DimLocation。

OLAP：Slice(location.city=Los Angeles)；date Roll-up 到 year；product Roll-up 到 ALL；保留 vendor；对 sales_volume 求 SUM。

```sql
SELECT d.year, v.vendor_name, SUM(f.sales_volume) AS volume
FROM FactSales f
JOIN DimDate d ON f.date_key = d.date_key
JOIN DimVendor v ON f.vendor_key = v.vendor_key
JOIN DimLocation l ON f.location_key = l.location_key
WHERE l.city = 'Los Angeles'
GROUP BY d.year, v.vendor_name;
```
位图可为 city、year 等低基数属性每个值保存一个长度为 N 的 bit 向量，以 AND/OR 组合查询。未压缩大小约 NK/8 字节；高基数 K、频繁写入与并发更新会增加代价，不能说位图总比普通索引省空间。

### English answer pattern

Slice the location to Los Angeles, roll up date to year and product to ALL, and group sales volume by year and vendor.

### 计算与内存分析

位图的字级交运算约 O(N/w)，w 为机器字长；扫描聚合约 O(N)，输出分组表额外 O(g) 空间。


---

<a id="HW1-02"></a>

## HW1-02 · 1000 探针、十年逐小时气象仓库

来源：当前 HW1 · Q2

状态：完整；形式：设计 / OLAP。

### 原题 / 转录整理

Design a data warehouse for a regional weather bureau with about 1000 land/ocean probes collecting air pressure, temperature and precipitation each hour for over ten years. Present the schema, fact table(s), dimension tables and concept hierarchies for querying and OLAP.

### 第一步：中文翻译与条件

为区域气象局设计仓库：约 1000 个陆地/海洋探针，逐小时记录气压、温度和降水，已有十余年数据。给出模式、事实表、维度表与层次。

### 逐步解答

FactWeather 一行是一探针一小时的观测，键 probe_key,time_key，度量 pressure、temperature、precipitation。Probe 维保存海陆类型、坐标、所属区域；Time 为 hour→day→month→quarter→year，另存季节。地点层次可用 station→region→ALL；海域需采用适用的海区层次，不能强行 city→state。

气温和气压不对时间直接 SUM，通常取平均、最小、最大；为正确合并平均数，保留 sum 与有效观测 count。降水量若表示该小时累计降水，在**不重叠时间段**可求和；不同地点降水深度不能未经面积权重解释就当总水量累加。

按年、月或地区做 Roll-up，按某探针或海陆类型 Slice；按小时 Drill-down。可按时间分区，以 probe/time 建索引，常用日/月汇总做物化视图。

### English answer pattern

Use a probe-hour grain. Store additive precipitation intervals carefully and aggregate temperature with sums and valid counts rather than summing averages.

### 易错点与约定

缺测不应当成温度 0；平均数的平均只有等样本量时才等于整体平均。

### 计算与内存分析

仅按 365 天/年估算：1000×24×365×10=87,600,000 行。实际考虑闰日、缺测和设备更替。


---

<a id="HX1-01"></a>

## HX1-01 · 往届销售仓库：vendor A 年汇总

来源：往届 HW1（hxd） · Q1 · PDF p.1

状态：完整；形式：设计 / OLAP。

### 原题 / 转录整理

四维 date, product, vendor, location；度量 sales_volume, sales_cost。画星型，并从基本方体列出每年 vendor A 的 sales_volume。

### 第一步：中文翻译与条件

原题为中文。和当前 HW1 的城市条件不同，这题筛选供应商 A，再求其各年销售量。

### 逐步解答

星型与当前 HW1 相同。Slice(vendor=A)；date Roll-up 至 year；product、location Roll-up 至 ALL；按 year 对 sales_volume 求 SUM。

```sql
SELECT d.year, SUM(f.sales_volume)
FROM FactSales f
JOIN DimDate d ON f.date_key=d.date_key
JOIN DimVendor v ON f.vendor_key=v.vendor_key
WHERE v.vendor_name='A'
GROUP BY d.year;
```
比较练习：把当前 HW1 的 WHERE city 条件和 GROUP BY year,vendor 改成这里的 WHERE vendor 条件与 GROUP BY year，说明查询粒度为什么改变。

### English answer pattern

Slice vendor to A and roll up all dimensions except year.


---

<a id="HX1-02"></a>

## HX1-02 · 社交平台的多维仓库设计

来源：往届 HW1（hxd） · Q2 · PDF p.1

状态：完整；形式：设计 / OLAP。

### 原题 / 转录整理

某网络社交平台数据库存储大量信息。设计数据仓库结构，便于多维查询和挖掘。

### 第一步：中文翻译与条件

原题为中文。开放设计题，需要选择明确业务过程、粒度、维度与度量。

### 逐步解答

可选“内容互动”作为业务过程，FactInteraction 一行为一次用户对内容的互动事件。维度：Time、ActorUser、Content、InteractionType、Device/Location（可获得时）；度量 event_count=1、watch_seconds（仅观看事件可得）。作者可作为 User 的另一角色维。

时间 hour→day→month→year；内容 video→topic→category 仅在主题关系严格适用时才做层次。统计每月每类内容的观看时长、某地区转发数等。

点赞事件数、浏览次数、独立用户数不同：前两者可在对应粒度求和，独立用户跨日不能直接相加。推荐/流失预测需要从按时间窗口聚合的行为特征中学习，并以未来数据评价。

### English answer pattern

Choose an interaction-event grain and distinguish event counts from distinct-user measures.
