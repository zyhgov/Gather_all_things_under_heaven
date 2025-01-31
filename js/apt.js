// 示例数据数组
const items = [
    {
        name: "Longhorn",
        number: "APT-C-39",
        tag: "美洲地区",
        description: "Longhorn是一个来自美国，系属于CIA的高规格、高水平的APT组织，360高级威胁研究院内部编号为APT-C-39。对中国关键领域进行了长达十几年的网络渗透攻击。中国航空航天、科研机构、石油行业、大型互联网公司以及政府机构等多个单位均遭到不同程度的攻击。",
        image: "https://ts4.cn.mm.bing.net/th?id=OIP.3N2I6GI0Reye8U8DpQVP3wHaHa&w=298&h=298&c=10&rs=1&qlt=99&bgcl=fffffe&r=0&o=6&dpr=1.3&pid=23.1",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "海莲花",
        number: "APT-C-00",
        tag: "东南亚地区",
        description: "海莲花组织，又名OceanLotus，360高级威胁研究院内部编号为APT-C-00，由360首先发现并披露，是一个高度组织化的、专业化的境外国家级APT组织。该组织至少自2012年4月起便针对中国政府、科研院所、海事机构、海域建设、航运企业等相关重要领域展开了有组织、有计划、有针对性的长时间不间断的攻击。",
        image: "https://apt.360.net/picasso//t016347756edb53bdc3.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "摩诃草",
        number: "APT-C-09",
        tag: "印度洋地区",
        description: "摩诃草组织，又名HangOver、VICEROYTIGER、 The Dropping Elephant、Patchwork，360高级威胁研究院内部编号为APT-C-09，是一个疑似来自南亚地区的境外APT组织。摩诃草组织最早由Norman安全公司于2013年曝光，随后又有其他安全厂商持续追踪并披露该组织的最新活动，但该组织并未由于相关攻击行动曝光而停止对相关目标的攻击，相反从2015年开始更加活跃。摩诃草组织主要针对中国、巴基斯坦等亚洲地区国家进行网络间谍行动，其中以窃取敏感信息为主相关攻击活动最早可以追溯到2009年11月，至今还非常活跃。在针对中国地区的攻击中，主要针对政府机构、科研教育领域进行攻击，其中以科研教育领域为主。",
        image: "https://apt.360.net/picasso//t019825bb7b899a83de.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "黄金鼠",
        number: "APT-C-27",
        tag: "中东地区",
        description: "从2014年11月起至今，黄金鼠组织(APT-C-27)对叙利亚地区展开了有组织、有计划、有针对性的长时间不间断攻击。攻击平台从开始的Windows平台逐渐扩展至Android平台。360高级威胁研究院内部编号为APT-C-27，将APT-C-27组织命名为黄金鼠，主要是考虑了以下几方面的因素:一是该组织在攻击过程中使用了大量的资源，说明该攻击组织资源丰富而黄金鼠有长期在野外囤积粮食的习惯字面上也有丰富的含义;二、该攻击组织通常是间隔一段时间出来攻击一次，这跟鼠有相通的地方;三是黄金仓鼠是叙利亚地区一种比较有代表性的动物。",
        image: "https://apt.360.net/picasso//t0164c1ada83933eecd.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "Lazarus",
        number: "APT-C-26",
        tag: "朝鲜半岛",
        description: "Lazarus组织是疑似来自朝鲜的APT组织，360高级威胁研究院内部编号为APT-C-26，该组织长期对韩国、美国进行渗透攻击，此外还对全球的金融机构进行攻击，堪称全球金融机构的最大威胁。该组织最早的攻击活动可以追溯到2007年。据国外安全公司的调查显示，Lazarus组织与2014年索尼影业遭黑客攻击事件2016年孟加拉国银行数据泄露事件2017年美国国防承包商、美国能源部门及英国、韩国等比特币交易所被攻击等事件有关。而2017年席卷全球的最臭名昭著的安全事件“Wannacry”勒索病毒也被怀疑是该组织所为。",
        image: "https://apt.360.net/picasso//t01074d06eef20c3127.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "黄金雕",
        number: "APT-C-34",
        tag: "中亚地区",
        description: "黄金雕组织的活动主要影响中亚地区，大部分集中在哈萨克斯坦国境内，攻击目标涉及教育行业、政府机关人员、科研人员、媒体工作人员、部分商务工业、军方人员、宗教人员、政府异见人士和外交人员等。该组织使用社会工程学、物理接触、无线电监听等方式进行网络攻击，同时也采购了HackingTeam、NSO Group等网络军火商的武器，具备0day漏洞的高级入侵能力。360高级威胁研究院参照中亚地区擅长驯养猎鹰进行狩猎的习俗特性将该组织命名为黄金雕，内部编号为APT-C-34",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "盲眼鹰",
        number: "APT-C-36",
        tag: "美洲地区",
        description: "从2018年4月起至今，一个疑似来自南美洲的APT组织盲眼鹰（APT-C-36）针对哥伦比亚政府机构和大型公司（金融、石油、制造等行业）等重要领域展开了有组织、有计划、针对性的长期不间断攻击。其攻击平台主要为Windows，攻击目标锁定为哥伦比亚政企机构。由于该组织攻击的目标中有一个特色目标是哥伦比亚盲人研究所，而哥伦比亚在足球领域又被称为南美雄鹰，结合该组织的一些其它特点以及360高级威胁研究院对APT组织的命名规则，将该组织命名为盲眼鹰，内部编号为APT-C-36。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "毒针",
        number: "APT-C-31",
        tag: "东欧地区",
        description: "2018年11月25日，360高级威胁研究院在全球范围内第一时间发现了一起针对俄罗斯的APT攻击行动，攻击目标则指向俄罗斯总统办公室所属的医疗机构，此次攻击行动使用了Flash 0day漏洞CVE-2018-15982和Hacking Team的RCS后门程序，结合被攻击目标医疗机构的职能特色，360将此次APT攻击命名为“毒针”行动，内部编号为APT-C-31。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "ArmaRat",
        number: "APT-C-33",
        tag: "中东地区",
        description: "2016年7月，360发现一起针对伊朗Android手机用户长达两年之久的APT攻击活动。攻击者借助社交软件Telegram分享经过伪装的ArmaRat木马，入侵成功后攻击者可以完全控制用户手机，并对用户手机进行实时监控。由于该木马演变过程中C&C及代码结构均出现“arma”关键字，将该组织命名为“ArmaRat”，360高级威胁研究院内部编号为APT-C-33。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "军刀狮",
        number: "APT-C-38",
        tag: "中东地区",
        description: "军刀狮组织，360高级威胁研究院内部编号为APT-C-38，从2015年7月起至今，该组织在中东地区展开了有组织、有计划、针对性的不间断攻击，其攻击平台为Windows和Android。由于军刀狮组织的攻击目标有一个主要的特色目标是西亚中东某国的库尔德人，另Windows端RAT包含的PDB路径下出现多次的“Saber”，而亚洲狮为该中东国家的代表动物，结合该组织的一些其它特点以及360高级威胁研究院对APT组织的命名规则，将该组织命名为军刀狮（APT-C-38）。",
        image: "https://apt.360.net/picasso//t01dcaa6a9363129e84.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "拍拍熊",
        number: "APT-C-37",
        tag: "中东地区",
        description: "拍拍熊组织，360高级威胁研究院内部编号为APT-C-37，至少从2015年开始活跃，针对极端组织“伊斯兰国”展开了有组织、有计划、针对性的长期不间断攻击，其攻击平台为Windows和Android。由于拍拍熊组织的攻击目标针对的是某武装组织，支持双平台攻击，另史上曾经出现过唯一一种获有士兵证的中东某国特色动物，结合该组织的一些其它特点以及360对APT组织的命名规则，将该组织命名为拍拍熊。",
        image: "https://apt.360.net/picasso//t01ec49409b3c3f9d04.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "人面狮",
        number: "APT-C-15",
        tag: "中东地区",
        description: "人面狮行动是活跃在中东地区的网络间谍行动，360高级威胁研究院内部编号为APT-C-15，主要目标可能涉及到埃及和以色列等国家的不同组织，目的是窃取敏感数据信息。活跃时间主要集中在2014年6月到2015年11月期间，相关攻击活动最早可以追溯到2011年12月。主要利用社交网络进行水坑攻击。",
        image: "https://apt.360.net/picasso//t01a408e3cd93693ad9.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "美人鱼",
        number: "APT-C-07",
        tag: "中东地区",
        description: "美人鱼组织，360高级威胁研究院内部编号为APT-C-07，是一个来自于中东的境外APT组织，已持续活跃了多年。主要针对政府机构进行网络间谍行动，以窃取敏感信息为目的，已经证实有针对丹麦外交部的攻击。",
        image: "https://apt.360.net/picasso//t016c6e1ed5d301b04f.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },
    {
        name: "双尾蝎",
        number: "APT-C-23",
        tag: "中东地区",
        description: "双尾蝎组织，360高级威胁研究院内部编号为APT-C-23，是一个针对巴以地区的教育机构、军事机构等重要领域进行网络间谍行动，以窃取敏感信息为主的网络攻击组织。攻击平台主要包括Windows与Android。该组织的攻击行动最早可追溯到2016年，近年来该组织活动频繁不断被数个国内外安全团队持续追踪和披露。将APT-C-23组织命名为双尾蝎，主要是考虑了以下几方面的因素：一是该组织同时攻击了巴勒斯坦和以色列这两个存在一定敌对关系的国家，这种情况在以往并不多见；二是该组织同时在Windows和Android两种平台上发动攻击。虽然360高级威胁研究院以往截获的APT组织中也有一些进行多平台攻击的例子，如海莲花，但绝大多数APT组织攻击的重心仍然是Windows平台。而同时注重两种平台，并且在Android平台上攻击如此活跃的APT组织，在以往并不多见。第三个原因就是蝎子在巴以地区是一种比较有代表性的动物。",
        image: "https://apt.360.net/picasso//t01b481c127c05ec519.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },
    {
        name: "蓝宝菇",
        number: "APT-C-12",
        tag: "东亚地区",
        description: "蓝宝菇组织，360高级威胁研究院内部编号为APT-C-12，从2011年开始持续至今，对我国政府、军工、科研、金融等重点单位和部门进行了持续的网络间谍行动。该组织主要关注核工业和科研等相关信息。攻击目标主要集中在中国大陆境内。",
        image: "https://apt.360.net/picasso//t0139aaaccad0249cfd.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },
    {
        name: "毒云藤",
        number: "APT-C-01",
        tag: "东亚地区",
        description: "毒云藤组织，360高级威胁研究院内部编号为APT-C-01，是一个长期针对中国境内的APT组织，至少从2007年开始活跃。曾对中国国防、政府、科技、教育以及海事机构等重点单位和部门进行了超过10年的网络间谍活动，主要关注军工、中美关系、两岸关系和海洋相关领域，旨在窃取重大决策及敏感信息。APT-C-01由360高级威胁研究院首次披露，结合该组织关联地区常见的蔓藤植物，因此将其命名为“毒云藤”。",
        image: "https://apt.360.net/picasso//t019c58c349d986bebc.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },
    {
        name: "Darkhotel",
        number: "APT-C-06",
        tag: "朝鲜半岛",
        description: "Darkhotel组织，360高级威胁研究院内部编号为APT-C-06，该组织至少从2010年开始活跃，是一个长期针对企业高管、国防工业、电子工业等重要机构实施网络间谍攻击活动的APT组织。目标基本锁定在韩国、中国、俄罗斯和日本。卡巴斯基将该组织命名为Darkhotel（暗黑客栈），是因为他们的一次攻击行动被曝光，主要是利用酒店的无线网络有针对性的瞄准生产制造、国防、投资资本、私人股权投资、汽车等行业的精英管理者。",
        image: "https://apt.360.net/picasso//t018dc57e24a6c7c2d8.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },
    {
        name: "APT28",
        number: "APT-C-20",
        tag: "东欧地区",
        description: "APT28组织，又称Pawn Storm、Sofacy、Sednit、Fancy Bear和Strontium，360高级威胁研究院内部编号为APT-C-20。是一个具有军方情报机构背景的APT组织。该组织最早的攻击活动可以追溯到2004年至2007年之间。主要攻击目标为北美和欧洲的政府机构、外交机构、科研机构等。期间使用了大量0day漏洞，相关恶意代码除了针对Windows、Linux等PC操作系统，还会针对苹果IOS等移动设备操作系统。",
        image: "https://apt.360.net/picasso//t015bfff28e633ab3fe.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },
    {
        name: "沙虫",
        number: "APT-C-13",
        tag: "东欧地区",
        description: "沙虫组织，360高级威胁研究院内部编号为APT-C-13，是一个疑似来自俄罗斯的APT组织，至少从2009年开始活跃。主要目标领域有：政府、教育、能源机构和电信运营商。进一步主要针对欧美国家政府、北约，以及乌克兰政府展开间谍活动。该组织曾使用0day漏洞(CVE-2014-4114)针对乌克兰政府发起了一次钓鱼攻击。该组织还使用了BlackEnergy恶意软件。而且沙虫组织不仅仅只进行常规的网络间谍活动，还针对SCADA系统进行了攻击，研究者认为相关活动是为了之后的网络攻击进行侦查跟踪。",
        image: "https://apt.360.net/picasso//t01d9b9bad5be6d4d17.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },
    {
        name: "肚脑虫",
        number: "APT-C-35",
        tag: "印度洋地区",
        description: "肚脑虫组织，又名Donot，360高级威胁研究院内部编号为APT-C-35，至少从2016年4月开始活跃，是一个来自于南亚的境外APT组织，主要针对巴基斯坦及周边国家地区的政府机构进行网络间谍行动，以窃取敏感信息为主，攻击方式主要采用鱼叉钓鱼。该组织于2017年3月由360追日团队首次曝光，随后有数个国内外安全团队持续追踪并披露该组织的最新攻击行动。",
        image: "https://apt.360.net/picasso//t01dab8e9a098899f45.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },
    {
        name: "蔓灵花",
        number: "APT-C-08",
        tag: "印度洋地区",
        description: "蔓灵花组织，又名BITTER，360高级威胁研究院内部编号为APT-C-08。该组织长期针对中国、巴基斯坦等国家进行攻击，主要攻击政府、电力和军工行业相关单位，以窃取敏感信息为主，具有强烈的政治背景，是目前活跃的针对境内目标进行攻击的APT组织之一。该组织最早于2016被国外安全公司披露，并且命名为“BITTER”，同年360也跟进发布了分析报告，将该组织命名为“蔓灵花”。迄今为止有数个国内外安全团队持续追踪并披露该组织PC端的最新攻击活动。",
        image: "https://apt.360.net/picasso//t01e159f4689527de9e.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },
    {
        name: "索伦之眼",
        number: "APT-C-16",
        tag: "美洲地区",
        description: "索伦之眼组织，又名Project Sauron、Strider，360高级威胁研究院内部编号为APT-C-16。该组织主要针对中国、俄罗斯等多个国家进行网络间谍行动，其中以窃取敏感信息为主。相关攻击行动最早可以追溯到2010年，至今还非常活跃。该组织整个攻击过程中高度隐蔽，且针对性极强，对特定目标采用定制的恶意程序或通信设施，不会重复使用相关攻击资源。相关恶意代码复杂度可以与方程式（Equation）媲美，其综合能力不弱于震网（Stuxnet）、火焰（Flame）等APT组织。",
        image: "https://apt.360.net/picasso//t015ae9a11a6d9d6237.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },
    {
        name: "寄生虫",
        number: "APT-C-68",
        tag: "朝鲜半岛",
        description: "APT-C-68(寄生虫)组织是360高级威胁研究院在2023年最新捕获的活跃APT组织。现阶段寄生虫组织攻击活动主要影响我国国防军工、科研、教育等行业。其最早攻击活动可以追溯到2021年7月。寄生虫组织在2023年攻击十分活跃，监测到该组织集中利用某行业软件0day漏洞攻击了我国科研、国防军工相关单位。该组织在另一起针对我国某军工背景企业展开攻击中，利用chm文件作为诱饵文件进行恶意载荷投递，并通过某终端防护软件的漏洞来进一步部署恶意载荷。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },
    {
        name: "沙鹰",
        number: "APT-C-63",
        tag: "暂无",
        description: "沙鹰组织，360高级威胁研究院内部编号为APT-C-63，是360高级威胁研究院2022年捕获到的境外新组织，于2022年全球高级持续性威胁（APT）研究报告中首次披露。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },
    {
        name: "三色堇",
        number: "APT-C-62",
        tag: "东亚地区",
        description: "三色堇组织，360高级威胁研究院内部编号为APT-C-62，该组织主要针对我国生态环境领域相关重点单位发起攻击，主要通过钓鱼邮件投递恶意附件或者钓鱼链接。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },
    {
        name: "伪猎者",
        number: "APT-C-60",
        tag: "朝鲜半岛",
        description: "伪猎者组织，360高级威胁研究院内部编号为APT-C-60，从2018年发现以来攻击技战术相对稳定，攻击载荷变化不大。最早的活动可以追溯到2014年，攻击目标行业为贸易和政府。该组织针对我国的攻击活动最早可以追溯到2018年，攻击活动一直持续至今，攻击目标主要以教育科研和贸易相关单位为主。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "芜琼洞",
        number: "APT-C-59",
        tag: "朝鲜半岛",
        description: "2021年上半年，360高级威胁研究院发现了来自同一个新APT组织的多起攻击活动，根据该组织的攻击特征分析显示，其相关攻击行动未与目前已知APT组织关联，同时观察到该组织的两次攻击行动中都使用了0day漏洞攻击手段，所以将其背后的攻击者命名为芜琼洞，360高级威胁研究院内部编号为APT-C-59。该组织最早的攻击行动可以追溯到2020年8月，早期该组织就利用了部分浏览器的伪协议0day漏洞攻击我国相关单位，同时还攻击了越南地区的部分受害者。通过攻击数据综合分析，可以看到该组织的攻击目标地区是以东亚和东南亚为主，涉及政府、智库、媒体、医疗多个行业。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },
    {
        name: "Gorgon",
        number: "APT-C-58",
        tag: "印度洋地区",
        description: "Gorgon Group，360高级威胁研究院内部编号为APT-C-58，是一个疑似来自巴基斯坦的攻击组织，该组织进行了一系列犯罪和有针对性的攻击，包括针对英国、西班牙、俄罗斯和美国政府组织的攻击行动。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "沃尔宁",
        number: "APT-C-57",
        tag: "美洲地区",
        description: "APT-C-57(沃尔宁)组织是360高级威胁研究院在2023年最新捕获的活跃APT组织。是通过持续监测发现来源于北美方向的针对我国的最新攻击活动。该组织擅长利用重点目标专用应用软件进行复杂的供应链攻击。其攻击活动最早可追溯到2018年，2021年至2023年间持续活跃。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "UNC2452",
        number: "APT-C-54",
        tag: "东欧地区",
        description: "UNC2452组织，360高级威胁研究院内部编号为APT-C-54，于2020年12月针对SolarWinds发起供应链攻击，攻击目标有美国政府实体、科技公司、非政府组织和高等教育等。该组织使用了很高的战术和技术，资源充足，具有跨多个软件系统和平台的能力。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "APT35",
        number: "APT-C-51",
        tag: "中东地区",
        description: "APT35，又名Cutting Kitten、TG-2889，360高级威胁研究院内部编号为APT-C-51，至少从2012年开始活跃，是一个针对美国和沙特阿拉伯国防承包商、学术机构、能源公司进行攻击的网络间谍组织，该组织使用过位于伊朗的网络资产。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "OilRig",
        number: "APT-C-49",
        tag: "中东地区",
        description: "OilRig又名Twisted Kitten、Helix Kitten 、Cobalt Gypsy、APT34等，360高级威胁研究院内部编号为APT-C-49，该组织至少从2014年开始活跃，是一个疑似具有伊朗背景的APT组织。主要针对中东地区的政府、能源、化工等各行各业展开网络间谍行动，偶尔也会将目标对准中东以外的地区及国家。该组织使用鱼叉式网络钓鱼技术，同时结合社会工程学向目标发起攻击，攻击活动大多以侦察、窃取信息为目的，借此为伊朗谋取利益。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "幼象",
        number: "APT-C-45",
        tag: "印度洋地区",
        description: "BabyElephant组织，中文名为“幼象”，360高级威胁研究院内部编号为APT-C-45，是疑似具有印度背景的高级可持续威胁组织，于2020年1月首次披露。该组织的攻击活动最早可追溯到2017年7月，主要攻击巴基斯坦、孟加拉国、斯里兰卡和马尔代夫等南亚国家，攻击领域涉及政府、军事、国防、外交、核能、金融、教育、电信等多个部门及行业。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "APT29",
        number: "APT-C-25",
        tag: "东欧地区",
        description: "APT29组织，360高级威胁研究院内部编号为APT-C-25，是一个有充足资源、高度专一的网络间谍组织，幕后支持者疑似是俄罗斯政府，至少从2008年开始收集情报以支持外交和安全政策决策。该组织主要针对西方政府和组织，其次是亚洲、非洲和中东政府，以及俄罗斯的反政府组织。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "潜行者",
        number: "APT-C-30",
        tag: "东南亚地区",
        description: "潜行者组织，360高级威胁研究院内部编号为APT-C-30，是一个针对东亚和东南亚进行攻击活动的APT组织，2015年4月我们首次发现该组织针对我国重点目标进行攻击，相关攻击活动最早可追溯到2008年至今仍持续活跃，期间发起十余起攻击行动。其中主要针对政府、外交、通信等重要关基行业单位。另外该组织也针对其他东南亚国家政府、国防等机构发起针对性攻击，但我国是重灾区。相关攻击意图主要是进行敏感数据信息的网络间谍攻击活动。针对我国相关重点目标的攻击已经持续了15年左右，其攻击手法新颖、复杂，先后运用了NSA武器库、杀毒软件漏洞等先进攻击技术和大量对抗技术防止安全人员分析，攻击行动隐蔽低调，攻击周期长，是一只攻击能力出众的APT组织。",
        image: "https://apt.360.net/picasso//t01b8eeda53043d154a.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "响尾蛇",
        number: "APT-C-24",
        tag: "印度洋地区",
        description: "响尾蛇组织，又名Rattlesnake，360高级威胁研究院内部编号为APT-C-24，是疑似具有印度背景的APT组织。该组织通常以巴基斯坦、中国、尼泊尔等南亚及周边地区的国家为目标，主要攻击该国家/地区的政府、军事、外交等领域，最常见的感染媒介之一就是使用带有漏洞的恶意文档。2020年初，该组织还使用与COVID-19相关的诱饵文件对孟加拉国、中国和巴基斯坦发起了网络攻击，通过近年来对该组织的追踪发现，Sidewinder越来越倾向于利用诸如COVID-19之类的趋势话题或各种政治问题作为一种社会工程技术来攻击其目标。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "ScarCruft",
        number: "APT-C-28",
        tag: "朝鲜半岛",
        description: "ScarCruft组织，又名APT37、Reaper、Group123，360高级威胁研究院内部编号为APT-C-28，是一个活跃于朝鲜半岛的APT组织，其主要针对周边国家地区的政府机构进行网络攻击活动，以窃取敏感信息为主。该组织的攻击活动最早可追溯到2014年，近年来活动频繁，不断被数个国内外安全团队持续追踪和披露。",
        image: "https://apt.360.net/picasso//t01c02ccb7440ff40d2.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "Turla",
        number: "APT-C-29",
        tag: "东欧地区",
        description: "Turla组织，又名Waterbug、Venomous Bear、Group 88等，360高级威胁研究院内部编号为APT-C-29，是具有俄罗斯背景的APT组织，至少从1996年开始活跃，2015年以后攻击活动更加频繁。Turla组织的攻击目标遍及全球多个国家，攻击对象涉及政府、外交、军事、教育、研究和医疗等多个领域，因开展水坑攻击和鱼叉式网络钓鱼攻击以及利用定制化的恶意软件而闻名。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "Carbanak",
        number: "APT-C-11",
        tag: "东欧地区",
        description: "Carbanak攻击组织，是一个跨国攻击团伙。2013年起，该攻击团伙总计向全球约30个国家和地区的100家银行、电子支付系统和其他金融机构发动了攻击，目前相关攻击活动还很活跃。在《2015年中国高级持续性威胁(APT)研究报告》中，360高级威胁研究院提到了Carbanak，并为其分配了内部编号APT-C-11。通过研究分析该组织相关攻击手法和意图，将该组织视为针对金融行业的犯罪型APT组织。",
        image: "https://apt.360.net/picasso//t014494b5053516911c.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "飞鲨",
        number: "APT-C-17",
        tag: "印度洋地区",
        description: "飞鲨组织，360高级威胁研究院内部编号为APT-C-17，是360高级威胁研究院发现的一起APT攻击，并将此次攻击行动命名为“飞鲨”行动。相关攻击行动最早可以追溯到2013年1月，并持续活跃到2014年3月，主要针对中国航空航天领域，目的是窃取目标用户敏感数据信息。",
        image: "https://apt.360.net/picasso//t01d5c68dc947476ef1.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "方程式",
        number: "APT-C-40",
        tag: "美洲地区",
        description: "方程式是史上最强APT组织，360高级威胁研究院内部编号为APT-C-40，该团伙已活跃近20年，并且在攻击复杂性和攻击技巧方面超越了历史上所有的网络攻击组织，并被认为是著名的震网（Stuxnet）和火焰（Flame）病毒幕后的操纵者。",
        image: "https://apt.360.net/picasso//t0127a9729013152fb4.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "透明部落",
        number: "APT-C-56",
        tag: "印度洋地区",
        description: "透明部落组织，又名Operation_C-Major、APT36、Mythic Leopard等，360高级威胁研究院内部编号为APT-C-56，于2013年被首次发现，是一个具有南亚背景的APT组织，长期针对周边国家和地区（特别是印度）的政治、军事进行定向攻击，并开发有自己的专属木马CrimsonRAT，还曾被发现广泛传播USB蠕虫。其一直针对印度的政府、公共部门、各行各业包括但不限于医疗、电力、金融、制造业等保持高强度的信息窃取活动。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "腾云蛇",
        number: "APT-C-61",
        tag: "印度洋地区",
        description: "腾云蛇组织，360高级威胁研究院内部编号为APT-C-61，最早活动可追溯到2020年1月，至今还很活跃。主要攻击目标为巴基斯坦、孟加拉国等国家的国家机构、军工、科研、国防等重要领域，攻击时通过鱼叉邮件配合社会工程学手段进行渗透，向目标设备传播恶意程序，暗中控制目标设备，持续窃取设备上的敏感文件。因其使用的C2、载荷下发、窃取的数据存储等均依赖于云服务，且使用的木马为python语言编写，所以将其命名为腾云蛇。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "Kimsuki",
        number: "APT-C-55",
        tag: "朝鲜半岛",
        description: "Kimsuki组织，又名Mystery Baby、Baby Coin、Smoke Screen、Black Banshe等，360高级威胁研究院内部编号为APT-C-55，是疑似具有东亚国家背景的APT组织。最早由国外安全厂商Kaspersky在2013年披露，该组织长期针对韩国政府、国防军工、新闻机构、教育学术等目标发起攻击，擅长以社会热点事件作为诱饵，通过鱼叉式网络钓鱼和社会工程学技巧向受害者投递诱饵文档，获取受害者信任后窃取用户信息。该组织拥有功能完善的恶意代码武器库，与APT组织Konni存在基础设施重叠等关联性。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "Luhansk",
        number: "APT-C-46",
        tag: "东欧地区",
        description: "Luhansk组织，360高级威胁研究院内部编号为APT-C-46。2019年初，国外安全厂商披露了一起疑似卢甘斯克背景的APT组织针对乌克兰政府的定向攻击活动，根据相关报告分析该组织的攻击活动至少可以追溯到2014年，曾大量通过网络钓鱼、水坑攻击等方式针对乌克兰政府机构进行攻击，在其过去的攻击活动中曾使用过开源Quasar RAT和VERMIN等恶意软件，主要目的是获取目标的音频和视频，窃取密码，获取机密文件等等。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "旺刺",
        number: "APT-C-47",
        tag: "朝鲜半岛",
        description: "360安全大脑检测到多起ClickOnce恶意程序的攻击活动，通过360高级威胁研究院的深入研判分析，发现这是一起来自半岛地区未被披露APT组织的攻击行动，攻击目标涉及与半岛地区有关联的实体机构和个人，根据360安全大脑的数据分析显示，该组织的攻击活动最早可以追溯到2018年。目前还没有任何安全厂商公开披露该组织的攻击活动，也没有安全厂商公开披露利用该技术的真实APT攻击事件。由于此次攻击活动属于360全球首次捕获披露，根据该组织擅长攻击技术的谐音，将其命名为“旺刺”组织，并为其分配了新编号APT-C-47。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "Domestic Kitten",
        number: "APT-C-50",
        tag: "中东地区",
        description: "Domestic Kitten组织，360高级威胁研究院内部编号为APT-C-50。最早由国外安全厂商披露，自2016年以来一直在进行广泛而有针对性的攻击，攻击目标包括中东某国内部持不同政见者和反对派力量，以及ISIS的拥护者和主要定居在中东某国西部的库尔德少数民族。所有攻击目标都是中东某国公民。伊斯兰革命卫队（IRGC）、情报部、内政部等中东某国政府机构可能为该组织提供支持。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "飞刃",
        number: "APT-C-32",
        tag: "中东地区",
        description: "SandCat组织，又名飞刃，360高级威胁研究院内部编号为APT-C-32，于2018年首次发现，该组织一直在使用FinFisher/ FinSpy间谍软件和CHAINSHOT攻击框架，并有使用0 Day漏洞的能力，曾经使用过CVE-2018-8589和CVE-2018-8611。主要攻击中东、非洲和东欧等地区的目标。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "CNC",
        number: "APT-C-48",
        tag: "印度洋地区",
        description: "CNC组织于2019年被发现，因为样本的pdb路径中有cnc_client字符，所以命名为CNC组织，360高级威胁研究院内部编号为APT-C-48。该组织定向攻击我国教育、航天、军工和医疗等行业，窃取情报。在攻击过程中会尝试使用Nday漏洞，并且有能够开发GO语言木马的开发人员。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "蓝色魔眼",
        number: "APT-C-41",
        tag: "中东地区",
        description: "蓝色魔眼，又名Promethium、StrongPity，该APT组织最早的攻击活动可以追溯到2012年。主要针对意大利、土耳其、比利时、叙利亚、欧洲等地区和国家进行攻击活动。360安全大脑监测到该组织在2020年1月首次针对中国进行了攻击活动，并捕获到了该组织最新V4版本的攻击组件。经过360高级威胁研究院的深入分析研判，此次攻击的针对性极强，是该组织罕见地针对我国相关重要机构发起的首起定向攻击行动。由于是首次捕获和披露该组织对我国的攻击，360高级威胁研究院为其分配了新的编号APT-C-41，并根据该组织活跃地区的文化特色将其命名为“蓝色魔眼”。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "Machete",
        number: "APT-C-43",
        tag: "美洲地区",
        description: "El Machete组织，360高级威胁研究院内部编号为APT-C-43，最早的攻击行动可以追溯到2014年，攻击目标主要集中于拉丁美洲国家，重点针对军事、政府等敏感行业进行攻击以窃取机密信息。360分析团队发现了一款Python语言编写的新型后门病毒Pyark，通过对该后门的深入挖掘和溯源分析，发现了一系列从2019年起便一直活跃的高级威胁行动，攻击者通过入侵委内瑞拉的多处军事机构，部署后门病毒，不间断的监控和窃取最新的军事机密。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "Gamaredon",
        number: "APT-C-53",
        tag: "东欧地区",
        description: "Gamaredon组织，又名Primitive Bear、Winterflounder、BlueAlpha，360高级威胁研究院内部编号为APT-C-53，该组织至少从2013年开始活跃，疑似是由俄罗斯政府赞助的APT组织，主要针对乌克兰的政府、国防、外交、新闻媒体等发起网络间谍行动。在Gamaredon组织被披露后，360高级威胁研究院对该组织进行了长期的追踪分析。近年来，该组织不断升级其技战术，开发定制化的恶意软件，加大了安全人员对其进行捕获与追踪的难度。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "北非狐",
        number: "APT-C-44",
        tag: "北非地区",
        description: "北非狐组织，360高级威胁研究院内部编号为APT-C-44，是一个来自阿尔及利亚的境外APT组织，至少从2017年10月开始活跃，攻击平台主要为Windows和Android。主要利用钓鱼网站和第三方文件托管网站进行载荷投递，并且使用社交媒体进行传播，受害者主要分布在阿拉伯语地区，其中包含疑似具有军事背景的相关人员。根据此次攻击活动的伪装对象和攻击目标，360高级威胁研究院认为该组织的目的是获取情报先机。根据该组织所属国家的地理位置以及其他特点，将其命名为北非狐。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },{
        name: "WellMess",
        number: "APT-C-42",
        tag: "东欧地区",
        description: "WELLMESS组织，360高级威胁研究院内部编号为APT-C-42，是一个较新的俄语系境外APT组织，最早发现于2017年。该组织主要针对亚洲地区进行间谍攻击，并且曾进行过超两年的供应链攻击，同时拥有漏洞利用能力。该组织的目标主要是政府、IT、科研等单位，以窃取文件为主。",
        image: "https://apt.360.net/picasso//t01d3441ccfe5d365e7.png",
        source: {
            url: "https://apt.360.net/aptlist",
            text: "https://apt.360.net/aptlist"
        }
    },
    // 添加更多项...
];

// 函数用于创建单个卡片的HTML元素
function createCard(item) {
    const card = document.createElement('div');
    card.className = 'container';
    card.dataset.number = item.number;
    card.dataset.tag = item.tag;
    
    const leftSide = document.createElement('div');
    leftSide.className = 'left-side';
    
    const profileImage = document.createElement('div');
    profileImage.className = 'profile-image';
    
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = 'Profile Image';
    
    profileImage.appendChild(img);
    leftSide.appendChild(profileImage);
    
    const rightSide = document.createElement('div');
    rightSide.className = 'right-side';
    
    // 添加右侧内容
    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = item.name;
    
    const number = document.createElement('div');
    number.className = 'number';
    number.textContent = item.number;
    
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.textContent = item.tag;
    
    const description = document.createElement('div');
    description.className = 'description';
    description.textContent = item.description;
    
    const source = document.createElement('div');
    source.className = 'source';
    
    const icon = document.createElement('i');
    icon.className = 'fas fa-globe website-icon';
    
    const sourceLink = document.createElement('a');
    sourceLink.href = item.source.url;
    sourceLink.textContent = item.source.text;
    
    source.appendChild(icon);
    source.appendChild(sourceLink);
    
    rightSide.appendChild(name);
    rightSide.appendChild(number);
    rightSide.appendChild(tag);
    rightSide.appendChild(description);
    rightSide.appendChild(source);
    
    card.appendChild(leftSide);
    card.appendChild(rightSide);
    
    return card;
}

// 动态加载内容到页面
const contentContainer = document.getElementById('content');
const cards = []; // 用于存储所有卡片

// 生成并存储所有卡片
items.forEach(item => {
    const card = createCard(item);
    contentContainer.appendChild(card);
    cards.push(card);
});

// 获取搜索输入框
const searchInput = document.getElementById('searchInput');

// 搜索函数
function searchCards(query) {
const lowerQuery = query.toLowerCase();
let hasResults = false;

cards.forEach(card => {
// 获取卡片中的各个部分
const nameElement = card.querySelector('.name');
const numberElement = card.querySelector('.number');
const tagElement = card.querySelector('.tag');
const descriptionElement = card.querySelector('.description');

// 高亮匹配项
function highlightElement(element, text) {
    if (!text) return;
    // 使用正则表达式进行匹配并替换
    const regex = new RegExp(lowerQuery, 'gi');
    const newContent = text.replace(regex, match => 
        `<span class="highlight">${match}</span>`
    );
    element.innerHTML = newContent;
}

// 获取卡片内容
const name = nameElement.textContent.toLowerCase();
const number = card.dataset.number.toLowerCase();
const tag = card.dataset.tag.toLowerCase();
const description = descriptionElement.textContent.toLowerCase();

// 检查是否有任何部分匹配
const matches = name.includes(lowerQuery) ||
               number.includes(lowerQuery) ||
               tag.includes(lowerQuery) ||
               description.includes(lowerQuery);

if (matches) {
    card.style.display = 'block';
    hasResults = true;

    // 添加高亮
    highlightElement(nameElement, nameElement.textContent);
    highlightElement(numberElement, numberElement.textContent);
    highlightElement(tagElement, tagElement.textContent);
    highlightElement(descriptionElement, descriptionElement.textContent);
} else {
    card.style.display = 'none';
}
});

// 如果没有结果则显示提示
const noResultsElement = document.getElementById('noResults');
noResultsElement.style.display = hasResults ? 'none' : 'block';
}


// 监听搜索输入
searchInput.addEventListener('input', function(e) {
const query = e.target.value.trim();
searchCards(query);
});