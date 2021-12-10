<template>
    <div class="popover">
        <div class="pop_list">
            <span></span>
            <ul v-if="show_diff_tag">
                 <li>
                    <router-link :to="{path:'/wxCode',query:{type_yyid:'CC9A4AD01C4EB56C737B450A52BD61D1'}}">
                        <i class="iconfont">&#xe62b;</i>
                        我的二维码
                    </router-link>
                </li>
                <li>
                    <router-link to="/addList">
                        <i class="iconfont">&#xe65d;</i>
                        待加入列表
                    </router-link>
                </li>
                <li @click="showInput()">
                    <a href="javascript:;">
                        <i class="iconfont">&#xe630;</i>
                        新建分组
                    </a>
                </li>
                <li>
                    <router-link to="/mgGroup">
                        <i class="iconfont">&#xe619;</i>
                        管理分组
                    </router-link>
                </li>
            </ul>
            <ul v-else>
                <li>
                    <router-link :to="{path:'/addDoc',query:{'group_yyid':this.gp_yyid}}">
                        <i class="iconfont">&#xe65d;</i>
                        添加医生
                    </router-link>
                </li>
                <li @click="delGroupShow()">
                    <a href="javascript:;">
                        <i class="iconfont">&#xe65f;</i>
                        删除分组
                    </a>
                </li>
                <li @click="showInput()">
                    <a href="javascript:;" >
                        <i class="iconfont">&#xe724;</i>
                        分组重命名
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props:['show_diff_tag','gp_yyid'],
    data(){
        return {
            
        }
    },
    methods:{
        showInput(){
            this.$emit('showAddInput');
        },
        delGroupShow(){
            this.$emit('delGroup')
            
        }
    }
}
</script>
<style lang="less">
    .popover{
        position: absolute;
        top: 60px;
        right: 20px;
        z-index: 12;
        background-color: #ffffff;
        border-radius: 4px 0 4px 4px;
        .pop_list{
            padding: 10px 0;
            line-height: 40px;
            li{
                a{
                    display: block;
                    padding: 0 20px;
                    .iconfont{
                        margin-right: 4px;
                        font-size: 16PX;
                    }
                }
            }
            span{
                position: absolute;
                top: -10px;
                right: 0;
                border: 10px solid transparent;
                border-right: 10px solid #ffffff;
            }
        }
    }
</style>