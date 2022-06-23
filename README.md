# mp-svg-icon

微信小程序本地svg图标方案

## 使用

首先将svg图标放在static目录的img文件夹下

- unapp的static在src下
- 原生小程序的static在项目根目录下

下载好组件源码后，uniapp一定要放在`src/wxcomponents`里，原生无所谓。

想全局使用原生组件的话需要在page.json里注册组件
uniapp在`globalStyle`的`usingComponents`注册

```javascript
{
  "globalStyle": {
    "usingComponents": {
      "iconfont": "/wxcomponents/iconfont/iconfont",
    }
  },
}
```

原生小程序直接在`usingComponents`注册

```javascript
{
  "usingComponents": {
    "iconfont": "components/iconfont/iconfont"
  },
}

```

最后在页面中使用就行

```html
<view>
  <iconfont
     name="phone"
     size="21"
     color="#000000"
     class="my-icon"
  ></iconfont>
</view>
```

需要注意的是size为px单位，如果是蓝湖750的设计稿需要除以2。

## 属性

|  属性   |  类型  | 默认  | 说明  |
|  ----  | ---- | ---- | ---- |
| name  | String | 无 | svg图标名  |
| size  | String\|Number |18| 图标高度，单位为px  |
|color|String|无|图标颜色，不传的话不会修改颜色|
