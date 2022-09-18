# PriceWidgets

## 简介
一个 [JSBox](https://github.com/cyanzhong/xTeko) 小组件。iOS桌面小组件，展示关注的虚拟货币价格等信息。

已在 [Erots](https://github.com/LiuGuoGY/JSBox-addins) 商店上架。

## Update
2022.09.18 - 支持iOS16锁屏小组件，一共四种样式，具体见下方 Screenshots。方形组件，输入参数仅为一个币种时，会展示独立的样式，超过一个则为列表形式。

## Usage

！！！ 请首先在主应用内运行一次，用以更新货币的基本数据。！！！

后期如果想关注的某个货币没有价格数据，也可以在主应用内运行一次，也许就有了呢～


「输入参数」为关注的token符号列表，以半角逗号「,」分隔，不区分大小写。例如：
```
BTC,Eth,bnb
```
2x2尺寸的小组件仅支持单个token，4x2尺寸最多展示3个，4x4尺寸最多展示6个。如果想关注更多，就用智能堆叠功能呗。

## Screenshots
![screenshot1](./assets/lockscreen1.jpg)

![screenshot1](./assets/lockscreen2.jpg)

![screenshot1](./assets/screenshot1.jpg)

![screenshot2](./assets/screenshot2.jpg)