# Argon2, Memory-Hard Hash Function

> 文章主要基于 Argon2 的论文和其他一些资料，很可能有理解和表达错误的地方需要指正

## Password

Password 是 Web 服务主要的认证方式之一

Password 一般以 Hash 后的形式存储在数据库中。这些数据库如果被拖库，使用 Dictionary Attack 可以轻松破解，因为他们的墒很低。相同的密码会被不同的用户使用或同一个用户在不同系统中使用

为了解决这个问题，设计者在密码 Hash 的过程里加入了 *salt*

> **Dictionary Attack**
一个字典文件，储存了单词、短语、常用密码和他们 hash 后结果。将密码与 hash 结果对比，就能破解

> **Brute Force Attack**
尝试每一个给顶长度下的字符组合，效率很低

加盐已经可以解决大部分问题，但无法阻止 Brute Force Attack，借助 GPU、FPGA、ASIC 等定制硬件可以非常低成本的进行 Hash 计算。此外，如果 salt 和 password 被一起被拖库（甚至代码），会使得破解成本更加低。

这里核心的问题是，Hash 方法使用的是无内存计算的，而 GPU、ASIC 等硬件可以让无内存计算变得非常高效。但是，当一个 Hash 方法需要用到一大块内存去计算的时候，这些硬件就会束手无策。所以 memory-hard hash function 开始被设计和使用。

memory-hard hash function 也可以被用在加密货币的工作量证明中，用来压制 GPU 和 ASIC 在加密货币中的滥用。例如 scrypt 被用作莱特币的工作量证明算法。

## 现有的算法的问题

要解决密码安全性的问题，一个简单的方法是使用密钥 Hash，例如 HMAC。但是如果设计者更喜欢不是用密钥以防止密钥生成、存储、更新带来的额外问题，那他可以使用 PBKDF2、bcrypt 和 scrpyt。

这几个算法里只有 scrypt 是以高内存为目标的。但是可以通过 time-space tradeoff 将内存消耗转迁到计算资源消耗上。（scrypt 起初的设计是为了节省 CPU 计算资源，用内存换了计算时间。不是专门为了密码学设计的）

设计一个 memory-hard hash function是很难的问题。早在 80 年代初期就已经出现这类算法，但实际上都可以被 time-space tradeoff 绕过。攻击者可以将 memory 消耗转换为 time 消耗，然后在高速硬件上使用低内存进行破解。这意味着，攻击者仍然可以实现特制的硬件来破解，即使付出一些额外的代价。

## Argon2

Argon2 是 PHC（Password Hashing Competition）的冠军，利用大量内存和大量计算资源进行 Hash 计算。提供三个版本：

- Argon2d：更快，使用 data-dependent 的内存访问方式，data 是需要 Hash 的 password 和 salt。适合加密货币和不会收到 side-channel timing 攻击的应用
- Argon2i：使用 data-independent 的内存访问方式，更适合密码哈希等。他比 Argon2d 慢，因为它需要更多次内存计算（passes）来保护免受 tradeoff 的攻击
- Argon2id：是 Argon2i 和 Argon2d 的混合版本，第一次计算用 Argon2i，后续的计算用 Argon2d。如果没有特定的理由，推荐使用 Argon2id。

## memory-hard hash function 的定义

使用 time-area 复杂度衡量，面积指的是电路板上的远件个数，增加元件个数可以减少运算的时间，所以可以使用面积乘以时间作为复合评价尺度。

我们将攻击者使用的 ASIC 上内存大小对应为面积 A，运行时长为 T。

Hash 算法（H）的目标是令 A*T 最大化

假设攻击者想降低内存的使用，只使用 αM 的内存来计算 H（α < 1）

对 H 使用 time-space tradeoff 的方法，它需要多花  C(α) 倍计算成本，而它的计算时间至少增加了 D(α) 倍。因此，在 time-area 乘积里，可能的最大增益 ε 为

$$ε_{max}=\max_α{\frac 1{αD(α)}}$$

拿前后两个 AT 乘积相比，定义为增益。攻击者的目的是要让分母尽可能的小，也就是 ε 尽可能的大。因此，最大收益就是上面列出的公式

一个算法被称为 memory-hard hash function 需要满足

D(α) > 1/α，α 趋近于 0

只有这样，在攻击者减少内存的时候，最大收益 ε < 1，也就是说减少内存时的 AT 复杂度不会降低。

除此之外，AT 值还会受到以下几个因素影响：

- 计算资源因为内存减少而产生的惩罚 C(α) 可能会显著增加面积 A
- 如果 tradeoff 需要显著依赖计算资源之间的通信，那内存带宽的限制会对运行时间增加额外的限制

## Argon2 的实现

### 输入

**Primary inputs** 是 message P 和 nonce S，代表密码和盐

**Secondary inputs** 有

- 并行程度 p
- Tag length τ
- 内存大小 m kilobytes
- 迭代次数 t，用于调节运行时间，与内存大小独立
- version number v
- secret value K，默认没有 key
- associated data X
- Type y of Argon2, 0 for Argon2d, 1 for Argon2i, 2 for Argon2id

### 运算

首先，给 P 和 S 做哈希，所有其他参数也被加入，变量 P、S、K、X 的长度被放置在他们前面。

H 是 Blake2b

$$H_0=H(p,τ,m,t,v,y,\langle P \rangle,P,\langle S \rangle,S,\langle K \rangle,K,\langle X \rangle,X)$$

然后 Argon2 用 m' 个block 填满内存

m' = m/4p 向下取整后 * 4p

为了方便调整并行线程数 p，内存组织以 B[i][j] 形式的 matrix 存储。有 p 行，q = m'/p 列。我们用以下形式，表示第 t 个 pass 里的 block

$$B^t[i][j],t>0$$

Block 的计算规则：

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/957c983c-74e8-4a18-8b08-7f41b2856e55/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/957c983c-74e8-4a18-8b08-7f41b2856e55/Untitled.png)

其中，

- block index [i'][j'] 根据使用的 Argon2d 或 Argon2i 而不同，结果可能是除了当前 slice 里的其他所有 block（下面图上跨 lane 的那几个虚线）
- G 是排列组合函数，基于 Blake2b 的 round function 改进而来
- H' 是长度可变的、在 H 的基础上实现的哈希函数

如果 t>1, 我们需要重复处理过程，我们用新的 block XOR 老的 block 得出

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e425bb22-5ab5-41bb-8260-085b2d771bb8/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e425bb22-5ab5-41bb-8260-085b2d771bb8/Untitled.png)

当我们完成 t 次迭代后，我们计算最终的 block B_final，为最后一列所有值的异或

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a6e327b6-1b01-47f9-97bb-772c69737134/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a6e327b6-1b01-47f9-97bb-772c69737134/Untitled.png)

最后，对 B_final 运算 H‘ 函数，完成最终的输出 Tag

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e6501409-72ff-495e-b9ee-da18d0c8e9d8/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e6501409-72ff-495e-b9ee-da18d0c8e9d8/Untitled.png)

## Features

- 性能。Argon2 填充内存的速度非常快，从而增加了 AT 里的 A。Argon2i 对每个 byte 稳定占用 2 个 CPU cycles，Argon2d 就快 3 倍。
- Tradeoff 抵御能力。默认 passes 配置下（Argon2d 为 1，Argon2i 为 3），ASIC 设备在减少至 α =1/4 或更少内存的时候，无法减少 time-area 复杂度。如果把 pass 数量提高，时间惩罚会更高。
- 可扩展性。Argon2 可以同时在时间和内存两个维度扩展，两者互相独立，保证始终能在一定数量的时间内填满一定数量的内存。
- 并行。Argon2 最多可以使用 2^24 个并发线程。在实验中，8 个线程就已经消耗完了所有的计算资源和带宽。
- GPU/FPGA/ASIC-unfriendly。Argon2 对 x86 做了高度优化，所以在定制硬件下运行既不会更快也不会更便宜。
- 支持额外的输入。除了 message 和 nonce，类似 secret key，环境变量，用户数据等内容也可以被输入作为参数

## 安全性分析

### Tradeoff attack

结论是，data-dependent one-pass 的情况得下，攻击者可以在降低内存 3 倍的情况下，保持 time-area 复杂度不变。具体的表

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/328b20be-664f-49f6-84b0-e0aae3485a3b/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/328b20be-664f-49f6-84b0-e0aae3485a3b/Untitled.png)

上面已经说过，D(α) > 1/α，α 趋近于 0

在论文发布后，有两次公开的对 Argon2i 的破解。作者发布了更新版本，并做了 summary

- 针对 1- 和 2-pass Argon2i(v1.3) 可以减少 time-area 复杂度至 α = 1/5
- 针对 t-pass(t>2) 的 Argon2i，time-area 复杂度可以减少至 α = 1/3
- 针对 t-pass Argon2d，time-area 复杂度可以减少至 α = 1/1.33

论文里还有更多针对内存优化攻击、迭代次数压缩攻击和通用攻击的具体分析，这里不展开了

更多的细节和内容去读代码和论文吧

### References

- [https://github.com/P-H-C/phc-winner-argon2/blob/master/argon2-specs.pdf](https://github.com/P-H-C/phc-winner-argon2/blob/master/argon2-specs.pdf)
- [https://github.com/P-H-C/phc-winner-argon2](https://github.com/P-H-C/phc-winner-argon2)
- [https://crackstation.net/hashing-security.htm](https://crackstation.net/hashing-security.htm)
- [https://honest.engineering/posts/hash-functions-survival-guide](https://honest.engineering/posts/hash-functions-survival-guide?utm_source=ponyfoo+weekly&utm_medium=email&utm_campaign=138)
- [https://en.wikipedia.org/wiki/Argon2](https://en.wikipedia.org/wiki/Argon2)
- [https://en.wikipedia.org/wiki/Scrypt](https://en.wikipedia.org/wiki/Scrypt)
