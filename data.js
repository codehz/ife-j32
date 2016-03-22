var data=[
  {
    label: '名字',
    name: 'name',
    type: 'input',
    validator: function (name) {
      return getlen(name) >= 4 && getlen(name) <= 16;
    },
    rules: '必填，长度为4-16个字符',
    success: '格式正确',
    fail: '名称格式错误'
  },
  {
    label: '性别',
    name: 'sex',
    type: 'radio',
    radioExt: {
      'male': '男♂',
      'female': '女♀',
      'intersex': '双性⚥',
      'neuter': '无性⚲',
      'transgender': '跨性别⚧'
    },
    validator: function (sex) {
      return Object.keys(this.radioExt).includes(sex);
    },
    rules: '必选',
    success: '格式正确',
    fail: '您尚未选择'
  },
  {
    label: '年龄',
    name: 'age',
    type: 'number',
    attr: {
      min: 0,
      max: 180,
      step: 1,
      value: 0
    },
    validator: function (age) {
      return age >= 1 && age <= 180;
    },
    rules: '必填',
    success: '正确',
    fail: '请选择正确的年龄!'
  }
]