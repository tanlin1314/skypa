<template>
    <div class="zy">
       <el-container>
        <el-container>
            <!-- 侧导航 -->
            <el-aside width="201px">
                <div class="timg"><img src="../assets/t1.png" alt="" width="150px"  height="56px" ></div>
            <el-col :span="12" width="200px" height="500px">
                <el-menu
                :default-active="defaultActive"
                class="el-menu-vertical-demo"
                background-color="#304156"
                text-color="#fff"
                active-text-color="#ffd04b" router
                unique-opened
                >
            <!-- 一级路由    判断children(秋准) 有就创建二级路由 没有就是一级路由   用v-if v-else 判断  如果条件满足(children) 就渲染二级路由 不满足就渲染一级路由-->
                          <!-- 二级路由 -->
              <div v-for="item in Navigation1" :key="item.index">
                <el-submenu v-if="item.children" :index="item.index" >
                   <template slot="title" >
                        <i :class="item.Icon"></i>
                        <span>{{item.name}}</span>
                    </template>
                    <el-menu-item-group v-for=" subnav in item.children" :key="subnav.index">
                        <el-menu-item :index="subnav.index" class="xx">{{subnav.name}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <!-- 一级路由 -->
               <el-menu-item v-else :index="item.index">
                   <div>
                        <i :class="item.Icon"></i>
                    <span slot="title">{{item.name}}</span>
                   </div>
                </el-menu-item>
              </div>

                </el-menu>
            </el-col>
            </el-aside>
            <!-- 二次导航 -->
            <el-container>
            <el-main>
                <div class="head">
                        <div class="crumbs">  
                    <!-- 面包屑  hash地址改变的时候才会改变上面的文字  有可能有一个也有可能有2个  循环判断-->
                    <el-breadcrumb separator="/">
                    <el-breadcrumb-item  v-for="item in crumbs" :key="item">{{item}}</el-breadcrumb-item>
                </el-breadcrumb>
                </div>
                <!-- 个人中心 -->
                <div class="personal">
                    <span>欢迎你,<span @click="Personal" v-html="username"></span></span> 
                    <div class="crumbstu">
                        <img :src="imgUrl"  alt="" class="crumbstu1">
                    </div>
                </div>
                </div>
            
                <router-view/>
            </el-main>
         
            </el-container>
        </el-container>
        </el-container>
    </div>
</template>

<script>
import {Tokens,Accountinfo} from '@/api/api.js'
    export default {
        data(){
            // super  超级  normal普通
            return{
                Navigation:[
                    {index:'/Index/houye',Icon:'el-icon-location',name:'后台首页',role:['super','normal']},
                    {index:'/Index/management',Icon:'el-icon-location',name:'订单管理',role:['super']},
                    {
                        index:'3',Icon:'el-icon-location',name:'商品管理',
                        children:[
                            {index:'/Index/leibiao',Icon:'el-icon-location',name:'商品列表'},
                            {index:'/Index/tianjia',Icon:'el-icon-location',name:'商品添加'},
                            {index:'/Index/fenlei',Icon:'el-icon-location',name:'商品分类'},
                            ],role:['super','normal']
                    },
                    {index:'/Index/dianpu',Icon:'el-icon-location',name:'店铺管理',role:['super','normal']},
                    {
                        index:'5',Icon:'el-icon-location',name:'账号管理',
                        children:[
                            {index:'/Index/lb',Icon:'el-icon-location',name:'账号列表'},
                            {index:'/Index/tianjiazh',Icon:'el-icon-location',name:'添加账号'},
                            {index:'/Index/xg',Icon:'el-icon-location',name:'修改密码'}
                            ],role:['super']
                    },
                    {
                        index:'6',Icon:'el-icon-location',name:'销售统计',
                        children:[
                            {index:'/Index/tj',Icon:'el-icon-location',name:'商品统计'},
                            {index:'/Index/ordertotal',Icon:'el-icon-location',name:'订单统计'},
                            ],role:['super']
                    },  
                    ],
                    imgUrl:'',
                    role:'',
                    // 面包屑数组
                    crumbs:['首页','后台首页'],
                    // 默认选中
                    defaultActive:'',
                    username:'请登陆'

            }
        },
        // 检测某个数据（hash）的变化  监听路由对象的变化
        watch:{
              $route: {
                handler: (val)=> {
                    // 面包屑默认
                    window._this.crumbs1(val.path)
                    // 取到hash值
                // console.log('当前hash地址：'+val.path);
                },
                // 深度观察监听
                deep: true
                    }

        },
          // vue怎么监听页面加载  created  methods 函数  刷新页面保留当前选中状态  要重置的是默认激活的样式和面包屑导航   改变 default-active 左侧树菜单默认选中  面包屑导航根据hash值来改变
        created(){
            // 验证是否保存了token
            // console.log(localStorage.token);
            
            // console.log('初始化加载');
            // 怎么拿到当前hash值
            // console.log(this.$router);  main.js里router对象实例  最大的vue router实例
            // console.log(this.$route.path); //当前hash对象
            var hash=this.$route.path
            this.defaultActive=hash
            this.crumbs1(hash)

            // 保存this'
            window._this=this 
            
            // 管理员头像
            Accountinfo(localStorage.id).then((res)=>{
                // console.log(res);
               this.imgUrl=res.data.accountInfo.imgUrl
                
            })

            // 进入首页立即验证token
            Tokens(localStorage.token).then((res)=>{
                // console.log(res);
                if(res.data.code==0){
                    // token有效  就显示用户名
                    this.username=localStorage.account
                   this.role=localStorage.role
                    
                }else{
                    // token无效  就显示请，请登陆
                    this.username="<a href='#/'>请，请登陆<a>"
                }
                
            })

            
          },
        //   计算属性修改权限
        computed:{
            //  数组里过滤产出一个新数组
            Navigation1(){
                var arr=this.Navigation.filter(item=>{
                    return item.role.includes(this.role)
                })
                return arr
            }
        },
          methods:{
            //   根据hash值切换面包屑
            crumbs1(hash){
                       // 从多个里面选一个值（用什么循环判断val值） 面包屑hash改变
            let arr=[]
            switch(hash){
                case '/Index/houye':arr=['首页']; break;
                case '/Index/leibiao':arr=['首页','商品列表']; break;
                case '/Index/management':arr=['首页','订单管理']; break;                
                case '/Index/tianjia':arr=['首页','商品添加']; break;
                case '/Index/fenlei':arr=['首页','商品分类']; break;
                case '/Index/lb':arr=['首页','账号列表']; break;
                case '/Index/tianjiazh':arr=['首页','添加账号']; break;
                case '/Index/xg':arr=['首页','修改密码']; break;
                case '/Index/tj':arr=['首页','商品统计']; break;
                case '/Index/dj':arr=['首页','订单统计']; break;
                case '/Index/Personal':arr=['首页','个人中心']; break;
                case '/Index/dianpu':arr=['首页','店铺管理']; break;      
                case '/Index/ordertotal':arr=['首页','订单统计']; break;                
                          
                
            }
            this.crumbs=arr
            },
            // 个人中心
            Personal(){
                this.$router.push('/Index/Personal')
            }
          }
    }
</script>

<style lang="less" scoped>
html,body,.zy{
    height: 100%;
    width: 100%;
     
}

  .el-aside {
    // background-color: #D3DCE6;
    color: #333;
    text-align: center;
    // background-color: rgb(48, 65, 86);
   
   
  }
  .el-menu{
      height: 544px;

  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 600px;

  }

  .el-menu-item-group__title{
      padding: 0;
  }
  .el-col{
      width: 200px;
  }
  .timg{
 padding: 0;
 margin: 0;
 width: 200px;

background: #304156;
img{
    vertical-align: middle;
}
  }
  .dh2{
      margin-right: 40px;
  }

.el-icon-location{
    margin-left:-37px;
}
.xx{
    margin-left: -10px;
}
.el-main{
    padding: 0;
    text-align: left;
}

.head{
    display: flex;
    justify-content: space-between;
    height: 25px;
    line-height: 25px;
    background: #fff;
    .crumbs{
        height: 25px;
        line-height: 25px;
        .el-breadcrumb{
            height: 25px;
        line-height: 25px;
        }
    }
    .personal{
        display: flex;
        font-size: 10px;
        .crumbstu{
            width:25px ;
            height: 25px;
            border-radius: 50%;
            // background: rebeccapurple;
            margin-left: 5px;
            .crumbstu1{
            width:25px ;
            height: 25px;
            border-radius: 50%;
            }
        }
    }
}

</style>