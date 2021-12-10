const md5 = require('md5')
    // 永久本地存储设置
export const setStore = (key, val) => {
        if (!key) {
            retun
        };
        if (typeof val !== 'string') {
            val = JSON.stringify(val)
        };
        window.localStorage && window.localStorage.setItem(key, val)
    }
    // 永久获取本地存储
export const getStore = key => {
        if (!key) {
            return
        }
        return window.localStorage.getItem(key)
    }
    // 永久删除本地存储
export const removeStore = key => {
        if (!key) {
            return
        }
        window.localStorage.removeItem(key)
    }
    // 临时存储
export const setSessionStore = (key, val) => {
        if (!key) {
            retun
        };
        if (typeof val !== 'string') {
            val = JSON.stringify(val)
        };
        window.sessionStorage && window.sessionStorage.setItem(key, val)
    }
    // 临时获取本地存储
export const getSessionStore = key => {
        if (!key) {
            return
        }
        return window.sessionStorage.getItem(key)
    }
    // 永久删除本地存储
export const removeSessionStore = key => {
    if (!key) {
        return
    }
    window.sessionStorage.removeItem(key)
}

// 唯一会话标识
export const getOnlyMark = () => {
        let only_mark = getStore('yy_sign');
        if (only_mark == undefined || !only_mark) {
            setStore('yy_sign', md5(Math.random() * 2 + 1).toString());
            only_mark = getStore('yy_sign');
        }
        return only_mark;
    }
    // 单词会话标识
export const getOnceMark = () => {
        let once_mark = window.sessionStorage.getItem('yy_singleMark');
        if (!once_mark) {
            window.sessionStorage.setItem('yy_singleMark', md5((Math.random() * 2 + 1).toString()));
            once_mark = window.sessionStorage.getItem('yy_singleMark');
        }
        return once_mark;
    }
    // 获取初始地址参数
export const getUrlParams = url => {
  url = url || location.href;
  if (url.indexOf('?') != -1) {
      let search = url.substr(url.indexOf('?') + 1);
      let arr = search.split('&');
      let obj = {};
      for (let i = 0; i < arr.length; i++) {

          let value = arr[i].split('=')[1];
          obj[arr[i].split('=')[0]] = value;

      }
      return obj;
  }
}
    // 函数防抖，针对文本输入框
export const debounce = (fn, delay) => {
  let timer = null;
  return function() {
      let _self = this;
      let _args = arguments;

      clearTimeout(timer);
      timer = setTimeout(function() {
          fn.apply(_self, _args);
      }, delay);
  }
}
    //函数节流,针对滚动，同一时间内多次点击提交,一次有效
export const throttle = (fn, delay) => {
  let timer = null;
  let last;
  return function() {
      let _self = this;
      let _args = arguments;
      let now = +new Date();

      if (last && now - last < delay) {
          clearTimeout(timer);
          timer = setTimeout(function() {
              last = now;
              fn.apply(_self, _args);
          }, delay)
      } else {
          last = now;
          fn.apply(_self, _args);
      }
  }
}
    // 我服务的医院详情图表配置
export const hosDetailChartSet = _this => {
    _this.chartSettings = {
        metrics: ''
    }
    _this.chartExtends = {
        legend: {
            data: [],
        },
        grid: {
            // x2:200,
            y2: 140,
            top: 30,
            bottom: 20
        },
        xAxis: {
            axisLabel: {
                textStyle: {
                    color: '#999999'
                },
            }
        },
        yAxis: {
            axisLabel: {
                textStyle: {
                    color: '#cccccc'
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#ECEEF3'
                }
            }
        },
        series: {
            type:'line',
            smooth: true,
            lineStyle: {
                normal: {
                    width: 3,
                    shadowColor: 'rgba(88,112,254,.3)',
                    shadowBlur: 10,
                    shadowOffsetY: 10
                }
            },
            itemStyle: {
                normal: {
                    color: '#A185FF',
                    borderColor: '#A185FF'
                }
            },
        },
    }
}

// 管理报表图表配置
export const reportSetting = _this => {
    _this.chartSettings = {
        stack: { '用户': ['东区', '南区', '北区'] },
        area: true
    }
    _this.chartSettings2 = {
        yAxisType: ['percent'],
        digit: 0,
    }
    _this.chartSettings3 = {
        stack: { '用户': ['有销量', '东区', '南区', '北区'] },
        area: true
    }
    _this.extend = {
        'xAxis.0.axisLabel.rotate': 45
    }
    _this.chartExtends = {
        tooltip: {
            trigger: 'axis'
        },
        color: ['#24D0BF', '#4577FF', '#FFA114'],
        grid: {
            y2: 140,
            top: 40,
            bottom: 20,
            right: 24,
        },
        xAxis: {
            boundaryGap: false
        },
        yAxis: {
          splitNumber: 4,
          splitLine: {
              show: true,
              lineStyle: {
                  type: 'dashed',
              }
          },
        },
        series: {
          type:'line',
          lineStyle: {
              width: 3,
              opacity: 1,

          },
          showSymbol: false,
          itemStyle: {

          },
          areaStyle: {

          },
      },
    }
    _this.chartExtends2 = {
      color: ['#FF7FC9', '#FFA114', '#4577FF', '#24D0BF'],
      grid: {
        y2: 140,
        top: 35,
        bottom: 30,
        right: 20
      },
      xAxis: {
        boundaryGap: true
      },
      yAxis: {
        lineStyle: {},
        splitNumber: 4,
        splitLine: {
          show: true,
          lineStyle: {
              type: 'dashed',
          }
        },
      },
      series: {
        type:'line',
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 3,
            shadowColor: 'rgba(0,0,0,.1)',
            shadowBlur: 10,
            shadowOffsetY: 10
          }
        },
      },
    }
    _this.chartExtends3 = {
      color: ['#FFA114', '#4577FF', '#24D0BF', '#DEE2E6'],
      title: {
          padding: 10
      },
      legend: {
          orient: 'vertical',
          right: 20,
          top: 80,
          icon: 'circle'
      },
      xAxis: {
          boundaryGap: true
      },
      yAxis: {
          lineStyle: {},
      },
      series: {
        type:'pie',
        center: ['35%', '50%'],
        radius: ['45%', '70%'],
        avoidLabelOverlap: false,
        label: {
          verticalAlign: 'middle',
          normal: {
              show: false,
              position: 'center',
          },
        },
        labelLine: {
          normal: {
              show: false
          }
        },
      },
    }
}
// 管理报表通用设置力蜚能
export const reportConSetting = (_this) => {
    _this.extend = {
        'xAxis.0.axisLabel.rotate': 45
    }
    _this.chartExtends = {
        yAxis: {
          splitNumber: 4,
          splitLine: {
              show: true,
              lineStyle: {
                  type: 'dashed',
              }
          },
        },
        series: {
           type:'line',
          lineStyle: {
              width: 1.5,
              opacity: 1,
          },
          showSymbol: false,
        },
    }
    _this.chartExtends2 = {
      grid: {
        y2: 140,
        top: 60,
        bottom: 30,
        right: 20
      },
      xAxis: {
        boundaryGap: true
      },
      yAxis: {
        lineStyle: {},
        splitNumber: 4,
        splitLine: {
          show: true,
          lineStyle: {
              type: 'dashed',
          }
        },
      },
      series: {
        type:'line',
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 1.5,
            shadowColor: 'rgba(0,0,0,.1)',
            shadowBlur: 10,
            shadowOffsetY: 10
          }
        },
      },
    }
    _this.chartExtends3 = {
      title: {
          padding: 10
      },
      legend: {
          orient: 'vertical',
          right: 20,
          top: 30,
          icon: 'circle'
      },
      xAxis: {
          boundaryGap: true
      },
      yAxis: {
          lineStyle: {},
      },
      series: {
        type:'pie',
        center: ['35%', '50%'],
        radius: ['45%', '70%'],
        avoidLabelOverlap: false,
        label: {
          verticalAlign: 'middle',
          normal: {
              show: false,
              position: 'center',
          },
        },
        labelLine: {
          normal: {
              show: false
          }
        },
      },
    }
}
// 年月日
export const getDate = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let total_date = null;

    total_date = `${year}-${month < 10?'0'+month : month}-${day}`;
    return total_date;
}
export const date = () => {
    let date_json = {};
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let total_date = null;
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    date_json.total_date = `${year}-${month < 10?'0'+month : month}-${day< 10?'0'+day : day}`;
    date_json.date = `${date_json.total_date} ${h}:${m < 10?'0'+m:m}:${s<10?'0'+s:s}`;
    return date_json;
}
