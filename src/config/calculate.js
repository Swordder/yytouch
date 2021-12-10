// author:Tingting Mao
// 为便于操作，所有以百分比做为计算结果的方法，在本JS中是以小数为计算结果，需要*100+%，才是最终结果，力蜚能的奖金计算策略除外。
// FS的奖金计算规则：计算基准是以当季度月平均的销量为准
// FS的奖金策略
// FS增长率是指本季度月均与去年全年的月均对比
// monthAvg:月平均，
// achievePoint*100+%:达成率，addPoint*100+%:增长率，baseBonus:基础奖金，bonusIndex:奖金系数

import { init } from "echarts";

let calStrategies = {
    achievePoint: function(sales, target) {
        return Number(sales) / Number(target);
    },
    monthAvg: function(sales) {
        return Number(sales) / 3;
    }
}
let fsStrategies = {
    addPoint: function(monthAvg, lastYearMonthAvg) {
        return (Number(monthAvg) - Number(lastYearMonthAvg)) / Number(lastYearMonthAvg);
    },
    baseBonus: function(achievePoint, monthAvg) {
        var intAchievePoint = achievePoint * 100;
        var arr = [];
        if (intAchievePoint < 80) {
            return 0;
        }
        var salesObj = {
            '700.01': 32000,
            '500.01': 27000,
            '300.01': 15000,
            '200.01': 5000,
            '0.01': 3000
        };
        arr = [700.01, 500.01, 300.01, 200.01, 0.01];
        for (var i = 0; i < arr.length; i++) {
            if (monthAvg >= arr[i]) {
                return salesObj[arr[i]]
            }
        }
    },
    sameIndex: function(intAddPoint) {
        var achieveObj = {
            '110': 1.0,
            '90': 0.9,
            '70': 0.8,
            '50': 0.7,
        };

        return achieveObj;
    },
    bonusIndex: function(achievePoint, monthAvg, addPoint) {

        var intAchievePoint = achievePoint * 100;
        var intAddPoint = addPoint * 100;
        if (intAchievePoint == 0 && intAddPoint == 0) {
            return 0;
        }

        var achieveObj = {},
            arr = [];
        if (intAchievePoint < 80) {
            return 0;
        } else {

            if (monthAvg > 0 && monthAvg <= 200) {
                if (intAddPoint < 50) {
                    return 0.6;
                };
                achieveObj = this.sameIndex(intAddPoint);
                arr = [110, 90, 70, 50];
            } else if (monthAvg > 200 && monthAvg <= 300) {
                if (intAddPoint < 50) {

                    return 0.6;
                };
                achieveObj = this.sameIndex(intAddPoint);
                arr = [110, 90, 70, 50];
            } else if (monthAvg > 300 && monthAvg <= 500) {
                if (intAddPoint < 30) {
                    return 0.6;
                }
                achieveObj = {
                    '100': 1,
                    '80': 0.9,
                    '50': 0.8,
                    '30': 0.7
                };
                arr = [100, 80, 50, 30];
            } else if (monthAvg > 500 && monthAvg <= 700) {
                achieveObj = {
                    '40': 1.1,
                    '30': 0.9,
                    '20': 0.8,
                    '10': 0.7
                };
                if (intAddPoint < 10) {
                    return 0.6;
                };
                arr = [40, 30, 20, 10];
            } else if (monthAvg > 700) {
                if (intAddPoint < 0) {
                    return 0.75;
                };
                achieveObj = {
                    '25': 1.1,
                    '15': 1.0,
                    '5': 0.95,
                    '0': 0.85
                };
                arr = [25, 15, 5, 0];
            }
            for (var i = 0; i < arr.length; i++) {
                if (intAddPoint >= arr[i]) {
                    return achieveObj[arr[i]]
                }
            }
        }
    },
    bonusResult: function(baseBonus, bonusIndex) {
        return Number(baseBonus) * Number(bonusIndex) * 3;
    }
};

// Treanda绩效奖金计算——基础奖金计算
let tdStrategies = {
    baseBonus: function(achievePoint) {
        var intAchievePoint = achievePoint * 100;
        // 定义一个json，列出所有的区间，key表示范围，val表示值
        if (intAchievePoint < 70) {
            return 0;
        }
        var obj = {
            '150.01': 360,
            '140.01': 270,
            '130.01': 252,
            '120.01': 234,
            '110.01': 216,
            '100.01': 198,
            '100': 180,
            '90': 144,
            '80': 108,
            '70': 90,
        };
        var arr = [150.01, 140.01, 130.01, 120.01, 110.01, 100.01, 100, 90, 80, 70];

        for (var i = 0; i < arr.length; i++) {
            if (intAchievePoint >= arr[i]) {
                return obj[arr[i]]
            }
        }
    },
    bonusResult: function(sales, baseBonus) {
        return Number(sales) * Number(baseBonus);
    }
};
// Niferex力蜚能的奖金计算策略
let niStrategies = {
    // 奖金基数
    bonusBase(sales,monNum){
        let avSales = Math.round(Number(sales)/Number(monNum)*100)/100 ; //平均每月销量
        let bBase = {                           //销量区间对应的奖金基数
            "12000":12500,
            "9000":11000,
            "7000":9000,
            "5500":7000,
            "4500":5500,
            "3500":4000,
            "0.01":2800,
        };
        let arr = [12000,9000,7000,5500,4500,3500,0.01];
        for(let i = 0 ; i < arr.length; i++){
            if(avSales >= arr[i]){
                return bBase[arr[i]];
            }
        }
    },
    // 达成率
    totalAchieveRate(sales, standard) {
        return Math.round(Number(sales)/Number(standard)*10000)/100;
    },
    // 达成系数
    totalAchieveIndex(rate,monthAvg) {
        let initRate = rate;
        if(initRate < 85){
            return 0
        }else if(initRate >= 85 && initRate < 90){
            return 0.7
        } else if(initRate >= 90 && initRate < 95){
            if(monthAvg < 3500){
                return 0.7
            } else if(monthAvg >= 3500 && monthAvg < 5500){
                return 0.8
            } else if(monthAvg >= 5500){
                return 0.9
            }
        } else if(initRate >= 95 && initRate < 100){
            if(monthAvg < 3500){
                return 0.9
            } else if(monthAvg >= 3500 && monthAvg < 5500){
                return 1
            } else if(monthAvg >= 5500){
                return 1.1
            }
        } else if(initRate >= 100 && initRate < 101){
            if(monthAvg < 3500){
                return 1
            } else if(monthAvg >= 3500 && monthAvg < 7000){
                return 1.1
            } else if(monthAvg >= 7000){
                return 1.2
            }
        } else if (initRate >= 101 && initRate < 120){
            if(monthAvg < 3500){
                return 1.1
            } else if(monthAvg >= 3500 && monthAvg < 5500){
                return 1.2
            } else if(monthAvg >= 5500){
                return 1.3
            } 
        } else if(initRate >= 120){
            if(monthAvg < 3500){
                return 1.2
            } else if(monthAvg >= 3500 && monthAvg < 5500){
                return 1.3
            } else if(monthAvg >= 5500){
                return 1.5
            }
        }
    },
    // 增长率
    growthRate(sales,monNum,monthAvg){
        return Math.round((Number(sales)/Number(monNum)/Number(monthAvg) -1)*10000)/100;
    },
    growthRateIndex(initIndex,monthAvg){
        //initIndex 是由growthRate函数算出来的
        if(initIndex < 1){
            if(monthAvg < 4500){
                return 0.8
            } else if (monthAvg >= 4500){
                return 0.9
            }
        } else if( initIndex >=1 && initIndex < 20){
            if(monthAvg < 5500){
                return 1
            } else if (monthAvg >= 5500 && monthAvg < 9000){
                return 1.05
            } else if (monthAvg >= 9000){
                return 1.1
            }
        } else if(initIndex >= 20 && initIndex < 40){
            if(monthAvg < 4500){
                return 1.05
            } else if (monthAvg >= 4500 && monthAvg < 5500){
                return 1.1
            } else if (monthAvg >= 5500){
                return 1.2
            }
        } else if(initIndex >= 40 && initIndex < 60){
            if(monthAvg < 4500){
                return 1.2
            } else if (monthAvg >= 4500 && monthAvg < 5500){
                return 1.3
            } else if (monthAvg >= 5500){
                return 1.4
            }
        } else if(initIndex >= 60 && initIndex < 90){
            if(monthAvg < 4500){
                return 1.5
            } else if (monthAvg >= 4500 && monthAvg < 7000){
                return 1.6
            } else if (monthAvg >= 7000){
                return 1.8
            }
        } else if(initIndex >= 90 && initIndex < 150){
            if(monthAvg < 3500){
                return 1.8
            } else if (monthAvg >= 3500 && monthAvg < 7000){
                return 2
            } else if(monthAvg >= 7000){
                return 2.5
            }
        } else if(initIndex >= 150){
            if(monthAvg < 3500){
                return 2
            } else if (monthAvg >= 3500 && monthAvg < 5500){
                return 2.5
            } else if(monthAvg >= 5500){
                return 3
            }
        }
    },
    // 历史奖金基数
    hisBonusBase(lastMonSales,month){
        let avgSales = Number(lastMonSales)/(Number(month) -1);
        let hBonusBase = {                           
            "12000":12500,
            "9000":11000,
            "7000":9000,
            "5500":7000,
            "4500":5500,
            "3500":4000,
            "0.01":2800,
        };
        let arr = [12000,9000,7000,5500,4500,3500,0.01];
        for(let i = 0 ; i < arr.length; i++){
            if(avgSales >= arr[i]){
                return hBonusBase[arr[i]];
            }
        }
    },
    // 历史达成率
    hisAchRate(lastSales,lastStandard){
        return Math.round(Number(lastSales)/Number(lastStandard)*10000)/100;
    },
    // 历史增长率
    hisAddRate(sales,monNum,monthAvg){
        return Math.round((Number(sales)/(Number(monNum) - 1)/Number(monthAvg) -1)*10000)/100
    }
};
// 策略医院增长奖金
let strategyHosAddBonus = {
    // YTD月均增量
    ytdMonAdd(sales,month,monthAvg){
        return Math.round((Number(sales)/Number(month) - Number(monthAvg))*100)/100; 
    },
    // 单盒奖金数
    singleBonus(monthAdd){
        if(monthAdd < 100){
            return 0;
        } else if(monthAdd >= 100 && monthAdd < 500){
            return 1
        } else if(monthAdd >= 500 && monthAdd < 1000){
            return 2
        } else if(monthAdd >= 1000){
            return 3
        }
    },
    // YTD应发奖金
    ytdBonus(monthAdd,singleBonus,month){
        return Math.round(Number(monthAdd)*Number(singleBonus)*Number(month)*100)/100; 
    },
    // 历史月均增量
    hisYtdMonAdd(lastMonthSale,month,monthAvg){
        return Math.round((Number(lastMonthSale)/(Number(month) - 1) - Number(monthAvg))*100)/100 ;
    },
    // 岗位达成率
    posAchRate(totalSales,totalStandard){
        return Math.round(Number(totalSales)/Number(totalStandard)*10000)/100; 
    },
    // 耽搁医院达成率
    singleHosAchRate(hosSales,hosStandard){
        return Math.round(Number(hosSales)/Number(hosStandard)*10000)/100; 
    },
    // 医院月增长量
    hosMonthAdd(hosSales,month,monthAvg){
        return Math.round((Number(hosSales)/Number(month) - Number(monthAvg))*100)/100;
    },
};
export {
    calStrategies,
    fsStrategies,
    tdStrategies,
    niStrategies,
    strategyHosAddBonus
}