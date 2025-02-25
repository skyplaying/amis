---
title: NestedSelect 级联选择器
description:
type: 0
group: null
menuName: NestedSelect 级联选择器
icon:
order: 31
---

## 基本用法

```schema: scope="body"
{
  "type": "form",
  "api": "/api/mock2/form/saveForm",
  "body": [
    {
      "type": "nested-select",
      "name": "nestedSelect",
      "label": "级联选择器",
      "options": [
        {
          "label": "A",
          "value": "a"
        },
        {
          "label": "B",
          "value": "b",
          "children": [
            {
              "label": "B-1",
              "value": "b-1"
            },
            {
              "label": "B-2",
              "value": "b-2"
            },
            {
              "label": "B-3",
              "value": "b-3"
            }
          ]
        },
        {
          "label": "C",
          "value": "c"
        }
      ]
    }
  ]
}
```

## 动态选项

通过 source 可以从上下文或 api 中获取选项信息，比如

```schema: scope="body"
{
  "type": "page",
  "data": {
    "options": [
        {
          "label": "A",
          "value": "a"
        },
        {
          "label": "B",
          "value": "b",
          "children": [
            {
              "label": "B-1",
              "value": "b-1"
            },
            {
              "label": "B-2",
              "value": "b-2"
            },
            {
              "label": "B-3",
              "value": "b-3"
            }
          ]
        },
        {
          "label": "C",
          "value": "c"
        }
      ]
  },
  "body": {
    "type": "form",
    "api": "/api/mock2/form/saveForm",
    "body": [
      {
        "type": "nested-select",
        "name": "nestedSelect",
        "label": "级联选择器",
        "source": "${options}"
      }
    ]
  }
}
```

也可以是 api 地址

```schema: scope="body"
{
  "type": "page",
  "body": {
    "type": "form",
    "api": "/api/mock2/form/saveForm",
    "body": [
      {
        "type": "nested-select",
        "name": "nestedSelect",
        "label": "级联选择器",
        "source": "/api/mock2/form/getTreeOptions"
      }
    ]
  }
}
```

## 选中父节点是否自动选中子节点

默认选中父节点会自动选中子节点，可以设置`"cascade": true`，不自动选中子节点

```schema: scope="body"
{
  "type": "form",
  "debug": true,
  "api": "/api/mock2/form/saveForm",
  "body": [
    {
      "type": "nested-select",
      "name": "nestedSelect1",
      "label": "默认自动选中子节点",
      "multiple": true,
      "options": [
        {
          "label": "A",
          "value": "a"
        },
        {
          "label": "B",
          "value": "b",
          "children": [
            {
              "label": "B-1",
              "value": "b-1"
            },
            {
              "label": "B-2",
              "value": "b-2"
            },
            {
              "label": "B-3",
              "value": "b-3"
            }
          ]
        },
        {
          "label": "C",
          "value": "c"
        }
      ]
    },
    {
        "type": "divider"
    },
    {
      "type": "nested-select",
      "name": "nestedSelect2",
      "label": "不自动选中子节点",
      "multiple": true,
      "cascade": true,
      "options": [
        {
          "label": "A",
          "value": "a"
        },
        {
          "label": "B",
          "value": "b",
          "children": [
            {
              "label": "B-1",
              "value": "b-1"
            },
            {
              "label": "B-2",
              "value": "b-2"
            },
            {
              "label": "B-3",
              "value": "b-3"
            }
          ]
        },
        {
          "label": "C",
          "value": "c"
        }
      ]
    }
  ]
}
```

## 选中父节点，值是否包含子节点

默认选中父节点，是不会带上子节点的值，想要自动带上子节点的值，那么配置`"withChildren": true`

```schema: scope="body"
{
  "type": "form",
  "debug": true,
  "api": "/api/mock2/form/saveForm",
  "body": [
    {
      "type": "nested-select",
      "name": "nestedSelect1",
      "label": "默认不自动带上子节点的值",
      "multiple": true,
      "options": [
        {
          "label": "A",
          "value": "a"
        },
        {
          "label": "B",
          "value": "b",
          "children": [
            {
              "label": "B-1",
              "value": "b-1"
            },
            {
              "label": "B-2",
              "value": "b-2"
            },
            {
              "label": "B-3",
              "value": "b-3"
            }
          ]
        },
        {
          "label": "C",
          "value": "c"
        }
      ]
    },
    {
        "type": "divider"
    },
     {
      "type": "nested-select",
      "name": "nestedSelect2",
      "label": "自动带上子节点的值",
      "multiple": true,
      "withChildren": true,
      "options": [
        {
          "label": "A",
          "value": "a"
        },
        {
          "label": "B",
          "value": "b",
          "children": [
            {
              "label": "B-1",
              "value": "b-1"
            },
            {
              "label": "B-2",
              "value": "b-2"
            },
            {
              "label": "B-3",
              "value": "b-3"
            }
          ]
        },
        {
          "label": "C",
          "value": "c"
        }
      ]
    }
  ]
}
```

也可以设置`onlyChildren`，实现只包含子节点的值

```schema: scope="body"
{
  "type": "form",
  "debug": true,
  "api": "/api/mock2/form/saveForm",
  "body": [
    {
      "type": "nested-select",
      "name": "nestedSelect1",
      "label": "默认不自动带上子节点的值",
      "multiple": true,
      "options": [
        {
          "label": "A",
          "value": "a"
        },
        {
          "label": "B",
          "value": "b",
          "children": [
            {
              "label": "B-1",
              "value": "b-1",
              "children": [
                {
                  "label": "D-1",
                  "value": "d-1"
                },
                {
                  "label": "D-2",
                  "value": "d-2"
                },
                {
                  "label": "D-3",
                  "value": "d-3"
                }
              ]
            },
            {
              "label": "B-2",
              "value": "b-2"
            },
            {
              "label": "B-3",
              "value": "b-3"
            }
          ]
        },
        {
          "label": "C",
          "value": "c"
        }
      ]
    },
    {
        "type": "divider"
    },
     {
      "type": "nested-select",
      "name": "nestedSelect2",
      "label": "只包含子节点的值",
      "multiple": true,
      "onlyChildren": true,
      "clearable": true,
      "options": [
        {
          "label": "A",
          "value": "a"
        },
        {
          "label": "B",
          "value": "b",
          "children": [
            {
              "label": "B-1",
              "value": "b-1",
              "children": [
                {
                  "label": "D-1",
                  "value": "d-1"
                },
                {
                  "label": "D-2",
                  "value": "d-2"
                },
                {
                  "label": "D-3",
                  "value": "d-3"
                }
              ]
            },
            {
              "label": "B-2",
              "value": "b-2"
            },
            {
              "label": "B-3",
              "value": "b-3"
            }
          ]
        },
        {
          "label": "C",
          "value": "c"
        }
      ]
    }
  ]
}
```

## 仅展示选中节点文本信息

设置`hideNodePathLabel: true`，可以隐藏选择框中已选择节点的祖先节点(ancestor)的`labelField`字段值，仅展示当前选中节点的`labelField`字段值。

```schema: scope="body"
{
  "type": "form",
  "api": "/api/mock2/form/saveForm",
  "body": [
    {
      "type": "nested-select",
      "name": "nestedSelect",
      "label": "展示已选择节点的祖先节点的文本信息",
      "value": "a,b-1,b-3",
      "multiple": true,
      "options": [
        {
          "label": "A",
          "value": "a"
        },
        {
          "label": "B",
          "value": "b",
          "children": [
            {
              "label": "B-1",
              "value": "b-1"
            },
            {
              "label": "B-2",
              "value": "b-2"
            },
            {
              "label": "B-3",
              "value": "b-3"
            }
          ]
        },
        {
          "label": "C",
          "value": "c"
        }
      ],
    },
    {
      "type": "divider"
    },
    {
      "type": "nested-select",
      "name": "nestedSelect2",
      "label": "仅展示已选择节点的文本信息",
      "value": "a,b-1,b-3",
      "multiple": true,
      "cascade": true,
      "hideNodePathLabel": true,
      "options": [
        {
          "label": "A",
          "value": "a"
        },
        {
          "label": "B",
          "value": "b",
          "children": [
            {
              "label": "B-1",
              "value": "b-1"
            },
            {
              "label": "B-2",
              "value": "b-2"
            },
            {
              "label": "B-3",
              "value": "b-3"
            }
          ]
        },
        {
          "label": "C",
          "value": "c"
        }
      ]
    }
  ]
}
```

## 属性表

当做选择器表单项使用时，除了支持 [普通表单项属性表](./formitem#%E5%B1%9E%E6%80%A7%E8%A1%A8) 中的配置以外，还支持下面一些配置

| 属性名            | 类型                                      | 默认值               | 说明                                                                                        |
| ----------------- | ----------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------- |
| options           | `Array<object>`或`Array<string>`          |                      | [选项组](./options#%E9%9D%99%E6%80%81%E9%80%89%E9%A1%B9%E7%BB%84-options)                   |
| source            | `string`或 [API](../../../docs/types/api) |                      | [动态选项组](./options#%E5%8A%A8%E6%80%81%E9%80%89%E9%A1%B9%E7%BB%84-source)                |
| delimiter         | `boolean`                                 | `false`              | [拼接符](./options#%E6%8B%BC%E6%8E%A5%E7%AC%A6-delimiter)                                   |
| labelField        | `boolean`                                 | `"label"`            | [选项标签字段](./options#%E9%80%89%E9%A1%B9%E6%A0%87%E7%AD%BE%E5%AD%97%E6%AE%B5-labelfield) |
| valueField        | `boolean`                                 | `"value"`            | [选项值字段](./options#%E9%80%89%E9%A1%B9%E5%80%BC%E5%AD%97%E6%AE%B5-valuefield)            |
| joinValues        | `boolean`                                 | `true`               | [拼接值](./options#%E6%8B%BC%E6%8E%A5%E5%80%BC-joinvalues)                                  |
| extractValue      | `boolean`                                 | `false`              | [提取值](./options#%E6%8F%90%E5%8F%96%E5%A4%9A%E9%80%89%E5%80%BC-extractvalue)              |
| autoFill          | `object`                                  |                      | [自动填充](./options#%E8%87%AA%E5%8A%A8%E5%A1%AB%E5%85%85-autofill)                         |
| cascade           | `boolean`                                 | `false`              | 设置 `true`时，当选中父节点时不自动选择子节点。                                             |
| withChildren      | `boolean`                                 | `false`              | 设置 `true`时，选中父节点时，值里面将包含子节点的值，否则只会保留父节点的值。               |
| onlyChildren      | `boolean`                                 | `false`              | 多选时，选中父节点时，是否只将其子节点加入到值中。                                          |
| searchable        | `boolean`                                 | `false`              | 可否搜索                                                                                    |
| searchPromptText  | `string`                                  | `"输入内容进行检索"` | 搜索框占位文本                                                                              |
| noResultsText     | `string`                                  | `"未找到任何结果"`   | 无结果时的文本                                                                              |
| multiple          | `boolean`                                 | `false`              | 可否多选                                                                                    |
| hideNodePathLabel | `boolean`                                 | `false`              | 是否隐藏选择框中已选择节点的路径 label 信息                                                 |

## 事件表

| 事件名称 | 事件参数                                                                                           | 说明 |
| -------- | -------------------------------------------------------------------------------------------------- | ---- |
| change    |  `value: string \| Option[]` 选中值 | 选中值发生变化时触发 |
| blur    |  `(event: Event)` 原始事件 | 失去焦点时触发 |
| focus    |  `(event: Event)` 原始事件 | 获得焦点时触发 |

## 动作表

| 动作名称 | 动作配置                                                                                           | 说明 |
| -------- | -------------------------------------------------------------------------------------------------- | ---- |
| clear    |  - | 清空 |
| reset    |  `resetValue: boolean` 重置值 | 重置 |
