<template>
    <div v-show="geo_tag" class="visit_popover">
        <transition name="showcover">
			<div class="back_cover"></div>
		</transition>
        <div class="w_285 bgcw">
            <h2>超范围打卡</h2>
            <ul>
                <li 
                    v-for="item in list" 
                    @click="select(item.id,item.is_extra_input)" 
                    :class="id == item.id?'active':''"
                    :key="item.id">
                    {{item.name}}
                </li>
            </ul>
            <textarea v-show="input_show" v-model.trim="value" @input="setValue" name="" id="" placeholder="请输入超范围打卡原因"></textarea>
            <button class="btn_common" @click="setGeoType">确定</button>
        </div>
    </div>
</template>
<script>
import { setSessionStore } from '../../config/util';
export default {
    props:['geo_tag','list','show'],
    data(){
        return {
            id:'',
            input_show:false,
            value:''
        }
    },
    mounted(){

    },
    methods:{
        select(item_id,input_id){
            this.value = '';
            setSessionStore('v_geo_con','');
            this.id = item_id;
            if(input_id == 1){
                this.input_show = true;
            } else {
                this.input_show = false;
            }
        },
        setValue(e){
            if(this.input_show){
                setSessionStore('v_geo_con',this.value);
            } else {
                this.value = '';
                setSessionStore('v_geo_con','');
            }
        },
        // showPover(){
        //     this.$emit('show');
        // },
        setGeoType(){
            if(!this.id){
                this.$vux.toast.text('请选择打卡类型');
                return
            };
            if(this.input_show && this.value == ''){
                this.$vux.toast.text('请输入原因');
                return
            };
            setSessionStore('v_geo_id',this.id);
            this.$emit('show');
        }
    }
}
</script>
<style lang="less">
.visit_popover{
    position: relative;
    .back_cover{
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;    
    }
    .w_285{
        width: 285px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 20;
        border-radius: 8px;
        padding: 20px 15px;
        h2{
            margin-bottom: 12px;
            text-align: center;
        }
        li{
            margin-bottom: 10px;
            background-color: #EEEEEE;
            border: 1PX solid #C4C9D2;
            border-radius: 4px;
            line-height: 24px;
            padding: 0 5px;
            text-align: center;
            color: #666666;
        }
        li.active{
            color: #5870FE;
            border-color: #5870FE;
            background-color: #E9ECFF;
        }
        textarea{
            width: 100%;
            margin-top: 30px;
            padding: 15px;
            border-radius: 2px;
            resize: none;
            outline-style: none;
            border: 1PX solid #EEEEEE;
        }
        button{
            width: 100%;
            line-height: 36px;
            display: block;
            background-color: #5870FE;
            color: #ffffff;
            margin-top: 30px;
        }
    }
}
</style>